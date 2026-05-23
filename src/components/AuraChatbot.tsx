"use client";

import { useState, useRef, useEffect, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";

/* ═══════════════════════════════════════════════════════════
   Aura Chatbot — Persistent Floating Neural Assistant
   Glassmorphic terminal window, minimalist UI.
   ═══════════════════════════════════════════════════════════ */

// A defensive helper to extract text from the Vercel AI SDK message
// Since versions can rename 'content' to 'parts' or 'text'.
const extractText = (msg: any): string => {
  if (typeof msg.content === "string") return msg.content;
  if (typeof msg.text === "string") return msg.text;
  if (Array.isArray(msg.parts)) {
    return msg.parts.map((p: any) => p.text || p.content || "").join("");
  }
  return "";
};

export default function AuraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [lastScrolledId, setLastScrolledId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // useChat from @ai-sdk/react abstracts the Chat object.
  // In this SDK version, UI form state is decoupled.
  const [input, setInput] = useState("");
  const { messages, status, sendMessage } = useChat({
    // @ts-ignore: initialMessages not recognized in this AI SDK version
    initialMessages: [
      {
        id: "init",
        role: "assistant",
        content: "System initialized. Aura Neural Assistant online. How can I help you?",
        parts: [{ type: "text", text: "System initialized. Aura Neural Assistant online. How can I help you?" }]
      },
    ],
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    // @ts-ignore: type mismatch in this experimental SDK version
    sendMessage({ role: "user", content: input });
    setInput("");
  };

  const handleQuickAction = (action: string) => {
    if (isLoading) return;
    // @ts-ignore: type mismatch in this experimental SDK version
    sendMessage({ role: "user", content: action });
  };

  /* ── Greeting timer ───────────────────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) setShowGreeting(false);
  }, [isOpen]);

  /* ── Auto-scroll + Scroll-Sync ────────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    if (messages.length > 0 && !isLoading) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "assistant" && lastMsg.id !== lastScrolledId) {
        const content = extractText(lastMsg).toLowerCase();
        let targetId = "";

        if (
          content.includes("the lab") ||
          content.includes("openclaw") ||
          content.includes("sai command center") ||
          content.includes("snapreply")
        ) {
          targetId = "lab";
        } else if (
          content.includes("ecosystem") ||
          content.includes("tech stack") ||
          content.includes("youtube") ||
          content.includes("broadcasts")
        ) {
          targetId = "ecosystem";
        } else if (
          content.includes("optimizer") ||
          content.includes("resume") ||
          content.includes("cv") ||
          content.includes("job description")
        ) {
          targetId = "optimizer";
        } else if (
          content.includes("faiz") ||
          content.includes("agentic") ||
          content.includes("hero")
        ) {
          targetId = "hero";
        }

        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setLastScrolledId(lastMsg.id);
          }
        }
      }
    }
  }, [messages, isLoading, lastScrolledId]);

  const systemStatus = isLoading ? "Processing..." : isOpen ? "Online" : "Deep Sleep";

  const QUICK_ACTIONS = [
    "Generate Tailored Resume",
    "What is OpenClaw?",
    "Show me SAI Command Center",
    "Faiz's Tech Stack",
    "How to reach Faiz?",
  ];

  /* ── Markdown link renderer ───────────────────────────────── */
  const renderMessageContent = (content: string): (string | JSX.Element)[] | string => {
    if (!content) return "";
    const linkRegex = /\[([^\]]+)\]\((#[^)]+)\)/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      parts.push(
        <a
          key={`link-${match.index}`}
          href={match[2]}
          onClick={() => setIsOpen(false)}
          className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors font-bold"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }
    return parts.length > 0 ? parts : content;
  };

  /* ── Streaming cursor indicator ───────────────────────────── */
  const isLastMessageStreaming =
    isLoading &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "assistant";

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      <AnimatePresence>
        {!isOpen ? (
          /* ── Minimized State: Glowing Icon & Greeting ──────── */
          <div key="minimized" className="relative flex flex-col items-end gap-3">
            <AnimatePresence>
              {showGreeting && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="relative max-w-[250px] rounded-2xl rounded-br-sm border border-accent/40 bg-[#171717]/90 p-4 text-xs leading-relaxed text-foreground-muted shadow-[0_0_20px_rgba(0,240,255,0.15)] backdrop-blur-md"
                >
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-accent">
                    Aura System Initialized
                  </span>
                  I am Aura. How can I assist your exploration of Faiz&apos;s work?
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }}
                    className="absolute right-2 top-2 text-foreground-subtle hover:text-accent"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-[#171717]/90 shadow-[0_0_20px_rgba(0,240,255,0.4)] backdrop-blur-md"
            >
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-75" />
              <svg
                className="relative z-10 h-6 w-6 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.button>
          </div>
        ) : (
          /* ── Expanded State: Terminal Window ──────────────── */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="flex h-[450px] w-80 flex-col overflow-hidden rounded-[12px] border border-accent/40 shadow-[0_0_40px_rgba(0,240,255,0.15)] backdrop-blur-xl sm:w-96"
            style={{ backgroundColor: "rgba(23, 23, 23, 0.8)" }}
          >
            <div className="flex items-center justify-between border-b border-accent/20 bg-[#171717]/50 px-4 py-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-semibold tracking-widest text-accent">
                    AURA // Neural Assistant
                  </span>
                </div>
                <div className="flex items-center gap-1.5 pl-4">
                  <span className="text-[10px] uppercase tracking-widest text-foreground-subtle">Status:</span>
                  <span className={`text-[10px] uppercase tracking-widest ${isLoading ? "text-yellow-400" : "text-accent"}`}>
                    {systemStatus}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground-subtle transition-colors hover:text-accent"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
              {messages.map((msg: any) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[8px] border px-3 py-2 leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "border-accent/30 bg-accent/10 text-accent"
                        : "border-border bg-background-tertiary/50 text-foreground-muted"
                    }`}
                  >
                    {msg.role !== "user" && (
                      <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-foreground-subtle">
                        Aura System
                      </span>
                    )}
                    <span>
                      {msg.role === "user"
                        ? extractText(msg)
                        : renderMessageContent(extractText(msg))}
                    </span>
                    {isLastMessageStreaming && msg.id === messages[messages.length - 1].id && (
                      <span className="ml-px inline-block w-[6px] h-[12px] translate-y-[1px] animate-cursor-blink bg-accent/70 align-middle" />
                    )}
                  </div>
                </div>
              ))}

              {isLoading &&
                messages.length > 0 &&
                messages[messages.length - 1].role === "user" && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-[8px] border border-border bg-background-tertiary/50 px-3 py-2 text-foreground-muted">
                      <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-foreground-subtle">
                        Aura System
                      </span>
                      <span className="flex items-center gap-1.5">
                        System Processing
                        <span className="flex items-center gap-0.5">
                          <span className="h-1 w-1 animate-bounce rounded-full bg-accent" style={{ animationDelay: "0ms" }} />
                          <span className="h-1 w-1 animate-bounce rounded-full bg-accent" style={{ animationDelay: "150ms" }} />
                          <span className="h-1 w-1 animate-bounce rounded-full bg-accent" style={{ animationDelay: "300ms" }} />
                        </span>
                      </span>
                    </div>
                  </div>
                )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-accent/20 bg-[#171717]/80 flex flex-col">
              <div className="flex flex-wrap gap-2 p-3 pb-0">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    disabled={isLoading}
                    className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] text-accent transition-colors hover:bg-accent/20 disabled:opacity-50"
                  >
                    {action}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="p-3">
                <div className="relative flex items-center">
                  <span className="absolute left-3 font-bold text-accent">{">"}</span>
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter command..."
                    disabled={isLoading}
                    className="w-full bg-transparent py-2 pl-8 pr-4 text-xs font-medium text-foreground placeholder-foreground-subtle focus:outline-none disabled:opacity-50 sm:text-sm"
                    autoFocus
                  />
                  <span
                    className={`absolute right-4 text-accent/50 ${
                      input.length > 0 ? "hidden" : "animate-pulse"
                    }`}
                  >
                    _
                  </span>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
