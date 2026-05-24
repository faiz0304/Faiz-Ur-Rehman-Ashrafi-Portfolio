"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CREDENTIALS_DATA, type Credential } from "@/data/credentialsData";

/* ═══════════════════════════════════════════════════════════
   THE ACADEMY // CREDENTIALS
   Displays Faiz's formal training and certification records
   using the Neural Minimalist aesthetic.
   ═══════════════════════════════════════════════════════════ */

/* ── Animation helpers ──────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/* ── Status badge colour map ─────────────────────────────── */
const STATUS_STYLES = {
  Completed:   "border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF]",
  "In Progress":"border-amber-400/40  bg-amber-400/10  text-amber-400",
  Upcoming:    "border-white/20      bg-white/5       text-foreground-muted",
} as const;

const STATUS_DOT = {
  Completed:   "bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]",
  "In Progress":"bg-amber-400",
  Upcoming:    "bg-foreground-subtle",
} as const;

/* ── LinkedIn icon (inline SVG — no extra dep) ─────────────── */
function LinkedInIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ── External link icon ─────────────────────────────────────── */
function ExternalLinkIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ── GitHub icon ────────────────────────────────────────────── */
function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

/* ── YouTube icon ───────────────────────────────────────────── */
function YouTubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ── Check icon ─────────────────────────────────────────────── */
function CheckIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Module status config ───────────────────────────────────── */
const MODULE_STATUS_CONFIG = {
  Completed:    { dot: "bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)]",  rail: "bg-[#00F0FF]/30",  text: "text-[#00F0FF]" },
  "In Progress":{ dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]",  rail: "bg-amber-400/30",  text: "text-amber-400" },
  Upcoming:     { dot: "bg-[#2A2A2A] border border-white/10",                  rail: "bg-white/5",        text: "text-foreground-subtle" },
} as const;

/* ═══════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════ */

/* ── Section label (e.g. "Mentors & Architects") ──────────── */
function CardSectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#00F0FF]/60">
        {label}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-[#00F0FF]/15 to-transparent" />
    </div>
  );
}

/* ── Module timeline ────────────────────────────────────────── */
import type { Module, Assignment } from "@/data/credentialsData";

function ModuleTimeline({ modules }: { modules: Module[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {modules.map((mod, idx) => (
        <div key={`${mod.module}-${idx}`} className="bg-[#0A0A0A] p-3 rounded border border-gray-800 hover:border-cyan-500/50 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-cyan-400 font-mono text-[10px]">MODULE {mod.module}</div>
              
              <div className="flex items-center gap-1.5">
                {mod.topicsCount && (
                  <span className="text-gray-400 font-mono text-[9px]">{mod.topicsCount} Topics</span>
                )}
                {mod.status && (
                  <span
                    className={`inline-flex items-center justify-center rounded-sm px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider ${
                      mod.status === "Completed"
                        ? "bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20"
                        : "bg-gray-800 text-gray-400 border border-gray-700"
                    }`}
                  >
                    {mod.status}
                  </span>
                )}
              </div>
            </div>
            <h5 className="text-gray-200 text-xs font-semibold leading-relaxed mt-1.5">{mod.title}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Single assignment sub-card ─────────────────────────────── */
function AssignmentCard({ assignment, index }: { assignment: Assignment; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col gap-3 rounded-lg border border-gray-800 bg-[#0A0A0A] p-4 transition-all duration-300 hover:border-[#00F0FF]/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.06),inset_0_0_20px_rgba(0,240,255,0.02)]"
    >
      {/* Top micro-glow on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-lg bg-gradient-to-r from-transparent via-[#00F0FF]/0 to-transparent transition-all duration-300 group-hover:via-[#00F0FF]/40" />

      {/* Assignment index + title */}
      <div className="flex-1">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
          Assignment {String(index + 1).padStart(2, "0")}
        </p>
        <h4 className="text-sm font-semibold leading-snug text-foreground">
          {assignment.assignment}
        </h4>
      </div>

      {/* Action links */}
      <div className="flex items-center gap-2">
        {/* GitHub link */}
        <Link
          href={assignment.github_repo_link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${assignment.assignment} on GitHub`}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] text-foreground-subtle transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-foreground"
        >
          <GitHubIcon className="h-3.5 w-3.5" />
          Repo
        </Link>

        {/* YouTube link — only when present */}
        {assignment.project_youtube_video_link && (
          <a
            href={assignment.project_youtube_video_link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${assignment.assignment} demo on YouTube`}
            className="inline-flex items-center gap-1.5 rounded-md border border-red-500/20 bg-red-500/[0.06] px-2.5 py-1.5 font-mono text-[10px] text-red-400/70 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
          >
            <YouTubeIcon className="h-3.5 w-3.5" />
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ── Assignment grid wrapper ────────────────────────────────── */
function AssignmentGrid({ assignments }: { assignments: Assignment[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {assignments.map((assignment, i) => (
        <AssignmentCard key={assignment.assignment} assignment={assignment} index={i} />
      ))}
    </div>

  );
}

/* ── Single instructor node ──────────────────────────────── */
function InstructorNode({
  name,
  linkedIn,
  photo,
  designation,
}: {
  name: string;
  linkedIn?: string;
  photo: string;
  designation?: string;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#1E1E1E] px-4 py-3 transition-all duration-300 hover:border-[#00F0FF]/20 hover:bg-[#242424] hover:shadow-[0_0_20px_rgba(0,240,255,0.04)]">
      {/* Avatar ring */}
      <div className="relative shrink-0">
        <div className="absolute -inset-[2px] rounded-full bg-gradient-to-br from-[#00F0FF]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-700">
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover object-top"
            sizes="48px"
          />
        </div>
      </div>

      {/* Name + LinkedIn */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        {designation && (
          <div className="text-[10px] text-gray-500 font-mono mt-1">{designation}</div>
        )}
        {linkedIn ? (
          <Link
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="mt-0.5 inline-flex items-center gap-1 font-mono text-[11px] text-foreground-subtle transition-colors duration-200 hover:text-[#00F0FF]"
          >
            <LinkedInIcon className="h-3 w-3 shrink-0" />
            LinkedIn
            <ExternalLinkIcon className="h-2.5 w-2.5 opacity-60" />
          </Link>
        ) : (
          <span className="mt-0.5 inline-flex items-center gap-1 font-mono text-[11px] text-foreground-subtle/50">
            Instructor
          </span>
        )}
      </div>
    </div>
  );
}

/* ── The main credential card ─────────────────────────────── */
/* ── Visual Proof Gallery with Lightbox ───────────────────── */
function VisualProofGallery({ images }: { images: { label: string; src: string }[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        {images.map((img, idx) => (
          <motion.div key={idx} variants={item} className="group relative">
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-gray-500">// {img.label}</h4>
            <div 
              className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-black/50 shadow-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:border-[#00F0FF]/30 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
              onClick={() => setSelectedImage(img.src)}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 text-white drop-shadow-md">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative h-[85vh] w-full max-w-5xl rounded-lg overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Fullscreen view"
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CredentialCard({ credential, index }: { credential: Credential; index: number }) {
  const statusStyle = STATUS_STYLES[credential.status];
  const dotStyle   = STATUS_DOT[credential.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.35 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#171717] shadow-[0_8px_48px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#00F0FF]/10 hover:shadow-[0_8px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,240,255,0.04)]"
      aria-label={`${credential.title} at ${credential.institute}`}
    >
      {/* Top-edge cyan glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

      {/* Subtle corner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full opacity-[0.035] blur-[60px]"
        style={{ background: "radial-gradient(circle, #00F0FF 0%, transparent 70%)" }}
      />

      {/* ── Card body ─────────────────────────────────────── */}
      <div className="p-6 sm:p-8">

        {/* ══ 1. COURSE HEADER ════════════════════════════ */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">

          {/* Institute logo */}
          <div className="shrink-0">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0D0D0D] sm:h-20 sm:w-20">
              <Image
                src={credential.images.logo}
                alt={`${credential.institute} logo`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 64px, 80px"
              />
            </div>
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            {/* System label */}
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#00F0FF]/50">
              // training.program
            </p>

            {/* Course title */}
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {credential.title}
            </h2>

            {/* Institute name — linked */}
            <div className="mt-1 flex items-center gap-3">
              <Link
                href={credential.links.instituteWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-xs text-foreground-muted transition-colors duration-200 hover:text-[#00F0FF]"
              >
                {credential.institute}
                <ExternalLinkIcon className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-70" />
              </Link>
              
              {credential.links.instituteLinkedIn && (
                <a
                  href={credential.links.instituteLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-foreground-subtle transition-colors duration-200 hover:text-[#00F0FF]"
                  aria-label={`${credential.institute} on LinkedIn`}
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                </a>
              )}
              
              {/* Course URL Link */}
              {credential.links.courseUrl && (
                <a
                  href={credential.links.courseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/10 bg-[#00F0FF]/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-[#00F0FF]/60 transition-all duration-200 hover:border-[#00F0FF]/30 hover:bg-[#00F0FF]/[0.1] hover:text-[#00F0FF]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-2.5 w-2.5 shrink-0" aria-hidden="true">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                  Course Page
                </a>
              )}
            </div>

            {/* Metadata pill row */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {/* Status badge */}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold tracking-wide ${statusStyle}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${dotStyle} ${credential.status === "Completed" ? "animate-pulse" : ""}`} />
                {credential.status}
              </span>

              {/* Duration */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-foreground-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3 w-3 shrink-0 text-[#00F0FF]/50" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {credential.duration}
              </span>


              {/* Campus — links to Google Maps when campusMapLink is set */}
              {credential.campusMapLink ? (
                <Link
                  href={credential.campusMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${credential.campus} on Google Maps`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-foreground-muted transition-all duration-200 hover:border-[#00F0FF]/30 hover:bg-[#00F0FF]/[0.04] hover:text-[#00F0FF]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3 w-3 shrink-0 text-[#00F0FF]/50 transition-colors duration-200 group-hover:text-[#00F0FF]" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {credential.campus}
                  <ExternalLinkIcon className="h-2.5 w-2.5 opacity-0 transition-opacity duration-200 group-hover:opacity-60" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-foreground-muted">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3 w-3 shrink-0 text-[#00F0FF]/50" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {credential.campus}
                </span>
              )}


              {/* Hackathon */}
              {credential.hackathon && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/10 bg-[#00F0FF]/[0.04] px-3 py-1 font-mono text-[11px] text-[#00F0FF]/60">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3 w-3 shrink-0" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Hackathon: {credential.hackathon}
                </span>
              )}
            </div>
            
            {/* 1. Certification & Verification Badge */}
            {credential.certification && (
              <div className="mt-4 flex gap-3">
                <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-mono rounded">
                  {credential.certification}
                </span>
                {credential.links?.verification && (
                  <a href={credential.links.verification} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono rounded hover:bg-blue-500/20">
                    Verify Credential ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mission Statement */}
        {credential.mission && (
          <div className="mt-4 p-3 bg-cyan-900/10 border-l-2 border-cyan-500 text-sm text-cyan-100 italic rounded-r">
            "{credential.mission}"
          </div>
        )}

        {/* Description */}
        {credential.description && (
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">{credential.description}</p>
        )}

        {/* Divider */}
        <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* ══ PROGRAM LEADERSHIP ════════════════════════════ */}
        {credential.leadership && (
          <div className="mb-6">
            <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">// PROGRAM LEADERSHIP</h4>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 bg-[#0A0A0A] border border-yellow-500/20 rounded-lg">
              <img src={credential.leadership.photo} alt={credential.leadership.name} className="w-16 h-16 rounded-full border-2 border-yellow-500/50 object-cover" />
              <div>
                <h5 className="font-bold text-white flex items-center gap-2">
                  {credential.leadership.name}
                  <a href={credential.leadership.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </h5>
                <p className="text-xs text-gray-400 mb-2">{credential.leadership.roles.join(" | ")}</p>
                <div className="flex flex-wrap gap-1">
                  {credential.leadership.awards.map(award => (
                    <span key={award} className="text-[9px] px-1.5 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 rounded uppercase tracking-wider">{award}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ 2. MENTORS & ARCHITECTS ═════════════════════ */}
        <div>
          <CardSectionLabel label="Mentors & Architects" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {credential.instructors.map((instructor) => (
              <InstructorNode
                key={instructor.name}
                name={instructor.name}
                linkedIn={instructor.linkedIn}
                photo={instructor.photo}
                designation={instructor.designation}
              />
            ))}
          </div>


          
          {/* 2. Render Tools & Strategies */}
          {credential.tools && (
            <div className="mt-6">
              <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">// TECH STACK MASTERED</h4>
              <div className="flex flex-wrap gap-2">
                {credential.tools.map(tool => (
                  <span key={tool} className="px-2 py-1 bg-[#0A0A0A] border border-gray-800 text-gray-300 text-xs rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {credential.strategies && (
            <div className="mt-4">
              <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">// BUSINESS STRATEGY</h4>
              <ul className="list-disc pl-5 text-sm text-gray-400">
                {credential.strategies.map(strategy => (
                  <li key={strategy}>{strategy}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ══ COHORT MEMORY ═══════════════════════════════ */}
        {credential.images?.batchPhoto && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 mb-10 group"
          >
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-gray-500">// COHORT MEMORY</h4>
            <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl">
              <motion.img 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={credential.images.batchPhoto} 
                alt={`${credential.title} Batch Photo at ${credential.campus}`}
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              />
            </div>
          </motion.div>
        )}

        {/* Divider */}
        {(credential.modules || credential.classes) && (
          <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        )}

        {/* ══ 3. THE PIPELINE — MODULES ════════════════════ */}
        {credential.modules && (
          <div>
            <CardSectionLabel label="The Pipeline // Modules" />
            <ModuleTimeline modules={credential.modules} />
          </div>
        )}
        
        {/* 3. Render Classes */}
        {credential.classes && (
          <div className="mt-8">
            <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">// MASTERCLASS CURRICULUM</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credential.classes.map(cls => (
                <div key={cls.class} className="bg-[#0A0A0A] p-4 rounded border border-gray-800">
                  <div className="text-cyan-400 font-mono text-xs mb-1">CLASS {cls.class}</div>
                  <h5 className="font-bold text-white mb-2">{cls.title}</h5>
                  <p className="text-gray-400 text-sm mb-3">{cls.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {cls.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-900 border border-gray-700 text-gray-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Render Quarters */}
        {credential.quarters && (
          <div className="mt-8">
            <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">// CURRICULUM TIMELINE</h4>
            <div className="flex flex-col gap-3">
              {credential.quarters.map(q => (
                <div key={q.id} className={`p-4 rounded border ${q.status.includes('Completed') ? 'bg-cyan-900/10 border-cyan-500/30' : q.status.includes('Started') ? 'bg-yellow-900/10 border-yellow-500/30' : 'bg-[#0A0A0A] border-gray-800'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold font-mono text-white">{q.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-mono ${q.status.includes('Completed') ? 'text-cyan-400 bg-cyan-400/10' : q.status.includes('Started') ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-500 bg-gray-800'}`}>{q.status}</span>
                  </div>
                  <h5 className="text-sm text-gray-200 font-semibold mb-2">{q.title}</h5>
                  <p className="text-xs text-gray-400 mb-2 font-mono">{q.level}</p>
                  <div className="flex flex-wrap gap-1">
                    {q.domains.map(domain => (
                      <span key={domain} className="text-[10px] px-1.5 py-0.5 bg-gray-900 border border-gray-700 text-gray-400 rounded">{domain}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        {credential.assignments && (
          <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        )}

        {/* ══ 4. APPLIED LAB WORK — ASSIGNMENTS ════════════ */}
        {credential.assignments && (
          <div>
            <CardSectionLabel label="Applied Lab Work // Assignments" />
            <AssignmentGrid assignments={credential.assignments} />
          </div>
        )}

        {/* Exam Results & Verification */}
        {credential.exams && (
          <div className="mt-10 mb-8">
            <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">// EXAM RESULTS & VERIFICATION</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credential.exams.map(exam => (
                <div key={exam.no} className="bg-[#0A0A0A] rounded overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors">
                  <img src={exam.image} alt={exam.title} className="w-full h-auto object-cover opacity-90 hover:opacity-100" />
                  <div className="p-3 border-t border-gray-800 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-gray-500 font-mono">{exam.course_id} - EXAM {exam.no}</div>
                      <div className="text-xs font-semibold text-gray-300">{exam.title}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-cyan-500 font-mono">{exam.result}</div>
                      <div className="text-sm font-bold text-white">{exam.score}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ PROGRAM RESOURCES ════════════════════════════ */}
        {credential.resources && (
          <div className="mt-8 mb-8">
            <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">// PROGRAM RESOURCES</h4>
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#0A0A0A] border border-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1"><span className="text-cyan-400 font-mono">FORMAT:</span> {credential.resources.format}</div>
                <div className="text-xs text-gray-400"><span className="text-cyan-400 font-mono">SCHEDULE:</span> {credential.resources.schedule}</div>
              </div>
              <div className="flex gap-3 items-center">
                {credential.resources.introVideo && <a href={credential.resources.introVideo} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded hover:bg-red-500/20 flex items-center gap-2">▶ INTRO VIDEO</a>}
                {credential.resources.podcast && <a href={credential.resources.podcast} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono rounded hover:bg-purple-500/20 flex items-center gap-2">🎙️ PODCAST</a>}
              </div>
            </div>
          </div>
        )}

        {/* 4. Render Visual Proof (Certificate & Achievement) */}
        {(credential.images?.certificate || credential.images?.achievementPhoto) && (
          <VisualProofGallery 
            images={[
              ...(credential.images.certificate ? [{ label: "OFFICIAL CERTIFICATION", src: credential.images.certificate }] : []),
              ...(credential.images.achievementPhoto ? [{ label: "ACHIEVEMENT MOMENT", src: credential.images.achievementPhoto }] : [])
            ]}
          />
        )}

      </div>

      {/* Bottom edge line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════ */
export default function CredentialsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-foreground">

      {/* ── Ambient background glows ─────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute left-1/3 top-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00F0FF 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full opacity-[0.025] blur-[100px]"
          style={{ background: "radial-gradient(circle, #00F0FF 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Main content — fade-in + slide-up on mount ───── */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 sm:py-16"
      >

        {/* ══ HERO SECTION ══════════════════════════════════ */}
        <section className="mb-14 sm:mb-20">

          <motion.p
            {...fadeUp(0.05)}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[#00F0FF]/50"
          >
            // system.credentials
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            THE ACADEMY{" "}
            <span className="font-mono text-[#00F0FF]">// CREDENTIALS</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.18)}
            className="mt-4 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg"
          >
            Formal training, certifications, and cognitive pipelines mastered.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 h-px origin-left bg-gradient-to-r from-[#00F0FF]/50 via-[#00F0FF]/10 to-transparent"
          />
        </section>

        {/* ══ CREDENTIAL CARDS ══════════════════════════════ */}
        <section aria-label="Credential records" className="space-y-10">
          {CREDENTIALS_DATA.map((credential, i) => (
            <CredentialCard key={credential.title} credential={credential} index={i} />
          ))}
        </section>

      </motion.main>
    </div>
  );
}
