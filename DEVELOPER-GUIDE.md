# Developer Guide — roscas.io

> **Read this first.** Practical orientation for anyone (human or AI) opening this repo to make changes. For deeper architectural detail see [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md). For the brand/content rule that constrains the public site see [DECISION-001.md](./DECISION-001.md). For blog-only edits see [HOW-TO-UPDATE-BLOG.md](./HOW-TO-UPDATE-BLOG.md). For the parked decision on moving DNS to Cloudflare see [BRIEF-Cloudflare-Migration.md](./BRIEF-Cloudflare-Migration.md).

---

## What this site is

- Brand: **Roscas** — a free Android app (in early access) for managing community savings circles (Paluwagan, Ajo, Esusu, Chama, Pardner, Dhukuti, Adashi, etc.).
- Live at: [https://roscas.io](https://roscas.io) (Firebase Hosting alias `https://roscas-website-1.web.app`).
- Audience: UK diaspora communities.
- Tone: warm, respectful of tradition, plain English, **UK spelling**.

## What the site is for

It's an **acquisition engine**. Each public route exists to convert a visitor into one of these outcomes:

| Route | Purpose |
|---|---|
| `/` | Tells the story; pushes visitors to `/your-circle`, `/get-started` and `/community-liaison` |
| `/your-circle` | **Primary CTA** (since the Circles-First release, Jul 2026) — for organisers bringing a circle they already run |
| `/get-started` | Early-access signup form for individuals; still the site-wide header button |
| `/community-liaison` | Ambassador application form |
| `/contact` | General-purpose contact form for everything else |
| `/blog` and `/blog/[slug]` | SEO + nurture content; every post ends with a CTA banner pointing at `/your-circle` |

All four forms email **team@roscas.io**.

---

## The 5-minute file map

### Where to change things

| What you want to change | File |
|---|---|
| Homepage hero copy & CTA buttons | [src/components/hero-section.tsx](./src/components/hero-section.tsx) |
| Header nav (top-bar links, primary buttons) | [src/components/hero5-header.tsx](./src/components/hero5-header.tsx) |
| Features grid (the 6 cards under the hero) | [src/components/features-4.tsx](./src/components/features-4.tsx) |
| "Trust, Transparency..." section | [src/components/content-4.tsx](./src/components/content-4.tsx) |
| "About Roscas" section | [src/components/content-7.tsx](./src/components/content-7.tsx) |
| Mid-page ambassador callout | [src/components/ambassador-cta.tsx](./src/components/ambassador-cta.tsx) |
| FAQ items | [src/components/faqs-3.tsx](./src/components/faqs-3.tsx) |
| Footer links and social icons | [src/components/footer.tsx](./src/components/footer.tsx) |
| End-of-blog-post CTA banner | [src/components/blog-cta.tsx](./src/components/blog-cta.tsx) |
| Organiser page (primary CTA) | [src/app/your-circle/page.tsx](./src/app/your-circle/page.tsx) + `YourCircleForm.tsx` |
| Early-access signup page | [src/app/get-started/page.tsx](./src/app/get-started/page.tsx) + `GetStartedForm.tsx` |
| App screenshots and walkthrough video | [src/components/app-screenshots.tsx](./src/components/app-screenshots.tsx), [src/components/walkthrough-video.tsx](./src/components/walkthrough-video.tsx); assets in `public/images/app/` and `public/videos/` |
| Ambassador page | [src/app/community-liaison/page.tsx](./src/app/community-liaison/page.tsx) + `CommunityLiaisonForm.tsx` |
| Contact page | [src/app/contact/page.tsx](./src/app/contact/page.tsx) + `ContactForm.tsx` |
| Site-wide SEO defaults (title template, OG, robots) | [src/app/layout.tsx](./src/app/layout.tsx) |
| Analytics tokens (GSC verification, Cloudflare beacon) | [src/app/layout.tsx](./src/app/layout.tsx) |
| Sitemap (generated at build from live posts) | [src/app/sitemap.ts](./src/app/sitemap.ts) |
| Scheduled publishing (daily deploy) | [.github/workflows/scheduled-deploy.yml](./.github/workflows/scheduled-deploy.yml), date gate in [src/lib/blogUtils.ts](./src/lib/blogUtils.ts) |
| robots.txt | [public/robots.txt](./public/robots.txt) |
| Blog posts | [content/posts/*.md](./content/posts/) |

### Form-related primitives

| File | What it does |
|---|---|
| [src/lib/forms.ts](./src/lib/forms.ts) | `submitForm(payload, options)` — POSTs to Web3Forms; returns `{ success, message }` |
| [src/components/forms/FormField.tsx](./src/components/forms/FormField.tsx) | `<TextField>`, `<TextareaField>`, `<SelectField>` styled to match site |
| [src/components/forms/FormStatus.tsx](./src/components/forms/FormStatus.tsx) | Reusable success/error banner component |

### Don't touch unless you mean it

- [next.config.ts](./next.config.ts) — `output: 'export'` is **load-bearing**. Removing it breaks the entire deploy.
- [firebase.json](./firebase.json) — hosting-only config; do not add `functions` (see [FIREBASE-CONFIG-README.md](./FIREBASE-CONFIG-README.md)).
- [tina/config.ts](./tina/config.ts) — TinaCMS schema for blog posts.

---

## Forms architecture (Web3Forms)

The site is statically exported (no Next.js API routes), so all four forms POST directly from the browser to **Web3Forms**, which forwards the submission as an email to the address registered with the access key (currently `team@roscas.io`).

### Environment variable

```
NEXT_PUBLIC_WEB3FORMS_KEY=<access key from web3forms.com>
```

- Stored in `.env.local` (gitignored). An example file is committed at `.env.local.example`.
- The variable is `NEXT_PUBLIC_*` because static export bakes it into the client bundle at build time. The Web3Forms access key is intentionally a public identifier (per their docs); it's not a secret credential.
- To rotate the key: register a new email at [web3forms.com](https://web3forms.com), update `.env.local`, and redeploy.

### How a form submission flows

1. User fills form on `/your-circle`, `/get-started`, `/community-liaison`, or `/contact`.
2. Form's `onSubmit` builds a payload and calls `submitForm(payload, { subject, from_name })` from [src/lib/forms.ts](./src/lib/forms.ts).
3. `submitForm` POSTs JSON to `https://api.web3forms.com/submit` with the access key.
4. Web3Forms emails the submission to `team@roscas.io`. Email subjects:
   - `Your Circle signup — [name]`
   - `New early access signup — [name]`
   - `Community Liaison application — [name]`
   - `Roscas contact form — [name]`
5. On success, the form component shows an inline `<FormStatus variant="success" />`.

### Adding a new form

1. Create your page (e.g. `src/app/feedback/page.tsx`) with metadata.
2. Create a sibling client component (e.g. `FeedbackForm.tsx`) marked `'use client'`.
3. Use `<TextField>`/`<TextareaField>`/`<SelectField>` from `forms/FormField`.
4. On submit, call `submitForm(payload, { subject: 'Roscas feedback — ...', from_name: 'Roscas — Feedback' })`.
5. On `result.success`, render `<FormStatus variant="success" ... />`.

---

## Analytics

The site uses two cookieless, GDPR/PECR-compliant analytics tools. **No cookie consent banner is required.** Both are wired in [src/app/layout.tsx](./src/app/layout.tsx) and ship on every route.

### Google Search Console

- Verified via the HTML-tag method. Emitted from `metadata.verification.google` in the root layout's `Metadata` object — Next.js generates the `<meta name="google-site-verification" content="..." />` tag in `<head>` for every prerendered page.
- Property is registered to `garycrooks39@gmail.com`.
- Used for indexing health, search-query data (terms that surface roscas.io in Google), and Core Web Vitals.

### Cloudflare Web Analytics

- **JS-beacon mode** — the lightweight path that doesn't require migrating DNS to Cloudflare. See [BRIEF-Cloudflare-Migration.md](./BRIEF-Cloudflare-Migration.md) for why we chose this over a full DNS migration.
- Loaded via `next/script` with `strategy="afterInteractive"` so it doesn't block first paint.
- Cookieless, no PII collection, no consent banner required.
- Dashboard: [one.dash.cloudflare.com](https://one.dash.cloudflare.com) → Web → Web Analytics.

### Token rotation

Both tokens are **public client-side identifiers** (analogous to `NEXT_PUBLIC_WEB3FORMS_KEY`) — committed directly in `src/app/layout.tsx`, not stored as env vars. To rotate:

| Token | Where | How |
|---|---|---|
| Google site-verification | `metadata.verification.google` | Get a new value from Search Console (HTML-tag method), replace string, redeploy. |
| Cloudflare beacon | `data-cf-beacon` JSON on the `<Script>` element | Get a new token in the Cloudflare Web Analytics dashboard, replace inside the JSON, redeploy. |

### What this stack deliberately doesn't include

- **GA4 / Google Analytics** — would require a cookie consent banner under UK GDPR/PECR.
- **Microsoft Clarity** (session recordings) — useful for funnel optimisation at higher traffic. Currently parked; revisit when traffic justifies the consent-banner overhead.
- **Server-side analytics** — impossible with the static-export architecture (no Next.js API routes). All analytics are client-side beacons.

---

## Deploy and rollback

### Standard deploy

```bash
npm run deploy
```

This runs:
1. `node sync-tina-media.js` — verifies media files exist
2. `next build` — lints, type-checks and builds the static export to `out/` (lint errors fail the build; warnings don't)
3. `firebase deploy --only hosting` — uploads `out/` to Firebase Hosting

Live within ~60 seconds.

### Scheduled deploy

[.github/workflows/scheduled-deploy.yml](./.github/workflows/scheduled-deploy.yml) rebuilds `main` and deploys it every day at 09:15 UTC. Posts dated in the future are left out of the build, so each goes live on its date with no one launching anything. **Whatever is on `main` goes live on the next run**, so only merge deployable work. It needs the `FIREBASE_SERVICE_ACCOUNT_ROSCAS_WEBSITE_1` and `NEXT_PUBLIC_WEB3FORMS_KEY` repository secrets. Without the first it skips; without the second it fails rather than ship broken forms.

### Branching strategy for non-trivial work

The live site has no standing preview environment, so meaningful changes should go on a feature branch. For a throwaway preview, `firebase hosting:channel:deploy <name>` publishes `out/` to a temporary URL without touching live.

```bash
git checkout -b feature/short-name
# ...make changes, test locally with npm run dev...
git add -A && git commit -m "feat: short description"
git push -u origin feature/short-name
git checkout main
git merge --no-ff feature/short-name -m "Merge branch 'feature/short-name': summary"
git push origin main
npm run deploy
```

Always merge with `--no-ff` so the merge commit is a single revert target.

### Rollback (the live site is broken)

```bash
git checkout main
git revert HEAD          # creates an inverse commit on main
npm run deploy           # redeploys the previous state
git push origin main     # share the revert
```

If multiple bad commits sit on top of each other:

```bash
git revert HEAD~3..HEAD  # revert the last 3 commits
```

To find a known-good rollback target:

```bash
git log --oneline --merges
```

### Last known-good rollback targets (current as of 20 Oct 2026)

- `8fa9deb` — Twelve S-series articles published, S3 Chama to S14 (BRIEF-006, live 20 Oct 2026).
- `ddb9dc8` — Trust article (BRIEF-004, live 11 Sep 2026).
- `76b93e6` — Circles-First release: `/your-circle`, walkthrough media (BRIEF-001, Jul 2026).

Firebase also keeps every release: Hosting → Release history in the Firebase console has a one-click rollback that doesn't touch git.

---

## Local development

### Start everything

```bash
npm run dev
```

Starts three services in parallel:
- **Next.js dev server** at `http://localhost:3000`
- **TinaCMS dev server** (blog editor) at `http://localhost:4001`
- **Tina media proxy** at `http://localhost:5001` (Windows path workaround)

The TinaCMS admin UI for editing blog posts is reachable via `http://localhost:3000/admin-redirect.html`.

### Stop everything

```bash
npm run stop
```

Kills ports 3000, 5001, and 9000.

### Clean reinstall (when things misbehave)

```bash
npm run clean
```

Removes `node_modules`, `package-lock.json`, `.next`, `out` and reinstalls.

### Common dev gotchas

- **Port already in use** — run `npm run stop` then retry.
- **Form submits but no email arrives** — first check spam folder; verify `.env.local` has `NEXT_PUBLIC_WEB3FORMS_KEY` set; rebuild (`npm run build`) since this is a `NEXT_PUBLIC_*` var baked at build time.
- **Build fails with `EPERM` on Windows** — close any IDE-attached file watchers and try again, or run terminal as administrator.
- **TinaCMS shows "Unable to find record"** — happens for new blog posts the first time the dev server runs; restart `npm run dev`.

---

## Hard constraints

These are non-negotiable. Any change that breaks them is a bug.

1. **Decision 001** — never mention blockchain, tokens, crypto, Web3, Sui, DeFi, or ROC anywhere on public pages. See [DECISION-001.md](./DECISION-001.md). The ops-bridge rules in [CLAUDE.md](./CLAUDE.md) extend the banned list for any new copy: also wallet, testnet, mainnet, gas, scheme, investment, returns, fintech, unbanked, users.
2. **Always free, early access.** The app is and remains free. Do not add pricing, paid tiers, or upsell language. Describe it as "early access", never "live for everyone".
3. **UK English** in all copy (e.g. "prioritise", "organisation", "favourite").
4. **Mobile-first.** Test every change at narrow viewports — most users are on phones.
5. **Static export must be preserved.** No Next.js API routes, no SSR, no `output: 'standalone'`. Forms use external services.
6. **Forms must work end-to-end.** A form that doesn't deliver email is worse than no form. Always test a real submission after changing `submitForm`, the access key, or any form page.

---

## Working with AI assistants on this repo

If you're an AI assistant being onboarded to this codebase, check in this order:

0. [CLAUDE.md](./CLAUDE.md) — the ops-bridge inbox check comes before anything else.
1. This file (`DEVELOPER-GUIDE.md`) — orientation.
2. [DECISION-001.md](./DECISION-001.md) — copy constraints.
3. [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md) — architecture deep-dive.
4. The user's actual ask. Then decide which files to read.

When making changes:

- **Never deploy without authorisation:** either explicit user confirmation, or the matching `APPROVAL-nnn.md` in the bridge for a briefed deploy.
- **Branch for any non-trivial change.** Use `feature/<name>` and `--no-ff` merges.
- **Check Decision 001** on every public-copy change.
- **Run `npm run dev` and let the user click around** before deploying.
- **Tell the user the rollback target commit** before they say "deploy".
