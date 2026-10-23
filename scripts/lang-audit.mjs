// Language audit over the built site: node scripts/lang-audit.mjs dist zh
// Checks every page under /<lang>: html lang, Chinese/Turkish title + description, canonical, hreflang set,
// links that leave the language, broken internal links, and untranslated English phrases in visible text.
import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
const [root = 'dist', lang = 'zh'] = process.argv.slice(2);
const HTML_LANG = { zh: 'zh-Hans', tr: 'tr', fa: 'fa' }[lang];
const SCRIPT = { zh: /[一-鿿]/, tr: /[çğışöüİ]|\b(ve|için|ile|bir)\b/i, fa: /[؀-ۿ]/ }[lang];
async function walk(d, acc = []) { for (const e of await readdir(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) await walk(p, acc); else if (e.name.endsWith('.html')) acc.push(p); } return acc; }
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };
const files = (await walk(join(root, lang))).concat(await exists(join(root, `${lang}.html`)) ? [join(root, `${lang}.html`)] : []);
const issues = {}; const add = (k, v) => (issues[k] ??= []).push(v);
const phrases = new Map();
// Latin that is allowed inside Chinese/Turkish text: names, codes, brands, units, drug-label Latin
const ALLOW = /^(Hanpars|HANPARS|Haniya Parsan Darou( Co\.)?|Pakhsh Razi|Darougostar Tooba|Dey Darou Omid|Hanpars Pharmaceutical Trading Co\.)/;
const linkCache = new Map();
let checked = 0;
for (const f of files) {
  const rel = '/' + relative(root, f).split(sep).join('/').replace(/\.html$/, '').replace(/(^|\/)index$/, '');
  const h = await readFile(f, 'utf8');
  if (/http-equiv="refresh"/.test(h)) continue;
  checked++;
  const g = (re) => (re.exec(h) || [])[1] || '';
  const isProduct = /^\/\w+\/(fdf|api)\//.test(rel);
  if (g(/<html lang="([^"]+)"/) !== HTML_LANG) add('html lang wrong', rel);
  const title = g(/<title>([^<]*)<\/title>/); const desc = g(/<meta name="description" content="([^"]*)"/);
  if (!SCRIPT.test(title) && !isProduct) add('title not in target language', `${rel} :: ${title}`);
  if (!SCRIPT.test(desc)) add('description not in target language', `${rel} :: ${desc.slice(0, 100)}`);
  if (!/noindex/.test(g(/<meta name="robots" content="([^"]+)"/))) {
    const canon = g(/<link rel="canonical" href="([^"]+)"/);
    if (canon && new URL(canon).pathname !== rel) add('canonical mismatch', `${rel} -> ${canon}`);
    const hl = (h.match(/rel="alternate" hreflang="/g) || []).length;
    if (hl < 5) add('hreflang set incomplete', `${rel} (${hl})`);
  }
  // links
  for (const m of h.matchAll(/<a\b[^>]*href="([^"#?]+)[^"]*"/g)) {
    const href = m[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    if (/^\/(photos|brand|fonts|data|news)\//.test(href) || /\.(png|jpg|svg|pdf|txt|xml|json)$/.test(href)) continue;
    if (!href.startsWith(`/${lang}`) && !/hreflang=/.test(m[0]) && !/^\/insights\//.test(href)) add('link leaves the language', `${rel} -> ${href}`);
    if (!linkCache.has(href)) linkCache.set(href, await exists(join(root, href.slice(1) + '.html')) || await exists(join(root, href.slice(1), 'index.html')) || href === '/');
    if (!linkCache.get(href)) add('broken internal link', `${rel} -> ${href}`);
  }
  // visible text: drop head, scripts, styles, svg, code, elements explicitly marked English
  let body = h.slice(h.indexOf('<body'));
  body = body.replace(/<(script|style|svg|code|pre|noscript)\b[\s\S]*?<\/\1>/g, ' ')
             .replace(/<([a-z0-9]+)\b[^>]*\blang="en"[^>]*>[\s\S]*?<\/\1>/g, ' ')
             .replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ');
  for (const line of body.split('\n').map(s => s.trim()).filter(Boolean)) {
    if (SCRIPT.test(line)) continue;                       // line contains target-language text
    const words = line.match(/[A-Za-z][A-Za-z'’-]+/g) || [];
    if (words.length < 3 || ALLOW.test(line)) continue;
    const key = line.slice(0, 90);
    const e = phrases.get(key) || { n: 0, pages: [] }; e.n++; if (e.pages.length < 3) e.pages.push(rel); phrases.set(key, e);
  }
}
// phrases repeating on many pages = untranslated UI; phrases on few pages = page content (news headlines, data names)
const english = [...phrases].sort((a, b) => b[1].n - a[1].n).map(([t, e]) => `${e.n}× ${t} :: ${e.pages.join(', ')}`);
const report = { lang, pages: checked, issues: Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, { count: v.length, sample: v.slice(0, 40) }])), englishLines: { distinct: english.length, top: english.slice(0, 250) } };
await writeFile(`lang-audit-${lang}.json`, JSON.stringify(report, null, 1));
console.log(`lang audit ${lang}: ${checked} pages; ` + Object.entries(report.issues).map(([k, v]) => `${k}: ${v.count}`).join('; ') + `; English-only lines: ${english.length}`);
