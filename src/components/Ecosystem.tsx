"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   The Ecosystem — Tech Stack + Broadcasts
   Two-part section: Core Stack grid with glowing badges,
   and Faiz Codes AI YouTube Shorts in 9:16 portrait slots.
   ═══════════════════════════════════════════════════════════ */

/* ── Stack Data ───────────────────────────────────────────── */
interface StackItem {
  name: string;
  description: string;
  icon: string; // emoji or symbol
}

const coreStack: StackItem[] = [
  {
    name: "LangGraph",
    description: "Agent state machines",
    icon: "🔗",
  },
  {
    name: "AgentScope",
    description: "Multi-agent framework",
    icon: "🧠",
  },
  {
    name: "Ollama",
    description: "Local model runtime",
    icon: "🦙",
  },
  {
    name: "Qwen",
    description: "Primary reasoning LLM",
    icon: "⚡",
  },
  {
    name: "Next.js",
    description: "Full-stack React framework",
    icon: "▲",
  },
  {
    name: "FastAPI",
    description: "High-perf Python APIs",
    icon: "🚀",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first styling",
    icon: "🎨",
  },
  {
    name: "Supabase",
    description: "Backend-as-a-service",
    icon: "⚙️",
  },
  {
    name: "FAISS",
    description: "Vector similarity search",
    icon: "🔍",
  },
  {
    name: "Docker",
    description: "Container orchestration",
    icon: "🐳",
  },
  {
    name: "Git",
    description: "Version control",
    icon: "📦",
  },
  {
    name: "Python",
    description: "Core language",
    icon: "🐍",
  },
];

/* ── YouTube Shorts Data ──────────────────────────────────── */
interface ShortVideo {
  id: string;
  title: string;
  embedUrl: string;
}

const youtubeShorts: ShortVideo[] = [
  {
    id: "short-1",
    title: "Building AI Agents with LangGraph",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // placeholder
  },
  {
    id: "short-2",
    title: "Local LLMs: Ollama + Qwen Setup",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // placeholder
  },
  {
    id: "short-3",
    title: "Multi-Agent Orchestration Deep Dive",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // placeholder
  },
];

/* ── Stack Badge Component ────────────────────────────────── */
function StackBadge({
  item,
  index,
}: {
  item: StackItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="group/badge relative flex items-center gap-3 rounded-xl border border-border bg-background-secondary p-4 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.07)] sm:gap-4 sm:p-5"
    >
      {/* Glow underlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-400 group-hover/badge:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,240,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Icon */}
      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-lg transition-all duration-300 group-hover/badge:border-accent/30 group-hover/badge:shadow-[0_0_12px_rgba(0,240,255,0.15)] sm:h-11 sm:w-11 sm:text-xl">
        {item.icon}
      </span>

      {/* Text */}
      <div className="relative z-10 min-w-0 flex-1">
        <h4 className="text-sm font-semibold tracking-tight transition-colors duration-200 group-hover/badge:text-accent sm:text-base">
          {item.name}
        </h4>
        <p className="truncate font-mono text-[10px] text-foreground-subtle sm:text-xs">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Shorts Card Component ────────────────────────────────── */
function ShortsCard({
  video,
  index,
}: {
  video: ShortVideo;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="group/short flex flex-col overflow-hidden rounded-xl border border-border bg-background-secondary transition-all duration-400 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(0,240,255,0.06)]"
    >
      {/* ── 9:16 Portrait Video Container ──────────────── */}
      <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
        {/* Placeholder gradient with play icon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-background-tertiary via-background-secondary to-background-tertiary">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(var(--foreground-subtle) 1px, transparent 1px),
                linear-gradient(90deg, var(--foreground-subtle) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Play button */}
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 transition-all duration-300 group-hover/short:scale-110 group-hover/short:border-accent/50 group-hover/short:bg-accent/20 group-hover/short:shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <svg
              className="ml-0.5 h-6 w-6 text-accent"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          {/* Coming soon label */}
          <span className="relative z-10 mt-4 rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-foreground-subtle backdrop-blur-sm">
            Coming Soon
          </span>

          {/* YouTube Shorts badge */}
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-md bg-red-600/90 px-2 py-1 backdrop-blur-sm">
            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
            </svg>
            <span className="text-[9px] font-semibold text-white">Shorts</span>
          </div>
        </div>
      </div>

      {/* ── Video Title Footer ─────────────────────────── */}
      <div className="border-t border-border p-3 sm:p-4">
        <p className="text-xs font-medium leading-snug text-foreground-muted transition-colors duration-200 group-hover/short:text-foreground sm:text-sm">
          {video.title}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-subtle">
            @FaizCodesAI
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Ecosystem Section
   ═══════════════════════════════════════════════════════════ */
export default function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-24 sm:py-32">
      {/* ── Subtle background ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full opacity-[0.04] blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* ── Section Header ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="mb-16 sm:mb-20"
        >
          <span className="terminal-tag">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Stack & Signals
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            The Ecosystem{" "}
            <span className="font-mono text-lg font-normal text-foreground-subtle sm:text-xl lg:text-2xl">
              // Tools & Broadcasts
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            The engineering toolkit powering autonomous systems — and the
            broadcasts breaking down how it all works.
          </p>

          <div
            className="mt-8 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
        </motion.div>

        {/* ════════════════════════════════════════════════
           Part 1 — Core Stack Grid
           ════════════════════════════════════════════════ */}
        <div className="mb-20 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="h-px w-6 bg-accent/40" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
              Core Stack
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
            {coreStack.map((item, index) => (
              <StackBadge key={item.name} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════
           Part 2 — Faiz Codes AI Broadcasts
           ════════════════════════════════════════════════ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="h-px w-6 bg-accent/40" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
              Broadcasts // Faiz Codes AI
            </h3>
            <div className="ml-2 flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/5 px-2.5 py-0.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-red-400">
                YouTube
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 max-w-xl text-sm leading-relaxed text-foreground-muted sm:text-base"
          >
            Short-form breakdowns of agent architectures, local LLM setups,
            and real-world AI system design — straight from the terminal.
          </motion.p>

          {/* ── Portrait Shorts Grid (9:16) ────────────── */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {youtubeShorts.map((video, index) => (
              <ShortsCard key={video.id} video={video} index={index} />
            ))}
          </div>

          {/* Channel CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col items-center gap-3 sm:mt-12"
          >
            <a
              href="https://youtube.com/@FaizCodesAI"
              target="_blank"
              rel="noopener noreferrer"
              className="group/yt inline-flex items-center gap-2.5 rounded-lg border border-border bg-background-secondary px-5 py-2.5 font-mono text-xs font-medium tracking-wide text-foreground-muted transition-all duration-300 hover:border-red-500/40 hover:text-red-400 hover:shadow-[0_0_24px_rgba(239,68,68,0.1)] sm:text-sm"
            >
              <svg
                className="h-4 w-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Subscribe to Faiz Codes AI
              <svg
                className="h-3 w-3 transition-transform duration-200 group-hover/yt:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
