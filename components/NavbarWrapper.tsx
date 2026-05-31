import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const session = await getSession();
  let avatarUrl: string | null = null;
  if (session) {
    const user = await prisma.user.findUnique({ where: { id: session.userId }, select: { avatarUrl: true } });
    avatarUrl = user?.avatarUrl ?? null;
  }
  return <Navbar session={session} avatarUrl={avatarUrl} />;
}
