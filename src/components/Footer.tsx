"use client";

import { motion } from "framer-motion";

/* ── Social Links ────────────────────────────────────────── */
const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════
   Footer — Minimal Command Center
   ═══════════════════════════════════════════════════════════ */
export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="relative mt-auto"
    >
      {/* Top border line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-muted), transparent)",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between sm:px-8">
        {/* ── Left: Branding ───────────────────────────────── */}
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-mono text-sm font-medium text-foreground-muted">
            Faiz<span className="text-accent">.AI</span>
          </span>
          <span className="text-xs text-foreground-subtle">
            Designing autonomous systems that think &amp; adapt.
          </span>
        </div>

        {/* ── Center: Status ───────────────────────────────── */}
        <div className="hidden items-center gap-2 sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-xs text-foreground-subtle">
            All systems operational
          </span>
        </div>

        {/* ── Right: Socials ───────────────────────────────── */}
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="group relative rounded-lg border border-border p-2.5 text-foreground-subtle transition-all duration-300 hover:border-border-hover hover:text-accent hover:shadow-[0_0_15px_var(--accent-glow)]"
            >
              {social.icon}

              {/* Tooltip */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-background-elevated px-2 py-1 font-mono text-[10px] text-foreground-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────── */}
      <div className="border-t border-border px-6 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="font-mono text-[11px] text-foreground-subtle">
            © {new Date().getFullYear()} Faiz.AI
          </span>
          <span className="font-mono text-[11px] text-foreground-subtle">
            Built with{" "}
            <span className="text-accent">Next.js</span> +{" "}
            <span className="text-accent">Three.js</span>
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
