# Reframe — Structured Website Preview Platform

A dark-themed, infrastructure-level marketing site. Static HTML/CSS/JS — deployable to GitHub Pages with zero build steps.

---

## File Structure

```
reframe/
├── index.html          ← Main page
├── styles.css          ← Full design system & layout
├── script.js           ← All interactivity (modal, parallax, form, reveal)
├── assets/
│   ├── noise.svg       ← Subtle background texture overlay
│   └── favicon.svg     ← Browser tab icon
└── README.md
```

---

## Setup

### 1. Form — Formspree (free, static-compatible)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — note your Form ID (looks like `xpwzqdkv`)
3. In `index.html`, find this line:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
4. Replace `YOUR_FORM_ID` with your actual Formspree form ID

### 2. Video — Modal placeholder

In `index.html`, find the `<!-- VIDEO INTEGRATION -->` comment inside `.modal-video-area`.

Three options are documented in the comments:
- **YouTube**: Paste your embed iframe
- **Self-hosted**: Use the `<video>` tag with your MP4 in `assets/`
- **Vimeo**: Paste your Vimeo iframe

Remove the `<div class="modal-placeholder">` block once you add a real video.

---

## GitHub Pages Deployment

1. Push the entire `reframe/` folder contents to a GitHub repository (files should be at root)
2. Go to **Settings → Pages**
3. Source: **Deploy from branch** → `main` → `/ (root)`
4. Save — your site will be live at `https://yourusername.github.io/reframe/`

For a custom domain, add a `CNAME` file to the root with your domain name:
```
reframe.io
```

---

## Design System Quick Reference

| Token | Value |
|-------|-------|
| Background Primary | `#0E0E11` |
| Background Alt | `#141419` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `#B8B8C5` |
| Text Muted | `#8C8CA3` |
| Accent Lavender | `#B8A8FF` |
| Accent Blue | `#9BB8FF` |
| Accent Mint | `#9FE6C3` |

All CSS custom properties are defined in `:root` in `styles.css`.

---

## Customisation Notes

- **Logo**: Edit `.nav-logo` text in `index.html`
- **Hero copy**: Lines 40–55 in `index.html`
- **Section copy**: Self-evident in HTML structure
- **Fonts**: Swap `DM Sans` in the Google Fonts `<link>` and update `font-family` in `styles.css` body rule
- **Glow opacity**: All glows are controlled by `rgba(184,168,255, X)` — keep X between `0.08` and `0.18`
- **Copyright year**: Footer, last line of `index.html`

---

Built with plain HTML, CSS, and vanilla JS. No frameworks. No build tools.
