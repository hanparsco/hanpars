# Hanpars review website

Static Astro site for the Hanpars redesign, deployed to **https://hanpars.teohan.com** via GitHub Pages.

- `pnpm install` · `pnpm dev` (port 3000) · `pnpm check` · `pnpm build` → `dist/`
- Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).
- Custom domain is set in `public/CNAME`; DNS must point `hanpars.teohan.com` (CNAME) at `<github-user>.github.io`.
- Source data, checks and preserved originals live in `src/data` and `scripts/`.
- Homepage artwork in `public/images/` is original placeholder SVG; replace with final imagery if desired.
