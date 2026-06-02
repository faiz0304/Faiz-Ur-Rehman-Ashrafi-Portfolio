"use client";

/**
 * Modern Template
 *
 * Two-column layout with a coloured left sidebar.
 * Indigo/violet accent palette. Card-based sections with subtle shadows.
 * Clean hierarchy: bold name, coloured title, structured sections.
 */

import type { ResumeData } from "./index";
import { Mail, MapPin, Link2, GitBranch, GraduationCap, Star, ExternalLink } from "lucide-react";

interface Props { data: ResumeData }

const ACCENT = "#7C3AED"; // indigo-600

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: ACCENT }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
          {title}
        </h2>
        <div className="flex-1 h-px bg-violet-100" />
      </div>
      {children}
    </section>
  );
}

export function ModernTemplate({ data }: Props) {
  const { basics, summary, education, technicalSkills, projects, strengths } = data;

  const topSkills = [
    ...technicalSkills.programmingAndData.slice(0, 5),
    ...technicalSkills.aiAndMl.slice(0, 4),
    ...technicalSkills.frameworks.slice(0, 4),
  ];

  const toolSkills = [
    ...technicalSkills.databases,
    ...technicalSkills.tools.slice(0, 5),
  ];

  return (
    <div
      id="modern-resume"
      className="bg-white text-gray-900 w-full max-w-[900px] mx-auto flex shadow-xl print:shadow-none"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      {/* ══ SIDEBAR ═══════════════════════════════════════════ */}
      <aside
        className="w-[240px] shrink-0 p-6 flex flex-col gap-5"
        style={{ backgroundColor: "#f5f3ff" }}  /* violet-50 */
      >
        {/* Avatar placeholder + name block */}
        <div>
          {/* Colour block acting as a visual header accent */}
          <div
            className="h-1.5 w-12 rounded-full mb-4"
            style={{ background: `linear-gradient(90deg, ${ACCENT}, #a78bfa)` }}
          />
          <h1 className="text-lg font-bold text-gray-900 leading-tight">{basics.name}</h1>
          <p className="mt-0.5 text-[11px] font-semibold" style={{ color: ACCENT }}>
            {basics.title}
          </p>
        </div>

        {/* Contact */}
        <SidebarSection title="Contact">
          <div className="space-y-1.5">
            {[
              { icon: Mail,      label: basics.email },
              { icon: MapPin,    label: basics.location },
              { icon: Link2,     label: basics.linkedin },
              { icon: GitBranch, label: basics.github },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-1.5">
                <Icon className="h-3 w-3 shrink-0 mt-0.5" style={{ color: ACCENT }} />
                <span className="text-[10px] text-gray-600 break-all leading-relaxed">{label}</span>
              </div>
            ))}
          </div>
        </SidebarSection>

        {/* Technical Skills */}
        <SidebarSection title="Tech Stack">
          <div className="flex flex-wrap gap-1">
            {topSkills.map((s) => (
              <span
                key={s}
                className="rounded-full px-2 py-0.5 text-[9px] font-medium border"
                style={{ borderColor: "#ddd6fe", color: ACCENT, background: "#ede9fe" }}
              >
                {s}
              </span>
            ))}
          </div>
        </SidebarSection>

        <SidebarSection title="Tools &amp; Data">
          <div className="flex flex-wrap gap-1">
            {toolSkills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[9px] text-gray-500"
              >
                {s}
              </span>
            ))}
          </div>
        </SidebarSection>

        {/* Engineering skills */}
        <SidebarSection title="Engineering">
          <ul className="space-y-1">
            {technicalSkills.engineering.map((s) => (
              <li key={s} className="flex items-center gap-1.5 text-[10px] text-gray-600">
                <span className="h-1 w-1 rounded-full" style={{ background: ACCENT }} />
                {s}
              </li>
            ))}
          </ul>
        </SidebarSection>

        {/* Education sidebar */}
        <SidebarSection title="Education">
          {education.map((edu, i) => (
            <div key={i} className="mt-1">
              <div className="flex items-center gap-1">
                <GraduationCap className="h-3 w-3 shrink-0" style={{ color: ACCENT }} />
                <p className="text-[11px] font-semibold text-gray-800">{edu.degree}</p>
              </div>
              <p className="text-[10px] text-gray-500">{edu.institution}</p>
              <p className="text-[10px] text-gray-400">{edu.year}</p>
              <div className="mt-1 flex gap-1.5">
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                  style={{ background: "#ede9fe", color: ACCENT }}
                >
                  {edu.gpa}
                </span>
                {edu.honors && (
                  <span className="flex items-center gap-0.5 text-[9px] text-amber-600 font-medium">
                    <Star className="h-2.5 w-2.5 fill-amber-400" />
                    {edu.honors}
                  </span>
                )}
              </div>
            </div>
          ))}
        </SidebarSection>
      </aside>

      {/* ══ MAIN CONTENT ══════════════════════════════════════ */}
      <main className="flex-1 p-7 space-y-5">

        {/* Summary */}
        <MainSection title="About Me">
          <p className="text-[13px] leading-[1.85] text-gray-600">{summary}</p>
        </MainSection>

        {/* Projects */}
        <MainSection title="Projects">
          <div className="space-y-3">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="rounded-lg border border-violet-100 bg-violet-50/40 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-[13px] font-semibold text-gray-800">{proj.title}</h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-gray-500">{proj.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {proj.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-2 py-0.5 text-[9px] font-medium"
                          style={{ background: "#ede9fe", color: ACCENT }}
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
                      className="shrink-0 flex items-center gap-1 rounded-lg border border-violet-200 px-2 py-1 text-[10px] font-medium transition-colors hover:bg-violet-100"
                      style={{ color: ACCENT }}
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
        </MainSection>

        {/* Strengths */}
        <MainSection title="Strengths">
          <div className="grid grid-cols-2 gap-3">
            {strengths.slice(0, 4).map((s) => (
              <div
                key={s.trait}
                className="rounded-lg border border-violet-100 bg-violet-50/30 p-3"
              >
                <p className="text-[12px] font-semibold text-gray-800">{s.trait}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-gray-500">{s.detail}</p>
              </div>
            ))}
          </div>
        </MainSection>
      </main>
    </div>
  );
}
