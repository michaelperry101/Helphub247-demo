// app/api/chat/route.js
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs"; // use Node runtime (more forgiving for env vars)

export async function POST(req) {
  try {
    // 1) Guard env
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY missing at runtime");
      return NextResponse.json(
        { error: "Server misconfig: missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 2) Parse incoming messages (from the chat UI)
    const body = await req.json().catch(() => ({}));
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const userText =
      typeof body?.text === "string" && !messages.length ? body.text : null;

    const chatMessages =
      messages.length > 0
        ? messages
        : [
            { role: "system", content: systemPrompt },
            { role: "user", content: userText || "Say hello as Carys." },
          ];

    // 3) Call OpenAI (pick a stable, available model)
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // solid, cost-effective. (There is no public "gpt-5".)
      temperature: 0.6,
      messages: [
        { role: "system", content: systemPrompt },
        ...chatMessages.filter((m) => m.role !== "system"),
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Carys API error:", err);
    // surface concise reason to client for easier debugging
    return NextResponse.json(
      {
        error:
          err?.response?.data?.error?.message ||
          err?.message ||
          "Unknown error contacting OpenAI",
      },
      { status: 500 }
    );
  }
}

const systemPrompt = `
You are **Carys** — Conversational Assistant for Responsive Yielding Solutions.
Tone: warm, succinct, UK English. Never invent legal, medical, or financial facts.
When you don't know, say so briefly and offer a next step. Keep replies mobile-friendly.
`;
