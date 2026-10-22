const pfFaDigits = document.documentElement.lang === 'fa';
const pfNum = (s: string | number) => { const t = String(s); return pfFaDigits ? t.replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]) : t; };
const portfolio = document.querySelector<HTMLElement>('[data-portfolio]');

if (portfolio) {
  const cards = Array.from(portfolio.querySelectorAll<HTMLElement>('[data-portfolio-card]'));
  const rows = Array.from(portfolio.querySelectorAll<HTMLTableRowElement>('[data-portfolio-row]'));
  const groups = Array.from(portfolio.querySelectorAll<HTMLElement>('[data-portfolio-group]'));
  const areaButtons = Array.from(portfolio.querySelectorAll<HTMLButtonElement>('[data-portfolio-area]'));
  const viewButtons = Array.from(portfolio.querySelectorAll<HTMLButtonElement>('[data-portfolio-view]'));
  const search = portfolio.querySelector<HTMLInputElement>('[data-portfolio-search]');
  const cardView = portfolio.querySelector<HTMLElement>('[data-portfolio-cards]');
  const tableView = portfolio.querySelector<HTMLElement>('[data-portfolio-table]');
  const counter = portfolio.querySelector<HTMLElement>('[data-portfolio-count]');
  const empty = portfolio.querySelector<HTMLElement>('[data-portfolio-empty]');
  const i18n = JSON.parse(portfolio.dataset.i18n || '{}') as { count?:string; filtered?:string; molecule?:string; molecules?:string };
  let area = 'all';
  let query = '';
  let view = 'cards';

  function apply() {
    const matches = (entry:HTMLElement) => (area === 'all' || entry.dataset.area === area) && (entry.dataset.search || '').includes(query);
    let count = 0;
    const visibleAreas = new Set<string>();
    cards.forEach(card => {
      const show = matches(card);
      card.hidden = !show;
      if (show) { count++; visibleAreas.add(card.dataset.area || ''); }
    });
    rows.forEach(row => { row.hidden = !matches(row); });
    groups.forEach(group => {
      const visible = Array.from(group.querySelectorAll<HTMLElement>('[data-portfolio-card]')).filter(card => !card.hidden).length;
      group.hidden = visible === 0;
      const groupCount = group.querySelector<HTMLElement>('[data-portfolio-group-count]');
      if (groupCount) groupCount.textContent = pfNum(visible);
      const groupLabel = group.querySelector<HTMLElement>('[data-portfolio-group-label]');
      if (groupLabel) groupLabel.textContent = visible === 1 ? (i18n.molecule || 'molecule') : (i18n.molecules || 'molecules');
    });
    areaButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.portfolioArea === area)));
    viewButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.portfolioView === view)));
    if (cardView) cardView.hidden = view !== 'cards' || count === 0;
    if (tableView) tableView.hidden = view !== 'table' || count === 0;
    if (empty) empty.hidden = count !== 0;
    if (counter) counter.textContent = pfNum((i18n.count || '{n} molecules across {a} therapeutic areas').replace('{n}', String(count)).replace('{a}', String(visibleAreas.size))) + (query || area!=='all' ? (i18n.filtered || ' matching your filters') : '');
  }

  areaButtons.forEach(button => button.addEventListener('click', () => { area = button.dataset.portfolioArea || 'all'; apply(); }));
  viewButtons.forEach(button => button.addEventListener('click', () => { view = button.dataset.portfolioView || 'cards'; apply(); }));
  search?.addEventListener('input', () => { query = search.value.trim().toLowerCase(); apply(); });
  portfolio.querySelectorAll<HTMLButtonElement>('[data-portfolio-reset]').forEach(button => button.addEventListener('click', () => {
    area = 'all'; query = ''; if (search) search.value = ''; apply(); search?.focus();
  }));
  apply();
}
