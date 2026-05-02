import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import CTA from '@/components/CTA';
import WaveDivider from '@/components/WaveDivider';
import WaterParticles from '@/components/WaterParticles';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';

export default function ServicesPage() {
  return (
    <main>
      <Nav />
      <section className="pt-32 pb-24 bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 water-mesh" />
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-cyan-300/40 splash animate-wave-slow" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-sky-300/40 splash animate-wave" />
        <WaterParticles density="medium" />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <div className="text-xs tracking-[0.3em] uppercase text-cyan-300 mb-4">
            ◆ Full menu
          </div>
          <h1 className="font-display text-6xl lg:text-9xl leading-[0.85] tracking-tightest text-cream-50">
            Every surface
            <br />
            <span className="italic gradient-text">has its method.</span>
          </h1>
        </div>
      </section>

      <WaveDivider fromColor="#04222B" toColor="#FBF7EE" height={90} />

      <Services />

      <WaveDivider fromColor="#FBF7EE" toColor="#04222B" height={90} flip />

      <Process />

      <WaveDivider fromColor="#04222B" toColor="#FBF7EE" height={90} />

      <FAQ />

      <CTA />
      <Footer />
    </main>
  );
}
