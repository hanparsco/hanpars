# hanpars.com — complete source backup and rebuild guide

Backup date: 2026-11-10 · Git commit: e496185 (branch main) · Live site: https://hanpars.com
Owner: Haniya Parsan Darou Co. (HANPARS), Tehran — contact@hanpars.com

This archive is the **complete source** of the website. Everything the live site shows is generated from the
files in this archive by one build command; no database, CMS or external service is needed to reproduce it.
Give this guide and the archive to any developer or AI assistant and they can rebuild, modify or re-host the site.

## 1. What the site is
- Multilingual static corporate site: **English (default, `/`)**, **Persian `/fa` (RTL)**, **Chinese `/zh`**, **Turkish `/tr`**.
- Sections: home with 12-slide product hero, FDF (finished dosage forms) portfolio with product photos and a
  ~4,000-row searchable reference table, API (active ingredients) pages per molecule, excipients, supplements,
  FDF CDMO service page, regulatory-affairs service page, China→Iran corridor page, import-activity (2026 customs
  data visual), insights/articles, news feed (auto-fetched), partners, about, contact forms (Web3Forms + hCaptcha).
- ~4,000+ generated pages (every FDF product and API molecule has its own page in every language).

## 2. Technology
- **Astro 5.13.2** static site generator (`output: 'static'`, `build.format: 'file'`, `trailingSlash: 'never'`), TypeScript, plain CSS.
- Node.js 20+ and **pnpm** (`packageManager` pinned in package.json). No frameworks (no React/Vue), no CSS framework.
- Python 3 (stdlib + Pillow) only for the data/news fetch scripts in `scripts/` — not needed to build the site.
- Hosting: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`), repo `hanparsco/hanpars`, custom domain hanpars.com
  (DNS at GoDaddy: apex A records → GitHub Pages IPs, `www` CNAME → hanparsco.github.io). Any static host works (Netlify,
  Vercel, Cloudflare Pages, S3, nginx): upload the `dist/` folder produced by the build.

## 3. Rebuild in 3 commands
```bash
pnpm install          # installs astro + typescript from package.json / pnpm-lock.yaml
pnpm check            # optional: type/astro check
pnpm build            # → dist/  (complete static site, ~1.4 GB because of thousands of pages and image sizes)
pnpm dev              # local preview on http://localhost:3000
```
Optional environment variable: `PUBLIC_WEB3FORMS_KEY` (contact-form key; a default is hard-coded in `src/data/site.ts`).

## 4. Folder map
| Path | Content |
|---|---|
| `src/pages/` | Routes. `index.astro` (EN home), `[page].astro` (EN standard pages), `fdf/`, `api/`, `insights/`, `data/` (JSON endpoints built from src/data), and mirrored `fa/`, `zh/`, `tr/` folders. |
| `src/components/` | All UI: `Home.astro`, `HeroSlides.astro` (12 product slides), `FdfPortfolio.astro` (photo cards), `Catalogue.astro` (reference table), `ProductPage.astro` (FDF product page), `MoleculePage.astro` (API page), `ContactPage.astro` (forms, RA request form), `CdmoPage.astro`, `RegulatoryPage.astro`, `ChinaIranPage.astro`, `ImportActivityPage.astro` + `Imports2026.astro`, `NewsCard/NewsPage`, `InsightsPage/ArticlePage`, `Header/Footer`, etc. |
| `src/layouts/Layout.astro` | HTML shell: meta/SEO/hreflang/JSON-LD (Organization), fonts, language auto-redirect on EN home, analytics-free. |
| `src/styles/global.css` | The whole design system (colours, type, layout, RTL, per-language fonts, components). Single file. |
| `src/scripts/site.ts` | All client JS: navigation, hero carousel, catalogue search/paging (lazy JSON), contact-form validation (all fields required, corporate-email rule for en/fa/tr, urgency box, RA field set, hCaptcha), e-mail de-obfuscation. `portfolio.ts` = FDF card filters/counters. |
| `src/data/` | **All content and data**: `fdf.json` (registered + reference FDF list), `fdf-info*.json` (per-product label summaries, 4 langs), `fdf-editorial.json`, `molecules*.json` (API data, 4 langs), `apis.json`, `api-classes.json`, `excipients*.json`, `supplements*.json`, `regulatory*.json`, `portfolio*.{json,ts}` (photo cards), `portfolio-photos.json` (card→photo map), `imports-2026.json` (customs totals), `articles*.json` (insights), `cdmo*.ts`, `cdmo-faq.ts`, `faq.*.json`, `seo-*.ts` (titles/descriptions/schema), `site.ts` (company facts, addresses, phones, form key), `text.ts` + `src/i18n/` (UI strings). |
| `public/` | Static assets: `images/portfolio/` (product pack shots, WebP 2400/1200/640), `images/hero/` (12 slides, 900/1600), `fonts/` (Inter, Sora, Montserrat, Source Sans 3, Narengi [Persian, licensed to owner], noto-sc [unused since 2026-11-10]), `news/` (thumbnails), `brand/` logos, `favicon`, `CNAME`, `robots.txt`. |
| `integrations/` | Astro build plugins: `persian-digits.mjs` (converts digits to Persian on /fa pages at build time), `seo.mjs` (sitemaps per language following robots meta, IndexNow list). |
| `scripts/` | Data pipeline (Python): `fetch-fdf-info.py` (DailyMed label summaries), `fetch-molecules.py`, `fetch-cas.py`, `fetch-news*.py` (EN/FA/ZH news with thumbnails), `extract-*.py` (original data extraction from the old site), `seo-audit.mjs`, `lang-audit.mjs`, `live-check.py`, `indexnow.py`, `make-noto-sc.py`. `scripts/source/` keeps the raw source HTML the data was extracted from. |
| `.github/workflows/` | `deploy.yml` (build → Pages → IndexNow → smoke test; push to `audit` branch builds a preview into branch `dist-audit`), `news*.yml` (every 4 h), `fdf-info.yml`, `molecules.yml`, `cas.yml`, `live-check.yml`. Secrets used: `BAIDU_PUSH_TOKEN` (optional), `GITHUB_TOKEN` (automatic). |
| `tools/drive-backup.gs` | Google Apps Script that copies the daily backup into Google Drive. |
| `docs/`, `TODO.md`, `plan.md`, `validation-report.md` | Working notes. `HISTORY.txt` (in this archive) = full git log. |

## 5. Business rules embedded in the site (keep when recreating)
- Hanpars sells FDF only to nationwide pharmaceutical distributors (پخش‌های سراسری) and APIs only to pharmaceutical
  manufacturers — stated on Persian product pages and as a notice banner on every Persian request form.
- Contact/enquiry forms: every field required; corporate e-mail addresses only (free-mail blocked) for EN/FA/TR, not ZH;
  "Urgent" choice opens a mandatory reason box; the Regulatory-Affairs form has its own service list (9 services + other).
- Product label text is summarised from FDA prescribing information via DailyMed with a dated source line; Iranian
  registration/labelling may differ (disclaimer shown).
- Financial/commercial terms text (BUS-01 block) must not be altered.
- Chinese pages use a different logo variant (`public/brand/`) and system CJK fonts.

## 6. Not included in this archive
- `node_modules/` and `dist/` (regenerated by `pnpm install` / `pnpm build`).
- `product-photo-bank/` (334 MB of raw original product photographs; the processed WebP versions used by the site are
  included in `public/images/portfolio/`). Available on request as a separate archive.
- The `.git` history itself (see `HISTORY.txt` for the log).

## 7. Automatic backup
`.github/workflows/backup.yml` rebuilds this archive every day at 02:00 Tehran and publishes it as the asset of the
GitHub release `backup-latest`; `tools/drive-backup.gs` (Google Apps Script) copies it into the Drive folder
`hanpars-com-backup` between 07:00 and 08:00 and keeps the last 7 daily copies.
