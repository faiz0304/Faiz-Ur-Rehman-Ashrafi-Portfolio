"use client";

/**
 * ResumeTemplatePicker
 *
 * A horizontal scrollable carousel displaying 5 CSS-drawn template preview cards.
 * Each card visually represents the template's aesthetic using scaled-down CSS.
 * Supports "auto" mode (AI selects) plus manual override.
 */

import { motion } from "framer-motion";
import { Cpu, Sparkles } from "lucide-react";
import { TEMPLATE_REGISTRY, TEMPLATE_IDS, type TemplateId } from "./resume-templates/index";

// ─── CSS Mini-Preview Components ──────────────────────────────────────────────

function MinimalistPreview() {
  return (
    <div className="h-full w-full bg-white p-2.5 flex flex-col gap-1.5">
      {/* Name bar */}
      <div className="h-2.5 w-20 bg-gray-200 rounded-sm" />
      <div className="h-1.5 w-14 bg-gray-100 rounded-sm" />
      {/* Thin divider */}
      <div className="mt-1 h-px w-full bg-gray-100" />
      {/* Summary lines */}
      <div className="h-1 w-full bg-gray-100 rounded-sm" />
      <div className="h-1 w-5/6 bg-gray-100 rounded-sm" />
      <div className="h-1 w-4/5 bg-gray-100 rounded-sm" />
      {/* Divider */}
      <div className="mt-1 h-px w-full bg-gray-100" />
      {/* Skill pills */}
      <div className="flex flex-wrap gap-1">
        {[10, 14, 10, 16].map((w, i) => (
          <div key={i} className="h-2 rounded border border-gray-200" style={{ width: `${w}px` }} />
        ))}
      </div>
      {/* Divider */}
      <div className="mt-1 h-px w-full bg-gray-100" />
      {/* Project entries */}
      {[0, 1].map((i) => (
        <div key={i} className="pl-1.5 border-l border-gray-100 flex flex-col gap-0.5">
          <div className="h-1.5 w-16 bg-gray-200 rounded-sm" />
          <div className="h-1 w-full bg-gray-100 rounded-sm" />
          <div className="h-1 w-4/5 bg-gray-100 rounded-sm" />
        </div>
      ))}
    </div>
  );
}

function AgenticPreview() {
  return (
    <div className="h-full w-full flex" style={{ background: "#0A0A0A" }}>
      {/* Sidebar */}
      <div className="w-[42%] h-full flex flex-col gap-1.5 p-1.5" style={{ background: "#111111", borderRight: "1px solid rgba(0,240,255,0.1)" }}>
        <div className="h-1.5 w-10 rounded-sm" style={{ background: "rgba(0,240,255,0.6)" }} />
        <div className="h-1 w-8 rounded-sm" style={{ background: "rgba(255,255,255,0.15)" }} />
        <div className="mt-1 h-px w-full" style={{ background: "linear-gradient(90deg, rgba(0,240,255,0.3), transparent)" }} />
        {/* Contact lines */}
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-sm shrink-0" style={{ background: "rgba(0,240,255,0.25)" }} />
            <div className="h-1 rounded-sm" style={{ width: "40px", background: "rgba(255,255,255,0.1)" }} />
          </div>
        ))}
        <div className="mt-0.5 h-px w-full" style={{ background: "rgba(0,240,255,0.08)" }} />
        {/* Skill chips */}
        <div className="flex flex-wrap gap-0.5">
          {[14, 10, 16, 12].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-sm"
              style={{ width: `${w}px`, background: "rgba(0,240,255,0.1)", border: "1px solid rgba(0,240,255,0.15)" }}
            />
          ))}
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 p-1.5 flex flex-col gap-1.5">
        {/* Terminal dots */}
        <div className="flex gap-0.5">
          {["#ff5f56","#febc2e","#27c93f"].map((c) => (
            <div key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
          ))}
        </div>
        <div className="h-1 w-8 rounded-sm" style={{ background: "rgba(0,240,255,0.35)" }} />
        <div className="h-1 w-full rounded-sm" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="h-1 w-5/6 rounded-sm" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="mt-0.5 h-px w-full" style={{ background: "rgba(0,240,255,0.06)" }} />
        {/* Project cards */}
        {[0, 1].map((i) => (
          <div key={i} className="rounded p-1" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="h-1.5 w-12 rounded-sm mb-0.5" style={{ background: "rgba(255,255,255,0.2)" }} />
            <div className="h-1 w-full rounded-sm" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ModernPreview() {
  return (
    <div className="h-full w-full flex" style={{ background: "#ffffff" }}>
      {/* Sidebar */}
      <div className="w-[40%] h-full flex flex-col gap-1.5 p-1.5" style={{ background: "#f5f3ff" }}>
        <div className="h-1 w-8 rounded-full" style={{ background: "linear-gradient(90deg, #7C3AED, #a78bfa)" }} />
        <div className="h-2 w-12 rounded-sm" style={{ background: "#3730a3", opacity: 0.8 }} />
        <div className="h-1 w-10 rounded-sm" style={{ background: "#7C3AED", opacity: 0.6 }} />
        <div className="mt-0.5 h-px w-full" style={{ background: "#ddd6fe" }} />
        {/* Skill pills */}
        <div className="flex flex-wrap gap-0.5">
          {[12, 16, 10, 14, 11].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{ width: `${w}px`, background: "#ede9fe", border: "1px solid #ddd6fe" }}
            />
          ))}
        </div>
        <div className="mt-0.5 h-px w-full" style={{ background: "#ddd6fe" }} />
        {/* Contact */}
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-sm shrink-0" style={{ background: "#c4b5fd" }} />
            <div className="h-1 rounded-sm w-10" style={{ background: "#d1d5db" }} />
          </div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <div className="h-1 w-8" style={{ background: "#7C3AED", opacity: 0.7 }} />
          <div className="flex-1 h-px" style={{ background: "#ede9fe" }} />
        </div>
        <div className="h-1 w-full rounded-sm bg-gray-100" />
        <div className="h-1 w-5/6 rounded-sm bg-gray-100" />
        {/* Project cards */}
        {[0, 1].map((i) => (
          <div key={i} className="rounded p-1" style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}>
            <div className="h-1.5 w-12 rounded-sm mb-0.5" style={{ background: "#6d28d9", opacity: 0.5 }} />
            <div className="h-1 w-full rounded-sm bg-gray-100" />
            <div className="flex gap-0.5 mt-0.5">
              {[8, 10, 8].map((w, j) => (
                <div key={j} className="h-1 rounded-full" style={{ width: `${w}px`, background: "#ede9fe" }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VibePreview() {
  return (
    <div className="h-full w-full flex flex-col" style={{ background: "#0d0d14" }}>
      {/* Gradient hero */}
      <div
        className="h-[40%] p-2 flex flex-col justify-end relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d0d14, #1a0533 60%, #0d1a24)" }}
      >
        <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full opacity-20 blur-md" style={{ background: "#00F0FF" }} />
        <div className="absolute right-0 bottom-0 h-6 w-6 rounded-full opacity-10 blur-md" style={{ background: "#EC4899" }} />
        <div className="h-2.5 w-16 rounded-sm" style={{ background: "linear-gradient(90deg, #fff, #00F0FF)", opacity: 0.9 }} />
        <div className="mt-0.5 h-1.5 w-10 rounded-sm" style={{ background: "rgba(255,255,255,0.4)" }} />
      </div>
      {/* Body */}
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        {/* Skill chips */}
        <div className="flex flex-wrap gap-0.5">
          {[
            ["#00F0FF20", "#00F0FF"], ["#EC489920", "#EC4899"], ["#7C3AED20", "#a78bfa"],
            ["#00F0FF15", "#00F0FF"], ["#EC489915", "#EC4899"]
          ].map(([bg, border], i) => (
            <div
              key={i}
              className="h-2 w-8 rounded"
              style={{ background: bg, border: `1px solid ${border}30` }}
            />
          ))}
        </div>
        {/* Project cards */}
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded p-1"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="h-1.5 w-14 rounded-sm mb-0.5" style={{ background: "rgba(255,255,255,0.25)" }} />
            <div className="h-1 w-full rounded-sm" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AcademicPreview() {
  return (
    <div className="h-full w-full bg-white p-2 flex flex-col gap-1.5">
      {/* Centered header */}
      <div className="flex flex-col items-center gap-0.5">
        <div className="h-2 w-20 rounded-sm bg-gray-800" />
        <div className="h-1.5 w-14 rounded-sm bg-gray-400" />
        <div className="h-px w-full border-t-2 border-double border-gray-800 mt-1" />
      </div>
      {/* Numbered sections */}
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <div className="flex items-center gap-1 pb-0.5 border-b border-gray-800 mb-0.5">
            <div className="h-1.5 w-4 rounded-sm bg-gray-300 font-mono" />
            <div className="h-1.5 w-12 rounded-sm bg-gray-700" />
          </div>
          <div className="pl-4 flex flex-col gap-0.5">
            <div className="h-1 w-full rounded-sm bg-gray-100" />
            <div className="h-1 w-5/6 rounded-sm bg-gray-100" />
          </div>
        </div>
      ))}
      {/* Formal footer */}
      <div className="mt-auto h-px border-t border-double border-gray-300" />
      <div className="h-1 w-24 rounded-sm bg-gray-100 mx-auto" />
    </div>
  );
}

// ─── Preview Map ───────────────────────────────────────────────────────────────

const PREVIEW_COMPONENTS: Record<TemplateId, React.FC> = {
  minimalist: MinimalistPreview,
  photoMinimalist: PhotoMinimalistPreview,
  agentic: AgenticPreview,
  executivePhoto: ExecutivePhotoPreview,
  modern: ModernPreview,
  creativeModern: CreativeModernPreview,
  vibe: VibePreview,
  academic: AcademicPreview,
};

function PhotoMinimalistPreview() {
  return (
    <div className="h-full w-full bg-white p-2.5 flex flex-col gap-1.5">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-2.5 w-16 bg-gray-700 rounded-sm" />
          <div className="h-1.5 w-12 bg-gray-300 rounded-sm" />
        </div>
        <div className="h-4.5 w-4.5 rounded-full bg-gray-300 border border-gray-100 shrink-0" />
      </div>
      <div className="mt-0.5 h-px w-full bg-gray-100" />
      <div className="h-1 w-full bg-gray-100 rounded-sm" />
      <div className="h-1 w-5/6 bg-gray-100 rounded-sm" />
      <div className="mt-0.5 h-px w-full bg-gray-100" />
      {[0, 1].map((i) => (
        <div key={i} className="pl-1.5 border-l border-gray-100 flex flex-col gap-0.5">
          <div className="h-1.5 w-14 bg-gray-200 rounded-sm" />
          <div className="h-1 w-full bg-gray-100 rounded-sm" />
        </div>
      ))}
    </div>
  );
}

function ExecutivePhotoPreview() {
  return (
    <div className="h-full w-full bg-white p-2.5 flex flex-col gap-1.5">
      <div className="flex items-start gap-2 pb-1.5 border-b border-gray-100">
        <div className="h-5 w-5 rounded bg-gray-300 shrink-0 border border-gray-100" />
        <div className="flex-1 flex flex-col gap-0.5">
          <div className="h-2 w-14 bg-slate-800 rounded-sm" />
          <div className="h-1.5 w-10 bg-blue-700 rounded-sm" />
          <div className="h-1 w-12 bg-gray-100 rounded-sm" />
        </div>
      </div>
      <div className="h-1 w-full bg-gray-200 rounded-sm" />
      <div className="h-1 w-5/6 bg-gray-100 rounded-sm" />
      {[0, 1].map((i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <div className="h-1.5 w-16 bg-blue-700 rounded-sm" style={{ opacity: 0.8 }} />
          <div className="h-1 w-full bg-gray-100 rounded-sm" />
        </div>
      ))}
    </div>
  );
}

function CreativeModernPreview() {
  return (
    <div className="h-full w-full flex bg-white">
      <div className="w-[38%] h-full flex flex-col gap-1.5 p-1.5 bg-slate-900">
        <div className="h-4.5 w-4.5 rounded-full bg-pink-400 border border-slate-900 mx-auto shadow-sm" />
        <div className="h-1.5 w-10 bg-white rounded-sm mx-auto" />
        <div className="h-1 w-8 bg-[#00F0FF] rounded-sm mx-auto" />
        <div className="mt-1 flex flex-wrap gap-0.5 justify-center">
          {[8, 6, 8].map((w, i) => (
            <div key={i} className="h-1 rounded-full bg-white/20" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-8 bg-pink-500 rounded-sm" />
          <div className="flex-1 h-px bg-pink-100" />
        </div>
        <div className="h-1 w-full bg-gray-100 rounded-sm" />
        <div className="h-1 w-5/6 bg-gray-200 rounded-sm" />
        {[0, 1].map((i) => (
          <div key={i} className="rounded p-1 bg-pink-50/30 border border-pink-100">
            <div className="h-1.5 w-10 bg-slate-700 rounded-sm mb-0.5" />
            <div className="h-1 w-full bg-gray-100 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

interface ResumeTemplatePickerProps {
  selected: TemplateId | "auto";
  onChange: (id: TemplateId | "auto") => void;
}

export function ResumeTemplatePicker({ selected, onChange }: ResumeTemplatePickerProps) {
  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-[#00F0FF]/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            Template Selection
          </span>
        </div>
        {selected !== "auto" && (
          <button
            onClick={() => onChange("auto")}
            className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[#00F0FF]/60 hover:text-[#00F0FF] transition-colors"
          >
            <Sparkles className="h-2.5 w-2.5" />
            Let AI Choose
          </button>
        )}
      </div>

      {/* Scrollable card row */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Auto card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange("auto")}
          className={`relative flex-none w-[90px] h-[120px] rounded-xl border-2 overflow-hidden flex flex-col items-center justify-center gap-1.5 transition-all duration-200
            ${selected === "auto"
              ? "border-[#00F0FF] shadow-[0_0_16px_rgba(0,240,255,0.3)]"
              : "border-white/10 hover:border-white/20"
            }`}
          style={{ background: selected === "auto" ? "rgba(0,240,255,0.06)" : "rgba(255,255,255,0.02)" }}
        >
          {selected === "auto" && (
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/60 to-transparent" />
          )}
          <Sparkles
            className={`h-5 w-5 transition-colors ${selected === "auto" ? "text-[#00F0FF]" : "text-white/30"}`}
          />
          <span
            className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-colors ${selected === "auto" ? "text-[#00F0FF]" : "text-white/40"}`}
          >
            AI Pick
          </span>
          <span className="font-mono text-[8px] text-white/25 text-center px-1 leading-snug">
            Best for JD
          </span>
        </motion.button>

        {/* Template cards */}
        {TEMPLATE_IDS.map((id) => {
          const entry = TEMPLATE_REGISTRY[id];
          const Preview = PREVIEW_COMPONENTS[id];
          const isSelected = selected === id;

          return (
            <motion.button
              key={id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(id)}
              className={`relative flex-none w-[90px] rounded-xl border-2 overflow-hidden transition-all duration-200 flex flex-col
                ${isSelected
                  ? "shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                  : "border-white/10 hover:border-white/25"
                }`}
              style={{
                borderColor: isSelected ? entry.accentColor : undefined,
                boxShadow: isSelected ? `0 0 20px ${entry.accentColor}30` : undefined,
              }}
            >
              {/* Top glow bar for selected */}
              {isSelected && (
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${entry.accentColor}80, transparent)` }}
                />
              )}

              {/* CSS Preview area */}
              <div className="h-[90px] w-full overflow-hidden">
                <Preview />
              </div>

              {/* Label area */}
              <div
                className="px-2 py-1.5 flex flex-col gap-0.5"
                style={{ background: isSelected ? `${entry.accentColor}10` : "rgba(255,255,255,0.02)" }}
              >
                <span
                  className="font-mono text-[9px] font-bold uppercase tracking-wider truncate"
                  style={{ color: isSelected ? entry.accentColor : "rgba(255,255,255,0.5)" }}
                >
                  {entry.label}
                </span>
                <span className="font-mono text-[8px] text-white/25 truncate leading-tight">
                  {entry.bestFor.split(" · ")[0]}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selection info row */}
      {selected !== "auto" && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
        >
          <span
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{ background: TEMPLATE_REGISTRY[selected].accentColor }}
          />
          <div>
            <span className="font-mono text-[10px] text-white/70">
              {TEMPLATE_REGISTRY[selected].label}
            </span>
            <span className="mx-1.5 text-white/20">·</span>
            <span className="font-mono text-[10px] text-white/35">
              {TEMPLATE_REGISTRY[selected].tagline}
            </span>
          </div>
          <span className="ml-auto font-mono text-[9px] text-white/25">
            {TEMPLATE_REGISTRY[selected].bestFor}
          </span>
        </motion.div>
      )}
      {selected === "auto" && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-2 rounded-lg border border-[#00F0FF]/10 bg-[#00F0FF]/[0.03] px-3 py-2"
        >
          <Sparkles className="h-3 w-3 text-[#00F0FF]/50 shrink-0" />
          <span className="font-mono text-[10px] text-white/50">
            AI will analyze the JD and select the optimal template automatically
          </span>
        </motion.div>
      )}
    </div>
  );
}
