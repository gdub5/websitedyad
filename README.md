# websitedyad

The marketing website for **Dyad CX**, live at **[dyad.cx](https://dyad.cx)**.

Dyad CX helps mid-market companies close the gap between AI investment and AI value, focusing on the organizational readiness and change management that technology vendors ignore. This repo is the public-facing site: the home page, services, about, projects, and the legal pages.

## Stack

Plain static HTML, CSS, and a small amount of vanilla JavaScript. No build step, no framework, no dependencies to install.

- `index.html` — home (hero, services, contact)
- `projects.html` — open-source projects: MCP connectors and Claude skills we build and share
- `about.html` — founder background
- `privacy.html`, `terms.html` — legal
- `thank-you.html`, `thank-you-meeting.html` — form confirmations
- `404.html` — not found
- `css/styles.css` — single stylesheet. All design tokens (the 70s Retro palette, spacing, type) live in `:root` at the top
- `js/main.js` — nav toggle, scroll animations, and other small interactions
- `images/`, `brandresources/` — assets
- `sitemap.xml`, `robots.txt`, `CNAME` — SEO and custom-domain config

## Run it locally

Any static file server works. With [Bun](https://bun.sh):

```bash
bunx serve -l 3000 .
```

Then open <http://localhost:3000>. Or use Python: `python3 -m http.server 3000`.

## Deploy

Pushing to `main` triggers `.github/workflows/static.yml`, which deploys the site to GitHub Pages. The `CNAME` file points the Pages deployment at the `dyad.cx` custom domain. There's nothing to build, the repo is served as-is.

## Editing notes

- Colors, spacing, and typography are CSS custom properties in `css/styles.css` under `:root`. Change a token there and it updates everywhere.
- The header nav and footer are duplicated across each HTML page (no templating), so a nav change means editing every page.
- Copy follows the Dyad CX brand voice: clear and direct, American spelling, no em-dashes, no hype words.
