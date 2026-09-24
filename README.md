# BDF × Mzaar Idea Picker

This Next.js app replaces the static HTML picker. When someone presses **Send to VIPMINDS**, their selection is emailed to `MAIL_TO` through [Resend](https://resend.com).

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY`: your Resend API key
   - `MAIL_TO`: the address that receives selections (default `norka@vipminds.com`)
   - `MAIL_FROM`: the sender address. Its domain must be verified in Resend.
3. Put the logo at `public/logo.png`. For idea photos, add `public/img/01.jpg` … `08.jpg`. If a photo is missing, the card shows its line icon.
4. `npm run dev` (local) or `npm run build && npm start`.

On Vercel, set the same three variables under Project → Settings → Environment Variables.
