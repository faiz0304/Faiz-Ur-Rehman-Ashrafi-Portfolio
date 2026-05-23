"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

/* ── Navigation Links ────────────────────────────────────── */
const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "THE LAB", href: "#lab" },
  { label: "ARCHIVE", href: "#archive" },
  { label: "ECOSYSTEM", href: "#ecosystem" },
  { label: "CONTACT", href: "#contact" },
];

/* ═══════════════════════════════════════════════════════════
   Navbar — Command Navigator
   ═══════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } else if (previous !== undefined && latest < previous) {
      setHidden(false);
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px", // Trigger when the section reaches upper part of viewport
      }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.substring(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full backdrop-blur-md bg-background/60 border-b border-white/5"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        {/* ── Logo ─────────────────────────────────────────── */}
        <Link href="/" className="group flex flex-shrink-0 items-center gap-2">
          {/* Pulse dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>

          <span className="font-mono text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
            Faiz<span className="text-accent">.AI</span>
          </span>
        </Link>

        {/* ── Nav Links ────────────────────────────────────── */}
        <div className="hidden flex-1 items-center justify-center overflow-x-auto sm:flex lg:overflow-visible">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`
                      relative block whitespace-nowrap rounded-md px-3 py-2 font-mono text-sm font-medium transition-all duration-300
                      ${
                        isActive
                          ? "text-[#00F0FF]"
                          : "text-foreground-muted hover:text-foreground"
                      }
                    `}
                  >
                    {isActive ? `> ${link.label}` : link.label}

                    {/* Active indicator underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── CTA — Status Badge ─────────────────────────── */}
        <div className="ml-4 flex items-center justify-end">
          <Link
            href="/resume"
            className="px-4 py-1.5 ml-4 text-sm font-mono text-[#00F0FF] border border-[#00F0FF]/50 rounded hover:bg-[#00F0FF]/10 hover:border-[#00F0FF] transition-all flex items-center gap-2"
          >
            [ ⚡ AI RESUME ]
          </Link>
          <Link
            href="#contact"
            className="group relative hidden sm:inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-mono font-medium text-foreground-muted transition-all duration-300 hover:border-[#00F0FF]/50 hover:text-[#00F0FF]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            SYSTEM: ONLINE
          </Link>

          {/* ── Mobile Menu Toggle (Only visible on small screens) ── */}
          <button
            className="flex flex-col gap-1.5 sm:hidden ml-4"
            aria-label="Toggle menu"
          >
            <span className="h-px w-5 bg-foreground-muted transition-colors hover:bg-accent" />
            <span className="h-px w-3.5 bg-foreground-muted transition-colors hover:bg-accent" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
