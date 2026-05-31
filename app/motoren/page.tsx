import type { Metadata } from "next";
import Link from "next/link";
import { motoren, motorSeries } from "@/lib/motoren";

export const metadata: Metadata = {
  title: "BMW Motorrad – Alle Modellen 2026 | BimmerNederland.nl",
  description:
    "Compleet overzicht van alle BMW Motorrad modellen 2026. Van de R 1300 GS tot de M 1000 RR, S 1000 RR, R 18 en CE 04. Specs, prijzen en beschrijvingen.",
  keywords:
    "BMW motorrad, BMW motor, BMW GS, R 1300 GS, S 1000 RR, M 1000 RR, BMW R 18, BMW CE 04, BMW motorfietsen",
};

export default function MotorenPage() {
  const series = ["Alle", ...motorSeries];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #0a0a0a, #1a0a0a, #0a0a0a)",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(230,103,34,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <p
          style={{
            color: "#e67e22",
            fontWeight: 600,
            fontSize: "0.85rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          BMW Motorrad 2026
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            marginBottom: "1rem",
          }}
        >
          Alle BMW Motorfietsen
        </h1>
        <p style={{ color: "#888", fontSize: "1.1rem", maxWidth: "560px", margin: "0 auto 2rem" }}>
          Van de iconische GS-adventure tot de razendsnelle M 1000 RR — BMW Motorrad heeft een model
          voor elke rijder en elk avontuur.
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            [motoren.length.toString(), "Modellen"],
            ["8", "Series"],
            ["100+", "Jaar BMW Motorrad"],
          ].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#e67e22" }}>{num}</div>
              <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.2rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter */}
      <section style={{ padding: "2rem 1.5rem 0", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {series.map((s, i) => (
            <span
              key={s}
              style={{
                background: i === 0 ? "#e67e22" : "#161616",
                border: "1px solid #2a2a2a",
                color: i === 0 ? "white" : "#888",
                borderRadius: "2rem",
                padding: "0.4rem 1.2rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Grid per serie */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        {motorSeries.map((serie) => {
          const items = motoren.filter((m) => m.serie === serie);
          return (
            <div key={serie} style={{ marginBottom: "4rem" }}>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  marginBottom: "1.5rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "2px solid #e67e22",
                  display: "inline-block",
                }}
              >
                {serie}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {items.map((motor) => (
                  <article
                    key={motor.slug}
                    className="card-hover"
                    style={{
                      background: "#161616",
                      border: "1px solid #2a2a2a",
                      borderRadius: "1rem",
                      padding: "1.75rem",
                      position: "relative",
                    }}
                  >
                    {motor.nieuw && (
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          background: "#e67e22",
                          color: "white",
                          borderRadius: "0.3rem",
                          padding: "0.2rem 0.5rem",
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          letterSpacing: "1px",
                        }}
                      >
                        NIEUW
                      </div>
                    )}
                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{motor.emoji}</div>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                      <span
                        style={{
                          background: `${motor.kleur}22`,
                          color: motor.kleur,
                          borderRadius: "0.3rem",
                          padding: "0.2rem 0.6rem",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        {motor.type}
                      </span>
                      <span
                        style={{
                          background: "#2a2a2a",
                          color: "#888",
                          borderRadius: "0.3rem",
                          padding: "0.2rem 0.6rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        {motor.cc}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.6rem" }}>
                      {motor.naam}
                    </h3>
                    <p
                      style={{
                        color: "#888",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {motor.beschrijving}
                    </p>

                    {/* Specs grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "0.5rem",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {[
                        ["Vermogen", motor.pk],
                        ["Gewicht", motor.gewicht],
                        ["Prijs", motor.prijs],
                      ].map(([label, val]) => (
                        <div
                          key={label}
                          style={{
                            background: "#1a1a1a",
                            borderRadius: "0.5rem",
                            padding: "0.6rem 0.75rem",
                          }}
                        >
                          <div style={{ color: "#555", fontSize: "0.7rem", marginBottom: "0.2rem" }}>
                            {label}
                          </div>
                          <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                      {motor.hoogtepunten.slice(0, 3).map((h) => (
                        <li key={h} style={{ color: "#777", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span style={{ color: "#e67e22" }}>✓</span> {h}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* BMW Motorrad disclaimer */}
      <section style={{ background: "#0d0d0d", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#444", fontSize: "0.8rem", lineHeight: 1.7 }}>
            Prijzen en specificaties zijn indicatief en kunnen afwijken. Raadpleeg{" "}
            <a
              href="https://www.bmw-motorrad.nl"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#666" }}
            >
              bmw-motorrad.nl
            </a>{" "}
            voor de actuele prijslijst. BimmerNederland.nl is niet gelieerd aan BMW AG of BMW Motorrad GmbH.
            BMW® en Motorrad® zijn geregistreerde handelsmerken van Bayerische Motoren Werke AG.
          </p>
        </div>
      </section>
    </div>
  );
}

