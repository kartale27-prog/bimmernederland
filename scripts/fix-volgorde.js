const { createClient } = require("@libsql/client");

const client = createClient({
  url: "libsql://bimmernederland-kartale27-prog.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODAyNDE0MDMsImlkIjoiMDE5ZTdlYTctODcwMS03NGRjLWFhNTktZDhlNTQzMmI3YWExIiwicmlkIjoiOTgxMjY4ZTAtOWYwOC00NjA1LWFmNjMtYTM0MjFlNWYyNGFlIn0.65u42YTitLyRc7zWo8-a6hdmNh-s6GJsrfLCe-LfPXH3lOdcD1DSKnCtnqgkwBWBC7nV1tCzaCd2Nwc9vBWkDw",
});

// Correcte volgorde per serie: slug -> volgorde nummer
const correcteVolgorde = {
  // ── 1 Serie ──────────────────────────────────────────
  "1-serie-techniek":       0,
  "1-serie-aankoop":        1,
  "1-serie-e87-e81":        2,  // E87/E81 (2004–2011)
  "1-serie-f20-f21":        3,  // F20/F21 (2011–2019)
  "1-serie-modificaties":   4,

  // ── 2 Serie ──────────────────────────────────────────
  "2-serie-techniek":       0,
  "2-serie-aankoop":        1,
  "2-serie-f22-f23":        2,  // F22/F23 Coupé (2013–2021)
  "2-serie-f45-f46":        3,  // F45/F46 Active Tourer (2014–2021)
  "2-serie-g42-g87":        4,  // G42 + M2 G87 (2021+)

  // ── 3 Serie ──────────────────────────────────────────
  "3-serie-techniek":       0,
  "3-serie-aankoop":        1,
  "3-serie-e30":            2,  // E30 (1982–1994)
  "3-serie-e36":            3,  // E36 (1990–2000)
  "3-serie-e46":            4,  // E46 (1998–2006)
  "3-serie-e90":            5,  // E90/E91/E92/E93 (2005–2012)
  "3-serie-f30":            6,  // F30/F31 (2012–2019)
  "3-serie-g20":            7,  // G20/G21 (2019+)

  // ── 4 Serie ──────────────────────────────────────────
  "4-serie-techniek":       0,
  "4-serie-aankoop":        1,
  "4-serie-f32-f33":        2,  // F32/F33/F36 (2013–2020)
  "m4-f82-g82":             3,  // M4 (F82/G82)

  // ── 5 Serie ──────────────────────────────────────────
  "5-serie-techniek":       0,
  "5-serie-aankoop":        1,
  "5-serie-e12-e28":        2,  // E12 & E28 (1972–1988)
  "5-serie-e34":            3,  // E34 (1988–1996)
  "5-serie-e39":            4,  // E39 (1995–2004)
  "5-serie-e60":            5,  // E60/E61 (2003–2010)
  "5-serie-f10":            6,  // F10/F11 (2010–2017)
  "5-serie-g30":            7,  // G30/G31 (2017+)
  "m5-forum":               8,  // M5 Forum (alle generaties)

  // ── 6 Serie ──────────────────────────────────────────
  "6-serie-techniek":       0,
  "6-serie-aankoop":        1,
  "6-serie-e24":            2,  // E24 (1976–1989)
  "6-serie-e63-e64":        3,  // E63/E64 (2003–2010)
  "6-serie-f12-f13":        4,  // F12/F13 (2011–2018)

  // ── 7 Serie ──────────────────────────────────────────
  "7-serie-techniek":       0,
  "7-serie-aankoop":        1,
  "7-serie-e23-e32":        2,  // E23 & E32 (1977–1994)
  "7-serie-e38":            3,  // E38 (1994–2001)
  "7-serie-e65-e66":        4,  // E65/E66 (2001–2008)
  "7-serie-f01":            5,  // F01/F02 (2008–2015)

  // ── 8 Serie ──────────────────────────────────────────
  "8-serie-techniek":       0,
  "8-serie-aankoop":        1,
  "8-serie-e31":            2,  // E31 (1989–1999)

  // ── GS Serie Motor ───────────────────────────────────
  "r1300gs-forum":          0,
  "r1250gs-forum":          1,
  "r1200gs-forum":          2,
  "f900gs-forum":           3,
  "g310gs-forum":           4,
  "gs-reizen-expeditie":    5,
};

async function run() {
  let updated = 0;
  for (const [slug, volgorde] of Object.entries(correcteVolgorde)) {
    const result = await client.execute({
      sql: "UPDATE ForumSubforum SET volgorde = ? WHERE slug = ?",
      args: [volgorde, slug],
    });
    if (result.rowsAffected > 0) {
      updated++;
    } else {
      console.log(`⚠️  Niet gevonden: ${slug}`);
    }
  }
  console.log(`✅ ${updated} subforums bijgewerkt`);
}

run().catch(console.error);
