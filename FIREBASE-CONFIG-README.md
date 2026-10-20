# Firebase Configuration Documentation

## Overview

This document explains the Firebase configuration used in this project.

## firebase.json

```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "cleanUrls": true,
    "trailingSlash": false,
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|js|css|eot|otf|ttf|ttc|woff|woff2|font.css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=604800"
          }
        ]
      }
    ]
  }
}
```

## Critical Configuration Decisions

### Static Hosting Only

This configuration is for **STATIC HOSTING ONLY** (no server functions).
The site is built using Next.js static export and deployed to Firebase Hosting.

### Key Points

- **"public": "out"** - Points to Next.js static export output directory
- **No "functions" section** - We're intentionally not using Firebase Cloud Functions
- **"cleanUrls": true** - Enables clean URLs without .html extensions
- **No catch-all rewrite** - Every route is prerendered, so unknown URLs (including an unpublished post) get `404.html` with a real 404. The old `** → /index.html` rewrite was removed on 20 Oct 2026 (BRIEF-007) because it served the homepage with a 200 for any URL. Firebase Hosting cannot send 410.

### Important Warning

**DO NOT ADD Cloud Functions** - keep as static hosting only. Previous attempts to use server-side rendering with Firebase Functions led to numerous deployment issues.

## Deployment Process

1. Build the static site with `next build` (configured in next.config.ts with `output: 'export'`)
2. Deploy to Firebase Hosting with `firebase deploy --only hosting`
3. Use the combined script `npm run deploy` which handles media verification and deployment
4. Preview without touching live: `firebase hosting:channel:deploy <name>` (temporary URL, expires after 7 days by default)
5. Roll back without git: Firebase console → Hosting → Release history

## Accessing the Deployed Site

The site is live at [roscas.io](https://roscas.io), with the Firebase alias [roscas-website-1.web.app](https://roscas-website-1.web.app).
