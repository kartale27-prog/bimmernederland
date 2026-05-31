"use server";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { mailNieuwAccount } from "@/lib/email";

type State = { error: string } | undefined;

export async function registreren(_prev: State, formData: FormData): Promise<State> {
  const username = (formData.get("username") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!username || !email || !password || !confirm)
    return { error: "Vul alle velden in." };
  if (username.length < 3)
    return { error: "Gebruikersnaam moet minimaal 3 tekens zijn." };
  if (password.length < 8)
    return { error: "Wachtwoord moet minimaal 8 tekens zijn." };
  if (password !== confirm)
    return { error: "Wachtwoorden komen niet overeen." };

  const exists = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (exists)
    return { error: "Gebruikersnaam of e-mailadres al in gebruik." };

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { username, email, passwordHash },
  });

  await createSession({ userId: user.id, username: user.username });
  // Stuur melding naar admin (fire-and-forget)
  mailNieuwAccount(user.username, user.email).catch(() => {});
  redirect("/forum");
}

export async function inloggen(_prev: State, formData: FormData): Promise<State> {
  const identifier = (formData.get("identifier") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!identifier || !password)
    return { error: "Vul alle velden in." };

  const user = await prisma.user.findFirst({
    where: { OR: [{ email: identifier }, { username: identifier }] },
  });
  if (!user) return { error: "Geen account gevonden met dit e-mailadres of gebruikersnaam." };

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return { error: "Onjuist wachtwoord." };

  await createSession({ userId: user.id, username: user.username });
  redirect("/forum");
}

export async function uitloggen() {
  await deleteSession();
  redirect("/");
}

export async function wachtwoordReset(_prev: State, formData: FormData): Promise<State> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const newPassword = formData.get("newPassword") as string;
  const confirm = formData.get("confirm") as string;

  if (!email || !newPassword || !confirm)
    return { error: "Vul alle velden in." };
  if (newPassword.length < 8)
    return { error: "Wachtwoord moet minimaal 8 tekens zijn." };
  if (newPassword !== confirm)
    return { error: "Wachtwoorden komen niet overeen." };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return { error: "Geen account gevonden met dit e-mailadres." };

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { email }, data: { passwordHash } });

  redirect("/inloggen?reset=1");
}
