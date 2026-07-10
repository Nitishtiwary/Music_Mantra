# Muzic Mantra — Official Band Website

A modern, responsive, high-performance music band website built with vanilla HTML, CSS, and JavaScript. Designed for GitHub Pages deployment with a dark neon aesthetic.

![Muzic Mantra](https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop&q=80)

## Features

- **11 complete sections** — Hero, About, Band Members, Album, Videos, Tours, Gallery, Merch, Newsletter, Contact, Footer
- **Dark neon theme** with glassmorphism cards and vibrant accent colors
- **Mobile-first responsive design** with hamburger navigation
- **Smooth animations** — scroll reveal, typing effect, hover effects, card lift, image zoom
- **Accessibility** — semantic HTML, ARIA labels, skip link, keyboard navigation, reduced motion support
- **SEO optimized** — meta tags, Open Graph, Twitter cards, sitemap, robots.txt
- **Performance** — lazy loading, no frameworks, minimal dependencies
- **Interactive features** — lightbox gallery, form validation, scroll progress bar, back-to-top button

## Project Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (CSS variables, Grid, Flexbox)
├── js/
│   └── script.js       # Modular vanilla JavaScript
├── images/             # Local image assets (replace placeholders)
├── assets/
│   └── favicon.svg     # SVG favicon
├── favicon.ico         # ICO favicon
├── robots.txt          # Search engine directives
├── sitemap.xml         # Site map for SEO
└── README.md           # This file
```

## Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Muzic_Mantra.git
   cd Muzic_Mantra
   ```

2. **Serve locally** (choose one method)

   **Python:**
   ```bash
   python3 -m http.server 8000
   ```

   **Node.js (npx):**
   ```bash
   npx serve .
   ```

   **VS Code / Cursor:** Use the Live Server extension and open `index.html`

3. **Open in browser**

   Navigate to `http://localhost:8000`

> No build step required. The site runs directly from static files.

## GitHub Pages Deployment

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Muzic Mantra band website"
   git branch -M main
   git remote add origin https://github.com/yourusername/Muzic_Mantra.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**

   - Go to your repository on GitHub
   - Navigate to **Settings → Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose branch: `main`, folder: `/ (root)`
   - Click **Save**

3. **Access your site**

   Your site will be live at:
   `https://yourusername.github.io/Muzic_Mantra/`

4. **Update SEO URLs**

   After deployment, replace `yourusername` in these files:
   - `index.html` — canonical URL, Open Graph, Twitter meta tags
   - `robots.txt` — sitemap URL
   - `sitemap.xml` — all `<loc>` entries

## Customization Guide

### Band Name & Branding

| What to change | Where |
|----------------|-------|
| Band name | `index.html` — hero title, nav logo, footer |
| Tagline / typing phrases | `js/script.js` → `TypingAnimation.phrases` |
| Colors & theme | `css/style.css` → `:root` CSS variables |
| Fonts | `index.html` Google Fonts link + `css/style.css` variables |

### Content Sections

| Section | File | What to edit |
|---------|------|--------------|
| About story & timeline | `index.html` | `#about` section |
| Band members | `index.html` | `#band` section — photos, names, roles, social links |
| Album & tracks | `index.html` | `#album` section — artwork, tracklist, Spotify embed |
| Music videos | `index.html` | `#videos` section — YouTube iframe URLs |
| Tour dates | `index.html` | `#tours` section — dates, venues, ticket links |
| Gallery | `index.html` | `#gallery` section — image URLs and alt text |
| Merchandise | `index.html` | `#merch` section — products, prices, buy links |
| Contact info | `index.html` | `#contact` section — emails, management details |

### Replace Placeholder Images

Current images use Unsplash URLs. Replace with your own:

1. Add images to the `images/` folder
2. Update `src` attributes in `index.html`
3. Add `images/og-cover.jpg` (1200×630) for social sharing

### Spotify / YouTube Embeds

- **Spotify:** Get embed code from [open.spotify.com](https://open.spotify.com) → Share → Embed
- **YouTube:** Replace video IDs in iframe `src` URLs
- **Apple Music / YouTube Music:** Update button `href` attributes with your album links

### Forms

Newsletter and contact forms use client-side validation only (no backend). To connect to a service:

- [Formspree](https://formspree.io)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [EmailJS](https://www.emailjs.com)

Update form `action` attributes and add the provider's integration script.

## Browser Support

Tested and working on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source. Replace all placeholder content, images, and embeds with your band's official assets before going live.

---

Built with passion for live music. **Feel the frequency. Live the mantra.**
