import Link from "next/link";
import AffiliateShop from "@/components/AffiliateShop";

const featuredModels = [
  { naam: "BMW M3 Competition", klasse: "Sportwagen", pk: "510 pk", prijs: "vanaf €105.000", emoji: "🏎️", kleur: "#1c69d4" },
  { naam: "BMW M5 xDrive", klasse: "Sportsaloon", pk: "727 pk", prijs: "vanaf €165.000", emoji: "⚡", kleur: "#c0392b" },
  { naam: "BMW X5 M60i", klasse: "SUV", pk: "489 pk", prijs: "vanaf €135.000", emoji: "🚙", kleur: "#27ae60" },
  { naam: "BMW i4 M50", klasse: "Elektrisch", pk: "544 pk", prijs: "vanaf €89.000", emoji: "🔋", kleur: "#8e44ad" },
];

const nieuws = [
  {
    titel: "BMW onthult de nieuwe M3 Touring CS",
    datum: "28 mei 2026",
    samenvatting: "BMW heeft de meest krachtige stationwagen ooit gepresenteerd met maar liefst 560 pk.",
    tag: "Onthulling",
  },
  {
    titel: "Test: BMW M5 Touring op de Nürburgring",
    datum: "20 mei 2026",
    samenvatting: "We reden met de nieuwe M5 Touring op het beroemde circuit. Indrukwekkende prestaties.",
    tag: "Test",
  },
  {
    titel: "BMW i-divisie groeit met 40% in 2026",
    datum: "15 mei 2026",
    samenvatting: "Elektrische BMW's worden steeds populairder. De i4 en iX5 zijn de bestverkopers.",
    tag: "Markt",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #0d1b3e 50%, #0a0a0a 100%)", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(28,105,212,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(28,105,212,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "800px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", background: "rgba(28,105,212,0.15)", border: "1px solid rgba(28,105,212,0.4)", borderRadius: "2rem", padding: "0.4rem 1.2rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "#1c69d4", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
            #1 BMW Community Nederland
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-1px" }}>
            Alles over <span style={{ color: "#1c69d4" }}>BMW</span> op één plek
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#999", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Nieuws, diepgaande reviews, modellengids en de grootste BMW community van Nederland. Voor echte BMW-liefhebbers.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/modellen" style={{ background: "#1c69d4", color: "white", padding: "0.85rem 2rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>
              Bekijk modellen
            </Link>
            <Link href="/blog" style={{ background: "transparent", color: "white", padding: "0.85rem 2rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 700, fontSize: "1rem", border: "1px solid #2a2a2a" }}>
              Lees artikelen
            </Link>
          </div>
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", marginTop: "4rem", flexWrap: "wrap" }}>
            {[["50+", "BMW Modellen"], ["200+", "Artikelen"], ["10k+", "Maandelijkse lezers"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#1c69d4" }}>{num}</div>
                <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured models */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>Modellengids</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>Uitgelichte modellen</h2>
          </div>
          <Link href="/modellen" style={{ color: "#1c69d4", textDecoration: "none", fontWeight: 600 }}>Alle modellen →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {featuredModels.map((model) => (
            <div key={model.naam} className="card-hover" style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "1.75rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{model.emoji}</div>
              <div style={{ display: "inline-block", background: `${model.kleur}22`, color: model.kleur, borderRadius: "0.3rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                {model.klasse}
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{model.naam}</h3>
              <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1rem" }}>{model.pk}</p>
              <p style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.9rem" }}>{model.prijs}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest news */}
      <section style={{ padding: "5rem 1.5rem", background: "#0d0d0d" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>Laatste nieuws</p>
              <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>BMW nieuws & updates</h2>
            </div>
            <Link href="/nieuws" style={{ color: "#1c69d4", textDecoration: "none", fontWeight: 600 }}>Alle nieuws →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {nieuws.map((item) => (
              <article key={item.titel} className="card-hover" style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ background: "rgba(28,105,212,0.15)", color: "#1c69d4", borderRadius: "0.3rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: 700 }}>{item.tag}</span>
                  <span style={{ color: "#555", fontSize: "0.8rem" }}>{item.datum}</span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.4 }}>{item.titel}</h3>
                <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.samenvatting}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Motorrad teaser */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg, #1a0d00, #2a1500, #1a0d00)", border: "1px solid #3a2000", borderRadius: "1.5rem", padding: "3rem 2rem", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ maxWidth: "550px" }}>
            <p style={{ color: "#e67e22", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.75rem" }}>BMW Motorrad</p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, marginBottom: "1rem" }}>Niet alleen auto's — ook motoren</h2>
            <p style={{ color: "#999", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Van de iconische R 1300 GS Adventure tot de razendsnelle M 1000 RR. BMW Motorrad bouwt de beste motorfietsen ter wereld. Bekijk alle {18} modellen inclusief specs en prijzen.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {["🏔️ GS Adventure", "🏁 S 1000 RR", "🤠 R 18 Cruiser", "🔋 CE 04 Elektrisch"].map((label) => (
                <span key={label} style={{ background: "rgba(230,126,34,0.15)", color: "#e67e22", border: "1px solid rgba(230,126,34,0.3)", borderRadius: "2rem", padding: "0.3rem 0.9rem", fontSize: "0.8rem", fontWeight: 600 }}>{label}</span>
              ))}
            </div>
          </div>
          <Link href="/motoren" style={{ background: "#e67e22", color: "white", padding: "0.85rem 2.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 700, fontSize: "1rem", whiteSpace: "nowrap", flexShrink: 0 }}>
            Alle BMW motoren →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center", background: "linear-gradient(135deg, #0a1628, #0a0a0a)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Blijf op de hoogte</h2>
          <p style={{ color: "#888", marginBottom: "2rem", lineHeight: 1.6 }}>
            Geen BMW-nieuws meer missen? Bookmark deze pagina of volg ons voor dagelijkse updates.
          </p>
          <Link href="/nieuws" style={{ background: "#1c69d4", color: "white", padding: "0.85rem 2.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 700, fontSize: "1rem" }}>
            Naar het nieuws
          </Link>
        </div>
      </section>

      <AffiliateShop
        titel="Populaire BMW producten"
        producten={[
          { naam: "BMW poetsmiddel", beschrijving: "Professionele lak- en interieurreiniging.", zoekterm: "bmw poetsmiddel auto", emoji: "🧴", prijs: "v.a. €15" },
          { naam: "OBD2 scanner BMW", beschrijving: "Lees zelf foutcodes uit via je telefoon.", zoekterm: "obd2 bmw scanner bluetooth", emoji: "🔧", prijs: "v.a. €20" },
          { naam: "Dashcam full HD", beschrijving: "Beveiliging en bewijs bij een aanrijding.", zoekterm: "dashcam auto full hd", emoji: "📷", prijs: "v.a. €40" },
          { naam: "BMW vloermatten", beschrijving: "Op maat voor alle BMW modellen.", zoekterm: "bmw vloermatten rubber", emoji: "🟫", prijs: "v.a. €35" },
        ]}
      />
    </div>
  );
}
