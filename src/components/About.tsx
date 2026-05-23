"use client";

import { motion } from "framer-motion";

export default function About() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.15, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Background decorations matching the theme */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-[0.03] blur-[100px]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mb-16 sm:mb-20"
        >
          <motion.span
            custom={0}
            variants={textVariants}
            className="terminal-tag"
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            System Architecture
          </motion.span>
          <motion.h2
            custom={1}
            variants={textVariants}
            className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            The Architecture & Philosophy
          </motion.h2>
          <motion.div
            custom={2}
            variants={textVariants}
            className="mt-8 h-px w-24"
            style={{
              background: "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: The Journey */}
          <div className="flex flex-col gap-6 text-base leading-relaxed text-foreground-muted sm:text-lg">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              variants={textVariants}
            >
              My foundation began in BS Electronics at Indus University, where I graduated as a <span className="font-semibold text-accent">Gold Medalist</span> with a 3.96 CGPA. The discipline of working through circuits, signals, and systems taught me to think precisely about how complex things actually behave — a habit that translates surprisingly well into modern AI.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
              variants={textVariants}
            >
              Over the past year, I have shifted my focus toward artificial intelligence, and more specifically toward <span className="font-semibold text-accent">Agentic AI</span>: systems that can reason, plan, and use tools on their own. I learn the way I always have — by building. I read, I experiment, I break things, and then I rebuild them properly.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={5}
              variants={textVariants}
            >
              My goal is to grow into a serious <span className="font-semibold text-accent">AI Engineer</span> who can ship reliable, human-centered AI products. This site is one step in that direction — a clean place to share what I am learning and to help others start their own journey. To build Agentic AI Autonomous Systems for real-world solutions.
            </motion.p>
          </div>

          {/* Right Column: Educational Pipeline */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
              variants={textVariants}
              className="mb-8 font-mono text-sm uppercase tracking-widest text-foreground-subtle"
            >
              Educational Pipeline_
            </motion.div>
            
            <div className="flex flex-col gap-8">
              {/* Timeline Item 1 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={5}
                variants={timelineVariants}
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-border after:absolute after:left-[-3px] after:top-2 after:h-2 after:w-2 after:rounded-full after:bg-accent after:shadow-[0_0_8px_var(--accent)]"
              >
                <div className="mb-2 font-mono text-xs text-accent">
                  [2022 - 2026]
                </div>
                <h3 className="mb-2 font-mono text-base font-semibold text-foreground">
                  BS Electronics Engineering Technology
                </h3>
                <div className="font-mono text-sm text-foreground-muted">
                  <span className="text-foreground-subtle">&gt; Location:</span> Indus University Main Campus, Karachi
                </div>
                <div className="mt-1 font-mono text-sm text-foreground-muted">
                  <span className="text-foreground-subtle">&gt; Status:</span> 3.96 CGPA // <span className="text-accent">Gold Medalist</span> (1st in Family)
                </div>
              </motion.div>

              {/* Timeline Item 2 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={6}
                variants={timelineVariants}
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-border after:absolute after:left-[-2.5px] after:top-2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-foreground-subtle"
              >
                <div className="mb-2 font-mono text-xs text-foreground-subtle">
                  [2019 - 2021]
                </div>
                <h3 className="mb-2 font-mono text-base font-semibold text-foreground">
                  FS.C / Intermediate
                </h3>
                <div className="font-mono text-sm text-foreground-muted">
                  <span className="text-foreground-subtle">&gt; Location:</span> Government College Forman Nazimabad, Karachi
                </div>
              </motion.div>

              {/* Timeline Item 3 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={7}
                variants={timelineVariants}
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-border before:to-transparent after:absolute after:left-[-2.5px] after:top-2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-foreground-subtle"
              >
                <div className="mb-2 font-mono text-xs text-foreground-subtle">
                  [2017 - 2019]
                </div>
                <h3 className="mb-2 font-mono text-base font-semibold text-foreground">
                  Matriculation
                </h3>
                <div className="font-mono text-sm text-foreground-muted">
                  <span className="text-foreground-subtle">&gt; Location:</span> Islamia English Model School
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
