import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMW Nieuws 2026 | BimmerNederland.nl",
  description: "Laatste BMW nieuws uit Nederland en de wereld. Nieuwe modellen, onthullingen, prijzen en events. Dagelijks bijgewerkt.",
};

const nieuwsItems = [
  { titel: "BMW onthult de M3 Touring CS met 560 pk", datum: "28 mei 2026", tag: "Onthulling", urgent: true, tekst: "Op de motor show in München onthulde BMW de meest extreme M3 ooit: de Touring CS. Met een handgeschakelde versnellingsbak en carbon dak richt hij zich op de hardcore rijder." },
  { titel: "Nieuwe BMW X3 is nu te bestellen in Nederland", datum: "25 mei 2026", tag: "Markt", urgent: false, tekst: "De volledig vernieuwde BMW X3 is nu te configureren en te bestellen bij Nederlandse dealers. Leveringen starten in augustus 2026." },
  { titel: "BMW M5 Touring scoort 7:32 op Nürburgring", datum: "20 mei 2026", tag: "Record", urgent: false, tekst: "BMW heeft officieel de rondetijd vrijgegeven van de nieuwe M5 Touring op de Nordschleife: 7 minuten en 32 seconden. Snelste productie-stationwagen ooit." },
  { titel: "BMW stopt met verbrandingsmotoren in 2030", datum: "18 mei 2026", tag: "Strategie", urgent: false, tekst: "BMW bevestigt dat alle nieuwe modellen vanaf 2030 volledig elektrisch zullen zijn op de Europese markt. De i-divisie wordt hiermee het hart van het merk." },
  { titel: "BMW i4 wint prijs voor beste elektrische sedan", datum: "15 mei 2026", tag: "Award", urgent: false, tekst: "Voor het tweede jaar op rij wint de BMW i4 de prestigieuze 'Best EV Sedan' award van Autovisie. De combinatie van rijdynamiek en actieradius overtuigt de jury." },
  { titel: "Prijzen BMW 5 Serie 2026 bekend", datum: "12 mei 2026", tag: "Prijzen", urgent: false, tekst: "BMW Nederland heeft de prijslijst van de vernieuwde 5 Serie gepubliceerd. De instapversie 520i begint bij €58.900. De volledig elektrische i5 kost vanaf €78.500." },
];

const tags = ["Alles", "Onthulling", "Markt", "Record", "Strategie", "Award", "Prijzen"];

export default function NieuwsPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "5rem 1.5rem 4rem", textAlign: "center" }}>
        <p style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>Dagelijks bijgewerkt</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "1rem" }}>BMW Nieuws</h1>
        <p style={{ color: "#888", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto" }}>
          Alles wat er speelt in de BMW wereld, als eerste te lezen op BimmerNederland.nl
        </p>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Filter */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {tags.map((t, i) => (
            <span key={t} style={{ background: i === 0 ? "#1c69d4" : "#161616", border: "1px solid #2a2a2a", color: i === 0 ? "white" : "#888", borderRadius: "2rem", padding: "0.4rem 1.2rem", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
              {t}
            </span>
          ))}
        </div>

        {/* News list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {nieuwsItems.map((item) => (
            <article key={item.titel} className="card-hover" style={{ background: "#161616", border: `1px solid ${item.urgent ? "rgba(28,105,212,0.4)" : "#2a2a2a"}`, borderRadius: "1rem", padding: "1.75rem", position: "relative" }}>
              {item.urgent && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #1c69d4, #0a4d9e)", borderRadius: "1rem 1rem 0 0" }} />
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  {item.urgent && <span style={{ background: "#1c69d4", color: "white", borderRadius: "0.3rem", padding: "0.15rem 0.5rem", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "1px" }}>NIEUW</span>}
                  <span style={{ background: "rgba(28,105,212,0.15)", color: "#1c69d4", borderRadius: "0.3rem", padding: "0.2rem 0.6rem", fontSize: "0.75rem", fontWeight: 700 }}>{item.tag}</span>
                </div>
                <span style={{ color: "#555", fontSize: "0.8rem" }}>📅 {item.datum}</span>
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.4 }}>{item.titel}</h2>
              <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.tekst}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

