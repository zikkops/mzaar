export type Idea = {
  n: string;
  alt: string;
  tag: "agreed" | "bdf" | "request" | "explore";
  tagText: string;
  title: string;
  text: string;
  mzaar: string;
  bdf: string;
};

export const ICONS: Record<string, string> = {
  "01": "<svg viewBox='0 0 64 64'><rect x='14' y='6' width='24' height='44' rx='4'/><path d='M22 12h8M26 44h0'/><rect x='34' y='30' width='24' height='16' rx='2'/><path d='M46 30v16M38 38h4M50 38h4'/><path d='M18 58c6-3 12-3 18 0'/></svg>",
  "02": "<svg viewBox='0 0 64 64'><rect x='6' y='14' width='52' height='36' rx='3'/><path d='M6 22h52M6 42h52M14 14v8M24 14v8M34 14v8M44 14v8M14 42v8M24 42v8M34 42v8M44 42v8'/><path d='M20 36l8-8 6 6 4-3 6 5'/></svg>",
  "03": "<svg viewBox='0 0 64 64'><rect x='6' y='10' width='52' height='32' rx='3'/><path d='M32 42v10M22 52h20'/><path d='M14 30l8-8 6 6 5-4 9 8'/></svg>",
  "04": "<svg viewBox='0 0 64 64'><path d='M32 14c-6-4-14-5-24-4v38c10-1 18 0 24 4 6-4 14-5 24-4V10c-10-1-18 0-24 4z'/><path d='M32 14v38'/><path d='M14 22h10M14 30h10M40 20h10M40 28l4-4 6 6'/></svg>",
  "05": "<svg viewBox='0 0 64 64'><rect x='10' y='26' width='44' height='30' rx='3'/><path d='M10 36h44M32 26v30'/><path d='M32 26c-6-2-12-6-10-12 3-5 9 2 10 8 1-6 7-13 10-8 2 6-4 10-10 12'/><path d='M6 20l3-3M58 20l-3-3M32 6v4'/></svg>",
  "06": "<svg viewBox='0 0 64 64'><path d='M8 20a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v8a4 4 0 0 0 0 8v8a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-8a4 4 0 0 0 0-8z'/><path d='M40 16v32' stroke-dasharray='3 3'/><rect x='16' y='26' width='6' height='6'/><rect x='26' y='26' width='6' height='6'/><rect x='16' y='36' width='6' height='6'/><path d='M28 38h4'/></svg>",
  "07": "<svg viewBox='0 0 64 64'><path d='M4 18L60 8'/><path d='M20 15v10M44 11v10'/><rect x='12' y='25' width='16' height='12' rx='2'/><rect x='36' y='21' width='16' height='12' rx='2'/><path d='M12 37h16M36 33h16'/><path d='M4 56l14-14 10 10 8-8 8 8 16-16'/></svg>",
  "08": "<svg viewBox='0 0 64 64'><path d='M14 22h36l-3 30H17z'/><path d='M24 22a8 8 0 0 1 16 0'/><path d='M40 40l8 4-4 2-2 4z'/></svg>",
};

export const IDEAS: Idea[] = [
  {
    n: "01", alt: "Skier holding a pass and the BDF app", tag: "agreed", tagText: "Mzaar agreed · trial",
    title: "Early-bird ski passes for BDF members",
    text: "Members of the BDF loyalty app get a Mzaar early-bird offer before everyone else, as a promo code inside the app. Alongside it, a small Mzaar corner inside the BDF store sells early-bird passes to anyone travelling in October and November, including the diaspora buying for the Christmas trip home.",
    mzaar: "A capped early-bird offer for app members, and staff or passes for the in-store corner.",
    bdf: "The offer inside the app before launch, and a selling point in front of every departing traveller.",
  },
  {
    n: "02", alt: "Mzaar in the 1990s", tag: "bdf", tagText: "BDF idea",
    title: "'90s Mzaar, then and now",
    text: "One video of 30 to 45 seconds. Mzaar in the 1990s, the skiers, the lifts, the cars in the parking, then a cut to today's BDF. Endline: \"Between home and away. The only constant.\" Posted together with Mzaar.",
    mzaar: "Access to its 1990s photo and video archive, with permission to use it.",
    bdf: "The film, the modern half shot on a BDF shoot day, and co-posting with Mzaar tagged.",
  },
  {
    n: "03", alt: "BDF on the screens at Mzaar", tag: "request", tagText: "Mzaar request",
    title: "BDF on the Mzaar screens",
    text: "A rotating playlist of BDF content on the resort's own screens all season: the brand film, seasonal offers and a QR code that takes skiers straight to the loyalty app. Refreshed every month.",
    mzaar: "Slots on its screens at ticket offices, lodges and lift stations.",
    bdf: "A screen edit of the brand film plus monthly offer cards, ready to play.",
  },
  {
    n: "04", alt: "Mzaar page in the BDF magazine", tag: "request", tagText: "Mzaar request",
    title: "Mzaar in the BDF magazine",
    text: "Mzaar joins the new BDF Quarterly Magazine as one of its first advertisers, with a page for ski passes or the hotel. Every traveller who leaves with a BDF bag leaves with Mzaar in hand.",
    mzaar: "The page content and an offer for readers, paid or as part of the barter.",
    bdf: "A page or spread in the first winter edition, in every shopping bag.",
  },
  {
    n: "05", alt: "Winners with their ski passes", tag: "request", tagText: "Mzaar request",
    title: "Ski pass draw, with a student track",
    text: "Mzaar provides a batch of ski passes. BDF runs a draw among shoppers and app members through the season, with part of the batch reserved for students.",
    mzaar: "The ski passes for the draw.",
    bdf: "The draw mechanic, the social content and the winners' announcements.",
  },
  {
    n: "06", alt: "BDF on the Mzaar ski ticket", tag: "request", tagText: "Mzaar request",
    title: "BDF on the Mzaar ticket",
    text: "A BDF strip on the Mzaar ski ticket, printed or digital, with a QR code to join the loyalty app and a small welcome voucher. Skiers carry the ticket all day and often keep it.",
    mzaar: "Space on the ticket and its printing calendar.",
    bdf: "The artwork, one clear offer and the welcome voucher.",
  },
  {
    n: "07", alt: "Chairlifts painted by artists", tag: "request", tagText: "Mzaar request",
    title: "Chairlifts designed by Lebanese artists",
    text: "A series of Mzaar télésièges painted by Lebanese artists, each chair a different piece, co-branded BDF × Mzaar. The ride up becomes the content: every skier sits in the artwork, photographs it and posts it.",
    mzaar: "The chairlifts, production and safety approval.",
    bdf: "The artists, the reveal film and the artist story series. Funding to agree.",
  },
  {
    n: "08", alt: "Collecting a duty free order", tag: "explore", tagText: "To explore",
    title: "Click and Collect link",
    text: "A possible link between BDF's Click and Collect and Mzaar, for example a Mzaar promo code on order confirmations, or an early-bird pass as an add-on to a duty free order. Raised as a possibility, not yet defined.",
    mzaar: "Its e-commerce team, once the idea is defined.",
    bdf: "The same, plus the Click and Collect journey to plug into.",
  },
];

export type Selection = {
  name: string;
  note: string;
  picked: Record<string, boolean>;
  notes: Record<string, string>;
};

/** Plain-text summary, shared by the on-page preview and the email body. */
export function summaryText({ name, note, picked, notes }: Selection): string {
  const s = IDEAS.filter((i) => picked[i.n]);
  const who = name.trim();
  const extra = note.trim();
  let t = `BDF × Mzaar – idea selection${who ? " from " + who : ""}\n`;
  t += s.length ? `Selected ${s.length} of ${IDEAS.length} ideas:\n` : "No ideas selected yet.\n";
  s.forEach((i) => {
    t += `\n${i.n} ${i.title}`;
    if (notes[i.n]?.trim()) t += `\n   Comment: ${notes[i.n].trim()}`;
  });
  const skipped = IDEAS.filter((i) => !picked[i.n] && notes[i.n]?.trim());
  if (skipped.length) {
    t += "\n\nComments on ideas not selected:";
    skipped.forEach((i) => (t += `\n${i.n} ${i.title}: ${notes[i.n].trim()}`));
  }
  if (extra) t += `\n\nOther notes: ${extra}`;
  return t;
}
