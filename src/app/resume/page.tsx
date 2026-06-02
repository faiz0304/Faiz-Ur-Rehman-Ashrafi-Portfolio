"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { FAIZ_RESUME_DATA } from "@/data/resumeData";
import {
  ArrowLeft, Download, Zap, ExternalLink, GitBranch,
  MapPin, Mail, Link2, GraduationCap, Star,
  X, Cpu, ChevronRight, RotateCcw, Printer, Sparkles,
  RefreshCcw, Layout,
} from "lucide-react";
import {
  TEMPLATE_REGISTRY,
  TEMPLATE_IDS,
  type TemplateId,
  type ResumeData,
  type StreamChunk,
} from "@/components/resume-templates/index";
import { ResumeTemplatePicker } from "@/components/ResumeTemplatePicker";

/* ═══════════════════════════════════════════════════════════════
   Animation helpers
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});

/* ── Skill pill ─────────────────────────────────────────────── */
function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#00F0FF]/20 bg-[#00F0FF]/8 px-3 py-1 font-mono text-[11px] font-medium text-[#00F0FF]/80 transition-all duration-300 hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/15 hover:text-[#00F0FF]">
      {label}
    </span>
  );
}

/* ── Section heading ────────────────────────────────────────── */
function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00F0FF]/60">{label}</span>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 h-px w-12 bg-gradient-to-r from-[#00F0FF]/60 to-transparent" />
    </div>
  );
}

/* ── Glass card wrapper ─────────────────────────────────────── */
function GlassCard({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171717] p-6 shadow-[0_4px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#00F0FF]/20 hover:shadow-[0_4px_40px_rgba(0,240,255,0.05)] sm:p-8 ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent print:hidden" />
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Template Result View
   Renders the AI-chosen template with resume data + reason banner
   ═══════════════════════════════════════════════════════════════ */
interface TemplateResultProps {
  template: TemplateId;
  templateReason: string;
  resumeData: ResumeData;
  activeTemplate: TemplateId;          // might differ (user swapped manually)
  onTemplateSwitch: (id: TemplateId) => void;
  onReset: () => void;
}

function TemplateResultView({
  template: aiTemplate,
  templateReason,
  resumeData,
  activeTemplate,
  onTemplateSwitch,
  onReset,
}: TemplateResultProps) {
  const TemplateComponent = TEMPLATE_REGISTRY[activeTemplate].component;

  return (
    <motion.div
      key="template-result"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {/* ── AI Template Reason Banner (hidden on print) ───── */}
      <div className="no-print print:hidden mb-4 rounded-xl border border-[#00F0FF]/15 bg-[#00F0FF]/[0.03] px-5 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#00F0FF]/20 bg-[#00F0FF]/8">
              <Sparkles className="h-3 w-3 text-[#00F0FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#00F0FF]/60">AI Selected</span>
                <span
                  className="rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold"
                  style={{
                    borderColor: `${TEMPLATE_REGISTRY[aiTemplate].accentColor}50`,
                    color: TEMPLATE_REGISTRY[aiTemplate].accentColor,
                    background: `${TEMPLATE_REGISTRY[aiTemplate].accentColor}10`,
                  }}
                >
                  {TEMPLATE_REGISTRY[aiTemplate].label}
                </span>
              </div>
              <p className="mt-1 text-xs text-foreground-muted leading-relaxed">{templateReason}</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="shrink-0 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground-muted transition-all duration-200 hover:border-white/20 hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      </div>

      {/* ── Template Switcher (post-generation, hidden on print) */}
      <div className="no-print print:hidden mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Layout className="h-3 w-3 text-white/30" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            Switch Template (no re-generation needed)
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TEMPLATE_IDS.map((id) => {
            const entry = TEMPLATE_REGISTRY[id];
            const isActive = activeTemplate === id;
            const isAiPick = id === aiTemplate;
            return (
              <button
                key={id}
                onClick={() => onTemplateSwitch(id)}
                className="shrink-0 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[10px] transition-all duration-200"
                style={{
                  borderColor: isActive ? entry.accentColor : "rgba(255,255,255,0.08)",
                  color: isActive ? entry.accentColor : "rgba(255,255,255,0.35)",
                  background: isActive ? `${entry.accentColor}0d` : "transparent",
                }}
              >
                {isAiPick && <Sparkles className="h-2.5 w-2.5 opacity-70" />}
                {entry.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Rendered template ──────────────────────────────── */}
      <div className="rounded-2xl border border-white/[0.07] overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.4)] print:border-0 print:shadow-none">
        <TemplateComponent data={resumeData} />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Streaming Status Display (inside modal)
   ═══════════════════════════════════════════════════════════════ */
function StreamingStatus({ message }: { message: string }) {
  return (
    <motion.div
      key={message}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-2.5"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF] animate-pulse" />
      <span className="font-mono text-xs text-foreground-muted">{message}</span>
      <span className="ml-0.5 inline-block h-3 w-[2px] animate-[cursor-blink_0.8s_step-end_infinite] rounded-sm bg-[#00F0FF]/70 align-middle" />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ATS Optimizer Modal — rebuilt with template picker + NDJSON
   ═══════════════════════════════════════════════════════════════ */
interface OptimizerModalProps {
  onClose: () => void;
  onComplete: (result: {
    template: TemplateId;
    templateReason: string;
    resumeData: ResumeData;
  }) => void;
}

function OptimizerModal({ onClose, onComplete }: OptimizerModalProps) {
  const [jdText, setJdText]                     = useState("");
  const [submitted, setSubmitted]               = useState(false);
  const [isLoading, setIsLoading]               = useState(false);
  const [statusMessage, setStatusMessage]       = useState("");
  const [error, setError]                       = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | "auto">("auto");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef    = useRef<AbortController | null>(null);

  /* Focus textarea on mount */
  useEffect(() => {
    const t = setTimeout(() => textareaRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!jdText.trim() || isLoading) return;
    setSubmitted(true);
    setIsLoading(true);
    setError(null);
    setStatusMessage("Initialising...");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: jdText.trim(),
          templateId: selectedTemplate,
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`API error: ${response.status}`);
      }

      /* Read NDJSON stream line-by-line */
      const reader  = response.body.getReader();
      const decoder = new TextDecoder();
      let   buffer  = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          let chunk: StreamChunk;
          try {
            chunk = JSON.parse(trimmed) as StreamChunk;
          } catch {
            continue; // skip malformed lines
          }

          if (chunk.type === "status") {
            setStatusMessage(chunk.message);
          } else if (chunk.type === "done") {
            setStatusMessage("Resume ready!");
            onComplete(chunk.data);
            onClose();
          } else if (chunk.type === "error") {
            setError(chunk.message);
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError(err instanceof Error ? err.message : "Unknown error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [jdText, isLoading, selectedTemplate, onComplete, onClose]);

  const handleStop = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
    setSubmitted(false);
    setStatusMessage("");
  }, []);

  const handleReset = useCallback(() => {
    handleStop();
    setJdText("");
    setError(null);
  }, [handleStop]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleGenerate();
  };

  const isIdle      = !submitted;
  const isDoneError = submitted && !isLoading && !!error;

  return createPortal(
    <AnimatePresence>
      {/* ── Backdrop ─────────────────────────────────────── */}
      <motion.div
        key="optimizer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Modal panel ─────────────────────────────────── */}
      <motion.div
        key="optimizer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="ATS Resume Optimizer"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        className="fixed inset-x-4 bottom-4 top-[4.5rem] z-[201] mx-auto flex max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_0_0_1px_rgba(0,240,255,0.05),0_24px_80px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent" />

        {/* ── Header ──────────────────────────────────── */}
        <div className="relative flex shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0D0D0D] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#00F0FF]/20 bg-[#00F0FF]/8">
              <Cpu className={`h-4 w-4 text-[#00F0FF] ${isLoading ? "animate-pulse" : ""}`} />
              {isLoading && (
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#111111] bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#00F0FF] opacity-60" />
                </span>
              )}
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00F0FF]/60">System Module</p>
              <h2 className="font-mono text-sm font-bold text-foreground">[ RESUME ARCHITECT AI ]</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoading && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden font-mono text-[10px] uppercase tracking-widest text-[#00F0FF] sm:block"
              >
                Processing
                <span className="ml-1 animate-[cursor-blink_0.8s_step-end_infinite]">▮</span>
              </motion.span>
            )}
            <button
              onClick={onClose}
              aria-label="Close optimizer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-foreground-muted transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Body ────────────────────────────────────── */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* STATE: INPUT */}
            {isIdle && (
              <motion.div
                key="input-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 flex-col gap-5 p-5 sm:p-6"
              >
                {/* ── Template Picker ─────────────────── */}
                <div className="rounded-xl border border-white/[0.06] bg-[#0D0D0D] p-4">
                  <ResumeTemplatePicker
                    selected={selectedTemplate}
                    onChange={setSelectedTemplate}
                  />
                </div>

                {/* Instruction banner */}
                <div className="flex items-start gap-3 rounded-xl border border-[#00F0FF]/10 bg-[#00F0FF]/[0.04] p-4">
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#00F0FF]/60" />
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    Paste a <span className="font-medium text-foreground">Job Description</span> below.
                    The AI will{" "}
                    {selectedTemplate === "auto"
                      ? "select the best template and"
                      : `use the ${TEMPLATE_REGISTRY[selectedTemplate].label} template and`}{" "}
                    rewrite the resume to mirror the JD&apos;s keywords — using only verified profile data.
                    <span className="mt-1 block font-mono text-[10px] text-[#00F0FF]/50">
                      Tip: Ctrl + Enter to submit
                    </span>
                  </p>
                </div>

                {/* Terminal textarea */}
                <div className="group relative flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0A0A0A] transition-all duration-200 focus-within:border-[#00F0FF]/40 focus-within:shadow-[0_0_0_1px_rgba(0,240,255,0.1),0_0_24px_rgba(0,240,255,0.05)]">
                  <div className="flex items-center gap-1.5 border-b border-white/[0.05] bg-[#0D0D0D] px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                    <span className="ml-2 font-mono text-[10px] tracking-widest text-foreground-subtle">JD_INPUT.txt</span>
                  </div>
                  <div className="flex min-h-[180px] items-start gap-3 p-4">
                    <span className="select-none pt-[3px] font-mono text-xs text-[#00F0FF]/40">{">"}</span>
                    <textarea
                      ref={textareaRef}
                      id="jd-textarea"
                      value={jdText}
                      onChange={(e) => setJdText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Paste the full Job Description here..."
                      className="min-h-[180px] flex-1 resize-none bg-transparent font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-foreground-subtle/50"
                      spellCheck={false}
                    />
                  </div>
                  {jdText.length > 0 && (
                    <div className="border-t border-white/[0.04] px-4 py-2 text-right">
                      <span className="font-mono text-[10px] text-foreground-subtle">
                        {jdText.length.toLocaleString()} chars
                      </span>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  id="generate-tailored-resume"
                  onClick={handleGenerate}
                  disabled={!jdText.trim()}
                  className={`group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl py-3.5 font-mono text-sm font-bold tracking-wide transition-all duration-300
                    ${jdText.trim()
                      ? "border border-[#00F0FF]/50 bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF]/20 hover:shadow-[0_0_32px_rgba(0,240,255,0.2)] active:scale-[0.99]"
                      : "cursor-not-allowed border border-white/10 bg-white/[0.03] text-foreground-subtle"}`}
                >
                  {jdText.trim() && (
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#00F0FF]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  )}
                  <Zap className="h-4 w-4" />
                  [ GENERATE TAILORED RESUME ]
                </button>
              </motion.div>
            )}

            {/* STATE: LOADING */}
            {submitted && isLoading && (
              <motion.div
                key="loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 flex-col items-center justify-center gap-6 p-8"
              >
                {/* Pulsing orb */}
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border border-[#00F0FF]/20 bg-[#00F0FF]/5 flex items-center justify-center">
                    <Cpu className="h-7 w-7 text-[#00F0FF] animate-pulse" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-[#00F0FF]/20 animate-ping opacity-30" />
                </div>

                {/* Status message */}
                <div className="flex flex-col items-center gap-2">
                  <AnimatePresence mode="wait">
                    <StreamingStatus key={statusMessage} message={statusMessage} />
                  </AnimatePresence>
                  <p className="font-mono text-[10px] text-foreground-subtle/50">
                    {selectedTemplate === "auto"
                      ? "AI is analyzing your JD and selecting the best template..."
                      : `Using ${TEMPLATE_REGISTRY[selectedTemplate as TemplateId]?.label ?? selectedTemplate} template...`}
                  </p>
                </div>

                {/* Cancel */}
                <button
                  onClick={handleStop}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground-muted transition-all duration-200 hover:border-white/20 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                  Cancel
                </button>
              </motion.div>
            )}

            {/* STATE: ERROR */}
            {isDoneError && (
              <motion.div
                key="error-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 flex-col items-center justify-center gap-4 p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.06]">
                  <X className="h-6 w-6 text-red-400" />
                </div>
                <div className="text-center">
                  <p className="font-mono text-sm font-semibold text-red-400">Engine Error</p>
                  <p className="mt-1 font-mono text-xs text-foreground-muted">{error}</p>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs text-foreground-muted transition-all duration-200 hover:border-white/20 hover:text-foreground"
                >
                  <RefreshCcw className="h-3.5 w-3.5" />
                  Try Again
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/10 to-transparent" />
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Resume Page
   ═══════════════════════════════════════════════════════════════ */
export default function ResumePage() {
  const { basics, summary, education, technicalSkills, projects, strengths, continuousLearning } =
    FAIZ_RESUME_DATA;

  /* ── Modal state ─────────────────────────────────────────── */
  const [optimizerOpen, setOptimizerOpen] = useState(false);

  /* ── AI Result state ─────────────────────────────────────── */
  const [templateResult, setTemplateResult] = useState<{
    template: TemplateId;
    templateReason: string;
    resumeData: ResumeData;
  } | null>(null);

  /* Active template (user can switch post-generation without re-running) */
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>("agentic");

  const isTailored = !!templateResult;

  /* Reset back to default */
  const handleReset = useCallback(() => {
    setTemplateResult(null);
  }, []);

  /* Handle AI completion — store result, set active template */
  const handleComplete = useCallback((result: {
    template: TemplateId;
    templateReason: string;
    resumeData: ResumeData;
  }) => {
    setTemplateResult(result);
    setActiveTemplate(result.template);
  }, []);

  /* Body scroll lock while modal is open */
  useEffect(() => {
    document.body.style.overflow = optimizerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [optimizerOpen]);

  /* Escape key closes modal */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOptimizerOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handlePrint = () => window.print();

  const skillGroups: { label: string; skills: string[] }[] = [
    { label: "Programming & Data",     skills: technicalSkills.programmingAndData },
    { label: "Databases",              skills: technicalSkills.databases },
    { label: "Frameworks & Libraries", skills: technicalSkills.frameworks },
    { label: "AI / ML",                skills: technicalSkills.aiAndMl },
    { label: "Engineering",            skills: technicalSkills.engineering },
    { label: "Tools & Platforms",      skills: technicalSkills.tools },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-foreground">
      <div className="print:hidden">

      {/* ── Optimizer Modal ───────────────────────────────── */}
      {optimizerOpen && (
        <OptimizerModal
          onClose={() => setOptimizerOpen(false)}
          onComplete={handleComplete}
        />
      )}

      {/* ── Ambient background glow ──────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute right-1/4 top-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full opacity-[0.035] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00F0FF 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full opacity-[0.025] blur-[100px]"
          style={{ background: "radial-gradient(circle, #00F0FF 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Top action bar ───────────────────────────────── */}
      <div className="no-print print:hidden sticky top-20 z-40 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[900px] items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-xs text-foreground-muted transition-colors hover:text-[#00F0FF]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Command Center
          </Link>

          <div className="flex items-center gap-3">
            {/* AI Tailored badge */}
            {isTailored && !optimizerOpen && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider sm:flex"
                style={{
                  borderColor: `${TEMPLATE_REGISTRY[activeTemplate].accentColor}40`,
                  color: TEMPLATE_REGISTRY[activeTemplate].accentColor,
                  background: `${TEMPLATE_REGISTRY[activeTemplate].accentColor}10`,
                }}
              >
                <Sparkles className="h-2.5 w-2.5" />
                {TEMPLATE_REGISTRY[activeTemplate].label} · AI Tailored
              </motion.span>
            )}

            {/* ⚡ AI Optimizer */}
            <button
              id="ai-optimizer-open"
              onClick={() => setOptimizerOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-[#00F0FF]/40 px-4 py-2 font-mono text-xs font-semibold text-[#00F0FF] transition-all duration-200 hover:border-[#00F0FF]/70 hover:bg-[#00F0FF]/10 hover:shadow-[0_0_16px_rgba(0,240,255,0.2)]"
            >
              <Zap className="h-3.5 w-3.5" />
              {isTailored ? "Re-optimise" : "AI Optimizer"}
            </button>

            {/* 📄 Download PDF */}
            <button
              onClick={handlePrint}
              id="resume-download-pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-[#00F0FF] px-4 py-2 font-mono text-xs font-bold text-[#0A0A0A] shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-200 hover:bg-[#33F5FF] hover:shadow-[0_0_28px_rgba(0,240,255,0.5)]"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── Document body ────────────────────────────────── */}
      <main
        id="printable-resume"
        className="mx-auto max-w-[900px] space-y-6 px-4 py-10 sm:px-6 sm:py-14"
      >
        <div className="space-y-6">
          <AnimatePresence mode="wait">

            {/* ══ AI TAILORED VIEW ════════════════════════════════ */}
            {isTailored && templateResult ? (
              <TemplateResultView
                key="template-result"
                template={templateResult.template}
                templateReason={templateResult.templateReason}
                resumeData={templateResult.resumeData}
                activeTemplate={activeTemplate}
                onTemplateSwitch={setActiveTemplate}
                onReset={handleReset}
              />
            ) : (

              /* ══ DEFAULT DIGITAL RESUME ════════════════════════ */
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >

                {/* ── 1. PROFILE HEADER ─────────────────────────── */}
                <GlassCard delay={0.05}>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                    <motion.div
                      {...fadeIn(0.15)}
                      className="relative mx-auto shrink-0 sm:mx-0"
                    >
                      <div className="relative h-24 w-24 rounded-2xl sm:h-28 sm:w-28">
                        <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-[#00F0FF]/50 via-[#00F0FF]/20 to-transparent" />
                        <div className="absolute inset-0 animate-[glow-pulse_4s_ease-in-out_infinite] rounded-2xl" />
                        <Image
                          src={basics.profilePicture}
                          alt={basics.name}
                          fill
                          className="relative rounded-2xl object-cover object-top"
                          priority
                          sizes="(max-width: 640px) 96px, 112px"
                        />
                      </div>
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#171717] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]">
                        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-300 opacity-80" />
                      </span>
                    </motion.div>

                    <div className="flex-1 text-center sm:text-left">
                      <motion.div {...fadeUp(0.1)}>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00F0FF]/60">
                          Professional Profile
                        </span>
                        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                          {basics.name}
                        </h1>
                        <p className="mt-1.5 font-mono text-base font-semibold text-[#00F0FF]">
                          {basics.title}
                        </p>
                      </motion.div>
                      <motion.div {...fadeUp(0.18)} className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                        {[
                          { icon: Mail,      label: basics.email,    href: `mailto:${basics.email}` },
                          { icon: Link2,     label: "LinkedIn",      href: `https://${basics.linkedin}` },
                          { icon: GitBranch, label: "GitHub",        href: `https://${basics.github}` },
                          { icon: MapPin,    label: basics.location, href: null },
                        ].map(({ icon: Icon, label, href }) => (
                          <span key={label} className="flex items-center">
                            {href ? (
                              <a
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noreferrer"
                                className="group inline-flex items-center gap-1.5 font-mono text-xs text-foreground-muted transition-colors hover:text-[#00F0FF]"
                              >
                                <Icon className="h-3.5 w-3.5 shrink-0 text-[#00F0FF]/50 transition-colors group-hover:text-[#00F0FF]" />
                                {label}
                              </a>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-foreground-muted">
                                <Icon className="h-3.5 w-3.5 shrink-0 text-[#00F0FF]/50" />
                                {label}
                              </span>
                            )}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </GlassCard>

                {/* ── 2. PROFESSIONAL SUMMARY ───────────────────── */}
                <GlassCard delay={0.1}>
                  <SectionHeading label="// Overview" title="Professional Summary" />
                  <p className="text-sm leading-[1.9] text-foreground-muted">{summary}</p>
                </GlassCard>

                {/* ── 3. EDUCATION ──────────────────────────────── */}
                <GlassCard delay={0.15}>
                  <SectionHeading label="// Academic Foundation" title="Education" />
                  <div className="space-y-5">
                    {education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="relative flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-[#1E1E1E] p-5 sm:flex-row sm:items-start sm:justify-between"
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#00F0FF]/20 bg-[#00F0FF]/8">
                            <GraduationCap className="h-5 w-5 text-[#00F0FF]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                            <p className="mt-0.5 text-sm text-foreground-muted">{edu.institution}</p>
                            {edu.detail && (
                              <p className="mt-2 text-xs leading-relaxed text-foreground-subtle">{edu.detail}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                          <span className="font-mono text-xs text-foreground-subtle">{edu.year}</span>
                          <span className="rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-[#00F0FF]">
                            {edu.gpa}
                          </span>
                          {edu.honors && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-amber-400">
                              <Star className="h-2.5 w-2.5 fill-amber-400" />
                              {edu.honors}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* ── 4. TECHNICAL SKILLS ───────────────────────── */}
                <GlassCard delay={0.2}>
                  <SectionHeading label="// Capabilities" title="Technical Skills" />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {skillGroups.map((group) => (
                      <div key={group.label}>
                        <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00F0FF]/70">
                          {group.label}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <SkillPill key={skill} label={skill} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* ── 5. PROJECTS ───────────────────────────────── */}
                <GlassCard delay={0.25}>
                  <SectionHeading label="// Core Projects" title="Selected Work" />
                  <div className="space-y-4">
                    {projects.map((proj, idx) => (
                      <motion.div
                        key={proj.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + idx * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
                        className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#1E1E1E] p-5 transition-all duration-300 hover:border-[#00F0FF]/25 hover:bg-[#1E1E1E]/80 hover:shadow-[0_0_24px_rgba(0,240,255,0.06)]"
                      >
                        <div className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] transition-transform duration-300 group-hover:scale-y-100" />
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#00F0FF]/50">
                                [{String(idx + 1).padStart(2, "0")}]
                              </span>
                              <h3 className="font-semibold text-foreground transition-colors duration-200 group-hover:text-[#00F0FF]">
                                {proj.title}
                              </h3>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{proj.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {proj.tags.map((tag) => <SkillPill key={tag} label={tag} />)}
                            </div>
                          </div>
                          {proj.githubLink && (
                            <a
                              href={proj.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-4 mt-1 flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-foreground-subtle transition-all duration-200 hover:border-[#00F0FF]/40 hover:text-[#00F0FF]"
                            >
                              <GitBranch className="h-3.5 w-3.5" />
                              Code
                              <ExternalLink className="h-2.5 w-2.5 opacity-50" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>

                {/* ── 6. STRENGTHS & LEARNING ───────────────────── */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <GlassCard delay={0.3}>
                    <SectionHeading label="// Core Traits" title="Strengths" />
                    <ul className="space-y-3">
                      {strengths.map((s) => (
                        <li key={s.trait} className="flex items-start gap-3">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                          <div>
                            <span className="text-sm font-semibold text-foreground">{s.trait}</span>
                            <p className="mt-0.5 text-xs leading-relaxed text-foreground-subtle">{s.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>

                  <GlassCard delay={0.35}>
                    <SectionHeading label="// Growth Vector" title="Continuous Learning" />
                    <ul className="space-y-3">
                      {continuousLearning.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F0FF]/50" />
                          <p className="text-sm leading-relaxed text-foreground-muted">{item}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-white/[0.06] pt-4">
                      <p className="font-mono text-[10px] text-foreground-subtle">
                        <span className="text-[#00F0FF]/60">&gt;</span>{" "}
                        learning_mode: <span className="text-emerald-400">ACTIVE</span>{" "}
                        <span className="inline-block h-2 w-px animate-[cursor-blink_1.06s_step-end_infinite] bg-emerald-400 align-middle" />
                      </p>
                    </div>
                  </GlassCard>
                </div>

                {/* Footer watermark */}
                <motion.div {...fadeIn(0.5)} className="pb-4 text-center">
                  <p className="font-mono text-[10px] text-foreground-subtle">
                    <span className="text-[#00F0FF]/40">// </span>
                    {basics.name} · {basics.title}
                    <span className="text-[#00F0FF]/40"> //</span>
                  </p>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      </div>

      {/* ── Print-only layout ────────────────────────────────── */}
      <div id="print-layout-root" className="hidden print:block bg-white text-black p-0 m-0">
        {isTailored && templateResult ? (
          /* Use the active template component for print */
          (() => {
            const PrintTemplate = TEMPLATE_REGISTRY[activeTemplate].component;
            return <PrintTemplate data={templateResult.resumeData} />;
          })()
        ) : (
          /* Default print layout */
          <>
            <header className="print:flex print:flex-col print:items-center print:text-center print:mb-6 print:border-b-2 print:border-gray-800 print:pb-4">
              <h1 className="print:text-3xl print:font-extrabold print:uppercase print:tracking-wide print:mb-1 print:text-black">
                {FAIZ_RESUME_DATA.basics.name}
              </h1>
              <h2 className="print:text-lg print:font-semibold print:text-gray-700 print:mb-2">
                {FAIZ_RESUME_DATA.basics.title}
              </h2>
              <p className="print:text-sm print:text-gray-600">
                {FAIZ_RESUME_DATA.basics.email} • {FAIZ_RESUME_DATA.basics.linkedin} • {FAIZ_RESUME_DATA.basics.github} • {FAIZ_RESUME_DATA.basics.location}
              </p>
            </header>

            <div className="mb-4">
              <h2 className="print:text-base print:font-bold print:uppercase print:tracking-widest print:text-gray-900 print:border-b-2 print:border-gray-800 print:pb-1 print:mt-6 print:mb-3">Professional Summary</h2>
              <p className="leading-relaxed text-justify m-0">{summary}</p>
            </div>

            <div className="mb-4">
              <h2 className="print:text-base print:font-bold print:uppercase print:tracking-widest print:text-gray-900 print:border-b-2 print:border-gray-800 print:pb-1 print:mt-6 print:mb-3">Technical Skills</h2>
              <div className="space-y-1">
                {skillGroups.map((group) => (
                  <p key={group.label} className="m-0 print:mb-1.5">
                    <strong className="print:font-bold text-black">{group.label}:</strong> {group.skills.join(", ")}
                  </p>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="print:text-base print:font-bold print:uppercase print:tracking-widest print:text-gray-900 print:border-b-2 print:border-gray-800 print:pb-1 print:mt-6 print:mb-3">Education</h2>
              <ul className="list-none p-0 m-0 space-y-2">
                {education.map((edu, idx) => (
                  <li key={idx} className="m-0">
                    <div className="print:flex print:justify-between print:font-bold">
                      <span>{edu.degree} - {edu.institution}</span>
                      <span>{edu.year}</span>
                    </div>
                    <div className="text-gray-700 mt-0.5">
                      <span>{edu.gpa}</span>
                      {edu.honors && <span className="ml-2 font-semibold text-amber-700">({edu.honors})</span>}
                    </div>
                    {edu.detail && <p className="text-gray-600 mt-1 m-0">{edu.detail}</p>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="print:text-base print:font-bold print:uppercase print:tracking-widest print:text-gray-900 print:border-b-2 print:border-gray-800 print:pb-1 print:mt-6 print:mb-3">Selected Work</h2>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={idx} className="print:break-inside-avoid">
                    <div className="print:flex print:justify-between print:items-baseline print:mb-1">
                      <h3 className="print:font-bold print:text-gray-900">{proj.title}</h3>
                      {proj.githubLink && (
                        <span className="print:text-xs print:text-gray-500">{proj.githubLink.replace("https://", "")}</span>
                      )}
                    </div>
                    <p className="text-gray-700 m-0 mt-0.5">{proj.description}</p>
                    <p className="text-gray-500 m-0 mt-0.5">
                      <strong>Technologies:</strong> {proj.tags.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
