import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

async function run() {
  const result = await streamText({
    model: createGroq({ apiKey: 'dummy' })('llama-3.1-8b-instant'),
    messages: [{ role: 'user', content: 'hello' }]
  });
  
  let obj = result;
  const methods = new Set();
  while (obj) {
    const keys = Object.getOwnPropertyNames(obj);
    keys.forEach(k => methods.add(k));
    obj = Object.getPrototypeOf(obj);
  }
  console.log("ALL METHODS:", Array.from(methods).filter(k => typeof (result as any)[k] === 'function'));
}
run().catch(console.error);
