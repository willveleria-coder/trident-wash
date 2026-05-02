import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import WaveDivider from '@/components/WaveDivider';
import WaterParticles from '@/components/WaterParticles';
import { SERVICES } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <main>
      <Nav />

      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 water-mesh" />
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-cyan-300/40 splash animate-wave-slow" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-sky-300/40 splash animate-wave" />
        <WaterParticles density="medium" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <Link
              href="/services"
              className="text-xs tracking-[0.3em] uppercase text-cyan-300 mb-6 inline-block hover:text-cream-50"
            >
              ← All services
            </Link>
            <div className="font-mono text-xs tracking-[0.2em] text-cyan-300/80 mb-4">
              {service.number} / 08
            </div>
            <h1 className="font-display text-6xl lg:text-8xl leading-[0.9] tracking-tightest text-cream-50 mb-8">
              {service.title}
            </h1>
            <p className="text-2xl lg:text-3xl text-cream-100/85 leading-relaxed font-display max-w-2xl">
              {service.long}
            </p>
          </div>

          <div className="lg:col-span-4 lg:pt-32">
            <div className="bg-ink-700/70 backdrop-blur-sm border border-cyan-300/30 rounded-3xl p-8 shadow-[0_0_60px_-12px_rgba(34,211,238,0.4)]">
              <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 mb-5">
                Surfaces we treat
              </div>
              <ul className="space-y-3 mb-8">
                {service.surfaces.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-cream-50">
                    <Check className="w-4 h-4 text-cyan-300 shrink-0" strokeWidth={3} />
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-300 text-ink-900 rounded-full font-medium hover:bg-cyan-200 transition-colors shadow-[0_0_30px_-4px_rgba(103,232,249,0.6)]"
              >
                Quote this service
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#04222B" toColor="#67E8F9" height={90} />
      <CTA />
      <Footer />
    </main>
  );
}
