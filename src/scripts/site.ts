const nav = document.getElementById('main-nav');
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav?.classList.toggle('is-open', open);
});
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
    if (menuButton?.getAttribute('aria-expanded') === 'true') {
      nav?.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      menuButton.focus();
    }
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

for (const catalogue of document.querySelectorAll<HTMLElement>('[data-catalogue]')) {
  const rows = Array.from(catalogue.querySelectorAll<HTMLTableRowElement>('[data-catalogue-row]'));
  const input = catalogue.querySelector<HTMLInputElement>('[data-catalogue-search]');
  const pageSize = Number(catalogue.dataset.pageSize || '25');
  let matching = rows;
  let page = 0;
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
    if (count) count.textContent = matching.length.toLocaleString('en-US');
    if (suffix) suffix.textContent = input?.value ? 'matching your search' : 'in the reference list';
    if (status) status.textContent = matching.length ? `Showing ${start+1}–${end} of ${matching.length.toLocaleString('en-US')} entries` : 'No matching entries';
    if (pageLabel) pageLabel.textContent = `${page+1} / ${Math.max(1,Math.ceil(matching.length/pageSize))}`;
    if (empty) empty.hidden = matching.length !== 0;
    if (prev) prev.disabled = page === 0;
    if (next) next.disabled = end >= matching.length;
    if (pager) pager.hidden = matching.length <= pageSize;
  }
  input?.addEventListener('input', () => {
    const search = input.value.trim().toLowerCase();
    matching = rows.filter(row => (row.dataset.search || '').includes(search));
    page = 0;
    render();
  });
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
    if (count) count.textContent = `${matches} archived article${matches===1?'':'s'}${query?' matching your search':''}`;
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
  const labels: Record<string, { product:string; specification:string; message:string; heading:string }> = {
    sourcing: { product:'Product or ingredient name', specification:'Specification, grade or strength', message:'Documentation needs & other details', heading:'Pharmaceutical sourcing enquiry' },
    regulatory: { product:'Product / API / FDF', specification:'Dossier format & current status', message:'Regulatory support needed', heading:'Regulatory Affairs enquiry' },
    cdmo: { product:'Product or project name', specification:'Dosage form, strength & project stage', message:'Development / manufacturing support needed', heading:'FDF CDMO enquiry' },
  };
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
    if (productLabel) productLabel.textContent = labels[type].product + ' *';
    if (specLabel) specLabel.textContent = labels[type].specification;
    if (messageLabel) messageLabel.textContent = labels[type].message;
    const result = document.getElementById('brief-result');
    if (result) result.hidden = true;
  }
  tabs.forEach(tab => tab.addEventListener('click', () => selectType(tab.dataset.enquiryType || 'sourcing')));
  installTabKeys(tabs);
  selectType(type);
  const product = document.getElementById('brief-product') as HTMLInputElement | null;
  if (product && parameters.get('product')) product.value = parameters.get('product')!.slice(0,500);
  let brief = '';
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = (name:string) => String(data.get(name) || '').trim();
    const lines = [
      labels[type].heading,
      `${labels[type].product}: ${value('product')}`,
      value('specification') ? `${labels[type].specification}: ${value('specification')}` : '',
      value('quantity') ? `Quantity / project scale: ${value('quantity')}` : '',
      value('market') ? `Target market / destination: ${value('market')}` : '',
      value('timing') ? `Requested timing: ${value('timing')}` : '',
      value('message') ? `${labels[type].message}:\n${value('message')}` : '',
    ];
    brief = lines.filter(Boolean).join('\n\n');
    const result = document.getElementById('brief-result');
    const text = document.getElementById('brief-text');
    const status = document.getElementById('brief-status');
    if (text) text.textContent = brief;
    if (status) status.textContent = 'Prepared locally. Not sent.';
    if (result) { result.hidden = false; result.scrollIntoView({ behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'center' }); }
  });
  form.addEventListener('input', () => { const result = document.getElementById('brief-result'); if (result) result.hidden = true; });
  const prepareButton = form.querySelector<HTMLButtonElement>('[data-prepare-brief]');
  if (prepareButton) prepareButton.disabled = false;
  document.getElementById('copy-brief')?.addEventListener('click', async () => {
    const status = document.getElementById('brief-status');
    try { await navigator.clipboard.writeText(brief); if (status) status.textContent = 'Brief copied. Paste it into the message field on the existing contact form.'; }
    catch {
      const text = document.getElementById('brief-text');
      if (text) { const range = document.createRange(); range.selectNodeContents(text); const selection = window.getSelection(); selection?.removeAllRanges(); selection?.addRange(range); }
      if (status) status.textContent = 'Your browser blocked automatic copying. The brief is selected: use Copy, or download it.';
    }
  });
  document.getElementById('download-brief')?.addEventListener('click', () => {
    if (!brief) return;
    const url = URL.createObjectURL(new Blob([brief], { type:'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'hanpars-enquiry-brief.txt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    const status = document.getElementById('brief-status');
    if (status) status.textContent = 'Brief downloaded. Nothing has been submitted.';
  });
}
