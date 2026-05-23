"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAIZ_RESUME_DATA } from "@/data/resumeData";
import { useCompletion } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";

/* ═══════════════════════════════════════════════════════════
   Resume Optimizer — ATS Resume Builder Section
   ═══════════════════════════════════════════════════════════ */
export default function ResumeOptimizer() {
  const [activeTab, setActiveTab] = useState<"DEFAULT PDF" | "AI OPTIMIZER">("DEFAULT PDF");
  const [jdText, setJdText] = useState("");

  const { completion, complete, isLoading, error } = useCompletion({
    api: "/api/resume",
  });

  return (
    <section id="optimizer" className="relative py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <h2 className="font-mono text-sm tracking-widest text-[#00F0FF] uppercase mb-4">
            [ SYSTEM MODULE ]
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Optimizer // ATS Resume Builder
          </h3>
        </div>

        {/* Container: Deep slate background with sharp borders */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#171717] p-6 sm:p-10 shadow-2xl">
          
          {/* Top Toggle Switch */}
          <div className="mb-12 flex justify-center">
            <div className="relative flex rounded-full bg-background p-1.5 shadow-inner border border-white/5">
              {["DEFAULT PDF", "AI OPTIMIZER"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`relative z-10 rounded-full px-6 py-2.5 font-mono text-sm font-semibold transition-colors duration-300 ${
                    activeTab === tab ? "text-[#101010]" : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="optimizer-tab-indicator"
                      className="absolute inset-0 -z-10 rounded-full bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  [ {tab} ]
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "DEFAULT PDF" ? (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col space-y-8"
                >
                  {/* Static Resume Rendering */}
                  <div className="space-y-8 text-foreground-muted font-mono text-sm leading-relaxed p-6 sm:p-10 bg-background/50 rounded-lg border border-white/5">
                    
                    {/* Header */}
                    <div className="border-b border-white/10 pb-6">
                      <h4 className="text-2xl font-bold text-foreground mb-1 tracking-tight">
                        {FAIZ_RESUME_DATA.basics.name}
                      </h4>
                      <p className="text-[#00F0FF] font-semibold text-base mb-2">
                        {FAIZ_RESUME_DATA.basics.title}
                      </p>
                      <p className="opacity-80">
                        {FAIZ_RESUME_DATA.basics.email} <span className="mx-2">|</span> {FAIZ_RESUME_DATA.basics.location}
                      </p>
                    </div>
                    
                    {/* Education */}
                    <div>
                      <h5 className="font-bold text-foreground mb-3 text-base">/* EDUCATION */</h5>
                      {FAIZ_RESUME_DATA.education.map((edu, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:justify-between mb-2">
                          <span className="text-foreground font-semibold">{edu.degree}</span>
                          <span className="text-right">{edu.institution}</span>
                          <span className="block sm:hidden text-[#00F0FF]">{edu.honors} ({edu.gpa})</span>
                        </div>
                      ))}
                      <div className="hidden sm:block text-[#00F0FF]">
                        {FAIZ_RESUME_DATA.education[0].honors} ({FAIZ_RESUME_DATA.education[0].gpa})
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h5 className="font-bold text-foreground mb-3 text-base">/* CORE PROJECTS */</h5>
                      <ul className="space-y-3">
                        {FAIZ_RESUME_DATA.projects.map((proj, idx) => (
                          <li key={idx} className="flex flex-col">
                            <span className="text-foreground font-semibold">&gt; {proj.name}</span>
                            <span className="ml-4 opacity-70">
                              Tech Stack: [ <span className="text-[#00F0FF]">{proj.techStack.join(", ")}</span> ]
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="flex justify-center pt-2">
                    <button className="group relative inline-flex items-center gap-2 rounded-lg border border-[#00F0FF]/50 px-8 py-3 font-mono text-sm font-semibold text-[#00F0FF] transition-all duration-300 hover:bg-[#00F0FF]/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                      [ DOWNLOAD STATIC PAYLOAD ]
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col space-y-6"
                >
                  {!completion && !isLoading ? (
                    <>
                      {/* JD Terminal Input */}
                      <div className="group relative rounded-lg border border-white/10 bg-[#0A0A0A] focus-within:border-[#00F0FF]/50 transition-colors duration-300 shadow-inner overflow-hidden">
                        <div className="flex items-center gap-2 border-b border-white/5 bg-[#101010] px-4 py-3">
                          <span className="flex h-3 w-3 rounded-full bg-red-500/80"></span>
                          <span className="flex h-3 w-3 rounded-full bg-yellow-500/80"></span>
                          <span className="flex h-3 w-3 rounded-full bg-green-500/80"></span>
                          <span className="ml-2 font-mono text-xs tracking-wider text-foreground-muted">JD_PARSER.sh</span>
                        </div>
                        <textarea
                          value={jdText}
                          onChange={(e) => setJdText(e.target.value)}
                          placeholder="> Paste target Job Description (JD) here to initialize ATS optimization..."
                          className="min-h-[250px] w-full resize-y bg-transparent p-6 font-mono text-sm leading-relaxed text-foreground placeholder:text-foreground-muted/40 focus:outline-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={() => complete(jdText)}
                        disabled={isLoading || !jdText.trim()}
                        className={`group relative w-full flex items-center justify-center gap-2 rounded-lg border border-[#00F0FF]/50 px-8 py-4 font-mono text-sm font-semibold text-[#00F0FF] transition-all duration-300 
                          ${isLoading ? 'bg-[#00F0FF]/10 animate-pulse' : 'hover:bg-[#00F0FF]/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]'}
                          ${!jdText.trim() ? 'opacity-40 cursor-not-allowed hover:bg-transparent hover:shadow-none' : ''}
                        `}
                      >
                        {isLoading ? "[ OPTIMIZING PAYLOAD... ]" : "[ INITIALIZE ATS ALIGNMENT ]"}
                      </button>
                    </>
                  ) : (
                    /* The Document Viewer */
                    <div className="flex flex-col space-y-4">
                      {/* File Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-4 no-print">
                        <div className="font-mono text-sm text-[#00F0FF]">
                          [ STATUS: {isLoading ? "STREAMING PAYLOAD..." : "OPTIMIZATION COMPLETE"} ]
                        </div>
                        <button 
                          onClick={() => {
                            window.location.reload();
                          }}
                          className="font-mono text-xs text-foreground-muted hover:text-foreground transition-colors"
                        >
                          [ RESET TERMINAL ]
                        </button>
                      </div>

                      {/* Rendered Markdown output */}
                      <div className="relative rounded-lg border border-white/5 bg-[#121212] p-8 sm:p-10 text-foreground-muted shadow-2xl overflow-y-auto max-h-[600px] text-sm leading-relaxed">
                        
                        {/* Export Button */}
                        {!isLoading && completion && (
                          <button
                            onClick={() => window.print()}
                            className="no-print absolute top-6 right-6 z-10 flex items-center gap-2 rounded border border-[#00F0FF]/30 bg-[#0A0A0A] px-4 py-2 font-mono text-xs font-semibold text-[#00F0FF] transition-colors hover:bg-[#00F0FF]/10"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            [ EXPORT ATS PDF ]
                          </button>
                        )}

                        <div id="printable-resume" className="print-safe-area">
                          <ReactMarkdown
                            components={{
                              h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-foreground mt-8 mb-4 tracking-tight" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-xl font-bold text-[#00F0FF] mt-8 mb-4 border-b border-white/5 pb-2 uppercase tracking-wide" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-lg font-bold text-foreground mt-6 mb-3" {...props} />,
                              p: ({node, ...props}) => <p className="mb-4" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2 marker:text-[#00F0FF]" {...props} />,
                              li: ({node, ...props}) => <li className="" {...props} />,
                              strong: ({node, ...props}) => <strong className="text-foreground font-semibold" {...props} />,
                              a: ({node, ...props}) => <a className="text-[#00F0FF] hover:underline" {...props} />
                            }}
                          >
                            {completion}
                          </ReactMarkdown>
                          {isLoading && (
                            <span className="no-print inline-block h-4 w-2 ml-1 align-middle animate-pulse bg-[#00F0FF]" />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {error && (
                    <div className="mt-4 p-4 rounded bg-red-900/20 border border-red-500/50 text-red-400 font-mono text-sm text-center no-print">
                      [ ERROR: {error.message} ]
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
