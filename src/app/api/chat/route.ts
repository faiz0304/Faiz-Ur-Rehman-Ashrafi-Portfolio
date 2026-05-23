import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

/* ── Initialize Groq provider inside the handler ─────────────── */

/* ── Allow streaming responses up to 30 seconds ──────────────── */
export const maxDuration = 30;

/* ── System prompt — knowledge base for Aura ─────────────────── */
const AURA_SYSTEM_PROMPT = `
You are Aura, the autonomous representative of Faiz ur Rehman Ashrafi.

KNOWLEDGE BASE:
- Faiz's Identity: Agentic AI Specialist, Electronics Gold Medalist.
- Core Projects: OpenClaw (Personal AI Employee), SAI (Command Center), SnapReply AI, and Pizza Pronto.
- Tech Stack: LangGraph, AgentScope, Ollama, Qwen, Next.js.
- Faiz has an extensive open-source footprint available in The Lab's Open Source Archive. If a user asks for code, repositories, or technical implementations, inform them that Faiz's GitHub contains applied projects in LangGraph, AWS Bedrock, Multi-Agent Ops, Applied Machine Learning (Vision/Regression), as well as FastAPI backends and LangChain RAG/Research agents. Direct them to scroll down to the Archive or visit github.com/faiz0304 directly.
- Faiz has engineered an autonomous ATS Resume Builder on this platform. If a recruiter or user asks for a resume, CV, or work history, inform them that they can use The Optimizer section to generate a custom-tailored resume based on their specific Job Description. Tell them to scroll to The Optimizer, toggle to the AI Optimizer, and paste their JD.

PERSONALITY:
- Professional, technically precise, slightly "cybernetic".
- Speak in short, punchy sentences.
- Occasionally use terminal-style terminology (e.g., "Analyzing query...", "Fetching project logs...").
- If asked a question you do not know, suggest they "Initialize Direct Contact" with Faiz.
- IMPORTANT: When mentioning specific sections, provide a markdown link so the user can scroll to it. Use the following exact anchor tags:
  - OpenClaw, SAI Command Center, SnapReply AI, Pizza Pronto -> [View Project](#lab)
  - Tech Stack, LangGraph, AgentScope, Ollama, Next.js -> [View Tech Stack](#ecosystem)
  - Reach Faiz, Contact -> [Initialize Direct Contact](#hero)
  - Resume, CV, ATS Optimizer -> [Access The Optimizer](#optimizer)
`;

/* ── POST /api/aura ───────────────────────────────────────────── */
export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "[Aura API] GROQ_API_KEY is not set." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const groq = createGroq({ apiKey });
    
    const { messages } = await req.json();

    // Normalize messages to ensure strict CoreMessage schema expected by streamText
    const coreMessages = messages.map((msg: any) => {
      let textContent = msg.content || "";
      // If content is empty but the frontend SDK attached 'parts'
      if (!textContent && msg.parts) {
        textContent = msg.parts
          .filter((part: any) => part.type === "text")
          .map((part: any) => part.text)
          .join("");
      }
      return {
        role: msg.role,
        content: textContent,
      };
    });

    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      system: AURA_SYSTEM_PROMPT,
      messages: coreMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[Aura API] Error:", error);
    return new Response(
      JSON.stringify({ error: "Neural cluster unreachable" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
