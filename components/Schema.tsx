import { BUSINESS, SITE_URL, SERVICES, AREAS, type Service } from '@/lib/seo';

/**
 * Structured data. This is what produces star ratings, FAQ dropdowns and
 * business panels in Google results — the things that make a listing take up
 * more space than a competitor's.
 *
 * Validate after deploying: https://search.google.com/test/rich-results
 */

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Schema is static and author-controlled, so this is safe here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─────────── site-wide: goes in app/layout.tsx ─────────── */

export function OrganizationSchema() {
  const sameAs = Object.values(BUSINESS.socials).filter(Boolean);

  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: SITE_URL,
        telephone: BUSINESS.phoneRaw,
        email: BUSINESS.email,
        image: `${SITE_URL}/logo.png`,
        logo: `${SITE_URL}/logo.png`,
        priceRange: BUSINESS.priceRange,
        foundingDate: BUSINESS.founded,
        description:
          'Exterior cleaning across Melbourne and Victoria — pressure washing, roof soft washing, gutter cleaning, solar panel cleaning, house washing and commercial work.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: BUSINESS.city,
          addressRegion: BUSINESS.state,
          postalCode: BUSINESS.postcode,
          addressCountry: BUSINESS.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: BUSINESS.lat,
          longitude: BUSINESS.lng,
        },
        areaServed: [
          {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: BUSINESS.lat,
              longitude: BUSINESS.lng,
            },
            geoRadius: BUSINESS.serviceRadiusKm * 1000,
          },
          ...AREAS.map((a) => ({
            '@type': 'City',
            name: a.name,
            containedInPlace: { '@type': 'State', name: BUSINESS.stateFull },
          })),
        ],
        openingHoursSpecification: BUSINESS.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.open,
          closes: h.close,
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Exterior cleaning services',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.name,
              url: `${SITE_URL}/services/${s.slug}`,
            },
          })),
        },
        ...(sameAs.length ? { sameAs } : {}),
      }}
    />
  );
}

export function WebsiteSchema() {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS.name,
        publisher: { '@id': `${SITE_URL}/#business` },
        inLanguage: 'en-AU',
      }}
    />
  );
}

/* ─────────── per-page ─────────── */

export function ServiceSchema({ service, area }: { service: Service; area?: string }) {
  const name = area ? `${service.name} in ${area}` : service.name;
  const url = area
    ? `${SITE_URL}/areas/${area.toLowerCase().replace(/\s+/g, '-')}`
    : `${SITE_URL}/services/${service.slug}`;

  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        serviceType: service.name,
        url,
        description: service.blurb,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: {
          '@type': 'State',
          name: BUSINESS.stateFull,
        },
        ...(service.priceFrom
          ? {
              offers: {
                '@type': 'Offer',
                priceCurrency: 'AUD',
                price: service.priceFrom,
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  minPrice: service.priceFrom,
                  priceCurrency: 'AUD',
                },
                availability: 'https://schema.org/InStock',
              },
            }
          : {}),
      }}
    />
  );
}

export function FaqSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs.length) return null;

  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.name,
          item: `${SITE_URL}${t.path}`,
        })),
      }}
    />
  );
}

/**
 * Only render this once you have real Google reviews. Inventing an
 * aggregateRating is a manual-action risk and Google can spot it by
 * cross-checking your Business Profile.
 */
export function ReviewSchema({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) {
  if (!count) return null;

  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating,
          reviewCount: count,
          bestRating: 5,
          worstRating: 1,
        },
      }}
    />
  );
}