# Marketing Site Kit

This is the copyable public-site scaffold for Misty Step product repos. It is
plain HTML, CSS, and a tiny dependency-free script. It has no framework lock-in,
no external asset CDN, and no product-specific build system.

The scaffold is intentionally small. A product repo owns its copy after
adoption; Aesthetic owns the law, tokens, and page pattern.

## Copy-Paste Adoption

From a product repo root, with this repo checked out beside it:

```sh
mkdir -p site .github/workflows
cp -R ../aesthetic/site-kit/scaffold/site/. site/
cp ../aesthetic/aesthetic.css site/aesthetic.css
cp ../aesthetic/recipes/mode.js site/mode.js
cp ../aesthetic/site-kit/DESIGN.template.md DESIGN.md
cp ../aesthetic/site-kit/scaffold/.github/workflows/pages.yml .github/workflows/pages.yml
```

Then edit exactly these fields:

- `DESIGN.md`: brand voice, Lucide mark, pitch one-liner, palette hooks, and
  screenshot inventory.
- `site/index.html`: product name, pitch, feature rows, screenshot captions,
  footer links.
- `site/changelog.html`: user-facing release notes.
- `site/marketing.css`: only the `:root` brand hooks at the top, unless the
  product genuinely needs a layout exception.
- `site/assets/screenshots/*.svg`: replace with real screenshots or GIFs. Keep
  filenames stable or update the `src` and `data-full` attributes.

## Link Contract

Keep these footer links visible:

- `mistystep.io`: always present.
- GitHub: present when the repo is public.
- Weave: present for weave-family products; remove it only for products outside
  that family.

## Mark Contract

Use a Lucide icon in `.ae-app-mark`. Do not draw a bespoke logo or import a logo
image. The SVG symbol can be inlined in `index.html`; the selected icon name
must also be written in `DESIGN.md`.

## Deploy

The copied `.github/workflows/pages.yml` stages only `site/` and deploys through
GitHub Pages. In the product repo:

```sh
git add DESIGN.md site .github/workflows/pages.yml
git commit -m "Add public marketing site"
git push
```

Enable GitHub Pages for the repository's Actions deployment source if it is not
already enabled. The first successful `pages` workflow run is the public proof.

## Local Proof

Before opening a product PR:

```sh
python3 -m http.server 8642 --bind 127.0.0.1
```

Open `http://127.0.0.1:8642/site/` and inspect:

- light and dark modes;
- hero/pitch, features, screenshots, and footer links;
- screenshot click-to-zoom behavior;
- `site/changelog.html`.

If the product repo has adopted the Aesthetic law gate, add the site routes to
that gate before merging.
