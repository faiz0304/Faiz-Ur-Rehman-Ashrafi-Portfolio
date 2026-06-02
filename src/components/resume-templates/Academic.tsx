"use client";

/**
 * Academic Template
 *
 * Formal CV structure inspired by LaTeX-style academic documents.
 * Dense information layout with strict typographic hierarchy.
 * Black on white, serif-adjacent fonts, numbered sections.
 * Best for: research roles, PhD applications, faculty positions.
 */

import type { ResumeData } from "./index";
import { Mail, MapPin, Link2, GitBranch } from "lucide-react";

interface Props { data: ResumeData }

let sectionCounter = 0;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  sectionCounter += 1;
  const num = sectionCounter;
  return (
    <section className="mb-6">
      <div className="flex items-baseline gap-3 mb-3 pb-1 border-b-2 border-gray-900">
        <span
          className="text-[11px] font-bold text-gray-400 font-mono"
          style={{ minWidth: "1.5rem" }}
        >
          {String(num).padStart(2, "0")}.
        </span>
        <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-gray-900">
          {title}
        </h2>
      </div>
      <div className="pl-8">{children}</div>
    </section>
  );
}

export function AcademicTemplate({ data }: Props) {
  // Reset counter for each render
  sectionCounter = 0;

  const { basics, summary, education, technicalSkills, projects, strengths, continuousLearning } = data;

  const allSkillGroups = [
    { label: "Programming & Data Science", items: technicalSkills.programmingAndData },
    { label: "AI & Machine Learning",      items: technicalSkills.aiAndMl },
    { label: "Frameworks & Libraries",     items: technicalSkills.frameworks },
    { label: "Databases & Storage",        items: technicalSkills.databases },
    { label: "Systems Engineering",        items: technicalSkills.engineering },
    { label: "Development Tools",          items: technicalSkills.tools },
  ];

  return (
    <div
      id="academic-resume"
      className="bg-white text-gray-900 w-full max-w-[820px] mx-auto p-12 print:p-8"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* ══ DOCUMENT HEADER ═══════════════════════════════════ */}
      <header className="mb-8 text-center border-b-4 border-double border-gray-900 pb-6">
        <h1
          className="text-3xl font-bold tracking-wide text-gray-900 uppercase"
          style={{ letterSpacing: "0.08em" }}
        >
          {basics.name}
        </h1>
        <p
          className="mt-2 text-[13px] font-normal italic text-gray-600"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {basics.title}
        </p>

        {/* Contact in a formal inline list */}
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {[
            { icon: Mail,      label: basics.email },
            { icon: MapPin,    label: basics.location },
            { icon: Link2,     label: basics.linkedin },
            { icon: GitBranch, label: basics.github },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-[11px] text-gray-500"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              <Icon className="h-3 w-3 text-gray-400" />
              {label}
            </span>
          ))}
        </div>
      </header>

      {/* ══ ABSTRACT / PROFILE ════════════════════════════════ */}
      <Section title="Research Profile &amp; Objectives">
        <p
          className="text-[13px] leading-[1.95] text-gray-700 text-justify"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {summary}
        </p>
      </Section>

      {/* ══ EDUCATION ═════════════════════════════════════════ */}
      <Section title="Academic Background">
        <div className="space-y-4">
          {education.map((edu, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-[13px] font-bold text-gray-900">{edu.degree}</h3>
                <span className="text-[12px] italic text-gray-500 shrink-0 ml-4">{edu.year}</span>
              </div>
              <p className="text-[12px] text-gray-700">{edu.institution}</p>
              <div className="mt-0.5 flex gap-3">
                <span className="text-[11px] text-gray-500">GPA: <strong>{edu.gpa}</strong></span>
                {edu.honors && (
                  <span className="text-[11px] font-semibold italic text-gray-700">
                    {edu.honors}
                  </span>
                )}
              </div>
              {edu.detail && (
                <p className="mt-1 text-[11px] text-gray-500 leading-relaxed italic">
                  {edu.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ══ TECHNICAL COMPETENCIES ════════════════════════════ */}
      <Section title="Technical Competencies">
        <div className="space-y-2">
          {allSkillGroups.map((group) => (
            <div key={group.label} className="flex gap-2">
              <span className="text-[12px] font-bold text-gray-800 shrink-0" style={{ minWidth: "200px" }}>
                {group.label}:
              </span>
              <span className="text-[12px] text-gray-600">
                {group.items.join("; ")}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ RESEARCH PROJECTS ════════════════════════════════ */}
      <Section title="Research Projects &amp; Implementations">
        <div className="space-y-5">
          {projects.map((proj, i) => (
            <div key={i} className="border-l-2 border-gray-200 pl-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[13px] font-bold text-gray-900 italic">{proj.title}</h3>
                {proj.githubLink && (
                  <span className="text-[10px] text-gray-400 font-mono shrink-0">
                    {proj.githubLink.replace("https://", "")}
                  </span>
                )}
              </div>
              <p
                className="mt-1 text-[12px] leading-relaxed text-gray-600 text-justify"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {proj.description}
              </p>
              <p className="mt-1 text-[11px] text-gray-400">
                <span className="font-semibold text-gray-600">Technologies: </span>
                {proj.tags.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ PROFESSIONAL ATTRIBUTES ══════════════════════════ */}
      <Section title="Professional Attributes">
        <div className="space-y-2">
          {strengths.map((s) => (
            <div key={s.trait} className="flex gap-2">
              <span className="text-[12px] font-bold text-gray-800 shrink-0" style={{ minWidth: "190px" }}>
                {s.trait}:
              </span>
              <span className="text-[12px] text-gray-600">{s.detail}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ CONTINUING EDUCATION ══════════════════════════════ */}
      <Section title="Continuing Education &amp; Research Interests">
        <ul className="list-none space-y-1">
          {continuousLearning.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[12px] text-gray-600"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              <span className="font-mono text-[10px] text-gray-400 mt-0.5">({i + 1})</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-double border-gray-300 text-center">
        <p className="text-[10px] text-gray-400 italic">
          Curriculum Vitæ — {basics.name} — {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
