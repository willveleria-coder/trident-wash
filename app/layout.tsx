import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import CursorTrail from '@/components/CursorTrail';

// Display: editorial serif with optical sizing for big headlines
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Body: refined neutral sans
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Mono: tags, numbers, small details
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
  openGraph: {
    title: 'Trident — Premium Pressure Washing in Melbourne',
    description:
      'Melbourne\'s most thorough exterior cleaning. Free quotes, fully insured, 100+ five-star reviews.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="grain font-sans antialiased bg-ink-900 text-cream-50">
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
