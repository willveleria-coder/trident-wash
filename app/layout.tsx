import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE_URL, BUSINESS } from '@/lib/seo';
import { OrganizationSchema, WebsiteSchema } from '@/components/Schema';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Pressure Washing Melbourne | Roof, Driveway & Gutter Cleaning — Trident',
    template: `%s | ${BUSINESS.name}`,
  },

  description:
    "Melbourne's most thorough exterior cleaning. Pressure washing, roof soft washing, gutters, solar panels, driveways and render. Fixed prices, free quotes, fully insured.",

  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: 'Home Services',

  keywords: [
    'pressure washing melbourne',
    'pressure cleaning melbourne',
    'high pressure cleaning melbourne',
    'exterior cleaning melbourne',
    'roof cleaning melbourne',
    'roof soft washing melbourne',
    'gutter cleaning melbourne',
    'driveway cleaning melbourne',
    'concrete cleaning melbourne',
    'solar panel cleaning melbourne',
    'house washing melbourne',
    'window cleaning melbourne',
    'render cleaning melbourne',
    'brick cleaning melbourne',
    'commercial pressure washing melbourne',
    'pressure washing victoria',
  ],

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/logo.png',
    apple: '/icon-192.png',
    shortcut: '/logo.png',
  },

  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: 'Pressure Washing Melbourne | Trident Pressure Washing',
    description:
      'Driveways that look poured yesterday. Roofs that look re-tiled. Fixed prices, free quotes, same-week starts across Melbourne.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Pressure Washing Melbourne | Trident Pressure Washing',
    description:
      'Driveways, roofs, gutters and solar panels cleaned properly. Fixed prices, free quotes.',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    // Search Console → Settings → Ownership verification → HTML tag
    google: '',
  },

  formatDetection: {
    telephone: true,
    address: true,
  },

  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Trident Admin',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0EA5E9',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain font-sans antialiased bg-ink-900 text-cream-50">
        <OrganizationSchema />
        <WebsiteSchema />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}