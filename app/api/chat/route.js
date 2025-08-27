import { NextResponse } from "next/server";
import OpenAI from "openai";

// Make sure OPENAI_API_KEY is set in Netlify/Vercel env
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// (Optional) avoid static optimization on some hosts
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    const reply =
      (completion.choices?.[0]?.message?.content || "").trim() ||
      "I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Carys API error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}

// Simple health check to confirm the route is wired
export async function GET() {
  return NextResponse.json({ ok: true });
}
