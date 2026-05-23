import { createGroq } from "@ai-sdk/groq";
import { streamText, createTextStreamResponse } from "ai";
import { FAIZ_RESUME_DATA } from "@/data/resumeData";

/* ── Allow streaming responses up to 30 seconds ──────────── */
export const maxDuration = 30;

/* ─────────────────────────────────────────────────────────────
   System prompt injected with the full immutable profile data.
   The model may tailor ordering/emphasis but MUST NOT invent.
   ─────────────────────────────────────────────────────────────*/
function buildSystemPrompt(): string {
  const { basics, summary, education, technicalSkills, projects, strengths } =
    FAIZ_RESUME_DATA;

  const profilePayload = JSON.stringify(
    { basics, summary, education, technicalSkills, projects, strengths },
    null,
    2,
  );

  return `
You are an elite ATS-Optimization Agent. You have been provided with Faiz Ur Rehman Ashrafi's immutable career data (FAIZ_RESUME_DATA). You are strictly forbidden from inventing, hallucinating, or assuming any skills, degrees, or experiences not explicitly present in this JSON.

════════════════════════════════════════════
VERIFIED PROFILE DATA  (Source of Truth)
════════════════════════════════════════════
${profilePayload}

════════════════════════════════════════════
YOUR TASK
════════════════════════════════════════════
Analyze the user-provided Job Description (JD). Your task is to rewrite Faiz's Professional Summary and reorder/highlight his Project bullet points to directly mirror the vocabulary, tone, and priorities of the JD.

════════════════════════════════════════════
STRICT RULES
════════════════════════════════════════════
RULE 1  The Immutable Rule: You are strictly forbidden from inventing, hallucinating, or assuming any skills, degrees, or experiences not explicitly present in this JSON.

RULE 2  The Optimization Directive: Analyze the user-provided Job Description (JD). Your task is to rewrite Faiz's Professional Summary and reorder/highlight his Project bullet points to directly mirror the vocabulary, tone, and priorities of the JD.

RULE 3  The Skill Matrix Alignment: If the JD asks for Python and LangChain, ensure those tags are moved to the front of his Skills section and explicitly mentioned in the summary.

RULE 4  Format Constraints: Output MUST be in clean, structural Markdown (using H1, H2, bullet points, and bold text). Do not include conversational filler like "Here is your resume." Start immediately with his Name and Title.
`.trim();
}

/* ── POST /api/resume ───────────────────────────────────────── */
export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "[Resume API] GROQ_API_KEY is not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => null);
    const jdText: string | undefined = body?.prompt;

    if (!jdText?.trim()) {
      return new Response(
        JSON.stringify({ error: "A Job Description is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const groq = createGroq({ apiKey });

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),   // 70B for higher-quality tailoring
      system: buildSystemPrompt(),
      prompt: `TARGET JOB DESCRIPTION:\n\n${jdText.trim()}`,
      temperature: 0.1,   // strict enforcement of no hallucinations
    });

    /* useCompletion(streamProtocol:"text") expects a plain text/plain stream */
    return createTextStreamResponse({ textStream: result.textStream });

  } catch (err) {
    console.error("[Resume API] Unhandled error:", err);
    return new Response(
      JSON.stringify({ error: "Optimization engine offline. Try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
