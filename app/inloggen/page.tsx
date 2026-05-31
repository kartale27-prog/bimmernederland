"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { inloggen } from "@/app/actions/auth";

export default function InloggenPage() {
  return <Suspense><InloggenForm /></Suspense>;
}

function InloggenForm() {
  const [state, action, pending] = useActionState(inloggen, undefined);
  const params = useSearchParams();
  const resetSuccess = params.get("reset") === "1";

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ color: "#1c69d4", textDecoration: "none", fontSize: "1.5rem", fontWeight: 900 }}>
            BMW<span style={{ color: "white" }}>Nederland</span>
          </Link>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "1rem", marginBottom: "0.5rem" }}>Inloggen</h1>
          <p style={{ color: "#888" }}>Welkom terug in de community</p>
        </div>

        <form action={action} style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "1rem", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {resetSuccess && (
            <div style={{ background: "rgba(39,174,96,0.15)", border: "1px solid rgba(39,174,96,0.4)", color: "#2ecc71", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
              ✅ Wachtwoord succesvol gewijzigd. Je kunt nu inloggen.
            </div>
          )}

          {state?.error && (
            <div style={{ background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#e74c3c", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
              {state.error}
            </div>
          )}

          {[
            { name: "identifier", label: "E-mailadres of gebruikersnaam", type: "text", placeholder: "jouw@email.nl of gebruikersnaam" },
            { name: "password", label: "Wachtwoord", type: "password", placeholder: "Jouw wachtwoord" },
          ].map(f => (
            <div key={f.name}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#ccc", marginBottom: "0.5rem" }}>{f.label}</label>
              <input name={f.name} type={f.type} placeholder={f.placeholder} required
                style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "0.5rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}

          <button type="submit" disabled={pending}
            style={{ background: "#1c69d4", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.85rem", fontWeight: 700, fontSize: "1rem", cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.7 : 1 }}>
            {pending ? "Even geduld..." : "Inloggen"}
          </button>

          <p style={{ textAlign: "center", color: "#666", fontSize: "0.875rem" }}>
            <Link href="/wachtwoord-vergeten" style={{ color: "#888", textDecoration: "none" }}>Wachtwoord vergeten?</Link>
          </p>
          <p style={{ textAlign: "center", color: "#666", fontSize: "0.875rem" }}>
            Nog geen account?{" "}
            <Link href="/registreren" style={{ color: "#1c69d4", textDecoration: "none", fontWeight: 600 }}>Registreren</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
