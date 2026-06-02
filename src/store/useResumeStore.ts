/**
 * useResumeStore — Central State Machine (Zustand)
 *
 * Single source of truth for the entire resume editing session.
 * Replaces the scattered local state across resume/page.tsx.
 *
 * Features:
 * - Persistent across template switches (session-only, no localStorage)
 * - Undo stack (max 10 snapshots)
 * - Edit log for displaying recent vibe operations
 * - Surgical patch application with immutable basics guard
 */

import { create } from "zustand";
import type { ResumeData, TemplateId } from "@/components/resume-templates/index";

// ─── Edit Log Entry ───────────────────────────────────────────────────────────

export interface EditLogEntry {
  id: string;
  instruction: string;
  patchedFields: string[];
  timestamp: number;
}

// ─── Store Shape ──────────────────────────────────────────────────────────────

export interface ResumeStoreState {
  /* Core resume data — null before first generation */
  resumeData: ResumeData | null;

  /* Which template component is currently displayed */
  activeTemplate: TemplateId;

  /* Template the AI originally picked */
  aiChosenTemplate: TemplateId | null;

  /* One-liner from AI explaining template choice */
  templateReason: string;

  /* Undo stack: list of previous resumeData snapshots (newest first, max 10) */
  resumeHistory: ResumeData[];

  /* Log of all vibe edit operations this session (newest first, max 20) */
  editLog: EditLogEntry[];

  /* User-provided profile picture URL (or base64 string) */
  profileImageUrl: string | null;
}

export interface ResumeStoreActions {
  /**
   * Called when the generation modal completes. Sets initial resume state.
   */
  initFromGeneration(result: {
    template: TemplateId;
    templateReason: string;
    resumeData: ResumeData;
  }): void;

  /**
   * Switch the displayed template without re-generating.
   * Resume data is preserved.
   */
  setActiveTemplate(id: TemplateId): void;

  /**
   * Apply a surgical patch from the Vibe Editor.
   * Only the changed fields are merged; basics is always immutable.
   * Saves current state to undo stack before applying.
   */
  applyPatch(patch: Partial<ResumeData>, instruction: string, patchedFields?: string[]): void;

  /**
   * Undo the last vibe operation.
   * Restores the previous resumeData snapshot from the undo stack.
   */
  undo(): void;

  /**
   * Clear all resume state. Typically called when the user clicks "Reset".
   */
  reset(): void;

  /**
   * Store or remove the profile image URL, updating the active resume state.
   */
  setProfileImageUrl(url: string | null): void;
}

export type ResumeStore = ResumeStoreState & ResumeStoreActions;

// ─── Deep-merge utility for technicalSkills ──────────────────────────────────

function applyResumePatch(
  current: ResumeData,
  patch: Partial<ResumeData>,
): ResumeData {
  // Start with a shallow spread — replaces top-level fields from patch
  const merged: ResumeData = { ...current, ...patch };

  // IMMUTABILITY GUARD: basics can never be overwritten
  merged.basics = current.basics;

  // technicalSkills is one level deeper — merge sub-arrays individually
  // so AI can return only e.g. { technicalSkills: { programmingAndData: [...] } }
  if (patch.technicalSkills) {
    merged.technicalSkills = {
      ...current.technicalSkills,
      ...patch.technicalSkills,
    };
  }

  // Preserve existing profileImageUrl unless explicitly set in patch
  merged.profileImageUrl = patch.profileImageUrl !== undefined ? patch.profileImageUrl : current.profileImageUrl;

  return merged;
}

// ─── Store Implementation ─────────────────────────────────────────────────────

export const useResumeStore = create<ResumeStore>((set, get) => ({
  /* ── Initial state ───────────────────────────────────── */
  resumeData:        null,
  activeTemplate:    "agentic",
  aiChosenTemplate:  null,
  templateReason:    "",
  resumeHistory:     [],
  editLog:           [],
  profileImageUrl:   null,

  /* ── Actions ─────────────────────────────────────────── */

  initFromGeneration({ template, templateReason, resumeData }) {
    const { profileImageUrl } = get();
    set({
      resumeData: {
        ...resumeData,
        profileImageUrl: profileImageUrl || undefined,
      },
      activeTemplate:   template,
      aiChosenTemplate: template,
      templateReason,
      resumeHistory:    [],   // fresh slate on new generation
      editLog:          [],
    });
  },

  setActiveTemplate(id) {
    set({ activeTemplate: id });
  },

  applyPatch(patch, instruction, patchedFields = Object.keys(patch)) {
    const { resumeData, resumeHistory, editLog } = get();
    if (!resumeData) return;

    const newData = applyResumePatch(resumeData, patch);

    const entry: EditLogEntry = {
      id:            `edit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      instruction,
      patchedFields,
      timestamp:     Date.now(),
    };

    set({
      resumeData:    newData,
      resumeHistory: [resumeData, ...resumeHistory].slice(0, 10),  // max 10 undo levels
      editLog:       [entry, ...editLog].slice(0, 20),             // max 20 log entries
    });
  },

  undo() {
    const { resumeHistory, editLog } = get();
    if (resumeHistory.length === 0) return;

    const [previous, ...rest] = resumeHistory;
    set({
      resumeData:    previous,
      resumeHistory: rest,
      editLog:       editLog.slice(1),   // also removes the last log entry
    });
  },

  reset() {
    set({
      resumeData:       null,
      activeTemplate:   "agentic",
      aiChosenTemplate: null,
      templateReason:   "",
      resumeHistory:    [],
      editLog:          [],
      profileImageUrl:   null,
    });
  },

  setProfileImageUrl(url) {
    const { resumeData } = get();
    set({ profileImageUrl: url });
    if (resumeData) {
      set({
        resumeData: {
          ...resumeData,
          profileImageUrl: url || undefined,
        },
      });
    }
  },
}));
