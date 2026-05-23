import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Server-side only packages ─────────────────────────────
     Prevents the AI SDK and Groq client from being bundled into
     the client-side JavaScript. These packages must only run in
     Node.js (API route handlers).
  ─────────────────────────────────────────────────────────── */
  serverExternalPackages: ["@ai-sdk/groq", "ai"],

  /* ── Image optimization ────────────────────────────────────
     Explicitly list remote domains here if you ever load
     external images via next/image.
  ─────────────────────────────────────────────────────────── */
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
