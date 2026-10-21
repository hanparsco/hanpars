export const heroImage = '/images/hero-molecular.svg';
export const partnershipImage = '/images/partnership-forms.svg';
export const liveContact = 'https://hanpars.com/contact-us-1';
export const liveNewsletter = 'https://hanpars.com/home';
export const groups = [
  { label: 'Products', items: [
    { label: 'Finished dosage forms', href: '/fdf', note: 'Finished products & reference catalogue' },
    { label: 'Active pharmaceutical ingredients', href: '/api', note: 'Explore the API reference range' },
    { label: 'Excipients', href: '/excipient', note: 'Materials for formulation' },
    { label: 'Nutrition', href: '/nutrition', note: 'Nutrition ingredient enquiries' },
  ] },
  { label: 'Services', items: [
    { label: 'Regulatory Affairs', href: '/regulatory-affairs', note: 'Dossier to market authorisation' },
    { label: 'FDF CDMO', href: '/fdf-cdmo', note: 'Development & manufacturing partnerships' },
  ] },
  { label: 'Company', items: [
    { label: 'About Hanpars', href: '/about-us', note: 'Our focus and approach' },
    { label: 'How we work', href: '/culture', note: 'Principles in practice' },
    { label: 'Markets & sourcing', href: '/markets', note: 'Our market context' },
  ] },
];
export const productFamilies = [
  { title: 'Active pharmaceutical ingredients', short: 'APIs', href: '/api', icon: 'molecule', label: 'THE ACTIVE FOUNDATION', text: 'Find a substance in our API reference range and start a focused sourcing enquiry.' },
  { title: 'Finished dosage forms', short: 'Finished dosage forms', href: '/fdf', icon: 'capsule', label: 'FROM MOLECULE TO PRODUCT', text: 'Explore finished product entries by INN, strength, dosage form or reference code.' },
  { title: 'Excipients', short: 'Excipients', href: '/excipient', icon: 'layers', label: 'FORMULATION BUILDING BLOCKS', text: 'Start with the material, grade and specification your formulation requires.' },
  { title: 'Nutrition ingredients', short: 'Nutrition', href: '/nutrition', icon: 'leaf', label: 'NUTRITION & WELLNESS', text: 'Explore the nutrition database and share your ingredient and documentation needs.' },
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
