# Roscas Website

Marketing site for [roscas.io](https://roscas.io) — a free Android app for community savings circles (Paluwagan, Ajo, Esusu, Pardna, Chama, etc.). Static Next.js site on Firebase Hosting.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Blog editing via TinaCMS at [http://localhost:3000/admin-redirect.html](http://localhost:3000/admin-redirect.html).

## Documentation

| Guide | Use when |
|---|---|
| [DEVELOPER-GUIDE.md](./DEVELOPER-GUIDE.md) | Day-to-day edits, forms, analytics, deploy, rollback |
| [HOW-TO-UPDATE-BLOG.md](./HOW-TO-UPDATE-BLOG.md) | Adding or editing blog posts |
| [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) | Architecture and implementation detail |
| [DECISION-001.md](./DECISION-001.md) | Brand/copy constraints (no blockchain language) |
| [BRIEF-Cloudflare-Migration.md](./BRIEF-Cloudflare-Migration.md) | Parked decision: moving DNS to Cloudflare (deferred May 2026) |
| [FIREBASE-CONFIG-README.md](./FIREBASE-CONFIG-README.md) | Firebase hosting setup |

## Deploy to live

```bash
npm run deploy
```

Deploys to Firebase Hosting (~60 seconds). Requires `.env.local` with `NEXT_PUBLIC_WEB3FORMS_KEY` for forms.
