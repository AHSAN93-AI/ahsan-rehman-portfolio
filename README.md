# Ahsan Rehman — AI Engineer Portfolio

A minimal, professional, single-page portfolio for freelance Artificial Intelligence Engineer **Ahsan Rehman**.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Lucide React icons
- No backend or database

## Folder structure

```text
ahsan-rehman-portfolio/
├── client/
│   ├── index.html
│   ├── public/
│   │   └── Ahsan_Rehman.pdf
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       │   ├── Home.tsx
│       │   └── NotFound.tsx
│       ├── App.tsx
│       ├── index.css
│       └── main.tsx
├── server/
│   └── index.ts
├── shared/
│   └── const.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

The profile image is intentionally handled with a navy `AR` placeholder when `/ahsan.jpg` is not available. To use the supplied profile photo later, add it as `client/public/ahsan.jpg`.

## Run locally

```bash
npm install
npm run dev
```

The scaffold also supports pnpm:

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
npm run check
npm run build
```

## Vercel deployment

1. Push the project folder to a GitHub, GitLab, or Bitbucket repository.
2. Sign in to [Vercel](https://vercel.com/) and choose **Add New → Project**.
3. Import the repository.
4. Keep the detected Vite settings, or use:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/public`
5. Select **Deploy**.
6. After the first deployment, use the Vercel project settings to connect a custom domain if needed.

No environment variables are required for this static portfolio.
