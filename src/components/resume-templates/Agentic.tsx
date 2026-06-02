"use client";

/**
 * Agentic Template
 *
 * On-brand dark/cyber aesthetic that matches the portfolio.
 * Two-panel layout: left sidebar (contact + skills) | right main content.
 * Typography: monospace for labels, Inter for body.
 * Accent: #00F0FF (cyan), dark #0A0A0A background.
 */

import type { ResumeData } from "./index";
import { Mail, MapPin, Link2, GitBranch, GraduationCap, Star, ExternalLink } from "lucide-react";

interface Props { data: ResumeData }

function CyanDot() {
  return (
    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F0FF] shadow-[0_0_4px_#00F0FF]" />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#00F0FF]/60">
      // {children}
    </h2>
  );
}

function GlowDivider() {
  return (
    <div className="my-4 h-px w-full bg-gradient-to-r from-[#00F0FF]/20 via-[#00F0FF]/40 to-transparent" />
  );
}

export function AgenticTemplate({ data }: Props) {
  const { basics, summary, education, technicalSkills, projects, strengths, profileImageUrl } = data;

  const skillGroups = [
    { label: "Languages",  skills: technicalSkills.programmingAndData },
    { label: "Frameworks", skills: technicalSkills.frameworks },
    { label: "AI / ML",    skills: technicalSkills.aiAndMl.slice(0, 7) },
    { label: "Databases",  skills: technicalSkills.databases },
    { label: "Tools",      skills: technicalSkills.tools.slice(0, 6) },
  ];

  return (
    <div
      id="agentic-resume"
      className="bg-[#0A0A0A] text-white w-full max-w-[900px] mx-auto flex print:bg-white print:text-black"
      style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}
    >
      {/* ══ LEFT SIDEBAR ══════════════════════════════════════ */}
      <aside className="w-[280px] shrink-0 bg-[#111111] border-r border-[#00F0FF]/10 p-7 flex flex-col gap-6 print:bg-gray-50 print:border-gray-200">

        {/* Profile */}
        <div>
          {profileImageUrl && (
            <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-2xl border-2 border-[#00F0FF]/30 shadow-[0_0_12px_rgba(0,240,255,0.1)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profileImageUrl}
                alt={basics.name}
                className="h-full w-full object-cover object-top"
              />
            </div>
          )}
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00F0FF]/50">
            System Profile
          </span>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-white leading-tight print:text-black">
            {basics.name}
          </h1>
          <p className="mt-0.5 font-mono text-[10px] text-[#00F0FF] print:text-blue-600">
            {basics.title}
          </p>
        </div>

        <GlowDivider />

        {/* Contact */}
        <div>
          <SectionLabel>Contact</SectionLabel>
          <div className="space-y-2">
            {[
              { icon: Mail,      label: basics.email },
              { icon: MapPin,    label: basics.location },
              { icon: Link2,     label: basics.linkedin },
              { icon: GitBranch, label: basics.github },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon className="h-3 w-3 text-[#00F0FF]/50 shrink-0 mt-0.5 print:text-blue-400" />
                <span className="text-[10px] text-white/60 break-all leading-relaxed print:text-gray-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <GlowDivider />

        {/* Skills */}
        <div className="flex-1">
          <SectionLabel>Capabilities</SectionLabel>
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.15em] text-[#00F0FF]/40 print:text-blue-400">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-[#00F0FF]/15 bg-[#00F0FF]/5 px-1.5 py-0.5 font-mono text-[9px] text-[#00F0FF]/70 print:border-blue-200 print:text-blue-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <GlowDivider />

        {/* Education */}
        <div>
          <SectionLabel>Education</SectionLabel>
          {education.map((edu, i) => (
            <div key={i}>
              <div className="flex items-start gap-2">
                <GraduationCap className="h-3.5 w-3.5 text-[#00F0FF]/50 shrink-0 mt-0.5 print:text-blue-400" />
                <div>
                  <p className="text-[11px] font-semibold text-white/90 print:text-black">{edu.degree}</p>
                  <p className="text-[10px] text-white/50 print:text-gray-500">{edu.institution}</p>
                  <p className="text-[10px] text-white/40 print:text-gray-400">{edu.year}</p>
                  <div className="mt-1 flex gap-2">
                    <span className="rounded-full border border-[#00F0FF]/25 bg-[#00F0FF]/8 px-2 py-0.5 font-mono text-[9px] text-[#00F0FF] print:border-blue-300 print:text-blue-700">
                      {edu.gpa}
                    </span>
                    {edu.honors && (
                      <span className="flex items-center gap-0.5 font-mono text-[9px] text-amber-400">
                        <Star className="h-2.5 w-2.5 fill-amber-400" />
                        {edu.honors}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ══ MAIN CONTENT ══════════════════════════════════════ */}
      <main className="flex-1 p-8 space-y-6">

        {/* Terminal header decoration */}
        <div className="flex items-center gap-1.5 print:hidden">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 font-mono text-[9px] text-white/25 tracking-widest">
            resume.json — read only
          </span>
        </div>

        {/* Summary */}
        <section>
          <SectionLabel>Professional Summary</SectionLabel>
          <p className="text-[13px] leading-[1.85] text-white/70 print:text-gray-700">{summary}</p>
        </section>

        <div className="h-px bg-[#00F0FF]/8 print:bg-gray-200" />

        {/* Projects */}
        <section>
          <SectionLabel>Selected Projects</SectionLabel>
          <div className="space-y-4">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-white/[0.05] bg-[#111111]/60 p-4 transition-all hover:border-[#00F0FF]/20 print:border-gray-200 print:bg-white"
              >
                <div className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity print:hidden" />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-[#00F0FF]/40 print:text-blue-400">
                        [{String(i + 1).padStart(2, "0")}]
                      </span>
                      <h3 className="text-[13px] font-semibold text-white group-hover:text-[#00F0FF] transition-colors print:text-black">
                        {proj.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-white/55 print:text-gray-600">
                      {proj.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-[#00F0FF]/15 bg-[#00F0FF]/5 px-1.5 py-0.5 font-mono text-[9px] text-[#00F0FF]/60 print:border-blue-200 print:text-blue-600"
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
                      className="shrink-0 flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5 font-mono text-[9px] text-white/40 transition-all hover:border-[#00F0FF]/30 hover:text-[#00F0FF] print:hidden"
                    >
                      <GitBranch className="h-3 w-3" />
                      Code
                      <ExternalLink className="h-2 w-2 opacity-50" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-[#00F0FF]/8 print:bg-gray-200" />

        {/* Strengths */}
        <section>
          <SectionLabel>Core Traits</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {strengths.slice(0, 4).map((s) => (
              <div key={s.trait} className="flex items-start gap-2">
                <CyanDot />
                <div>
                  <p className="text-[12px] font-semibold text-white/90 print:text-black">{s.trait}</p>
                  <p className="text-[11px] leading-snug text-white/45 print:text-gray-500">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer watermark */}
        <div className="pt-4 text-right print:hidden">
          <p className="font-mono text-[9px] text-white/15">
            <span className="text-[#00F0FF]/30">// </span>
            {basics.name} · {basics.title}
            <span className="text-[#00F0FF]/30"> //</span>
          </p>
        </div>
      </main>
    </div>
  );
}
