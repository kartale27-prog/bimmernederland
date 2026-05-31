"use client";
import { useActionState } from "react";
import { updateNotifications } from "@/app/actions/account";

interface Props {
  notifEigenTopic: boolean;
  notifBetrokkenThread: boolean;
}

export default function NotificatiesForm({ notifEigenTopic, notifBetrokkenThread }: Props) {
  const [state, action, pending] = useActionState(updateNotifications, undefined);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {state?.success && (
        <div style={{ background: "rgba(39,174,96,0.15)", border: "1px solid rgba(39,174,96,0.4)", color: "#2ecc71", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
          ✅ Instellingen opgeslagen.
        </div>
      )}
      {state?.error && (
        <div style={{ background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#e74c3c", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
          {state.error}
        </div>
      )}

      <Toggle
        name="notifEigenTopic"
        defaultChecked={notifEigenTopic}
        label="Reactie op mijn topic"
        beschrijving="Ontvang een e-mail als iemand reageert op een topic dat jij hebt geplaatst."
      />
      <Toggle
        name="notifBetrokkenThread"
        defaultChecked={notifBetrokkenThread}
        label="Reactie in topic waar ik bij betrokken ben"
        beschrijving="Ontvang een e-mail als iemand reageert in een topic waar jij ook een reactie hebt geplaatst."
      />

      <div>
        <button type="submit" disabled={pending}
          style={{ background: "#1c69d4", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.7rem 1.5rem", fontWeight: 700, fontSize: "0.9rem", cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.7 : 1 }}>
          {pending ? "Opslaan..." : "Instellingen opslaan"}
        </button>
      </div>
    </form>
  );
}

function Toggle({ name, defaultChecked, label, beschrijving }: {
  name: string;
  defaultChecked: boolean;
  label: string;
  beschrijving: string;
}) {
  return (
    <label style={{ display: "flex", alignItems: "flex-start", gap: "1rem", cursor: "pointer", padding: "1rem", background: "#1a1a1a", borderRadius: "0.75rem", border: "1px solid #2a2a2a" }}>
      <div style={{ position: "relative", marginTop: "2px", flexShrink: 0 }}>
        <input type="checkbox" name={name} defaultChecked={defaultChecked}
          style={{ width: "42px", height: "24px", appearance: "none", background: defaultChecked ? "#1c69d4" : "#333", borderRadius: "999px", cursor: "pointer", transition: "background 0.2s", outline: "none", border: "none" }}
          onChange={e => { e.currentTarget.style.background = e.currentTarget.checked ? "#1c69d4" : "#333"; }}
        />
        <span style={{ position: "absolute", top: "3px", left: defaultChecked ? "20px" : "3px", width: "18px", height: "18px", background: "white", borderRadius: "50%", transition: "left 0.2s", pointerEvents: "none" }} />
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.25rem" }}>{label}</div>
        <div style={{ color: "#777", fontSize: "0.85rem", lineHeight: 1.5 }}>{beschrijving}</div>
      </div>
    </label>
  );
}
