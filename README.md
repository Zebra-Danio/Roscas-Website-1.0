# Roscas Website

Marketing site for [roscas.io](https://roscas.io), a free Android app (in early access) for community savings circles: Paluwagan, Ajo, Esusu, Chama, Pardner, Dhukuti, Adashi and more. Static Next.js export on Firebase Hosting.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Blog editing via TinaCMS at [http://localhost:3000/admin-redirect.html](http://localhost:3000/admin-redirect.html).

## Deploy to live

```bash
npm run deploy
```

Builds `out/` and deploys to Firebase Hosting (~60 seconds). Needs `.env.local` with `NEXT_PUBLIC_WEB3FORMS_KEY` (copy `.env.local.example`).

## Documentation

| Guide | Use when |
|---|---|
| [DEVELOPER-GUIDE.md](./DEVELOPER-GUIDE.md) | Start here: file map, forms, analytics, deploy, rollback, hard constraints |
| [HOW-TO-UPDATE-BLOG.md](./HOW-TO-UPDATE-BLOG.md) | Adding or editing blog posts |
| [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) | Architecture and the reasons behind it |
| [DECISION-001.md](./DECISION-001.md) | Brand/copy rule: no blockchain or crypto language |
| [FIREBASE-CONFIG-README.md](./FIREBASE-CONFIG-README.md) | Firebase Hosting config |
| [BRIEF-Cloudflare-Migration.md](./BRIEF-Cloudflare-Migration.md) | Parked decision: moving DNS to Cloudflare (deferred May 2026) |
| [content/queued/README.md](./content/queued/README.md) | Posts staged but not yet live |
| [CLAUDE.md](./CLAUDE.md) | Agent instructions: the ops bridge (below) |

## How work arrives (the ops bridge)

Site work is briefed by Maya (marketing) through a shared folder on Gary's machine, `C:/Users/garyc/Documents/Roscas/Claude/bridge/`. Briefs land in `webdev/inbox/`, reports go to `webdev/outbox/`, deliverables sit in `assets/`, and any gated step (such as a production deploy) needs a matching file in `approvals/`. The full protocol is in [CLAUDE.md](./CLAUDE.md), with a Cursor copy in `.cursor/rules/`.
