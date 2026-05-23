export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export const SYSTEM_CAPABILITIES: SkillCategory[] = [
  {
    id: "ai-agentic",
    label: "AI Models & Agentic Workflows",
    skills: ["Claude Code", "Claude Code CLI", "Claude CoWork", "ChatGPT", "ChatGPT for Developers", "Google Gemini", "Google Antigravity", "OpenClaw", "HiClaw", "QwenPaw", "Manus", "Perplexity"],
  },
  {
    id: "ml-data-science",
    label: "Machine Learning & Data Science",
    skills: ["Machine Learning (Supervised & Unsupervised)", "Data Scientist", "Model Evaluation", "Data Processing", "Numpy", "Pandas", "Seaborn", "Matplotlib"],
  },
  {
    id: "dev-os",
    label: "Development Environment & OS",
    skills: ["VS Code", "Cursor", "Linux", "Ubuntu"],
  },
  {
    id: "frameworks-utils",
    label: "Frameworks & Core Utilities",
    skills: ["Streamlit", "JSON", "Markdown", "File Handling"],
  },
  {
    id: "productivity-docs",
    label: "Productivity & Documentation",
    skills: ["MS Office", "Word", "Excel", "PowerPoint"],
  },
  {
    id: "cognitive-architecture",
    label: "Cognitive Architecture (Core Traits)",
    skills: ["Analytical Mindset", "Strong Academic Discipline", "Long-Term Strategic Thinking", "Honest & Goal Oriented", "Self-Driven Learner", "Problem Decomposition", "Logic Building"],
  },
];
