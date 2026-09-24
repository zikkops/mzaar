import { NextResponse } from "next/server";
import { IDEAS, summaryText, type Selection } from "@/lib/ideas";

const MAX_NAME = 120;
const MAX_NOTE = 4000;
const IDS = new Set(IDEAS.map((i) => i.n));

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.slice(0, max) : "";
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const rawPicked = (body.picked ?? {}) as Record<string, unknown>;
  const rawNotes = (body.notes ?? {}) as Record<string, unknown>;
  const picked: Record<string, boolean> = {};
  const notes: Record<string, string> = {};
  for (const id of IDS) {
    if (rawPicked[id] === true) picked[id] = true;
    const n = clean(rawNotes[id], MAX_NOTE).trim();
    if (n) notes[id] = n;
  }

  const sel: Selection = {
    name: clean(body.name, MAX_NAME).trim(),
    note: clean(body.note, MAX_NOTE).trim(),
    picked,
    notes,
  };

  if (!sel.name) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (!Object.keys(picked).length && !Object.keys(notes).length && !sel.note) {
    return NextResponse.json({ error: "Select at least one idea or leave a comment." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.MAIL_TO || "norka@vipminds.com";
  const from = process.env.MAIL_FROM;
  if (!apiKey || !from) {
    console.error("RESEND_API_KEY or MAIL_FROM is not set");
    return NextResponse.json({ error: "Sending is not configured yet." }, { status: 500 });
  }

  const text = summaryText(sel);
  const count = Object.keys(picked).length;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `BDF × Mzaar selection from ${sel.name} (${count} of ${IDEAS.length} ideas)`,
      text,
      html: `<pre style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return NextResponse.json({ error: "Could not send right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
