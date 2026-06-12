// app/services/[slug]/page.tsx
// Drop-in replacement — keeps your existing generateStaticParams / generateMetadata,
// swaps the <main> block for the new redesigned component.

import { notFound } from 'next/navigation';
import { getService, services } from './services-data';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer';
import ServicePageRedesign from './ServicePageRedesign'; // ← the new component

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <ServicePageRedesign service={service} />
      <Footer />
    </>
  );
}