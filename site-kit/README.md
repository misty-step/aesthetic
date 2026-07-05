# Marketing Site Kit

This is the copyable public-site scaffold for Misty Step product repos. It is
plain HTML, CSS, and a tiny dependency-free script. It has no framework lock-in,
no external asset CDN, and no product-specific build system.

The scaffold is intentionally small. A product repo owns its copy after
adoption; Aesthetic owns the law, tokens, and page pattern.

## DESIGN.md Location

The brand contract lives at **`site/DESIGN.md`**, never at the product repo's
root. A product repo's root is not the kit's to claim — it may already hold an
unrelated, load-bearing document (a UI design system for the product itself,
not its marketing site). Writing to `site/DESIGN.md` scopes the contract next
to the `site/` directory it actually governs and can never collide with
whatever else lives at the root.

## Adoption

From a product repo root, with this repo checked out beside it:

```sh
node ../aesthetic/scripts/scaffold-site-kit.mjs .
```

This copies `site/`, `.github/workflows/pages.yml`, and `site/DESIGN.md` in
one step. It **refuses to write anything** if a single destination path
already exists — it fails loudly and copies nothing rather than silently
overwriting a file the product repo already owns. Re-run it after moving
whatever collided, or copy the remaining files by hand if only part of the
scaffold is missing.

Then edit exactly these fields:

- `site/DESIGN.md`: brand voice, Lucide mark, pitch one-liner, palette hooks,
  and screenshot inventory.
- `site/index.html`: product name, pitch, feature rows, screenshot captions,
  footer links, and the root `data-ae-theme` pin.
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
must also be written in `site/DESIGN.md`.

## Deploy

The copied `.github/workflows/pages.yml` stages only `site/` and deploys through
GitHub Pages. In the product repo:

```sh
git add site .github/workflows/pages.yml
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
