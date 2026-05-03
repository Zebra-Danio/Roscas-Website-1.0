# Roscas Website Documentation

## Project Overview

This is a Next.js website with TinaCMS integration for content management, deployed on Firebase Hosting as a static site. This document outlines the current architecture, development workflow, and critical implementation details.

## Architecture

- **Frontend**: Next.js 15.x (App Router) with static site generation (SSG)
- **Content Management**: TinaCMS for local development editing
- **Hosting**: Firebase Hosting (static site, no server-side rendering)
- **Media Handling**: Direct storage in public/images/posts with proxy for Windows path compatibility
- **Markdown Rendering**: `react-markdown` for rendering blog content in production builds

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
   This executes `npm run build && firebase deploy --only hosting`, which:
   - Verifies media files with `sync-tina-media.js`
   - Builds the static site with `next build` (outputs to the `out/` directory)
   - Deploys the contents of `out/` to Firebase Hosting.

2. **Deployed Site**:
   - The site is available at [roscas-website-1.web.app](https://roscas-website-1.web.app)
   - TinaCMS admin is **NOT** available on the deployed site

## Critical Files

- `tina/config.ts`: TinaCMS configuration
- `next.config.js`: Next.js configuration. Key settings include `output: 'export'`, `images: { unoptimized: true }`, and ensuring `eslint: { ignoreDuringBuilds: false }` & `typescript: { ignoreBuildErrors: false }`.
- `package.json`: Defines npm scripts, including `dev`, `build`, `deploy`, and `stop`. The `deploy` script combines the build and Firebase deployment steps.
- `tina-media-proxy.js`: Custom Express proxy server for handling media paths correctly on Windows during development.
- `sync-tina-media.js`: Script to verify media files before deployment
- `public/admin-redirect.html`: Redirect page to access the TinaCMS admin UI running on port 4001.
- `firebase.json`: Firebase configuration. Specifies `hosting: { "public": "out", ... }` to deploy the Next.js static export output. No Cloud Functions are used.
- `content/posts/`: Directory containing Markdown files for blog posts.
- `src/app/blog/[slug]/page.tsx` (and similar dynamic route files): Implement `generateStaticParams` for SSG and data fetching logic.

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

1. **Static Export Configuration**: Keep `output: 'export'` and related settings (like `images: { unoptimized: true }`) in `next.config.js`.
2. **TinaCMS Media Config**: Keep media stored in `public/images/posts`.
3. **Deployment Process**: Use `npm run deploy` (which includes `next build` and `firebase deploy --only hosting`) for deployment. The output directory is `out/`.
4. **Firebase Configuration**: Keep hosting-only approach (`hosting.public: "out"` in `firebase.json`); do not add Cloud Functions for Next.js hosting.
5. **Media Proxy**: Do not remove the `tina-media-proxy.js` server; it's needed for Windows development compatibility.
6. **Dual-Mode Data Fetching Logic**: The distinction between development (Tina API) and production (filesystem) data fetching is crucial.
7. **Markdown Rendering with `react-markdown`**: The use of `react-markdown` for production builds is important for successful static export.
8. **Build Health Checks**: Keep ESLint and TypeScript checks enabled in `next.config.js` (`ignoreDuringBuilds: false`).

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