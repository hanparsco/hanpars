export const contactEmail = 'contact@hanpars.com';
export const raEmail = 'RA@hanpars.com'; // regulatory affairs correspondence
// Anti-harvesting: addresses are never written in plain text in the HTML. mEnc() stores them reversed + base64 in
// data-m; src/scripts/site.ts decodes them in the browser (mailto link + visible text). mShow() is the no-JS fallback.
export const mEnc = (e: string) => Buffer.from(e.split('').reverse().join(''), 'utf8').toString('base64');
export const mShow = (e: string) => e.replace('@', ' [at] ').replace(/\.(?=[^.]+$)/, ' [dot] ');
// Web3Forms relays submissions to contactEmail. The access key is public by design; replace once issued.
export const formEndpoint = 'https://api.web3forms.com/submit';
export const formAccessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY || '2713f108-a23c-4f52-8c09-d3a1902c45cc';
export const groups = [
  { label: 'Products', items: [
    { label: 'Finished dosage forms', href: '/fdf', note: 'The registered portfolio and the reference list' },
    { label: 'Active pharmaceutical ingredients', href: '/api', note: 'A reference range of 1,582 substances' },
    { label: 'Excipients', href: '/excipient', note: 'Formulation materials by grade' },
    { label: 'Nutrition', href: '/nutrition', note: 'Vitamins and nutrition ingredients' },
    { label: 'Chemical precursors', href: '/precursors', note: 'Starting materials, intermediates, reagents' },
    { label: 'Pharmaceutical supplies', href: '/supplies', note: 'Primary packaging, capsules, consumables' },
  ] },
  { label: 'Services', items: [
    { label: 'Regulatory Affairs', href: '/regulatory-affairs', note: 'Dossiers, IFDA submissions, lifecycle' },
    { label: 'Finished Dosage Form CDMO', href: '/fdf-cdmo', note: 'Development and manufacturing projects' },
  ] },
  { label: 'Company', items: [
    { label: 'About Hanpars', href: '/about-us', note: 'Who we are, and what we are not' },
    { label: 'Import activity', href: '/import-activity', note: 'Our 2026 imports at a glance' },
    { label: 'How we work', href: '/culture', note: 'The habits behind every request' },
    { label: 'Markets and sourcing', href: '/markets', note: 'Iran at home, suppliers abroad' },
  ] },
];
export const routes = [
  { path: '/', title: 'Hanpars — Home' }, { path: '/home', title: 'Hanpars — Home' },
  { path: '/fdf', title: 'Finished dosage forms' }, { path: '/api', title: 'Active pharmaceutical ingredients' },
  { path: '/excipient', title: 'Excipients' }, { path: '/nutrition', title: 'Nutrition' }, { path: '/precursors', title: 'Chemical precursors' }, { path: '/supplies', title: 'Pharmaceutical supplies' },
  { path: '/regulatory-affairs', title: 'Regulatory Affairs' }, { path: '/fdf-cdmo', title: 'Finished Dosage Form CDMO' },
  { path: '/about-us', title: 'About Hanpars' }, { path: '/import-activity', title: 'Import activity' }, { path: '/culture', title: 'How we work' },
  { path: '/markets', title: 'Markets & sourcing' }, { path: '/blog-1', title: 'Insights' },
  { path: '/contact-us-1', title: 'Contact Hanpars' },
];
