import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { FAIZ_RESUME_DATA } from "@/data/resumeData";
import type { TemplateId, StreamChunk } from "@/components/resume-templates/index";

/* ── Allow up to 60 seconds for JSON generation ────────────── */
export const maxDuration = 60;

/* ── Helper: emit a newline-delimited JSON chunk ────────────── */
function encodeChunk(obj: StreamChunk): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(obj) + "\n");
}

/* ── Helper: non-blocking delay ─────────────────────────────── */
function delay(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

/* ─────────────────────────────────────────────────────────────
   System prompt — instructs the model to output structured JSON
   with a selected template, reason, and full resume payload.
   ─────────────────────────────────────────────────────────────*/
function buildSystemPrompt(templateId: TemplateId | "auto"): string {
  const { basics, summary, education, technicalSkills, projects, strengths, continuousLearning } =
    FAIZ_RESUME_DATA;

  const profilePayload = JSON.stringify(
    { basics, summary, education, technicalSkills, projects, strengths, continuousLearning },
    null,
    2,
  );

  const templateInstruction =
    templateId === "auto"
      ? `TEMPLATE SELECTION: Analyze the job description and pick the BEST template from the 5 options. Use your judgment about the role's industry, seniority, and company culture.`
      : `TEMPLATE SELECTION: The user has manually selected "${templateId}". Use this template. Still write a templateReason explaining why it is a good fit.`;

  return `
You are an expert Resume Architect and ATS Optimization Agent.

════════════════════════════════════════════════════
VERIFIED PROFILE DATA  (Immutable Source of Truth)
════════════════════════════════════════════════════
${profilePayload}

════════════════════════════════════════════════════
AVAILABLE TEMPLATES
════════════════════════════════════════════════════
- "minimalist"     → Corporate, finance, legal. Clean, white, ATS-safe, single-column. Optionally renders photo.
- "photoMinimalist"→ Traditional elegance with a dedicated profile picture on the top-right. Best for corporate/finance/legal roles.
- "agentic"        → AI/ML, DevOps, cybersecurity, startups. Dark cyber aesthetic, terminal-style. Optionally renders photo in sidebar.
- "executivePhoto" → Executive, director, or senior leadership roles. Classic formal layout with a prominent photo on the top-left and grid of details.
- "modern"         → SWE, product, UX. Two-column, structured, violet/indigo accents. Optionally renders photo in sidebar.
- "creativeModern" → Creative developer, designer, or startup roles. Vibrant gradient highlights with a circular profile picture at the top of the left sidebar.
- "vibe"           → Creative tech, design-adjacent, seed-stage startups. Bold gradient, high-impact.
- "academic"       → Research, PhDs, faculty, data science R&D. Formal LaTeX-inspired CV.

${templateInstruction}

════════════════════════════════════════════════════
YOUR TASK
════════════════════════════════════════════════════
1. Analyze the target job description.
2. Select the best template (or confirm the user's choice) out of the 8 available options.
3. Rewrite the Professional Summary to directly mirror the JD's vocabulary, tone, and priorities.
4. Reorder projects to put the most JD-relevant ones first.
5. Reorder technicalSkills arrays to highlight the most JD-relevant skills first.
6. Keep ALL other fields (basics, education, strengths, continuousLearning) EXACTLY as provided.

════════════════════════════════════════════════════
STRICT RULES
════════════════════════════════════════════════════
RULE 1 — Immutability: NEVER invent, hallucinate, or assume any skill, degree, or experience not in the profile.
RULE 2 — Basics: Keep name, email, location, linkedin, github, profilePicture EXACTLY as provided.
RULE 3 — Output Format: Return ONLY a single valid JSON object. No markdown. No code fences. No preamble. No trailing text.
RULE 4 — JSON Schema: Your output MUST exactly match this shape:

{
  "template": "<one of: minimalist | photoMinimalist | agentic | executivePhoto | modern | creativeModern | vibe | academic>",
  "templateReason": "<1-2 sentences: why this template is the optimal choice for this specific job>",
  "resumeData": {
    "basics": { "name": "...", "title": "...", "email": "...", "linkedin": "...", "github": "...", "location": "...", "profilePicture": "..." },
    "summary": "<rewritten summary — 3-5 sentences, JD-optimised, no fabrication>",
    "education": [ { "degree": "...", "institution": "...", "year": "...", "gpa": "...", "honors": "...", "detail": "..." } ],
    "technicalSkills": {
      "programmingAndData": [...],
      "databases": [...],
      "frameworks": [...],
      "aiAndMl": [...],
      "engineering": [...],
      "tools": [...]
    },
    "projects": [
      {
        "name": "...",
        "title": "...",
        "description": "<refined for JD — still factual>",
        "githubLink": "...",
        "techStack": [...],
        "tags": [...]
      }
    ],
    "strengths": [ { "trait": "...", "detail": "..." } ],
    "continuousLearning": [...]
  }
}

RULE 5 — Fallback Layout: If the user hasn't provided a profile image, the layout must adjust gracefully so that content shifts to fill any gaps.
RULE 6 — Nullability: For deletions, use an empty array [] not null.
RULE 7 — Selection Set: When picking the best template, pick strictly from the 8 available options listed above.
`.trim();
}

/* ── POST /api/resume ───────────────────────────────────────── */
export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ type: "error", message: "GROQ_API_KEY is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let jdText: string;
  let templateId: TemplateId | "auto";

  try {
    const body = await req.json();
    jdText = body?.prompt ?? "";
    templateId = body?.templateId ?? "auto";
    if (!jdText.trim()) {
      return new Response(
        JSON.stringify({ type: "error", message: "A Job Description is required." }),
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
      const emit = (chunk: StreamChunk) => controller.enqueue(encodeChunk(chunk));

      try {
        /* ── Phase 1: Status updates while LLM warms up ─── */
        emit({ type: "status", message: "Connecting to Resume AI Engine..." });
        await delay(350);

        emit({ type: "status", message: "Analyzing job description..." });

        /* ── Phase 2: LLM call (concurrent with status msgs) */
        const groq = createGroq({ apiKey });

        /* Start LLM call (non-blocking Promise) */
        const llmPromise = generateText({
          model: groq("llama-3.3-70b-versatile"),
          system: buildSystemPrompt(templateId),
          prompt: `TARGET JOB DESCRIPTION:\n\n${jdText.trim()}`,
          temperature: 0.15,
        });

        /* Emit status updates while LLM processes */
        await delay(800);
        emit({ type: "status", message: templateId === "auto" ? "Selecting optimal template..." : `Applying ${templateId} template...` });
        await delay(800);
        emit({ type: "status", message: "Tailoring resume content to JD..." });
        await delay(600);
        emit({ type: "status", message: "Refining project descriptions..." });

        /* ── Phase 3: Await LLM result ─────────────────── */
        const result = await llmPromise;
        const rawText = result.text.trim();

        emit({ type: "status", message: "Parsing resume structure..." });
        await delay(200);

        /* ── Phase 4: Parse JSON ───────────────────────── */
        let parsed: {
          template: TemplateId;
          templateReason: string;
          resumeData: object;
        };

        try {
          // Strip markdown code fences if the model wrapped the JSON
          const cleaned = rawText
            .replace(/^```(?:json)?\n?/, "")
            .replace(/\n?```$/, "")
            .trim();
          parsed = JSON.parse(cleaned);
        } catch {
          emit({ type: "error", message: "Failed to parse AI response as JSON. Please try again." });
          controller.close();
          return;
        }

        /* Validate required fields */
        if (!parsed.template || !parsed.resumeData) {
          emit({ type: "error", message: "AI returned an incomplete response. Please retry." });
          controller.close();
          return;
        }

        /* ── Phase 5: Emit done payload ────────────────── */
        emit({ type: "status", message: "Resume ready!" });
        await delay(200);

        emit({
          type: "done",
          data: {
            template: parsed.template as TemplateId,
            templateReason: parsed.templateReason ?? "",
            resumeData: parsed.resumeData as Parameters<typeof emit>[0] extends { type: "done" } ? Parameters<typeof emit>[0]["data"]["resumeData"] : never,
          },
        });

      } catch (err) {
        console.error("[Resume API] Unhandled error:", err);
        const message = err instanceof Error ? err.message : "Unknown error occurred.";
        emit({ type: "error", message: `Optimization engine error: ${message}` });
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
