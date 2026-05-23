"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SYSTEM_CAPABILITIES } from "@/data/skills";

export default function SkillMatrix() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(SYSTEM_CAPABILITIES[0].id);

  const activeCategory = SYSTEM_CAPABILITIES.find((cat) => cat.id === activeCategoryId);

  // Logic to determine which skills to display based on search
  const isSearching = searchTerm.trim() !== "";
  let displaySkills: { name: string; categoryId: string }[] = [];
  let displayTitle = "";

  if (isSearching) {
    displayTitle = "Search Results";
    displaySkills = SYSTEM_CAPABILITIES.flatMap((cat) =>
      cat.skills.map((skill) => ({ name: skill, categoryId: cat.id }))
    ).filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  } else {
    displayTitle = activeCategory?.label || "";
    displaySkills = (activeCategory?.skills || []).map((skill) => ({
      name: skill,
      categoryId: activeCategory?.id || "",
    }));
  }

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-12 sm:mb-16">
          <span className="terminal-tag">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            System Capabilities
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            The Skill Matrix
          </h2>
          <div
            className="mt-8 h-px w-24"
            style={{
              background: "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
        </div>

        {/* Terminal Search Input */}
        <div className="mb-12 max-w-xl">
          <div className="relative flex items-center border-b border-border bg-[#101010] px-4 py-3 transition-colors focus-within:border-[#00F0FF] focus-within:shadow-[0_2px_15px_-3px_rgba(0,240,255,0.4)]">
            <span className="mr-2 select-none font-mono text-sm text-[#00F0FF]">&gt; grep:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="search_capabilities..."
              className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-foreground-muted"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Left Sidebar / Mobile Tabs */}
          <div className={`shrink-0 lg:w-1/3 xl:w-1/4 ${isSearching ? "pointer-events-none opacity-50 transition-opacity" : "transition-opacity"}`}>
            {/* Mobile Tab List */}
            <div className="mb-8 flex overflow-x-auto border-b border-border pb-4 lg:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-4 px-1">
                {SYSTEM_CAPABILITIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategoryId(category.id)}
                    className={`relative whitespace-nowrap pb-3 font-mono text-sm transition-colors ${
                      activeCategoryId === category.id
                        ? "font-semibold text-accent"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {category.label}
                    {activeCategoryId === category.id && (
                      <motion.div
                        layoutId="mobile-active-tab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="sticky top-24 hidden lg:block">
              <ul className="flex flex-col gap-2 border-l border-border pl-4">
                {SYSTEM_CAPABILITIES.map((category) => {
                  const isActive = activeCategoryId === category.id;
                  return (
                    <li key={category.id} className="relative">
                      {isActive && (
                        <motion.div
                          layoutId="desktop-active-tab"
                          className="absolute -left-[17px] bottom-0 top-0 w-[2px] bg-accent shadow-[0_0_8px_var(--accent)]"
                        />
                      )}
                      <button
                        onClick={() => setActiveCategoryId(category.id)}
                        className={`block w-full rounded-md px-3 py-2 text-left font-mono text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-accent/5 font-semibold text-accent"
                            : "text-foreground-muted hover:bg-border/50 hover:text-foreground"
                        }`}
                      >
                        {category.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Panel: Skills Grid */}
          <div className="min-h-[400px] flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={isSearching ? "search" : activeCategory?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-6 text-xl font-semibold lg:hidden">
                  {displayTitle}
                </h3>
                
                {displaySkills.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {displaySkills.map((item, index) => {
                      const isCognitive = item.categoryId === "cognitive-architecture";
                      return (
                        <motion.div
                          key={`${item.name}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: (index % 20) * 0.02 }}
                          className={`group relative overflow-hidden rounded-md bg-[#171717] px-4 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] ${
                            isCognitive
                              ? "border border-[#00F0FF]/40 hover:border-[#00F0FF]/70"
                              : "border border-border/50 hover:border-[#00F0FF]/50"
                          }`}
                        >
                          <div className={`font-mono text-sm text-foreground transition-colors group-hover:text-accent ${isCognitive ? "italic" : ""}`}>
                            {item.name}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center font-mono text-sm text-foreground-muted">
                    No capabilities matched your query.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
