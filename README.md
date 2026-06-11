# AlpovkApps — alpovka.github.io

The product studio & portfolio of **Alperen Karavelioglu**.

> Software that gets funded, shipped, used daily — and acquired.

**Live:** https://alpovka.github.io

## What's inside

A hand-crafted static site — no frameworks, no build step, no templates.

- `index.html` — single-page, story-driven structure
- `assets/css/style.css` — design system, dark/light themes, motion
- `assets/js/main.js` — interaction engine:
  - particle network hero canvas (pointer-reactive, pauses off-screen)
  - parallax layers & scroll-driven progress rails
  - scroll reveals, animated counters, word rotator
  - 3D tilt cards & magnetic buttons
  - light/dark theme with View Transitions circular reveal
  - fully respects `prefers-reduced-motion`

## Run locally

Any static server works:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy

Pushes to `main` deploy automatically to GitHub Pages via
`.github/workflows/publish.yml`.

## Contact

- karavelx@gmail.com
- [linkedin.com/in/alpovka](https://www.linkedin.com/in/alpovka)
- [github.com/Alpovka](https://github.com/Alpovka)
