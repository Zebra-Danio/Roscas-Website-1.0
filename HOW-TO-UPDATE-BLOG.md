# 📝 HOW TO UPDATE THE BLOG

## Quick Steps (3 Simple Commands)

### Step 1: Start Local Site with TinaCMS
```bash
npm run dev
```
- Opens the site at `http://localhost:3000`
- **TinaCMS blog editor is now available on the site**
- Look for the "Edit" button or admin panel on your local site

### Step 2: Edit Your Blog Posts
- Use the **TinaCMS editor** directly on the local website
- Make your changes through the visual editor
- Changes are saved automatically to your `content/posts/` folder

### Step 3: Deploy to Live Site
```bash
npm run deploy
```
- This syncs media, builds the site, and deploys to Firebase
- Your changes are now live! 🎉

---

## That's It!

**Remember:**
1. `npm run dev` → Edit on local site with TinaCMS
2. `npm run deploy` → Push changes live

---

## Troubleshooting

**If ports are busy:**
```bash
npm run stop
```
Then run `npm run dev` again.

**If you need to stop the local server:**
Press `Ctrl+C` in the terminal, or run:
```bash
npm run stop
```
