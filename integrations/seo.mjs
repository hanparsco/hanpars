/** After build: sitemap index + one sitemap per language (with hreflang alternates) and robots.txt. */
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

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
          pages.set(rel, true);
        }
        const LANGS = [['en', 'en', ''], ['fa', 'fa-IR', '/fa'], ['zh', 'zh-Hans', '/zh'], ['tr', 'tr-TR', '/tr']];
        const langOf = (p) => (LANGS.find(([, , pre]) => pre && (p === pre || p.startsWith(pre + '/'))) || LANGS[0]);
        const strip = (p) => { const [, , pre] = langOf(p); return pre ? (p === pre ? '/' : p.slice(pre.length)) : p; };
        const withPre = (pre, en) => (pre ? (en === '/' ? pre : pre + en) : en);
        const top = /^\/(fdf|api|excipient|nutrition|regulatory-affairs|contact-us-1|about-us|fdf-cdmo)$/;
        const prio = (p) => { const e = strip(p); return e === '/' ? '1.0' : top.test(e) ? '0.9' : e === '/news' ? '0.8' : /^\/(fdf|api)\//.test(e) ? '0.6' : '0.5'; };
        const freq = (p) => { const e = strip(p); return e === '/news' ? 'daily' : /^\/(fdf|api)\//.test(e) ? 'monthly' : 'weekly'; };
        const loc = (p) => esc(site + (p === '/' ? '' : p));
        const byLang = Object.fromEntries(LANGS.map(([l]) => [l, []]));
        for (const p of [...pages.keys()].sort()) {
          const en = strip(p);
          const alts = LANGS.map(([, tag, pre]) => { const q = withPre(pre, en); return pages.has(q) ? `<xhtml:link rel="alternate" hreflang="${tag}" href="${loc(q)}"/>` : ''; }).join('')
            + (pages.has(en) ? `<xhtml:link rel="alternate" hreflang="x-default" href="${loc(en)}"/>` : '');
          byLang[langOf(p)[0]].push(`<url><loc>${loc(p)}</loc><lastmod>${today}</lastmod><changefreq>${freq(p)}</changefreq><priority>${prio(p)}</priority>${alts}</url>`);
        }
        const head = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
        const index = [];
        for (const [l] of LANGS) {
          if (!byLang[l].length) continue;
          await writeFile(join(root, `sitemap-${l}.xml`), head + byLang[l].join('\n') + '\n</urlset>\n');
          index.push(`<sitemap><loc>${site}/sitemap-${l}.xml</loc><lastmod>${today}</lastmod></sitemap>`);
        }
        await writeFile(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${index.join('\n')}\n</sitemapindex>\n`);
        const rows = Object.values(byLang).flat();
        await writeFile(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
        // trailing-slash stubs: /x/ -> /x (earlier crawls used slash URLs; GitHub Pages cannot send 301s)
        let stubs = 0;
        for (const p of pages.keys()) {
          if (p === '/' || /^\/(zh|tr)(\/|$)/.test(p)) continue;
          const dirIdx = join(root, p.slice(1), 'index.html');
          try { await access(dirIdx); continue; } catch {}
          const target = site + p;
          await mkdir(join(root, p.slice(1)), { recursive: true });
          await writeFile(dirIdx, `<!doctype html><html><head><meta charset="utf-8"><title>Redirect</title><link rel="canonical" href="${target}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${target}"><script>location.replace(${JSON.stringify(target)})</script></head><body><a href="${target}">${target}</a></body></html>`);
          stubs++;
        }
        logger.info(`sitemap.xml with ${rows.length} URLs; ${stubs} trailing-slash redirect stubs`);
      },
    },
  };
}
