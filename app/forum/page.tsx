import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "BMW Forum – Community Discussies | BimmerNederland.nl",
  description: "Het grootste Nederlandse BMW forum. Discussieer over auto's en motoren per model: 1 t/m 8 serie, X serie, M serie, GS, S 1000 RR en meer.",
};

export default async function ForumPage() {
  const [categories, session] = await Promise.all([
    prisma.forumCategory.findMany({
      include: { subforums: { orderBy: { volgorde: "asc" }, include: { _count: { select: { threads: true } } } } },
      orderBy: { volgorde: "asc" },
    }),
    getSession(),
  ]);

  const autoCategories = categories.filter(c => c.type === "auto" || (c.type === "algemeen" && c.slug.startsWith("auto")));
  const motorCategories = categories.filter(c => c.type === "motor" || (c.type === "algemeen" && c.slug.startsWith("motor")));

  const Section = ({ cats, title, accent }: { cats: typeof categories; title: string; accent: string }) => (
    <div style={{ marginBottom: "3rem" }}>
      <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ display: "inline-block", width: "4px", height: "24px", background: accent, borderRadius: "2px" }} />
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {cats.map(cat => (
          <div key={cat.id} style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #2a2a2a", background: "#1a1a1a" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", margin: 0 }}>{cat.naam}</h3>
              {cat.beschrijving && <p style={{ color: "#666", fontSize: "0.8rem", marginTop: "0.25rem", marginBottom: 0 }}>{cat.beschrijving}</p>}
            </div>
            <div>
              {cat.subforums.map((sub, i) => (
                <Link key={sub.id} href={`/forum/${cat.slug}/${sub.slug}`}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 1.25rem", textDecoration: "none", color: "inherit", borderBottom: i < cat.subforums.length - 1 ? "1px solid #1e1e1e" : "none" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "36px", height: "36px", background: "#222", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                      💬
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#e0e0e0" }}>{sub.naam}</div>
                      <div style={{ color: "#666", fontSize: "0.8rem", marginTop: "0.15rem" }}>{sub.beschrijving}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "1rem" }}>
                    <div style={{ color: "#1c69d4", fontWeight: 700, fontSize: "0.9rem" }}>{sub._count.threads}</div>
                    <div style={{ color: "#555", fontSize: "0.75rem" }}>topics</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "4rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <p style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.75rem" }}>Community</p>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "0.5rem" }}>BMW Forum</h1>
            <p style={{ color: "#888", fontSize: "1rem" }}>
              Stel vragen, deel ervaringen en help anderen.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {session ? (
              <span style={{ color: "#888", fontSize: "0.9rem", alignSelf: "center" }}>
                Ingelogd als <strong style={{ color: "#1c69d4" }}>{session.username}</strong>
              </span>
            ) : (
              <>
                <Link href="/inloggen" style={{ background: "transparent", color: "white", border: "1px solid #2a2a2a", padding: "0.6rem 1.25rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
                  Inloggen
                </Link>
                <Link href="/registreren" style={{ background: "#1c69d4", color: "white", padding: "0.6rem 1.25rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
                  Registreren
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <Section cats={autoCategories} title="🚗 BMW Auto's" accent="#1c69d4" />
        <Section cats={motorCategories} title="🏍️ BMW Motorrad" accent="#e67e22" />
      </div>
    </div>
  );
}

