import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Transformations from '@/components/Transformations';
import CTA from '@/components/CTA';
import WaveDivider from '@/components/WaveDivider';
import WaterParticles from '@/components/WaterParticles';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

const FEATURED = [
  {
    beforeSrc: 'https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=1200&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    title: 'Brighton driveway',
    desc: 'Three years of moss and oil, restored in a single afternoon.',
  },
  {
    beforeSrc: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    title: 'Hawthorn roof',
    desc: 'Soft-wash treatment killed lichen at the root. No high pressure, no broken tiles.',
  },
];

export default function GalleryPage() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-24 bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 water-mesh" />
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-cyan-300/40 splash animate-wave-slow" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-sky-300/40 splash animate-wave" />
        <WaterParticles density="medium" />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <div className="text-xs tracking-[0.3em] uppercase text-cyan-300 mb-4">
            ◆ The gallery
          </div>
          <h1 className="font-display text-6xl lg:text-9xl leading-[0.85] tracking-tightest text-cream-50">
            Before, after,
            <br />
            <span className="italic gradient-text">in awe.</span>
          </h1>
        </div>
      </section>

      {/* Featured big sliders */}
      <section className="py-24 bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 water-mesh-soft opacity-50" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-300/15 splash" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="text-xs tracking-[0.3em] uppercase text-cyan-300 mb-4 text-center">
            ◆ Featured
          </div>
          <h2 className="font-display text-4xl lg:text-6xl leading-[0.95] tracking-tightest text-cream-50 text-center mb-16">
            Drag to reveal.
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {FEATURED.map((f, i) => (
              <div key={i} className="group">
                <div className="relative rounded-3xl overflow-hidden glow-border">
                  <BeforeAfterSlider
                    beforeSrc={f.beforeSrc}
                    afterSrc={f.afterSrc}
                    alt={f.title}
                  />
                </div>
                <div className="mt-6">
                  <h3 className="font-display text-2xl text-cream-50 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-cream-100/70 text-sm leading-relaxed max-w-md">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Transformations />

      <WaveDivider fromColor="#04222B" toColor="#67E8F9" height={90} />
      <CTA />
      <Footer />
    </main>
  );
}
