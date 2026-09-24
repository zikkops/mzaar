# BDF × Mzaar Idea Picker

A static HTML page hosted on Hostinger at https://mzaar.vipmindslb.com. Visitors can send their selection by email (`send.php` sends it from marketing@vipminds.com to norka@vipminds.com through Google Workspace SMTP) or open WhatsApp with the message pre-filled.

## Files

- `index.html`: the page (styles and script inline)
- `send.php`: sends the email. Recipient and sender are set at the top.
- `config.example.php`: copy to `config.php` on the server and add the Google App Password for marketing@vipminds.com. `config.php` is git-ignored.
- `logo.webp`: VIPMINDS logo
- `img/01.jpg` … `img/08.jpg`: optional idea photos. If a photo is missing, the card shows its line icon.

## Deploy

Hostinger → Advanced → GIT pulls `main` from GitHub into the subdomain folder. Push to GitHub, then click Deploy (or rely on the auto-deploy webhook).
