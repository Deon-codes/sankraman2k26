# PRAKALP 4.0 — Sankraman

> **Sankraman** · *Transition from Challenges to Solutions*

The official landing website for **PRAKALP 4.0**, the annual technical fest organized by **IEEE × WiE × Project Cell** at Fr. Conceicao Rodrigues College of Engineering (CRCE), Mumbai.

---

## About

PRAKALP 4.0's theme — *Sankraman* (Sanskrit: transition) — represents the purposeful journey from real-world engineering challenges to practical, impactful solutions. The website reflects this through a cinematic, scroll-driven experience with a live 3D WebGL background, immersive animations, and a dark space aesthetic.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Component Animations | Framer Motion |
| Scroll Animations | GSAP + ScrollTrigger |
| 3D / WebGL | Three.js · `@react-three/fiber` · `@react-three/drei` |
| Smooth Scroll | Lenis |

---

## Project Structure

```
sankraman/
├── app/
│   ├── components/
│   │   ├── AboutSection.tsx       # Theme explainer — Challenges vs Solutions
│   │   ├── ContactSection.tsx     # Registration CTA + social links
│   │   ├── CouncilsSection.tsx    # IEEE / WiE / Project Cell cards
│   │   ├── Cursor.tsx             # Spring-physics custom cursor with trails
│   │   ├── EventsSection.tsx      # Event listing with category filter
│   │   ├── Experience.tsx         # Three.js WebGL background (vortex + shaders)
│   │   ├── Footer.tsx             # Brand, council credits, links
│   │   ├── HeroSection.tsx        # Letter-reveal title, CTA, energy streaks
│   │   ├── JourneySection.tsx     # Ideation → Design → Development → Impact timeline
│   │   ├── Navbar.tsx             # Scroll-aware nav with mobile drawer
│   │   └── SmoothScroll.tsx       # Lenis wrapper
│   ├── globals.css                # Tailwind theme tokens, utility classes, animations
│   ├── layout.tsx                 # Root layout + metadata
│   └── page.tsx                   # Page composition + GSAP scroll orchestration
├── public/
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config (via globals.css @theme)
└── tsconfig.json
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

```bash
# Production build
npm run build
npm run start

# Lint
npm run lint
```

---

## Page Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#hero` | Animated title reveal, energy streaks, register CTA |
| About | `#about` | Sankraman theme — Challenges vs Solutions split |
| Journey | `#journey` | Four-phase event timeline: Ideation → Impact |
| Councils | `#councils` | Organising bodies: IEEE, WiE, Project Cell |
| Events | `#events` | Event cards with Technical / Non-Technical filter |
| Contact | `#contact` | Registration CTA and social links |

> **Note:** `EventsSection` is built and ready — wire it into `page.tsx` when event details are finalised.

---

## WebGL Background

`Experience.tsx` runs a full-screen Three.js canvas (SSR-disabled via `dynamic` import). It includes:

- **VortexParticles** — 3,500 custom GLSL shader particles in a scroll-reactive spiral vortex
- **EnergyCore** — Central pulsing orb with a Fresnel-glow fragment shader
- **NeuralNet** — 35-node random graph with proximity-based edge connections
- **HolographicRings** — Three rotating torus rings
- **CameraController** — Scroll + mouse driven cinematic camera movement

---

## Design Tokens

Key CSS custom properties defined in `globals.css`:

```css
--color-void:             #020008   /* page background */
--color-neon-cyan:        #00E5FF   /* primary accent */
--color-electric-purple:  #7B2FBE   /* secondary accent */
--color-electric-blue:    #1E90FF   /* tertiary accent */
--color-lavender:         #B388FF   /* body text / subtle */
```

Utility classes: `.glass-card`, `.chrome-text`, `.neon-gradient-text`, `.glow-cyan`, `.section-base`, `.divider`, `.glitch-container`

---

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

No environment variables are required for the base site.

---

## Organised By

**IEEE CRCE** × **WiE CRCE** × **Project Cell CRCE**

Fr. Conceicao Rodrigues College of Engineering, Mumbai

---

*© 2025 IEEE × WiE × Project Cell, CRCE. All rights reserved.*