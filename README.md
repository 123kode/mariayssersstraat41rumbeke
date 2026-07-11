# Mariayssersstraat 41 — Rumbeke

A simple static one-page website. Plain HTML, CSS and JavaScript — no framework, no build step, no server required.

## Files

- `index.html` — page content and structure
- `style.css` — all styling (design tokens at the top)
- `script.js` — mobile nav toggle, scroll-reveal, and contact form validation

## Run it locally

Just open `index.html` in a browser — everything works from the file system, no build or install step needed.

## Deploy on GitHub Pages

1. Create a new GitHub repository and push these three files (plus this README) to the root of the `main` branch.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, pick branch `main` and folder `/ (root)`.
4. Save — GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Customizing

- Replace the placeholder `info@example.com` in `script.js` with a real contact address (the contact form hands off to the visitor's email client — there's no backend on a static site).
- Swap in real photos by adding an `<img>` in place of the SVG illustrations if you have them, or keep the line-art look.
- All colors, fonts and spacing are defined as CSS custom properties at the top of `style.css` under `:root`.
