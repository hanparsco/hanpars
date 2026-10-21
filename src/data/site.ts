export const contactEmail = 'contact@hanpars.com';
// Web3Forms relays submissions to contactEmail. The access key is public by design; replace once issued.
export const formEndpoint = 'https://api.web3forms.com/submit';
export const formAccessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY || 'PENDING-WEB3FORMS-KEY';
export const groups = [
  { label: 'Products', items: [
    { label: 'Finished dosage forms', href: '/fdf', note: 'The registered portfolio and the reference list' },
    { label: 'Active pharmaceutical ingredients', href: '/api', note: 'A reference range of 1,503 substances' },
    { label: 'Excipients', href: '/excipient', note: 'Formulation materials by grade' },
    { label: 'Nutrition', href: '/nutrition', note: 'Vitamins and nutrition ingredients' },
  ] },
  { label: 'Services', items: [
    { label: 'Regulatory Affairs', href: '/regulatory-affairs', note: 'Dossiers, IFDA submissions, lifecycle' },
    { label: 'FDF CDMO', href: '/fdf-cdmo', note: 'Development and manufacturing projects' },
  ] },
  { label: 'Company', items: [
    { label: 'About Hanpars', href: '/about-us', note: 'Who we are, and what we are not' },
    { label: 'How we work', href: '/culture', note: 'The habits behind every request' },
    { label: 'Markets and sourcing', href: '/markets', note: 'Iran at home, suppliers abroad' },
  ] },
];
export const routes = [
  { path: '/', title: 'Hanpars — Home' }, { path: '/home', title: 'Hanpars — Home' },
  { path: '/fdf', title: 'Finished dosage forms' }, { path: '/api', title: 'Active pharmaceutical ingredients' },
  { path: '/excipient', title: 'Excipients' }, { path: '/nutrition', title: 'Nutrition' },
  { path: '/regulatory-affairs', title: 'Regulatory Affairs' }, { path: '/fdf-cdmo', title: 'FDF CDMO' },
  { path: '/about-us', title: 'About Hanpars' }, { path: '/culture', title: 'How we work' },
  { path: '/markets', title: 'Markets & sourcing' }, { path: '/blog-1', title: 'Insights' },
  { path: '/contact-us-1', title: 'Contact Hanpars' },
];
