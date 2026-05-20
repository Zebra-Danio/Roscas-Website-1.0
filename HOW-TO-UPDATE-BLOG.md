# How To Update The Blog

A short, focused guide for adding or editing blog posts.

> For wider site work (forms, pages, copy, deploy, rollback) see [DEVELOPER-GUIDE.md](./DEVELOPER-GUIDE.md).

---

## Quick steps

### 1. Start the local site with TinaCMS

```bash
npm run dev
```

This starts three services together:
- The site at **http://localhost:3000**
- TinaCMS admin at **http://localhost:3000/admin-redirect.html**
- A media proxy on port 5001

### 2. Edit your posts

Open the TinaCMS admin link above. Edit posts in the visual editor — your changes save automatically into `content/posts/*.md`.

If you prefer, you can edit the `.md` files in `content/posts/` directly.

### 3. Update the sitemap (only if you added a NEW post)

Open [public/sitemap.xml](./public/sitemap.xml) and add a new `<url>` block for your post slug, for example:

```xml
<url>
  <loc>https://roscas.io/blog/Your-Post-Slug-Here</loc>
  <lastmod>2026-05-03</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

The slug is the filename without the `.md` extension. Editing an existing post does not require a sitemap change.

**Current posts** (5 as of May 2026): filenames in `content/posts/` match the URL slug exactly, e.g. `Tired-of-Spreadsheets-The-Future-of-Managing-Your-Savings-Circle-is-Here.md` → `/blog/Tired-of-Spreadsheets-The-Future-of-Managing-Your-Savings-Circle-is-Here`.

### 4. Deploy

```bash
npm run deploy
```

Live within ~60 seconds.

### 5. If something looks wrong on the live site

```bash
git revert HEAD
npm run deploy
```

This rolls the live site back to the previous commit.

---

## Tips for good posts

- **Frontmatter required fields**: `title`, `date`, `tags`, `coverImage`. The `coverImage` should be a path under `/images/posts/...`.
- **Tags**: 5–8 per post. See `DEVELOPER-GUIDE.md` for SEO-friendly tags. Mix specific tradition names (Paluwagan, Ajo, Esusu, Chama) with broader ones ("Community Savings", "Financial Inclusion").
- **Cover image**: 16:9 aspect ratio works best with the listing layout.
- **No blockchain / token / crypto language** in posts — see [DECISION-001.md](./DECISION-001.md).

---

## Troubleshooting

**Ports already in use:**
```bash
npm run stop
```
Then re-run `npm run dev`.

**Stop the local server:**
Press `Ctrl+C` in the terminal, or run `npm run stop`.

**TinaCMS shows "Unable to find record":**
Restart `npm run dev`. Tina sometimes misses files added while it was already running.
