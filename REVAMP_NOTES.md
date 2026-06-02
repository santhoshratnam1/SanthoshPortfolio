# Portfolio revamp — review guide (branch `revamp/2026-06`)

Two variants for you to compare locally, then upload whichever you prefer.

## How to preview
From the repo root:

```bash
python -m http.server 8799
```

- **V1 (fixed + polished, same look):** http://127.0.0.1:8799/index.html
- **V2 (PS5-style OS):** http://127.0.0.1:8799/v2/index.html

## V1 — "fix + polish, keep the look"
Lives at the repo root (your existing pages). Safe to upload as-is.
- Fixed broken SEO (canonical/og/sitemap/robots now point to the real
  `santhoshratnam1.github.io/SanthoshPortfolio` URL), added the missing
  Mechanical Fury to the sitemap.
- Removed AI-slop: emoji-in-headings, filler copy, fake Twitter/GitHub
  links, the stale "currently studying" line. Kept your game voice.
- Fixed bugs: `Ã—` and `�` mojibake, the 9-vs-10 menu counters, the
  testimonials scroll-hijack, empty `<p>`s, the "You Name" typo.
- Corrected facts: "3+ years"; awards now show **BC Game Jam = 1st Place**.
- Swapped the generic web-dev service icons for game ones.
- Added the **Showreel** project (card + page + video).
- Wired the real videos into **Quest for Valor** and **Ragball** (were
  placeholder `YOUR_VIDEO_ID`).
- Accessibility: form labels, keyboard focus rings, reduced-motion.

## V2 — "Santhosh OS" (PS5-style)
Lives in `/v2/` (self-contained: `v2/index.html`, `v2/assets/css/ps5.css`,
`v2/assets/js/ps5.js`). Reuses the same images from `/assets/`.
Marked `noindex` so it won't compete with V1 in search if you push it.

- Boot → "Who's using this controller?" profile select → **PS5 home**.
- **Games** rail of your projects with a focused hero (key art, tags,
  stats, **Launch**). Launching opens the project with its trailer; close
  to go back. **Media** tab = the Showreel.
- **Trophies** = your awards. **Profile** = About. **Settings** = contact
  + résumé + links. Keyboard: ◄ ► navigate, Enter launch, T/P/S, Esc.
- Responsive (desktop + phone) and respects reduced-motion.

To make V2 the live site later, its files would move to the root (or you
pick V1). Ask and I'll do that cleanly.

## Still open
- V2 is built from the PS5 references you sent + the standard PS5 layout.
  Happy to tune any specific interaction/motion you want from the
  walkthrough videos.
