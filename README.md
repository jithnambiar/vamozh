# CaptionMallu – Malayalam Instagram Caption Generator

An elegant, mobile-first, and SEO-optimized progressive web application (PWA) that generates original, high-quality Malayalam and Manglish captions, bio ideas, and story templates for social media platforms.

Designed specifically for Kerala content creators, influencers, and local businesses, it works entirely client-side without requiring registration, logins, or paid AI APIs.

---

## 🚀 Key Features

- **Intuitive Studio Workspace:** Easily configure content type, language, categories, tones, custom keywords, emoji styles, and result counts.
- **Story Image Creator:** High-definition 1080 x 1920px Canvas rendering engine to draw aesthetic quote templates with custom alignment, text sizing, and watermark toggles.
- **Favourites Persistence:** Save captions to favourites directly inside standard `localStorage` with offline caching.
- **100% SEO-Ready:** Custom metadata titles, description targets, open graph properties, robot index directives, and WebApplication JSON-LD schema structures fully crawlable by search engines.
- **Offline PWA Support:** Light-weight caching service worker allows the entire app to run offline after the first visit.

---

## 🛠️ Development & Build Guide

Ensure you have **Node.js 18+** installed on your system.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development
```bash
npm run dev
```
The dev server will boot and open a preview on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
This compiles the entire client-side React SPA, including HTML, fonts, and assets, into a production-optimized, static `dist/` folder.

---

## 🌐 Deployment Instructions

Since CaptionMallu is compiled as a lightweight, static client-side single-page application (SPA), you can host it for free on any standard hosting provider:

### Option A: Cloudflare Pages (Recommended)
1. Link your GitHub repository to **Cloudflare Pages**.
2. Select **Vite** as the framework preset.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. Click **Deploy**.

### Option B: Netlify
1. Create a new site on Netlify and link your repository.
2. Set the build command to `npm run build` and publish directory to `dist`.
3. Save and deploy.

### Option C: GitHub Pages
1. Configure your repository to deploy from the `/docs` folder or a custom workflow.
2. In your `vite.config.ts`, ensure `base: "./"` is configured if deploying to a subdirectory.
3. Build the project and push the contents of the `dist/` directory to your branch.

### Option D: Shared Web Hosting (cPanel / Hostinger / GoDaddy)
1. Run `npm run build` locally.
2. Compress the contents of the compiled `dist/` folder into a `.zip` archive.
3. Upload the archive to your server's `public_html` directory and extract it.

---

## ⚖️ Legal Trademark Notice
Instagram, Facebook, and WhatsApp are trademarks of their respective owners (Meta Platforms Inc.). CaptionMallu is an independent, 100% free creator tool and has no official affiliation, sponsorship, or association with Meta.
