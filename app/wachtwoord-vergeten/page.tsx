"use client";
import Link from "next/link";
import { useActionState } from "react";
import { wachtwoordReset } from "@/app/actions/auth";

export default function WachtwoordVergetenPage() {
  const [state, action, pending] = useActionState(wachtwoordReset, undefined);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ color: "#1c69d4", textDecoration: "none", fontSize: "1.5rem", fontWeight: 900 }}>
            BMW<span style={{ color: "white" }}>Nederland</span>
          </Link>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "1rem", marginBottom: "0.5rem" }}>Wachtwoord instellen</h1>
          <p style={{ color: "#888", lineHeight: 1.6 }}>
            Vul je e-mailadres in en kies een nieuw wachtwoord.
          </p>
        </div>

        {/* Info box */}
        <div style={{ background: "rgba(28,105,212,0.1)", border: "1px solid rgba(28,105,212,0.25)", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "#aaa", lineHeight: 1.6 }}>
          ℹ️ Voer het e-mailadres in waarmee je geregistreerd bent. Je kunt dan direct een nieuw wachtwoord instellen.
        </div>

        <form action={action} style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {state?.error && (
            <div style={{ background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#e74c3c", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
              {state.error}
            </div>
          )}

          {[
            { name: "email", label: "E-mailadres van je account", type: "email", placeholder: "jouw@email.nl" },
            { name: "newPassword", label: "Nieuw wachtwoord", type: "password", placeholder: "Minimaal 8 tekens" },
            { name: "confirm", label: "Herhaal nieuw wachtwoord", type: "password", placeholder: "Zelfde wachtwoord" },
          ].map(f => (
            <div key={f.name}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#ccc", marginBottom: "0.5rem" }}>{f.label}</label>
              <input name={f.name} type={f.type} placeholder={f.placeholder} required
                style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "0.5rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}

          <button type="submit" disabled={pending}
            style={{ background: "#1c69d4", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.85rem", fontWeight: 700, fontSize: "1rem", cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.7 : 1 }}>
            {pending ? "Even geduld..." : "Wachtwoord instellen"}
          </button>

          <p style={{ textAlign: "center", color: "#666", fontSize: "0.875rem" }}>
            <Link href="/inloggen" style={{ color: "#1c69d4", textDecoration: "none", fontWeight: 600 }}>← Terug naar inloggen</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
