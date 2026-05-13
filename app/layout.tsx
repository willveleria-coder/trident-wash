import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
  title: 'Trident — Premium Pressure Washing in Melbourne',
  description:
    'Melbourne\'s most thorough exterior cleaning. Pressure washing, soft washing, roof cleaning, gutters, solar, sealcoating. Free quotes, fully insured.',
  metadataBase: new URL('https://tridentwash.com.au'),
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  openGraph: {
    title: 'Trident — Premium Pressure Washing in Melbourne',
    description:
      'Melbourne\'s most thorough exterior cleaning. Free quotes, fully insured, 100+ five-star reviews.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="grain font-sans antialiased bg-ink-900 text-cream-50">
        {children}
      </body>
    </html>
  );
}