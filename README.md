# Ahsan Rehman: AI Engineer Portfolio
React 19 · TypeScript 5.6 · Vite 7 · Tailwind CSS 4 · tw-animate-css · wouter · motion · Lenis

    pnpm install   # or npm install
    pnpm dev       # http://localhost:5173
    pnpm build     # type-check + production build to /dist

## Structure
- `src/lib.tsx`: animation primitives (Lenis, Split, Reveal, Scramble, Roll, Magnetic, CountUp, Marquee, Cursor)
- `src/data.ts`: all projects, services, skills, process steps (edit here)
- `src/App.tsx`: preloader, nav, hero, sections, project case-study page
- `src/index.css`: light-blue design tokens and component styles

## Edit projects
Edit `src/data.ts`. The first six are your featured work; the rest are "Concept / Lab" cards with a TODO to confirm or replace.

## Optional hero video
Drop a clean `hero-loop.mp4` and `hero-poster.jpg` into `public/media/`. The hero detects it automatically and layers it under a white scrim. Otherwise the aurora and grid background is used.

## Contact form
Set `VITE_FORM_ENDPOINT` (Formspree / Web3Forms) in `.env`. If unset, the form opens a prefilled `mailto:`.

## Replace
`public/Ahsan_Rehman.pdf` is a placeholder. Swap in your real resume. Update the domain in `public/sitemap.xml` and `robots.txt`.

## Deploy
Import the repo in Vercel; `vercel.json` already handles SPA routing.
