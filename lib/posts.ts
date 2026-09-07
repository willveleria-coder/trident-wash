// Post content is standalone — no imports needed from ./seo

export type Section = { h: string; body: string[] };

export type Post = {
  slug: string;
  title: string;
  /** Meta description. Under 155 chars. */
  excerpt: string;
  category: 'Method' | 'Maintenance' | 'Roofing' | 'Solar' | 'Concrete' | 'Tips' | 'Pricing' | 'Commercial';
  /** ISO date. Set these to when you actually publish. */
  date: string;
  readMins: number;
  tone: 'yellow' | 'cyan' | 'white';
  keywords: string[];
  intro: string;
  sections: Section[];
  faqs?: { q: string; a: string }[];
  /** Slugs of related posts. */
  related: string[];
  /** Service slug this post should funnel toward. */
  service?: string;
};

export const POSTS: Post[] = [
  /* ─────────────────────────────────────────────── */
  {
    slug: 'pressure-washing-cost-melbourne',
    title: 'What does pressure washing actually cost in Melbourne?',
    excerpt:
      'Real Melbourne pressure washing prices for driveways, roofs, gutters and house washes — plus why hourly quotes usually cost you more.',
    category: 'Pricing',
    date: '2026-08-18',
    readMins: 6,
    tone: 'yellow',
    keywords: [
      'pressure washing cost melbourne',
      'pressure washing prices melbourne',
      'how much does pressure cleaning cost',
      'driveway cleaning cost melbourne',
    ],
    service: 'pressure-washing',
    intro:
      'Nobody publishes prices in this industry, which is exactly why everyone asks. So here are real numbers — what we charge, what the range depends on, and where the cheap quotes hide their costs.',
    sections: [
      {
        h: 'Typical Melbourne prices',
        body: [
          'Driveways run $180 to $450. A standard double concrete driveway sits around $250. Exposed aggregate and pavers cost more because they take longer and need lower pressure with more passes.',
          'Gutter cleaning is $150 to $300 for single storey, $280 to $500 for double. The jump is height safety setup, not the cleaning itself.',
          'Roof soft washing starts around $450 and runs to $1,200+ on large or steep roofs. Pitch and access drive this more than area does.',
          'A full house wash starts at $350 for a modest single storey and lands between $500 and $900 for most family homes.',
          'Solar panel cleaning is $180 to $400 depending on panel count and roof access.',
        ],
      },
      {
        h: 'What actually changes the number',
        body: [
          'Access is the biggest hidden factor. A driveway you can park a ute next to costs less than one behind a locked side gate with a 30 metre hose run.',
          'Severity matters more than size. A small driveway with fifteen years of oil and lichen takes longer than a large one cleaned two years ago.',
          'Surface type changes the method. Concrete takes high pressure. Pavers need low pressure and re-sanding. Render and roof tiles need soft washing, which is slower and uses more chemical.',
          'Water access on site. If there is no tap, we bring tanks, and that gets factored in.',
        ],
      },
      {
        h: 'Why hourly quotes usually cost more',
        body: [
          'An hourly rate transfers all the risk to you. If the operator is slow, undertrained, or using a handheld wand instead of a surface cleaner, you pay for that.',
          'Fixed price means we absorb it. We look at the job, quote a number, and that number holds whether it takes three hours or six. The only time it changes is if you add scope on the day.',
          'The trade-off is that we need to see the job first — photos or a site visit. That is a five minute step that protects both sides.',
        ],
      },
      {
        h: 'Where the cheap quotes hide the cost',
        body: [
          'A $99 driveway special is usually a handheld wand and twenty minutes. You get a striped driveway that needs redoing properly, which costs more than doing it right once.',
          'No insurance is the other one. Public liability cover on a pressure washing business is a real annual cost, and skipping it is a common way to be cheaper. If a wand goes through a window or water gets into a wall cavity, that becomes your problem.',
          'Ask for a certificate of currency. Anyone legitimate has one to hand.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you charge for quotes?',
        a: 'No. Send photos through the website or call us and we will come back with a fixed price, usually the same day.',
      },
      {
        q: 'Is pressure washing cheaper in winter?',
        a: 'Our pricing does not change seasonally, but winter has more availability. Spring is the busiest period because everyone books before Christmas.',
      },
    ],
    related: ['how-often-clean-driveway-melbourne', 'pressure-washing-vs-soft-washing'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'pressure-washing-vs-soft-washing',
    title: 'Pressure washing vs soft washing — which one does your surface need?',
    excerpt:
      'Using high pressure on the wrong surface causes real damage. Here is how we decide which method to use, and why it matters for your property.',
    category: 'Method',
    date: '2026-07-22',
    readMins: 5,
    tone: 'yellow',
    keywords: [
      'pressure washing vs soft washing',
      'soft washing melbourne',
      'what is soft washing',
      'soft wash vs pressure wash',
    ],
    service: 'pressure-washing',
    intro:
      'These are two different jobs that happen to use similar-looking equipment. Choosing wrong is how people end up with stripped paint, cracked ridge caps and blown-out render.',
    sections: [
      {
        h: 'The actual difference',
        body: [
          'Pressure washing uses force. Water at 2,000 to 4,000 PSI physically blasts dirt off a surface. It works because the surface is harder than the dirt.',
          'Soft washing uses chemistry. Low pressure — usually under 500 PSI, about what a garden hose does — carries a detergent that kills algae, mould and lichen at the root. Then it gets rinsed off.',
          'One removes what is sitting on top. The other kills what is growing in.',
        ],
      },
      {
        h: 'What gets pressure washed',
        body: [
          'Concrete driveways, paths and patios. Concrete is hard, porous and takes high pressure well.',
          'Exposed aggregate, at reduced pressure so stones are not dislodged.',
          'Brick paving and bluestone, with re-sanding afterwards.',
          'Commercial car parks, loading docks and forecourts.',
        ],
      },
      {
        h: 'What gets soft washed',
        body: [
          'Roofs. All of them. Tile, terracotta, Colorbond — high pressure cracks ridge capping, dislodges tiles and strips coating.',
          'Render and painted walls. Pressure erodes render texture and can blow patches off around cracks and expansion joints.',
          'Weatherboard and timber. Pressure raises the grain and forces water behind boards.',
          'Anything with mould or lichen, because pressure only removes the visible growth and leaves the spores to regrow within months.',
        ],
      },
      {
        h: 'How to tell if someone got it wrong',
        body: [
          'Striping on concrete means a handheld wand at inconsistent height. It is very hard to fix — the only real remedy is a full even re-clean.',
          'Furring or fuzzing on timber means pressure raised the grain.',
          'Loose or missing ridge capping after a roof clean means someone used pressure they should not have.',
          'Moss returning within twelve months of a roof clean means it was pressure washed, not soft washed. The spores were never killed.',
        ],
      },
    ],
    related: ['why-we-never-use-high-pressure-on-roofs', 'can-you-pressure-wash-render'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'how-often-clean-driveway-melbourne',
    title: 'How often should you actually clean your driveway in Melbourne?',
    excerpt:
      "Melbourne's weather is hard on concrete and pavers. Oil, lichen and tannin build up faster than you'd think — here's the honest answer.",
    category: 'Maintenance',
    date: '2026-06-30',
    readMins: 4,
    tone: 'cyan',
    keywords: [
      'how often clean driveway',
      'driveway cleaning frequency',
      'driveway cleaning melbourne',
    ],
    service: 'driveway-cleaning',
    intro:
      'The honest answer is every 12 to 18 months for most Melbourne homes. But that range moves a lot depending on which way your driveway faces and what is growing above it.',
    sections: [
      {
        h: 'What drives the frequency',
        body: [
          'Aspect matters most. A south-facing driveway that never gets direct sun stays damp, and damp concrete grows algae and lichen. Those often need annual cleaning. North-facing driveways in full sun can go two years.',
          'Tree cover is the second factor. Anything under a gum, plane tree or liquidambar collects tannin staining from leaf drop, which soaks in and darkens the concrete permanently if left.',
          'Traffic and oil. Two cars parked in the same spots for years leave defined oil patches that get progressively harder to lift.',
        ],
      },
      {
        h: 'Why waiting costs more',
        body: [
          'Concrete is porous. Oil, tannin and rust do not sit on the surface — they migrate down into it. Fresh staining lifts almost completely. Five-year-old staining fades significantly but often leaves a shadow.',
          'Lichen is worse. It puts root structures into the concrete surface, and by the time it is established, removing it can leave a lighter patch where it was.',
          'The maintenance clean is cheaper than the restoration clean, and it gets a better result.',
        ],
      },
      {
        h: 'Melbourne-specific timing',
        body: [
          'Autumn, after leaf drop, is ideal. You clear the tannin before it has months of wet weather to soak in.',
          'Early spring is the other good window — it clears the winter algae growth before summer entertaining.',
          'Avoid cleaning immediately before heavy rain if you are sealing afterwards. Sealer needs dry concrete and a clear 24 hours.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I seal my driveway after cleaning?',
        a: 'It helps on driveways and outdoor entertaining areas — sealed concrete resists oil and stays cleaner longer. It needs redoing every three to five years, so treat it as an ongoing commitment rather than a one-off.',
      },
    ],
    related: ['remove-lichen-from-concrete', 'oil-stains-concrete-driveway'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'why-we-never-use-high-pressure-on-roofs',
    title: 'Why we never use high pressure on roofs — and what we do instead',
    excerpt:
      'A pressure washer on a tiled roof is a one-way ticket to broken tiles and voided warranties. Soft wash is the only safe method. Here is why.',
    category: 'Roofing',
    date: '2026-06-08',
    readMins: 5,
    tone: 'white',
    keywords: [
      'roof cleaning melbourne',
      'pressure wash roof damage',
      'roof soft washing',
      'moss removal roof',
    ],
    service: 'roof-cleaning',
    intro:
      'Every year we get called to roofs that someone else pressure washed. The moss is back, the ridge caps are loose, and there is a damp patch in the ceiling. It is avoidable.',
    sections: [
      {
        h: 'What high pressure does to a tiled roof',
        body: [
          'Ridge capping is bedded in mortar. High pressure erodes that mortar, and once it goes the caps lift in the next decent wind.',
          'Water gets driven upward under the tile overlap. Tiles shed water flowing down, not water forced up at 3,000 PSI. That water ends up in the roof cavity, in insulation, and eventually on a ceiling.',
          'Concrete tiles have a factory surface coating. Pressure strips it, which exposes the porous concrete underneath and makes future moss growth faster, not slower.',
          'On Colorbond, pressure strips the protective coating and voids the manufacturer warranty.',
        ],
      },
      {
        h: 'Why soft washing lasts longer',
        body: [
          'Moss and lichen are living organisms with root structures. Pressure knocks off the visible growth and leaves the roots. That is why pressure-washed roofs regrow within twelve months.',
          'Soft washing applies a biocide that kills the organism entirely. Dead growth then weathers off over the following weeks with normal rain.',
          'A properly soft washed roof stays clear for three to five years. That is the actual difference, and it is why the method matters more than the price.',
        ],
      },
      {
        h: 'What a soft wash looks like on the day',
        body: [
          'We apply the solution at low pressure across the whole roof, working in sections so nothing dries before it has worked.',
          'Gutters get flushed afterwards, because the runoff carries a lot of dead growth.',
          'The roof does not look finished the day we leave. It keeps improving for two to four weeks as the dead lichen weathers off. That surprises people, so we say it up front.',
        ],
      },
    ],
    faqs: [
      {
        q: 'My roof looks the same the day after. Did it work?',
        a: 'Almost certainly. Soft washing kills the growth rather than blasting it off, so the visual change happens over two to four weeks as dead lichen weathers away. If nothing has changed after a month, call us.',
      },
      {
        q: 'Does soft washing damage plants?',
        a: 'Not with proper prep. Garden beds get pre-wet and rinsed after, which dilutes anything that lands to a harmless level.',
      },
    ],
    related: ['pressure-washing-vs-soft-washing', 'colorbond-roof-cleaning'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'solar-panel-cleaning-output',
    title: 'Does cleaning your solar panels actually make a difference to output?',
    excerpt:
      'Dirty panels can lose 15–25% efficiency. We ran the numbers on a Glen Waverley install — here is what the before and after data showed.',
    category: 'Solar',
    date: '2026-05-14',
    readMins: 4,
    tone: 'yellow',
    keywords: [
      'solar panel cleaning worth it',
      'does cleaning solar panels help',
      'solar panel cleaning melbourne',
      'dirty solar panels output',
    ],
    service: 'solar-panel-cleaning',
    intro:
      'Short answer: yes, and it is measurable. Longer answer: it depends heavily on how long it has been, and the marketing claims are often inflated.',
    sections: [
      {
        h: 'What the loss actually is',
        body: [
          'Panels that have never been cleaned commonly sit 15 to 25% below rated output. That is the figure worth caring about.',
          'Panels cleaned within the last twelve months typically recover 3 to 8%. Still worth doing, but it will not transform your bill.',
          'The variable is what is on them. Uniform dust costs you a few percent. Bird mess and lichen create hard shading, and because panels are wired in series, one heavily shaded cell drags down the whole string.',
        ],
      },
      {
        h: 'Why hosing them yourself can backfire',
        body: [
          'Melbourne tap water carries dissolved minerals. When it dries on glass it leaves deposits, and those deposits reduce light transmission. You can end up marginally worse than before.',
          'Deionised water has the minerals stripped out, so it dries completely clean with no spotting. That is why it is the industry standard rather than an upsell.',
          'The other risk is the roof itself. More people are injured falling off roofs cleaning panels than any efficiency gain justifies.',
        ],
      },
      {
        h: 'What to watch for on your own system',
        body: [
          'Check your inverter app. Compare this month against the same month last year. A steady year-on-year decline that is not explained by weather usually means soiling.',
          'Look for droppings and lichen rather than dust. Hard shading costs far more than an even film.',
          'North-facing panels at a shallow pitch collect the most, because rain runs off too slowly to self-clean.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How often should solar panels be cleaned?',
        a: 'Annually for most Melbourne homes. Every six months if you are near a main road, under trees, or on an unsealed road.',
      },
      {
        q: 'Will cleaning void my panel warranty?',
        a: 'Not when it is done with soft brushes and deionised water. Abrasives, harsh detergents and high pressure will. Ask any cleaner what method they use before booking.',
      },
    ],
    related: ['pressure-washing-cost-melbourne'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'remove-lichen-from-concrete',
    title: 'The right way to remove lichen from concrete without it coming straight back',
    excerpt:
      "Blasting lichen off with pressure alone doesn't kill the root. Six weeks later it's back. Here's the chemical treatment that actually works.",
    category: 'Concrete',
    date: '2026-04-20',
    readMins: 5,
    tone: 'cyan',
    keywords: [
      'remove lichen from concrete',
      'lichen removal driveway',
      'moss on concrete melbourne',
      'black spots on concrete',
    ],
    service: 'concrete-cleaning',
    intro:
      'Lichen is the flat, crusty growth that looks like grey-green paint splatter. It is not dirt, and treating it like dirt is why it keeps coming back.',
    sections: [
      {
        h: 'Why pressure alone fails',
        body: [
          'Lichen is a fungus and an alga living together as one organism. It anchors into the concrete surface with root-like structures called rhizines.',
          'Pressure removes the visible body. The rhizines stay in the pore structure of the concrete, and they regrow. Six to twelve weeks is typical.',
          'Worse, blasting spreads spores across the rest of the slab. People clean one patch and find three new ones the next season.',
        ],
      },
      {
        h: 'What actually works',
        body: [
          'Pre-treat with a biocide and let it dwell. Not a quick spray and rinse — it needs contact time to penetrate and kill the organism through.',
          'Then pressure clean with a rotary surface cleaner to lift the dead growth evenly.',
          'Then a second light biocide application as a residual, which slows re-establishment considerably.',
          'Skipping step one is the single most common mistake, and it is the reason cheap driveway cleans do not last.',
        ],
      },
      {
        h: 'The lighter patch problem',
        body: [
          'Established lichen protects the concrete underneath it from UV and weathering. Remove it, and the concrete under it is a different shade from the surrounding slab.',
          'This is not damage and it evens out over six to twelve months of weathering. But it is startling if nobody warned you.',
          'On badly affected driveways we sometimes recommend cleaning the entire slab rather than spot-treating, purely so the finish is even.',
        ],
      },
      {
        h: 'Stopping it coming back',
        body: [
          'Cut back overhanging branches. Lichen needs shade and moisture, and reducing either slows it dramatically.',
          'Fix drainage that keeps a section of slab permanently damp.',
          'Sealing helps — a sealed surface gives rhizines much less to anchor into.',
        ],
      },
    ],
    related: ['how-often-clean-driveway-melbourne', 'driveway-striped-after-cleaning'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'kerb-appeal-before-listing',
    title: 'The quickest way to add kerb appeal before listing your home',
    excerpt:
      'Agents agree a clean exterior is worth more than almost any other pre-sale spend. Here is what to prioritise and in what order.',
    category: 'Tips',
    date: '2026-03-25',
    readMins: 4,
    tone: 'white',
    keywords: [
      'kerb appeal before selling',
      'pre sale cleaning melbourne',
      'increase home value cleaning',
    ],
    service: 'house-washing',
    intro:
      'Buyers form an opinion from the footpath before they reach the front door, and photographs do most of the work before that. Exterior cleaning is the cheapest way to move both.',
    sections: [
      {
        h: 'Priority order',
        body: [
          'Driveway and front path first. It is the largest surface in every listing photo taken from the street, and it is usually the dirtiest.',
          'Roof second, but only if it is visible from the street or in drone shots. A lichen-covered roof reads as deferred maintenance, which makes buyers wonder what else was deferred.',
          'Render and front facade third. Mould on the shaded side photographs as staining.',
          'Windows last, but before photography. Clean glass changes how interior photos look more than people expect.',
        ],
      },
      {
        h: 'Timing around the campaign',
        body: [
          'Book the clean at least a week before photography. Roof soft washing in particular keeps improving for two to four weeks, so earlier is better.',
          'If the campaign runs more than four weeks, a quick re-rinse of the driveway before the final open is worth it.',
          'Do not clean the day before photos if rain is forecast. Wet concrete photographs darker and blotchy.',
        ],
      },
      {
        h: 'What is not worth it pre-sale',
        body: [
          'Sealing the driveway. It costs real money, adds a maintenance obligation for the buyer, and nobody has ever paid more for a sealed driveway.',
          'Cleaning areas no buyer will see. Behind the shed, the side return nobody walks down.',
          'Anything structural disguised as cleaning. Pressure washing does not fix a failing render coat, and a building inspection will find it.',
        ],
      },
    ],
    related: ['pressure-washing-cost-melbourne', 'house-washing-what-included'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'how-often-clean-gutters-melbourne',
    title: 'How often should Melbourne gutters actually be cleaned?',
    excerpt:
      'Twice a year for most homes, quarterly under gums. Here is how to tell which one you are, and what blocked gutters actually cost.',
    category: 'Maintenance',
    date: '2026-02-17',
    readMins: 5,
    tone: 'cyan',
    keywords: [
      'gutter cleaning frequency melbourne',
      'how often clean gutters',
      'gutter cleaning melbourne',
      'blocked gutters damage',
    ],
    service: 'gutter-cleaning',
    intro:
      'Gutters are the cheapest maintenance item on a house and the most expensive to ignore. Water that cannot get away goes into the eaves, then the wall cavity, then the ceiling.',
    sections: [
      {
        h: 'The baseline: twice a year',
        body: [
          'Once after autumn leaf drop, around May. This is the important one — it clears the bulk before winter rain.',
          'Once in early spring, before storm season, to clear seed, blossom and whatever the winter added.',
          'That schedule covers most Melbourne homes with moderate tree cover.',
        ],
      },
      {
        h: 'When you need quarterly',
        body: [
          'Anything under eucalypts. Gums drop bark, leaves and seed year round rather than seasonally, and gum leaves break down into a dense sludge that holds water.',
          'Properties in the eastern ranges — Ringwood, Croydon, the Dandenongs — where tree density is high.',
          'Homes with a shallow roof pitch, because debris does not wash toward the outlet as readily.',
        ],
      },
      {
        h: 'What blocked gutters actually cost',
        body: [
          'Overflow runs back under the roof edge into the eave lining. Eave replacement runs into the thousands.',
          'Water in the wall cavity causes render blistering, internal mould and, if it reaches framing, rot.',
          'Standing water in gutters rusts them from the inside. A full re-gutter on an average home is $3,000 to $6,000.',
          'And in summer, dry debris in gutters is an ember-catcher. In bushfire-prone areas it is a genuine safety item, not just maintenance.',
        ],
      },
      {
        h: 'Gutter guard is not a substitute',
        body: [
          'Guard reduces frequency. It does not eliminate the need. Fine grit, seed and broken-down leaf matter still pass through and build up underneath.',
          'The trap is that guard makes the problem invisible. People assume it is handled, and find out five years later when the eaves have rotted.',
          'Guarded gutters still want a check every 18 to 24 months, with the guard lifted rather than worked around.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I know if my gutters need doing?',
        a: 'Plants growing in them is the obvious one. Water sheeting over the edge during rain rather than running to the downpipe is the other. If you cannot see safely, we photograph every run as part of the job.',
      },
    ],
    related: ['why-we-never-use-high-pressure-on-roofs'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'white-powder-on-brick-efflorescence',
    title: 'What is the white powder on my brick walls?',
    excerpt:
      'That white bloom on brickwork is efflorescence — mineral salts leaching out of the wall. Brushing it off makes it return. Here is the fix.',
    category: 'Method',
    date: '2026-01-28',
    readMins: 5,
    tone: 'yellow',
    keywords: [
      'white powder on bricks',
      'efflorescence removal melbourne',
      'salt on brick wall',
      'brick cleaning melbourne',
    ],
    service: 'brick-cleaning',
    intro:
      'It is called efflorescence, and it is not mould, dirt or paint failure. It is mineral salt that has travelled through the wall dissolved in water and been left behind when that water evaporated.',
    sections: [
      {
        h: 'Where it comes from',
        body: [
          'Bricks and mortar contain soluble salts. Water moving through the wall dissolves them and carries them to the surface.',
          'The water evaporates. The salt does not. What is left is the white crystalline bloom.',
          'This means efflorescence is a symptom. The salt is a nuisance, but the water movement is the actual issue.',
        ],
      },
      {
        h: 'Why brushing it off does not work',
        body: [
          'Brushing removes what has already surfaced. It does nothing about the salt still in the wall or the moisture still moving.',
          'Worse, wetting it with a hose redissolves the salt and carries it back in, where it recrystallises and comes out again next dry spell.',
          'Proper removal uses a neutralising treatment that converts the salt to a soluble form which can be rinsed clear, followed by full neutralisation so no acid residue is left in the brick.',
        ],
      },
      {
        h: 'Finding the water source',
        body: [
          'New builds efflorescence for the first year or two as construction moisture dries out. This is normal and self-limiting.',
          'Persistent efflorescence on an older wall means water is getting in. Common causes: blocked weep holes, garden beds built up above the damp course, a leaking downpipe, or failed flashing.',
          'Cleaning without addressing the source means it returns. We flag what we can see, but a bricklayer or building inspector is the right call for the cause.',
        ],
      },
      {
        h: 'Getting the chemistry wrong burns brick',
        body: [
          'Hydrochloric acid at the wrong strength burns the brick face and leaves it permanently blotchy and lighter.',
          'It also attacks mortar joints, which on an older wall is a real structural concern.',
          'Acid needs to be matched to brick type and fully neutralised afterwards. This is the part that separates a proper job from a bad one, and the damage is not reversible.',
        ],
      },
    ],
    related: ['can-you-pressure-wash-render'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'can-you-pressure-wash-render',
    title: 'Can you pressure wash rendered walls? (Short answer: no)',
    excerpt:
      'High pressure erodes render texture and blows patches off around cracks. Render needs soft washing. Here is what that involves.',
    category: 'Method',
    date: '2025-12-15',
    readMins: 4,
    tone: 'white',
    keywords: [
      'pressure wash render',
      'render cleaning melbourne',
      'clean rendered walls',
      'mould on render',
    ],
    service: 'render-cleaning',
    intro:
      'We get called to a few render repair jobs a year that started as someone hiring a pressure washer from Bunnings. The damage is quick and it is not cheap to fix.',
    sections: [
      {
        h: 'What pressure does to render',
        body: [
          'Acrylic render has a thin textured topcoat. High pressure erodes it, leaving smooth patches that are obvious once dry.',
          'Around cracks and expansion joints, pressure gets behind the render and blows sections off entirely.',
          'Water driven into a render crack sits in the substrate. On a lightweight system that means the sheeting behind, which does not dry out easily.',
          'Repair means re-rendering a section and colour-matching, which rarely blends perfectly.',
        ],
      },
      {
        h: 'What soft washing render looks like',
        body: [
          'A detergent matched to the render type — acrylic, cement and textured all behave differently.',
          'Applied at low pressure, given dwell time to kill the mould and algae rather than just wet it.',
          'Rinsed at low pressure from the top down.',
          'Care around windows, weep holes and light fittings, because those are the places water gets in.',
        ],
      },
      {
        h: 'Why the mould keeps coming back',
        body: [
          'South-facing and heavily shaded walls stay damp. Mould will always return faster there.',
          'Garden beds and dense planting hard against a wall hold moisture in the render. Pulling plantings back 300mm makes a real difference.',
          'Blocked weep holes trap moisture inside the wall system. Worth checking if one elevation is dramatically worse than the others.',
          'A proper soft wash typically holds two to three years on a normal wall, less on a permanently shaded one.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Will cleaning strip my paint?',
        a: 'Not with soft washing. Paint that is already chalking or failing may look worse once the dirt is gone, because the failure was being masked. We flag that before starting rather than after.',
      },
    ],
    related: ['pressure-washing-vs-soft-washing', 'white-powder-on-brick-efflorescence'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'driveway-striped-after-cleaning',
    title: 'Why your driveway looks striped after cleaning — and can it be fixed?',
    excerpt:
      'Zebra stripes on freshly cleaned concrete mean a handheld wand was used instead of a surface cleaner. Here is what went wrong.',
    category: 'Concrete',
    date: '2025-11-19',
    readMins: 4,
    tone: 'cyan',
    keywords: [
      'striped driveway after pressure washing',
      'zebra stripes concrete cleaning',
      'uneven driveway cleaning',
    ],
    service: 'concrete-cleaning',
    intro:
      'If your driveway came back looking like a barcode, the cause is almost always the same: a handheld wand, waved by hand, at inconsistent height and speed.',
    sections: [
      {
        h: 'Why a wand stripes concrete',
        body: [
          'A pressure wand concentrates water into a narrow fan. Held closer, it cleans harder. Held further away, it cleans less.',
          'No human hand holds a wand at a consistent height across a whole driveway for three hours. The variation shows as light and dark bands.',
          'Overlap makes it worse. Where passes overlap, the concrete gets cleaned twice and comes up lighter still.',
        ],
      },
      {
        h: 'What a surface cleaner does differently',
        body: [
          'A rotary surface cleaner is a shrouded disc with two or four jets spinning under it. It sits on wheels at a fixed height.',
          'Every square centimetre gets the same pressure from the same distance for the same duration. That is what even coverage means.',
          'It is also two to three times faster, which is part of why a fixed-price operator uses one and an hourly one may not.',
        ],
      },
      {
        h: 'Can striping be fixed?',
        body: [
          'Sometimes. If the stripes are dirt still present in the darker bands, a proper even re-clean with a surface cleaner resolves it.',
          'If the concrete was etched — pressure held too close, actually eroding the surface — that is permanent. The profile of the concrete has changed.',
          'The tell is texture. Run your hand across it. If the light bands feel rougher than the dark ones, it is etched, not dirty.',
          'Etched concrete can be resurfaced or a coating applied, but neither is cheap. This is why the first clean should be the right one.',
        ],
      },
    ],
    related: ['remove-lichen-from-concrete', 'oil-stains-concrete-driveway'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'oil-stains-concrete-driveway',
    title: 'Can you actually get oil stains out of a concrete driveway?',
    excerpt:
      'Fresh oil comes out almost completely. Old oil that has soaked deep may leave a shadow. Here is how to tell which you have.',
    category: 'Concrete',
    date: '2025-10-21',
    readMins: 4,
    tone: 'yellow',
    keywords: [
      'remove oil stain concrete',
      'oil stain driveway removal',
      'degrease driveway melbourne',
    ],
    service: 'driveway-cleaning',
    intro:
      'Concrete is porous, which means oil does not sit on top of it — it wicks down into the pore structure. How far down decides whether it comes out.',
    sections: [
      {
        h: 'Fresh versus old',
        body: [
          'Oil spilled in the last few weeks is still near the surface. A degreaser with dwell time plus hot water pulls almost all of it out.',
          'Oil that has been there for years has migrated several millimetres down. Surface treatment removes what it can reach, and the rest stays.',
          'Expect fresh stains to disappear and years-old stains to fade by 60 to 90% with a visible shadow remaining.',
        ],
      },
      {
        h: 'What actually lifts it',
        body: [
          'An alkaline degreaser applied neat, given ten to fifteen minutes to penetrate and emulsify the oil.',
          'Agitation with a stiff brush on heavy patches, which matters more than people think.',
          'Hot water. Heat drops oil viscosity and lets it release. This is the biggest difference between a professional setup and a hired machine — most hire units are cold water only.',
          'Repeat cycles on deep staining rather than one aggressive pass.',
        ],
      },
      {
        h: 'What not to do',
        body: [
          'Do not use kitty litter or sand after the fact. That works on wet spills in the first hour, not on a stain that has soaked in.',
          'Do not use petrol or solvent. It spreads the stain wider and drives it deeper.',
          'Do not blast it with pressure alone. Without a degreaser you are pushing oil sideways and making a bigger, lighter stain.',
        ],
      },
      {
        h: 'Preventing the next one',
        body: [
          'Sealing is the real answer. Sealed concrete keeps oil on the surface where it wipes off.',
          'Do the seal after a full clean, not over an existing stain, or you seal the stain in permanently.',
          'A drip tray under a known leaker costs $30 and saves the driveway.',
        ],
      },
    ],
    related: ['driveway-striped-after-cleaning', 'how-often-clean-driveway-melbourne'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'colorbond-roof-cleaning',
    title: 'Cleaning a Colorbond roof without wrecking the coating',
    excerpt:
      'Colorbond needs a gentler approach than tile. Pressure strips the coating and voids the warranty. Here is the method that works.',
    category: 'Roofing',
    date: '2025-09-23',
    readMins: 4,
    tone: 'white',
    keywords: [
      'colorbond roof cleaning',
      'clean metal roof melbourne',
      'colorbond roof washing',
    ],
    service: 'roof-cleaning',
    intro:
      'Colorbond is steel with a factory-applied paint system over a metallic coating. That paint system is what you are protecting, and it is thinner than people assume.',
    sections: [
      {
        h: 'What goes wrong',
        body: [
          'High pressure abrades the paint layer. It does not look dramatic on the day — it shows up as chalking and premature fading over the following year.',
          'Abrasive pads and stiff brushes do the same thing faster.',
          'Strong alkaline or acidic cleaners attack the coating chemistry. Products safe on concrete are not safe here.',
          'Any of these can void the BlueScope warranty, which on a newer roof matters.',
        ],
      },
      {
        h: 'The right method',
        body: [
          'A pH-neutral detergent, applied at low pressure and given dwell time.',
          'Soft brushing only where needed, working with the profile of the sheet rather than across it.',
          'Rinse from the ridge down at low pressure so runoff follows the sheet lap rather than being forced under it.',
          'Gutters cleared afterwards, because roof runoff carries a lot into them.',
        ],
      },
      {
        h: 'Salt-affected coastal roofs',
        body: [
          'Altona, Williamstown, Frankston, Point Cook — anywhere within a few kilometres of the bay accumulates salt on roofing.',
          'Salt is corrosive and it concentrates in areas that rain does not reach: under eaves, behind parapets, on sheltered elevations.',
          'BlueScope actually recommend a fresh water wash of unwashed areas every six months in coastal zones. Almost nobody does it, and it is the main reason coastal Colorbond fails early.',
        ],
      },
    ],
    related: ['why-we-never-use-high-pressure-on-roofs', 'how-often-clean-gutters-melbourne'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'house-washing-what-included',
    title: "What's actually included in a house wash?",
    excerpt:
      'A full exterior wash covers more than walls. Here is exactly what gets cleaned, what does not, and how long it takes.',
    category: 'Method',
    date: '2025-08-26',
    readMins: 4,
    tone: 'cyan',
    keywords: [
      'house washing melbourne',
      'what is a house wash',
      'exterior house cleaning melbourne',
    ],
    service: 'house-washing',
    intro:
      'House washing is a vague term and it means different things to different operators. Here is our scope so you can compare quotes properly.',
    sections: [
      {
        h: 'What we clean',
        body: [
          'All wall surfaces — render, brick, weatherboard, cladding — soft washed at low pressure.',
          'Eaves and fascia. This is where cobwebs and dirt accumulate most, and it is the first thing skipped on a cheap quote.',
          'Window frames, sills and tracks. Not the glass itself — that is a separate service with a different finish.',
          'Garage doors, front door, downpipes and any external light fittings.',
          'Verandah and porch ceilings, which collect more than people expect.',
        ],
      },
      {
        h: 'What is not included',
        body: [
          'Glass to a squeegee finish. A house wash rinses glass but will not leave it streak-free.',
          'Roof. Different method, different equipment, quoted separately.',
          'Driveways and paths. Also separate, though most people book them together and it is cheaper as one visit.',
          'Gutter interiors. We flush downpipes if you book gutter cleaning, not as part of a wall wash.',
        ],
      },
      {
        h: 'How long and what to expect',
        body: [
          'Single storey: three to five hours. Double storey: a full day depending on access.',
          'Windows should be shut. We check, but it is worth doing a lap yourself.',
          'Garden beds against the house get pre-wet and rinsed after.',
          'Pets inside. The equipment is loud and the chemicals, while plant-safe when rinsed, are not worth a curious dog investigating.',
        ],
      },
    ],
    related: ['can-you-pressure-wash-render', 'kerb-appeal-before-listing'],
  },

  /* ─────────────────────────────────────────────── */
  {
    slug: 'commercial-pressure-washing-what-to-expect',
    title: 'Commercial pressure washing: what property managers should ask for',
    excerpt:
      'Insurance, SWMS, trade waste compliance and after-hours scheduling. The things that separate a real commercial operator from a bloke with a trailer.',
    category: 'Commercial',
    date: '2025-07-29',
    readMins: 5,
    tone: 'yellow',
    keywords: [
      'commercial pressure washing melbourne',
      'car park cleaning melbourne',
      'commercial cleaning contractor melbourne',
    ],
    service: 'commercial-pressure-washing',
    intro:
      'If you manage retail, hospitality or industrial property, the cleaning is the easy part. The documentation and scheduling are what actually go wrong.',
    sections: [
      {
        h: 'Documentation to ask for up front',
        body: [
          'Certificate of currency for public liability, minimum $20 million for most commercial sites. Check the expiry date, not just that it exists.',
          'A SWMS specific to the work, not a generic template with the site name changed.',
          'Working at heights documentation if any roof, awning or elevated work is involved.',
          'Evidence of trade waste compliance — see below, because this is the one that catches people.',
        ],
      },
      {
        h: 'Trade waste is not optional',
        body: [
          'Wash water carrying oil, detergent or sediment cannot legally go into a stormwater drain. Stormwater in Melbourne discharges to creeks and the bay untreated.',
          'Compliant work means capturing runoff and either disposing of it to sewer under a trade waste agreement or removing it from site.',
          'Melbourne Water and the local council both enforce this, and the fine lands on the property owner, not the contractor. Worth confirming before the first visit rather than after.',
        ],
      },
      {
        h: 'Scheduling that does not cost you trade',
        body: [
          'Retail and hospitality frontages are best done overnight or pre-dawn. No pedestrian management, no wet surfaces during trading, no complaints.',
          'Car parks are usually done in sections across consecutive nights so the site never fully closes.',
          'Industrial and warehouse sites often prefer weekends, when forklift traffic stops.',
        ],
      },
      {
        h: 'Why a maintenance program beats one-off cleans',
        body: [
          'Scheduled cleaning at a fixed monthly or quarterly rate works out cheaper per visit than reactive one-offs, because the site never gets to the restoration-clean state.',
          'It also means the site is consistently presentable rather than cycling between clean and embarrassing.',
          'For strata and centre management, a fixed schedule is far easier to budget and to defend at a committee meeting.',
        ],
      },
    ],
    related: ['pressure-washing-cost-melbourne'],
  },
];

/* ─────────── helpers ─────────── */

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const sortedPosts = () =>
  [...POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });

export const relatedPosts = (post: Post) =>
  post.related.map(getPost).filter(Boolean) as Post[];