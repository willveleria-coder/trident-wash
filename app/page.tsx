import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import FilthOMeter from '@/components/FilthOMeter';
import SuburbMap from '@/components/SuburbMap';
import Comparison from '@/components/Comparison';
import Transformations from '@/components/Transformations';
import Reviews from '@/components/Reviews';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';


export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      {/* Swapped: FilthOMeter now comes before Services */}
      <FilthOMeter />
      <Services />
      <Transformations />
      <Comparison />
      <SuburbMap />
      <Reviews />
      <Process />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}