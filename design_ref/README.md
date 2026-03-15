# PRAKALP 4.0 — Sankraman · Design Reference

> **This is the prototype / creative reference app** for the PRAKALP 4.0 event website.
> It was scaffolded in [Google AI Studio](https://ai.studio) and used to explore layout, animation, and visual identity before the production build was started in [`../sankraman`](../sankraman).

---

## What's in here

This is a single-page **React + Vite** app that acted as a sandbox for:

- Overall page narrative — Hero → Challenges → Sankraman Transition → Innovation Tracks → Future → Timeline → Sponsors → Pricing → Speakers
- 3D WebGL background with morphing particles (particles converge into a "P" shape on load), a neural-network overlay, a holographic grid, and floating abstract meshes
- GSAP + ScrollTrigger scroll-driven animations (cinematic camera, background colour shifts, glitch overlay)
- Lenis smooth-scroll integration
- Custom spring-physics cursor with trailing dots
- `AnimatedList` — a keyboard-navigable, scroll-masked list component
- Glassmorphism design system (glass-card, glow-text utilities)
- Colour palette: `night-indigo` · `twilight-purple` · `midnight-blue` · `lavender-haze` · `dusky-blue`

The production site in `../sankraman` (Next.js) inherits most of the visual language and several components directly from this prototype.

---

## Tech Stack

| | |
|---|---|
| Bundler | Vite 6 |
| UI | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion · GSAP + ScrollTrigger |
| 3D / WebGL | Three.js · @react-three/fiber · @react-three/drei |
| Smooth Scroll | Lenis |
| AI (optional) | Google Gemini via `@google/genai` |

---

## Running locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```

2. *(Optional)* If you want to use any Gemini-powered features, create a `.env.local` file and set your key:
   ```
   GEMINI_API_KEY=your_key_here
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```
   The app runs on [http://localhost:3000](http://localhost:3000).

---

## Relationship to the production site

```
design_ref/   ← you are here (prototype, Vite/React)
sankraman/    ← production website (Next.js 16, App Router)
assets/       ← shared design references (posters, theme explanation)
```

Components and patterns that graduated from this prototype to the production build:

- `Cursor.tsx` — spring cursor with hover states and touch-device fallback
- `SmoothScroll.tsx` — Lenis wrapper
- `Experience.tsx` — WebGL background canvas (rewritten with new shaders in production)
- `Navbar.tsx` — scroll-aware glassmorphism nav
- Overall CSS design tokens and utility classes (`glass-card`, `glow-*`, `chrome-text`, etc.)

---

## Notes

- This prototype intentionally contains more sections than the production site (e.g. Pricing, Sponsors, Speakers) — they exist as explorations and may be brought into the production build later.
- Do **not** deploy this app directly; use the `../sankraman` build for production.