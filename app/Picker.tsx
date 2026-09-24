"use client";

import { useEffect, useRef, useState } from "react";
import { ICONS, IDEAS, summaryText, type Idea } from "@/lib/ideas";

const STORAGE_KEY = "mzaar-picker";
type Status = "idle" | "sending" | "sent" | "error";

function IdeaCard({
  idea, on, note, onToggle, onNote,
}: { idea: Idea; on: boolean; note: string; onToggle: () => void; onNote: (v: string) => void }) {
  const [noPhoto, setNoPhoto] = useState(false);
  return (
    <article className={"idea" + (on ? " on" : "")} id={`idea-${idea.n}`}>
      <div className="num">{idea.n}</div>
      <div>
        <span className={`tag ${idea.tag}`}>{idea.tagText}</span>
        <h3>{idea.title}</h3>
      </div>
      <figure className={"visual" + (noPhoto ? " nophoto" : "")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/img/${idea.n}.jpg`} alt={idea.alt} onError={() => setNoPhoto(true)} />
        <div className="ph">
          <span dangerouslySetInnerHTML={{ __html: ICONS[idea.n] }} />
          <span>{idea.alt}</span>
        </div>
      </figure>
      <p>{idea.text}</p>
      <div className="gives">
        <div><b>Mzaar brings</b>{idea.mzaar}</div>
        <div><b>BDF brings</b>{idea.bdf}</div>
      </div>
      <div>
        <div className="pick">
          <button className="btn" type="button" aria-pressed={on} onClick={onToggle}>
            <span className="box">{on ? "✓" : ""}</span>
            <span className="lbl">{on ? "Selected" : "Select this idea"}</span>
          </button>
        </div>
        <div className="note">
          <label htmlFor={`note-${idea.n}`}>Your comment (optional)</label>
          <textarea
            id={`note-${idea.n}`} rows={2} placeholder="A thought, a condition, a question…"
            value={note} onChange={(e) => onNote(e.target.value)}
          />
        </div>
      </div>
    </article>
  );
}

export default function Picker({ timeline }: { timeline: React.ReactNode }) {
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [panelOpen, setPanelOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Restore saved progress after mount (avoids a hydration mismatch).
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (s.picked) setPicked(s.picked);
      if (s.notes) setNotes(s.notes);
      if (typeof s.name === "string") setName(s.name);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ picked, notes, name })); } catch {}
  }, [picked, notes, name, loaded]);

  // Any edit after a send makes the page sendable again.
  useEffect(() => {
    if (status === "sent" || status === "error") { setStatus("idle"); setMessage(""); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked, notes, name, note]);

  const count = IDEAS.filter((i) => picked[i.n]).length;
  const summary = summaryText({ name, note, picked, notes });

  function openPanel() {
    setPanelOpen(true);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 500);
    });
  }

  async function send() {
    if (!name.trim()) { setStatus("error"); setMessage("Please add your name first."); nameRef.current?.focus(); return; }
    setStatus("sending"); setMessage("");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, note, picked, notes, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send right now.");
      setStatus("sent");
      setMessage("Sent. Thank you, VIPMINDS has your selection.");
    } catch (e) {
      setStatus("error");
      setMessage(`${(e as Error).message} You can copy the text below and send it on WhatsApp instead.`);
    }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(summary); setMessage("Copied. Now paste it in WhatsApp or an email."); }
    catch { setMessage("Could not copy. Select the text above and copy it manually."); }
  }

  return (
    <>
      <section className="ideas" id="ideas">
        {IDEAS.map((i) => (
          <IdeaCard
            key={i.n} idea={i} on={!!picked[i.n]} note={notes[i.n] || ""}
            onToggle={() => setPicked((p) => ({ ...p, [i.n]: !p[i.n] }))}
            onNote={(v) => setNotes((n) => ({ ...n, [i.n]: v }))}
          />
        ))}
      </section>

      {timeline}

      <section className="panel" id="sendpanel" hidden={!panelOpen} ref={panelRef}>
        <div className="kicker">Almost done</div>
        <h2>Send your selection</h2>
        <div className="who">
          <div>
            <label htmlFor="who-name">Your name</label>
            <input type="text" id="who-name" ref={nameRef} placeholder="e.g. Lynn" autoComplete="name"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="who-note">Anything else you want to tell us? (optional)</label>
            <textarea id="who-note" rows={3} placeholder="Priorities, doubts, anything we should know."
              value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="hp" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input type="text" id="website" tabIndex={-1} autoComplete="off"
              value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </div>
        <pre className="summary">{summary}</pre>
        <div className="send">
          <button className="btn primary" type="button" onClick={send} disabled={status === "sending" || status === "sent"}>
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send to VIPMINDS"}
          </button>
          <button className="btn" type="button" onClick={copy}>Copy the text</button>
        </div>
        <p className={"toast" + (status === "error" ? " err" : "")} role="status" aria-live="polite">{message}</p>
        <p className="contact">
          Prefer another way? Paste it to VIPMINDS on WhatsApp <code>+961 3 373882</code>, or send us a screenshot
          of this page.
        </p>
      </section>

      <div className="bar">
        <div className="in">
          <strong>{count === 0 ? "No ideas selected yet" : count === 1 ? "1 idea selected" : `${count} ideas selected`}</strong>
          <button className="btn" type="button" onClick={openPanel}>Send my selection</button>
        </div>
      </div>
    </>
  );
}
