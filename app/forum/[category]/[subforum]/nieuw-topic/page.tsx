"use client";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import { createThread } from "@/app/actions/forum";
import { useParams } from "next/navigation";

export default function NieuwTopicPage() {
  const params = useParams();
  const catSlug = params.category as string;
  const subSlug = params.subforum as string;
  const [state, action, pending] = useActionState(createThread, undefined);

  return (
    <div style={{ minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #0d1b3e)", padding: "3rem 1.5rem 2.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", color: "#555", marginBottom: "1rem" }}>
            <Link href="/forum" style={{ color: "#1c69d4", textDecoration: "none" }}>Forum</Link>
            <span>›</span>
            <Link href={`/forum/${catSlug}/${subSlug}`} style={{ color: "#1c69d4", textDecoration: "none" }}>Terug</Link>
            <span>›</span>
            <span style={{ color: "#888" }}>Nieuw topic</span>
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900 }}>Nieuw topic plaatsen</h1>
        </div>
      </section>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        <form action={action} style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <SubforumIdField subSlug={subSlug} />

          {state?.error && (
            <div style={{ background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#e74c3c", padding: "0.75rem 1rem", borderRadius: "0.5rem" }}>
              {state.error}
            </div>
          )}

          <div>
            <label style={{ display: "block", fontWeight: 600, color: "#ccc", marginBottom: "0.5rem" }}>Onderwerp *</label>
            <input name="titel" type="text" placeholder="Beschrijf je vraag of onderwerp duidelijk..." required
              style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "0.5rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, color: "#ccc", marginBottom: "0.5rem" }}>Bericht *</label>
            <textarea name="inhoud" rows={10} placeholder="Beschrijf je situatie zo duidelijk mogelijk. Geef het bouwjaar, uitvoering en eventuele foutcodes mee voor de beste hulp..." required
              style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "0.5rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.95rem", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
            <Link href={`/forum/${catSlug}/${subSlug}`}
              style={{ background: "transparent", color: "#888", border: "1px solid #2a2a2a", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600 }}>
              Annuleren
            </Link>
            <button type="submit" disabled={pending}
              style={{ background: "#1c69d4", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.75rem 1.75rem", fontWeight: 700, fontSize: "1rem", cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.7 : 1 }}>
              {pending ? "Plaatsen..." : "Topic plaatsen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SubforumIdField({ subSlug }: { subSlug: string }) {
  useEffect(() => {
    fetch(`/api/subforum-id?slug=${subSlug}`)
      .then(r => r.json())
      .then(d => {
        const el = document.getElementById("subforumIdInput") as HTMLInputElement | null;
        if (el && d.id) el.value = d.id;
      })
      .catch(() => {});
  }, [subSlug]);
  return <input type="hidden" name="subforumId" id="subforumIdInput" />;
}
