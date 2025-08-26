// app/api/chat/route.js
export const runtime = 'edge'; // fast & cheap on Vercel Edge

const SYSTEM_PROMPT = `
You are Carys — the "Conversational Assistant for Responsive Yielding Solutions."
Tone: warm, helpful, concise, UK-friendly spelling. 
If user mentions Helphub247, you are their 24/7 online helpline assistant.
Avoid medical/financial/legal specifics; give general guidance + suggest speaking to a professional when appropriate.
`;

export async function POST(req) {
  try {
    const { history = [], input = "", attachments = [] } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'Missing OPENAI_API_KEY' }), { status: 500 });
    }
    if (!input && (!attachments || attachments.length === 0)) {
      return new Response(JSON.stringify({ error: 'No input provided' }), { status: 400 });
    }

    // Build messages (keep short history)
    const messages = [
      { role: "system", content: SYSTEM_PROMPT.trim() },
      ...history.slice(-10), // last 10 turns to keep token use low
      { role: "user", content: input || "(attachment)" },
    ];

    // NOTE: basic text reply (no streaming) for simplicity & reliability
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages,
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return new Response(JSON.stringify({ error: err || 'OpenAI error' }), { status: 500 });
    }

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn’t generate a response.";
    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), { status: 500 });
  }
}
