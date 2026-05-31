const { createClient } = require("@libsql/client");
const path = require("path");
const fs = require("fs");

const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
const c = createClient({ url: "file:///" + dbPath.split("\\").join("/") });

// Zoek de nieuwste nog niet toegepaste migration
const migrationsDir = path.resolve(process.cwd(), "prisma/migrations");
const dirs = fs.readdirSync(migrationsDir).filter(d => d !== "migration_lock.toml").sort();

(async () => {
  for (const dir of dirs) {
    const sqlFile = path.join(migrationsDir, dir, "migration.sql");
    if (!fs.existsSync(sqlFile)) continue;
    const sql = fs.readFileSync(sqlFile, "utf-8");
    const stmts = sql.split(";").map(s => s.trim()).filter(s => s.length > 0);
    try {
      for (const stmt of stmts) {
        await c.execute(stmt);
      }
      console.log(`✅ ${dir}`);
    } catch (e) {
      if (e.message?.includes("already exists")) {
        console.log(`⏭  ${dir} (al toegepast)`);
      } else {
        console.error(`❌ ${dir}:`, e.message);
      }
    }
  }
  const rows = await c.execute("SELECT name FROM sqlite_master WHERE type='table'");
  console.log("Tabellen:", rows.rows.map(r => r.name).join(", "));
})().catch(console.error);
