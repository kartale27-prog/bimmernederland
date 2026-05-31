import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artikelen, getArtikel } from "@/lib/artikelen";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return artikelen.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artikel = getArtikel(slug);
  if (!artikel) return { title: "Artikel niet gevonden" };
  return {
    title: `${artikel.titel} | BMWNederland.nl`,
    description: artikel.intro,
    keywords: artikel.tags.join(", ") + ", BMW, BMWNederland",
  };
}

export default async function ArtikelPage({ params }: Props) {
  const { slug } = await params;
  const artikel = getArtikel(slug);
  if (!artikel) notFound();

  const gerelateerd = artikelen.filter(
    (a) => a.slug !== slug && a.tags.some((t) => artikel.tags.includes(t))
  ).slice(0, 3);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link href="/blog" style={{ color: "#1c69d4", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}>
            ← Terug naar blog
          </Link>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <span style={{ background: `${artikel.kleur}22`, color: artikel.kleur, borderRadius: "0.3rem", padding: "0.25rem 0.75rem", fontSize: "0.8rem", fontWeight: 700 }}>{artikel.categorie}</span>
            {artikel.tags.map((t) => (
              <span key={t} style={{ background: "#2a2a2a", color: "#888", borderRadius: "0.3rem", padding: "0.2rem 0.5rem", fontSize: "0.75rem" }}>#{t}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "1.25rem" }}>{artikel.titel}</h1>
          <p style={{ color: "#aaa", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>{artikel.intro}</p>
          <div style={{ display: "flex", gap: "1.5rem", color: "#555", fontSize: "0.85rem", flexWrap: "wrap" }}>
            <span>📅 {artikel.datum}</span>
            <span>⏱ {artikel.leestijd} lezen</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {artikel.inhoud.map((alinea, i) => (
            <p key={i} style={{ color: "#ccc", lineHeight: 1.85, fontSize: "1.05rem" }}>{alinea}</p>
          ))}
        </div>

        {/* Sources */}
        <div style={{ marginTop: "3rem", padding: "1.75rem", background: "#161616", borderRadius: "1rem", border: "1px solid #2a2a2a" }}>
          <h3 style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1rem", color: "#aaa", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            📚 Bronnen & referenties
          </h3>
          <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.6 }}>
            De informatie in dit artikel is gebaseerd op onderstaande openbare bronnen. BMWNederland.nl is niet gelieerd aan BMW AG of genoemde publicaties.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {artikel.bronnen.map((bron) => (
              <li key={bron.url} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "#1c69d4", fontSize: "0.8rem" }}>↗</span>
                <a href={bron.url} target="_blank" rel="noopener noreferrer" style={{ color: "#1c69d4", textDecoration: "none", fontSize: "0.9rem" }}>
                  {bron.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", background: "#0d0d0d", borderRadius: "0.75rem", border: "1px solid #1e1e1e" }}>
          <p style={{ color: "#555", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "#666" }}>Disclaimer:</strong> BMWNederland.nl is een onafhankelijke fansite en is niet gelieerd aan, gesponsord door of goedgekeurd door BMW AG, BMW M GmbH of hun dochterondernemingen. BMW en M zijn geregistreerde handelsmerken van Bayerische Motoren Werke AG. Informatie op deze site is uitsluitend bedoeld ter informatie.
          </p>
        </div>
      </section>

      {/* Related articles */}
      {gerelateerd.length > 0 && (
        <section style={{ background: "#0d0d0d", padding: "3rem 1.5rem 5rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2 style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "2rem" }}>Gerelateerde artikelen</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {gerelateerd.map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <article className="card-hover" style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "1.5rem" }}>
                    <span style={{ background: `${a.kleur}22`, color: a.kleur, borderRadius: "0.3rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: 700, display: "inline-block", marginBottom: "0.75rem" }}>{a.categorie}</span>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.4 }}>{a.titel}</h3>
                    <p style={{ color: "#555", fontSize: "0.8rem" }}>{a.datum}</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
