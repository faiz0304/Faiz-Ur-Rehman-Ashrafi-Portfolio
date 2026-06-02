"use client";

/**
 * Vibe Template
 *
 * Bold, high-energy creative layout for startup and creative tech roles.
 * Gradient header (dark → cyan/pink glow), oversized name, emoji section markers.
 * Heavy on personality, light on convention — makes an unforgettable first impression.
 */

import type { ResumeData } from "./index";
import { Mail, MapPin, Link2, GitBranch, ExternalLink, Star } from "lucide-react";

interface Props { data: ResumeData }

export function VibeTemplate({ data }: Props) {
  const { basics, summary, education, technicalSkills, projects, strengths } = data;

  const featuredSkills = [
    ...technicalSkills.aiAndMl.slice(0, 5),
    ...technicalSkills.frameworks.slice(0, 5),
    ...technicalSkills.programmingAndData.slice(0, 4),
  ];

  const sectionEmoji: Record<string, string> = {
    summary: "✦",
    projects: "⚡",
    skills: "🛠",
    education: "🎓",
    strengths: "🔥",
  };

  return (
    <div
      id="vibe-resume"
      className="w-full max-w-[860px] mx-auto text-white print:text-black"
      style={{ fontFamily: "'Inter', sans-serif", background: "#0d0d14" }}
    >
      {/* ══ GRADIENT HERO HEADER ══════════════════════════════ */}
      <header
        className="relative overflow-hidden px-10 pt-10 pb-8 print:bg-white print:text-black"
        style={{
          background: "linear-gradient(135deg, #0d0d14 0%, #1a0533 50%, #0d1a24 100%)",
        }}
      >
        {/* Glow blobs */}
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-[80px] print:hidden"
          style={{ background: "radial-gradient(#00F0FF, transparent)" }}
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full opacity-15 blur-[60px] print:hidden"
          style={{ background: "radial-gradient(#EC4899, transparent)" }}
        />

        {/* Name & Title */}
        <div className="relative">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#00F0FF]/60">
            ✦ Profile ✦
          </p>
          <h1
            className="text-5xl font-black tracking-tight print:text-3xl print:text-black"
            style={{
              background: "linear-gradient(90deg, #ffffff 30%, #00F0FF 70%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {basics.name}
          </h1>
          <p className="mt-2 text-base font-semibold text-white/70 print:text-gray-700">
            {basics.title}
          </p>
        </div>

        {/* Contact row */}
        <div className="mt-5 flex flex-wrap gap-4">
          {[
            { icon: Mail,      label: basics.email },
            { icon: MapPin,    label: basics.location },
            { icon: Link2,     label: basics.linkedin },
            { icon: GitBranch, label: basics.github },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60 print:border-gray-300 print:text-gray-600"
            >
              <Icon className="h-3 w-3 text-[#00F0FF]/60 print:text-blue-400" />
              {label}
            </span>
          ))}
        </div>
      </header>

      {/* ══ BODY ══════════════════════════════════════════════ */}
      <div className="px-10 py-8 space-y-8 print:bg-white">

        {/* Summary */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80 print:text-black">
            <span className="text-lg">{sectionEmoji.summary}</span> About
          </h2>
          <p className="text-[13px] leading-[1.9] text-white/60 print:text-gray-700">{summary}</p>
        </section>

        {/* Skills chips */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80 print:text-black">
            <span className="text-lg">{sectionEmoji.skills}</span> Superstack
          </h2>
          <div className="flex flex-wrap gap-2">
            {featuredSkills.map((s, i) => (
              <span
                key={s}
                className="rounded-lg px-3 py-1 text-[11px] font-semibold print:border print:border-gray-300 print:text-gray-700"
                style={{
                  background: i % 3 === 0
                    ? "linear-gradient(135deg, #00F0FF15, #00F0FF30)"
                    : i % 3 === 1
                    ? "linear-gradient(135deg, #EC489915, #EC489930)"
                    : "linear-gradient(135deg, #7C3AED15, #7C3AED30)",
                  color: i % 3 === 0 ? "#00F0FF" : i % 3 === 1 ? "#EC4899" : "#a78bfa",
                  border: `1px solid ${i % 3 === 0 ? "#00F0FF30" : i % 3 === 1 ? "#EC489930" : "#7C3AED30"}`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80 print:text-black">
            <span className="text-lg">{sectionEmoji.projects}</span> Work
          </h2>
          <div className="space-y-4">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="group rounded-xl p-5 transition-all hover:scale-[1.01] print:border print:border-gray-200 print:bg-white"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-white group-hover:text-[#00F0FF] transition-colors print:text-black">
                      {proj.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-white/50 print:text-gray-600">
                      {proj.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/40 print:border-gray-300 print:text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-medium text-white/50 transition-all hover:border-[#00F0FF]/30 hover:text-[#00F0FF] print:hidden"
                    >
                      <GitBranch className="h-3 w-3" />
                      Code
                      <ExternalLink className="h-2 w-2 opacity-40" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80 print:text-black">
            <span className="text-lg">{sectionEmoji.education}</span> Education
          </h2>
          {education.map((edu, i) => (
            <div
              key={i}
              className="flex items-start justify-between rounded-xl p-4 print:border print:border-gray-200"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(0,240,255,0.05))",
                border: "1px solid rgba(124,58,237,0.15)",
              }}
            >
              <div>
                <h3 className="text-[13px] font-bold text-white print:text-black">{edu.degree}</h3>
                <p className="text-[12px] text-white/50 print:text-gray-600">{edu.institution}</p>
                {edu.detail && <p className="mt-1 text-[11px] text-white/35 print:text-gray-500">{edu.detail}</p>}
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-[11px] text-white/40 print:text-gray-500">{edu.year}</p>
                <p className="text-[11px] font-semibold text-[#a78bfa] print:text-purple-600">{edu.gpa}</p>
                {edu.honors && (
                  <span className="flex items-center justify-end gap-0.5 text-[10px] font-semibold text-amber-400">
                    <Star className="h-2.5 w-2.5 fill-amber-400" />
                    {edu.honors}
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Strengths */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80 print:text-black">
            <span className="text-lg">{sectionEmoji.strengths}</span> Strengths
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {strengths.slice(0, 4).map((s, i) => (
              <div
                key={s.trait}
                className="rounded-xl p-4 print:border print:border-gray-200 print:bg-white"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, rgba(0,240,255,0.05), rgba(0,240,255,0.02))"
                    : "linear-gradient(135deg, rgba(236,72,153,0.05), rgba(236,72,153,0.02))",
                  border: `1px solid ${i % 2 === 0 ? "rgba(0,240,255,0.12)" : "rgba(236,72,153,0.12)"}`,
                }}
              >
                <p className="text-[12px] font-bold text-white print:text-black">{s.trait}</p>
                <p className="mt-1 text-[11px] leading-snug text-white/45 print:text-gray-600">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
