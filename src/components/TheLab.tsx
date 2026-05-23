"use client";

import { motion } from "framer-motion";
import { featuredProjects, standardProjects, githubArchives } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import FeaturedCard from "@/components/FeaturedCard";
import OpenClawTerminal from "@/components/OpenClawTerminal";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   The Lab — Project Showcase Grid
   Featured cards (full-width) + standard 3-column grid,
   all with scroll-triggered stagger animations.
   ═══════════════════════════════════════════════════════════ */

export default function TheLab() {
  return (
    <>
      <section id="lab" className="relative py-24 sm:py-32">
      {/* ── Background subtle grid ──────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--foreground-subtle) 1px, transparent 1px),
              linear-gradient(90deg, var(--foreground-subtle) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Accent glow — top center */}
        <div
          className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.06] blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Content Container ───────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* ── Section Header ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="mb-16 sm:mb-20"
        >
          {/* Overline tag */}
          <span className="terminal-tag">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Active Projects
          </span>

          {/* Main heading */}
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            The Lab{" "}
            <span className="font-mono text-lg font-normal text-foreground-subtle sm:text-xl lg:text-2xl">
              // Autonomous Systems
            </span>
          </h2>

          {/* Section description */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            Production-grade agent architectures, RAG pipelines, and
            multi-agent orchestration systems — each built to perceive,
            reason, and act autonomously.
          </p>

          {/* Decorative divider */}
          <div
            className="mt-8 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
        </motion.div>

        {/* ── Featured Projects ─────────────────────────── */}
        <div className="mb-8 flex flex-col gap-6">
          {featuredProjects.map((project, index) => (
            <FeaturedCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* ── Personal Engine Divider ──────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-4"
        >
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--border), transparent)",
            }}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
            Personal Engine
          </span>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--border), transparent)",
            }}
          />
        </motion.div>

        {/* ── OpenClaw Terminal ─────────────────────────── */}
        <OpenClawTerminal />

        {/* ── Divider between featured & standard ──────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-4"
        >
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--border), transparent)",
            }}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
            More Projects
          </span>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--border), transparent)",
            }}
          />
        </motion.div>


        {/* ── Standard Project Grid ─────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {standardProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* ── AI Masterclass Feature ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mt-16 overflow-hidden rounded-2xl border border-accent/40 bg-background-secondary p-8 sm:p-10 lg:mt-24"
        >
          {/* Subtle Glow */}
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]" />
          
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Featured Resource
              </span>
              <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                AI Master Class & Free Course
              </h3>
              <p className="mb-8 leading-relaxed text-foreground-muted">
                Completed comprehensive technical training at Beyond Tahir Academy. This intensive masterclass focuses on advanced AI orchestration, large language models, and practical systems engineering, showcasing my commitment to continuous learning and pushing the boundaries of AI education.
              </p>
              <a
                href="https://faiz-ai-masterclass-article.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-accent px-6 py-3 font-semibold tracking-wide text-background transition-all duration-300 hover:shadow-[0_0_30px_var(--accent-glow)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                <svg className="relative h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span className="relative">Access Resource</span>
              </a>
            </div>
            
            <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-border bg-background/50">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background-tertiary">
                  <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
                  Beyond Tahir Academy
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <section id="archive" className="relative pb-24 sm:pb-32 pt-16 sm:pt-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* ── Open Source Archive Divider ──────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-4"
        >
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--border), transparent)",
            }}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
            The Open Source Archive // GitHub Repositories
          </span>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--border), transparent)",
            }}
          />
        </motion.div>

        {/* ── GitHub Repos Grid ────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {githubArchives.map((repo, idx) => (
            <Link
              key={idx}
              href={repo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-accent/20 bg-background-secondary p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_#00F0FF]"
            >
              <div className="mb-3 flex items-center justify-between">
                <svg
                  className="h-5 w-5 text-foreground-subtle transition-colors duration-300 group-hover:text-[#00F0FF]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {repo.category}
                </span>
              </div>
              <h4 className="mb-2 font-mono text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-[#00F0FF]">
                {repo.title}
              </h4>
              <p className="mb-4 text-sm text-foreground-muted">
                {repo.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {repo.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded bg-background-tertiary px-1.5 py-0.5 font-mono text-[10px] text-foreground-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* ── Bottom CTA ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col items-center gap-4 sm:mt-20"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
            More systems in development
          </p>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full bg-accent/40"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
