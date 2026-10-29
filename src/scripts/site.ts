// Anti-harvesting e-mail addresses (see mEnc in src/data/site.ts): decode data-m into a mailto link and visible text.
const mDec = (v: string) => { try { return atob(v).split('').reverse().join(''); } catch { return ''; } };
const revealMail = () => document.querySelectorAll<HTMLElement>('[data-m]').forEach(el => {
  const e = mDec(el.dataset.m || ''); if (!e) return;
  if (el instanceof HTMLAnchorElement) el.href = `mailto:${e}${el.dataset.ms ? `?subject=${encodeURIComponent(el.dataset.ms)}` : ''}`;
  if (el.hasAttribute('data-m-text')) el.textContent = e;
  el.querySelectorAll<HTMLElement>('[data-m-text]').forEach(t => { t.textContent = e; });
});
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', revealMail); else revealMail();
const siteFaDigits = document.documentElement.lang === 'fa';
const siteNum = (s: string | number) => { const t = String(s); return siteFaDigits ? t.replace(/(\d),(?=\d{3}(?!\d))/g, '$1٬').replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]) : t; };
const nav = document.getElementById('main-nav');
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const siteHeader = document.querySelector<HTMLElement>('.site-header');
// Mobile menu. Scroll is locked by fixing <body> at the current offset (iOS Safari ignores overflow:hidden for
// this and, worse, un-sticks the sticky header, which left the header and the menu off-screen mid-page).
let lockedY = 0;
// focusing the button can scroll the page (it sits under scroll-padding-top), so read the offset at press time
let pressY: number | null = null;
menuButton?.addEventListener('pointerdown', () => { pressY = window.scrollY; });
function setMenu(open: boolean, restoreFocus = false) {
  if (!menuButton) return;
  const root = document.documentElement;
  if (open === root.classList.contains('nav-open')) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? (menuButton.dataset.labelClose || 'Close navigation') : (menuButton.dataset.labelOpen || 'Open navigation'));
  if (open) {
    lockedY = pressY ?? window.scrollY; pressY = null;
    root.style.setProperty('--hdr-h', `${siteHeader?.offsetHeight || 0}px`);
    document.body.style.top = `-${lockedY}px`;
    root.classList.add('nav-open');
    nav?.classList.add('is-open');
  } else {
    nav?.classList.remove('is-open');
    root.classList.remove('nav-open');
    document.body.style.top = '';
    window.scrollTo({ top: lockedY, left: 0, behavior: 'instant' as ScrollBehavior });
    if (restoreFocus) menuButton.focus();
  }
}
menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
// close the menu when a link inside it is followed (same-page anchors otherwise leave it open over the target)
nav?.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setMenu(false); });
// close it when the viewport grows to the desktop layout
window.matchMedia('(min-width:1001px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });
window.addEventListener('pageshow', () => setMenu(false));
const onScroll = () => siteHeader?.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
const dropdowns = Array.from(document.querySelectorAll<HTMLDetailsElement>('.nav-dropdown'));
dropdowns.forEach((dropdown) => dropdown.addEventListener('toggle', () => {
  if (dropdown.open) dropdowns.forEach(other => { if (other !== dropdown) other.open = false; });
}));
document.addEventListener('click', (event) => {
  const target = event.target as Node;
  dropdowns.forEach(dropdown => { if (!dropdown.contains(target)) dropdown.open = false; });
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const opened = dropdowns.find(dropdown => dropdown.open);
    dropdowns.forEach(dropdown => { dropdown.open = false; });
    opened?.querySelector<HTMLElement>('summary')?.focus();
    if (menuButton?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  }
});

function installTabKeys(buttons: HTMLButtonElement[]) {
  buttons.forEach((button, index) => button.addEventListener('keydown', (event) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    else return;
    event.preventDefault();
    buttons[next]?.click();
    buttons[next]?.focus();
  }));
}
const guide = document.querySelector<HTMLElement>('[data-guide]');
if (guide) {
  const descriptions: Record<string, {text:string;label:string;href:string}> = {
    sourcing: { text:'Have a product or ingredient in mind? Share its name, specification, quantity and destination market.', label:'Start a sourcing enquiry', href:'/contact-us-1?type=sourcing' },
    regulatory: { text:'Bringing a product to a market? Share the API or FDF, target market, dossier status and support needed.', label:'Start a regulatory enquiry', href:'/contact-us-1?type=regulatory' },
    cdmo: { text:'Planning a finished dosage-form project? Include the dosage form, formulation status and development scope.', label:'Start a CDMO enquiry', href:'/contact-us-1?type=cdmo' },
  };
  const tabs = Array.from(guide.querySelectorAll<HTMLButtonElement>('[data-guide-type]'));
  const result = guide.querySelector<HTMLElement>('#guide-result');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(other => { other.setAttribute('aria-selected', String(other === tab)); other.tabIndex = other === tab ? 0 : -1; });
    const data = descriptions[tab.dataset.guideType || 'sourcing'];
    const description = guide.querySelector<HTMLElement>('[data-guide-description]');
    const link = guide.querySelector<HTMLAnchorElement>('[data-guide-link]');
    if (description) description.textContent = data.text;
    if (link) { link.href = data.href; if (link.firstChild) link.firstChild.textContent = data.label + ' '; }
    result?.setAttribute('aria-labelledby', tab.id);
  }));
  installTabKeys(tabs);
}

const escHtml = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
async function loadCatalogueRows(catalogue: HTMLElement) {
  const src = catalogue.dataset.src; if (!src) return;
  const tbody = catalogue.querySelector('tbody'); if (!tbody) return;
  try {
    const data = await fetch(src).then(r => r.json()) as [string, string, string, string, string?][];
    const locLang = catalogue.dataset.locLang || 'en';
    const base = catalogue.dataset.base || ''; const type = catalogue.dataset.type || 'fdf';
    const enq = (JSON.parse(catalogue.dataset.i18n || '{}').enquire) || 'Enquire';
    tbody.innerHTML = data.map(([n, c, g, sl, loc], i) => {
      const href = sl ? `${base}/${type === 'fdf' ? 'fdf' : 'api'}/${sl}` : '';
      const name = '<span class="cat-ico" aria-hidden="true"></span><span class="cat-text">' + (href ? `<a class="table-link" href="${href}">${escHtml(n)}</a>` : `<span class="cat-plain">${escHtml(n)}</span>`) + (loc ? `<span class="cat-loc" lang="${locLang}" dir="auto">${escHtml(loc)}</span>` : '') + '</span>';
      const code = href && c ? `<a class="table-link table-link-muted" href="${href}">${escHtml(c)}</a>` : escHtml(c || '—');
      return `<tr data-catalogue-row data-status="${escHtml(g)}" data-search="${escHtml((n + ' ' + (loc || '') + ' ' + c).toLowerCase())}" data-index="${i}"><td dir="ltr" class="cat-cell">${name}</td><td class="table-code" dir="ltr">${code}</td><td><a class="table-request" href="${base}/contact-us-1?type=sourcing&product=${encodeURIComponent(n)}">${escHtml(enq)}</a></td></tr>`;
    }).join('');
  } catch { /* keep server-rendered rows */ }
}
for (const catalogue of document.querySelectorAll<HTMLElement>('[data-catalogue]')) { void initCatalogue(catalogue); }
async function initCatalogue(catalogue: HTMLElement) {
  await loadCatalogueRows(catalogue);
  const rows = Array.from(catalogue.querySelectorAll<HTMLTableRowElement>('[data-catalogue-row]'));
  const input = catalogue.querySelector<HTMLInputElement>('[data-catalogue-search]');
  const pageSize = Number(catalogue.dataset.pageSize || '25');
  const i18n = JSON.parse(catalogue.dataset.i18n || '{}') as { inList?:string; matching?:string; none?:string; showing?:string };
  let matching = rows;
  let page = 0;
  let statusFilter = '';
  const filters = Array.from(catalogue.querySelectorAll<HTMLButtonElement>('[data-catalogue-filter]'));
  const select = catalogue.querySelector<HTMLSelectElement>('[data-catalogue-filter-select]');
  const reset = catalogue.querySelector<HTMLButtonElement>('[data-catalogue-reset]');
  const status = catalogue.querySelector<HTMLElement>('[data-catalogue-status]');
  const count = catalogue.querySelector<HTMLElement>('[data-filter-count]');
  const suffix = catalogue.querySelector<HTMLElement>('[data-count-suffix]');
  const pageLabel = catalogue.querySelector<HTMLElement>('[data-page-label]');
  const empty = catalogue.querySelector<HTMLElement>('[data-catalogue-empty]');
  const prev = catalogue.querySelector<HTMLButtonElement>('[data-catalogue-prev]');
  const next = catalogue.querySelector<HTMLButtonElement>('[data-catalogue-next]');
  const pager = catalogue.querySelector<HTMLElement>('[data-catalogue-pager]');
  function render() {
    const start = page * pageSize;
    const end = Math.min(start + pageSize, matching.length);
    rows.forEach(row => { row.hidden = true; });
    matching.slice(start, end).forEach(row => { row.hidden = false; });
    if (count) count.textContent = siteNum(matching.length.toLocaleString(document.documentElement.lang === 'tr' ? 'tr-TR' : 'en-US'));
    if (suffix) suffix.textContent = (input?.value || statusFilter) ? (i18n.matching || 'matching your search') : (i18n.inList || 'in the list');
    if (status) status.textContent = matching.length ? siteNum((i18n.showing || 'Showing {a}–{b} of {n} entries').replace('{a}', String(start+1)).replace('{b}', String(end)).replace('{n}', matching.length.toLocaleString(document.documentElement.lang === 'tr' ? 'tr-TR' : 'en-US'))) : (i18n.none || 'No matching entries');
    if (pageLabel) pageLabel.textContent = siteNum(`${page+1} / ${Math.max(1,Math.ceil(matching.length/pageSize))}`);
    if (empty) empty.hidden = matching.length !== 0;
    if (prev) prev.disabled = page === 0;
    if (next) next.disabled = end >= matching.length;
    if (pager) pager.hidden = matching.length <= pageSize;
  }
  function applyFilters() {
    const search = (input?.value || '').trim().toLowerCase();
    matching = rows.filter(row => (row.dataset.search || '').includes(search) && (!statusFilter || row.dataset.status === statusFilter));
    page = 0;
    render();
  }
  input?.addEventListener('input', applyFilters);
  filters.forEach(button => button.addEventListener('click', () => {
    statusFilter = button.dataset.catalogueFilter || '';
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    applyFilters();
  }));
  select?.addEventListener('change', () => { statusFilter = select.value; if (reset) reset.hidden = !statusFilter; applyFilters(); });
  reset?.addEventListener('click', () => { if (select) select.value = ''; statusFilter = ''; reset.hidden = true; applyFilters(); });
  (catalogue as HTMLElement & { setFilter?: (v: string) => void }).setFilter = (v: string) => { if (select) { select.value = v; select.dispatchEvent(new Event('change')); } };
  prev?.addEventListener('click', () => { if (page > 0) { page--; render(); } });
  next?.addEventListener('click', () => { if ((page+1)*pageSize < matching.length) { page++; render(); } });
  render();
}

const insightsSearch = document.getElementById('insights-search') as HTMLInputElement | null;
if (insightsSearch) {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-insight-card]'));
  insightsSearch.addEventListener('input', () => {
    const query = insightsSearch.value.trim().toLowerCase();
    let matches = 0;
    cards.forEach(card => { const match = (card.dataset.search || '').includes(query); card.hidden = !match; if (match) matches++; });
    const count = document.getElementById('insights-count');
    if (count) count.textContent = siteNum((insightsSearch.dataset.countTpl || '{n} archived articles').replace('{n}', String(matches))) + (query ? (insightsSearch.dataset.matching || ' matching your search') : '');
    const empty = document.getElementById('insights-empty');
    if (empty) empty.hidden = matches !== 0;
  });
}

const form = document.getElementById('brief-form') as HTMLFormElement | null;
if (form) {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-enquiry-type]'));
  const parameters = new URLSearchParams(window.location.search);
  const allowedTypes = ['sourcing','regulatory','cdmo'];
  let type = allowedTypes.includes(parameters.get('type') || '') ? parameters.get('type')! : 'sourcing';
  const formI18n = JSON.parse(form.dataset.i18n || '{}') as { labels?: Record<string, { product:string; specification:string; message:string; heading:string }>; notConnected?:string; sent?:string; failed?:string; sending?:string; send?:string };
  const labels: Record<string, { product:string; specification:string; message:string; heading:string }> = formI18n.labels || {
    sourcing: { product:'Product or ingredient name', specification:'Specification, grade or strength', message:'Documentation needs and other details', heading:'Sourcing enquiry' },
    regulatory: { product:'Product / API / FDF', specification:'Dossier format and current status', message:'Regulatory support needed', heading:'Regulatory affairs enquiry' },
    cdmo: { product:'Product or project name', specification:'Dosage form, strength and project stage', message:'Development / manufacturing support needed', heading:'FDF CDMO enquiry' },
  };
  const status = document.getElementById('brief-status');
  function selectType(selected: string) {
    type = selected;
    tabs.forEach(tab => {
      const active = tab.dataset.enquiryType === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active) form!.setAttribute('aria-labelledby', tab.id);
    });
    const productLabel = document.querySelector<HTMLElement>('[data-product-label]');
    const specLabel = document.querySelector<HTMLElement>('[data-spec-label]');
    const messageLabel = document.querySelector<HTMLElement>('[data-message-label]');
    if (productLabel) productLabel.textContent = labels[type].product;
    if (specLabel) specLabel.textContent = labels[type].specification;
    if (messageLabel) messageLabel.textContent = labels[type].message;
    const typeField = form!.querySelector<HTMLInputElement>('[data-type-field]');
    const subject = form!.querySelector<HTMLInputElement>('[data-subject]');
    if (typeField) typeField.value = labels[type].heading;
    if (subject) subject.value = `${labels[type].heading} — website`;
    const email = mDec(type === 'regulatory' ? (form!.dataset.raEmail || '') : (form!.dataset.email || ''));
    const cc = form!.querySelector<HTMLInputElement>('[data-cc-field]');
    if (cc) cc.value = type === 'regulatory' ? mDec(form!.dataset.raEmail || '') : '';
    const orEmail = form!.querySelector<HTMLAnchorElement>('[data-or-email]');
    if (orEmail && email) { orEmail.href = `mailto:${email}`; const span = orEmail.querySelector('span'); if (span) span.textContent = email; }
  }
  tabs.forEach(tab => tab.addEventListener('click', () => selectType(tab.dataset.enquiryType || 'sourcing')));
  installTabKeys(tabs);
  selectType(type);
  const product = document.getElementById('brief-product') as HTMLInputElement | null;
  if (product && parameters.get('product')) product.value = parameters.get('product')!.slice(0,500);
  const chips = Array.from(form.querySelectorAll<HTMLButtonElement>('[data-chip-for]'));
  const syncChips = () => chips.forEach(chip => { const input = document.getElementById(chip.dataset.chipFor || '') as HTMLInputElement | null; chip.setAttribute('aria-pressed', String(!!input && input.value === chip.dataset.chipValue)); });
  chips.forEach(chip => chip.addEventListener('click', () => { const input = document.getElementById(chip.dataset.chipFor || '') as HTMLInputElement | null; if (!input) return; input.value = input.value === chip.dataset.chipValue ? '' : (chip.dataset.chipValue || ''); syncChips(); }));
  chips.forEach(chip => document.getElementById(chip.dataset.chipFor || '')?.addEventListener('input', syncChips));
  const button = form.querySelector<HTMLButtonElement>('[data-send-brief]');
  const formStart = Date.now();
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    // Bot filter: the hidden honeypot is ticked, or the form was "filled" faster than a person can (under 4 s).
    // Pretend success so the bot learns nothing, and send nothing.
    const trap = form.querySelector<HTMLInputElement>('.botcheck');
    if ((trap && trap.checked) || Date.now() - formStart < 4000) {
      form.reset(); selectType(type); syncChips();
      if (status) status.textContent = formI18n.sent || 'Thank you. Your enquiry has been sent to the Hanpars office; we reply by email.';
      return;
    }
    if (form.dataset.accessKey?.startsWith('PENDING')) {
      if (status) status.textContent = formI18n.notConnected || 'The form is not connected yet. Please email contact@hanpars.com for now.';
      return;
    }
    if (button) { button.disabled = true; button.textContent = formI18n.sending || 'Sending…'; }
    if (status) status.textContent = '';
    try {
      const response = await fetch(form.action, { method:'POST', headers:{ 'Accept':'application/json' }, body:new FormData(form) });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.success !== false) {
        form.reset(); selectType(type); syncChips();
        if (status) status.textContent = formI18n.sent || 'Thank you. Your enquiry has been sent to the Hanpars office; we reply by email.';
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch {
      if (status) status.textContent = formI18n.failed || 'The message could not be sent. Please try again, or email contact@hanpars.com.';
    } finally {
      if (button) { button.disabled = false; button.textContent = formI18n.send || 'Send the enquiry'; }
    }
  });
}

// Remember a visitor's explicit language choice so the home page does not auto-redirect them again.
const langCode = (tag: string) => (tag.startsWith('zh') ? 'zh' : tag.slice(0, 2));
document.querySelectorAll<HTMLAnchorElement>('.lang-panel a[hreflang], .mobile-langs a[hreflang]').forEach(a => a.addEventListener('click', () => {
  try { localStorage.setItem('hp-lang', langCode(a.getAttribute('hreflang') || 'en')); } catch { /* storage unavailable */ }
}));
