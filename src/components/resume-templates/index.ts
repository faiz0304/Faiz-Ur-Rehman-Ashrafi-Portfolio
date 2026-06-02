/**
 * Resume Template Registry
 *
 * Central registry mapping each TemplateId to its React component,
 * metadata, and preview style. Import TEMPLATE_REGISTRY to dynamically
 * resolve which component to render based on the AI's selection.
 */

import type { ComponentType } from "react";

// ─── Shared Data Types ────────────────────────────────────────────────────────
// These mirror the shape of FAIZ_RESUME_DATA exactly so the AI-returned JSON
// can be cast to ResumeData without transformation.

export interface Basics {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  profilePicture: string;
}

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
  name: string;
  title: string;
  description: string;
  githubLink: string | null;
  techStack: string[];
  tags: string[];
}

export interface StrengthEntry {
  trait: string;
  detail: string;
}

export interface ResumeData {
  basics: Basics;
  summary: string;
  education: EducationEntry[];
  technicalSkills: TechnicalSkills;
  projects: ProjectEntry[];
  strengths: StrengthEntry[];
  continuousLearning: string[];
  profileImageUrl?: string;
}

// ─── Template ID Union ────────────────────────────────────────────────────────

export type TemplateId =
  | "minimalist"
  | "photoMinimalist"
  | "agentic"
  | "executivePhoto"
  | "modern"
  | "creativeModern"
  | "vibe"
  | "academic";

export const TEMPLATE_IDS: TemplateId[] = [
  "minimalist",
  "photoMinimalist",
  "agentic",
  "executivePhoto",
  "modern",
  "creativeModern",
  "vibe",
  "academic",
];

// ─── Registry Entry Shape ─────────────────────────────────────────────────────

export interface TemplateRegistryEntry {
  id: TemplateId;
  label: string;
  tagline: string;
  bestFor: string;
  accentColor: string;       // CSS color used in picker card ring
  previewStyle: "dark" | "light" | "split" | "gradient" | "serif";
  component: ComponentType<{ data: ResumeData }>;
}

// ─── Lazy-loaded components (avoid circular imports) ─────────────────────────
// Using dynamic component references — each template file exports a named fn.

import { MinimalistTemplate } from "./Minimalist";
import { PhotoMinimalistTemplate } from "./PhotoMinimalist";
import { AgenticTemplate }    from "./Agentic";
import { ExecutivePhotoTemplate } from "./ExecutivePhoto";
import { ModernTemplate }     from "./Modern";
import { CreativeModernTemplate } from "./CreativeModern";
import { VibeTemplate }       from "./Vibe";
import { AcademicTemplate }   from "./Academic";

// ─── TEMPLATE_REGISTRY ───────────────────────────────────────────────────────

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateRegistryEntry> = {
  minimalist: {
    id: "minimalist",
    label: "Minimalist",
    tagline: "Clean, ATS-safe, timeless",
    bestFor: "Corporate · Finance · Legal",
    accentColor: "#374151",
    previewStyle: "light",
    component: MinimalistTemplate,
  },
  photoMinimalist: {
    id: "photoMinimalist",
    label: "Photo Minimalist",
    tagline: "Traditional elegance with photo",
    bestFor: "Corporate · Consulting · Legal",
    accentColor: "#4B5563",
    previewStyle: "light",
    component: PhotoMinimalistTemplate,
  },
  agentic: {
    id: "agentic",
    label: "Agentic",
    tagline: "Cyber-tech · Terminal aesthetic",
    bestFor: "AI/ML · DevOps · Cybersecurity",
    accentColor: "#00F0FF",
    previewStyle: "dark",
    component: AgenticTemplate,
  },
  executivePhoto: {
    id: "executivePhoto",
    label: "Executive Photo",
    tagline: "Elite formal leadership layout",
    bestFor: "Executive · Director · Manager",
    accentColor: "#1E3A8A",
    previewStyle: "light",
    component: ExecutivePhotoTemplate,
  },
  modern: {
    id: "modern",
    label: "Modern",
    tagline: "Two-column · Structured clarity",
    bestFor: "SWE · Product · Design",
    accentColor: "#7C3AED",
    previewStyle: "split",
    component: ModernTemplate,
  },
  creativeModern: {
    id: "creativeModern",
    label: "Creative Modern",
    tagline: "Vibrant visual portfolio layout",
    bestFor: "Designer · Product · Tech",
    accentColor: "#EC4899",
    previewStyle: "split",
    component: CreativeModernTemplate,
  },
  vibe: {
    id: "vibe",
    label: "Vibe",
    tagline: "Bold gradients · High impact",
    bestFor: "Startups · Creative Tech",
    accentColor: "#EC4899",
    previewStyle: "gradient",
    component: VibeTemplate,
  },
  academic: {
    id: "academic",
    label: "Academic",
    tagline: "Formal CV · Publication-ready",
    bestFor: "Research · Academia · PhD",
    accentColor: "#1e3a5f",
    previewStyle: "serif",
    component: AcademicTemplate,
  },
};

// ─── NDJSON Stream Types (shared client ↔ server contract) ───────────────────

export interface StreamStatusChunk {
  type: "status";
  message: string;
}

export interface StreamDoneChunk {
  type: "done";
  data: {
    template: TemplateId;
    templateReason: string;
    resumeData: ResumeData;
  };
}

export interface StreamErrorChunk {
  type: "error";
  message: string;
}

export type StreamChunk = StreamStatusChunk | StreamDoneChunk | StreamErrorChunk;
