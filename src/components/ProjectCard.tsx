"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { track } from "@vercel/analytics";

/* ═══════════════════════════════════════════════════════════
   ProjectCard — Individual showcase card
   Glassmorphic card with hover elevation, tech tags, status
   indicator, and category badge.
   ═══════════════════════════════════════════════════════════ */

const statusConfig = {
  deployed: { label: "Deployed", color: "bg-emerald-400" },
  "in-progress": { label: "In Progress", color: "bg-amber-400" },
  research: { label: "Research", color: "bg-violet-400" },
} as const;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background-secondary transition-all duration-400 hover:border-border-hover hover:shadow-[0_0_40px_rgba(0,240,255,0.06)]"
    >
      {/* ── Top accent bar ─────────────────────────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* ── Card Body ──────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Header row: category + status */}
        <div className="flex items-center justify-between">
          <span className="terminal-tag">{project.category}</span>
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${status.color}`} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
              {status.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-xl font-bold tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-2xl">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="mt-1.5 font-mono text-xs tracking-wide text-accent/70">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground-muted">
          {project.description}
        </p>

        {/* ── Tech Stack ───────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-foreground-subtle transition-colors duration-150 group-hover:border-border-hover"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── Footer action ────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
            {project.id}
          </span>
          <div className="flex items-center gap-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Live Demo", { project: project.title })}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors duration-200 hover:text-accent/80 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                {project.liveLinkText || "Live Demo"}
              </a>
            )}
            <a href={project.href || "#"} onClick={() => track("View Details", { project: project.title })} className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-foreground-subtle transition-colors duration-200 hover:text-accent">
              Details
              <svg
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
