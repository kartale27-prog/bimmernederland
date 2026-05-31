import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BimmerNederland.nl – Alles over BMW",
  description:
    "De grootste Nederlandse BMW community. Nieuws, reviews, modellengids en meer over BMW.",
  keywords: "BMW, BMW Nederland, BMW nieuws, BMW modellen, BMW M serie, BMW review",
  openGraph: {
    title: "BimmerNederland.nl – Alles over BMW",
    description: "De grootste Nederlandse BMW community. Nieuws, reviews en modellengids.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <NavbarWrapper />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

