"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

/* ═══════════════════════════════════════════════════════════
   Typewriter — Terminal-style animated text display
   Cycles through role titles with typing/backspace effect.
   ═══════════════════════════════════════════════════════════ */

const ROLES = [
  "Agentic AI Specialist",
  "AI Platform Founder",
  "Architecting Autonomous Systems",
];

export default function Typewriter() {
  const { displayText } = useTypewriter({
    phrases: ROLES,
    typingSpeed: 70,
    deletingSpeed: 35,
    pauseDuration: 2200,
    startDelay: 800,
  });

  return (
    <span className="inline-flex items-baseline gap-0.5 font-mono text-sm tracking-wide text-accent sm:text-base">
      {/* Prompt prefix */}
      <span className="text-foreground-subtle select-none">
        {">"}&nbsp;
      </span>

      {/* Typed text */}
      <span className="min-w-0">
        {displayText}
      </span>

      {/* Blinking block cursor */}
      <span
        className="ml-px inline-block w-[8px] translate-y-[1px] animate-cursor-blink text-accent"
        aria-hidden="true"
      >
        █
      </span>
    </span>
  );
}
