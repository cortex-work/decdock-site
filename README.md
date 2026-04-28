# Decdeck — Public Website

Static marketing site for [decdeck.com](https://decdeck.com).

Built with **Vite + React + TypeScript + Tailwind CSS**.

---

## Local development

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```sh
npm run build      # produces dist/
npm run preview    # serve the production build locally
```

## Deploy to GitHub Pages

The site deploys automatically to GitHub Pages on every push to `main`.

**One-time setup (do once):**

1. Create a GitHub repo (e.g. `decdeck-site` or `decdeck-work/decdeck-site`)
2. Push this project to the repo's `main` branch
3. In **Settings → Pages**, set Source to **"GitHub Actions"**
4. On the next push to `main`, the workflow in `.github/workflows/deploy.yml` builds and deploys automatically

## DNS setup for decdeck.com

After the first deploy succeeds:

1. In your DNS provider, add:
   - **Type:** `A` records pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **Type:** `AAAA` records for IPv6 (optional but recommended — see GitHub docs)
   - **Type:** `CNAME` for `www` → `<your-github-username>.github.io`

2. In **Settings → Pages**, add `decdeck.com` as the custom domain

3. Wait for DNS propagation (5 min – 48 hours)

4. Enable **"Enforce HTTPS"** once GitHub verifies the domain

The `CNAME` file in the repo root tells GitHub Pages to respond to `decdeck.com`.

## OG image

The site references `/og-image.png` in meta tags. This file is not included.
Generate a 1200×630 PNG with the brand name and tagline and place it in `public/og-image.png`.

## Project structure

```
decdeck-site/
├── .github/workflows/deploy.yml   — GitHub Actions deploy pipeline
├── public/
│   ├── favicon.svg                — SVG favicon (D lettermark)
│   └── .nojekyll                  — Prevents Jekyll from processing the site
├── src/
│   ├── main.tsx                   — React entry point
│   ├── App.tsx                    — Root layout, section order
│   ├── index.css                  — Tailwind base + global styles
│   └── components/
│       ├── Nav.tsx                — Sticky navigation bar
│       ├── Hero.tsx               — Hero with decision card visual
│       ├── Problem.tsx            — Problem framing
│       ├── HowItWorks.tsx         — 3-step product explanation
│       ├── Scenarios.tsx          — 4 concrete decision scenarios
│       ├── Differentiation.tsx    — Not search, not summaries
│       ├── Trust.tsx              — Governance principles
│       ├── PilotCTA.tsx           — Pilot invitation
│       └── Footer.tsx             — Footer
├── index.html                     — HTML shell with SEO + font imports
├── CNAME                          — Custom domain for GitHub Pages
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── tsconfig.node.json
```
