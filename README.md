# Trident Pressure Washing — Website

Premium multi-page Next.js 14 site. Built for Vercel.

## What's in here

**Homepage sections (all built and live):**
- Hero with drag-to-reveal before/after slider + floating sticker badges
- Scrolling cyan trust marquee
- Animated stats (counters tick up on scroll)
- 8-service grid with hover swap
- **Filth-O-Meter** — interactive live quote estimator (surface + size + dirtiness slider)
- Recent transformations Instagram-style scroller
- Trident vs Typical comparison table
- Interactive Melbourne suburb map (29 suburbs plotted)
- Magazine-style review wall (6 reviews)
- 4-step process strip
- FAQ accordion
- Big CTA + full editorial footer

**Pages:**
- `/` — Home
- `/services` — Service overview
- `/services/[slug]` — Per-service detail (8 dynamic routes)
- `/about` — About / story
- `/gallery` — Transformations
- `/contact` — Filth-O-Meter + contact form

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

Two options — easiest first.

### Option 1 — drag and drop (no git)

```bash
npm install -g vercel
vercel
```

Vercel CLI walks you through it. Confirm Next.js framework when asked. About 2 minutes.

### Option 2 — via GitHub (recommended for ongoing changes)

```bash
git init
git add .
git commit -m "initial trident site"
gh repo create trident-wash --public --source=. --push
```

Then go to vercel.com → New Project → import the repo → deploy. Auto-redeploys on every push.

## Customising

Almost all content lives in **`lib/data.ts`** — services, reviews, suburbs, stats, FAQs, copy. Edit there and everything updates.

## Photos

Currently using Unsplash placeholders for before/after and recent jobs. To swap in Sunny's real photos:

1. Drop them in `/public/photos/` (e.g. `before-driveway-brighton.jpg`)
2. Update the URLs in `components/Hero.tsx` and `components/Transformations.tsx` to reference `/photos/your-image.jpg` instead of the Unsplash URLs.

## Tech

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (custom theme: ink/teal/cyan/cream)
- Framer Motion
- Lucide icons
- Fraunces (display) + Inter (body) + JetBrains Mono via `next/font`
