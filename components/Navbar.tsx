"use client";
import Link from "next/link";
import { useState } from "react";
import { uitloggen } from "@/app/actions/auth";

const links = [
  { href: "/", label: "Home" },
  { href: "/modellen", label: "Auto's" },
  { href: "/motoren", label: "Motoren 🏍️" },
  { href: "/forum", label: "Forum 💬" },
  { href: "/blog", label: "Blog" },
  { href: "/nieuws", label: "Nieuws" },
  { href: "/faq", label: "FAQ" },
];

interface Props {
  session?: { username: string } | null;
  avatarUrl?: string | null;
}

export default function Navbar({ session, avatarUrl }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: "#0a0a0aee", borderBottom: "1px solid #2a2a2a", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #1c69d4, #0a1628)", border: "2px solid #1c69d4", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "12px", color: "white" }}>
            BMW
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.2rem", color: "white", letterSpacing: "0.5px" }}>
            Bimmer<span style={{ color: "#1c69d4" }}>Nederland</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              style={{ color: "#cccccc", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1c69d4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#cccccc")}>
              {l.label}
            </Link>
          ))}

          {/* Auth */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginLeft: "0.5rem", paddingLeft: "1rem", borderLeft: "1px solid #2a2a2a" }}>
            {session ? (
              <>
                <Link href="/account" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1px solid #3a3a3a" }}>
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={session.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ width: "100%", height: "100%", background: "#1c69d4", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.75rem", color: "white" }}>
                        {session.username[0].toUpperCase()}
                      </span>
                    )}
                  </span>
                  {session.username}
                </Link>
                <form action={uitloggen}>
                  <button type="submit" style={{ background: "transparent", border: "1px solid #2a2a2a", color: "#888", borderRadius: "0.4rem", padding: "0.4rem 0.9rem", fontSize: "0.85rem", cursor: "pointer", fontWeight: 600 }}>
                    Uitloggen
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/inloggen" style={{ color: "#ccc", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem" }}>
                  Inloggen
                </Link>
                <Link href="/registreren" style={{ background: "#1c69d4", color: "white", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem", padding: "0.4rem 0.9rem", borderRadius: "0.4rem" }}>
                  Registreren
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "1.5rem", display: "none" }} className="mobile-menu-btn">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: "1px solid #2a2a2a", padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ color: "#cccccc", textDecoration: "none", fontWeight: 500 }}>
              {l.label}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: "1rem" }}>
            {session ? (
              <form action={uitloggen}>
                <button type="submit" style={{ background: "transparent", border: "1px solid #2a2a2a", color: "#888", borderRadius: "0.4rem", padding: "0.5rem 1rem", fontSize: "0.9rem", cursor: "pointer", width: "100%", textAlign: "left" }}>
                  Uitloggen ({session.username})
                </button>
              </form>
            ) : (
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Link href="/inloggen" onClick={() => setOpen(false)} style={{ color: "#ccc", textDecoration: "none", fontWeight: 600 }}>Inloggen</Link>
                <Link href="/registreren" onClick={() => setOpen(false)} style={{ color: "#1c69d4", textDecoration: "none", fontWeight: 600 }}>Registreren</Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
