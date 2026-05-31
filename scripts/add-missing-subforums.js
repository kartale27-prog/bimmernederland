const { createClient } = require("@libsql/client");
const { randomUUID } = require("crypto");

const client = createClient({
  url: "libsql://bimmernederland-kartale27-prog.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODAyNDE0MDMsImlkIjoiMDE5ZTdlYTctODcwMS03NGRjLWFhNTktZDhlNTQzMmI3YWExIiwicmlkIjoiOTgxMjY4ZTAtOWYwOC00NjA1LWFmNjMtYTM0MjFlNWYyNGFlIn0.65u42YTitLyRc7zWo8-a6hdmNh-s6GJsrfLCe-LfPXH3lOdcD1DSKnCtnqgkwBWBC7nV1tCzaCd2Nwc9vBWkDw",
});

// Nieuwe subforums per categorie
const toevoegen = [
  // ── 3 Serie ──────────────────────────────────────────────────────
  { categorieSlug: "serie-3", subforums: [
    { slug: "3-serie-e30", naam: "E30 Specifiek (1982–1994)", beschrijving: "De legendarische E30 — ook de originele M3.", volgorde: 5 },
    { slug: "3-serie-e36", naam: "E36 Specifiek (1990–2000)", beschrijving: "Populaire klassieker, koopadvies en onderhoud.", volgorde: 6 },
    { slug: "3-serie-e46", naam: "E46 Specifiek (1998–2006)", beschrijving: "Alles over de populaire E46.", volgorde: 7 },
    { slug: "3-serie-e90", naam: "E90/E91/E92/E93 (2005–2012)", beschrijving: "De vierde generatie 3 Serie.", volgorde: 8 },
  ]},

  // ── 5 Serie ──────────────────────────────────────────────────────
  { categorieSlug: "serie-5", subforums: [
    { slug: "5-serie-e12-e28", naam: "E12 & E28 (1972–1988)", beschrijving: "De eerste en tweede generatie 5 Serie — klassiekers.", volgorde: 6 },
    { slug: "5-serie-e34", naam: "E34 Specifiek (1988–1996)", beschrijving: "Betrouwbare jaren-90 klassieker, ook als Touring.", volgorde: 7 },
    { slug: "5-serie-e39", naam: "E39 Specifiek (1995–2004)", beschrijving: "Door velen de mooiste 5 Serie ooit. E39 M5 ook hier.", volgorde: 8 },
  ]},

  // ── 7 Serie ──────────────────────────────────────────────────────
  { categorieSlug: "serie-7", subforums: [
    { slug: "7-serie-e23-e32", naam: "E23 & E32 (1977–1994)", beschrijving: "Vroege 7 Serie generaties — klassiekers.", volgorde: 2 },
    { slug: "7-serie-e38", naam: "E38 Specifiek (1994–2001)", beschrijving: "Meest geliefde 7 Serie door fans wereldwijd.", volgorde: 3 },
    { slug: "7-serie-e65-e66", naam: "E65/E66 Specifiek (2001–2008)", beschrijving: "Controversieel design van Chris Bangle, veel elektronica.", volgorde: 4 },
    { slug: "7-serie-f01", naam: "F01/F02 Specifiek (2008–2015)", beschrijving: "Moderne luxe 7 Serie met veel technologie.", volgorde: 5 },
  ]},

  // ── 6 Serie ──────────────────────────────────────────────────────
  { categorieSlug: "serie-6", subforums: [
    { slug: "6-serie-e24", naam: "E24 Specifiek (1976–1989)", beschrijving: "De klassieke E24 coupé — tijdloos design.", volgorde: 2 },
    { slug: "6-serie-e63-e64", naam: "E63/E64 Specifiek (2003–2010)", beschrijving: "Coupé en cabrio — ook M6 hier.", volgorde: 3 },
    { slug: "6-serie-f12-f13", naam: "F12/F13 Specifiek (2011–2018)", beschrijving: "Moderne 6 Serie coupé en cabrio.", volgorde: 4 },
  ]},

  // ── 8 Serie ──────────────────────────────────────────────────────
  { categorieSlug: "serie-8", subforums: [
    { slug: "8-serie-e31", naam: "E31 Specifiek (1989–1999)", beschrijving: "De originele 8 Serie — V12 grand tourer.", volgorde: 2 },
  ]},

  // ── 2 Serie ──────────────────────────────────────────────────────
  { categorieSlug: "serie-2", subforums: [
    { slug: "2-serie-f22-f23", naam: "F22/F23 Coupé & Cabrio (2013–2021)", beschrijving: "Achterwielaandrijving, ook M2 hier.", volgorde: 2 },
    { slug: "2-serie-f45-f46", naam: "F45/F46 Active/Gran Tourer (2014–2021)", beschrijving: "Voorwielaandrijving, gezinsvriendelijk.", volgorde: 3 },
    { slug: "2-serie-g42-g87", naam: "G42 Coupé & M2 G87 (2021+)", beschrijving: "Nieuwste generatie — ook de G87 M2.", volgorde: 4 },
  ]},

  // ── 4 Serie ──────────────────────────────────────────────────────
  { categorieSlug: "serie-4", subforums: [
    { slug: "4-serie-f32-f33", naam: "F32/F33/F36 (2013–2020)", beschrijving: "Eerste generatie 4 Serie — coupé, cabrio en gran coupé.", volgorde: 3 },
  ]},

  // ── 1 Serie ──────────────────────────────────────────────────────
  { categorieSlug: "serie-1", subforums: [
    { slug: "1-serie-e87-e81", naam: "E87/E81 (2004–2011)", beschrijving: "Eerste 1 Serie hatchback met achterwielaandrijving.", volgorde: 3 },
    { slug: "1-serie-f20-f21", naam: "F20/F21 (2011–2019)", beschrijving: "Tweede generatie — populaire instapper.", volgorde: 4 },
  ]},
];

async function run() {
  for (const { categorieSlug, subforums } of toevoegen) {
    const catRow = await client.execute({
      sql: "SELECT id FROM ForumCategory WHERE slug = ?",
      args: [categorieSlug],
    });
    if (catRow.rows.length === 0) {
      console.log(`❌ Categorie niet gevonden: ${categorieSlug}`);
      continue;
    }
    const categoryId = catRow.rows[0].id;

    for (const sub of subforums) {
      // Check of het al bestaat
      const existing = await client.execute({
        sql: "SELECT id FROM ForumSubforum WHERE slug = ?",
        args: [sub.slug],
      });
      if (existing.rows.length > 0) {
        console.log(`⏭  Al aanwezig: ${sub.slug}`);
        continue;
      }

      await client.execute({
        sql: "INSERT INTO ForumSubforum (id, slug, naam, beschrijving, categoryId, volgorde) VALUES (?, ?, ?, ?, ?, ?)",
        args: [randomUUID(), sub.slug, sub.naam, sub.beschrijving, categoryId, sub.volgorde],
      });
      console.log(`✅ Toegevoegd: ${sub.naam}`);
    }
  }

  // Verificatie
  const count = await client.execute("SELECT COUNT(*) as n FROM ForumSubforum");
  console.log(`\nTotaal subforums in database: ${count.rows[0].n}`);
}

run().catch(console.error);
