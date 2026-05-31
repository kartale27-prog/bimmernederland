import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMW FAQ – Veelgestelde vragen | BimmerNederland.nl",
  description: "Antwoorden op de meest gestelde vragen over BMW. Onderhoud, occasions, modellen, garantie, verzekering en meer.",
};

const faqItems = [
  {
    vraag: "Welke BMW is het betrouwbaarst als occasion?",
    antwoord: "De BMW F30 3 Serie (2012–2018) met de B48 viercilinder benzinemotor wordt algemeen beschouwd als een van de betrouwbaarste BMW occasions. Vermijd de N20-motor uit die periode wegens bekende kettingproblemen. De E90 met N52 motor is ook populair en solide mits goed onderhouden.",
  },
  {
    vraag: "Wat kost een grote beurt bij BMW gemiddeld?",
    antwoord: "Een grote beurt bij de officiële BMW dealer kost gemiddeld €350–€600 afhankelijk van het model en bouwjaar. Bij een gespecialiseerde onafhankelijke BMW-garage betaal je €150–€250. BMW Service Inclusive (bij aankoop af te sluiten) dekt alle beurten voor 5 jaar of 100.000 km.",
  },
  {
    vraag: "Is de BMW i4 een goede elektrische auto?",
    antwoord: "Ja. De BMW i4 wordt door rijtesters consistent hoog beoordeeld als beste of na-beste elektrische sedan. De rijdynamiek en afwerking zijn superieur aan de meeste concurrenten. De actieradius van de i4 eDrive40 is 590 km (WLTP), in de praktijk circa 450–500 km op de snelweg.",
  },
  {
    vraag: "Wat is het verschil tussen een BMW M-auto en een M-pakket?",
    antwoord: "Een echte M-auto (M3, M4, M5 etc.) is door BMW M GmbH ontwikkeld met eigen motor, onderstel en componenten. Een BMW met M-pakket (Sport Line, M Sport, etc.) is een gewone BMW met sportief uiterlijk en soms licht aangescherpte rijinstellingen. Qua prestaties zijn ze compleet anders.",
  },
  {
    vraag: "Hoeveel verliest een BMW gemiddeld aan waarde?",
    antwoord: "BMW's verliezen gemiddeld 40–50% van hun waarde in de eerste drie jaar. M-modellen en zeldzame uitvoeringen houden hun waarde beter: sommige M3 en M4 modellen dalen slechts 25–35% in drie jaar. De X-modellen scoren ook goed op restwaarde vergeleken met de Europese markt.",
  },
  {
    vraag: "Welke BMW is het goedkoopst in verzekering?",
    antwoord: "De BMW 1 Serie en 3 Serie met kleinere benzine- of dieselmotoren (116i, 318i, 320d) zijn het voordeligst te verzekeren. M-modellen en grote SUV's zoals de X5 en X6 M zijn het duurst. Factoren als postcode, leeftijd en rijervaring spelen ook een grote rol.",
  },
  {
    vraag: "Kan ik BMW iDrive zelf updaten?",
    antwoord: "Nieuwere BMW's met iDrive 8 en 9 ontvangen over-the-air (OTA) updates automatisch via WiFi, net als een smartphone. Voor oudere systemen (iDrive 6 en 7) zijn updates beschikbaar via een USB-stick, te downloaden via de BMW Connected Drive portal. Je dealer kan dit ook uitvoeren.",
  },
  {
    vraag: "Wat zijn de bekendste problemen met BMW?",
    antwoord: "Elke generatie kent zijn eigen kwetsbaarheden. Veelgenoemde aandachtspunten: N20/N26-motor (kettingproblemen), E60/E63 met V10 (VANOS en SMG-versnellingsbak), E92 M3 (throttle actuator), en diverse modellen met elektronische remmen (EMF). Een aankoopkeuring bij een BMW-specialist is altijd aan te raden.",
  },
  {
    vraag: "Moet ik altijd naar een officiële BMW-dealer voor onderhoud?",
    antwoord: "Nee. Zolang je onderhoud laat uitvoeren door een erkend garagebedrijf en de juiste BMW-goedgekeurde olie en onderdelen worden gebruikt, vervalt de garantie niet (EU-wetgeving: Block Exemption Regulation). Een gespecialiseerde BMW-garage is vaak goedkoper en heeft soms zelfs meer diepgaande kennis.",
  },
  {
    vraag: "Welke BMW is het beste voor lange ritten op de snelweg?",
    antwoord: "De BMW 5 Serie Touring of 3 Serie Touring met efficiënte dieselmotor (520d, 320d) zijn ideaal voor lange afstanden. Ze combineren een laag verbruik (1-op-20 is haalbaar), uitstekend weggedrag op de snelweg en voldoende kofferbakruimte. De BMW iX is de beste keuze als je elektrisch wil reizen.",
  },
  {
    vraag: "Is een BMW duurder in onderhoud dan een Mercedes of Audi?",
    antwoord: "BMW, Mercedes en Audi liggen qua onderhoudskosten dicht bij elkaar voor de normale modellen. BMW's worden licht gunstiger beoordeeld in onafhankelijke onderzoeken (o.a. ADAC) voor modellen uit 2018+. Hoge prestatiemodellen (M, AMG, RS) zijn bij alle merken significant duurder in onderhoud.",
  },
  {
    vraag: "Wanneer komt de volledig elektrische BMW M3?",
    antwoord: "BMW heeft bevestigd dat de Neue Klasse-architectuur de basis vormt voor toekomstige M-modellen. Een volledig elektrische M3 wordt verwacht rond 2026–2027. Vooralsnog biedt BMW M de i4 M50 en de hybride M5 als elektrisch georiënteerde sportmodellen.",
  },
];

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "5rem 1.5rem 4rem", textAlign: "center" }}>
        <p style={{ color: "#1c69d4", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>Veelgestelde vragen</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "1rem" }}>BMW FAQ</h1>
        <p style={{ color: "#888", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto" }}>
          Directe antwoorden op de meest gestelde vragen over BMW-modellen, onderhoud en occasions.
        </p>
      </section>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem 5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {faqItems.map((item, i) => (
          <details key={i} style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "0.75rem", overflow: "hidden" }}>
            <summary style={{ padding: "1.25rem 1.5rem", cursor: "pointer", fontWeight: 700, fontSize: "1rem", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <span>{item.vraag}</span>
              <span style={{ color: "#1c69d4", fontSize: "1.2rem", flexShrink: 0 }}>+</span>
            </summary>
            <div style={{ padding: "0 1.5rem 1.25rem", color: "#aaa", lineHeight: 1.8, borderTop: "1px solid #2a2a2a", marginTop: "0" }}>
              <div style={{ paddingTop: "1rem" }}>{item.antwoord}</div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

