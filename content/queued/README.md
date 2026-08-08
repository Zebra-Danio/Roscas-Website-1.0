# Queued blog posts — publish schedule (BRIEF-001)

These posts are converted and publish-ready but must NOT be moved into
`content/posts/` until their scheduled date AND Gary has picked the header
image (options live in `bridge/assets/blog-images/<slug>/`; Maya relays the
pick via the webdev inbox).

To publish one:

1. Set `coverImage` in the frontmatter to the picked image (copy the picked
   file into `public/images/posts/` first).
2. Move the `.md` file into `content/posts/`.
3. Add the post URL to `public/sitemap.xml` with the publish date as
   `lastmod`.
4. Build and deploy.

| File | Publish date |
|---|---|
| `whats-a-rosca.md` | Fri 14 Aug 2026 |
| `trust-the-currency.md` | Fri 28 Aug 2026 |

Published so far: `ajo-esusu-app.md` (went live Sat 8 Aug 2026 under
APPROVAL-002; the 31 Jul slot moved because the image pick arrived 6 Aug).
