"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   OpenClaw Terminal — Personal AI Employee Showcase
   A premium embedded developer terminal console for the
   OpenClaw orchestration engine. Features a mock shell
   header, toggle between System Spec / Agent Logs, and
   live architecture description.
   ═══════════════════════════════════════════════════════════ */

type TabKey = "spec" | "logs";

/* ── System Spec Data ─────────────────────────────────────── */
const systemSpec = [
  { key: "Machine", value: "HP ZBook 15v G5" },
  { key: "Memory", value: "16 GB DDR4" },
  { key: "Execution", value: "Local-first (no cloud dependency)" },
  { key: "Primary LLM", value: "Qwen 2.5 7B via Ollama" },
  { key: "Fallback", value: "Qwen 2.5 3B → Phi-3 Mini" },
  { key: "Runtime", value: "Python 3.11 + AgentScope" },
  { key: "Vector Store", value: "FAISS (local embeddings)" },
  { key: "Status", value: "● Active — all systems nominal" },
];

/* ── Agent Log Entries ────────────────────────────────────── */
const agentLogs = [
  {
    time: "17:42:01",
    level: "INFO",
    agent: "orchestrator",
    msg: "Task pipeline initialized — 3 agents queued",
  },
  {
    time: "17:42:03",
    level: "INFO",
    agent: "model-router",
    msg: "Qwen-7B loaded (4.2GB VRAM) — primary inference ready",
  },
  {
    time: "17:42:05",
    level: "WARN",
    agent: "model-router",
    msg: "VRAM pressure detected — initiating fallback to Qwen-3B",
  },
  {
    time: "17:42:06",
    level: "INFO",
    agent: "model-router",
    msg: "Fallback complete — Qwen-3B active (1.8GB VRAM)",
  },
  {
    time: "17:42:08",
    level: "INFO",
    agent: "research-agent",
    msg: 'Executing task: "Analyze competitor pricing models"',
  },
  {
    time: "17:42:12",
    level: "INFO",
    agent: "writer-agent",
    msg: "Drafting report — context: 2,847 tokens retrieved from RAG",
  },
  {
    time: "17:42:18",
    level: "OK",
    agent: "orchestrator",
    msg: "Pipeline complete — 3/3 tasks resolved (avg 3.2s/task)",
  },
];

const levelColors: Record<string, string> = {
  INFO: "text-accent",
  WARN: "text-amber-400",
  OK: "text-emerald-400",
  ERROR: "text-red-400",
};

/* ── Main Component ───────────────────────────────────────── */
export default function OpenClawTerminal() {
  const [activeTab, setActiveTab] = useState<TabKey>("spec");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "spec", label: "System Spec" },
    { key: "logs", label: "Agent Logs" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
      className="group relative mb-8 overflow-hidden rounded-2xl border border-border transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_80px_rgba(0,240,255,0.06)]"
    >
      {/* ── Subtle glow backdrop ───────────────────────────── */}
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.03) 0%, transparent 50%)",
        }}
      />

      {/* ── Terminal Window Chrome ─────────────────────────── */}
      <div className="relative z-10">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-border bg-[#111111] px-4 py-2.5 sm:px-6">
          {/* Traffic lights */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <span className="font-mono text-[11px] text-foreground-subtle">
              openclaw — bash — 120×40
            </span>
          </div>

          {/* Right badges */}
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-emerald-400 sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Online
            </span>
            <span className="rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">
              ★ Personal AI Employee
            </span>
          </div>
        </div>

        {/* ── Shell Prompt + Command ───────────────────────── */}
        <div className="border-b border-border/50 bg-[#0F0F0F] px-4 py-3 sm:px-6">
          <div className="font-mono text-xs leading-relaxed sm:text-sm">
            <span className="text-emerald-400">faiz@FAIZ-UR-REHMAN</span>
            <span className="text-foreground-subtle">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-foreground-subtle">$</span>
            <span className="ml-2 text-foreground">openclaw status</span>
            <span className="ml-0.5 inline-block h-4 w-2 animate-cursor-blink bg-accent align-middle" />
          </div>
        </div>

        {/* ── Main Content Area ────────────────────────────── */}
        <div className="relative grid grid-cols-1 gap-0 lg:grid-cols-5">
          {/* ── Left Panel: Description (3 cols) ───────────── */}
          <div className="border-b border-border/50 p-6 sm:p-8 lg:col-span-3 lg:border-b-0 lg:border-r">
            {/* OpenClaw identity */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="terminal-tag">Autonomous Engine</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                  Deployed
                </span>
              </div>
            </div>

            <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="text-accent">Open</span>Claw
            </h3>
            <p className="mt-1.5 font-mono text-xs tracking-wide text-accent/60 sm:text-sm">
              Personal Orchestration Terminal
            </p>

            {/* Architecture description */}
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-foreground-muted sm:text-base">
              <p>
                An autonomous workflow engine built for{" "}
                <span className="font-medium text-foreground">
                  local-first execution
                </span>
                . OpenClaw orchestrates tasks through locally hosted models via{" "}
                <span className="font-mono text-xs text-accent">Ollama</span> —
                primarily{" "}
                <span className="font-mono text-xs text-accent">
                  Qwen 2.5 7B
                </span>{" "}
                for deep reasoning, with intelligent multi-model fallbacks to
                lightweight nodes when resources are constrained.
              </p>
              <p>
                The engine monitors VRAM pressure in real-time, gracefully
                cascading from{" "}
                <span className="font-medium text-foreground">
                  heavyweight → mid-range → lightweight
                </span>{" "}
                models without breaking task continuity. Every cognitive cycle
                runs on local hardware — no cloud dependencies, no API costs,
                full autonomy.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {[
                "Ollama",
                "Qwen 2.5",
                "AgentScope",
                "LangGraph",
                "FAISS",
                "Python",
                "FastAPI",
                "Local LLMs",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[10px] text-foreground-subtle transition-colors duration-150 group-hover:border-border-hover sm:text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right Panel: Interactive Toggle (2 cols) ───── */}
          <div className="flex flex-col lg:col-span-2">
            {/* Tab switcher */}
            <div className="flex border-b border-border/50 bg-[#0F0F0F]">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex-1 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 sm:text-xs ${
                    activeTab === tab.key
                      ? "text-accent"
                      : "text-foreground-subtle hover:text-foreground-muted"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="openclaw-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-hidden p-5 sm:p-6">
              <AnimatePresence mode="wait">
                {activeTab === "spec" ? (
                  <motion.div
                    key="spec"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-0"
                  >
                    {/* Table header */}
                    <div className="mb-2 flex items-center gap-2 border-b border-border/40 pb-2">
                      <svg
                        className="h-3.5 w-3.5 text-foreground-subtle"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-subtle">
                        Hardware Profile
                      </span>
                    </div>

                    {systemSpec.map((row, i) => (
                      <div
                        key={row.key}
                        className={`flex items-baseline justify-between py-1.5 ${
                          i < systemSpec.length - 1
                            ? "border-b border-border/20"
                            : ""
                        }`}
                      >
                        <span className="font-mono text-[10px] text-foreground-subtle sm:text-xs">
                          {row.key}
                        </span>
                        <span
                          className={`text-right font-mono text-[10px] sm:text-xs ${
                            row.key === "Status"
                              ? "text-emerald-400"
                              : "text-foreground-muted"
                          }`}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="logs"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-0"
                  >
                    {/* Log header */}
                    <div className="mb-2 flex items-center gap-2 border-b border-border/40 pb-2">
                      <svg
                        className="h-3.5 w-3.5 text-foreground-subtle"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-subtle">
                        Live Agent Output
                      </span>
                    </div>

                    {agentLogs.map((log, i) => (
                      <div
                        key={i}
                        className="border-b border-border/10 py-1.5 font-mono text-[10px] leading-relaxed sm:text-[11px]"
                      >
                        <span className="text-foreground-subtle">
                          [{log.time}]
                        </span>{" "}
                        <span
                          className={`font-semibold ${
                            levelColors[log.level] || "text-foreground-subtle"
                          }`}
                        >
                          {log.level.padEnd(4)}
                        </span>{" "}
                        <span className="text-blue-400">{log.agent}</span>
                        <span className="text-foreground-subtle"> → </span>
                        <span className="text-foreground-muted">{log.msg}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Panel footer */}
            <div className="flex items-center justify-between border-t border-border/50 px-5 py-3 sm:px-6">
              <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-subtle">
                openclaw-v0.4
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                <span className="font-mono text-[9px] text-foreground-subtle">
                  Local Execution
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
