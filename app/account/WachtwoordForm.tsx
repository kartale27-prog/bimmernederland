"use client";
import { useActionState } from "react";
import { updateWachtwoord } from "@/app/actions/account";

export default function WachtwoordForm() {
  const [state, action, pending] = useActionState(updateWachtwoord, undefined);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {state?.success && (
        <div style={{ background: "rgba(39,174,96,0.15)", border: "1px solid rgba(39,174,96,0.4)", color: "#2ecc71", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
          ✅ Wachtwoord succesvol gewijzigd.
        </div>
      )}
      {state?.error && (
        <div style={{ background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#e74c3c", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
          {state.error}
        </div>
      )}

      {[
        { name: "nieuw",    label: "Nieuw wachtwoord",         placeholder: "Minimaal 8 tekens" },
        { name: "bevestig", label: "Herhaal nieuw wachtwoord", placeholder: "Zelfde wachtwoord" },
      ].map(f => (
        <div key={f.name}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#ccc", marginBottom: "0.5rem" }}>{f.label}</label>
          <input name={f.name} type="password" placeholder={f.placeholder} required
            style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "0.5rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
        </div>
      ))}

      <div>
        <button type="submit" disabled={pending}
          style={{ background: "#2a2a2a", color: "white", border: "1px solid #3a3a3a", borderRadius: "0.5rem", padding: "0.7rem 1.5rem", fontWeight: 700, fontSize: "0.9rem", cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.7 : 1 }}>
          {pending ? "Opslaan..." : "Wachtwoord wijzigen"}
        </button>
      </div>
    </form>
  );
}
