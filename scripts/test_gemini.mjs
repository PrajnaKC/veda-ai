import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '.env.local' });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI_API_KEY missing');
  process.exit(2);
}

const client = new GoogleGenAI({ apiKey });
const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

async function run() {
  try {
    const response = await client.models.generateContent({
      model,
      contents: 'Explain how AI works in a few words'
    });

    console.log(response.text);
    process.exit(0);
  } catch (e) {
    console.error('GEN_API_ERROR', e?.message || e);
    process.exit(1);
  }
}

run();
