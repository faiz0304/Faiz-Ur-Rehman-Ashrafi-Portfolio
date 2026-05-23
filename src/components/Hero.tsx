"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Typewriter from "@/components/Typewriter";
import Image from "next/image";
/* ── Neon Cyan 3D Loader Placeholder — shown while WebGL bundle hydrates */
function NeuralCoreLoader() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      {/* Concentric glowing rings */}
      <div className="relative flex items-center justify-center">
        {/* Outermost ring — slow pulse */}
        <span
          className="absolute h-48 w-48 rounded-full border border-accent/10 animate-ping"
          style={{ animationDuration: "2.4s" }}
        />
        {/* Middle ring */}
        <span
          className="absolute h-36 w-36 rounded-full border border-accent/20 animate-ping"
          style={{ animationDuration: "1.8s", animationDelay: "0.3s" }}
        />
        {/* Inner glowing ring */}
        <span
          className="absolute h-24 w-24 rounded-full border border-accent/40 animate-ping"
          style={{ animationDuration: "1.2s", animationDelay: "0.6s" }}
        />
        {/* Core — filled glow dot */}
        <span
          className="relative h-3 w-3 rounded-full bg-accent"
          style={{
            boxShadow:
              "0 0 12px var(--accent-glow), 0 0 30px rgba(0,240,255,0.3)",
          }}
        />
      </div>
      {/* Status label */}
      <p
        className="font-mono text-[11px] uppercase tracking-widest text-accent/60 animate-pulse"
        style={{ animationDuration: "2s" }}
      >
        Initializing Neural Core...
      </p>
    </div>
  );
}

const NeuralCore = dynamic(() => import("@/components/NeuralCore"), {
  ssr: false,
  loading: () => <NeuralCoreLoader />,
});

/* ── Animation Variants ──────────────────────────────────── */
const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeLine = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, delay: 0.8, ease: "easeOut" as const },
  },
};

/* ── Tech stack tags ──────────────────────────────────────── */
const stackTags = [
  "LangGraph",
  "CrewAI",
  "RAG",
  "Multi-Agent",
  "LLM Ops",
];

/* ═══════════════════════════════════════════════════════════
   Hero Section — Split Layout
   Left:  Typography + CTAs
   Right: 3D Neural Core
   ═══════════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden"
    >
      {/* ── Background Ambient Glow ─────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Top-right cyan glow */}
        <div
          className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.12] blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
        {/* Bottom-left subtle blue glow */}
        <div
          className="absolute -bottom-60 -left-40 h-[400px] w-[400px] rounded-full opacity-[0.06] blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, #0066FF 0%, transparent 70%)",
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(var(--foreground-subtle) 1px, transparent 1px),
              linear-gradient(90deg, var(--foreground-subtle) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Main Content Grid ───────────────────────────── */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:py-24">
        {/* ── Left Column: Typography ──────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* ── Profile Image Integration ───────────────── */}
          <motion.div variants={fadeUp} className="mb-8 relative group w-fit">
            {/* Layer 3: The Neural Aura */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-[#00F0FF]/20 blur-[20px] transition-all duration-300 group-hover:bg-[#00F0FF]/40 group-hover:blur-[25px]"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Layer 2: The Glowing Ring */}
            <div 
              className="absolute -inset-[6px] rounded-full animate-[spin_8s_linear_infinite] group-hover:[animation-duration:3s] p-[2px] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "conic-gradient(from 0deg, #00F0FF, transparent, #171717, transparent, #00F0FF)"
              }}
            >
              <div className="h-full w-full rounded-full bg-background" />
            </div>

            {/* Layer 1: The Pulse */}
            <motion.div 
              className="relative z-10 h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image 
                src="/Faiz-Profile-Pic.png"
                alt="Faiz Ur Rehman Ashrafi"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, 128px"
                priority
              />
            </motion.div>
          </motion.div>

          {/* System status tag */}
          <motion.div variants={fadeUp}>
            <span className="terminal-tag">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              System Online — Ready to Deploy
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="mt-8 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Faiz Ur Rehman
            <br />
            <span className="gradient-text">Ashrafi</span>
          </motion.h1>

          {/* Typewriter role subtitle */}
          <motion.div variants={fadeUp} className="mt-5">
            <Typewriter />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg"
          >
            I architect autonomous AI agent systems that perceive, reason, and
            act — transforming raw language models into production-grade
            cognitive pipelines.
          </motion.p>

          {/* Tech tags */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-2"
          >
            {stackTags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-background-secondary px-3 py-1 font-mono text-xs text-foreground-subtle transition-colors duration-200 hover:border-border-hover hover:text-accent"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-4"
          >
            {/* Primary CTA */}
            <a
              href="#lab"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-accent px-7 py-3.5 font-semibold text-background transition-all duration-300 hover:shadow-[0_0_30px_var(--accent-glow)]"
            >
              {/* Hover shimmer */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

              <svg
                className="relative h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 3l14 9-14 9V3z"
                />
              </svg>
              <span className="relative">Deploy Projects</span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-lg border border-border px-7 py-3.5 font-medium text-foreground-muted transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(0,240,255,0.08)]"
            >
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Initialize Contact
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right Column: 3D Canvas ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="relative flex items-center justify-center"
        >
          {/* Ambient glow behind the 3D object */}
          <div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            }}
          />

          {/* 3D Canvas */}
          <div className="relative h-[400px] w-full sm:h-[480px] lg:h-[520px]">
            <NeuralCore />
          </div>

          {/* Floating metrics badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="glass-surface absolute left-0 top-8 hidden rounded-lg px-3 py-2 lg:block"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] text-foreground-subtle">
                Agents Active: <span className="text-accent">12</span>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="glass-surface absolute bottom-12 right-0 hidden rounded-lg px-3 py-2 lg:block"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[11px] text-foreground-subtle">
                Neural Sync: <span className="text-accent">99.7%</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Divider Line ─────────────────────────── */}
      <motion.div
        variants={fadeLine}
        initial="hidden"
        animate="visible"
        className="mx-auto h-px w-2/3 max-w-2xl origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />
    </section>
  );
}
