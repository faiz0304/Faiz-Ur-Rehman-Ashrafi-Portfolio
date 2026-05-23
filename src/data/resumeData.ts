/*
  ╔══════════════════════════════════════════════════════════════════╗
  ║   FAIZ UR REHMAN ASHRAFI — Professional Profile Data Store      ║
  ║                                                                  ║
  ║   This data is immutable. The LLM may selectively highlight or  ║
  ║   reorder these facts to match a Job Description, but it must   ║
  ║   NEVER invent new experience, degrees, or skills outside of    ║
  ║   this payload.                                                  ║
  ╚══════════════════════════════════════════════════════════════════╝
*/

import { SYSTEM_CAPABILITIES } from "./skills";

// ─── Type Definitions ────────────────────────────────────────────────────────

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  gpa: string;
  honors?: string;
  detail?: string;
}

export interface TechnicalSkills {
  programmingAndData: string[];
  databases: string[];
  frameworks: string[];
  aiAndMl: string[];
  engineering: string[];
  tools: string[];
}

export interface ProjectEntry {
  /** Short display name (backward-compatible: `proj.name`) */
  name: string;
  title: string;
  description: string;
  githubLink: string | null;
  /** Backward-compatible alias (`proj.techStack`) */
  techStack: string[];
  tags: string[];
}

export interface StrengthEntry {
  trait: string;
  detail: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const FAIZ_RESUME_DATA = {
  // ── 1. Header ──────────────────────────────────────────────────────────────
  basics: {
    name: "Faiz Ur Rehman Ashrafi",
    title: "Agentic AI & Machine Learning Engineer",
    email: "faizashrafi0304@gmail.com",
    linkedin: "linkedin.com/in/faiz-ur-rehman-ashrafi",
    github: "github.com/faiz0304",
    location: "Karachi, Pakistan",
    profilePicture: "/Faiz-Profile-Pic.png",
  },

  // ── 2. Professional Summary ─────────────────────────────────────────────────
  summary: `As a Gold Medalist Electronics Engineering Technology graduate (3.96 CGPA), I transitioned into Agentic AI and Machine Learning by leveraging my rigorous foundation in systems design. My background in signal processing and embedded systems taught me how to decompose complex problems—a discipline I now apply to engineering autonomous AI workflows. I have hands-on experience building production-ready, multi-agent architectures using LangGraph, CrewAI, and modern RAG patterns. I focus on practical, full-stack deployment, prioritizing reliable systems over theoretical trends.`,

  // ── 3. Education ───────────────────────────────────────────────────────────
  education: [
    {
      degree: "BS Electronics Engineering Technology",
      institution: "Indus University",
      year: "2022 – 2026",
      gpa: "3.96 CGPA",
      honors: "Gold Medalist",
      detail:
        "Graduated with highest academic distinction. Core coursework: Signal Processing, Embedded Systems, Circuit Theory, Control Systems, Digital Electronics, and Engineering Mathematics.",
    },
  ] satisfies EducationEntry[],

  // ── 4. Technical Skills ────────────────────────────────────────────────────
  technicalSkills: {
    programmingAndData: [
      "Python",
      "TypeScript",
      "JavaScript",
      "SQL",
      "Bash / Shell Scripting",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
    ],
    databases: [
      "PostgreSQL",
      "SQLite",
      "Supabase",
      "Vector Stores (FAISS, Chroma)",
    ],
    frameworks: [
      "Next.js",
      "React",
      "FastAPI",
      "Streamlit",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "AgentScope",
      "Tailwind CSS",
    ],
    aiAndMl: [
      "Agentic AI Workflow Design",
      "Multi-Agent Systems",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt Engineering",
      "Machine Learning (Supervised & Unsupervised)",
      "Model Evaluation & Fine-tuning",
      "OpenAI API",
      "Anthropic Claude API",
      "Google Gemini API",
      "Groq API",
      "Hugging Face",
      "Scikit-learn",
    ],
    engineering: [
      "Signal Processing",
      "Embedded Systems",
      "Circuit Design & Analysis",
      "Control Systems",
      "Digital Electronics",
    ],
    tools: [
      "Git & GitHub",
      "Docker",
      "Linux / Ubuntu",
      "VS Code",
      "Cursor",
      "Vercel",
      "Postman",
      "MS Office (Word, Excel, PowerPoint)",
    ],
  } satisfies TechnicalSkills,

  // ── 5. Projects ────────────────────────────────────────────────────────────
  projects: [
    {
      name: "OpenClaw",
      title: "OpenClaw — Autonomous Linux Agent",
      description:
        "A fully autonomous terminal-based agent built on LangGraph and Claude 3.5 Sonnet that understands natural-language instructions and executes multi-step Linux system tasks without human hand-holding. Implements a ReAct reasoning loop, tool-use scaffolding, and safe command sandboxing.",
      githubLink: "https://github.com/faiz0304/openclaw",
      techStack: ["Python", "LangGraph", "Claude 3.5 Sonnet", "Linux"],
      tags: ["Python", "LangGraph", "Claude 3.5 Sonnet", "Linux", "Agentic AI", "ReAct"],
    },
    {
      name: "SAI (Shabnam-AI)",
      title: "SAI (Shabnam-AI) — RAG-Powered Knowledge Assistant",
      description:
        "A conversational AI assistant built for a specific knowledge domain, leveraging Retrieval-Augmented Generation to ground responses in uploaded documents. Features a Streamlit UI, OpenAI embeddings, and FAISS vector search for low-latency, accurate retrieval.",
      githubLink: "https://github.com/faiz0304/shabnam-ai",
      techStack: ["Python", "Streamlit", "OpenAI", "RAG"],
      tags: ["Python", "Streamlit", "OpenAI", "RAG", "FAISS", "LangChain", "NLP"],
    },
    {
      name: "SnapReply AI",
      title: "SnapReply AI — Intelligent Email Response Generator",
      description:
        "A full-stack Next.js application that uses LLM inference to draft context-aware email replies in seconds. Users paste an email thread, select a tone, and receive a polished draft — cutting reply time by over 80%. Built with TypeScript, Tailwind CSS, and a serverless API layer.",
      githubLink: "https://github.com/faiz0304/snapreply-ai",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "OpenAI", "Serverless"],
    },
    {
      name: "E-Commerce Multi-Agent Ops",
      title: "E-Commerce Multi-Agent Operations Platform",
      description:
        "A production-style multi-agent pipeline for automating e-commerce back-office tasks: inventory monitoring, customer query triage, and order-status updates. Agents are orchestrated via CrewAI and AgentScope with a FastAPI backend and Docker containerisation for reproducible deployment.",
      githubLink: "https://github.com/faiz0304/ecom-multiagent-ops",
      techStack: ["CrewAI", "AgentScope", "FastAPI", "Docker"],
      tags: ["CrewAI", "AgentScope", "FastAPI", "Docker", "Python", "Multi-Agent"],
    },
    {
      name: "Portfolio (This Site)",
      title: "Personal Portfolio — Agentic AI Developer Showcase",
      description:
        "A performance-optimised, dark-themed portfolio built with Next.js 15 App Router, Framer Motion animations, and an integrated ATS Resume Optimizer powered by a Groq-hosted LLaMA model. Deployed on Vercel with perfect Lighthouse scores.",
      githubLink: "https://github.com/faiz0304/portfolio",
      techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Groq"],
      tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Groq", "Vercel"],
    },
  ] satisfies ProjectEntry[],

  // ── 6. Learning & Development / Strengths ──────────────────────────────────
  strengths: [
    {
      trait: "Analytical Mindset",
      detail:
        "Hardware engineering training forged a first-principles approach to debugging and system design — applied daily to ML pipelines and agent architectures.",
    },
    {
      trait: "Strong Academic Discipline",
      detail:
        "Graduated with a 3.96 CGPA and Gold Medal, demonstrating sustained rigour across four years of demanding engineering coursework.",
    },
    {
      trait: "Self-Driven Learner",
      detail:
        "Independently transitioned from Electronics Engineering into Agentic AI & ML — mastering LangGraph, CrewAI, RAG, and modern LLM APIs without formal AI coursework.",
    },
    {
      trait: "Long-Term Strategic Thinking",
      detail:
        "Deliberately builds compounding skills at the intersection of AI agents, ML, and full-stack engineering to remain a domain generalist who ships end-to-end.",
    },
    {
      trait: "Problem Decomposition",
      detail:
        "Breaks large, ambiguous objectives into concrete, testable sub-tasks — a habit cultivated through engineering projects and reinforced in multi-agent system design.",
    },
    {
      trait: "Logic Building",
      detail:
        "Strong foundation in Boolean algebra, control flow, and algorithmic thinking from digital electronics and embedded systems work.",
    },
    {
      trait: "Honest & Goal-Oriented",
      detail:
        "Commits only to what can be delivered, communicates blockers early, and keeps personal and professional goals aligned with measurable outcomes.",
    },
  ] satisfies StrengthEntry[],

  continuousLearning: [
    "Actively studying advanced LLM fine-tuning, RLHF, and model alignment techniques.",
    "Exploring multi-modal AI (vision + language) integrations for agentic workflows.",
    "Deepening knowledge of distributed systems and MLOps for scalable model deployment.",
    "Following frontier AI research (Anthropic, DeepMind, OpenAI) and translating findings into practical prototypes.",
    "Contributing to open-source agentic tooling and building a public technical portfolio.",
  ],

  // ── Legacy / compatibility — consumed by resume/page.tsx & ResumeOptimizer ─
  experience: [],

  /**
   * Flat SkillCategory[] consumed by the Skills Matrix section on the resume
   * page. Sourced from skills.ts for backward compatibility.
   */
  skills: SYSTEM_CAPABILITIES,
};
