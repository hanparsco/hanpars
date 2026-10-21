# Hanpars review website

Static Astro site for the Hanpars redesign, deployed to **https://hanpars.com** via GitHub Pages.

- `pnpm install` · `pnpm dev` (port 3000) · `pnpm check` · `pnpm build` → `dist/`
- Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).
- Custom domain is set in `public/CNAME`; DNS: hanpars.com A records → GitHub Pages IPs; www CNAME → hanparsco.github.io.
- Source data, checks and preserved originals live in `src/data` and `scripts/`.
- Homepage artwork in `public/images/` is original placeholder SVG; replace with final imagery if desired.
- Photographs: Unsplash (free licence); list in `scripts/photos.txt`, fetched by CI via `scripts/fetch-photos.sh` into `public/photos/`.
- `public/photos/hero-products*.jpg` and `products-shelf-full.jpg` are Hanpars' own photographs (supplied by the owner, 21 Oct 2026).
- Contact form: posts to Web3Forms (`src/data/site.ts`). Set the repository secret/variable `PUBLIC_WEB3FORMS_KEY` (or edit the constant) once the key for contact@hanpars.com is issued.
