import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import type { ResumeData } from "@/components/resume-templates/index";

/* ── Allow 60 s for the edit AI call ──────────────────────── */
export const maxDuration = 60;

/* ── NDJSON chunk types ────────────────────────────────────── */
type EditChunk =
  | { type: "status"; message: string }
  | { type: "patch"; data: Partial<ResumeData>; patchedFields: string[] }
  | { type: "error"; message: string };

function encodeChunk(obj: EditChunk): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(obj) + "\n");
}

function delay(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

/* ─────────────────────────────────────────────────────────────
   System prompt for surgical JSON patch generation
   ─────────────────────────────────────────────────────────────*/
function buildEditSystemPrompt(currentResumeJson: ResumeData): string {
  return `
You are an expert Resume Editor with surgical precision. You work on a live resume JSON state.

════════════════════════════════════════════════════
CURRENT RESUME STATE (read-only reference)
════════════════════════════════════════════════════
${JSON.stringify(currentResumeJson, null, 2)}

════════════════════════════════════════════════════
YOUR TASK
════════════════════════════════════════════════════
The user will give you a vibe instruction — a natural language command to edit their resume.
Your job: return ONLY the fields that need to change, as a valid JSON object.

════════════════════════════════════════════════════
OPERATION TYPES & EXAMPLES
════════════════════════════════════════════════════

UPDATE TEXT:
  Instruction: "make the summary sound more ambitious"
  Output: {"summary": "...rewritten summary text..."}

UPDATE TONE/CONTENT:
  Instruction: "make it sound more leadership-focused"
  Output: {"summary": "...", "strengths": [...updated array...]}

REORDER:
  Instruction: "put the most AI-relevant projects first"
  Output: {"projects": [...reordered complete array...]}

HIGHLIGHT / EMPHASIZE:
  Instruction: "highlight Python and LangGraph first in skills"
  Output: {"technicalSkills": {"programmingAndData": ["Python", "LangGraph", ...rest...]}}

DELETE A SECTION:
  Instruction: "remove the strengths section"
  Output: {"strengths": []}

DELETE AN ITEM:
  Instruction: "remove the last project"
  Output: {"projects": [...all projects except last...]}

REPHRASE DESCRIPTIONS:
  Instruction: "make the project descriptions more concise"
  Output: {"projects": [...all projects with updated descriptions...]}

════════════════════════════════════════════════════
STRICT RULES
════════════════════════════════════════════════════
RULE 1 — Surgical: Return ONLY the fields that changed. Never include unchanged fields.
RULE 2 — Immutability: NEVER modify or return the "basics" field (name, email, location, etc.).
RULE 3 — No fabrication: Never invent skills, experiences, or achievements not already in the current resume.
RULE 4 — Complete arrays: When modifying any array (projects, strengths, etc.), return the COMPLETE updated array.
RULE 5 — Output format: Return ONLY valid JSON. No markdown code fences. No explanation. No preamble.
RULE 6 — Nullability: For deletions, use an empty array [] not null.

════════════════════════════════════════════════════
VALID TOP-LEVEL PATCH FIELDS
════════════════════════════════════════════════════
summary, education, technicalSkills, projects, strengths, continuousLearning

FORBIDDEN: basics (immutable), template, templateReason
`.trim();
}

/* ── POST /api/resume/edit ──────────────────────────────────── */
export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ type: "error", message: "GROQ_API_KEY is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let currentResumeJson: ResumeData;
  let userInstruction: string;

  try {
    const body = await req.json();
    currentResumeJson = body?.currentResumeJson;
    userInstruction   = body?.userInstruction ?? "";

    if (!currentResumeJson || !userInstruction.trim()) {
      return new Response(
        JSON.stringify({ type: "error", message: "currentResumeJson and userInstruction are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
  } catch {
    return new Response(
      JSON.stringify({ type: "error", message: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  /* ── NDJSON streaming response ──────────────────────────── */
  const stream = new ReadableStream({
    async start(controller) {
      const emit = (chunk: EditChunk) => controller.enqueue(encodeChunk(chunk));

      try {
        emit({ type: "status", message: "Parsing your vibe instruction..." });
        await delay(300);

        emit({ type: "status", message: "Identifying resume fields to update..." });

        const groq = createGroq({ apiKey });

        /* Non-blocking LLM call — fire before emitting further status messages */
        const llmPromise = generateText({
          model: groq("llama-3.3-70b-versatile"),
          system: buildEditSystemPrompt(currentResumeJson),
          prompt: `USER VIBE INSTRUCTION:\n\n"${userInstruction.trim()}"`,
          temperature: 0.2,
        });

        await delay(600);
        emit({ type: "status", message: "Applying surgical edit to resume state..." });

        /* Await AI result */
        const result = await llmPromise;
        const rawText = result.text.trim();

        emit({ type: "status", message: "Validating patch structure..." });
        await delay(150);

        /* ── Parse patch JSON ──────────────────────────── */
        let patch: Partial<ResumeData>;
        try {
          const cleaned = rawText
            .replace(/^```(?:json)?\n?/, "")
            .replace(/\n?```$/, "")
            .trim();
          patch = JSON.parse(cleaned) as Partial<ResumeData>;
        } catch {
          emit({ type: "error", message: "AI returned invalid JSON patch. Please rephrase your instruction and try again." });
          controller.close();
          return;
        }

        /* ── Guard: strip basics if AI hallucinated it ── */
        if ("basics" in patch) {
          delete (patch as Record<string, unknown>)["basics"];
        }

        /* ── Extract which fields were actually patched ─ */
        const patchedFields = Object.keys(patch);

        if (patchedFields.length === 0) {
          emit({ type: "error", message: "The AI couldn't identify any fields to update. Try rephrasing your instruction." });
          controller.close();
          return;
        }

        emit({ type: "patch", data: patch, patchedFields });

      } catch (err) {
        console.error("[Resume Edit API] Error:", err);
        const message = err instanceof Error ? err.message : "Unknown error occurred.";
        emit({ type: "error", message: `Edit engine error: ${message}` });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
