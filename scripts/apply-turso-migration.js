const { createClient } = require("@libsql/client");

const client = createClient({
  url: "libsql://bimmernederland-kartale27-prog.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODAyNDE0MDMsImlkIjoiMDE5ZTdlYTctODcwMS03NGRjLWFhNTktZDhlNTQzMmI3YWExIiwicmlkIjoiOTgxMjY4ZTAtOWYwOC00NjA1LWFmNjMtYTM0MjFlNWYyNGFlIn0.65u42YTitLyRc7zWo8-a6hdmNh-s6GJsrfLCe-LfPXH3lOdcD1DSKnCtnqgkwBWBC7nV1tCzaCd2Nwc9vBWkDw",
});

(async () => {
  await client.execute("ALTER TABLE User ADD COLUMN avatarUrl TEXT");
  console.log("✅ avatarUrl kolom toegevoegd aan Turso");
})().catch(e => {
  if (e.message?.includes("duplicate column")) console.log("⏭  Al aanwezig");
  else console.error(e.message);
});
