# BDF × Mzaar Idea Picker

A static HTML page. When someone presses **Send to VIPMINDS**, their selection is emailed to norka@vipminds.com through [Web3Forms](https://web3forms.com).

## Files

- `index.html`: the whole page (styles and script inline)
- `logo.webp`: VIPMINDS logo
- `img/01.jpg` … `img/08.jpg`: optional idea photos. If a photo is missing, the card shows its line icon.

## Setup

1. At https://web3forms.com, create an access key using **norka@vipminds.com**. The key is emailed to that inbox.
2. In `index.html`, replace `YOUR-WEB3FORMS-ACCESS-KEY` with that key. The key is meant to be public; it can only deliver to that inbox.

## Deploy (Hostinger)

Upload `index.html`, `logo.webp` and the `img/` folder into the subdomain's folder, e.g. `public_html/mzar/` for `mzar.vipmindslb.com`. You can use hPanel → File Manager, or Git deployment from this repo.
