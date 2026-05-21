# Roscas Website Documentation

> For day-to-day "where do I edit X?" orientation, read [DEVELOPER-GUIDE.md](./DEVELOPER-GUIDE.md) first. For the brand-copy rule that constrains all public pages, read [DECISION-001.md](./DECISION-001.md). For the parked decision on moving DNS to Cloudflare, read [BRIEF-Cloudflare-Migration.md](./BRIEF-Cloudflare-Migration.md). This file is the deeper architectural reference.

## Project Overview

This is a Next.js website with TinaCMS integration for blog content management, deployed on Firebase Hosting as a static site. The site is structured as an acquisition engine with three lead-capture forms that submit to `team@roscas.io` via Web3Forms. This document outlines the current architecture, development workflow, and critical implementation details.

## Architecture

- **Frontend**: Next.js 15.x (App Router) with static site generation (SSG)
- **Content Management (blog)**: TinaCMS for local development editing
- **Hosting**: Firebase Hosting (static site, no server-side rendering)
- **Forms backend**: Web3Forms (browser-direct POST → email to `team@roscas.io`)
- **Analytics**: Google Search Console (HTML-tag verification) + Cloudflare Web Analytics (JS-beacon mode, cookieless). No GA4, no cookie banner.
- **Media Handling**: Direct storage in public/images/posts with proxy for Windows path compatibility
- **Markdown Rendering**: `react-markdown` for rendering blog content in production builds

## Site Map

| Route | File | Purpose |
|---|---|---|
| `/` | [src/app/page.tsx](./src/app/page.tsx) | Long-scroll homepage |
| `/get-started` | [src/app/get-started/page.tsx](./src/app/get-started/page.tsx) | Beta tester signup form |
| `/community-liaison` | [src/app/community-liaison/page.tsx](./src/app/community-liaison/page.tsx) | Paid ambassador role + application form |
| `/contact` | [src/app/contact/page.tsx](./src/app/contact/page.tsx) | General contact form |
| `/blog` | [src/app/blog/page.tsx](./src/app/blog/page.tsx) | Blog listing |
| `/blog/[slug]` | [src/app/blog/[slug]/page.tsx](./src/app/blog/[slug]/page.tsx) | Blog post detail (with end-of-post CTA) |

## Key Development Choices

### Static Site Generation

- The site uses Next.js static export (`output: 'export'` in `next.config.js`).
- Associated SSG settings in `next.config.js` include `images: { unoptimized: true }` (required for `next/image` with static export).
- All pages, including blog content (using `generateStaticParams`), are pre-rendered at build time.
- This approach was chosen over Server-Side Rendering (SSR) due to:
  - Simpler deployment to Firebase Hosting
  - No need for Firebase Cloud Functions
  - Better performance for end users
  - Compatibility with the content editing workflow

### TinaCMS Integration

- TinaCMS is used **ONLY** during local development
- Content editing happens locally, not in production
- Blog posts are stored as Markdown files in `content/posts/`
- TinaCMS admin runs on port 4001 (accessed via `/admin-redirect.html`)
- Media files are stored directly in `public/images/posts/`

### Media Handling

- **Direct Storage**: TinaCMS stores media in `public/images/posts/`
- **Media Proxy**: A custom Express server (`tina-media-proxy.js`) handles Windows absolute path issues during development by serving the `public` folder.
- **Media Verification**: The `sync-tina-media.js` script verifies media files before deployment.

### Dual-Mode Data Fetching & SSG Content

- Blog pages implement dual-mode data fetching:
  - In development (`process.env.NODE_ENV !== 'production'`): Uses TinaCMS client API for live previews.
  - In production builds: Reads directly from the filesystem (e.g., using `fs` and `gray-matter`) from `content/posts/`.
- Next.js App Router features like `generateStaticParams` are used in blog pages (e.g., `src/app/blog/[slug]/page.tsx`) to define paths for pre-rendering based on markdown files.
- This ensures content is available in both environments without requiring TinaCMS in production.

### Markdown Rendering in Production

- For static export, blog post content (Markdown body) is rendered to HTML using `react-markdown` during the build process. This avoids issues encountered with other MDX solutions during static export.

### Build Health and Linting

- ESLint and TypeScript checks are enabled in `next.config.js` (`eslint: { ignoreDuringBuilds: false }`, `typescript: { ignoreBuildErrors: false }`) to maintain code quality and catch errors early. It's crucial to keep these enabled.

### Forms (Web3Forms)

Because the site is statically exported, there are no Next.js API routes available. All three lead-capture forms (`/get-started`, `/community-liaison`, `/contact`) POST directly from the browser to Web3Forms, which forwards each submission as an email to `team@roscas.io`.

- Submission helper: [src/lib/forms.ts](./src/lib/forms.ts) (`submitForm(payload, options)`)
- Reusable field components: [src/components/forms/FormField.tsx](./src/components/forms/FormField.tsx) (`TextField`, `TextareaField`, `SelectField`)
- Status banner: [src/components/forms/FormStatus.tsx](./src/components/forms/FormStatus.tsx)
- Access key: env var `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` (gitignored). Web3Forms access keys are public client-side identifiers, not secret credentials. An example is committed at `.env.local.example`.
- Because the key is `NEXT_PUBLIC_*`, it is baked into the static bundle at build time. After rotating the key, you must rebuild and redeploy.

### Analytics

Two cookieless, GDPR/PECR-compliant tools, both wired in [src/app/layout.tsx](./src/app/layout.tsx) and active on every prerendered route. No consent banner is required.

- **Google Search Console** — verified via the HTML-tag method using Next.js `metadata.verification.google`. Next emits `<meta name="google-site-verification" ... />` into `<head>` site-wide.
- **Cloudflare Web Analytics** — JS-beacon mode (no DNS migration). Loaded via `next/script` with `strategy="afterInteractive"`.
- Both tokens are **public client-side identifiers**, committed directly in source. No env vars (unlike `NEXT_PUBLIC_WEB3FORMS_KEY`, these don't rotate often enough to warrant the indirection).
- Daily ops, token rotation steps, and the deliberate omission of GA4 / Clarity / server-side analytics are documented in [DEVELOPER-GUIDE.md § Analytics](./DEVELOPER-GUIDE.md#analytics).
- Architectural context for choosing JS-beacon mode over a full Cloudflare DNS migration: [BRIEF-Cloudflare-Migration.md](./BRIEF-Cloudflare-Migration.md).

### SEO

- Site-wide metadata defaults (title template, OG, Twitter cards, robots) live in [src/app/layout.tsx](./src/app/layout.tsx).
- Each page exports `export const metadata` for its specific title/description.
- Blog post metadata is generated dynamically by `generateMetadata` in [src/app/blog/[slug]/page.tsx](./src/app/blog/[slug]/page.tsx), reading the post's frontmatter and content.
- `public/sitemap.xml` is **manually maintained** — when you add a blog post, append a `<url>` entry. Also includes `/get-started` and `/community-liaison` (acquisition routes). `public/robots.txt` points crawlers at the sitemap.
- Blog posts live in `content/posts/` (5 posts as of May 2026). Cover images go in `public/images/posts/`.

## Development Workflow

1. **Start Development**:
   ```
   npm run dev
   ```
   This starts:
   - Next.js development server
   - TinaCMS development server
   - Media proxy server

2. **Edit Content**:
   - Access TinaCMS admin at http://localhost:3000/admin-redirect.html
   - Make content changes
   - Save changes (automatically updates markdown files)

3. **View Changes**:
   - Changes are immediately visible at http://localhost:3000

4. **Stop Development**:
   ```
   npm run stop
   ```
   This kills all development servers (ports 3000, 4001, 5001, 9000)

5. **Important Notes for Building**:
   - On Windows, if `EPERM` or `ENOENT` errors occur during `npm run build`, try running the command in a terminal with **Administrator privileges**.

## Deployment Workflow

1. **Prepare for Deployment**:
   ```
   npm run deploy
   ```
   This executes `node sync-tina-media.js && npm run build && firebase deploy --only hosting`, which:
   - Verifies media files with `sync-tina-media.js`
   - Builds the static site with `next build` (outputs to the `out/` directory)
   - Deploys the contents of `out/` to Firebase Hosting.

2. **Deployed Site**:
   - The site is available at [https://roscas.io](https://roscas.io) (custom domain)
   - Firebase alias: [https://roscas-website-1.web.app](https://roscas-website-1.web.app)
   - TinaCMS admin is **NOT** available on the deployed site

## Branching & Rollback

The live site has no preview environment, so meaningful changes should land via a feature branch and a `--no-ff` merge so the merge commit is a single revert target.

```bash
git checkout -b feature/short-name
# work, test locally
git commit -am "feat: ..."
git push -u origin feature/short-name
git checkout main
git merge --no-ff feature/short-name -m "Merge branch 'feature/short-name': summary"
git push origin main
npm run deploy
```

**Rollback** (live site is broken after a deploy):

```bash
git checkout main
git revert HEAD
npm run deploy
git push origin main
```

For a deeper dive into the branching/deploy workflow see [DEVELOPER-GUIDE.md](./DEVELOPER-GUIDE.md).

## Critical Files

- `tina/config.ts`: TinaCMS configuration.
- `next.config.ts`: Next.js configuration. Key settings include `output: 'export'`, `images: { unoptimized: true }`, and the ESLint/TS settings noted above.
- `package.json`: Defines npm scripts, including `dev`, `build`, `deploy`, and `stop`. The `deploy` script combines media verification, build, and Firebase deployment.
- `tina-media-proxy.js`: Custom Express proxy server for handling media paths correctly on Windows during development.
- `sync-tina-media.js`: Script to verify media files before deployment.
- `public/admin-redirect.html`: Redirect page to access the TinaCMS admin UI running on port 4001.
- `firebase.json`: Firebase configuration. Specifies `hosting: { "public": "out", ... }` to deploy the Next.js static export output. No Cloud Functions are used.
- `public/robots.txt` and `public/sitemap.xml`: Search-engine instructions; sitemap is hand-maintained.
- `content/posts/`: Directory containing Markdown files for blog posts.
- `src/app/blog/[slug]/page.tsx` (and similar dynamic route files): Implement `generateStaticParams` for SSG and data fetching logic.
- `src/lib/forms.ts`, `src/components/forms/`: The Web3Forms submission primitives used by all three forms.
- `src/app/layout.tsx`: Also home to the Google Search Console verification token (`metadata.verification.google`) and the Cloudflare Web Analytics beacon `<Script>`.
- `BRIEF-Cloudflare-Migration.md`: Decision brief for moving DNS to Cloudflare. Status: deferred; JS-beacon-only path was implemented instead. Revisit when the triggers in §7 of the brief fire.
- `.env.local`: Holds `NEXT_PUBLIC_WEB3FORMS_KEY`. Gitignored. Example committed at `.env.local.example`.

## Known Issues and Solutions

### Windows Path Issues

- **Issue**: TinaCMS uses absolute Windows paths (C:\\) in media references
- **Solution**: The media proxy server (port 5001) handles path conversion

### TinaCMS Admin Access

- **Issue**: TinaCMS admin runs on port 4001 instead of /admin path
- **Solution**: The admin-redirect.html page handles proper redirection

### Media Sync

- **Issue**: Media files need to be properly included in the build
- **Solution**: TinaCMS stores media directly in public/ folder and sync-tina-media.js verifies before deployment

## Important: Do Not Change

1. **Static Export Configuration**: Keep `output: 'export'` and related settings (like `images: { unoptimized: true }`) in `next.config.ts`.
2. **TinaCMS Media Config**: Keep media stored in `public/images/posts`.
3. **Deployment Process**: Use `npm run deploy` for deployment. The output directory is `out/`.
4. **Firebase Configuration**: Keep hosting-only approach (`hosting.public: "out"` in `firebase.json`); do not add Cloud Functions for Next.js hosting.
5. **Media Proxy**: Do not remove the `tina-media-proxy.js` server; it's needed for Windows development compatibility.
6. **Dual-Mode Data Fetching Logic**: The distinction between development (Tina API) and production (filesystem) data fetching is crucial.
7. **Markdown Rendering with `react-markdown`**: The use of `react-markdown` for production builds is important for successful static export.
8. **Build Health Checks**: Keep ESLint and TypeScript checks enabled in `next.config.ts` (`ignoreDuringBuilds: false`).
9. **Decision 001**: No blockchain / token / Web3 vocabulary on public pages. See [DECISION-001.md](./DECISION-001.md).
10. **Forms backend**: All forms route through Web3Forms via `src/lib/forms.ts`. Don't replace this without ensuring `team@roscas.io` continues to receive every submission.

## Troubleshooting

If you encounter any issues:

1. **Local Development Not Working**:
   - Check that all ports are free (3000, 4001, 5001, 9000)
   - Run `npm run stop` to kill existing processes
   - Try `npm run clean` to remove `node_modules`, `package-lock.json`, `.next`, and `out`, then reinstall dependencies with `npm install`
   - On Windows, if build commands (`npm run build`) fail with `EPERM` or `ENOENT` errors, try running the command in a terminal with **Administrator privileges**.

2. **Media Path Issues**:
   - Ensure media proxy server is running
   - Check console logs for path resolution

3. **Deployment Failures**:
   - Verify Firebase CLI is configured properly
   - Check that `public/images/posts` contains all necessary media
   - Review build logs for errors 