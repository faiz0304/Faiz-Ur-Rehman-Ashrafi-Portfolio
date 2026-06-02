"use client";

/**
 * Minimalist Template
 *
 * Single-column, white background, generous whitespace.
 * Optimised for ATS parsing and traditional corporate roles.
 * Typography: Inter (sans-serif), thin weights, muted palette.
 */

import type { ResumeData } from "./index";
import { Mail, MapPin, Link2, GitBranch, GraduationCap, Star } from "lucide-react";

interface Props { data: ResumeData }

function Divider() {
  return <hr className="my-5 border-gray-100" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
      {children}
    </h2>
  );
}

export function MinimalistTemplate({ data }: Props) {
  const { basics, summary, education, technicalSkills, projects, strengths, continuousLearning } = data;

  const allSkills: string[] = [
    ...technicalSkills.programmingAndData,
    ...technicalSkills.frameworks,
    ...technicalSkills.aiAndMl,
    ...technicalSkills.databases,
    ...technicalSkills.engineering,
    ...technicalSkills.tools,
  ];

  return (
    <div
      id="minimalist-resume"
      className="bg-white text-gray-900 font-sans w-full max-w-[800px] mx-auto p-10 print:p-8 shadow-xl print:shadow-none"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="mb-7">
        <h1 className="text-3xl font-extralight tracking-[0.06em] text-gray-900 uppercase">
          {basics.name}
        </h1>
        <p className="mt-1 text-sm font-light text-gray-500 tracking-wide">{basics.title}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
          {[
            { icon: Mail,      label: basics.email },
            { icon: MapPin,    label: basics.location },
            { icon: Link2,     label: basics.linkedin },
            { icon: GitBranch, label: basics.github },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
              <Icon className="h-3 w-3" />
              {label}
            </span>
          ))}
        </div>
      </header>

      <Divider />

      {/* ── Summary ─────────────────────────────────────────── */}
      <section className="mb-5">
        <SectionTitle>Profile</SectionTitle>
        <p className="text-[13px] leading-[1.85] text-gray-600">{summary}</p>
      </section>

      <Divider />

      {/* ── Skills ──────────────────────────────────────────── */}
      <section className="mb-5">
        <SectionTitle>Core Competencies</SectionTitle>
        <div className="flex flex-wrap gap-1.5">
          {allSkills.slice(0, 24).map((skill) => (
            <span
              key={skill}
              className="border border-gray-200 rounded px-2.5 py-0.5 text-[11px] text-gray-500"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Projects ────────────────────────────────────────── */}
      <section className="mb-5">
        <SectionTitle>Projects &amp; Work</SectionTitle>
        <div className="space-y-4">
          {projects.map((proj, i) => (
            <div key={i} className="pl-3 border-l border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[13px] font-semibold text-gray-800">{proj.title}</h3>
                {proj.githubLink && (
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {proj.githubLink.replace("https://", "")}
                  </a>
                )}
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-gray-500">{proj.description}</p>
              <p className="mt-1 text-[11px] text-gray-400">{proj.tags.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Education ───────────────────────────────────────── */}
      <section className="mb-5">
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-3">
          {education.map((edu, i) => (
            <div key={i} className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-3.5 w-3.5 text-gray-300 shrink-0" />
                  <h3 className="text-[13px] font-semibold text-gray-800">{edu.degree}</h3>
                </div>
                <p className="mt-0.5 text-[12px] text-gray-500">{edu.institution}</p>
                {edu.detail && (
                  <p className="mt-1 text-[11px] leading-relaxed text-gray-400">{edu.detail}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-[11px] text-gray-400">{edu.year}</p>
                <p className="text-[11px] text-gray-500">{edu.gpa}</p>
                {edu.honors && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600">
                    <Star className="h-2.5 w-2.5 fill-amber-400" />
                    {edu.honors}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Strengths ───────────────────────────────────────── */}
      <section>
        <SectionTitle>Strengths</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {strengths.slice(0, 4).map((s) => (
            <div key={s.trait}>
              <p className="text-[12px] font-semibold text-gray-700">{s.trait}</p>
              <p className="text-[11px] text-gray-400 leading-snug mt-0.5">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
