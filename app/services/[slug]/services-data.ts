export type Service = {
  slug: string;
  title: string;
  tagline: string;
  from: string;
  unit: string;
  hero: string;
  badge: string;
  description: string;
  longDescription: string;
  surfaces: string[];
  warnings: string[];
  process: { step: string; title: string; desc: string; duration?: string }[];
  results: string[];
  beforeAfter: { before: string; after: string }[];
  whyUs: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: 'pressure-washing',
    title: 'Pressure Washing',
    tagline: 'Driveways, paths, patios, fences.',
    from: '5',
    unit: 'm²',
    hero: '/services/pressure-washing.jpg',
    badge: 'Most popular',
    seoTitle: 'Pressure Washing Melbourne — Driveways, Paths & Patios | Trident',
    seoDescription: 'Professional pressure washing in Melbourne. We remove oil stains, moss, lichen and years of grime from driveways, paths, patios and fences. Free quotes, same-week start.',
    description: 'Commercial-grade pressure washing for hard surfaces across Melbourne. We remove oil stains, moss, lichen, algae and years of built-up grime — restoring your surface to how it looked when it was first laid.',
    longDescription: `Pressure washing is the most effective method for cleaning hard, durable surfaces like concrete, brick, pavers and natural stone. Using commercial-grade equipment running between 1,500 and 4,000 PSI — matched precisely to your surface type — we can remove staining and biological growth that household pressure washers simply can't touch.

The difference between a professional job and a DIY attempt comes down to three things: machine power, correct chemical pre-treatment, and surface knowledge. Too much pressure on the wrong surface strips the surface layer. Too little and you're just pushing dirt around. We've cleaned hundreds of Melbourne driveways and patios and we know exactly what each surface needs.

Most residential driveways take 1–3 hours depending on size and condition. Every job ends with a walk-through so you can inspect the result before we pack up.`,
    surfaces: [
      'Exposed aggregate concrete',
      'Stencilled and plain concrete',
      'Clay and concrete pavers',
      'Sandstone and bluestone',
      'Brick and rendered surfaces',
      'Timber decking',
      'Asphalt and bitumen',
      'Pool surrounds and coping',
    ],
    warnings: [
      'Not suitable for painted surfaces — use soft washing instead',
      'Sandstone requires lower PSI to avoid surface damage',
      'We always test a small area first on natural stone',
    ],
    process: [
      {
        step: '01',
        title: 'Site inspection & quote',
        desc: 'We assess the surface type, condition, staining severity and access before confirming your fixed price. No surprises on the day.',
      },
      {
        step: '02',
        title: 'Pre-treatment',
        desc: 'A biodegradable degreaser or biocide is applied and left to dwell. This breaks down oil, loosens biological growth and dramatically improves the final result.',
      },
      {
        step: '03',
        title: 'Pressure washing',
        desc: 'We work methodically across the surface using the correct nozzle and PSI for your material — surface washing attachments for large flat areas, lance work for edges and detail areas.',
      },
      {
        step: '04',
        title: 'Edge & detail work',
        desc: 'Every expansion joint, edge, step riser and corner is hand-cleaned. This is where most operators cut corners — we don\'t.',
      },
      {
        step: '05',
        title: 'Final inspection & pack up',
        desc: 'We do a final check of the entire area with you before packing up to confirm you\'re satisfied with the result.',
      },
    ],
    results: [
      'Oil and automotive grease stains removed or significantly reduced',
      'Moss, lichen and algae fully eliminated',
      'Mould and mildew cleaned from surface pores',
      'Original surface colour and texture restored',
      'Slip hazards from biological growth removed',
      'Surface ready for sealing or painting',
      'Before and during photo documentation provided',
      'Waste water directed to appropriate drainage',
    ],
    beforeAfter: [
      { before: 'Grey-black concrete driveway with oil stains and years of tyre marks', after: 'Clean, bright concrete with original aggregate colour restored' },
      { before: 'Green-slimed paving with moss growing in every joint', after: 'Clean pavers with joints clear and surface non-slip' },
    ],
    whyUs: [
      { title: 'Commercial-grade equipment', desc: 'We run machines producing up to 4,000 PSI and 15–21 L/min — not the same as a hardware store hire.' },
      { title: 'Surface-matched PSI', desc: 'Every surface gets the right pressure. Sandstone and pavers get treated differently to poured concrete.' },
      { title: 'Biodegradable pre-treatment included', desc: 'Pre-treatment is not optional for us — it\'s what separates a professional clean from a rinse.' },
      { title: 'Fixed pricing', desc: 'You get a fixed price before we start. If we find something unexpected, we tell you — we don\'t just add it to the invoice.' },
    ],
    faqs: [
      {
        q: 'Will pressure washing damage my pavers or concrete?',
        a: 'Not when done correctly. We match PSI to your surface type — pavers, sandstone and exposed aggregate all get lower pressure than plain concrete. We also test a small area first on any surface we haven\'t worked on before.',
      },
      {
        q: 'Can you remove oil stains from concrete?',
        a: 'Yes, in most cases. Fresh oil stains respond very well to our degreaser pre-treatment. Old, deep-set stains may lighten significantly but not disappear completely — we\'ll tell you what to expect before we start.',
      },
      {
        q: 'Do I need to be home while you work?',
        a: 'No — as long as we have access to the area and a tap, we can work while you\'re out. We\'ll send you before and during photos on completion.',
      },
      {
        q: 'How long does the result last?',
        a: 'On a sealed surface, 3–5 years. On unsealed concrete, biological growth typically starts returning after 12–24 months depending on shade and moisture levels. We recommend sealing after pressure washing to lock in the result.',
      },
      {
        q: 'Do you clean rooftop terraces and balconies?',
        a: 'Yes — we work on ground level, elevated decks, balconies and rooftop areas. Access requirements are assessed at quoting.',
      },
      {
        q: 'Do you pressure wash fences?',
        a: 'Yes — Colorbond, timber, brick and rendered fences. Timber gets lower pressure to avoid raising the grain.',
      },
      {
        q: 'How much does a driveway cost?',
        a: 'Starting from $5/m². A typical single-car driveway runs $280–$350 depending on condition. Double driveways and heavily stained surfaces are quoted individually.',
      },
    ],
    relatedSlugs: ['concrete-sealcoating', 'house-soft-washing', 'graffiti-removal'],
  },

  {
    slug: 'house-soft-washing',
    title: 'House Soft Washing',
    tagline: 'Render, weatherboard, Colorbond.',
    from: 'POA',
    unit: '',
    hero: '/services/house-soft-washing.jpg',
    badge: 'Recommended for exteriors',
    seoTitle: 'House Soft Washing Melbourne — Render, Weatherboard & Colorbond | Trident',
    seoDescription: 'Safe, effective house washing in Melbourne using soft wash technology. Remove mould, mildew, algae and grime from render, weatherboard and Colorbond without pressure damage.',
    description: 'Low-pressure soft washing for your home\'s exterior. We safely remove mould, mildew, algae, lichen and dirt from render, weatherboard, Colorbond and brick — without the risk of pressure damage.',
    longDescription: `Soft washing is the professional standard for cleaning a home's exterior, and for good reason. High-pressure water on painted render cracks the paint surface, forces water behind cladding, and strips sealants. Soft washing uses low pressure — similar to a garden hose — combined with a professional-grade cleaning solution that kills biological growth at the cellular level.

The difference is chemistry, not force. Our soft wash solution is a sodium hypochlorite blend formulated for exterior surfaces, applied at the correct dilution for your cladding type. It dwells on the surface, penetrating the biofilm and killing mould, mildew and algae roots. The result lasts significantly longer than pressure washing because the biology is actually killed rather than just physically removed.

We protect every garden bed, plant and surrounding surface before we apply anything. We neutralise the solution after the dwell period. And we check every elevation before we leave. Melbourne homes with heavy tree coverage or south-facing walls that rarely see direct sun benefit most from this service.`,
    surfaces: [
      'Acrylic and cement render',
      'Painted brick and masonry',
      'Weatherboard (timber and fibre cement)',
      'Colorbond and Zincalume cladding',
      'EIFS / Hebel panels',
      'Vinyl cladding',
      'Fascias, soffits and bargeboards',
      'Retaining walls',
    ],
    warnings: [
      'Soft washing is not suitable for untreated timber — use dedicated timber cleaning',
      'Homes with roof penetrations near gutters require extra care during rinse',
      'Some older paint types may react to sodium hypochlorite — we test first',
    ],
    process: [
      {
        step: '01',
        title: 'Pre-job protection',
        desc: 'All garden beds, plants, outdoor furniture and adjacent hard surfaces are thoroughly wetted down and covered before any chemical application begins.',
      },
      {
        step: '02',
        title: 'Solution application',
        desc: 'Our soft wash mix is applied from ground level using low-pressure equipment — typically 100–500 PSI. We work elevation by elevation, ensuring full, even coverage.',
      },
      {
        step: '03',
        title: 'Dwell time',
        desc: 'The solution dwells on the surface, penetrating the biofilm and killing mould, mildew and algae at the root. This is what makes the result last.',
      },
      {
        step: '04',
        title: 'Neutralise & rinse',
        desc: 'We apply a neutralising rinse to stop the cleaning reaction, then rinse the entire exterior thoroughly with low-pressure water — top to bottom on each elevation.',
      },
      {
        step: '05',
        title: 'Detail & pack up',
        desc: 'Window frames, downpipes, fascias and soffits are hand-wiped if needed. We inspect every elevation and address any remaining spots before packing up.',
      },
    ],
    results: [
      'Mould and mildew killed at the root — not just removed from the surface',
      'Algae, lichen and green biological growth fully eliminated',
      'Black streaking and staining removed from render and cladding',
      'Render and paint surfaces left completely undamaged',
      'Fascias, soffits and gutters cleaned as part of the process',
      'Garden and plants protected throughout',
      'Result typically lasts 2–4 years',
      'Home looks freshly painted without the cost of repainting',
    ],
    beforeAfter: [
      { before: 'Dark green and black streaked render with heavy mould around window reveals', after: 'Clean, bright render with uniform colour restored across all elevations' },
      { before: 'Weatherboard with green algae on south-facing wall and black mildew on fascias', after: 'Clean boards and fascias with no biological growth visible' },
    ],
    whyUs: [
      { title: 'Correct dilution, every time', desc: 'Too strong and we risk paint damage. Too weak and the biology survives. We mix to the right dilution for your surface and growth level.' },
      { title: 'Garden protection is non-negotiable', desc: 'We pre-wet, cover and neutralise. No plant or garden damage on our jobs.' },
      { title: 'Longer-lasting result', desc: 'Soft washing kills biological growth. Pressure washing moves it. The difference shows 12 months later.' },
      { title: 'Ground-level operation', desc: 'All work is performed from ground level — no ladders on your roof, no marks on your gutters.' },
    ],
    faqs: [
      {
        q: 'Is soft washing safe for all render types?',
        a: 'Yes for the vast majority — acrylic render, cement render, painted brick and most modern finishes respond very well. On very old or previously damaged render we\'ll test a small area first and advise you honestly.',
      },
      {
        q: 'Will the chemicals affect my plants and garden?',
        a: 'We take significant precautions — pre-wetting all plants, covering garden beds with plastic sheeting, and applying a neutralising rinse after the dwell period. Plant damage on our jobs is extremely rare.',
      },
      {
        q: 'How is soft washing different from pressure washing?',
        a: 'Pressure washing uses high-force water to physically remove surface contamination. Soft washing uses low pressure and chemistry to kill biological growth at the root level. For house exteriors, soft washing is safer for the surface and produces a longer-lasting result.',
      },
      {
        q: 'My house has Colorbond cladding — is that okay?',
        a: 'Yes. Colorbond and Zincalume respond very well to soft washing. We use dilutions appropriate for coated steel.',
      },
      {
        q: 'Can you clean just one elevation?',
        a: 'Yes — we can do one or two sides if that\'s where the problem is.',
      },
      {
        q: 'How often should I get my house washed?',
        a: 'Every 2–3 years for most Melbourne homes. Homes with heavy tree coverage or on south-facing slopes may need annual treatment.',
      },
      {
        q: 'Do you clean the windows as part of the house wash?',
        a: 'We rinse windows during the exterior wash but we don\'t detail-clean glass as part of this service. We offer a separate exterior window cleaning service if you want streak-free glass.',
      },
    ],
    relatedSlugs: ['pressure-washing', 'roof-cleaning', 'exterior-windows'],
  },

  {
    slug: 'roof-cleaning',
    title: 'Roof Cleaning',
    tagline: 'Tile, Colorbond, terracotta.',
    from: '5',
    unit: 'm²',
    hero: '/services/roof-cleaning.jpg',
    badge: 'Extends roof life',
    seoTitle: 'Roof Cleaning Melbourne — Tile, Colorbond & Terracotta | Trident',
    seoDescription: 'Professional roof cleaning in Melbourne. Remove moss, lichen and algae from tile, Colorbond and terracotta roofs. Before and during photo report included.',
    description: 'Moss, lichen and algae on your roof trap moisture and accelerate tile and coating deterioration. Our roof cleaning process kills organic growth, restores appearance and extends the life of your roof.',
    longDescription: `A dirty roof is more than an aesthetic problem. Moss and lichen have root systems — called rhizines — that physically penetrate tile and grout surfaces. As they grow, they lift tiles, crack grout and hold moisture against the surface. Over time, this accelerates tile pitting, grout erosion and in severe cases, structural water ingress.

Lichen in particular is extremely difficult to remove once established. It bonds chemically to porous surfaces and can only be effectively treated with a biocide that kills the organism at the root. Physical removal alone — scraping or pressure washing — damages the tile surface and leaves root fragments that regrow rapidly.

Our process applies a professional biocide solution. The solution dwells on the roof, killing the organic matter. Dead moss and lichen then naturally wash off over the following rainfall events, or we rinse after the appropriate dwell time. The result is a clean roof with biology eliminated at the root — not just moved around.`,
    surfaces: [
      'Concrete roof tiles',
      'Terracotta and clay tiles',
      'Colorbond and Zincalume',
      'Slate tiles',
      'Fibrous cement sheeting',
      'Corrugated iron (treated)',
      'Metal shingles',
    ],
    warnings: [
      'Heavily moss-covered roofs may require a follow-up treatment',
      'Some older terracotta tiles are very porous — we adjust dwell time accordingly',
      'Roof cleaning does not replace re-pointing or re-bedding — we\'ll flag any structural concerns we observe',
    ],
    process: [
      {
        step: '01',
        title: 'Roof inspection',
        desc: 'We photograph the entire roof from multiple angles before starting. This gives you a baseline record and helps us identify areas of heavy organic build-up that need extra attention.',
      },
      {
        step: '02',
        title: 'Biocide application',
        desc: 'Our professional biocide solution is applied at low pressure using extension lances. We work methodically across every pitch and valley, ensuring full coverage including ridge capping and flashings.',
      },
      {
        step: '03',
        title: 'Dwell time',
        desc: 'The biocide is left to work — longer for heavy infestations. This kills moss, lichen and algae at the root level, not just at the surface.',
      },
      {
        step: '04',
        title: 'Photo report & pack up',
        desc: 'We photograph the roof after cleaning and send you a complete after report. We also note any structural concerns — cracked tiles, failed ridge capping, gutter damage — so you can address them.',
      },
    ],
    results: [
      'Moss, lichen and algae killed at the root — not just physically removed',
      'Tile surface and colour restored',
      'Moisture retention eliminated — extends tile and coating life significantly',
      'Ridge capping and flashings cleaned',
      'Gutters flushed as part of the process',
      'Before and during photo report provided',
      'Any structural roof concerns noted and communicated',
    ],
    beforeAfter: [],
    whyUs: [
      { title: 'Kill, don\'t just clean', desc: 'We use a biocide that kills the biology. Physical removal alone leaves root systems that regrow within months.' },
      { title: 'Photo documentation included', desc: 'Every job gets a before and during photo report. You have a full record of what was done.' },
      { title: 'Public Liability Insurance', desc: 'Fully insured for your peace of mind.' },
      { title: 'Structural observation', desc: 'We photograph and flag any cracked tiles, failed pointing or gutter damage we observe.' },
    ],
    faqs: [
      {
        q: 'Will the cleaning chemicals damage my roof?',
        a: 'Our biocide solution is formulated for use on roofing materials and is used at the correct dilution. It is safe for concrete tiles, terracotta, Colorbond and most other roofing materials.',
      },
      {
        q: 'Will roof cleaning void my roof warranty?',
        a: 'Soft washing with a biocide is the manufacturer-recommended cleaning method for most tile and Colorbond roofing systems. High-pressure washing typically voids warranties — we don\'t use high pressure on roofs.',
      },
      {
        q: 'The moss comes back every year — is cleaning worth it?',
        a: 'If you\'re getting high-pressure cleaning that just physically removes moss, yes it will return quickly because the root system is left intact. Our biocide treatment kills the organism. Regrowth timelines are typically 3–5 years after a proper treatment.',
      },
      {
        q: 'Can you clean solar panels on the roof at the same time?',
        a: 'Yes — we can clean solar panels as part of the same visit. We use a different, gentler process for panels.',
      },
      {
        q: 'How long does a roof clean take?',
        a: 'Most residential roofs take 2–4 hours including inspection, treatment and rinse. Larger or more complex roofs may take longer.',
      },
    ],
    relatedSlugs: ['gutter-cleaning', 'house-soft-washing', 'solar-panel-cleaning'],
  },

  {
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    tagline: 'Flush, scrub, photograph.',
    from: '8',
    unit: 'lm',
    hero: '/services/gutter-cleaning.jpg',
    badge: 'Annual maintenance',
    seoTitle: 'Gutter Cleaning Melbourne — Flush, Scrub & Photograph | Trident',
    seoDescription: 'Professional gutter cleaning across Melbourne. We clear all debris, flush every downpipe and photograph the result. From $8/lm. Same-week availability.',
    description: 'Blocked gutters cause roof leaks, fascia rot, foundation damage and pest infestations. We clear every gutter run and downpipe, scrub out accumulated sediment, flush the system and photograph the result before we leave.',
    longDescription: `Gutters are one of the most neglected maintenance items on Australian homes — and one of the most consequential when they fail. A blocked gutter in a Melbourne storm causes water to back up under roof tiles, overflow onto fascias and walls, and pool around foundations. The damage from a single heavy rain event through uncleared gutters can run into thousands of dollars in repairs.

Beyond flooding, blocked gutters are a primary habitat for mosquitoes, possums and rodents. Standing water in a blocked gutter is an ideal breeding environment. Wet leaf matter causes fascia boards to rot and paint to bubble.

We clear gutters by hand — removing all leaf matter, sludge, seedlings and debris. We then flush every downpipe with water to confirm clear flow to the ground. Downpipes are a common failure point that are often missed in a basic clean — we check every one. We scrub the gutter channel to remove sediment and biological staining. Finally, we photograph every run from a position where you can see the clean result.`,
    surfaces: [
      'Colorbond gutters (all profiles)',
      'Zincalume gutters',
      'Quad and half-round profiles',
      'Box gutters and concealed gutters',
      'Fascia-integrated gutters',
      'Valley gutters',
      'Downpipes (round and square)',
    ],
    warnings: [
      'We do not repair gutters — we note and photograph any damage we find',
      'Severely crushed or disconnected downpipes may require a plumber before we can fully clear them',
      'Box gutters on older homes sometimes have unknown drainage paths — we proceed carefully',
    ],
    process: [
      {
        step: '01',
        title: 'Inspection',
        desc: 'We photograph all gutters before starting so you have a before record. We note any structural issues — sagging gutters, failed joins, cracked downpipes — and tell you before we start.',
      },
      {
        step: '02',
        title: 'Debris removal',
        desc: 'All leaves, seedlings, bird nesting material, sludge and debris are removed by hand from every gutter run. Material is bagged and removed from site.',
      },
      {
        step: '03',
        title: 'Downpipe flush and test',
        desc: 'Every downpipe is flushed with water from above and confirmed clear at the outlet. Partially blocked downpipes are cleared with our clearing rod before flushing.',
      },
      {
        step: '04',
        title: 'Gutter scrub',
        desc: 'Gutter channels are scrubbed to remove accumulated sediment, biological staining and the sludge layer that forms at the bottom of every gutter over time.',
      },
      {
        step: '05',
        title: 'Final flush & pack up',
        desc: 'A final water flush from end to end confirms clear flow through the entire system. We photograph every gutter run after cleaning and note any damage observed.',
      },
    ],
    results: [
      'All debris, leaf matter and sludge removed from every gutter run',
      'Every downpipe flushed and confirmed clear',
      'Gutter channels scrubbed — sediment and biological staining removed',
      'Water damage and fascia rot risk significantly reduced',
      'Pest habitat eliminated',
      'Before and during photo report provided',
      'Structural gutter concerns noted and communicated',
    ],
    beforeAfter: [
      { before: 'Gutters overflowing during light rain due to complete blockage with compacted leaf matter and seedlings', after: 'Clear gutters with confirmed flow through all downpipes' },
      { before: 'Downpipe completely blocked with compressed debris causing overflow at the join', after: 'Downpipe cleared and flowing freely to ground level outlet' },
    ],
    whyUs: [
      { title: 'Every downpipe tested', desc: 'Most operators clear the gutter channel and call it done. We test every downpipe individually — that\'s where the real blockages hide.' },
      { title: 'Debris removed from site', desc: 'We bag and take away everything we remove. Your lawn, driveway and garden stay clean.' },
      { title: 'Photo documentation', desc: 'You get a before and during photo of every run. No guessing about what was done.' },
      { title: 'Damage reporting', desc: 'We photograph and document any gutter damage we find.' },
    ],
    faqs: [
      {
        q: 'How often should gutters be cleaned?',
        a: 'At minimum once a year — ideally after autumn leaf fall and before the winter rain season. Homes with heavy deciduous tree coverage or gum trees directly overhead may need twice-yearly cleaning.',
      },
      {
        q: 'What do you do with the debris?',
        a: 'We bag everything and remove it from site.',
      },
      {
        q: 'My downpipe seems blocked — can you clear it?',
        a: 'In most cases yes. We use a clearing rod and high-flow flush to clear blocked downpipes.',
      },
      {
        q: 'Can you clean gutters on a two-storey home?',
        a: 'Yes. We carry ladders and equipment for single and double-storey homes.',
      },
      {
        q: 'How long does a gutter clean take?',
        a: 'Most single-storey homes take 1–2 hours. Double-storey and larger homes take 2–4 hours depending on lineal metres and debris volume.',
      },
    ],
    relatedSlugs: ['roof-cleaning', 'pressure-washing', 'house-soft-washing'],
  },

  {
    slug: 'solar-panel-cleaning',
    title: 'Solar Panel Cleaning',
    tagline: 'Recover lost output.',
    from: '15',
    unit: 'panel',
    hero: '/services/solar-panel-cleaning.jpg',
    badge: 'Recover up to 30% output',
    seoTitle: 'Solar Panel Cleaning Melbourne — Recover Lost Output | Trident',
    seoDescription: 'Professional solar panel cleaning in Melbourne using purified water and soft brushes. No chemicals, no scratches. Recover up to 30% of lost output. From $15/panel.',
    description: 'Dirty solar panels lose up to 30% of their output. We use 0-TDS purified water and soft brushes to remove dust, bird droppings, pollen and grime — restoring your system to peak efficiency without scratching or leaving residue.',
    longDescription: `Solar panels are one of the most significant investments in an Australian home, and most homeowners dramatically underestimate the impact of soiling on output. Research shows that a panel coated in a combination of dust, bird droppings and pollen film can lose 15–30% of its rated output under normal operating conditions.

Rain does not clean solar panels adequately. Rain removes loose surface dust but leaves behind dissolved mineral deposits as it evaporates — the same process that leaves water spots on glass. Bird droppings are particularly damaging: the uric acid in droppings can etch into the glass surface over time if not removed.

We use 0-TDS (totally dissolved solids) purified water — water that has been filtered through a reverse osmosis and deionisation system to remove all dissolved minerals. When this water dries on glass, it leaves nothing behind. Combined with soft-bristle brushes designed specifically for solar glass, it removes all surface contamination without scratching or chemical residue.`,
    surfaces: [
      'Standard monocrystalline and polycrystalline panels',
      'Thin-film panels',
      'All mounting configurations (flush, tilted, tracking)',
      'Ground-mount systems',
      'Carport and pergola-mounted systems',
    ],
    warnings: [
      'We never use pressure washing on solar panels — it risks voiding panel warranties and can damage frames and seals',
      'We do not use any chemical cleaners on panel glass',
      'Electrical faults or panel damage observed during cleaning are noted and referred to your installer',
    ],
    process: [
      {
        step: '01',
        title: 'Output check',
        desc: 'Where accessible, we photograph your inverter display before cleaning to establish a baseline output reading for the conditions.',
      },
      {
        step: '02',
        title: 'Visual inspection',
        desc: 'We photograph every panel before cleaning, noting any damage — cracked glass, delamination, hotspots, frame corrosion or loose mounting hardware.',
      },
      {
        step: '03',
        title: 'Purified water pre-rinse',
        desc: 'Panels are pre-rinsed with 0-TDS purified water to remove loose surface dust before brushing.',
      },
      {
        step: '04',
        title: 'Soft brush scrub',
        desc: 'Every panel is scrubbed with soft-bristle solar-specific brushes fed with a continuous supply of purified water.',
      },
      {
        step: '05',
        title: 'Streak-free rinse & pack up',
        desc: 'A final purified water rinse removes all loosened contamination and leaves panels completely spot and streak-free.',
      },
    ],
    results: [
      'Up to 30% output recovery on heavily soiled systems',
      'Panel glass streak-free and spot-free — no mineral deposits',
      'Bird droppings fully removed without surface damage',
      'Pollen film and dust accumulation cleared',
      'No chemical residue on panels or surroundings',
      'Panel damage and faults identified and reported',
    ],
    beforeAfter: [
      { before: 'Panels covered in bird droppings, pollen film and dust — inverter showing 2.1kW at 11am on a clear day', after: 'Clean panels — inverter showing 3.4kW under identical conditions 24 hours later' },
    ],
    whyUs: [
      { title: 'Purified water only', desc: 'Standard tap water leaves mineral spots as it dries. Our 0-TDS water leaves nothing — no residue, no spots, no film.' },
      { title: 'No pressure washing', desc: 'High pressure can void panel warranties and damage frame seals. We never use pressure on panels.' },
      { title: 'Output documentation', desc: 'We photograph inverter output before and after where accessible.' },
      { title: 'Panel inspection included', desc: 'We photograph every panel and document any damage, hotspots or concerns.' },
    ],
    faqs: [
      {
        q: 'How much output can I expect to recover?',
        a: 'It depends on how soiled your panels are. Lightly dusted panels might recover 5–10%. Heavily soiled panels with bird dropping accumulation typically recover 20–30%.',
      },
      {
        q: 'Why can\'t I just let the rain clean them?',
        a: 'Rain removes loose dust but leaves dissolved mineral deposits as it evaporates. Bird droppings require physical removal — rain doesn\'t shift them.',
      },
      {
        q: 'Will you scratch my panels?',
        a: 'No. We use soft-bristle brushes designed specifically for solar glass, fed with purified water.',
      },
      {
        q: 'How often should solar panels be cleaned?',
        a: 'Once or twice a year for most Melbourne locations.',
      },
      {
        q: 'Do you clean ground-mount and carport solar systems?',
        a: 'Yes — ground-mount and carport systems are generally easier to access and can often be cleaned more thoroughly than roof-mount systems.',
      },
    ],
    relatedSlugs: ['roof-cleaning', 'exterior-windows', 'gutter-cleaning'],
  },

  {
    slug: 'exterior-windows',
    title: 'Exterior Windows',
    tagline: 'Streak-free, every time.',
    from: '10',
    unit: 'window',
    hero: '/services/exterior-windows.jpg',
    badge: 'Streak-free guaranteed',
    seoTitle: 'Exterior Window Cleaning Melbourne — Streak-Free | Trident',
    seoDescription: 'Professional exterior window cleaning in Melbourne using the pure water fed pole system. Streak-free results guaranteed. From $10/window. No ladders, no chemicals.',
    description: 'We clean exterior windows using the pure water fed pole system — purified water and soft brushes leave glass completely streak-free without chemicals, ladders or squeegee marks.',
    longDescription: `The pure water fed pole system is the professional standard for exterior window cleaning. Traditional methods — squeegee and bucket, or household window spray — leave behind soap residue and mineral deposits from tap water. These attract dirt and the windows look dirty again within days.

Pure water fed pole cleaning uses water that has been filtered through reverse osmosis and deionisation to 0 TDS — completely mineral-free. When this water dries on glass, it evaporates completely, leaving nothing behind. The result is genuinely streak-free glass that stays clean longer than any traditional method.

The system uses telescoping carbon fibre poles reaching up to 12 metres — enough for most three-storey buildings — so all work is done safely from ground level.

We clean the glass, frames and sills as part of every window clean. Frames are where most of the biological staining and mould accumulates.`,
    surfaces: [
      'Single and double glazing',
      'Aluminium and uPVC frames',
      'Timber-framed windows',
      'Tinted and low-E glass',
      'Skylights (accessible from ground)',
      'Bi-fold and stacking door glass',
      'Shopfronts and commercial glazing',
      'Balustrades (glass)',
    ],
    warnings: [
      'We clean exterior surfaces only — interior cleaning is not currently offered',
      'Severe mineral etching may require specialist treatment beyond standard pure water cleaning',
      'Leadlight, heritage glass and some textured glass types require assessment before cleaning',
    ],
    process: [
      {
        step: '01',
        title: 'Frame and sill pre-wipe',
        desc: 'Before any water touches the glass, frames and sills are wiped down to remove heavy surface debris.',
      },
      {
        step: '02',
        title: 'Pure water scrub',
        desc: 'Each pane is scrubbed with a soft brush fed continuously with 0-TDS purified water. The brush agitates and lifts all surface contamination.',
      },
      {
        step: '03',
        title: 'Rinse & pack up',
        desc: 'A final pure water rinse is applied from the top of each pane downwards. As the water evaporates, nothing is left behind.',
      },
    ],
    results: [
      'Streak-free, spot-free glass — no squeegee marks, no residue',
      'Frames and sills cleaned as part of the process',
      'Hard water mineral deposits removed from glass surface',
      'Biological staining on frames and reveals treated',
      'All work done safely from ground level',
      'No chemical residue on glass or surroundings',
    ],
    beforeAfter: [
      { before: 'Windows with heavy mineral water spotting from sprinkler overspray and years of tap water runoff', after: 'Crystal clear glass with no mineral deposits visible' },
    ],
    whyUs: [
      { title: 'Pure water — no streaks', desc: 'Standard tap water leaves mineral deposits as it dries. Our purified water leaves nothing.' },
      { title: 'Frames and sills included', desc: 'We don\'t just clean the glass. Frames and sills are cleaned as part of every window service.' },
      { title: 'Completely from ground level', desc: 'Our poles reach up to 12 metres. No ladders on your gutters, no marks on your walls.' },
      { title: 'No chemicals on your glass', desc: 'We use water only — your windows stay cleaner for longer.' },
    ],
    faqs: [
      {
        q: 'What about hard water staining?',
        a: 'Pure water removes most mineral water spotting. Severe hard water staining may require a specialist glass restoration product. We\'ll tell you on the day if we encounter this.',
      },
      {
        q: 'How long does the result last?',
        a: 'Exterior windows cleaned with the pure water system typically stay noticeably cleaner for 6–8 weeks in normal conditions.',
      },
      {
        q: 'Can you reach all three storeys?',
        a: 'Our poles reach up to 12 metres, which covers most three-storey residential buildings.',
      },
      {
        q: 'My windows have a tint — is pure water cleaning safe?',
        a: 'Yes — pure water and soft brushes are safe for all standard window tints and films.',
      },
    ],
    relatedSlugs: ['house-soft-washing', 'solar-panel-cleaning', 'pressure-washing'],
  },

  {
    slug: 'concrete-sealcoating',
    title: 'Concrete Sealcoating',
    tagline: 'Lock in the clean.',
    from: '15',
    unit: 'm²',
    hero: '/services/concrete-sealcoating.jpg',
    badge: 'Protects for 3–5 years',
    seoTitle: 'Concrete Sealcoating Melbourne — Driveways & Paths | Trident',
    seoDescription: 'Professional concrete sealcoating in Melbourne. Lock in your pressure wash result and protect against oil, staining and weathering for 3–5 years. From $15/m².',
    description: 'Sealcoating is the step after pressure washing that makes the result last. A professional-grade sealer protects your concrete from oil penetration, staining, UV damage and weathering — keeping it looking clean for years, not months.',
    longDescription: `Unsealed concrete is porous. Every spill — oil, paint, rust, organic matter — penetrates the surface and bonds to the concrete matrix. Once in, most stains are extremely difficult or impossible to fully remove. Sealcoating closes those pores, creating a barrier between your concrete and the world above it.

There are two categories of sealer: penetrating sealers and topical sealers. Penetrating sealers soak into the concrete and react chemically with the silica matrix, becoming part of the slab. They are invisible when dry and last 5–10 years. They are the right choice for most residential concrete.

Topical sealers sit on top of the surface and form a protective film. They can be matte, satin or gloss finish and enhance the surface colour — a popular choice after exposed aggregate cleaning. They typically last 2–4 years before recoating.

We always pressure wash before sealing.`,
    surfaces: [
      'Plain broom-finish concrete',
      'Exposed aggregate concrete',
      'Stencilled and pattern concrete',
      'Honed concrete',
      'Pavers (concrete and clay)',
      'Sandstone (specific sealers)',
      'Bluestone paving',
    ],
    warnings: [
      'Do not apply sealer if rain is forecast within 4 hours',
      'Foot traffic: 24 hours minimum after application',
      'Vehicle traffic: 72 hours minimum after application',
      'Topical sealers can become slippery when wet — anti-slip additives available',
    ],
    process: [
      {
        step: '01',
        title: 'Surface preparation',
        desc: 'The concrete must be freshly cleaned. We check moisture content with a meter on the day of sealing.',
      },
      {
        step: '02',
        title: 'Sealer selection',
        desc: 'We discuss the options with you — penetrating vs topical, matte vs satin vs gloss — and recommend the right product for your surface type.',
      },
      {
        step: '03',
        title: 'First coat application',
        desc: 'Sealer is applied evenly using a roller for topical sealers or a pump sprayer for penetrating sealers. We work in systematic passes to ensure full, even coverage.',
      },
      {
        step: '04',
        title: 'Second coat & cure',
        desc: 'First coat is allowed to become touch-dry before the second coat is applied. Two coats are standard — single-coat applications are insufficient for proper protection.',
      },
      {
        step: '05',
        title: 'Handover & pack up',
        desc: 'We advise you on cure times and provide care instructions — what to avoid in the first 72 hours, and how to maintain the sealed surface.',
      },
    ],
    results: [
      'Oil and automotive fluid penetration prevented',
      'Staining from organic matter, paint and rust dramatically reduced',
      'Surface colour enhanced (topical) or invisible protection added (penetrating)',
      'Pressure-wash result locked in for 3–5 years',
      'UV protection — prevents concrete bleaching and surface erosion',
      'Easier to clean — spills wipe off rather than soaking in',
    ],
    beforeAfter: [
      { before: 'Freshly pressure-washed exposed aggregate with open pores and raw surface', after: 'Same surface with penetrating sealer applied — aggregate colour enriched, surface protected' },
    ],
    whyUs: [
      { title: 'Always wash first', desc: 'We won\'t seal dirty concrete. Sealer applied to a soiled surface permanently traps the contamination.' },
      { title: 'Moisture testing', desc: 'We check concrete moisture content before sealing. Too much moisture and the sealer won\'t bond correctly.' },
      { title: 'Two coats standard', desc: 'One coat is not adequate protection. Two coats are standard on every job.' },
      { title: 'Right product for your surface', desc: 'Exposed aggregate needs a different sealer than stencilled concrete. We specify the right product.' },
    ],
    faqs: [
      {
        q: 'Do I have to pressure wash before sealing?',
        a: 'Yes — this is non-negotiable. Sealer applied to dirty, contaminated or wet concrete traps the contamination permanently.',
      },
      {
        q: 'Will sealer make my driveway slippery?',
        a: 'Topical sealers can reduce slip resistance when wet. We offer anti-slip additive at no extra cost for high-traffic or sloped areas.',
      },
      {
        q: 'How long does sealer last?',
        a: 'Penetrating sealers: 5–10 years. Topical sealers: 2–4 years.',
      },
      {
        q: 'Can you seal pavers?',
        a: 'Yes — both concrete and clay pavers. Paver sealing also stabilises the sand between joints, reducing weed growth.',
      },
      {
        q: 'How long do I need to stay off the concrete after sealing?',
        a: 'Foot traffic: minimum 24 hours. Vehicle traffic: minimum 72 hours.',
      },
    ],
    relatedSlugs: ['pressure-washing', 'graffiti-removal', 'house-soft-washing'],
  },

  {
    slug: 'graffiti-removal',
    title: 'Graffiti Removal',
    tagline: 'Same-week response.',
    from: 'POA',
    unit: '',
    hero: '/services/graffiti-removal.jpg',
    badge: 'Same-week response',
    seoTitle: 'Graffiti Removal Melbourne — Fast, Professional | Trident',
    seoDescription: 'Professional graffiti removal across Melbourne. Same-week response. Surface-appropriate chemical treatment and pressure washing. POA.',
    description: 'Graffiti needs to come off fast — the longer it sits, the deeper it bonds. We respond same-week with surface-appropriate chemical treatments and pressure washing to fully remove graffiti from brick, concrete, render, Colorbond and more.',
    longDescription: `Graffiti removal is time-critical. Paint bonds to porous surfaces progressively — a fresh tag on brick removed within 24–48 hours will typically come off completely. The same tag left for two weeks may leave a ghost image even after successful removal.

The second most important factor is using the right chemistry for the surface. A solvent-based remover that works perfectly on Colorbond will damage painted render. Using the wrong product wastes time and can make the situation worse.

We assess the substrate, the paint type and the age of the tag before selecting our removal approach. On porous surfaces like brick and render, we typically use a gel-based chemical remover that penetrates rather than just dissolving the surface layer. On non-porous surfaces like Colorbond and glass, solvent-based products work quickly and completely.

We also offer anti-graffiti coating application after removal — a sacrificial coating that prevents paint bonding to the surface, making future removal significantly faster and easier.`,
    surfaces: [
      'Brick — face brick and common brick',
      'Concrete — plain, exposed aggregate, tilt-up',
      'Render — acrylic and cement',
      'Colorbond and Zincalume',
      'Painted masonry',
      'Timber — treated and painted',
      'Glass',
      'Natural stone — sandstone, bluestone, granite',
      'Powder-coated metal',
    ],
    warnings: [
      'Results depend heavily on how long the graffiti has been on the surface',
      'Some surfaces — particularly old or damaged render — may show witness marks after removal',
      'We do not guarantee 100% invisible removal on all surfaces — we will advise honestly before starting',
    ],
    process: [
      {
        step: '01',
        title: 'Surface and paint assessment',
        desc: 'We identify the substrate, the paint type and the approximate age. This determines our chemical selection.',
      },
      {
        step: '02',
        title: 'Test patch',
        desc: 'Before full application, we test our chosen chemical on a small, inconspicuous area to confirm it doesn\'t damage or discolour the surface.',
      },
      {
        step: '03',
        title: 'Chemical application',
        desc: 'Our graffiti remover is applied liberally to the tagged area and allowed to dwell. Gel-based products are used on porous vertical surfaces to prevent runoff.',
      },
      {
        step: '04',
        title: 'Agitation & pressure rinse',
        desc: 'The loosened paint is agitated with brushes appropriate to the surface, then removed with pressure washing at the correct PSI for the substrate.',
      },
      {
        step: '05',
        title: 'Assessment & pack up',
        desc: 'We assess the result once the surface is rinsed and dry. Stubborn areas or deep-set paint may require a second treatment at no extra cost.',
      },
      {
        step: '06',
        title: 'Anti-graffiti coating (optional)',
        desc: 'On surfaces likely to be targeted again, we can apply an anti-graffiti coating that prevents paint from bonding to the substrate.',
      },
    ],
    results: [
      'Graffiti fully removed in most cases',
      'Surface substrate undamaged',
      'Chemical residue fully neutralised and rinsed',
      'Before and during photos provided',
      'Anti-graffiti coating available to prevent recurrence',
      'Same-week response across Melbourne',
    ],
    beforeAfter: [
      { before: 'Fresh aerosol tag on face brick — applied within 48 hours', after: 'Brick fully restored with no visible witness marks' },
    ],
    whyUs: [
      { title: 'Right chemistry for the surface', desc: 'We don\'t use one product on everything. Getting this wrong causes damage and wastes time.' },
      { title: 'Same-week response', desc: 'Speed matters in graffiti removal. The longer it sits, the harder it is.' },
      { title: 'Honest about outcomes', desc: 'We\'ll tell you what\'s achievable before we start, not after.' },
      { title: 'Anti-graffiti protection', desc: 'We can apply a sacrificial coating after removal that dramatically speeds up any future removal.' },
    ],
    faqs: [
      {
        q: 'How quickly do you respond?',
        a: 'We aim for same-week attendance on all graffiti jobs. In most cases we can attend within 2–4 business days.',
      },
      {
        q: 'Can you guarantee full removal?',
        a: 'On most surfaces with reasonably fresh paint, yes. On old, deeply porous surfaces we may not achieve 100% invisible removal. We\'ll assess and tell you what to expect before we start.',
      },
      {
        q: 'What if one treatment isn\'t enough?',
        a: 'We don\'t charge for repeat visits on the same job.',
      },
      {
        q: 'What areas of Melbourne do you cover?',
        a: 'We cover all of metropolitan Melbourne and inner-ring suburbs.',
      },
    ],
    relatedSlugs: ['pressure-washing', 'house-soft-washing', 'concrete-sealcoating'],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}