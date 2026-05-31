import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { modellen, getModel } from "@/lib/modellen";
import { getArtikel } from "@/lib/artikelen";
import AffiliateShop from "@/components/AffiliateShop";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return modellen.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) return { title: "Model niet gevonden" };
  return {
    title: `${model.naam} — Specs, Prijs & Review 2026 | BimmerNederland.nl`,
    description: `Alles over de ${model.naam}: ${model.pk}, 0-100 in ${model.nulHonderd}, vanaf ${model.prijs}. Specs, highlights en koopadvies.`,
    keywords: `${model.naam}, BMW ${model.serie}, ${model.type}, BMW specs 2026`,
  };
}

export default async function ModelPage({ params }: Props) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const gerelateerd = model.gerelateerdeArtikelSlug ? getArtikel(model.gerelateerdeArtikelSlug) : undefined;

  const specs = [
    { label: "Motor", waarde: model.motor },
    { label: "Cilinderinhoud / Accu", waarde: model.cilinderinhoud },
    { label: "Vermogen", waarde: model.pk },
    { label: "Koppel", waarde: model.koppel },
    { label: "0–100 km/h", waarde: model.nulHonderd },
    { label: "Topsnelheid", waarde: model.topsnelheid },
    { label: "Verbruik", waarde: model.verbruik },
    { label: "Rijklaar gewicht", waarde: model.gewicht },
    { label: "Aandrijving", waarde: model.aangedreven },
    { label: "Basisprijs NL", waarde: model.prijs },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Link href="/modellen" style={{ color: "#1c69d4", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}>
            ← Alle modellen
          </Link>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ background: `${model.kleur}22`, color: model.kleur, borderRadius: "0.3rem", padding: "0.25rem 0.75rem", fontSize: "0.8rem", fontWeight: 700 }}>{model.serie}</span>
            <span style={{ background: "#2a2a2a", color: "#888", borderRadius: "0.3rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem" }}>{model.type}</span>
            {model.nieuw && <span style={{ background: "#1c69d4", color: "white", borderRadius: "0.3rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: 800 }}>NIEUW 2026</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ fontSize: "4rem" }}>{model.emoji}</div>
            <div>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "0.5rem" }}>{model.naam}</h1>
              <p style={{ color: "#1c69d4", fontWeight: 700, fontSize: "1.3rem" }}>{model.prijs}</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Intro */}
        <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "2rem", marginBottom: "2rem" }}>
          <p style={{ color: "#ccc", lineHeight: 1.85, fontSize: "1.05rem", margin: 0 }}>{model.introTekst}</p>
        </div>

        {/* Specs grid */}
        <h2 style={{ fontWeight: 800, fontSize: "1.4rem", marginBottom: "1.25rem" }}>Technische specificaties</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem", marginBottom: "2.5rem" }}>
          {specs.map(({ label, waarde }) => (
            <div key={label} style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <span style={{ color: "#666", fontSize: "0.85rem" }}>{label}</span>
              <span style={{ fontWeight: 700, fontSize: "0.95rem", textAlign: "right" }}>{waarde}</span>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <h2 style={{ fontWeight: 800, fontSize: "1.4rem", marginBottom: "1.25rem" }}>Highlights</h2>
        <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "1.5rem 2rem", marginBottom: "2.5rem" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {model.highlights.map((h) => (
              <li key={h} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "#ccc", fontSize: "0.95rem", lineHeight: 1.5 }}>
                <span style={{ color: model.kleur, flexShrink: 0, marginTop: "0.1rem" }}>✓</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Doelgroep */}
        <div style={{ background: `${model.kleur}11`, border: `1px solid ${model.kleur}33`, borderRadius: "1rem", padding: "1.5rem 2rem", marginBottom: "2.5rem" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", color: model.kleur }}>Voor wie is dit?</h3>
          <p style={{ color: "#ccc", lineHeight: 1.7, margin: 0, fontSize: "0.95rem" }}>{model.doelgroep}</p>
        </div>

        {/* Gerelateerd artikel */}
        {gerelateerd && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontWeight: 800, fontSize: "1.4rem", marginBottom: "1.25rem" }}>Gerelateerd artikel</h2>
            <Link href={`/blog/${gerelateerd.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <article className="card-hover" style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "1.75rem" }}>
                <span style={{ background: `${gerelateerd.kleur}22`, color: gerelateerd.kleur, borderRadius: "0.3rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: 700, display: "inline-block", marginBottom: "0.75rem" }}>{gerelateerd.categorie}</span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.4 }}>{gerelateerd.titel}</h3>
                <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>{gerelateerd.intro}</p>
                <span style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.9rem" }}>Lees artikel →</span>
              </article>
            </Link>
          </div>
        )}

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg, #0a1628, #0d1b3e)", border: "1px solid #1e3a5f", borderRadius: "1rem", padding: "2rem", textAlign: "center", marginBottom: "2.5rem" }}>
          <h3 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.75rem" }}>Interesse in de {model.naam}?</h3>
          <p style={{ color: "#888", marginBottom: "1.5rem", lineHeight: 1.6 }}>Vraag een proefrit aan bij je lokale BMW dealer of configureer hem online.</p>
          <a href="https://www.bmw.nl" target="_blank" rel="noopener noreferrer"
            style={{ background: "#1c69d4", color: "white", padding: "0.85rem 2rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem" }}>
            Naar BMW.nl →
          </a>
        </div>
      </div>

      <AffiliateShop
        titel={`Accessoires voor de ${model.naam}`}
        producten={[
          { naam: "BMW poetsmiddel set", beschrijving: "Professionele lak- en interieurreiniging.", zoekterm: "bmw poetsmiddel auto", emoji: "🧴", prijs: "v.a. €15" },
          { naam: "OBD2 scanner BMW", beschrijving: "Lees zelf foutcodes uit via je telefoon.", zoekterm: "obd2 bmw scanner bluetooth", emoji: "🔧", prijs: "v.a. €20" },
          { naam: "BMW vloermatten", beschrijving: "Op maat voor alle BMW modellen.", zoekterm: "bmw vloermatten rubber", emoji: "🟫", prijs: "v.a. €35" },
          { naam: "Dashcam full HD", beschrijving: "Beveiliging en bewijs bij een aanrijding.", zoekterm: "dashcam auto full hd", emoji: "📷", prijs: "v.a. €40" },
        ]}
      />
    </div>
  );
}
