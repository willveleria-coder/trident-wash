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
import WaveDivider from '@/components/WaveDivider';

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />

      <Stats />
      {/* Stats (ink-900) → Services (cream) */}
      <WaveDivider fromColor="#04222B" toColor="#FBF7EE" height={90} />

      <Services />
      {/* Services (cream) → FilthOMeter (ink-900) */}
      <WaveDivider fromColor="#FBF7EE" toColor="#04222B" height={90} flip />

      <FilthOMeter />
      <Transformations />
      <Comparison />
      {/* Comparison (ink-900) → SuburbMap (cream) */}
      <WaveDivider fromColor="#04222B" toColor="#FBF7EE" height={90} />

      <SuburbMap />
      <Reviews />
      {/* Reviews (cream) → Process (ink-900) */}
      <WaveDivider fromColor="#FBF7EE" toColor="#04222B" height={90} flip />

      <Process />
      {/* Process (ink-900) → FAQ (cream) */}
      <WaveDivider fromColor="#04222B" toColor="#FBF7EE" height={90} />

      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
