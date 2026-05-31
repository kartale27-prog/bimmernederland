import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0d0d0d", borderTop: "1px solid #2a2a2a", padding: "3rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "1rem", color: "white" }}>
            Bimmer<span style={{ color: "#1c69d4" }}>Nederland</span>
          </h3>
          <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>
            De #1 Nederlandse bron voor alles over BMW. Nieuws, reviews en de grootste community.
          </p>
        </div>
        <div>
          <h4 style={{ fontWeight: 600, marginBottom: "0.75rem", color: "#ccc" }}>Navigatie</h4>
          {[["Home", "/"], ["Auto's", "/modellen"], ["Motoren", "/motoren"], ["Blog", "/blog"], ["Nieuws", "/nieuws"], ["FAQ", "/faq"], ["Over ons", "/over-ons"]].map(([label, href]) => (
            <div key={href} style={{ marginBottom: "0.5rem" }}>
              <Link href={href} style={{ color: "#888", textDecoration: "none", fontSize: "0.9rem" }}>{label}</Link>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ fontWeight: 600, marginBottom: "0.75rem", color: "#ccc" }}>Populaire modellen</h4>
          {["BMW M3", "BMW M5", "BMW X5", "BMW 3 Serie", "BMW i4"].map((model) => (
            <div key={model} style={{ marginBottom: "0.5rem" }}>
              <Link href="/modellen" style={{ color: "#888", textDecoration: "none", fontSize: "0.9rem" }}>{model}</Link>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: "1200px", margin: "2rem auto 0", paddingTop: "1.5rem", borderTop: "1px solid #2a2a2a", textAlign: "center", color: "#555", fontSize: "0.85rem" }}>
        © 2026 BimmerNederland.nl — Niet gelieerd aan BMW AG
      </div>
    </footer>
  );
}

