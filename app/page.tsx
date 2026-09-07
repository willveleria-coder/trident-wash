import Hero from '@/components/Hero';
import BeforeAfter from '@/components/BeforeAfter';
import Marquee from '@/components/Marquee';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import SuburbMap from '@/components/SuburbMap';
import Comparison from '@/components/Comparison';
import Reviews from '@/components/Reviews';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <BeforeAfter />
      <Reviews />
      <Stats />
      <Services />
      <Comparison />
      <SuburbMap />
      <Process />
      <FAQ />
      <CTA />
    </main>
  );
}