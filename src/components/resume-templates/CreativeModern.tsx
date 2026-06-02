"use client";

/**
 * CreativeModern Template
 *
 * Vibrant, modern two-column layout with a left sidebar.
 * Features a circular profile photo highlighted by a pink/purple/indigo gradient border.
 * Flow content: sidebar items shift up gracefully if no image is present.
 */

import type { ResumeData } from "./index";
import { Mail, MapPin, Link2, GitBranch, GraduationCap, Star, ExternalLink } from "lucide-react";

interface Props { data: ResumeData }

const ACCENT = "#EC4899"; // Pink-500

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] opacity-50"
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
        <div className="flex-1 h-px bg-pink-100" />
      </div>
      {children}
    </section>
  );
}

export function CreativeModernTemplate({ data }: Props) {
  const { basics, summary, education, technicalSkills, projects, strengths, profileImageUrl } = data;

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
      id="creative-modern-resume"
      className="bg-white text-gray-900 w-full max-w-[900px] mx-auto flex shadow-xl print:shadow-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ══ SIDEBAR ═══════════════════════════════════════════ */}
      <aside
        className="w-[250px] shrink-0 p-6 flex flex-col gap-5 text-white bg-slate-900 print:bg-slate-950"
      >
        {/* Photo + Name block */}
        <div className="text-center">
          {profileImageUrl && (
            <div className="mx-auto mb-4 relative p-1 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 shadow-md h-28 w-28 shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profileImageUrl}
                alt={basics.name}
                className="h-full w-full rounded-full object-cover object-top border-2 border-slate-900"
              />
            </div>
          )}
          <h1 className="text-lg font-extrabold leading-tight text-white">{basics.name}</h1>
          <p className="mt-1 text-[10px] font-mono tracking-widest uppercase text-[#00F0FF]">
            {basics.title}
          </p>
        </div>

        {/* Contact */}
        <SidebarSection title="Contact Info">
          <div className="space-y-2">
            {[
              { icon: Mail,      label: basics.email },
              { icon: MapPin,    label: basics.location },
              { icon: Link2,     label: basics.linkedin },
              { icon: GitBranch, label: basics.github },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon className="h-3.5 w-3.5 text-pink-400 shrink-0 mt-0.5" />
                <span className="text-[10px] text-slate-300 break-all leading-relaxed">{label}</span>
              </div>
            ))}
          </div>
        </SidebarSection>

        {/* Technical Skills */}
        <SidebarSection title="Technical Core">
          <div className="flex flex-wrap gap-1">
            {topSkills.map((s) => (
              <span
                key={s}
                className="rounded-full px-2 py-0.5 text-[9px] font-semibold bg-white/10 text-pink-300 border border-white/5"
              >
                {s}
              </span>
            ))}
          </div>
        </SidebarSection>

        <SidebarSection title="Databases &amp; Tools">
          <div className="flex flex-wrap gap-1">
            {toolSkills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[9px] text-slate-300"
              >
                {s}
              </span>
            ))}
          </div>
        </SidebarSection>

        {/* Education sidebar */}
        <SidebarSection title="Education">
          {education.map((edu, i) => (
            <div key={i} className="mt-1">
              <div className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 shrink-0 text-pink-400" />
                <p className="text-[11px] font-bold text-white">{edu.degree}</p>
              </div>
              <p className="text-[10px] text-slate-400">{edu.institution}</p>
              <p className="text-[10px] text-slate-500">{edu.year}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] font-bold bg-pink-500/20 text-pink-300"
                >
                  {edu.gpa}
                </span>
                {edu.honors && (
                  <span className="flex items-center gap-0.5 text-[9px] text-amber-400 font-semibold">
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
      <main className="flex-1 p-7 space-y-6">
        {/* Summary */}
        <MainSection title="Creative Profile">
          <p className="text-xs leading-[1.8] text-gray-600">{summary}</p>
        </MainSection>

        {/* Projects */}
        <MainSection title="Featured Projects">
          <div className="space-y-4">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="rounded-xl border border-pink-100 bg-pink-50/20 p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-slate-800">{proj.title}</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-gray-500">{proj.description}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {proj.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-2 py-0.5 text-[9px] font-semibold bg-pink-50 text-pink-600"
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
                      className="shrink-0 flex items-center gap-1 rounded-lg border border-pink-200 px-2 py-1 text-[9px] font-bold text-pink-600 transition-colors hover:bg-pink-100"
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
        <MainSection title="Key Traits &amp; Strengths">
          <div className="grid grid-cols-2 gap-3">
            {strengths.slice(0, 4).map((s) => (
              <div
                key={s.trait}
                className="rounded-xl border border-pink-100 bg-pink-50/10 p-3"
              >
                <p className="text-xs font-bold text-slate-850" style={{ color: ACCENT }}>{s.trait}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-gray-500">{s.detail}</p>
              </div>
            ))}
          </div>
        </MainSection>
      </main>
    </div>
  );
}
