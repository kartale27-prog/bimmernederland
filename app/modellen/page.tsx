import type { Metadata } from "next";
import Link from "next/link";
import AffiliateShop from "@/components/AffiliateShop";

export const metadata: Metadata = {
  title: "BMW Modellen Overzicht 2026 | BimmerNederland.nl",
  description: "Compleet overzicht van alle BMW modellen in 2026. Van de BMW 1 Serie tot de M5 en iX. Specs, prijzen en reviews.",
};

const modellen = [
  { naam: "BMW M3 Competition", serie: "M Serie", pk: "510 pk", vermogen: "650 Nm", prijs: "€105.000", type: "Sedan", emoji: "🏎️", kleur: "#1c69d4", nieuw: true },
  { naam: "BMW M5 xDrive", serie: "M Serie", pk: "727 pk", vermogen: "1000 Nm", prijs: "€165.000", type: "Sedan", emoji: "⚡", kleur: "#e74c3c", nieuw: true },
  { naam: "BMW M4 Competition", serie: "M Serie", pk: "510 pk", vermogen: "650 Nm", prijs: "€110.000", type: "Coupé", emoji: "🔥", kleur: "#e67e22", nieuw: false },
  { naam: "BMW X5 M60i", serie: "X Serie", pk: "489 pk", vermogen: "700 Nm", prijs: "€135.000", type: "SUV", emoji: "🚙", kleur: "#27ae60", nieuw: false },
  { naam: "BMW X3 30i", serie: "X Serie", pk: "245 pk", vermogen: "400 Nm", prijs: "€62.000", type: "SUV", emoji: "🚗", kleur: "#2ecc71", nieuw: true },
  { naam: "BMW i4 M50", serie: "i Serie", pk: "544 pk", vermogen: "795 Nm", prijs: "€89.000", type: "Elektrisch", emoji: "🔋", kleur: "#8e44ad", nieuw: false },
  { naam: "BMW iX xDrive50", serie: "i Serie", pk: "523 pk", vermogen: "765 Nm", prijs: "€98.000", type: "Elektrisch", emoji: "⚡", kleur: "#9b59b6", nieuw: false },
  { naam: "BMW 3 Serie 320i", serie: "3 Serie", pk: "184 pk", vermogen: "300 Nm", prijs: "€48.000", type: "Sedan", emoji: "🚘", kleur: "#3498db", nieuw: false },
  { naam: "BMW 5 Serie 520d", serie: "5 Serie", pk: "197 pk", vermogen: "400 Nm", prijs: "€65.000", type: "Sedan", emoji: "🚖", kleur: "#2980b9", nieuw: true },
];

const series = ["Alle", "M Serie", "X Serie", "i Serie", "3 Serie", "5 Serie"];

export default function ModellenPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "5rem 1.5rem 4rem", textAlign: "center" }}>
        <p style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>Modellengids 2026</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "1rem" }}>Alle BMW Modellen</h1>
        <p style={{ color: "#888", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto" }}>
          Van zuinige sedan tot brullende M-auto — vind jouw ideale BMW.
        </p>
      </section>

      {/* Filter tabs (visual only) */}
      <section style={{ padding: "2rem 1.5rem 0", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {series.map((s, i) => (
            <span key={s} style={{ background: i === 0 ? "#1c69d4" : "#161616", border: "1px solid #2a2a2a", color: i === 0 ? "white" : "#888", borderRadius: "2rem", padding: "0.4rem 1.2rem", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "2.5rem 1.5rem 5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {modellen.map((model) => (
            <article key={model.naam} className="card-hover" style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "1.75rem", position: "relative" }}>
              {model.nieuw && (
                <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "#1c69d4", color: "white", borderRadius: "0.3rem", padding: "0.2rem 0.5rem", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "1px" }}>
                  NIEUW
                </div>
              )}
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{model.emoji}</div>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ background: `${model.kleur}22`, color: model.kleur, borderRadius: "0.3rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: 700 }}>{model.serie}</span>
                <span style={{ background: "#2a2a2a", color: "#888", borderRadius: "0.3rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem" }}>{model.type}</span>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>{model.naam}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{ background: "#1a1a1a", borderRadius: "0.5rem", padding: "0.75rem" }}>
                  <div style={{ color: "#555", fontSize: "0.75rem", marginBottom: "0.25rem" }}>Vermogen</div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{model.pk}</div>
                </div>
                <div style={{ background: "#1a1a1a", borderRadius: "0.5rem", padding: "0.75rem" }}>
                  <div style={{ color: "#555", fontSize: "0.75rem", marginBottom: "0.25rem" }}>Koppel</div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{model.vermogen}</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#1c69d4", fontWeight: 700 }}>{model.prijs}</span>
                <Link href="/blog" style={{ color: "#888", fontSize: "0.85rem", textDecoration: "none" }}>Review →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AffiliateShop
        titel="BMW accessoires & onderhoud"
        producten={[
          { naam: "BMW Poetsmiddel set", beschrijving: "Professionele reiniging voor je BMW lak.", zoekterm: "bmw poetsmiddel auto", emoji: "🧴", prijs: "v.a. €15" },
          { naam: "Dashcam voor BMW", beschrijving: "Beeldkwaliteit Full HD, eenvoudig te monteren.", zoekterm: "dashcam bmw auto", emoji: "📷", prijs: "v.a. €40" },
          { naam: "BMW vloermatten", beschrijving: "Op maat gemaakte vloermatten voor alle series.", zoekterm: "bmw vloermatten", emoji: "🟫", prijs: "v.a. €35" },
          { naam: "Motorolie BMW", beschrijving: "BMW goedgekeurde longlife motorolie.", zoekterm: "motorolie bmw longlife", emoji: "🛢️", prijs: "v.a. €25" },
          { naam: "BMW velgen winterbanden", beschrijving: "Complete winterwielen voor jouw BMW.", zoekterm: "bmw winterbanden velgen", emoji: "❄️", prijs: "v.a. €299" },
          { naam: "OBD2 uitleesapparaat", beschrijving: "Lees foutcodes uit je BMW met je smartphone.", zoekterm: "obd2 bmw uitlezen bluetooth", emoji: "🔧", prijs: "v.a. €20" },
          { naam: "BMW autohoezen", beschrijving: "Bescherm je BMW tegen regen en vuil.", zoekterm: "bmw autohoes", emoji: "🛡️", prijs: "v.a. €45" },
          { naam: "Carplay adapter BMW", beschrijving: "Draadloos Apple CarPlay voor oudere BMW's.", zoekterm: "carplay adapter bmw draadloos", emoji: "📱", prijs: "v.a. €55" },
        ]}
      />
    </div>
  );
}

