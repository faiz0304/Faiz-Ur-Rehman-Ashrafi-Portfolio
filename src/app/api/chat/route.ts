import { streamText, createUIMessageStreamResponse } from 'ai';
import { groq } from '@ai-sdk/groq';
import { CREDENTIALS_DATA } from '@/data/credentialsData';
import { FAIZ_RESUME_DATA } from '@/data/resumeData';
import { githubArchives, featuredProjects, standardProjects } from '@/data/projects';

/* ═══════════════════════════════════════════════════════════
   AURA Chat Route — Smart Knowledge Injection
   Uses compact structured TS data only to stay within
   Groq free-tier TPM limits (~12,000 tokens).
   Model: llama-3.1-8b-instant (high TPM on free tier)
   ═══════════════════════════════════════════════════════════ */

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Normalize messages: handle 'parts' format from AI SDK
    const coreMessages = messages.map((msg: any) => {
      let textContent = msg.content || "";
      if (!textContent && msg.parts) {
        textContent = msg.parts
          .filter((p: any) => p.type === "text")
          .map((p: any) => p.text)
          .join("");
      }
      return { role: msg.role, content: textContent };
    });

    // ── Basics ───────────────────────────────────────────────
    const { basics, summary, education, strengths, continuousLearning } = FAIZ_RESUME_DATA;
    const { technicalSkills } = FAIZ_RESUME_DATA;

    // ── Compact Credentials ──────────────────────────────────
    const credBlock = CREDENTIALS_DATA.map(c => {
      const parts: string[] = [
        `[${c.title}] @ ${c.institute} (${c.campus}) | ${c.duration} | ${c.status}`,
      ];
      if (c.cgpa)          parts.push(`CGPA: ${c.cgpa}/4.00`);
      if (c.awards)        parts.push(`Awards: ${c.awards.join(', ')}`);
      if (c.certification) parts.push(`Cert: ${c.certification}`);
      if (c.links.verification) parts.push(`Verify: ${c.links.verification}`);
      if (c.instructors?.length)
        parts.push(`Instructors: ${c.instructors.map(i => i.name).join(', ')}`);
      if (c.modules?.length)
        parts.push(`Modules (${c.modules.length}): ${c.modules.map(m => m.title).join(' | ')}`);
      if (c.quarters?.length)
        parts.push(`Quarters: ${c.quarters.map(q => `${q.id}="${q.title}" [${q.status}]`).join(' | ')}`);
      if (c.exams?.length)
        parts.push(`Exams: ${c.exams.map(e => `Exam${e.no}: ${e.title} → ${e.result} ${e.score}`).join(' | ')}`);
      if (c.assignments?.length)
        parts.push(`Assignments: ${c.assignments.map(a => a.assignment).join(' | ')}`);
      if (c.resources?.introVideo) parts.push(`Intro Video: ${c.resources.introVideo}`);
      return parts.join('\n  ');
    }).join('\n\n');

    // ── Compact Projects ─────────────────────────────────────
    const featBlock = featuredProjects.map(p =>
      `[${p.title}] ${p.tagline}\n  Stack: ${p.technologies.join(', ')} | Status: ${p.status}` +
      (p.liveLink ? `\n  Live: ${p.liveLink}` : '') +
      (p.architectureHighlights ? `\n  Arch: ${p.architectureHighlights.join(' | ')}` : '') +
      (p.metrics ? `\n  Metrics: ${p.metrics.map(m => `${m.label}=${m.value}`).join(', ')}` : '')
    ).join('\n\n');

    const stdBlock = standardProjects.map(p =>
      `[${p.title}]: ${p.description} | Stack: ${p.technologies.join(', ')} | ${p.status}` +
      (p.liveLink ? ` | Live: ${p.liveLink}` : '')
    ).join('\n');

    const archiveBlock = githubArchives.map(r =>
      `[${r.title}] ${r.category}: ${r.description} | ${r.techStack.join(', ')} | ${r.githubUrl}`
    ).join('\n');

    // ── Pre-university education (from About component) ──────
    const preUni = `
  F.S.C / Intermediate — Govt College Forman Nazimabad, Karachi (2019–2021)
  Matriculation — Islamia English Model School, Karachi (2017–2019)`.trim();

    // ── GPA Records ──────────────────────────────────────────
    const bsRecord = CREDENTIALS_DATA.find(c => c.title.includes('Electronics'));
    const gpaTable = bsRecord?.gpaRecords
      ? bsRecord.gpaRecords.map(r => `${r.semester} sem (${r.term}): ${r.gpa}`).join(' | ')
      : '';

    // ── System Prompt (compact, well under 8K tokens) ────────
    const systemPrompt = `You are AURA, the personal Neural Assistant on Faiz Ur Rehman Ashrafi's portfolio.
Answer questions about Faiz accurately using ONLY the verified data below. Never invent facts.

═══════ IDENTITY ═══════
Name: ${basics.name}
Title: ${basics.title}
Location: ${basics.location}
Email: ${basics.email}
GitHub: https://${basics.github}
LinkedIn: https://${basics.linkedin}
YouTube: https://youtube.com/@FaizCodesAI

Summary: ${summary}

═══════ FORMAL EDUCATION ═══════
${education.map(e =>
  `${e.degree} — ${e.institution} (${e.year})\nCGPA: ${e.gpa} | ${e.honors || ''}\n${e.detail || ''}`
).join('\n')}
Semester GPA: ${gpaTable}

Pre-university:
${preUni}

═══════ ALL COURSES & TRAINING ═══════
${credBlock}

═══════ TECHNICAL SKILLS ═══════
Programming: ${technicalSkills.programmingAndData.join(', ')}
Databases: ${technicalSkills.databases.join(', ')}
Frameworks: ${technicalSkills.frameworks.join(', ')}
AI & ML: ${technicalSkills.aiAndMl.join(', ')}
Engineering: ${technicalSkills.engineering.join(', ')}
Tools: ${technicalSkills.tools.join(', ')}

═══════ FEATURED PROJECTS ═══════
${featBlock}

═══════ OTHER PROJECTS ═══════
${stdBlock}

═══════ GITHUB ARCHIVE (11 REPOS) ═══════
${archiveBlock}

═══════ STRENGTHS ═══════
${strengths.map(s => `${s.trait}: ${s.detail}`).join('\n')}

═══════ CONTINUOUS LEARNING ═══════
${continuousLearning.join('\n')}

═══════ BEHAVIORAL RULES ═══════
1. Only use data above — never fabricate.
2. Be concise, warm, professional. Max 3-4 short paragraphs unless user asks for full detail.
3. Use **bold** for names/titles. Use bullet lists naturally.
4. Include real URLs when mentioning repos, profiles, or live demos.
5. Roman Urdu input → respond in Roman Urdu naturally.
6. Navigate hints: tell users which portfolio section to visit (The Lab, Ecosystem, Contact, etc.).
7. CGPA fact: 3.96/4.00 overall. Gold Medalist — first in his family.
8. PIAIC: Currently in Q2 (AI-151) started June 2026. Passed Q1 (AI-101). Best exam: 83.08%.
9. SMIT: Completed 9-month Agentic AI course at S.M.I.T (Saylani), finished May 2026.
10. SMIT teachers: Sir Muhammad Danial Siddiqui and Sir Abu Bakar.
11. PIAIC teachers: Sir Aneeq Khatri and Sir Hamza Syed. Director: Sir Zia Khan (COO PIAIC, 8x Microsoft MVP).
12. BTA teacher: Sir Muhammad Tahir Ashraf (all BTA courses).
13. Panaversity AI-50 instructors: M. Junaid Shaukat (CTO), Wania Kazmi (Chief Agentic AI Officer), M. Rehan ul Haq (Chief AI Officer).
14. ATS Resume: direct users to the "GENERATE ATS RESUME" button on the hero section.`.trim();

    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: coreMessages,
      system: systemPrompt,
    });

    return createUIMessageStreamResponse({
      stream: result.toUIMessageStream()
    });
  } catch (error: any) {
    console.error('Chat API Error:', error?.message || error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
