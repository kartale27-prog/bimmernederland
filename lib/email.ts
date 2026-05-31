import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN = process.env.ADMIN_EMAIL ?? "kartal.e27@gmail.com";
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
// Zolang bimmernederland.nl nog niet geverifieerd is in Resend, sturen we via onboarding@resend.dev
const FROM = "BimmerNederland <onboarding@resend.dev>";

// Stuur alleen als de API key is ingesteld
function isConfigured() {
  const key = process.env.RESEND_API_KEY ?? "";
  return key.length > 0 && key !== "re_JOUW_API_KEY_HIER";
}

// ─── Nieuw account ────────────────────────────────────────────────
export async function mailNieuwAccount(username: string, email: string) {
  if (!isConfigured()) return;
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `👤 Nieuw lid: ${username}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden">
        <div style="background:#1c69d4;padding:20px 28px">
          <h1 style="margin:0;font-size:20px;color:#fff">BimmerNederland.nl</h1>
        </div>
        <div style="padding:28px">
          <h2 style="margin-top:0;color:#fff">Nieuw lid geregistreerd</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#888;width:130px">Gebruikersnaam</td><td style="color:#fff;font-weight:700">${username}</td></tr>
            <tr><td style="padding:8px 0;color:#888">E-mailadres</td><td style="color:#fff">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Tijdstip</td><td style="color:#fff">${new Date().toLocaleString("nl-NL")}</td></tr>
          </table>
        </div>
        <div style="padding:16px 28px;background:#111;color:#555;font-size:13px">
          BimmerNederland.nl — automatische melding
        </div>
      </div>`,
  });
}

// ─── Nieuw forum-topic ────────────────────────────────────────────
export async function mailNieuwTopic(opts: {
  username: string;
  titel: string;
  subforum: string;
  category: string;
  threadId: string;
  categorySlug: string;
  subforumSlug: string;
}) {
  if (!isConfigured()) return;
  const url = `${SITE}/forum/${opts.categorySlug}/${opts.subforumSlug}/${opts.threadId}`;
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `💬 Nieuw topic: ${opts.titel}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden">
        <div style="background:#1c69d4;padding:20px 28px">
          <h1 style="margin:0;font-size:20px;color:#fff">BimmerNederland.nl</h1>
        </div>
        <div style="padding:28px">
          <h2 style="margin-top:0;color:#fff">Nieuw forum-topic geplaatst</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#888;width:130px">Titel</td><td style="color:#fff;font-weight:700">${opts.titel}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Subforum</td><td style="color:#fff">${opts.category} › ${opts.subforum}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Geplaatst door</td><td style="color:#fff">${opts.username}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Tijdstip</td><td style="color:#fff">${new Date().toLocaleString("nl-NL")}</td></tr>
          </table>
          <a href="${url}" style="display:inline-block;margin-top:20px;background:#1c69d4;color:#fff;text-decoration:none;padding:10px 22px;border-radius:6px;font-weight:700">Topic bekijken →</a>
        </div>
        <div style="padding:16px 28px;background:#111;color:#555;font-size:13px">
          BimmerNederland.nl — automatische melding
        </div>
      </div>`,
  });
}

// ─── Nieuwe reactie ───────────────────────────────────────────────
export async function mailNieuweReactie(opts: {
  username: string;
  threadTitel: string;
  inhoud: string;
  subforum: string;
  category: string;
  threadId: string;
  categorySlug: string;
  subforumSlug: string;
}) {
  if (!isConfigured()) return;
  const url = `${SITE}/forum/${opts.categorySlug}/${opts.subforumSlug}/${opts.threadId}`;
  const preview = opts.inhoud.slice(0, 200) + (opts.inhoud.length > 200 ? "…" : "");
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `↩️ Nieuwe reactie in: ${opts.threadTitel}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden">
        <div style="background:#1c69d4;padding:20px 28px">
          <h1 style="margin:0;font-size:20px;color:#fff">BimmerNederland.nl</h1>
        </div>
        <div style="padding:28px">
          <h2 style="margin-top:0;color:#fff">Nieuwe reactie op forum</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#888;width:130px">Topic</td><td style="color:#fff;font-weight:700">${opts.threadTitel}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Subforum</td><td style="color:#fff">${opts.category} › ${opts.subforum}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Geschreven door</td><td style="color:#fff">${opts.username}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Tijdstip</td><td style="color:#fff">${new Date().toLocaleString("nl-NL")}</td></tr>
          </table>
          <div style="margin-top:20px;background:#161616;border-left:3px solid #1c69d4;padding:12px 16px;border-radius:4px;color:#ccc;font-size:14px;line-height:1.6">
            ${preview}
          </div>
          <a href="${url}" style="display:inline-block;margin-top:20px;background:#1c69d4;color:#fff;text-decoration:none;padding:10px 22px;border-radius:6px;font-weight:700">Reactie bekijken →</a>
        </div>
        <div style="padding:16px 28px;background:#111;color:#555;font-size:13px">
          BimmerNederland.nl — automatische melding
        </div>
      </div>`,
  });
}

// ─── Reactie-melding aan lid ──────────────────────────────────────
export async function mailReactieAanLid(opts: {
  ontvanger: string;
  ontvangerUsername: string;
  reactorUsername: string;
  threadTitel: string;
  inhoud: string;
  subforum: string;
  category: string;
  threadId: string;
  categorySlug: string;
  subforumSlug: string;
  type: "eigenTopic" | "betrokken";
}) {
  if (!isConfigured()) return;
  const url = `${SITE}/forum/${opts.categorySlug}/${opts.subforumSlug}/${opts.threadId}`;
  const preview = opts.inhoud.slice(0, 200) + (opts.inhoud.length > 200 ? "…" : "");
  const onderwerp = opts.type === "eigenTopic"
    ? `💬 ${opts.reactorUsername} reageerde op jouw topic`
    : `💬 Nieuwe reactie in een topic waar jij bij betrokken bent`;
  const uitlegZin = opts.type === "eigenTopic"
    ? `<strong>${opts.reactorUsername}</strong> heeft gereageerd op jouw topic:`
    : `<strong>${opts.reactorUsername}</strong> heeft gereageerd in een topic waar jij ook bij betrokken bent:`;

  await resend.emails.send({
    from: FROM,
    to: opts.ontvanger,
    subject: onderwerp,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden">
        <div style="background:#1c69d4;padding:20px 28px">
          <h1 style="margin:0;font-size:20px;color:#fff">BimmerNederland.nl</h1>
        </div>
        <div style="padding:28px">
          <p style="color:#aaa;margin-top:0">Hoi <strong style="color:#fff">${opts.ontvangerUsername}</strong>,</p>
          <p style="color:#aaa">${uitlegZin}</p>
          <h2 style="color:#fff;font-size:1.1rem;margin:0 0 16px">${opts.threadTitel}</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
            <tr><td style="padding:6px 0;color:#666;width:110px;font-size:13px">Subforum</td><td style="color:#aaa;font-size:13px">${opts.category} › ${opts.subforum}</td></tr>
          </table>
          <div style="background:#161616;border-left:3px solid #1c69d4;padding:12px 16px;border-radius:4px;color:#ccc;font-size:14px;line-height:1.6;margin-bottom:20px">
            ${preview}
          </div>
          <a href="${url}" style="display:inline-block;background:#1c69d4;color:#fff;text-decoration:none;padding:10px 22px;border-radius:6px;font-weight:700">Bekijk reactie →</a>
        </div>
        <div style="padding:16px 28px;background:#111;color:#555;font-size:12px;line-height:1.6">
          Je ontvangt deze melding omdat je dit hebt ingeschakeld in je accountinstellingen.
          Ga naar <a href="${SITE}/account" style="color:#888">Mijn account</a> om je meldingen te beheren.
        </div>
      </div>`,
  });
}

