import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import AuraChatbot from "@/components/AuraChatbot";
import { Analytics } from "@vercel/analytics/react";

/* ── Font Configuration ──────────────────────────────────── */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

/* ── SEO Metadata ────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Faiz.AI — Agentic AI Specialist",
  description:
    "High-end portfolio of an Agentic AI Specialist. Designing, building, and deploying autonomous AI agent systems that think, act, and adapt.",
  keywords: [
    "AI Agent",
    "Agentic AI",
    "LLM",
    "Autonomous Agents",
    "Portfolio",
    "Machine Learning",
    "AI Engineer",
  ],
  authors: [{ name: "Faiz — Agentic AI Specialist" }],
  openGraph: {
    title: "Faiz.AI — Agentic AI Specialist",
    description:
      "Designing, building, and deploying autonomous AI agent systems.",
    type: "website",
  },
};

/* ── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${firaCode.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <PageTransition>
          <div className="print:hidden">
            <Navbar />
          </div>
          {/* Push content below fixed navbar */}
          <div className="pt-20">{children}</div>
          <div className="print:hidden">
            <Footer />
          </div>
        </PageTransition>
        <div className="print:hidden">
          <AuraChatbot />
        </div>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
