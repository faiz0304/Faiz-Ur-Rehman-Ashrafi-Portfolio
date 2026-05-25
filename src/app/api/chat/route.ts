import { streamText, createUIMessageStreamResponse } from 'ai';
import { groq } from '@ai-sdk/groq';
import { CREDENTIALS_DATA } from '@/data/credentialsData';

export async function POST(req: Request) {
  try {
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

    const faizKnowledgeBase = CREDENTIALS_DATA.map(c => ({
      title: c.title,
      institute: c.institute,
      status: c.status,
      cgpa: c.cgpa,
      gpaRecords: c.gpaRecords || "No semester records",
      instructors: c.instructors?.map(i => i.name).join(', ') || "None",
      faculty: c.faculty?.map(f => f.name).join(', ') || "None",
    }));

    const dynamicSystemPrompt = `
You are AURA, the personal AI assistant for Faiz Ur Rehman Ashrafi. Faiz is an Agentic AI Architect and System Design Engineer based in Karachi.

Here is Faiz's verified record:
${JSON.stringify(faizKnowledgeBase)}

CRITICAL INSTRUCTIONS:
1. Answer strictly using the JSON data above. Do not hallucinate.
2. Keep it conversational, short, and professional.
3. If the user asks in Roman Urdu (e.g. "kya name ha"), reply naturally in Roman Urdu.
    `;

    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: coreMessages,
      system: dynamicSystemPrompt,
    });

    return createUIMessageStreamResponse({
      stream: result.toUIMessageStream()
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
