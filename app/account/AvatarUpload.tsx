"use client";
import { useActionState, useRef, useState } from "react";
import { updateAvatar } from "@/app/actions/account";

interface Props {
  huidigAvatar?: string | null;
  username: string;
}

export default function AvatarUpload({ huidigAvatar, username }: Props) {
  const [state, action, pending] = useActionState(updateAvatar, undefined);
  const [preview, setPreview] = useState<string | null>(huidigAvatar ?? null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        // Verkleinen naar 200x200
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext("2d")!;

        // Bijsnijden naar vierkant
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;
        ctx.drawImage(img, x, y, size, size, 0, 0, 200, 200);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setPreview(dataUrl);
        if (hiddenRef.current) hiddenRef.current.value = dataUrl;
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {state?.success && (
        <div style={{ background: "rgba(39,174,96,0.15)", border: "1px solid rgba(39,174,96,0.4)", color: "#2ecc71", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
          ✅ Profielfoto opgeslagen.
        </div>
      )}
      {state?.error && (
        <div style={{ background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#e74c3c", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
          {state.error}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        {/* Avatar preview */}
        <div
          onClick={() => inputRef.current?.click()}
          style={{ width: "90px", height: "90px", borderRadius: "50%", overflow: "hidden", cursor: "pointer", border: "2px solid #2a2a2a", flexShrink: 0, position: "relative", background: "#1a1a1a" }}
        >
          {preview ? (
            <img src={preview} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `hsl(${username.charCodeAt(0) * 15}, 60%, 35%)`, fontWeight: 900, fontSize: "2rem", color: "white" }}>
              {username[0].toUpperCase()}
            </div>
          )}
          {/* Hover overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s", borderRadius: "50%", fontSize: "1.4rem" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
          >
            📷
          </div>
        </div>

        <div>
          <p style={{ color: "#ccc", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>Profielfoto</p>
          <p style={{ color: "#666", fontSize: "0.82rem", marginBottom: "0.75rem", lineHeight: 1.5 }}>
            JPG, PNG of GIF. Wordt bijgesneden naar vierkant, max 1MB.
          </p>
          <button type="button" onClick={() => inputRef.current?.click()}
            style={{ background: "#2a2a2a", border: "1px solid #3a3a3a", color: "#ccc", borderRadius: "0.4rem", padding: "0.5rem 1rem", fontSize: "0.85rem", cursor: "pointer", fontWeight: 600 }}>
            Foto kiezen
          </button>
        </div>
      </div>

      {/* Hidden inputs */}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
      <input ref={hiddenRef} type="hidden" name="avatarUrl" />

      {preview && (
        <div>
          <button type="submit" disabled={pending}
            style={{ background: "#1c69d4", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.7rem 1.5rem", fontWeight: 700, fontSize: "0.9rem", cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.7 : 1 }}>
            {pending ? "Opslaan..." : "Foto opslaan"}
          </button>
        </div>
      )}
    </form>
  );
}
