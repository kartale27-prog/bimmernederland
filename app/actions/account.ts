"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

type State = { error?: string; success?: boolean } | undefined;

export async function updateNotifications(_prev: State, formData: FormData): Promise<State> {
  const session = await getSession();
  if (!session) return { error: "Niet ingelogd." };

  await prisma.user.update({
    where: { id: session.userId },
    data: {
      notifEigenTopic:      formData.get("notifEigenTopic") === "on",
      notifBetrokkenThread: formData.get("notifBetrokkenThread") === "on",
    },
  });

  revalidatePath("/account");
  return { success: true };
}

export async function updateAvatar(_prev: State, formData: FormData): Promise<State> {
  const session = await getSession();
  if (!session) return { error: "Niet ingelogd." };

  const avatarUrl = (formData.get("avatarUrl") as string)?.trim();
  if (!avatarUrl) return { error: "Geen afbeelding ontvangen." };

  // Max 1MB voor base64
  if (avatarUrl.length > 1_400_000) return { error: "Afbeelding is te groot. Maximaal 1MB." };

  await prisma.user.update({
    where: { id: session.userId },
    data: { avatarUrl },
  });

  revalidatePath("/account");
  return { success: true };
}

export async function updateWachtwoord(_prev: State, formData: FormData): Promise<State> {
  const session = await getSession();
  if (!session) return { error: "Niet ingelogd." };

  const huidig   = formData.get("huidig") as string;
  const nieuw    = formData.get("nieuw") as string;
  const bevestig = formData.get("bevestig") as string;

  if (!huidig || !nieuw || !bevestig) return { error: "Vul alle velden in." };
  if (nieuw.length < 8) return { error: "Nieuw wachtwoord minimaal 8 tekens." };
  if (nieuw !== bevestig) return { error: "Wachtwoorden komen niet overeen." };

  const bcrypt = await import("bcryptjs");
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return { error: "Account niet gevonden." };

  const ok = await bcrypt.compare(huidig, user.passwordHash);
  if (!ok) return { error: "Huidig wachtwoord is onjuist." };

  const hash = await bcrypt.hash(nieuw, 12);
  await prisma.user.update({ where: { id: session.userId }, data: { passwordHash: hash } });

  revalidatePath("/account");
  return { success: true };
}
