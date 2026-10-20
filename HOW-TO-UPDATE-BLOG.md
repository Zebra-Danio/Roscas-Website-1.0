# How To Update The Blog

A short, focused guide for adding or editing blog posts.

> For wider site work (forms, pages, copy, deploy, rollback) see [DEVELOPER-GUIDE.md](./DEVELOPER-GUIDE.md). Briefed posts arrive through the ops bridge; see [CLAUDE.md](./CLAUDE.md).

---

## Where posts live

- **Live posts:** `content/posts/<slug>.md`. The filename is the URL: `chama-app.md` → `/blog/chama-app`.
- **Staged posts:** `content/queued/`. The build ignores this folder. See [content/queued/README.md](./content/queued/README.md).
- **New slugs:** short kebab-case on the key term, e.g. `pardner-app`, `savings-circle-size`. (The five oldest posts have long Title-Case slugs. Leave them as they are, because they're indexed.)

## Frontmatter

```yaml
---
title: "Your Chama, Off the Spreadsheet"
date: 2026-10-20T08:00:00.000Z
tags:
  - Chama
  - Savings Circle
  - Rosca
coverImage: /images/posts/chama-app.png   # or '' for no hero
metaTitle: "Chama App — Keep Your Chama, Lose the Spreadsheet"
metaDescription: "Under ~160 characters."
---
```

- **`date`** is the real publish date. The index sorts newest first. To publish a series in order, space the times a few minutes apart.
- **`metaTitle`** must **not** end in `| Roscas`. The layout appends it, and doubling it was the Post 7 defect.
- **`coverImage`** is optional. Leave it `''` and the article and index card render without a hero. If you set one, put the file in `public/images/posts/`. 16:9 works best.
- **Tags:** 3–8. Use tradition names (Paluwagan, Ajo, Esusu, Chama, Pardner, Dhukuti, Adashi) plus broad ones (Savings Circle, Rosca, Organisers, Trust).

## Body

- Standard Markdown. `##` for sections. The post's `title` is rendered as the H1, so don't repeat it in the body.
- **App screenshots:** `![Caption](/images/app/02_circle.png)` renders as a centred phone-sized frame. Available: `01_home`, `02_circle`, `03_members`, `04_contributions`, `05_payout`, `06_delight`.
- **CTA:** the closing link goes to `https://roscas.io/your-circle`, never `/get-started`. The end-of-post banner is added automatically (`src/components/blog-cta.tsx`).
- **Internal links:** only link to posts that are already live. A dead `/blog/...` link won't 404. It silently shows the homepage.
- When bringing in a draft from the bridge, strip the working header, the "Suggested…" lines and every "Internal notes" block. Don't rewrite the prose.

## Publish

1. Add or move the `.md` file into `content/posts/`.
2. Add a `<url>` row to [public/sitemap.xml](./public/sitemap.xml) with the publish date as `lastmod`. Editing an existing post doesn't need a sitemap change.
3. Run the banned-vocabulary check (see below).
4. `npm run deploy`. It's live in about 60 seconds.
5. Check the live URL's **page title**, not just the status code (unknown URLs return the homepage with a 200).

Rollback: `git revert HEAD && npm run deploy`, or use Firebase console → Hosting → Release history.

## Editing in TinaCMS (optional)

`npm run dev`, then open **http://localhost:3000/admin-redirect.html**. Changes save straight into `content/posts/*.md`. Or just edit the files directly.

## Copy rules

UK English. The app is always free and in early access. No blockchain / token / crypto / Web3 / Sui / DeFi / wallet language ([DECISION-001.md](./DECISION-001.md)), plus the wider list in [CLAUDE.md](./CLAUDE.md). Quick check:

```bash
grep -niwE "blockchain|tokens?|crypto|web3|sui|defi|wallets?|testnet|mainnet|fintech|unbanked" content/posts/*.md
```

## Troubleshooting

- **Ports already in use:** `npm run stop`, then `npm run dev` again.
- **TinaCMS shows "Unable to find record":** restart `npm run dev`. Tina sometimes misses files added while it was running.
