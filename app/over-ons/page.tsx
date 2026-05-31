import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over BimmerNederland.nl – Onze missie",
  description: "BimmerNederland.nl is een onafhankelijke fansite voor BMW-liefhebbers in Nederland. Lees meer over onze missie, redactie en disclaimer.",
};

export default function OverOnsPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "5rem 1.5rem 4rem", textAlign: "center" }}>
        <p style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>Over ons</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "1rem" }}>BMW. Passie. Nederland.</h1>
        <p style={{ color: "#888", fontSize: "1.1rem", maxWidth: "550px", margin: "0 auto" }}>
          Onafhankelijk, eerlijk en volledig gericht op BMW.
        </p>
      </section>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem 5rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Wat is BimmerNederland.nl?</h2>
          <p style={{ color: "#ccc", lineHeight: 1.8, marginBottom: "1rem" }}>
            BimmerNederland.nl is een onafhankelijke Nederlandse website voor BMW-enthousiastelingen. Wij publiceren nieuws, reviews, koopgidsen en achtergrondinformatie over BMW — van de kleine 1 Serie tot de meest extreme M-modellen.
          </p>
          <p style={{ color: "#ccc", lineHeight: 1.8 }}>
            Onze missie is simpel: de beste, meest betrouwbare BMW-content in het Nederlands bieden. Geen gesponsorde content zonder vermelding, geen nep-recensies. Alleen eerlijke informatie voor echte BMW-liefhebbers.
          </p>
        </section>

        <section style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "2rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem" }}>⚠️ Disclaimer</h2>
          <p style={{ color: "#aaa", lineHeight: 1.8, marginBottom: "1rem" }}>
            BimmerNederland.nl is <strong style={{ color: "white" }}>niet gelieerd aan, gesponsord door of goedgekeurd door BMW AG</strong>, BMW M GmbH, BMW Nederland B.V. of hun dochterondernemingen.
          </p>
          <p style={{ color: "#aaa", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong style={{ color: "white" }}>BMW®</strong>, <strong style={{ color: "white" }}>M®</strong> en alle bijbehorende logo's en modelnamen zijn geregistreerde handelsmerken van Bayerische Motoren Werke AG. Wij gebruiken deze namen uitsluitend ter identificatie en verwijzing, conform normaal redactioneel gebruik.
          </p>
          <p style={{ color: "#aaa", lineHeight: 1.8 }}>
            Alle informatie op deze website is uitsluitend bedoeld ter informatie. Prijzen, specificaties en beschikbaarheid kunnen afwijken. Raadpleeg altijd een officiële BMW-dealer voor actuele en bindende informatie.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Bronvermelding & journalistieke integriteit</h2>
          <p style={{ color: "#ccc", lineHeight: 1.8, marginBottom: "1rem" }}>
            Elk artikel op BimmerNederland.nl bevat een sectie <strong style={{ color: "white" }}>Bronnen & referenties</strong>. Wij verwijzen altijd naar de originele bron van feiten, cijfers en persberichten. Dit omvat:
          </p>
          <ul style={{ color: "#ccc", lineHeight: 1.8, paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>Officiële BMW persberichten (press.bmwgroup.com)</li>
            <li>Erkende automedia zoals Autovisie, AutoWeek, TopGear Nederland en AutoBild</li>
            <li>Officiële instanties zoals BOVAG, RAI en ADAC</li>
            <li>Overheidswebsites voor regelgeving en subsidies</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Snel naar</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[["Modellen", "/modellen"], ["Blog", "/blog"], ["Nieuws", "/nieuws"], ["FAQ", "/faq"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ background: "#161616", border: "1px solid #2a2a2a", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem" }}>
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

