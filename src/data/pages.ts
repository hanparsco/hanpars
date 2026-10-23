export const pages = {
  api: {
    title: 'Active pharmaceutical ingredients', category: 'Products',
    description: 'A reference range of the substances we are asked about most. Find yours, tell us the specification and destination, and we will come back with what our manufacturers can offer.',
    meta: 'Search the Hanpars API reference range of 1,582 substances and prepare a pharmaceutical sourcing enquiry with your specification and target market.',
    introTitle: 'Start with the substance.',
    intro: ['Search the list, then bring the pharmacopoeial grade, quantity, destination and the documents you will need: certificates of analysis, DMF or CEP references, GMP certificates.', 'Names are kept exactly as in our working list. An entry means we can enquire about it, not that it is in stock or registered.'],
    database: '', databaseLabel: '',
  },
  fdf: {
    title: 'Finished dosage forms', category: 'Products',
    description: 'The hospital and specialty medicines Hanpars has registered in Iran, followed by the wider reference list of finished products we can source.',
    meta: 'Browse the Hanpars portfolio of IFDA-registered hospital and specialty medicines and the reference list of 3,885 finished dosage forms, then prepare a sourcing enquiry.',
    introTitle: 'Two lists, one starting point.',
    intro: ['The first list is our own portfolio: medicines for which Hanpars holds the Iranian marketing authorisation, grouped by therapeutic area with licensed dosage forms, strengths and ATC codes.', 'The second is a longer reference list of finished products we can enquire about on your behalf. Names and codes are kept exactly as recorded.'],
    database: '', databaseLabel: '',
    photo: 'fdf-portfolio', photoAlt: 'Finished medicines from the Hanpars portfolio: clopidogrel, sertraline and olanzapine tablets',
  },
  excipient: {
    title: 'Excipients', category: 'Products',
    description: 'Fillers, binders, coatings, solvents and the rest: a reference list of 1,240 excipients with CAS numbers. Search it, then tell us the grade and specification your formulation needs.',
    meta: 'Search the Hanpars excipient reference list of 1,240 materials with CAS numbers and prepare an enquiry with the grade, specification and documentation your formulation requires.',
    introTitle: 'For excipients, the grade is the request.',
    intro: ['Two excipients with the same name can behave very differently, so tell us the grade, the pharmacopoeial specification, the application and the documents you need, and we will take that to suppliers.', 'The list below covers materials we have sourced or been asked about, alongside pharmacopoeial references; it is a reference, not a stock list.'],
    
  },
  nutrition: {
    title: 'Nutrition and supplement ingredients', category: 'Products',
    description: 'Vitamins, minerals, omega-3, probiotics, botanicals and the other ingredients behind pharmaceutical and food supplements, in the forms the market trades.',
    meta: 'Reference list of 295 supplement ingredients — vitamins, minerals, omega-3, probiotics, botanicals, nutraceuticals — with common forms and uses, and a Hanpars sourcing enquiry for each.',
    introTitle: 'Start with the ingredient.',
    intro: ['Our supplement work sits alongside pharmaceuticals, with the same attention to specification and documentation. The list below covers the main ingredients used in pharmaceutical and food supplements, grouped by type, with the forms usually traded and what each is used for.', 'Include the ingredient, grade, quantity, market and documentation needs when you enquire.'],

  },
  'about-us': {
    title: 'About Hanpars', category: 'Company',
    description: 'A pharmaceutical trading company in Tehran that sources, imports and registers medicines and ingredients for the Iranian market.',
    meta: 'About Hanpars (Haniya Parsan Darou Co.): a Tehran pharmaceutical trading company that sources, imports and registers APIs, excipients and finished medicines for Iran.',
    introTitle: 'Who we are, and what we are not.',
    intro: ['Hanpars is the trading name of Haniya Parsan Darou Co., on Zafar Street in Tehran. We source active ingredients, excipients and finished dosage forms for Iran, hold the marketing authorisations for the hospital medicines we import, and act as the in-country regulatory contact for manufacturers abroad. Suppliers are in China, India, Türkiye and Europe; customers are hospitals, distributors and companies developing their own products.', 'We are not a manufacturer. We source, register and coordinate; when a project needs a plant, we bring in a partner and write down who is responsible for what.'],
    cards: [
      {title:'Products first',icon:'capsule',text:'APIs, excipients and finished dosage forms, every day. Nutrition ingredients have their own reference list and the same approach.',href:'/fdf',link:'See the portfolio'},
      {title:'Registration in-house',icon:'file',text:'Dossier, IRC licence and pharmacovigilance for our imports are handled by our own regulatory team, which also files for third parties.',href:'/regulatory-affairs',link:'Regulatory affairs'},
      {title:'One accountable contact',icon:'globe',text:'Each request has one person at Hanpars responsible for it, from first brief to delivery or approval.',href:'/contact-us-1',link:'Start a conversation'},
    ],
    photo: 'tehran-alborz', photoAlt: 'Tehran beneath the snow-covered Alborz mountains',
  },
  culture: {
    title: 'How we work', category: 'Company',
    description: 'A few plain principles that shape every request, from a single API enquiry to a multi-year registration programme.',
    meta: 'The working principles behind Hanpars: a clear brief, clearly assigned responsibilities, and technical and commercial questions handled in the same conversation.',
    introTitle: 'Clarity first, then speed.',
    intro: ['Most delays in pharmaceutical supply come from questions nobody asked at the start: which pharmacopoeia, which dossier format, who files, who pays the fee. So we write down the need and the division of responsibilities before we talk about timing.', 'Integrity, quality-minded work, collaboration and technical development are the values Hanpars has always stated; here they are habits rather than slogans.'],
    cards: [
      {title:'Be precise about the need',icon:'search',text:'Product, specification, quantity, market and stage, written down before we discuss the route.'},
      {title:'Keep responsibilities visible',icon:'layers',text:'Sourcing and coordination are ours. Manufacturing belongs to the manufacturer; approval to the authority.'},
      {title:'Hold one conversation',icon:'globe',text:'Commercial, documentation and technical questions together, so nothing is agreed that the dossier cannot support.'},
    ],
  },
  markets: {
    title: 'Markets and sourcing', category: 'Company',
    description: 'Iran is the market we supply and register in. Our sourcing reaches manufacturers in China, India, Türkiye and Europe.',
    meta: 'Hanpars supplies and registers pharmaceutical products in Iran, sourcing from manufacturers in China, India, Türkiye and Europe. What to include in a market-specific enquiry.',
    introTitle: 'One home market, several sources.',
    intro: ['Everything is organised around the Iranian market: the IFDA, the distributors and the hospitals. On the supply side we work with manufacturers in China, India, Türkiye and Europe, chosen product by product for their documentation as much as their price.', 'Tell us the destination and the documents it requires, and we will say specifically what we can do.'],
    cards: [
      {title:'Product and specification',icon:'molecule',text:'The substance, dosage form or ingredient, with the grade, strength or pack size that applies.'},
      {title:'Destination and documents',icon:'file',text:'Where the product is going and the dossier, certificates or regulatory requirements that come with it.'},
      {title:'Scope and next step',icon:'globe',text:'What you want Hanpars to do: source, register, coordinate, or all three.'},
    ],
    photo: 'container-ship', photoAlt: 'A container ship arriving at a port with mountains behind',
  },
  'fdf-cdmo': {
    title: 'Finished dosage-form development', category: 'Services',
    description: 'Development and manufacturing partnerships for tablets, capsules, injectables, liquids and semi-solids. Hanpars coordinates the project; partners manufacture.',
    meta: 'Discuss a finished dosage-form CDMO project with Hanpars: formulation, analytical development, scale-up, stability, technology transfer and partner coordination.',
    introTitle: 'We run the project. Partners run the plant.',
    intro: ['Formulation, analytical work, scale-up, stability, packaging and technology transfer rarely sit under one roof. Hanpars coordinates them across development and manufacturing partners, with the target market\'s regulatory requirements in view from the first batch.', 'Hanpars does not own a plant, does not hold a GMP certificate for one, and cannot guarantee a regulatory outcome. We offer the coordination, the partner network and the dossier.'],
    cards: [
      {title:'Solid oral dosage forms',icon:'capsule',text:'Tablets and capsules. Tell us the API, strength, development stage and target market.'},
      {title:'Injectable preparations',icon:'box',text:'Ampoules and vials. Include the formulation, presentation, project status and documentation needs.'},
      {title:'Liquids and semi-solids',icon:'layers',text:'Oral liquids and topical preparations. Start with the formulation scope and intended use.'},
    ],
    photo: 'lab-pipette', photoAlt: 'Technician in protective clothing pipetting samples in a laboratory',
  },
} as const;
export type PageKey = keyof typeof pages;
