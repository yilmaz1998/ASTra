import dotenv from 'dotenv';
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function explainCode(code, issues) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
Code:
${code}

Issues:
${JSON.stringify(issues)}

Explain ONLY based on given issues.

Return JSON:
{
  "summary": "",
  "explanations": [
    {
      "issue": "",
      "why": "",
      "fix": ""
    }
  ]
}
        `.trim(),
      },
    ],
  });

  const content = res.choices[0].message.content;
  return JSON.parse(content);
}