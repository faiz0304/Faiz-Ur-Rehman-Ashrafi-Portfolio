/* ═══════════════════════════════════════════════════════════
   Project Metadata — The Lab
   Core project data for the portfolio showcase grid.
   ═══════════════════════════════════════════════════════════ */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  category: string;
  status: "deployed" | "in-progress" | "research";
  featured?: boolean;
  href?: string;
  liveLink?: string;
  liveLinkText?: string;
  /** Featured-only fields */
  architectureHighlights?: string[];
  actionLabel?: string;
  actionIcon?: "architecture" | "logs" | "deploy";
  metrics?: { label: string; value: string }[];
}

const projects: Project[] = [
  /* ── Featured: SnapReply AI ──────────────────────────── */
  {
    id: "snapreply-ai",
    title: "SnapReply AI",
    tagline: "Autonomous Customer Support Agent for Local E-Commerce",
    description:
      "An autonomous customer support agent designed for local e-commerce businesses. SnapReply seamlessly manages multi-channel inquiries across WhatsApp and Instagram, handling product questions, order tracking, and complaint resolution through natural dialogue — all orchestrated by a stateful LangGraph cognitive pipeline with custom webhook integrations for real-time message routing.",
    technologies: [
      "LangGraph",
      "FastAPI",
      "Custom Webhooks",
      "Groq LLM",
      "WhatsApp API",
      "Instagram API",
    ],
    category: "Autonomous Workflows",
    status: "deployed",
    featured: true,
    href: "#",
    architectureHighlights: [
      "Stateful conversation graph with branching logic",
      "Multi-channel webhook router (WhatsApp + Instagram)",
      "Real-time intent classification & escalation",
      "Persistent memory across customer sessions",
    ],
    actionLabel: "View Architecture",
    actionIcon: "architecture",
    metrics: [
      { label: "Channels", value: "2" },
      { label: "Avg Response", value: "<2s" },
      { label: "Uptime", value: "99.9%" },
    ],
  },

  /* ── Featured: SAI Command Center ────────────────────── */
  {
    id: "sai-command-center",
    title: "SAI (Shabnam-AI)",
    tagline: "Autonomous Digital Organization with AI Employees",
    description:
      "The command center for an autonomous digital organization. SAI choreographs tasks across a fleet of specialized AI employees — from sales agents and content writers to research analysts — through a central dashboard that monitors agent health, assigns workflows, and visualizes the entire operational pipeline of a startup run by digital workers.",
    technologies: [
      "AgentScope",
      "Next.js",
      "Multi-Agent Orchestration",
      "WebSocket",
      "Tailwind CSS",
      "LangGraph",
    ],
    category: "Multi-Agent Orchestration",
    status: "deployed",
    featured: true,
    href: "#",
    liveLink: "https://sai-cc-mvp.lovable.app/",
    liveLinkText: "Launch Live MVP",
    architectureHighlights: [
      "Central orchestrator dispatching to agent swarms",
      "Real-time agent health monitoring dashboard",
      "Dynamic task queue with priority scheduling",
      "Role-based AI employee specialization",
    ],
    actionLabel: "System Logs",
    actionIcon: "logs",
    metrics: [
      { label: "AI Employees", value: "6" },
      { label: "Tasks/Day", value: "240+" },
      { label: "Latency", value: "<500ms" },
    ],
  },

  /* ── Standard Projects ──────────────────────────────── */
  {
    id: "multi-agent-ecommerce",
    title: "Multi-Agent E-Commerce",
    tagline: "Coordinated Agent Swarm",
    description:
      "An orchestrated multi-agent system where specialized nodes handle product search, inventory checks, order processing, and customer support — communicating through a shared state graph.",
    technologies: ["CrewAI", "LangChain", "FAISS", "HuggingFace", "PostgreSQL"],
    category: "Multi-Agent Orchestration",
    status: "deployed",
    href: "#",
  },
  {
    id: "subdomain-rag",
    title: "Subdomain RAG Engine",
    tagline: "Context-Grounded Retrieval",
    description:
      "A modular retrieval-augmented generation pipeline using local embeddings (MiniLM) and FAISS vector search, designed as a reusable LangGraph sub-agent for domain-specific knowledge grounding.",
    technologies: ["LangGraph", "FAISS", "Sentence-Transformers", "FastAPI"],
    category: "RAG Architecture",
    status: "deployed",
    href: "#",
  },
  {
    id: "github-strategy-analyzer",
    title: "GitHub Strategy Analyzer",
    tagline: "Two-Pass AI Codebase Auditor",
    description:
      "A SaaS MVP that ingests public GitHub repos through a Scout → Deep Thinker two-pass AI architecture, extracting architectural strategies and rendering them as interactive node graphs.",
    technologies: ["Next.js", "Gemini API", "React Flow", "Tailwind CSS"],
    category: "AI-Powered SaaS",
    status: "in-progress",
    href: "#",
  },
  {
    id: "cognitive-pipeline",
    title: "Cognitive Pipeline Framework",
    tagline: "Modular Agent Assembly",
    description:
      "A framework for composing agentic pipelines from interchangeable cognitive modules — perception, reasoning, memory, and action — enabling rapid prototyping of autonomous systems.",
    technologies: ["Python", "LangGraph", "Redis", "Docker", "gRPC"],
    category: "Multi-Agent Orchestration",
    status: "research",
    href: "#",
  },
  {
    id: "pizza-pronto",
    title: "Pizza Pronto",
    tagline: "Autonomous E-Commerce / Delivery Prototype",
    description:
      "A conceptual e-commerce and delivery prototype built to demonstrate autonomous order routing, real-time tracking, and automated customer interaction inside a food delivery context.",
    technologies: ["Next.js", "AI Agents", "Tailwind CSS"],
    category: "E-Commerce",
    status: "deployed",
    href: "#",
    liveLink: "https://dough-delivery-co.lovable.app/",
    liveLinkText: "View Live Demo",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const standardProjects = projects.filter((p) => !p.featured);

export interface GithubArchive {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  category: "Machine Learning Models" | "Agentic AI Architecture" | "Backend Architecture";
}

export const githubArchives: GithubArchive[] = [
  {
    title: "E-Commerce-Multi-Agent-Ops",
    description: "Next.js and LangGraph multi-agent architecture for e-commerce operations.",
    techStack: ["LangGraph", "Next.js", "Multi-Agent"],
    githubUrl: "https://github.com/faiz0304/E-Commerce-Multi-Agent-Ops-LangGraph-Next-Js",
    category: "Agentic AI Architecture",
  },
  {
    title: "Customer-Support-Chatbot",
    description: "Stateful customer support orchestration using LangGraph.",
    techStack: ["LangGraph", "Customer Support"],
    githubUrl: "https://github.com/faiz0304/Customer-Support-Chatbot-LangGraph",
    category: "Agentic AI Architecture",
  },
  {
    title: "Amazon-Bedrock-Chatbot",
    description: "AI agent integrated with Amazon Agentcore and Bedrock.",
    techStack: ["AWS Bedrock", "Agentcore"],
    githubUrl: "https://github.com/faiz0304/Amaozon-Agentcore-Bedrock/tree/main/Chatbot%20AI%20Agent",
    category: "Agentic AI Architecture",
  },
  {
    title: "Crypto-AI-Agent",
    description: "Autonomous bot for cryptocurrency logic and tracking.",
    techStack: ["Crypto", "AI Agent"],
    githubUrl: "https://github.com/faiz0304/Crypto-AI-Agent-Bot",
    category: "Agentic AI Architecture",
  },
  {
    title: "Celebrity-Face-Recognition",
    description: "Computer vision pipeline for identifying celebrity facial features.",
    techStack: ["Computer Vision", "Classification"],
    githubUrl: "https://github.com/faiz0304/Machine-Learning/tree/main/Celebrity_Face_Recognition",
    category: "Machine Learning Models",
  },
  {
    title: "Real-Estate-Price-Prediction",
    description: "Regression models predicting real estate market valuations.",
    techStack: ["Regression", "Scikit-Learn"],
    githubUrl: "https://github.com/faiz0304/Machine-Learning/tree/main/Real_State_Price_Prediction",
    category: "Machine Learning Models",
  },
  {
    title: "Cat-Dog-Classifier",
    description: "Deep learning image classification neural network.",
    techStack: ["Deep Learning", "CNN"],
    githubUrl: "https://github.com/faiz0304/Cat-Dog-Classifier",
    category: "Machine Learning Models",
  },
  {
    title: "Machine-Learning-Core",
    description: "Master repository for foundational ML scripts and notebooks.",
    techStack: ["Jupyter", "Python", "Algorithms"],
    githubUrl: "https://github.com/faiz0304/Machine-Learning",
    category: "Machine Learning Models",
  },
  {
    title: "Research-Newspaper-Agent",
    description: "Autonomous LangChain agent designed to aggregate data and synthesize it into formatted research articles.",
    techStack: ["LangChain", "Agents", "Research"],
    githubUrl: "https://github.com/faiz0304/Langchain/tree/main/Research_NewsPaper_Agent",
    category: "Agentic AI Architecture",
  },
  {
    title: "Retrieval-QA-Chatbot",
    description: "RAG-powered conversational interface for querying and retrieving information from custom knowledge bases.",
    techStack: ["LangChain", "RAG", "QA System"],
    githubUrl: "https://github.com/faiz0304/Langchain/tree/main/Retreival_QA_ChatBot",
    category: "Agentic AI Architecture",
  },
  {
    title: "FastAPI-Product-Management",
    description: "High-performance, versioned backend API architecture for product management operations.",
    techStack: ["FastAPI", "Python", "Backend API"],
    githubUrl: "https://github.com/faiz0304/FastAPI/tree/main/Product_Management_APP_V3/Version_03",
    category: "Backend Architecture",
  },
];

export default projects;
