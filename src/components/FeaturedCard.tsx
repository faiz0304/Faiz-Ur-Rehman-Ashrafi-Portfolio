"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { track } from "@vercel/analytics";

/* ═══════════════════════════════════════════════════════════
   FeaturedCard — Premium showcase card for flagship projects
   Full-width glassmorphic card with architecture highlights,
   live metrics, and custom action badges.
   ═══════════════════════════════════════════════════════════ */

const statusConfig = {
  deployed: { label: "Deployed", color: "bg-emerald-400" },
  "in-progress": { label: "In Progress", color: "bg-amber-400" },
  research: { label: "Research", color: "bg-violet-400" },
} as const;

/* ── Action Icon SVGs ─────────────────────────────────────── */
function ActionIcon({ type }: { type: "architecture" | "logs" | "deploy" }) {
  const shared = "h-3.5 w-3.5 shrink-0";
  if (type === "architecture")
    return (
      <svg className={shared} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    );
  if (type === "logs")
    return (
      <svg className={shared} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    );
  return (
    <svg className={shared} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
    </svg>
  );
}

/* ── Component ────────────────────────────────────────────── */
interface FeaturedCardProps {
  project: Project;
  index: number;
}

export default function FeaturedCard({ project, index }: FeaturedCardProps) {
  const status = statusConfig[project.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="group relative overflow-hidden rounded-2xl border border-border transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_60px_rgba(0,240,255,0.08)]"
    >
      {/* ── Glassmorphic background ───────────────────────── */}
      <div className="absolute inset-0 bg-background-secondary" />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(0,240,255,0.04) 0%, transparent 60%)",
        }}
      />

      {/* ── Top accent line ───────────────────────────────── */}
      <div className="absolute left-0 right-0 top-0 h-px">
        <div
          className="h-full w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
          style={{
            background:
              "linear-gradient(90deg, var(--accent), rgba(0,240,255,0.3), transparent)",
          }}
        />
      </div>

      {/* ── Card Content ──────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-1 gap-8 p-7 sm:p-8 lg:grid-cols-5 lg:gap-10 lg:p-10">
        {/* ── Left: Main Info (3 cols) ─────────────────────── */}
        <div className="flex flex-col lg:col-span-3">
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="terminal-tag">{project.category}</span>
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${status.color}`} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                {status.label}
              </span>
            </div>
            {/* Featured badge */}
            <span className="ml-auto rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">
              ★ Featured
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-5 text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-3xl">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="mt-2 font-mono text-xs tracking-wide text-accent/70 sm:text-sm">
            {project.tagline}
          </p>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground-muted sm:text-base">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[10px] text-foreground-subtle transition-colors duration-150 group-hover:border-border-hover sm:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Badges */}
          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Launch Live MVP", { project: project.title })}
                className="group/btn inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-xs font-bold tracking-wide text-background transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,240,255,0.4)] sm:text-sm"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                {project.liveLinkText || "Launch Live MVP"}
              </a>
            )}
            <a
              href={project.href || "#"}
              onClick={() => track(project.actionLabel || "View Details", { project: project.title })}
              className="group/btn inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 px-5 py-2.5 font-mono text-xs font-medium tracking-wide text-accent transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_24px_rgba(0,240,255,0.12)] sm:text-sm"
            >
              <ActionIcon type={project.actionIcon || "architecture"} />
              {project.actionLabel || "View Details"}
              <svg
                className="ml-1 h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Right: Architecture Panel (2 cols) ───────────── */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Live Metrics */}
          {project.metrics && (
            <div className="glass-surface rounded-xl p-5">
              <h4 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                Live Metrics
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <span className="block text-lg font-bold text-accent sm:text-xl">
                      {m.value}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-foreground-subtle">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Highlights */}
          {project.architectureHighlights && (
            <div className="glass-surface rounded-xl p-5">
              <h4 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                Architecture
              </h4>
              <ul className="space-y-2.5">
                {project.architectureHighlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground-muted sm:text-sm">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* System ID footer */}
          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
              {project.id}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              <span className="font-mono text-[10px] text-foreground-subtle">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
