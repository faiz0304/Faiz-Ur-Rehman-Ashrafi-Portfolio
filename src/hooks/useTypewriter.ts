"use client";

import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   useTypewriter — Terminal-style typing animation hook
   
   Cycles through an array of phrases:
   1. Types each character forward
   2. Pauses at full phrase
   3. Backspaces to empty
   4. Moves to next phrase
   ═══════════════════════════════════════════════════════════ */

interface TypewriterOptions {
  phrases: string[];
  typingSpeed?: number;    // ms per character typed
  deletingSpeed?: number;  // ms per character deleted
  pauseDuration?: number;  // ms to hold the completed phrase
  startDelay?: number;     // ms before first character
}

type Phase = "typing" | "pausing" | "deleting" | "waiting";

export function useTypewriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  startDelay = 600,
}: TypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("waiting");

  const currentPhrase = phrases[phraseIndex];

  // Start after initial delay
  useEffect(() => {
    const timer = setTimeout(() => setPhase("typing"), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  // Main typing engine
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    switch (phase) {
      case "typing":
        if (charIndex < currentPhrase.length) {
          timer = setTimeout(() => {
            setDisplayText(currentPhrase.slice(0, charIndex + 1));
            setCharIndex((prev) => prev + 1);
          }, typingSpeed);
        } else {
          // Phrase fully typed — pause
          setPhase("pausing");
        }
        break;

      case "pausing":
        timer = setTimeout(() => {
          setPhase("deleting");
        }, pauseDuration);
        break;

      case "deleting":
        if (charIndex > 0) {
          timer = setTimeout(() => {
            setCharIndex((prev) => prev - 1);
            setDisplayText(currentPhrase.slice(0, charIndex - 1));
          }, deletingSpeed);
        } else {
          // Fully deleted — move to next phrase
          setPhase("waiting");
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
        break;

      case "waiting":
        // Brief pause before typing next phrase
        timer = setTimeout(() => {
          setPhase("typing");
        }, 300);
        break;
    }

    return () => clearTimeout(timer);
  }, [phase, charIndex, currentPhrase, typingSpeed, deletingSpeed, pauseDuration, phrases.length]);

  return { displayText, isTyping: phase === "typing", isDeleting: phase === "deleting" };
}
