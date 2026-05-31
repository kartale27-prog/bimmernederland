import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

type Props = { params: Promise<{ category: string; subforum: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subforum: subSlug } = await params;
  const sub = await prisma.forumSubforum.findUnique({ where: { slug: subSlug } });
  return sub
    ? { title: `${sub.naam} | BMW Forum`, description: sub.beschrijving }
    : { title: "Forum" };
}

function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "zojuist";
  if (m < 60) return `${m} min geleden`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} uur geleden`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} dagen geleden`;
  return date.toLocaleDateString("nl-NL");
}

export default async function SubforumPage({ params }: Props) {
  const { category: catSlug, subforum: subSlug } = await params;

  const subforum = await prisma.forumSubforum.findUnique({
    where: { slug: subSlug },
    include: {
      category: true,
      threads: {
        orderBy: [{ isPinned: "desc" }, { updatedAt: "desc" }],
        include: {
          author: { select: { username: true } },
          _count: { select: { posts: true } },
          posts: { orderBy: { createdAt: "desc" }, take: 1, include: { author: { select: { username: true } } } },
        },
      },
    },
  });

  if (!subforum || subforum.category.slug !== catSlug) notFound();
  const session = await getSession();

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Breadcrumb + header */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "3rem 1.5rem 2.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", color: "#555", marginBottom: "1rem", flexWrap: "wrap" }}>
            <Link href="/forum" style={{ color: "#1c69d4", textDecoration: "none" }}>Forum</Link>
            <span>›</span>
            <Link href="/forum" style={{ color: "#1c69d4", textDecoration: "none" }}>{subforum.category.naam}</Link>
            <span>›</span>
            <span style={{ color: "#888" }}>{subforum.naam}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.4rem" }}>{subforum.naam}</h1>
              <p style={{ color: "#888" }}>{subforum.beschrijving}</p>
            </div>
            {session ? (
              <Link href={`/forum/${catSlug}/${subSlug}/nieuw-topic`}
                style={{ background: "#1c69d4", color: "white", padding: "0.65rem 1.4rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                + Nieuw topic
              </Link>
            ) : (
              <Link href="/registreren"
                style={{ background: "#2a2a2a", color: "#888", padding: "0.65rem 1.4rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                Log in om te posten
              </Link>
            )}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {subforum.threads.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#555" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💬</div>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Nog geen topics in dit subforum</p>
            {session
              ? <Link href={`/forum/${catSlug}/${subSlug}/nieuw-topic`} style={{ color: "#1c69d4", textDecoration: "none", fontWeight: 600 }}>Start het eerste topic →</Link>
              : <Link href="/registreren" style={{ color: "#1c69d4", textDecoration: "none", fontWeight: 600 }}>Registreer en start het eerste topic →</Link>
            }
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {subforum.threads.map(thread => {
              const lastPost = thread.posts[0];
              return (
                <Link key={thread.id} href={`/forum/${catSlug}/${subSlug}/${thread.id}`}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#161616", border: `1px solid ${thread.isPinned ? "rgba(28,105,212,0.3)" : "#2a2a2a"}`, borderRadius: "0.75rem", padding: "1rem 1.25rem", textDecoration: "none", color: "inherit", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0, flex: 1 }}>
                    {thread.isPinned && <span style={{ fontSize: "0.7rem", background: "rgba(28,105,212,0.2)", color: "#1c69d4", padding: "0.15rem 0.4rem", borderRadius: "0.25rem", fontWeight: 700, whiteSpace: "nowrap" }}>📌 VAST</span>}
                    {thread.isLocked && <span style={{ fontSize: "0.7rem" }}>🔒</span>}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#e0e0e0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{thread.titel}</div>
                      <div style={{ color: "#666", fontSize: "0.8rem", marginTop: "0.2rem" }}>door <span style={{ color: "#888" }}>{thread.author.username}</span> · {timeAgo(thread.createdAt)}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "2rem", flexShrink: 0, textAlign: "right" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#e0e0e0" }}>{thread._count.posts}</div>
                      <div style={{ color: "#555", fontSize: "0.75rem" }}>reacties</div>
                    </div>
                    {lastPost && (
                      <div style={{ minWidth: "90px" }}>
                        <div style={{ fontSize: "0.8rem", color: "#888" }}>{lastPost.author.username}</div>
                        <div style={{ color: "#555", fontSize: "0.75rem" }}>{timeAgo(lastPost.createdAt)}</div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
