const { createClient } = require("@libsql/client");
const fs = require("fs");
const path = require("path");

const client = createClient({
  url: "libsql://bimmernederland-kartale27-prog.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODAyNDE0MDMsImlkIjoiMDE5ZTdlYTctODcwMS03NGRjLWFhNTktZDhlNTQzMmI3YWExIiwicmlkIjoiOTgxMjY4ZTAtOWYwOC00NjA1LWFmNjMtYTM0MjFlNWYyNGFlIn0.65u42YTitLyRc7zWo8-a6hdmNh-s6GJsrfLCe-LfPXH3lOdcD1DSKnCtnqgkwBWBC7nV1tCzaCd2Nwc9vBWkDw",
});

const migrationsDir = path.resolve(__dirname, "../prisma/migrations");

async function run() {
  // Apply migrations
  const dirs = fs.readdirSync(migrationsDir)
    .filter(d => d !== "migration_lock.toml")
    .sort();

  console.log("Applying migrations...");
  for (const dir of dirs) {
    const sqlFile = path.join(migrationsDir, dir, "migration.sql");
    if (!fs.existsSync(sqlFile)) continue;
    const sql = fs.readFileSync(sqlFile, "utf-8");
    const stmts = sql.split(";").map(s => s.trim()).filter(s => s.length > 0);
    try {
      for (const stmt of stmts) await client.execute(stmt);
      console.log(`✅ ${dir}`);
    } catch (e) {
      if (e.message?.includes("already exists")) console.log(`⏭  ${dir} (already applied)`);
      else console.error(`❌ ${dir}:`, e.message);
    }
  }

  // Seed forum categories
  console.log("\nSeeding categories...");
  const { categories } = require("./seed-data.js");

  for (const cat of categories) {
    const { subforums, ...catData } = cat;
    try {
      await client.execute({
        sql: `INSERT OR IGNORE INTO ForumCategory (id, slug, naam, beschrijving, type, volgorde) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [crypto.randomUUID(), catData.slug, catData.naam, catData.beschrijving, catData.type, catData.volgorde],
      });
      const catRow = await client.execute({ sql: `SELECT id FROM ForumCategory WHERE slug = ?`, args: [catData.slug] });
      const catId = catRow.rows[0].id;
      for (const sub of subforums) {
        await client.execute({
          sql: `INSERT OR IGNORE INTO ForumSubforum (id, slug, naam, beschrijving, categoryId, volgorde) VALUES (?, ?, ?, ?, ?, ?)`,
          args: [crypto.randomUUID(), sub.slug, sub.naam, sub.beschrijving, catId, sub.volgorde],
        });
      }
    } catch (e) {
      console.error(`❌ ${catData.slug}:`, e.message);
    }
  }

  const r = await client.execute("SELECT COUNT(*) as n FROM ForumCategory");
  console.log(`✅ ${r.rows[0].n} categories in database`);
}

run().catch(console.error);
