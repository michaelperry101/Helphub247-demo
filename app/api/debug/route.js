// app/api/debug/route.js
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure server runtime

export async function GET() {
  const raw = process.env.OPENAI_API_KEY || "";
  const masked = raw ? `${raw.slice(0, 3)}...${raw.slice(-4)}` : null;

  return NextResponse.json({
    ok: !!raw,
    present: !!raw,
    maskedKey: masked,            // shows only a tiny part so you can confirm it's set
    runtime: "nodejs",
  });
}
