"use client";

import { useState, useRef, useEffect, useCallback, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";

/* ═══════════════════════════════════════════════════════════
   Aura Chatbot — Persistent Floating Neural Assistant
   ═══════════════════════════════════════════════════════════ */

const extractText = (msg: any): string => {
  if (typeof msg.content === "string") return msg.content;
  if (typeof msg.text === "string") return msg.text;
  if (Array.isArray(msg.parts)) {
    return msg.parts.map((p: any) => p.text || p.content || "").join("");
  }
  return "";
};

/* ── Copy Button ─────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy message"}
      className={`group flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-mono transition-all duration-200 ${
        copied
          ? "bg-accent/20 text-accent border border-accent/30"
          : "text-foreground-subtle hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20"
      }`}
    >
      {copied ? (
        <>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

/* ── Rich Markdown Renderer ──────────────────────────────── */
function renderMarkdown(content: string, onLinkClick?: () => void): JSX.Element {
  if (!content) return <></>;

  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let i = 0;

  const parseInline = (text: string, keyPrefix: string): (string | JSX.Element)[] => {
    const parts: (string | JSX.Element)[] = [];
    const inlineRegex = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^)]+|#[^)]+)\)|(https?:\/\/\S+))/g;
    let last = 0;
    let match: RegExpExecArray | null;

    while ((match = inlineRegex.exec(text)) !== null) {
      if (match.index > last) parts.push(text.slice(last, match.index));

      if (match[2]) {
        parts.push(<strong key={`${keyPrefix}-b-${match.index}`} className="font-semibold text-foreground">{match[2]}</strong>);
      } else if (match[3]) {
        parts.push(<em key={`${keyPrefix}-i-${match.index}`} className="italic opacity-80">{match[3]}</em>);
      } else if (match[4]) {
        parts.push(
          <code key={`${keyPrefix}-c-${match.index}`} className="rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] text-accent border border-accent/20">
            {match[4]}
          </code>
        );
      } else if (match[5] && match[6]) {
        const href = match[6];
        const isExternal = href.startsWith("http");
        parts.push(
          <a
            key={`${keyPrefix}-l-${match.index}`}
            href={href}
            onClick={isExternal ? undefined : () => onLinkClick?.()}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors font-medium"
          >
            {match[5]}
          </a>
        );
      } else if (match[7]) {
        parts.push(
          <a
            key={`${keyPrefix}-u-${match.index}`}
            href={match[7]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors break-all text-[11px]"
          >
            {match[7]}
          </a>
        );
      }

      last = inlineRegex.lastIndex;
    }

    if (last < text.length) parts.push(text.slice(last));
    return parts;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") { i++; continue; }

    // Bullet list
    if (/^[-*•]\s/.test(trimmed)) {
      const items: JSX.Element[] = [];
      while (i < lines.length && /^[-*•]\s/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^[-*•]\s/, "");
        items.push(
          <li key={i} className="flex gap-2 items-start">
            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
            <span className="flex-1">{parseInline(itemText, `li-${i}`)}</span>
          </li>
        );
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="flex flex-col gap-1.5 my-0.5">{items}</ul>);
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items: JSX.Element[] = [];
      let counter = 1;
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^\d+\.\s/, "");
        items.push(
          <li key={i} className="flex gap-2 items-start">
            <span className="shrink-0 font-mono text-[10px] text-accent/60 mt-[2px] w-4">{counter}.</span>
            <span className="flex-1">{parseInline(itemText, `oli-${i}`)}</span>
          </li>
        );
        i++; counter++;
      }
      elements.push(<ol key={`ol-${i}`} className="flex flex-col gap-1.5 my-0.5">{items}</ol>);
      continue;
    }

    // Heading
    if (/^#{1,3}\s/.test(trimmed)) {
      const text = trimmed.replace(/^#{1,3}\s/, "");
      elements.push(
        <p key={i} className="text-[10px] font-bold uppercase tracking-widest text-accent/70 mt-2 mb-0.5 font-mono">
          {text}
        </p>
      );
      i++; continue;
    }

    // Horizontal rule
    if (/^---+$/.test(trimmed)) {
      elements.push(<div key={i} className="h-px bg-border/40 my-2" />);
      i++; continue;
    }

    // Plain paragraph
    elements.push(
      <p key={i} className="leading-[1.65]">
        {parseInline(trimmed, `p-${i}`)}
      </p>
    );
    i++;
  }

  return <div className="flex flex-col gap-2">{elements}</div>;
}

/* ══════════════════════════════════════════════════════════ */

export default function AuraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [lastScrolledId, setLastScrolledId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // wide/expanded mode
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  const { messages, status, sendMessage, setMessages } = useChat({
    // @ts-ignore
    initialMessages: [
      {
        id: "init",
        role: "assistant",
        parts: [{ type: "text", text: "System initialized. **AURA Neural Assistant** online.\n\nI have full access to Faiz's profile, projects, education, courses, and contact info. What would you like to know?" }]
      },
    ],
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleReset = () => {
    setMessages([{
      id: "init",
      role: "assistant",
      parts: [{ type: "text", text: "Session cleared. **AURA Neural Assistant** re-initialized.\n\nWhat would you like to know about Faiz?" }]
    }]);
  };

  useEffect(() => {
    if (!isLoading && isOpen) inputRef.current?.focus();
  }, [isLoading, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    // @ts-ignore
    sendMessage({ role: "user", content: input });
    setInput("");
  };

  const handleQuickAction = (action: string) => {
    if (isLoading) return;
    // @ts-ignore
    sendMessage({ role: "user", content: action });
  };

  /* ── Greeting timer ────────────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setShowGreeting(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { if (isOpen) setShowGreeting(false); }, [isOpen]);

  /* ── Auto-scroll + Section Sync ────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    if (messages.length > 0 && !isLoading) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "assistant" && lastMsg.id !== lastScrolledId) {
        const c = extractText(lastMsg).toLowerCase();
        let id = "";
        if (c.includes("the lab") || c.includes("openclaw") || c.includes("snapreply") || c.includes("project")) id = "lab";
        else if (c.includes("ecosystem") || c.includes("tech stack") || c.includes("youtube")) id = "ecosystem";
        else if (c.includes("resume") || c.includes("ats") || c.includes("cv")) id = "optimizer";
        else if (c.includes("contact") || c.includes("email") || c.includes("reach")) id = "contact";
        else if (c.includes("about") || c.includes("philosophy")) id = "about";
        else if (c.includes("skill") || c.includes("langgraph")) id = "skills";

        if (id) {
          const el = document.getElementById(id);
          if (el) { el.scrollIntoView({ behavior: "smooth" }); setLastScrolledId(lastMsg.id); }
        }
      }
    }
  }, [messages, isLoading, lastScrolledId]);

  const systemStatus = isLoading ? "Processing..." : isOpen ? "Online" : "Deep Sleep";

  const QUICK_ACTIONS = [
    "Tell me about Faiz",
    "What projects has he built?",
    "His education & CGPA?",
    "What courses is he doing?",
    "How to reach Faiz?",
    "Faiz ka tech stack kya hai?",
  ];

  const isLastMessageStreaming =
    isLoading && messages.length > 0 && messages[messages.length - 1].role === "assistant";

  /* Dynamic width based on expanded state */
  const chatWidth = isExpanded ? "w-[480px] sm:w-[540px]" : "w-80 sm:w-96";
  const chatHeight = isExpanded ? "h-[600px]" : "h-[520px]";

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      <AnimatePresence>
        {!isOpen ? (
          /* ── Minimized ────────────────────────────────────── */
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
                  I&apos;m AURA — I know everything about Faiz. Ask me anything.
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
              <svg className="relative z-10 h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.button>
          </div>
        ) : (
          /* ── Expanded Chat Window ─────────────────────────── */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className={`flex ${chatHeight} ${chatWidth} flex-col overflow-hidden rounded-[14px] border border-accent/40 shadow-[0_0_40px_rgba(0,240,255,0.15)] backdrop-blur-xl transition-all duration-300`}
            style={{ backgroundColor: "rgba(18, 18, 18, 0.95)" }}
          >
            {/* ── Header ────────────────────────────────────── */}
            <div className="flex items-center justify-between border-b border-accent/20 bg-[#111]/60 px-4 py-3 shrink-0">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse shrink-0" />
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

              <div className="flex items-center gap-2">
                {/* Expand / Collapse toggle */}
                <button
                  onClick={() => setIsExpanded(v => !v)}
                  title={isExpanded ? "Compact view" : "Expand view"}
                  className="text-foreground-subtle transition-colors hover:text-accent"
                >
                  {isExpanded ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0l5 0M4 4l0 5M15 15l5 5m0 0l-5 0m5 0l0-5M9 15l-5 5m0 0l5 0M4 20l0-5M15 9l5-5m0 0l-5 0m5 0l0 5" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  )}
                </button>
                {/* Reset */}
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  className="text-foreground-subtle transition-colors hover:text-accent"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-foreground-subtle transition-colors hover:text-accent"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Messages Area ─────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20">
              {messages.map((msg: any, idx: number) => {
                const isUser = msg.role === "user";
                const text = extractText(msg);
                const isStreamingThis = isLastMessageStreaming && msg.id === messages[messages.length - 1].id;

                return (
                  <div key={msg.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"} gap-1`}>
                    {/* Role label */}
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-1 ${isUser ? "text-accent/50" : "text-foreground-subtle"}`}>
                      {isUser ? "You" : "Aura"}
                    </span>

                    {/* Bubble */}
                    <div
                      className={`relative max-w-[90%] rounded-[10px] px-3.5 py-3 leading-relaxed text-[13px] ${
                        isUser
                          ? "bg-accent/12 border border-accent/25 text-accent rounded-tr-sm"
                          : "bg-[#1e1e1e] border border-white/5 text-foreground-muted rounded-tl-sm"
                      }`}
                    >
                      {isUser ? (
                        <span className="font-mono text-xs">{text}</span>
                      ) : (
                        <div className="font-sans">
                          {renderMarkdown(text, () => setIsOpen(false))}
                          {isStreamingThis && (
                            <span className="ml-px inline-block w-[5px] h-[12px] translate-y-[2px] animate-cursor-blink bg-accent/70 align-middle" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Copy button — only for AURA messages, only when not streaming */}
                    {!isUser && !isStreamingThis && text && (
                      <div className="flex items-center gap-2 pl-1">
                        <CopyButton text={text} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Thinking indicator */}
              {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-foreground-subtle px-1">Aura</span>
                  <div className="rounded-[10px] rounded-tl-sm border border-white/5 bg-[#1e1e1e] px-3.5 py-3">
                    <span className="flex items-center gap-2 text-[12px] text-foreground-subtle">
                      <span className="font-mono text-[10px]">Thinking</span>
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

            {/* ── Bottom Bar ────────────────────────────────── */}
            <div className="border-t border-accent/15 bg-[#111]/70 flex flex-col shrink-0">
              {/* Quick actions — single scrollable row */}
              <div className="flex gap-1.5 px-3 pt-3 pb-1 overflow-x-auto scrollbar-none">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    disabled={isLoading}
                    className="shrink-0 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] text-accent/70 transition-all hover:bg-accent/15 hover:text-accent hover:border-accent/35 disabled:opacity-30 whitespace-nowrap"
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-3 pt-2">
                <div className="flex items-center gap-2 rounded-lg border border-accent/20 bg-[#1a1a1a] px-3 py-2 focus-within:border-accent/40 transition-colors">
                  <span className="font-bold text-accent text-sm shrink-0">›</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask anything about Faiz..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-xs font-medium text-foreground placeholder-foreground-subtle/40 focus:outline-none disabled:opacity-50 sm:text-sm"
                    autoFocus
                    autoComplete="off"
                    id="aura-input"
                    name="aura-query"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/20 text-accent transition-all hover:bg-accent/35 disabled:opacity-25"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </button>
                </div>
                <p className="mt-1.5 text-center text-[9px] text-foreground-subtle/40 tracking-wide">
                  AURA · Powered by Groq · Built by Faiz
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
