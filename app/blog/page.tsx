import type { Metadata } from "next";
import Link from "next/link";
import { artikelen } from "@/lib/artikelen";

export const metadata: Metadata = {
  title: "BMW Blog – Reviews, Koopgidsen & Vergelijkingen | BimmerNederland.nl",
  description: "Diepgaande BMW reviews, rijtests en koopgidsen. Lees alles over de BMW M3, M5, X5, i4 en meer. Alle artikelen met bronvermelding.",
};

const categorieen = ["Alle", "Review", "Koopgids", "Vergelijking", "Artikel", "Geschiedenis", "Praktisch", "Industrie"];

export default function BlogPage() {
  const hoofdartikel = artikelen[0];
  const rest = artikelen.slice(1);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "5rem 1.5rem 4rem", textAlign: "center" }}>
        <p style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>BMW Blog</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "1rem" }}>Reviews & Artikelen</h1>
        <p style={{ color: "#888", fontSize: "1.1rem", maxWidth: "550px", margin: "0 auto" }}>
          {artikelen.length} artikelen — diepgaande BMW content met bronvermelding, geschreven voor echte liefhebbers.
        </p>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {categorieen.map((c, i) => (
            <span key={c} style={{ background: i === 0 ? "#1c69d4" : "#161616", border: "1px solid #2a2a2a", color: i === 0 ? "white" : "#888", borderRadius: "2rem", padding: "0.4rem 1.2rem", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
              {c}
            </span>
          ))}
        </div>

        {/* Featured article */}
        <Link href={`/blog/${hoofdartikel.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
          <article className="card-hover" style={{ background: "linear-gradient(135deg, #161616, #0d1b3e)", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "2.5rem", marginBottom: "3rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "300px", background: "radial-gradient(circle, rgba(28,105,212,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <span style={{ background: "#1c69d4", color: "white", borderRadius: "0.3rem", padding: "0.25rem 0.75rem", fontSize: "0.8rem", fontWeight: 700 }}>⭐ Uitgelicht</span>
              <span style={{ background: "rgba(28,105,212,0.15)", color: "#1c69d4", borderRadius: "0.3rem", padding: "0.25rem 0.75rem", fontSize: "0.8rem", fontWeight: 600 }}>{hoofdartikel.categorie}</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "1rem", maxWidth: "700px" }}>{hoofdartikel.titel}</h2>
            <p style={{ color: "#999", lineHeight: 1.7, maxWidth: "650px", marginBottom: "1.5rem" }}>{hoofdartikel.intro}</p>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ color: "#555", fontSize: "0.85rem" }}>📅 {hoofdartikel.datum}</span>
              <span style={{ color: "#555", fontSize: "0.85rem" }}>⏱ {hoofdartikel.leestijd} lezen</span>
              <span style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.85rem" }}>Lees artikel →</span>
            </div>
          </article>
        </Link>

        {/* Article grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {rest.map((artikel) => (
            <Link key={artikel.slug} href={`/blog/${artikel.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <article className="card-hover" style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "1.75rem", height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", gap: "0.5rem" }}>
                  <span style={{ background: `${artikel.kleur}22`, color: artikel.kleur, borderRadius: "0.3rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: 700 }}>{artikel.categorie}</span>
                  <span style={{ color: "#555", fontSize: "0.8rem", whiteSpace: "nowrap" }}>{artikel.leestijd}</span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.4 }}>{artikel.titel}</h3>
                <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>{artikel.intro}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#555", fontSize: "0.8rem" }}>{artikel.datum}</span>
                  <span style={{ color: "#1c69d4", fontSize: "0.85rem", fontWeight: 600 }}>Lees meer →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

