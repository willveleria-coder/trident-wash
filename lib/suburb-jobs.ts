// Real Melbourne suburb coordinates [longitude, latitude] + recent job data
export type SuburbJob = {
  name: string;
  coords: [number, number]; // [lng, lat]
  lastJob: string;
  avgQuote: string;
  jobsDone: number;
  photo: string;
  date: string;
};

export const SUBURB_JOBS: SuburbJob[] = [
  // Inner east
  { name: 'Hawthorn',     coords: [145.0353, -37.8221], lastJob: 'Roof soft wash',     avgQuote: '$520', jobsDone: 14, photo: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=600&q=80', date: 'Last week' },
  { name: 'Camberwell',   coords: [145.0586, -37.8369], lastJob: 'Driveway clean',     avgQuote: '$340', jobsDone: 11, photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', date: '2 weeks ago' },
  { name: 'Kew',          coords: [145.0307, -37.8067], lastJob: 'House exterior',     avgQuote: '$680', jobsDone:  9, photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', date: 'This week' },
  { name: 'Richmond',     coords: [145.0003, -37.8167], lastJob: 'Patio + concrete',   avgQuote: '$295', jobsDone: 18, photo: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=600&q=80', date: 'This week' },
  { name: 'Box Hill',     coords: [145.1235, -37.8195], lastJob: 'Solar panel array',  avgQuote: '$280', jobsDone:  8, photo: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=600&q=80', date: '3 weeks ago' },
  { name: 'Doncaster',    coords: [145.1239, -37.7891], lastJob: 'Patio + concrete',   avgQuote: '$410', jobsDone: 14, photo: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=600&q=80', date: '2 weeks ago' },

  // Inner south
  { name: 'South Yarra',  coords: [145.0014, -37.8388], lastJob: 'Render soft wash',   avgQuote: '$580', jobsDone: 12, photo: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80', date: 'Last week' },
  { name: 'Prahran',      coords: [145.0005, -37.8497], lastJob: 'Full property',       avgQuote: '$820', jobsDone:  8, photo: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80', date: '3 weeks ago' },
  { name: 'St Kilda',     coords: [144.9810, -37.8676], lastJob: 'Render soft wash',   avgQuote: '$540', jobsDone: 15, photo: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80', date: '3 weeks ago' },
  { name: 'Brighton',     coords: [145.0028, -37.9056], lastJob: 'Driveway + seal',    avgQuote: '$480', jobsDone: 22, photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', date: 'This week' },
  { name: 'Bentleigh',    coords: [145.0337, -37.9176], lastJob: 'Full property',       avgQuote: '$760', jobsDone: 13, photo: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80', date: '2 weeks ago' },
  { name: 'Sandringham',  coords: [145.0117, -37.9500], lastJob: 'Roof clean',          avgQuote: '$590', jobsDone: 10, photo: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=600&q=80', date: '2 weeks ago' },

  // South east
  { name: 'Caulfield',    coords: [145.0249, -37.8779], lastJob: 'House wash',          avgQuote: '$510', jobsDone: 11, photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', date: 'Last week' },
  { name: 'Glen Waverley',coords: [145.1639, -37.8784], lastJob: 'House exterior',     avgQuote: '$640', jobsDone: 16, photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', date: 'Last week' },
  { name: 'Mt Waverley',  coords: [145.1289, -37.8732], lastJob: 'Driveway clean',     avgQuote: '$320', jobsDone:  9, photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', date: '3 weeks ago' },
  { name: 'Clayton',      coords: [145.1190, -37.9243], lastJob: 'Solar panels',        avgQuote: '$220', jobsDone:  7, photo: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=600&q=80', date: '2 weeks ago' },
  { name: 'Oakleigh',     coords: [145.0903, -37.8983], lastJob: 'Patio + deck',        avgQuote: '$380', jobsDone: 12, photo: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=600&q=80', date: '2 weeks ago' },

  // North
  { name: 'Brunswick',    coords: [144.9603, -37.7670], lastJob: 'Render soft wash',   avgQuote: '$520', jobsDone: 11, photo: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80', date: 'This week' },
  { name: 'Carlton',      coords: [144.9670, -37.8001], lastJob: 'Building exterior',  avgQuote: '$890', jobsDone:  6, photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', date: 'Last week' },
  { name: 'Northcote',    coords: [144.9970, -37.7700], lastJob: 'House wash',          avgQuote: '$490', jobsDone:  9, photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', date: '2 weeks ago' },
  { name: 'Preston',      coords: [145.0070, -37.7444], lastJob: 'Full property',       avgQuote: '$720', jobsDone:  8, photo: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80', date: '3 weeks ago' },

  // West
  { name: 'Footscray',    coords: [144.8990, -37.8011], lastJob: 'Driveway clean',     avgQuote: '$310', jobsDone: 10, photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', date: 'Last week' },
  { name: 'Williamstown', coords: [144.8977, -37.8573], lastJob: 'House + gutters',    avgQuote: '$650', jobsDone:  7, photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', date: '2 weeks ago' },
  { name: 'Yarraville',   coords: [144.8896, -37.8159], lastJob: 'Patio + deck',        avgQuote: '$390', jobsDone:  6, photo: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=600&q=80', date: '3 weeks ago' },

  // Outer east
  { name: 'Ringwood',     coords: [145.2293, -37.8136], lastJob: 'Roof soft wash',     avgQuote: '$560', jobsDone:  9, photo: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=600&q=80', date: 'This week' },
  { name: 'Croydon',      coords: [145.2823, -37.7993], lastJob: 'Driveway + seal',    avgQuote: '$470', jobsDone:  7, photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', date: '2 weeks ago' },

  // Outer south-east
  { name: 'Dandenong',    coords: [145.2147, -37.9866], lastJob: 'Full property',       avgQuote: '$790', jobsDone: 11, photo: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80', date: 'Last week' },
  { name: 'Frankston',    coords: [145.1167, -38.1333], lastJob: 'House wash',          avgQuote: '$540', jobsDone:  8, photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', date: '3 weeks ago' },
  { name: 'Mornington',   coords: [145.0431, -38.2167], lastJob: 'Roof + gutters',      avgQuote: '$690', jobsDone:  6, photo: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=600&q=80', date: '3 weeks ago' },
];