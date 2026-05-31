"use client";
import { useRef, useState, useTransition } from "react";
import { updateAvatar } from "@/app/actions/account";

interface Props {
  huidigAvatar?: string | null;
  username: string;
}

export default function AvatarUpload({ huidigAvatar, username }: Props) {
  const [preview, setPreview] = useState<string | null>(huidigAvatar ?? null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setSuccess(false);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext("2d")!;
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;
        ctx.drawImage(img, x, y, size, size, 0, 0, 200, 200);
        const result = canvas.toDataURL("image/jpeg", 0.85);
        setPreview(result);
        setDataUrl(result);
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!dataUrl) return;
    startTransition(async () => {
      const formData = new FormData();
      formData.set("avatarUrl", dataUrl);
      const result = await updateAvatar(undefined, formData);
      if (result?.error) setError(result.error);
      else { setSuccess(true); setDataUrl(null); }
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {success && (
        <div style={{ background: "rgba(39,174,96,0.15)", border: "1px solid rgba(39,174,96,0.4)", color: "#2ecc71", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
          ✅ Profielfoto opgeslagen.
        </div>
      )}
      {error && (
        <div style={{ background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#e74c3c", padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9rem" }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        {/* Avatar preview */}
        <div onClick={() => inputRef.current?.click()}
          style={{ width: "90px", height: "90px", borderRadius: "50%", overflow: "hidden", cursor: "pointer", border: "2px solid #3a3a3a", flexShrink: 0, position: "relative" }}>
          {preview ? (
            <img src={preview} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: `hsl(${username.charCodeAt(0) * 15}, 60%, 35%)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "2rem", color: "white" }}>
              {username[0].toUpperCase()}
            </div>
          )}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", opacity: 0, transition: "opacity 0.2s", borderRadius: "50%" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0")}>
            📷
          </div>
        </div>

        <div>
          <p style={{ color: "#ccc", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.95rem" }}>Profielfoto</p>
          <p style={{ color: "#666", fontSize: "0.82rem", marginBottom: "0.75rem", lineHeight: 1.5 }}>
            JPG, PNG of GIF — wordt bijgesneden naar vierkant.
          </p>
          <button type="button" onClick={() => inputRef.current?.click()}
            style={{ background: "#2a2a2a", border: "1px solid #3a3a3a", color: "#ccc", borderRadius: "0.4rem", padding: "0.5rem 1rem", fontSize: "0.85rem", cursor: "pointer", fontWeight: 600 }}>
            Foto kiezen
          </button>
        </div>
      </div>

      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />

      {dataUrl && (
        <div>
          <button type="button" onClick={handleSave} disabled={isPending}
            style={{ background: "#1c69d4", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.7rem 1.5rem", fontWeight: 700, fontSize: "0.9rem", cursor: isPending ? "not-allowed" : "pointer", opacity: isPending ? 0.7 : 1 }}>
            {isPending ? "Opslaan..." : "Foto opslaan"}
          </button>
        </div>
      )}
    </div>
  );
}
