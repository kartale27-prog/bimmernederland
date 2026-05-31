"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { mailNieuwTopic, mailReactieAanLid } from "@/lib/email";

type State = { error: string } | undefined;

export async function createThread(_prev: State, formData: FormData): Promise<State> {
  const session = await getSession();
  if (!session) return { error: "Je moet ingelogd zijn." };

  const subforumId = formData.get("subforumId") as string;
  const titel = (formData.get("titel") as string)?.trim();
  const inhoud = (formData.get("inhoud") as string)?.trim();

  if (!subforumId) return { error: "Subforum niet opgegeven." };
  if (!titel || titel.length < 5) return { error: "Titel moet minimaal 5 tekens zijn." };
  if (!inhoud || inhoud.length < 20) return { error: "Bericht moet minimaal 20 tekens zijn." };

  const subforum = await prisma.forumSubforum.findUnique({
    where: { id: subforumId },
    include: { category: true },
  });
  if (!subforum) return { error: "Subforum niet gevonden." };

  const thread = await prisma.thread.create({
    data: {
      titel,
      subforumId,
      authorId: session.userId,
      posts: { create: { inhoud, authorId: session.userId } },
    },
  });

  // Melding aan admin
  mailNieuwTopic({
    username: session.username,
    titel,
    subforum: subforum.naam,
    category: subforum.category.naam,
    threadId: thread.id,
    categorySlug: subforum.category.slug,
    subforumSlug: subforum.slug,
  }).catch(() => {});

  revalidatePath(`/forum/${subforum.category.slug}/${subforum.slug}`);
  redirect(`/forum/${subforum.category.slug}/${subforum.slug}/${thread.id}`);
}

export async function createPost(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) return;

  const threadId = formData.get("threadId") as string;
  const inhoud = (formData.get("inhoud") as string)?.trim();

  if (!inhoud || inhoud.length < 5) return;

  // Haal thread op met auteur + alle eerdere posters
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: {
      subforum: { include: { category: true } },
      author: { select: { id: true, email: true, username: true, notifEigenTopic: true } },
      posts: {
        include: {
          author: { select: { id: true, email: true, username: true, notifBetrokkenThread: true } },
        },
      },
    },
  });
  if (!thread || thread.isLocked) return;

  await prisma.post.create({
    data: { inhoud, threadId, authorId: session.userId },
  });

  await prisma.thread.update({
    where: { id: threadId },
    data: { updatedAt: new Date() },
  });

  const catSlug = thread.subforum.category.slug;
  const subSlug = thread.subforum.slug;
  const baseOpts = {
    reactorUsername: session.username,
    threadTitel: thread.titel,
    inhoud,
    subforum: thread.subforum.naam,
    category: thread.subforum.category.naam,
    threadId,
    categorySlug: catSlug,
    subforumSlug: subSlug,
  };

  // 1. Stuur naar topic-auteur (als zij niet zelf reageren + notif aan)
  if (
    thread.author.id !== session.userId &&
    thread.author.notifEigenTopic
  ) {
    mailReactieAanLid({
      ...baseOpts,
      ontvanger: thread.author.email,
      ontvangerUsername: thread.author.username,
      type: "eigenTopic",
    }).catch(() => {});
  }

  // 2. Stuur naar betrokken leden (uniek, niet de auteur, niet de huidige poster)
  const betrokkenIds = new Set<string>();
  betrokkenIds.add(thread.author.id); // al behandeld hierboven
  betrokkenIds.add(session.userId);   // degene die nu post

  for (const post of thread.posts) {
    const u = post.author;
    if (betrokkenIds.has(u.id)) continue;
    betrokkenIds.add(u.id);

    if (u.notifBetrokkenThread) {
      mailReactieAanLid({
        ...baseOpts,
        ontvanger: u.email,
        ontvangerUsername: u.username,
        type: "betrokken",
      }).catch(() => {});
    }
  }

  // Melding aan admin
  const { mailNieuweReactie } = await import("@/lib/email");
  mailNieuweReactie({
    username: session.username,
    threadTitel: thread.titel,
    inhoud,
    subforum: thread.subforum.naam,
    category: thread.subforum.category.naam,
    threadId,
    categorySlug: catSlug,
    subforumSlug: subSlug,
  }).catch(() => {});

  revalidatePath(`/forum/${catSlug}/${subSlug}/${threadId}`);
  redirect(`/forum/${catSlug}/${subSlug}/${threadId}`);
}
