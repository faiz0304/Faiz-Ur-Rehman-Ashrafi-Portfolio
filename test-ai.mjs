import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

async function run() {
  const result = await streamText({
    model: createGroq({ apiKey: 'dummy' })('llama-3.1-8b-instant'),
    messages: [{ role: 'user', content: 'hello' }]
  });
  console.log("has toDataStreamResponse:", typeof result.toDataStreamResponse);
  console.log("has toUIMessageStreamResponse:", typeof result.toUIMessageStreamResponse);
  console.log("has toTextStreamResponse:", typeof result.toTextStreamResponse);
}
run().catch(console.error);
