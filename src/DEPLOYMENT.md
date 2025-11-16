# Deployment Guide

This document provides instructions for building and deploying the Austin Carson Portfolio website.

---

## 📋 Overview

- **Framework**: React with TypeScript
- **Build Environment**: Figma Make (Vite-based)
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (Framer Motion)
- **Font**: Instrument Serif (Google Fonts CDN)

---

## 🔧 Build Configuration

### Entry Point
- **Main file**: `/App.tsx` (default export)
- **Styles**: `/styles/globals.css`

### Environment Variables

This project does not require any environment variables. All configuration is handled through:
- Tailwind CSS custom properties in `/styles/globals.css`
- Static project data in `/src/data/projects.ts`

**Note**: This site is designed for static content display and does not collect PII or handle sensitive data.

---

## 🚀 Deployment Steps

### Option 1: Figma Make (Recommended)

Figma Make handles the build process automatically. The site is ready to deploy as-is.

1. Export your project from Figma Make
2. The build is handled automatically
3. Deploy to your preferred hosting platform

### Option 2: Manual Deployment

If deploying manually outside of Figma Make:

#### Prerequisites
```bash
# Ensure you have Node.js 18+ installed
node --version  # Should be 18.0.0 or higher
```

#### Build Process
The Figma Make environment uses an implicit Vite-like build system. The exact commands depend on the exported package configuration, but typically:

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Recommended Deployment Targets

### Vercel (Recommended)

**Settings:**
- **Framework Preset**: Vite (or Auto-detect)
- **Build Command**: `npm run build`
- **Output Directory**: `dist` (or as configured in vite.config)
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

**Deploy:**
```bash
# Using Vercel CLI
npm i -g vercel
vercel
```

Or connect your Git repository in the Vercel dashboard for automatic deployments.

---

### Netlify

**Settings:**
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

**netlify.toml** (optional):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### GitHub Pages

For GitHub Pages deployment:

1. Update `vite.config.ts` (if it exists) with base path:
```ts
export default {
  base: '/your-repo-name/',
}
```

2. Add to package.json:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

---

## 📂 Build Output Structure

After building, the output typically looks like:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other-assets]
└── [other-static-files]
```

---

## 🎨 Static Assets

### Images
- **Project previews**: Loaded from Unsplash CDN (URLs in `/src/data/projects.ts`)
- **Fallback images**: Handled by `/components/figma/ImageWithFallback.tsx` (protected system file)

No local image assets need to be bundled.

### Fonts
- **Primary font**: Instrument Serif loaded from Google Fonts CDN
- Defined in `/styles/globals.css` with `@import`

---

## ⚙️ Custom Configuration

### Design Tokens

All design tokens are defined in `/styles/globals.css`:

```css
:root {
  /* Brand Colors */
  --color-brand-purple: #6B4EFF;
  
  /* Spacing System */
  --spacing-lg: 34px;
  --spacing-xl: 55px;
  --spacing-2xl: 89px;
  
  /* Other measurements */
  --header-height: 68px;
  --container-padding: 34px;
  --radius: 6px;
}
```

Modify these values to customize the design system.

### Project Data

All portfolio projects are defined in `/src/data/projects.ts`. To add/edit projects:

1. Open `/src/data/projects.ts`
2. Add new project objects to the `PROJECTS` array
3. Follow the `Project` type definition for required fields

---

## 🔍 Verification Checklist

Before deploying, verify:

- [ ] All imports resolve correctly
- [ ] No console errors in development mode
- [ ] All sections render correctly:
  - [ ] Navigation (sticky header)
  - [ ] Hero section with color blocks
  - [ ] Work section (project grid)
  - [ ] Systems section
  - [ ] Essays section
  - [ ] About section
  - [ ] Contact section (form with smooth inputs)
  - [ ] Footer
- [ ] Project detail modal opens correctly
- [ ] Contact form shows toast notification on submit
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Font smoothing works correctly on inputs
- [ ] All links and hover states function properly

---

## 🐛 Troubleshooting

### Build Errors

**Import path issues:**
- Verify all imports use correct relative paths
- UI components should import from `../ui/` or `./src/components/ui/`
- ImageWithFallback imports from `./components/figma/ImageWithFallback` (protected file)

**Missing dependencies:**
- Ensure all package versions are specified where required
- Check for versioned imports like `@radix-ui/react-dialog@1.1.6`

**Styling issues:**
- Ensure `/styles/globals.css` is imported
- Verify Tailwind CSS v4 `@import "tailwindcss"` is at the top of globals.css

### Runtime Errors

**Component not found:**
- Check import paths are correct after restructuring
- Verify shadcn components are in `/src/components/ui/`

**Images not loading:**
- ImageWithFallback component provides automatic fallback
- Verify Unsplash URLs in project data are valid

---

## 📝 Post-Deployment

### Performance Optimization

1. **Enable Gzip/Brotli compression** on your hosting platform
2. **Set up CDN caching** for static assets
3. **Monitor Core Web Vitals** using Lighthouse or PageSpeed Insights

### Monitoring

Consider adding:
- Analytics (Google Analytics, Plausible, etc.)
- Error tracking (Sentry, LogRocket, etc.)
- Performance monitoring (Vercel Analytics, Cloudflare Web Analytics, etc.)

---

## 📧 Contact

For questions about this deployment guide or the portfolio:
- **Email**: austin@example.com
- **GitHub**: https://github.com/austincarson

---

**Last Updated**: 2024  
**Version**: 1.0.0
