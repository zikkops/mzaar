# BDF × Mzaar Idea Picker

A static HTML page hosted on Hostinger at https://mzaar.vipmindslb.com. When someone presses **Send to VIPMINDS**, `send.php` emails their selection to norka@vipminds.com through Hostinger's PHP mail.

## Files

- `index.html`: the page (styles and script inline)
- `send.php`: receives the selection and sends the email. Recipient (`$TO`) and sender (`$FROM`) are set at the top.
- `logo.webp`: VIPMINDS logo
- `img/01.jpg` … `img/08.jpg`: optional idea photos. If a photo is missing, the card shows its line icon.

## Deploy

Hostinger → Advanced → GIT pulls `main` from GitHub into the subdomain folder. Push to GitHub, then click Deploy (or rely on the auto-deploy webhook).
