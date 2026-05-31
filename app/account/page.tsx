import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import NotificatiesForm from "./NotificatiesForm";
import WachtwoordForm from "./WachtwoordForm";
import AvatarUpload from "./AvatarUpload";

export const metadata: Metadata = {
  title: "Mijn account | BimmerNederland.nl",
};

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/inloggen");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      username: true,
      email: true,
      createdAt: true,
      notifEigenTopic: true,
      notifBetrokkenThread: true,
      avatarUrl: true,
      _count: { select: { threads: true, posts: true } },
    },
  });
  if (!user) redirect("/inloggen");

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "4rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.75rem" }}>Mijn account</p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #2a2a2a" }}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: `hsl(${user.username.charCodeAt(0) * 15}, 60%, 35%)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.5rem", color: "white" }}>
                  {user.username[0].toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 style={{ fontSize: "1.6rem", fontWeight: 900, margin: 0 }}>{user.username}</h1>
              <p style={{ color: "#888", margin: "0.25rem 0 0", fontSize: "0.9rem" }}>{user.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {[
              ["📅 Lid sinds", user.createdAt.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })],
              ["💬 Topics", user._count.threads.toString()],
              ["↩️ Reacties", user._count.posts.toString()],
            ].map(([label, val]) => (
              <div key={label}>
                <div style={{ color: "#555", fontSize: "0.8rem" }}>{label}</div>
                <div style={{ fontWeight: 700, color: "#e0e0e0", marginTop: "0.2rem" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Profielfoto */}
        <section style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid #2a2a2a", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.2rem" }}>📷</span>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>Profielfoto</h2>
              <p style={{ margin: "0.2rem 0 0", color: "#666", fontSize: "0.85rem" }}>Zichtbaar op het forum naast je berichten</p>
            </div>
          </div>
          <div style={{ padding: "1.75rem" }}>
            <AvatarUpload huidigAvatar={user.avatarUrl} username={user.username} />
          </div>
        </section>
        {/* Notificaties */}
        <section style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid #2a2a2a", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.2rem" }}>🔔</span>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>E-mailmeldingen</h2>
              <p style={{ margin: "0.2rem 0 0", color: "#666", fontSize: "0.85rem" }}>Bepaal wanneer je een e-mail ontvangt van BimmerNederland.nl</p>
            </div>
          </div>
          <div style={{ padding: "1.75rem" }}>
            <NotificatiesForm
              notifEigenTopic={user.notifEigenTopic}
              notifBetrokkenThread={user.notifBetrokkenThread}
            />
          </div>
        </section>

        {/* Wachtwoord wijzigen */}
        <section style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid #2a2a2a", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.2rem" }}>🔒</span>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>Wachtwoord wijzigen</h2>
              <p style={{ margin: "0.2rem 0 0", color: "#666", fontSize: "0.85rem" }}>Kies een nieuw wachtwoord voor je account</p>
            </div>
          </div>
          <div style={{ padding: "1.75rem" }}>
            <WachtwoordForm />
          </div>
        </section>
      </div>
    </div>
  );
}

