"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════
   PageTransition — Smooth mount reveal
   Subtle fade-in + slight upward translation.
   Wraps page content for fluid entrance animations.
   ═══════════════════════════════════════════════════════════ */

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.1,
      }}
      className="flex min-h-screen flex-col"
    >
      {children}
    </motion.div>
  );
}
