/** After build: sitemap index + one sitemap per language (with hreflang alternates) and robots.txt. */
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

async function walk(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc); else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export default function seo({ site }) {
  return {
    name: 'hanpars-seo',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = await walk(root);
        // link hygiene: (a) internal links to duplicate API pages (noindex + canonical elsewhere) go straight to the canonical page;
        // (b) enquiry links with query strings stay crawlable; every variant declares the plain contact page as canonical
        const dupTo = new Map();
        for (const f of files) {
          const rel0 = '/' + relative(root, f).split(sep).join('/').replace(/\.html$/, '');
          if (!/^\/(?:(?:fa|zh|tr)\/)?api\//.test(rel0)) continue;
          const h = await readFile(f, 'utf8');
          if (/http-equiv="refresh"/.test(h) || !/<meta name="robots" content="noindex/.test(h)) continue;
          const c = (/<link rel="canonical" href="([^"]+)"/.exec(h) || [])[1];
          if (c && new URL(c).pathname !== rel0) dupTo.set(rel0, new URL(c).pathname);
        }
        let relinked = 0;
        for (const f of files) {
          const h = await readFile(f, 'utf8');
          let out = h.replace(/href="(\/(?:(?:fa|zh|tr)\/)?api\/[^"#?]+)"/g, (m, p) => dupTo.has(p) ? (relinked++, `href="${dupTo.get(p)}"`) : m);
          // (enquiry links stay followable; their canonical points to the plain contact page)
          if (out !== h) await writeFile(f, out);
        }
        logger.info(`link hygiene: ${relinked} links moved to canonical API pages`);
        const pages = new Map();
        const today = new Date().toISOString().slice(0, 10);
        for (const f of files) {
          let rel = relative(root, f).split(sep).join('/').replace(/\.html$/, '');
          if (rel === '404' || rel.startsWith('ci-')) continue;
          rel = rel === 'index' ? '/' : '/' + rel.replace(/\/index$/, '');
          const html = await readFile(f, 'utf8');
          if (/<meta name="robots" content="noindex/.test(html)) continue;
          const canon = (/<link rel="canonical" href="([^"]+)"/.exec(html) || [])[1];
          if (canon && new URL(canon).pathname !== rel) continue; // only canonical URLs
          // fingerprint of the page's own content (main element, scripts and attributes stripped) for honest <lastmod>
          // fingerprint = visible text of <main> + its internal link targets + the page's JSON-LD (Google's examples of
          // significant change: content, links, structured data); build hashes/asset names are excluded so a redeploy alone keeps the date
          const mainHtml = (/<main\b[\s\S]*?<\/main>/.exec(html) || [html])[0];
          const main = mainHtml.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
          const links = [...mainHtml.matchAll(/href="(\/[^"#?]*)"/g)].map(m => m[1]).sort().join('|');
          const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]).join('');
          pages.set(rel, createHash('sha1').update(main + '\n' + links + '\n' + ld).digest('hex').slice(0, 16));
        }
        // dates from the previous deploy: keep a page's date while its fingerprint is unchanged
        let prev = {};
        try {
          const r = await fetch(`${site}/sitemap-lastmod.json`, { signal: AbortSignal.timeout(20000) });
          if (r.ok) prev = await r.json();
        } catch {}
        const havePrev = Object.keys(prev).length > 0;
        const lastmod = {};
        for (const [p, h] of pages) {
          const old = prev[p];
          lastmod[p] = [h, old && old[0] === h ? old[1] : (havePrev ? today : (old ? old[1] : ''))];
        }
        if (!havePrev) logger.warn('no previous sitemap-lastmod.json: <lastmod> omitted this time');
        await writeFile(join(root, 'sitemap-lastmod.json'), JSON.stringify(Object.fromEntries(Object.entries(lastmod).map(([p, [h, d]]) => [p, [h, d || today]]))));
        const LANGS = [['en', 'en', ''], ['fa', 'fa-IR', '/fa'], ['zh', 'zh-Hans', '/zh'], ['tr', 'tr-TR', '/tr']];
        const langOf = (p) => (LANGS.find(([, , pre]) => pre && (p === pre || p.startsWith(pre + '/'))) || LANGS[0]);
        const strip = (p) => { const [, , pre] = langOf(p); return pre ? (p === pre ? '/' : p.slice(pre.length)) : p; };
        const withPre = (pre, en) => (pre ? (en === '/' ? pre : pre + en) : en);
        const loc = (p) => esc(site + p);
        const byLang = Object.fromEntries(LANGS.map(([l]) => [l, []]));
        for (const p of [...pages.keys()].sort()) {
          const en = strip(p);
          const alts = LANGS.map(([, tag, pre]) => { const q = withPre(pre, en); return pages.has(q) ? `<xhtml:link rel="alternate" hreflang="${tag}" href="${loc(q)}"/>` : ''; }).join('')
            + (pages.has(en) ? `<xhtml:link rel="alternate" hreflang="x-default" href="${loc(en)}"/>` : '');
          const lm = lastmod[p][1];
          byLang[langOf(p)[0]].push(`<url><loc>${loc(p)}</loc>${lm ? `<lastmod>${lm}</lastmod>` : ''}${alts}</url>`);
        }
        const head = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
        const index = [];
        for (const [l] of LANGS) {
          if (!byLang[l].length) continue;
          await writeFile(join(root, `sitemap-${l}.xml`), head + byLang[l].join('\n') + '\n</urlset>\n');
          index.push(`<sitemap><loc>${site}/sitemap-${l}.xml</loc></sitemap>`);
        }
        await writeFile(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${index.join('\n')}\n</sitemapindex>\n`);
        const rows = Object.values(byLang).flat();
        await writeFile(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\nSitemap: ${site}/sitemap-zh.xml\nSitemap: ${site}/sitemap-en.xml\nSitemap: ${site}/sitemap-fa.xml\nSitemap: ${site}/sitemap-tr.xml\n`);
        // trailing-slash and /index.html stubs: /x/ and /x/index.html -> /x, all languages (GitHub Pages cannot send 301s)
        let stubs = 0;
        // also cover the noindex A–Z browse pages (not in the sitemap, but linked from every catalogue)
        const azPaths = files.map(f => '/' + relative(root, f).split(sep).join('/').replace(/\.html$/, '')).filter(p => /^\/(?:(?:fa|zh|tr)\/)?(?:api|fdf)\/a-z\/[^/]+$/.test(p));
        for (const p of [...pages.keys(), ...azPaths]) {
          if (p === '/') continue;
          const dirIdx = join(root, p.slice(1), 'index.html');
          try { await access(dirIdx); continue; } catch {}
          const target = site + p;
          await mkdir(join(root, p.slice(1)), { recursive: true });
          await writeFile(dirIdx, `<!doctype html><html><head><meta charset="utf-8"><title>Redirect</title><link rel="canonical" href="${target}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${target}"><script>location.replace(${JSON.stringify(target)})</script></head><body><a href="${target}">${target}</a></body></html>`);
          stubs++;
        }
        // renamed pages: keep old URLs alive as redirects (Search Console otherwise reports 404s)
        const MOVED = { '/vitamin': '/nutrition', '/fdf/-51992': '/fdf/cream-base-51992', '/fdf/-51993': '/fdf/cream-base-51993', '/fdf/-52309': '/fdf/cream-base-52309' };
        let moved = 0;
        const ONLY = [['/fa', '/partners', '/regulatory-affairs']]; // pages that do not exist in one language
        for (const [pre, from, to] of ONLY) { const target = site + pre + to, file = join(root, (pre + from).slice(1) + '.html'); try { await access(file); } catch { await writeFile(file, `<!doctype html><html><head><meta charset="utf-8"><title>Redirect</title><link rel="canonical" href="${target}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${target}"><script>location.replace(${JSON.stringify(target)})</script></head><body><a href="${target}">${target}</a></body></html>`); moved++; } }
        for (const [from, to] of Object.entries(MOVED)) for (const pre of ['', '/fa', '/zh', '/tr']) {
          const target = site + pre + to, file = join(root, (pre + from).slice(1) + '.html');
          try { await access(file); continue; } catch {}
          await mkdir(join(file, '..'), { recursive: true });
          await writeFile(file, `<!doctype html><html><head><meta charset="utf-8"><title>Redirect</title><link rel="canonical" href="${target}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${target}"><script>location.replace(${JSON.stringify(target)})</script></head><body><a href="${target}">${target}</a></body></html>`);
          moved++;
        }
        logger.info(`sitemap.xml with ${rows.length} URLs; ${stubs} trailing-slash redirect stubs; ${moved} moved-page redirects`);
      },
    },
  };
}
