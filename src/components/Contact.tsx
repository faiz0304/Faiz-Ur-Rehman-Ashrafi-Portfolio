"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const GithubIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-8.8a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C4.3 1.2 3 1.6 3 1.6a5.5 5.5 0 0 0-.1 3.8 5.5 5.5 0 0 0-1.5 3.8c0 7.3 3 8.5 6 8.8a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default function Contact() {
  type FormState = "idle" | "submitting" | "success";
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    
    // Simulate API call for now. You can hook this up to an actual 
    // endpoint (like Resend or Formspree) by replacing this block.
    setTimeout(() => {
      setFormState("success");
      
      // Optional: reset the form state after a few seconds
      setTimeout(() => setFormState("idle"), 5000);
    }, 2000);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.3 } },
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5 + custom * 0.1, duration: 0.4, ease: "easeOut" as const },
    }),
  };

  const networkNodes = [
    {
      name: "Email",
      label: "FAIZ UR REHMAN ASHRAFI",
      href: "mailto:faizashrafi0304@gmail.com",
      icon: Mail,
    },
    {
      name: "LinkedIn",
      label: "FAIZ UR REHMAN ASHRAFI",
      href: "https://www.linkedin.com/in/faiz-ur-rehman-ashrafi-75b7203a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      icon: LinkedinIcon,
    },
    {
      name: "GitHub",
      label: "faiz0304",
      href: "https://github.com/faiz0304",
      icon: GithubIcon,
    },
    {
      name: "YouTube",
      label: "FAIZ CODES AI",
      href: "https://www.youtube.com/@FaizCodesAI",
      icon: YoutubeIcon,
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-0 bottom-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full opacity-[0.03] blur-[120px]"
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
            Initialize Contact
          </motion.span>
          <motion.h2
            custom={1}
            variants={textVariants}
            className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            The Terminal
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
          {/* Left Column: Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={formVariants}
            className="flex flex-col gap-6"
          >
            <div className="mb-4 font-mono text-sm uppercase tracking-widest text-foreground-subtle">
              System Interface_
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="group relative flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-xs text-foreground-muted group-focus-within:text-[#00F0FF] transition-colors">
                  name:
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="> Enter your designation..."
                  className="w-full border border-white/10 bg-[#171717] px-4 py-3 font-mono text-sm text-foreground outline-none transition-all focus:border-[#00F0FF] focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] rounded-md"
                  required
                  disabled={formState === "submitting" || formState === "success"}
                />
              </div>
              <div className="group relative flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-xs text-foreground-muted group-focus-within:text-[#00F0FF] transition-colors">
                  email:
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="> Enter comms link..."
                  className="w-full border border-white/10 bg-[#171717] px-4 py-3 font-mono text-sm text-foreground outline-none transition-all focus:border-[#00F0FF] focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] rounded-md"
                  required
                  disabled={formState === "submitting" || formState === "success"}
                />
              </div>
              <div className="group relative flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs text-foreground-muted group-focus-within:text-[#00F0FF] transition-colors">
                  encrypted_message:
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="> Initialize data transfer..."
                  className="w-full resize-none border border-white/10 bg-[#171717] p-4 font-mono text-sm text-foreground outline-none transition-all focus:border-[#00F0FF] focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] rounded-md"
                  required
                  disabled={formState === "submitting" || formState === "success"}
                />
              </div>
              <button
                type="submit"
                disabled={formState === "submitting" || formState === "success"}
                className={`group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-md border border-white/10 bg-[#171717] px-8 py-3.5 font-mono text-sm font-semibold transition-all ${
                  formState === "success"
                    ? "text-[#00F0FF] border-[#00F0FF]/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                    : "text-foreground hover:border-[#00F0FF] hover:text-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] active:scale-95"
                } disabled:opacity-80 disabled:cursor-not-allowed`}
              >
                <span>
                  {formState === "idle" && "[ TRANSMIT_PAYLOAD ]"}
                  {formState === "submitting" && "[ TRANSMITTING... ]"}
                  {formState === "success" && "[ SYSTEM: MESSAGE DELIVERED ]"}
                </span>
                {formState === "idle" && (
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Network Nodes */}
          <div>
            <div className="mb-8 font-mono text-sm uppercase tracking-widest text-foreground-subtle">
              Network Nodes_
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {networkNodes.map((node, idx) => {
                const Icon = node.icon;
                return (
                  <motion.a
                    key={node.name}
                    href={node.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    variants={nodeVariants}
                    className="group relative flex flex-col gap-3 overflow-hidden rounded-md border border-border/50 bg-[#171717] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#00F0FF]/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-foreground-muted transition-colors group-hover:text-[#00F0FF]">
                        {node.name}
                      </span>
                      <Icon className="h-4 w-4 text-foreground-subtle transition-colors group-hover:text-[#00F0FF]" />
                    </div>
                    <div className="font-mono text-sm font-semibold text-foreground transition-colors group-hover:text-[#00F0FF]">
                      {node.label}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
