"use client";

/**
 * VibeEditBar
 *
 * Terminal-style resume editing interface.
 * Accepts natural language "vibe instructions" → streams them to /api/resume/edit
 * → calls store.applyPatch() on success.
 *
 * States: idle → loading (streaming status) → success (flash) / error
 * Features: example chips, edit history log, undo button, field badges
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, RotateCcw, X, ChevronRight, Sparkles,
  Terminal, Clock, CheckCircle2, AlertCircle,
  RefreshCcw, History, Trash2,
} from "lucide-react";
import { useResumeStore, type EditLogEntry } from "@/store/useResumeStore";
import type { ResumeData } from "@/components/resume-templates/index";

/* ─── Types from the edit API ──────────────────────────────────────────────── */
type EditChunk =
  | { type: "status"; message: string }
  | { type: "patch"; data: Partial<ResumeData>; patchedFields: string[] }
  | { type: "error"; message: string };

/* ─── Example vibe chips ───────────────────────────────────────────────────── */
const EXAMPLE_VIBES = [
  { label: "More ambitious tone", prompt: "Rewrite the summary with a more ambitious and assertive tone" },
  { label: "Highlight AI/ML first", prompt: "Put AI and machine learning skills first in the skills section" },
  { label: "Strongest projects first", prompt: "Reorder projects to put the most impressive and unique ones first" },
  { label: "More concise descriptions", prompt: "Make all project descriptions shorter and more impactful — max 2 sentences each" },
  { label: "Leadership focus", prompt: "Update the summary and strengths to emphasize leadership and ownership mindset" },
  { label: "Remove strengths", prompt: "Remove the strengths section" },
  { label: "Sharpen summary", prompt: "Rewrite the professional summary to be sharper and more focused on AI engineering" },
];

/* ─── Field badge colour map ───────────────────────────────────────────────── */
const FIELD_COLOURS: Record<string, string> = {
  summary:            "#00F0FF",
  projects:           "#a78bfa",
  technicalSkills:    "#34d399",
  strengths:          "#f59e0b",
  education:          "#60a5fa",
  continuousLearning: "#f472b6",
};
function fieldColour(f: string) { return FIELD_COLOURS[f] ?? "#9ca3af"; }

/* ─── Edit History Row ──────────────────────────────────────────────────────── */
function EditHistoryItem({
  entry,
  isUndoable,
  onUndo,
}: { entry: EditLogEntry; isUndoable: boolean; onUndo: () => void }) {
  return (
    <div className="flex items-start gap-2.5 py-2 border-b border-white/[0.04] last:border-0">
      <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0 text-emerald-400/70" />
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[11px] text-white/60 truncate" title={entry.instruction}>
          {entry.instruction}
        </p>
        <div className="mt-1 flex flex-wrap gap-1">
          {entry.patchedFields.map((f) => (
            <span
              key={f}
              className="rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-semibold"
              style={{ background: `${fieldColour(f)}18`, color: fieldColour(f) }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
      {isUndoable && (
        <button
          onClick={onUndo}
          title="Undo this operation"
          className="shrink-0 flex items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-1.5 py-1 font-mono text-[9px] text-white/35 transition-all hover:border-amber-400/30 hover:text-amber-400"
        >
          <RotateCcw className="h-2.5 w-2.5" />
          undo
        </button>
      )}
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */
export function VibeEditBar() {
  const resumeData  = useResumeStore((s) => s.resumeData);
  const editLog     = useResumeStore((s) => s.editLog);
  const applyPatch  = useResumeStore((s) => s.applyPatch);
  const undo        = useResumeStore((s) => s.undo);
  const resumeHistory = useResumeStore((s) => s.resumeHistory);

  const [instruction, setInstruction]     = useState("");
  const [isLoading, setIsLoading]         = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [lastPatched, setLastPatched]     = useState<string[]>([]);
  const [successFlash, setSuccessFlash]   = useState(false);
  const [errorMsg, setErrorMsg]           = useState<string | null>(null);
  const [showHistory, setShowHistory]     = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* Auto-focus on mount */
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = useCallback(async (prompt?: string) => {
    const text = (prompt ?? instruction).trim();
    if (!text || !resumeData || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);
    setLastPatched([]);
    setStatusMessage("Connecting to Vibe Engine...");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/resume/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentResumeJson: resumeData,
          userInstruction:   text,
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`API error: ${response.status}`);
      }

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

          let chunk: EditChunk;
          try { chunk = JSON.parse(trimmed) as EditChunk; }
          catch { continue; }

          if (chunk.type === "status") {
            setStatusMessage(chunk.message);
          } else if (chunk.type === "patch") {
            applyPatch(chunk.data, text, chunk.patchedFields);
            setLastPatched(chunk.patchedFields);
            setSuccessFlash(true);
            setInstruction("");
            setTimeout(() => setSuccessFlash(false), 2000);
          } else if (chunk.type === "error") {
            setErrorMsg(chunk.message);
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setErrorMsg(err instanceof Error ? err.message : "Unknown error. Try again.");
      }
    } finally {
      setIsLoading(false);
      setStatusMessage("");
    }
  }, [instruction, resumeData, isLoading, applyPatch]);

  const handleStop = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
    setStatusMessage("");
  }, []);

  const canUndo = resumeHistory.length > 0;

  if (!resumeData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      className="mt-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0D0D0D] shadow-[0_4px_32px_rgba(0,0,0,0.5)] print:hidden"
    >
      {/* ── Top glow line ────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-white/[0.05] bg-[#0A0A0A] px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#00F0FF]/20 bg-[#00F0FF]/8">
            <Zap className={`h-3.5 w-3.5 text-[#00F0FF] ${isLoading ? "animate-pulse" : ""}`} />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00F0FF]/60">
              Vibe Editor
            </span>
            <div className="flex items-center gap-2">
              <p className="font-mono text-[12px] font-bold text-white/80">
                [ RESUME CRUD ENGINE ]
              </p>
              {isLoading && (
                <span className="font-mono text-[10px] text-[#00F0FF] animate-pulse">
                  processing<span className="animate-[cursor-blink_0.8s_step-end_infinite]">▮</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Success flash badge */}
          <AnimatePresence>
            {successFlash && lastPatched.length > 0 && (
              <motion.div
                key="success-badge"
                initial={{ opacity: 0, scale: 0.85, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1"
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                <span className="font-mono text-[10px] font-semibold text-emerald-400">
                  Updated: {lastPatched.join(", ")}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* History toggle */}
          {editLog.length > 0 && (
            <button
              onClick={() => setShowHistory((v) => !v)}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] transition-all duration-200
                ${showHistory
                  ? "border-[#00F0FF]/30 bg-[#00F0FF]/8 text-[#00F0FF]"
                  : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white/60"}`}
            >
              <History className="h-3 w-3" />
              {editLog.length} ops
            </button>
          )}

          {/* Undo */}
          <button
            onClick={undo}
            disabled={!canUndo}
            title={canUndo ? "Undo last operation" : "Nothing to undo"}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] transition-all duration-200
              ${canUndo
                ? "border-amber-400/25 bg-amber-400/[0.06] text-amber-400/80 hover:border-amber-400/50 hover:text-amber-400"
                : "cursor-not-allowed border-white/[0.06] text-white/20"}`}
          >
            <RotateCcw className="h-3 w-3" />
            Undo
          </button>
        </div>
      </div>

      {/* ── Edit History Panel (collapsible) ─────────────── */}
      <AnimatePresence>
        {showHistory && editLog.length > 0 && (
          <motion.div
            key="history-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="overflow-hidden border-b border-white/[0.05]"
          >
            <div className="px-5 py-3 bg-[#0A0A0A]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 flex items-center gap-1.5">
                  <Clock className="h-2.5 w-2.5" />
                  Edit History (newest first)
                </span>
                {canUndo && (
                  <button
                    onClick={undo}
                    className="font-mono text-[9px] text-amber-400/60 hover:text-amber-400 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="h-2.5 w-2.5" />
                    undo last
                  </button>
                )}
              </div>
              <div className="max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                {editLog.map((entry, i) => (
                  <EditHistoryItem
                    key={entry.id}
                    entry={entry}
                    isUndoable={i === 0 && canUndo}
                    onUndo={undo}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Terminal Input Area ───────────────────────────── */}
      <div className="px-5 py-4">

        {/* Status / Error row */}
        <AnimatePresence mode="wait">
          {isLoading && statusMessage && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-3 flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_6px_#00F0FF]" />
              <span className="font-mono text-[11px] text-foreground-muted">{statusMessage}</span>
              <span className="font-mono text-[10px] animate-[cursor-blink_0.8s_step-end_infinite] text-[#00F0FF]/60">▮</span>
            </motion.div>
          )}

          {!isLoading && errorMsg && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-3 flex items-start justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-red-400" />
                <p className="font-mono text-[11px] text-red-400/80">{errorMsg}</p>
              </div>
              <button
                onClick={() => setErrorMsg(null)}
                className="shrink-0 text-white/30 hover:text-white/60 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main input row */}
        <div
          className={`group relative flex items-center gap-3 rounded-xl border transition-all duration-200
            ${isLoading
              ? "border-[#00F0FF]/25 shadow-[0_0_16px_rgba(0,240,255,0.06)]"
              : successFlash
              ? "border-emerald-400/30 shadow-[0_0_16px_rgba(52,211,153,0.08)]"
              : "border-white/[0.07] focus-within:border-[#00F0FF]/35 focus-within:shadow-[0_0_20px_rgba(0,240,255,0.07)]"}`}
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          {/* Terminal prompt symbol */}
          <div className="flex items-center gap-2 pl-4 shrink-0">
            <Terminal className="h-3.5 w-3.5 text-[#00F0FF]/40" />
            <span className="font-mono text-sm text-[#00F0FF]/60 select-none">{">"}</span>
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            id="vibe-instruction-input"
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) handleSubmit();
              if (e.key === "Escape") handleStop();
            }}
            disabled={isLoading}
            placeholder={isLoading ? "Processing..." : "Type your vibe instruction... (e.g. 'make summary more ambitious')"}
            className="flex-1 bg-transparent py-3.5 font-mono text-[13px] text-foreground placeholder:text-white/20 outline-none disabled:opacity-50"
            spellCheck={false}
            autoComplete="off"
          />

          {/* Action buttons */}
          <div className="flex items-center gap-2 pr-3">
            {isLoading ? (
              <button
                onClick={handleStop}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] text-white/40 transition-all hover:border-white/20 hover:text-white/70"
              >
                <X className="h-3 w-3" />
                Cancel
              </button>
            ) : (
              <button
                onClick={() => handleSubmit()}
                disabled={!instruction.trim()}
                id="vibe-apply-btn"
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] font-semibold transition-all duration-200
                  ${instruction.trim()
                    ? "border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF] hover:border-[#00F0FF]/70 hover:bg-[#00F0FF]/20 hover:shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                    : "cursor-not-allowed border border-white/[0.06] text-white/20"}`}
              >
                <Zap className="h-3 w-3" />
                Apply
              </button>
            )}
          </div>
        </div>

        {/* ── Example Vibe Chips ────────────────────────── */}
        <div className="mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-2.5 w-2.5 text-white/20" />
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">
              Example vibes
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_VIBES.map((v) => (
              <button
                key={v.label}
                onClick={() => {
                  setInstruction(v.prompt);
                  inputRef.current?.focus();
                }}
                disabled={isLoading}
                className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-white/35 transition-all duration-200 hover:border-[#00F0FF]/25 hover:bg-[#00F0FF]/[0.04] hover:text-[#00F0FF]/70 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-2.5 w-2.5 shrink-0" />
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CRUD Operation Legend ─────────────────────── */}
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          {[
            { op: "CREATE/UPDATE", colour: "#00F0FF", tip: "\"add more impact to projects\"" },
            { op: "REORDER",       colour: "#a78bfa", tip: "\"strongest projects first\"" },
            { op: "DELETE",        colour: "#f87171", tip: "\"remove strengths section\"" },
            { op: "TONE",          colour: "#34d399", tip: "\"more ambitious language\"" },
          ].map(({ op, colour, tip }) => (
            <div key={op} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: colour, boxShadow: `0 0 4px ${colour}60` }} />
              <span className="font-mono text-[9px] font-bold" style={{ color: colour }}>{op}</span>
              <span className="font-mono text-[9px] text-white/20">{tip}</span>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom glow ──────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00F0FF]/10 to-transparent" />
    </motion.div>
  );
}
