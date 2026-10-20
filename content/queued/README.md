# Queued blog posts

Posts that are converted and publish-ready but not yet live sit here, outside
`content/posts/`, so the build ignores them. Work arrives as a BRIEF in the
webdev bridge inbox; any gated step needs its matching file in
`bridge/approvals/`.

To publish one:

1. Set `coverImage` in the frontmatter to the approved header (copy it into
   `public/images/posts/` first), or leave it as `''` for no hero. The
   layout skips a missing cover.
2. Move the `.md` file into `content/posts/`.
3. Build and deploy. The sitemap is generated.

For scheduled posts you usually don't need this folder. A post in
`content/posts/` with a future `date` stays out of the build until that date.

| File | Publish date |
|---|---|
| — | nothing currently queued |

History: `paluwagan-app` and `ajo-esusu-app` (Aug 2026), `whats-a-rosca`
(28 Aug 2026, BRIEF-003), `trust-the-currency` (11 Sep 2026, BRIEF-004). The
twelve-article bank, S3 Chama to S14 Formation Checklist, shipped together on
20 Oct 2026 under BRIEF-006, then were corrected the same day by BRIEF-007 /
APPROVAL-007. S3 Chama stays live with a hero, and S4–S14 now sit in
`content/posts/` with future dates, one a month on the 20th (Nov 2026 to
Sep 2027), each with its hero.
