# 🌿 The Grove · Vinayak Mali's Portfolio

Generated Using Claude

A living portfolio reimagined as a forest ecosystem — scroll through the
**roots**, **canopy**, **garden**, **tree rings**, **fallen leaves**, and
**constellations**, and end at a rippling **pond**. Built with plain HTML,
CSS, and JavaScript. No frameworks, no build step.

## ✨ What makes it different

- **Day / Night mode** — the whole scene morphs: sun becomes moon, the sky
  darkens, stars appear, falling leaves become drifting fireflies.
- **Parallax forest background** — mountains, far pines, near pines, and a
  celestial body all move at different depths as you scroll.
- **Custom firefly cursor** (desktop) — a soft glowing dot with a pulsing halo
  that grows on interactive elements.
- **Interactive skill tree** — an SVG tree whose branches light up with
  glowing leaves when you pick a skill category.
- **Project garden** — each project is a "plant" that animates open on hover
  and opens a full anatomy modal on click.
- **Tree-ring experience timeline** — a slowly rotating cross-section of a
  trunk paired with each role's details.
- **Constellation of achievements** — a dark sky with connected stars; hover
  or tap a star and its story appears below.
- **Rippling pond contact section** — a canvas-based pond that ripples on
  click and hover, with ambient ripples between.
- **Responsive & accessible** — works on mobile, respects
  `prefers-reduced-motion`, and keeps focus visible on interactive elements.

## 🗂 File structure

```
.
├── index.html   # semantic structure + SVG scene + sections
├── style.css    # theming, typography, animations, responsive layout
├── script.js    # particles, tree, constellation, pond, parallax, modal
└── README.md
```

Three files. No dependencies. Drop them anywhere.

## 🚀 Deploy on GitHub Pages

1. **Create a new repository** on GitHub (e.g. `malivinayak.github.io` for a
   user site, or any name like `the-grove` for a project site).
2. **Add these files** to the repository root:
   ```
   index.html
   style.css
   script.js
   README.md
   ```
3. **Commit & push**.
4. Go to **Settings → Pages** in the repo.
5. Under "Build and deployment" → "Source", pick **Deploy from a branch**.
6. Choose branch **`main`** (or `master`) and folder **`/ (root)`**, then
   **Save**.
7. Wait ~1 minute. Your site will be live at:
   - `https://<username>.github.io/` (user/org site), or
   - `https://<username>.github.io/<repo-name>/` (project site).

### One-line git deploy

```bash
git init
git add .
git commit -m "Plant the grove"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Then enable Pages in Settings as above.

### Custom domain (optional)

Add a `CNAME` file at the repo root containing your domain (e.g.
`malivinayak.com`), and point the domain's DNS at GitHub Pages.

## 🎨 Customizing

All portfolio data lives in the `DATA` object at the top of `script.js` —
edit projects, skills, experience, blog posts, and contact links there.

Color palette and typography are CSS variables at the top of `style.css`:

```css
--bark, --moss, --leaf, --sun, --sky-1/2/3, --cream, --paper, ...
--f-display: Fraunces
--f-body:    Crimson Pro
--f-mono:    JetBrains Mono
```

Change a variable and the whole grove shifts.

## 🛠 Local preview

No build step needed. Any static server works:

```bash
# python
python3 -m http.server 8000

# node
npx serve .
```

Then open `http://localhost:8000`.

## 📜 License

Content (text, data) is © Vinayak Mali. The structure and design of the
grove itself are free to fork and replant elsewhere — just keep the forest
growing.
