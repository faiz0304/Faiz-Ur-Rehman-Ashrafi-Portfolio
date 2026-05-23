"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   System Banner — Reusable Break Sections
   ═══════════════════════════════════════════════════════════ */

interface SystemBannerProps {
  type: "marquee" | "mission";
}

function MarqueeBanner() {
  const textGroup = (
    <div className="flex items-center space-x-8 whitespace-nowrap px-4 font-mono text-sm tracking-widest text-foreground-muted/60 uppercase">
      <span className="text-[#00F0FF] font-semibold">AGENTIC AI</span>
      <span>//</span>
      <span>MULTI-AGENT ORCHESTRATION</span>
      <span>//</span>
      <span>COGNITIVE PIPELINES</span>
      <span>//</span>
      <span>SYSTEM DESIGN</span>
      <span>//</span>
      <span>AUTONOMOUS WORKFLOWS</span>
      <span>//</span>
    </div>
  );

  return (
    <div className="relative flex h-[60px] w-full items-center overflow-hidden bg-[#101010] border-y border-white/5">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {textGroup}
        {textGroup}
        {textGroup}
        {textGroup}
      </motion.div>
    </div>
  );
}

function MissionBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  // For the Mission scroll fill effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Starts when top of element hits bottom of viewport, ends when bottom hits top
  });

  // Map scroll progress to a clip-path polygon for smooth left-to-right reveal
  const clipRight = useTransform(scrollYProgress, [0.3, 0.7], [100, 0]);
  const clipPath = useMotionTemplate`inset(0% ${clipRight}% 0% 0%)`;

  return (
    <div 
      ref={containerRef}
      className="relative flex w-full items-center justify-center overflow-hidden py-32 bg-background"
    >
      <div className="relative inline-block text-center font-bold tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-9xl text-5xl">
        {/* Base Layer: Outlined text */}
        <div 
          className="text-transparent"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
        >
          ENGINEERING<br/>AUTONOMY
        </div>

        {/* Fill Layer: Colored text clipped horizontally */}
        <motion.div
          className="absolute inset-0 text-[#00F0FF]"
          style={{ clipPath }}
        >
          ENGINEERING<br/>AUTONOMY
        </motion.div>
      </div>
    </div>
  );
}

export default function SystemBanner({ type }: SystemBannerProps) {
  if (type === "marquee") return <MarqueeBanner />;
  if (type === "mission") return <MissionBanner />;
  return null;
}
