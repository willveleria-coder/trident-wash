export const SITE = {
  name: 'Trident',
  fullName: 'Trident Pressure Washing',
  tagline: 'Melbourne\'s most thorough exterior clean.',
  phone: '0430 423 564',
  phoneRaw: '+61430423564',
  email: 'contact@tridentwash.com.au',
  location: 'Melbourne, VIC, Australia',
  hours: '7 days, 7am — 7pm',
  social: {
    instagram: 'https://www.instagram.com/tridentwashaustralia/',
    facebook: 'https://www.facebook.com/profile.php?id=61560261844850',
    google: 'https://g.co/kgs/me4bJt8',
  },
};

export const STATS = [
  { value: 100, suffix: '+', label: 'Five-star reviews', tag: 'Google verified' },
  { value: 850, suffix: '+', label: 'Properties cleaned', tag: 'Across Melbourne' },
  { value: 5.0, suffix: '★', label: 'Average rating', tag: 'Every platform', decimals: 1 },
  { value: 100, suffix: '%', label: 'Satisfaction promise', tag: 'Or we come back' },
];

export const SERVICES = [
  {
    slug: 'pressure-washing',
    title: 'Pressure Washing',
    short: 'Driveways, paths, patios, fences.',
    long:
      'Industrial-grade machines and the right nozzle for every surface. We strip years of grime, oil, and moss off concrete, pavers, and bluestone — without etching or damage.',
    surfaces: ['Concrete', 'Pavers', 'Bluestone', 'Brick', 'Timber decking'],
    accent: '#22D3EE',
    number: '01',
  },
  {
    slug: 'soft-washing',
    title: 'House Soft Washing',
    short: 'Render, weatherboard, Colorbond.',
    long:
      'Low-pressure, high-impact. Our soft wash uses biodegradable detergents to dissolve mould, algae, and pollution from delicate cladding without forcing water behind it.',
    surfaces: ['Render', 'Weatherboard', 'Colorbond', 'Painted brick'],
    accent: '#5BE9F5',
    number: '02',
  },
  {
    slug: 'roof-cleaning',
    title: 'Roof Cleaning',
    short: 'Tile, Colorbond, terracotta.',
    long:
      'Soft-wash roof treatment that kills lichen and moss at the root, then rinses clean. No high-pressure damage, no broken tiles.',
    surfaces: ['Concrete tile', 'Terracotta', 'Colorbond', 'Slate'],
    accent: '#2BA8B0',
    number: '03',
  },
  {
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    short: 'Flush, scrub, photograph.',
    long:
      'Hand-cleared, vacuumed, and flushed. We photograph every gutter section before and after so you see exactly what we did — and what your roof was holding onto.',
    surfaces: ['All profiles', 'Box gutters', 'Two-storey OK'],
    accent: '#9DF1F9',
    number: '04',
  },
  {
    slug: 'solar-cleaning',
    title: 'Solar Panel Cleaning',
    short: 'Recover lost output.',
    long:
      'Deionised water, soft brushes, no chemicals. Most panels lose 15–25% efficiency to grime and bird droppings — we get it back without scratching the glass.',
    surfaces: ['Residential arrays', 'Commercial', 'Tilt frames'],
    accent: '#22D3EE',
    number: '05',
  },
  {
    slug: 'window-cleaning',
    title: 'Exterior Windows',
    short: 'Streak-free, every time.',
    long:
      'Pure-water poles for ground floor through second storey. No drips on the render, no ladders against the cladding, no streaks when the sun comes out.',
    surfaces: ['Single & double storey', 'Skylights', 'Sliding doors'],
    accent: '#5BE9F5',
    number: '06',
  },
  {
    slug: 'sealcoating',
    title: 'Concrete Sealcoating',
    short: 'Lock in the clean.',
    long:
      'After a deep clean, we apply a penetrating sealer that repels oil, water, and stains. Driveways stay looking new for 2–3 years, not 2–3 months.',
    surfaces: ['Concrete', 'Pavers', 'Exposed aggregate'],
    accent: '#2BA8B0',
    number: '07',
  },
  {
    slug: 'graffiti-removal',
    title: 'Graffiti Removal',
    short: 'Same-week response.',
    long:
      'Heat, solvent, or pressure — chosen by surface. We remove tags from brick, render, Colorbond, and signage without ghosting, and apply anti-graffiti coating on request.',
    surfaces: ['Brick', 'Render', 'Metal', 'Signage'],
    accent: '#9DF1F9',
    number: '08',
  },
];

export const REVIEWS = [
  {
    name: 'Patrick',
    suburb: 'Bentleigh',
    rating: 5,
    body:
      'Really takes pride in his work. Pressure cleaned my concrete, side paths, driveway, sealed it, and the footpath. Even sanded and pressure cleaned my deck. Will absolutely call again.',
    service: 'Pressure Washing + Sealcoating',
    date: 'Mar 2025',
  },
  {
    name: 'Ewan H.',
    suburb: 'Hawthorn',
    rating: 5,
    body:
      'Spectacular result. Our roof had not been cleaned in almost 20 years and now looks like new again. Excellent follow-up too — these guys actually care.',
    service: 'Roof Cleaning',
    date: 'Feb 2025',
  },
  {
    name: 'Rabi K.',
    suburb: 'Doncaster',
    rating: 5,
    body:
      'Got three quotes. Reasonable pricing and the work was a class above. Patio was full of mud, moss and algae — gone. Communication beyond what you expect.',
    service: 'Soft Washing + Patio',
    date: 'Feb 2025',
  },
  {
    name: 'Himali M.',
    suburb: 'Glen Waverley',
    rating: 5,
    body:
      'Highly recommend. Driveway, footpath, building — unbelievable results. The before and after photos honestly look like two different houses.',
    service: 'Pressure Washing',
    date: 'Jan 2025',
  },
  {
    name: 'Will',
    suburb: 'Brighton',
    rating: 5,
    body:
      'Quoted $480 over the phone, paid $480 on the day. Exactly what they said.',
    service: 'House Soft Wash',
    date: 'Jan 2025',
  },
  {
    name: 'Sajith H.',
    suburb: 'Clayton',
    rating: 5,
    body:
      'Best in the business. Will call again. Friendly, professional, and the job speaks for itself.',
    service: 'Driveway',
    date: 'Dec 2024',
  },
];

export const SUBURBS = [
  // Inner east
  { name: 'Hawthorn', x: 56, y: 48 },
  { name: 'Camberwell', x: 60, y: 50 },
  { name: 'Kew', x: 55, y: 44 },
  { name: 'Templestowe', x: 65, y: 38 },
  // Inner south
  { name: 'South Yarra', x: 50, y: 56 },
  { name: 'Toorak', x: 53, y: 58 },
  { name: 'Brighton', x: 50, y: 70 },
  { name: 'Bentleigh', x: 54, y: 72 },
  { name: 'Sandringham', x: 50, y: 76 },
  // South east
  { name: 'Caulfield', x: 55, y: 64 },
  { name: 'Glen Waverley', x: 66, y: 62 },
  { name: 'Mt Waverley', x: 64, y: 60 },
  { name: 'Clayton', x: 64, y: 66 },
  { name: 'Oakleigh', x: 61, y: 64 },
  { name: 'Doncaster', x: 65, y: 42 },
  { name: 'Box Hill', x: 62, y: 46 },
  { name: 'Balwyn', x: 60, y: 44 },
  // North
  { name: 'Carlton', x: 47, y: 44 },
  { name: 'Northcote', x: 50, y: 38 },
  { name: 'Preston', x: 51, y: 32 },
  // West
  { name: 'Footscray', x: 38, y: 48 },
  { name: 'Williamstown', x: 40, y: 60 },
  { name: 'Yarraville', x: 39, y: 52 },
  // Outer
  { name: 'Ringwood', x: 72, y: 48 },
  { name: 'Croydon', x: 76, y: 46 },
  { name: 'Dandenong', x: 70, y: 72 },
  { name: 'Frankston', x: 60, y: 86 },
  { name: 'Mornington', x: 56, y: 92 },
  { name: 'Toorak', x: 53, y: 57 },
];

export const FILTH_LEVELS = [
  { level: 1, label: 'Light dust', desc: 'Annual maintenance', multiplier: 1.0 },
  { level: 2, label: 'Visible grime', desc: 'A year or two of build-up', multiplier: 1.25 },
  { level: 3, label: 'Moss & algae', desc: 'Three+ years of neglect', multiplier: 1.55 },
  { level: 4, label: 'Black & green', desc: 'Heavy organic growth', multiplier: 1.85 },
  { level: 5, label: 'Archaeological', desc: 'You forgot what it looked like', multiplier: 2.2 },
];

export const SURFACE_TYPES = [
  { id: 'driveway', label: 'Driveway / Concrete', base: 280, unit: 'job' },
  { id: 'house', label: 'House Wash', base: 480, unit: 'storey' },
  { id: 'roof', label: 'Roof Treatment', base: 620, unit: 'roof' },
  { id: 'gutters', label: 'Gutters', base: 220, unit: 'house' },
  { id: 'solar', label: 'Solar Panels', base: 180, unit: 'array' },
  { id: 'patio', label: 'Patio / Deck', base: 240, unit: 'area' },
];

export const COMPARISON = [
  { feature: 'Free on-site quote', trident: true, typical: 'Rare' },
  { feature: 'Fully insured', trident: true, typical: 'Sometimes' },
  { feature: 'Surface-specific pressure', trident: true, typical: 'One nozzle for all' },
  { feature: 'Soft-wash for delicate surfaces', trident: true, typical: 'Often skipped' },
  { feature: 'Plant & garden protection', trident: true, typical: 'Up to you' },
  { feature: 'Before/after photos', trident: true, typical: 'Not provided' },
  { feature: 'Re-clean if not satisfied', trident: true, typical: 'Disputed' },
  { feature: 'Sealcoating option', trident: true, typical: 'Refer to third party' },
  { feature: 'Same-week availability', trident: true, typical: '2–4 week wait' },
];

export const PROCESS = [
  {
    step: '01',
    title: 'Free quote',
    body: 'Send photos or book a 10-minute on-site visit. Transparent pricing, no obligation, no pressure.',
  },
  {
    step: '02',
    title: 'Custom plan',
    body: 'We match the right method to each surface — pressure, soft wash, or chemical — and walk you through it before we start.',
  },
  {
    step: '03',
    title: 'Pre-wet & protect',
    body: 'Plants, windows, and delicate landscaping are pre-wet and shielded. Your property is treated like ours.',
  },
  {
    step: '04',
    title: 'Clean & document',
    body: 'We work top-down, photograph as we go, and rinse everything thoroughly. You get the photos before we leave.',
  },
];

export const FAQS = [
  {
    q: 'Will pressure washing damage my paint, render or roof?',
    a: 'Not when done right. We adjust pressure for every surface, and use soft washing for render, paint and roofs — that means low pressure and the right detergent doing the work, not brute force.',
  },
  {
    q: 'Do you protect plants and gardens?',
    a: 'Yes. We pre-wet all surrounding vegetation before applying any solution, rinse continuously during the work, and do a final flood at the end. Plants stay healthy.',
  },
  {
    q: 'How often should I get the property cleaned?',
    a: 'Most Melbourne homes benefit from a deep clean every 12–18 months. Roofs and gutters, every 2–3 years. Driveways with shade and trees, annually.',
  },
  {
    q: 'Do I need to be home?',
    a: 'No. As long as we have access to the areas and a working tap, we can work without you there. We send photos throughout and a full set when finished.',
  },
  {
    q: 'How are quotes calculated?',
    a: 'Surface area, condition, and access. We quote on a fixed-price basis — no hourly games, no surprise add-ons. The number we say is the number you pay.',
  },
  {
    q: 'How long does a typical job take?',
    a: 'Most residential jobs are 2–4 hours. Full-house exterior packages (drive, house, roof, gutters) usually take a full day with a two-person crew.',
  },
];