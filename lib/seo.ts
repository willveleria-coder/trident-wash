/**
 * Central SEO config. Everything else reads from here — sitemap, robots,
 * schema, service pages, suburb pages. Change a fact once, it changes everywhere.
 */

export const SITE_URL = 'https://tridentwash.com.au';

export const BUSINESS = {
  name: 'Trident Pressure Washing',
  legalName: 'Trident Pressure Washing',
  phone: '0430 423 564',
  phoneRaw: '+61430423564',
  email: 'contact@tridentwash.com.au',
  // TODO: replace with the real service-area centre. Google needs a real
  // address OR a declared service area — a fake address is worse than none.
  city: 'Melbourne',
  state: 'VIC',
  stateFull: 'Victoria',
  postcode: '3000',
  country: 'AU',
  lat: -37.8136,
  lng: 144.9631,
  serviceRadiusKm: 60,
  abn: '', // TODO: add — shows up in schema and builds trust
  founded: '2023', // TODO: correct this
  priceRange: '$$',
  // TODO: create these and paste the real URLs. Consistent NAP across
  // profiles is one of the strongest local ranking signals there is.
  socials: {
    google: '', // Google Business Profile URL — the single most important one
    facebook: '',
    instagram: '',
  },
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], open: '07:00', close: '18:00' },
    { days: ['Saturday'], open: '08:00', close: '16:00' },
  ],
} as const;

/* ─────────────────────────────────────────────────────────────
   SERVICES
   Each becomes /services/[slug] with its own metadata and schema.
   `blurb` is the meta description — keep under 155 chars.
   ───────────────────────────────────────────────────────────── */

export type Service = {
  slug: string;
  name: string;
  h1: string;
  blurb: string;
  keywords: string[];
  intro: string;
  benefits: string[];
  faqs: { q: string; a: string }[];
  priceFrom?: number;
};

export const SERVICES: Service[] = [
  {
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    h1: 'Pressure washing in Melbourne',
    blurb:
      'Professional pressure washing across Melbourne. Driveways, paths, walls and paving cleaned to a fixed price. Free quotes, same-week starts.',
    keywords: [
      'pressure washing melbourne',
      'pressure cleaning melbourne',
      'high pressure cleaning melbourne',
      'pressure washer melbourne',
    ],
    intro:
      'Pressure washing strips years of dirt, algae and staining off hard surfaces without touching the material underneath. We run commercial-grade surface cleaners rather than a handheld wand, so concrete comes up evenly instead of striped.',
    benefits: [
      'Fixed price quoted before we start — no hourly surprises',
      'Commercial surface cleaners for even, stripe-free results',
      'Water and waste handled to Melbourne Water trade-waste rules',
      'Fully insured with public liability cover',
    ],
    faqs: [
      {
        q: 'How much does pressure washing cost in Melbourne?',
        a: 'Most residential driveways fall between $180 and $450 depending on size, surface and how heavy the staining is. We quote a fixed price up front after seeing photos or the site, so the number you agree to is the number you pay.',
      },
      {
        q: 'Will pressure washing damage my concrete or pavers?',
        a: 'Not when the pressure and nozzle are matched to the surface. Concrete and exposed aggregate handle high pressure well. Softer surfaces like render, painted brick and roof tiles get soft washing instead, which uses chemistry rather than force.',
      },
      {
        q: 'How long does a driveway take?',
        a: 'A standard double driveway takes two to four hours. Heavier staining, oil spots or large commercial areas take longer, and we tell you that at quoting rather than on the day.',
      },
    ],
    priceFrom: 180,
  },
  {
    slug: 'driveway-cleaning',
    name: 'Driveway Cleaning',
    h1: 'Driveway cleaning in Melbourne',
    blurb:
      'Driveway cleaning across Melbourne. Concrete, pavers, exposed aggregate and bluestone. Oil and rust stains lifted. Fixed price, free quote.',
    keywords: [
      'driveway cleaning melbourne',
      'driveway pressure washing melbourne',
      'concrete cleaning melbourne',
      'paver cleaning melbourne',
    ],
    intro:
      'Driveways carry the most visible dirt on a property and the hardest to shift — tyre marks, oil, rust from garden furniture, and the black algae that grows on the shaded side. Each needs a different treatment, not just more pressure.',
    benefits: [
      'Concrete, pavers, exposed aggregate, bluestone and stencilcrete',
      'Oil and rust stains pre-treated before washing',
      'Sand re-fill on paved driveways where joints have washed out',
      'Optional sealing to slow re-staining',
    ],
    faqs: [
      {
        q: 'Can you remove oil stains from a driveway?',
        a: 'Usually. Fresh oil lifts almost completely with a degreaser and hot water. Old oil that has soaked deep into porous concrete will fade significantly but may leave a shadow — we tell you which one you are looking at before you commit.',
      },
      {
        q: 'Do you clean paved driveways?',
        a: 'Yes. Pavers need lower pressure and a wider fan than concrete or the jointing sand blows out. We re-sand joints afterwards where needed, which most operators skip.',
      },
      {
        q: 'How often should a driveway be cleaned?',
        a: 'Every 12 to 18 months for most Melbourne homes. Shaded or south-facing driveways grow algae faster and often need a yearly clean.',
      },
    ],
    priceFrom: 180,
  },
  {
    slug: 'roof-cleaning',
    name: 'Roof Cleaning',
    h1: 'Roof cleaning and soft washing in Melbourne',
    blurb:
      'Roof cleaning in Melbourne using soft wash, not high pressure. Moss, lichen and algae removed without cracking tiles or stripping coating.',
    keywords: [
      'roof cleaning melbourne',
      'roof soft washing melbourne',
      'roof moss removal melbourne',
      'tile roof cleaning melbourne',
    ],
    intro:
      'High pressure on a roof breaks ridge caps, forces water under tiles and strips the factory coating off Colorbond. We soft wash instead — a low-pressure application that kills moss, lichen and algae at the root so it stays off longer.',
    benefits: [
      'Soft wash only — no pressure near tiles or ridge capping',
      'Treats the spores, so regrowth is slower than a pressure clean',
      'Safe on concrete tile, terracotta and Colorbond',
      'Height safety equipment and full insurance',
    ],
    faqs: [
      {
        q: 'Is pressure washing bad for a roof?',
        a: 'On tile and Colorbond, yes. High pressure cracks ridge capping, dislodges tiles, forces water into the roof cavity and strips protective coating. Soft washing gets a better result without any of that risk, which is why we only soft wash roofs.',
      },
      {
        q: 'How long until the moss comes back?',
        a: 'A soft wash typically keeps a roof clear for three to five years because it kills the spores rather than just knocking the growth off. A pressure clean often regrows within twelve months.',
      },
      {
        q: 'Do you clean Colorbond roofs?',
        a: 'Yes. Colorbond needs a gentler detergent than tile and no pressure at all on the coating. Done properly it comes back close to original colour.',
      },
    ],
    priceFrom: 450,
  },
  {
    slug: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    h1: 'Gutter cleaning in Melbourne',
    blurb:
      'Gutter cleaning across Melbourne. Gutters and downpipes cleared, debris removed, flow tested. Before and after photos on every job.',
    keywords: [
      'gutter cleaning melbourne',
      'gutter cleaners melbourne',
      'gutter vacuum melbourne',
      'downpipe cleaning melbourne',
    ],
    intro:
      'Blocked gutters overflow into eaves and wall cavities, and the damage is usually invisible until it is expensive. We clear the full run, flush the downpipes and test the flow before we leave.',
    benefits: [
      'All debris removed from site, not dropped in the garden',
      'Downpipes flushed and flow-tested, not just gutters scooped',
      'Before and after photos of every run',
      'Gutter guard checked and reseated where fitted',
    ],
    faqs: [
      {
        q: 'How often should gutters be cleaned in Melbourne?',
        a: 'Twice a year for most homes — after autumn leaf drop and again before the storm season. Properties under gums or in leafy suburbs like the eastern ranges often need quarterly.',
      },
      {
        q: 'Do you clean gutters with gutter guard installed?',
        a: 'Yes. Guard slows debris but does not stop it — fine grit and seed still build up underneath. We lift, clean and reseat rather than working around it.',
      },
      {
        q: 'What does gutter cleaning cost?',
        a: 'A single-storey home typically runs $150 to $300 depending on roof line length and access. Double-storey and steep-pitch properties cost more because of the height safety setup.',
      },
    ],
    priceFrom: 150,
  },
  {
    slug: 'solar-panel-cleaning',
    name: 'Solar Panel Cleaning',
    h1: 'Solar panel cleaning in Melbourne',
    blurb:
      'Solar panel cleaning in Melbourne with deionised water and soft brushes. Restores lost output without scratching glass or voiding warranty.',
    keywords: [
      'solar panel cleaning melbourne',
      'solar panel cleaners melbourne',
      'solar panel washing melbourne',
    ],
    intro:
      'Dust, bird mess and pollen on panel glass cut output measurably — often 10 to 25% on panels that have never been cleaned. We use deionised water and soft brushes so nothing abrasive touches the glass and no residue is left to dry on.',
    benefits: [
      'Deionised water — dries with no mineral spots or streaking',
      'Soft brush only, no abrasives, no harsh detergent',
      'Method that keeps panel and installation warranties intact',
      'Frames and rails cleared of debris at the same time',
    ],
    faqs: [
      {
        q: 'Does cleaning solar panels actually increase output?',
        a: 'Yes, and it is measurable. Panels that have gone years without a clean commonly recover 10 to 25% of lost output. Panels cleaned in the last twelve months see much smaller gains.',
      },
      {
        q: 'Can I just hose my panels off?',
        a: 'Tap water leaves mineral deposits as it dries, which reduces light transmission — so you can end up worse off. Deionised water dries clean, which is why it is the industry standard.',
      },
      {
        q: 'How often should solar panels be cleaned?',
        a: 'Annually for most Melbourne homes. Properties near main roads, under trees, or on unsealed roads benefit from every six months.',
      },
    ],
    priceFrom: 180,
  },
  {
    slug: 'house-washing',
    name: 'House Washing',
    h1: 'House washing in Melbourne',
    blurb:
      'Exterior house washing across Melbourne. Render, weatherboard, brick and eaves soft washed. Cobwebs, mould and road grime gone in a day.',
    keywords: [
      'house washing melbourne',
      'exterior house cleaning melbourne',
      'house wash melbourne',
      'exterior cleaning melbourne',
    ],
    intro:
      'A full exterior wash covers walls, eaves, window frames, garage doors and the bits people forget — the shaded south wall where mould grows and the eave lines full of cobwebs.',
    benefits: [
      'Soft wash on render and paint so nothing gets stripped',
      'Eaves, fascia, window frames and garage doors included',
      'Mould and mildew treated, not just rinsed off',
      'Garden beds pre-wet and rinsed after',
    ],
    faqs: [
      {
        q: 'Will house washing damage my paint or render?',
        a: 'Not with soft washing. We use low pressure and a detergent matched to the surface, which is why render and painted weatherboard come up clean without chalking or stripping.',
      },
      {
        q: 'How long does a house wash take?',
        a: 'Most single-storey homes take three to five hours. Double-storey runs a full day depending on access and how much mould there is on the shaded elevations.',
      },
      {
        q: 'Do you clean windows as part of a house wash?',
        a: 'Frames and sills, yes. Glass is a separate service — a house wash will leave glass rinsed but not squeegee-finished.',
      },
    ],
    priceFrom: 350,
  },
  {
    slug: 'window-cleaning',
    name: 'Window Cleaning',
    h1: 'Window cleaning in Melbourne',
    blurb:
      'Residential and commercial window cleaning in Melbourne. Streak-free interior and exterior glass, frames, tracks and sills included.',
    keywords: [
      'window cleaning melbourne',
      'window cleaners melbourne',
      'commercial window cleaning melbourne',
    ],
    intro:
      'Glass, frames, tracks and sills — cleaned together, because clean glass in a dirty frame still looks dirty. Water-fed poles for upper storeys mean no ladders leaning on your gutters.',
    benefits: [
      'Interior and exterior glass, streak-free finish',
      'Frames, tracks and sills cleaned as standard',
      'Water-fed pole for upper storeys — no ladder marks',
      'Flyscreens removed, washed and refitted',
    ],
    faqs: [
      {
        q: 'How much is window cleaning in Melbourne?',
        a: 'Residential jobs typically start around $150 for a standard single-storey home inside and out. Pricing depends on pane count and access rather than floor area.',
      },
      {
        q: 'Do you clean windows on multi-storey buildings?',
        a: 'Up to three storeys with water-fed poles. Above that needs rope access or a lift, which we can quote through a partner.',
      },
      {
        q: 'How often should windows be cleaned?',
        a: 'Every three to six months for homes. Retail and hospitality frontages usually need monthly or fortnightly to stay presentable.',
      },
    ],
    priceFrom: 150,
  },
  {
    slug: 'render-cleaning',
    name: 'Render Cleaning',
    h1: 'Render cleaning in Melbourne',
    blurb:
      'Render cleaning in Melbourne. Mould, algae and staining removed from acrylic and cement render without stripping the finish.',
    keywords: [
      'render cleaning melbourne',
      'rendered wall cleaning melbourne',
      'mould removal render melbourne',
    ],
    intro:
      'Render holds moisture, and moisture grows mould — usually worst on the south side and under eaves. High pressure blows render off the wall, so this is a soft wash job with a detergent matched to the render type.',
    benefits: [
      'Soft wash only — no pressure damage to the render coat',
      'Mould and algae killed at the root, not just rinsed',
      'Safe on acrylic, cement and textured render',
      'Sensitive around windows, weep holes and expansion joints',
    ],
    faqs: [
      {
        q: 'Can you pressure wash rendered walls?',
        a: 'You should not. High pressure erodes render texture and can blow patches off entirely, especially around cracks and expansion joints. Render is a soft wash job.',
      },
      {
        q: 'Will the mould come back?',
        a: 'Slower than after a rinse, because we treat the spores rather than the surface stain. Walls that stay damp — heavy shade, poor drainage, blocked weep holes — will regrow faster regardless of method.',
      },
      {
        q: 'Does render cleaning damage paint?',
        a: 'No. The detergent and pressure are matched to painted surfaces. Paint that is already chalking or failing may show it more clearly once the dirt is gone, which we flag before starting.',
      },
    ],
    priceFrom: 300,
  },
  {
    slug: 'brick-cleaning',
    name: 'Brick Cleaning',
    h1: 'Brick cleaning in Melbourne',
    blurb:
      'Brick and paver cleaning across Melbourne. Efflorescence, mortar haze, moss and staining removed from brickwork and retaining walls.',
    keywords: [
      'brick cleaning melbourne',
      'brick wall cleaning melbourne',
      'efflorescence removal melbourne',
    ],
    intro:
      'Brick picks up efflorescence — the white salt bloom that leaches out of mortar — plus moss on shaded walls and mortar haze on new builds. Each needs a different chemical, and using the wrong one burns the brick face.',
    benefits: [
      'Efflorescence and salt bloom neutralised, not just scrubbed',
      'Mortar haze removal on new brickwork',
      'Moss and lichen cleared from shaded and retaining walls',
      'Acid handled and neutralised properly, not left to run into beds',
    ],
    faqs: [
      {
        q: 'What is the white powder on my bricks?',
        a: 'Efflorescence — mineral salts leaching out through the brick as moisture moves through the wall. Brushing it off makes it return. It needs neutralising, and the moisture source often needs addressing too.',
      },
      {
        q: 'Can brick be damaged by cleaning?',
        a: 'Yes, by acid at the wrong strength or pressure at the wrong distance. Both burn the brick face and leave it permanently blotchy. Matching the method to the brick is most of the job.',
      },
      {
        q: 'Do you clean retaining walls and fences?',
        a: 'Yes — brick, besser block, concrete sleeper and rendered retaining walls all clean up well.',
      },
    ],
    priceFrom: 250,
  },
  {
    slug: 'commercial-pressure-washing',
    name: 'Commercial Pressure Washing',
    h1: 'Commercial pressure washing in Melbourne',
    blurb:
      'Commercial pressure washing across Melbourne. Car parks, forecourts, shopping strips and warehouses. After-hours work, insured, invoiced.',
    keywords: [
      'commercial pressure washing melbourne',
      'commercial cleaning melbourne',
      'car park cleaning melbourne',
      'shopping centre cleaning melbourne',
    ],
    intro:
      'Car parks, loading docks, shopfronts, awnings and bin areas. We work after hours so trading is not interrupted, and invoice on terms rather than asking a site manager for a card.',
    benefits: [
      'After-hours and overnight scheduling',
      'Public liability cover and SWMS supplied before site access',
      'Trade-waste compliant water capture where required',
      'Scheduled maintenance programs with fixed monthly pricing',
    ],
    faqs: [
      {
        q: 'Do you work outside business hours?',
        a: 'Yes, and for most retail and hospitality sites we prefer it. Overnight and early morning means no interruption to trading and no pedestrian management issues.',
      },
      {
        q: 'Can you supply insurance and safety documentation?',
        a: 'Yes. Certificate of currency, SWMS and any site-specific inductions are handled before the first visit.',
      },
      {
        q: 'Do you offer ongoing maintenance contracts?',
        a: 'Yes. Most commercial clients are on a scheduled program — monthly or quarterly — at a fixed price, which works out cheaper than one-off cleans and keeps the site consistently presentable.',
      },
    ],
  },
  {
    slug: 'concrete-cleaning',
    name: 'Concrete Cleaning',
    h1: 'Concrete cleaning in Melbourne',
    blurb:
      'Concrete cleaning in Melbourne. Paths, patios, garage floors and exposed aggregate cleaned evenly with commercial surface cleaners.',
    keywords: [
      'concrete cleaning melbourne',
      'concrete pressure washing melbourne',
      'exposed aggregate cleaning melbourne',
    ],
    intro:
      'Concrete shows every stripe if it is cleaned with a handheld wand. Surface cleaners run an even pass at a fixed height, which is the difference between a clean slab and a zebra-striped one.',
    benefits: [
      'Rotary surface cleaners for even, stripe-free coverage',
      'Exposed aggregate cleaned without dislodging stones',
      'Oil and rust pre-treatment included where needed',
      'Sealing available to slow future staining',
    ],
    faqs: [
      {
        q: 'Why does my concrete look striped after cleaning?',
        a: 'Almost always a handheld wand held at inconsistent height and speed. It is very hard to fix afterwards — the only real remedy is a full even re-clean with a surface cleaner.',
      },
      {
        q: 'Should I seal concrete after cleaning?',
        a: 'It helps on driveways and outdoor entertaining areas — sealed concrete resists oil and stays cleaner longer. It needs redoing every three to five years, so it is a maintenance commitment.',
      },
      {
        q: 'Can you clean exposed aggregate?',
        a: 'Yes, at lower pressure so stones are not dislodged from the matrix. It comes up very well because the texture holds dirt that a wash releases all at once.',
      },
    ],
    priceFrom: 180,
  },
  {
    slug: 'graffiti-removal',
    name: 'Graffiti Removal',
    h1: 'Graffiti removal in Melbourne',
    blurb:
      'Graffiti removal across Melbourne. Fast response for brick, render, glass and Colorbond. Anti-graffiti coating available.',
    keywords: [
      'graffiti removal melbourne',
      'graffiti cleaning melbourne',
      'anti graffiti coating melbourne',
    ],
    intro:
      'Graffiti gets harder to remove the longer it sits, especially on porous brick. We respond fast and match the removal method to the substrate so the wall does not end up with a clean patch that looks worse than the tag.',
    benefits: [
      'Fast turnaround — usually within 48 hours',
      'Method matched to brick, render, glass, metal or Colorbond',
      'Anti-graffiti coating so the next tag wipes straight off',
      'Ongoing removal agreements for commercial property',
    ],
    faqs: [
      {
        q: 'How quickly should graffiti be removed?',
        a: 'Within days. Paint keeps curing into porous surfaces, and a tagged wall attracts more tagging. Fresh graffiti on sealed surfaces often comes off completely; month-old paint on raw brick may leave a shadow.',
      },
      {
        q: 'What is anti-graffiti coating?',
        a: 'A clear sacrificial or permanent barrier that stops paint bonding to the substrate. Future tags wipe off with a low-pressure rinse instead of needing a full removal job.',
      },
      {
        q: 'Will removal leave a clean patch on the wall?',
        a: 'Sometimes on old, dirty substrates. Where that would look obvious we blend the surrounding area so the finish is even rather than patchy.',
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   SERVICE AREAS
   Each becomes /areas/[slug]. Keep this list to suburbs you
   genuinely service — thin duplicate pages hurt more than help.
   ───────────────────────────────────────────────────────────── */

export type Area = {
  slug: string;
  name: string;
  region: string;
  blurb: string;
  /** One or two sentences that are true of THIS suburb only. */
  local: string;
};

export const AREAS: Area[] = [
  {
    slug: 'point-cook',
    name: 'Point Cook',
    region: 'Western Suburbs',
    blurb: 'Pressure washing, roof and driveway cleaning in Point Cook.',
    local:
      'Point Cook is coastal enough that salt spray accelerates staining on west-facing render, and most estates here are new builds with exposed aggregate driveways that mark easily.',
  },
  {
    slug: 'werribee',
    name: 'Werribee',
    region: 'Western Suburbs',
    blurb: 'Pressure washing, gutter and roof cleaning in Werribee.',
    local:
      'Older Werribee homes tend to have concrete tile roofs carrying heavy lichen, and the clay soils mean driveways here pick up more red staining than most of Melbourne.',
  },
  {
    slug: 'tarneit',
    name: 'Tarneit',
    region: 'Western Suburbs',
    blurb: 'Driveway, house and solar panel cleaning in Tarneit.',
    local:
      'Tarneit is largely newer estates with light-coloured render that shows road grime quickly, and its open, dusty aspect means solar panels lose output faster than in leafier suburbs.',
  },
  {
    slug: 'hoppers-crossing',
    name: 'Hoppers Crossing',
    region: 'Western Suburbs',
    blurb: 'Pressure washing and gutter cleaning in Hoppers Crossing.',
    local:
      'Hoppers Crossing has a mix of 80s brick homes and newer builds, so we see both efflorescence on older brickwork and mould on newer rendered facades.',
  },
  {
    slug: 'altona',
    name: 'Altona',
    region: 'Western Suburbs',
    blurb: 'Exterior cleaning, roof soft washing and window cleaning in Altona.',
    local:
      'Altona sits right on the bay, and the salt air is hard on Colorbond roofing and window frames — soft washing matters more here than almost anywhere in Melbourne.',
  },
  {
    slug: 'williamstown',
    name: 'Williamstown',
    region: 'Western Suburbs',
    blurb: 'House washing, render and roof cleaning in Williamstown.',
    local:
      'Williamstown has a lot of heritage weatherboard and period brick, which needs gentler treatment than the render-and-slab construction further west.',
  },
  {
    slug: 'footscray',
    name: 'Footscray',
    region: 'Inner West',
    blurb: 'Commercial and residential pressure washing in Footscray.',
    local:
      'Footscray mixes dense residential with retail strip frontages, so a lot of our work here is after-hours shopfront and awning cleaning alongside home jobs.',
  },
  {
    slug: 'sunshine',
    name: 'Sunshine',
    region: 'Western Suburbs',
    blurb: 'Driveway, roof and gutter cleaning in Sunshine.',
    local:
      'Sunshine has a high proportion of post-war brick homes with original concrete driveways — decades of oil staining is the norm rather than the exception.',
  },
  {
    slug: 'melton',
    name: 'Melton',
    region: 'Western Suburbs',
    blurb: 'Pressure washing and solar panel cleaning in Melton.',
    local:
      'Melton is dry, dusty and open, which is hard on solar panels and means driveways pick up a fine grit film that a rinse alone will not shift.',
  },
  {
    slug: 'caroline-springs',
    name: 'Caroline Springs',
    region: 'Western Suburbs',
    blurb: 'House washing and driveway cleaning in Caroline Springs.',
    local:
      'Caroline Springs is almost entirely rendered estate housing, so render soft washing and paved driveway cleaning make up most of what we do here.',
  },
  {
    slug: 'geelong',
    name: 'Geelong',
    region: 'Regional Victoria',
    blurb: 'Pressure washing, roof and gutter cleaning in Geelong.',
    local:
      'Geelong combines coastal salt exposure with older housing stock, so roofs and render here carry both salt damage and established lichen growth.',
  },
  {
    slug: 'brighton',
    name: 'Brighton',
    region: 'Bayside',
    blurb: 'Premium house washing, window and roof cleaning in Brighton.',
    local:
      'Brighton properties are typically larger period homes with slate or terracotta roofing and extensive glazing, which means soft washing and water-fed pole work rather than pressure.',
  },
  {
    slug: 'st-kilda',
    name: 'St Kilda',
    region: 'Bayside',
    blurb: 'Residential and commercial exterior cleaning in St Kilda.',
    local:
      'St Kilda is dense, mostly heritage, and heavily commercial along the foreshore — a lot of our work here is hospitality frontages and apartment common areas.',
  },
  {
    slug: 'richmond',
    name: 'Richmond',
    region: 'Inner East',
    blurb: 'Commercial pressure washing and window cleaning in Richmond.',
    local:
      'Richmond has narrow-frontage terraces and busy retail strips, so access is tight and most commercial work happens before trading hours.',
  },
  {
    slug: 'box-hill',
    name: 'Box Hill',
    region: 'Eastern Suburbs',
    blurb: 'Gutter, roof and house cleaning in Box Hill.',
    local:
      'Box Hill is leafy with mature street trees, which makes it one of our busiest suburbs for gutter cleaning — often twice a year rather than annually.',
  },
  {
    slug: 'glen-waverley',
    name: 'Glen Waverley',
    region: 'Eastern Suburbs',
    blurb: 'House washing, roof and solar panel cleaning in Glen Waverley.',
    local:
      'Glen Waverley has heavy tree cover and a high rate of solar installation, so panels here collect leaf debris and shade grime faster than average.',
  },
  {
    slug: 'ringwood',
    name: 'Ringwood',
    region: 'Eastern Suburbs',
    blurb: 'Roof soft washing and gutter cleaning in Ringwood.',
    local:
      'Ringwood sits at the edge of the ranges with significant gum coverage, so moss on roofs and blocked gutters are the two jobs we do most here.',
  },
  {
    slug: 'dandenong',
    name: 'Dandenong',
    region: 'South East',
    blurb: 'Commercial and residential pressure washing in Dandenong.',
    local:
      'Dandenong has a large industrial and warehouse base, so much of our work here is loading docks, forecourts and factory frontages rather than homes.',
  },
  {
    slug: 'frankston',
    name: 'Frankston',
    region: 'South East',
    blurb: 'Exterior cleaning, roof and driveway washing in Frankston.',
    local:
      'Frankston is coastal with a mix of older brick and newer builds — salt exposure on the bay side and heavy driveway staining in the older streets inland.',
  },
  {
    slug: 'berwick',
    name: 'Berwick',
    region: 'South East',
    blurb: 'House washing and driveway cleaning in Berwick.',
    local:
      'Berwick estates are predominantly rendered with paved driveways, and the area gets enough rainfall to keep mould active on shaded elevations year round.',
  },
  {
    slug: 'craigieburn',
    name: 'Craigieburn',
    region: 'Northern Suburbs',
    blurb: 'Driveway, solar panel and house cleaning in Craigieburn.',
    local:
      'Craigieburn is exposed and dusty like Melton, and its newer estate housing means light render and exposed aggregate that show grime quickly.',
  },
  {
    slug: 'preston',
    name: 'Preston',
    region: 'Northern Suburbs',
    blurb: 'Pressure washing, roof and gutter cleaning in Preston.',
    local:
      'Preston has a lot of original post-war housing with concrete tile roofs, which after fifty years carry serious lichen growth needing soft wash rather than pressure.',
  },
  {
    slug: 'essendon',
    name: 'Essendon',
    region: 'Northern Suburbs',
    blurb: 'House washing, window and roof cleaning in Essendon.',
    local:
      'Essendon is period housing with established gardens — a lot of heritage brick, slate roofing and shaded south walls that grow mould persistently.',
  },
];

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const getArea = (slug: string) => AREAS.find((a) => a.slug === slug);

export const canonical = (path = '') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/$/, '') || SITE_URL;