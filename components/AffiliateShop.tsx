"use client";
import Link from "next/link";

// Vervang JOUW_PARTNER_ID met je echte Bol.com partner ID
const PARTNER_ID = "1523911";

function bolLink(zoekterm: string) {
  return `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(zoekterm)}&utm_source=partnernetwork&utm_medium=referral&utm_campaign=${PARTNER_ID}`;
}

interface Product {
  naam: string;
  beschrijving: string;
  zoekterm: string;
  emoji: string;
  prijs: string;
}

interface Props {
  titel?: string;
  producten: Product[];
  accent?: string;
}

export default function AffiliateShop({ titel = "Aanbevolen producten", producten, accent = "#1c69d4" }: Props) {
  return (
    <section style={{ background: "#0d0d0d", padding: "4rem 1.5rem", marginTop: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ color: accent, fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              Via bol.com
            </p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>{titel}</h2>
          </div>
          <a href={`https://www.bol.com/nl/nl/s/?searchtext=bmw&utm_source=partnernetwork&utm_medium=referral&utm_campaign=${PARTNER_ID}`}
            target="_blank" rel="noopener noreferrer sponsored"
            style={{ color: accent, textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
            Alle BMW producten →
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
          {producten.map((p) => (
            <a key={p.naam} href={bolLink(p.zoekterm)} target="_blank" rel="noopener noreferrer sponsored"
              style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "1.25rem", textDecoration: "none", color: "inherit", display: "block", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${accent}33`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{p.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem", color: "#e0e0e0" }}>{p.naam}</div>
              <div style={{ color: "#777", fontSize: "0.82rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>{p.beschrijving}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#888", fontSize: "0.8rem" }}>{p.prijs}</span>
                <span style={{ background: accent, color: "white", borderRadius: "0.3rem", padding: "0.25rem 0.6rem", fontSize: "0.75rem", fontWeight: 700 }}>
                  Bekijk →
                </span>
              </div>
            </a>
          ))}
        </div>

        <p style={{ color: "#444", fontSize: "0.75rem", marginTop: "1.25rem", textAlign: "center" }}>
          * Affiliate links — als je via deze links iets koopt ontvangen wij een kleine commissie, zonder extra kosten voor jou.
        </p>
      </div>
    </section>
  );
}
