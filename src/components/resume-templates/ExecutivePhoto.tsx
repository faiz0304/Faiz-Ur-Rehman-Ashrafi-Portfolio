"use client";

/**
 * ExecutivePhoto Template
 *
 * Classic executive CV layout with dark blue accents and formal styling.
 * Square profile picture with rounded corners positioned top-left of the header.
 * Collapses the image slot and expands the text area to full-width if no photo is provided.
 */

import type { ResumeData } from "./index";
import { Mail, MapPin, Link2, GitBranch, GraduationCap, Star } from "lucide-react";

interface Props { data: ResumeData }

const ACCENT = "#1E3A8A"; // Deep blue

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
        {title}
      </h2>
      <div className="mt-1.5 h-0.5 w-full bg-gray-100" style={{ backgroundImage: `linear-gradient(to right, ${ACCENT}, #e5e7eb 30%, #e5e7eb)` }} />
    </div>
  );
}

export function ExecutivePhotoTemplate({ data }: Props) {
  const { basics, summary, education, technicalSkills, projects, strengths, profileImageUrl } = data;

  const skillGroups = [
    { label: "Core Competencies", skills: technicalSkills.aiAndMl },
    { label: "Languages & Frameworks", skills: [...technicalSkills.programmingAndData, ...technicalSkills.frameworks] },
    { label: "Databases & Tools", skills: [...technicalSkills.databases, ...technicalSkills.tools] },
  ];

  return (
    <div
      id="executive-photo-resume"
      className="bg-white text-gray-800 font-sans w-full max-w-[850px] mx-auto p-12 print:p-8 shadow-xl print:shadow-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 border-b border-gray-100 pb-6">
        {profileImageUrl && (
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-gray-200 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileImageUrl}
              alt={basics.name}
              className="h-full w-full object-cover object-top"
            />
          </div>
        )}

        <div className="flex-1 text-center sm:text-left min-w-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900" style={{ color: "#0F172A" }}>
            {basics.name}
          </h1>
          <p className="mt-1 text-sm font-semibold tracking-wider uppercase" style={{ color: ACCENT }}>
            {basics.title}
          </p>

          {/* Contact Details Grid */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
            {[
              { icon: Mail,      label: basics.email },
              { icon: MapPin,    label: basics.location },
              { icon: Link2,     label: basics.linkedin },
              { icon: GitBranch, label: basics.github },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center justify-center sm:justify-start gap-2">
                <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} />
                <span className="truncate">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Summary ─────────────────────────────────────────── */}
      <section className="mb-6">
        <SectionHeader title="Executive Profile" />
        <p className="text-xs leading-[1.8] text-gray-600">{summary}</p>
      </section>

      {/* ── Skills ──────────────────────────────────────────── */}
      <section className="mb-6">
        <SectionHeader title="Core Capabilities" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              <h4 className="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400">
                {group.label}
              </h4>
              <div className="flex flex-wrap gap-1">
                {group.skills.slice(0, 10).map((s) => (
                  <span
                    key={s}
                    className="rounded bg-slate-50 border border-slate-100 px-2 py-0.5 text-[10px] text-slate-600"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────── */}
      <section className="mb-6">
        <SectionHeader title="Key Projects &amp; Accomplishments" />
        <div className="space-y-4">
          {projects.map((proj, i) => (
            <div key={i} className="group relative">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">{proj.title}</h3>
                {proj.githubLink && (
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-[10px] hover:underline"
                    style={{ color: ACCENT }}
                  >
                    {proj.githubLink.replace("https://", "")}
                  </a>
                )}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{proj.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {proj.tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-gray-100 bg-gray-50/50 px-1.5 py-0.5 text-[9px] text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ───────────────────────────────────────── */}
      <section className="mb-6">
        <SectionHeader title="Academic Background" />
        <div className="space-y-3">
          {education.map((edu, i) => (
            <div key={i} className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  <h3 className="text-xs font-bold text-gray-800">{edu.degree}</h3>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">{edu.institution}</p>
                {edu.detail && (
                  <p className="mt-1.5 text-[11px] leading-relaxed text-gray-400">{edu.detail}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-gray-400">{edu.year}</p>
                <p className="text-[10px] font-bold" style={{ color: ACCENT }}>{edu.gpa}</p>
                {edu.honors && (
                  <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-100">
                    <Star className="h-2.5 w-2.5 fill-amber-400" />
                    {edu.honors}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Strengths ───────────────────────────────────────── */}
      <section>
        <SectionHeader title="Professional Qualities" />
        <div className="grid grid-cols-2 gap-4">
          {strengths.slice(0, 4).map((s) => (
            <div key={s.trait}>
              <p className="text-xs font-bold text-gray-700">{s.trait}</p>
              <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
