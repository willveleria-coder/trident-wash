import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import Stats from '@/components/Stats';
import WaterParticles from '@/components/WaterParticles';
import WaveDivider from '@/components/WaveDivider';
import { WaterSplash } from '@/components/WaterSplash';
import { Award, Shield, Sparkles, Heart } from 'lucide-react';

const VALUES = [
  {
    icon: Award,
    title: 'Done right or done again',
    body: 'If anything isn\'t up to standard, we come back. Every job, every time. No fine print.',
  },
  {
    icon: Shield,
    title: 'Fully insured, properly trained',
    body: 'Public liability up to $20m. Police-checked operators. Insurance certificates available on request.',
  },
  {
    icon: Sparkles,
    title: 'The right method per surface',
    body: 'High pressure for hard. Soft wash for delicate. The wrong method etches concrete and forces water under render.',
  },
  {
    icon: Heart,
    title: 'Family business mentality',
    body: 'Sunny answers his own phone. The crew you meet is the crew that does the work. No subcontracting, ever.',
  },
];

export default function AboutPage() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 water-mesh" />
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-cyan-300/40 splash animate-wave-slow" />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-sky-300/40 splash animate-wave" />
        <WaterParticles density="medium" />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <div className="text-xs tracking-[0.3em] uppercase text-cyan-300 mb-6">
            ◆ The story
          </div>
          <h1 className="font-display text-6xl lg:text-9xl leading-[0.85] tracking-tightest text-cream-50 mb-10">
            One man,
            <br />
            <span className="italic gradient-text">a machine,</span>
            <br />
            and a standard.
          </h1>
          <p className="text-xl lg:text-2xl text-cream-100/80 leading-relaxed max-w-2xl mx-auto">
            Sunny started Trident in 2022 with a simple idea: do the work
            properly, photograph everything, and stand behind it.
          </p>
        </div>
      </section>

      <WaveDivider fromColor="#04222B" toColor="#FBF7EE" height={90} />

      {/* The story body — editorial */}
      <section className="py-24 lg:py-32 bg-cream-50 text-ink-900 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-cyan-300/20 splash" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-sky-300/20 splash" />

        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="text-xs tracking-[0.3em] uppercase text-teal-500 mb-4">
                ◆ The why
              </div>
              <h2 className="font-display text-5xl lg:text-6xl leading-[0.95] tracking-tightest mb-8">
                Most pressure
                <br />
                washing is{' '}
                <span className="italic text-teal-500">rushed.</span>
              </h2>
              <p className="text-ink-700/80 text-lg leading-relaxed">
                We see it on every job. Etched concrete. Forced water under
                render. Plants killed by overspray. Half-cleaned roofs that
                stripe within a year.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-ink-700/85 text-lg leading-relaxed pt-4">
              <p>
                Trident exists because Sunny got tired of fixing other people's
                shortcuts. He'd take a job, and the surface would already be
                damaged from the last "professional" wash.
              </p>
              <p>
                So he set up his own thing. Bought the right gear — twin-lance
                machines, surface cleaners, soft-wash injectors, pure-water
                poles. Got insured properly. Got trained on every method.
              </p>
              <p>
                Three years later, most of the work comes from referrals.
                That's the only metric that matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="py-24 lg:py-32 bg-cream-50 text-ink-900 relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] uppercase text-teal-500 mb-4">
              ◆ How we work
            </div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest">
              Four things we
              <br />
              <span className="italic text-teal-500">never compromise on.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group relative bg-white border border-ink-900/10 rounded-3xl p-8 hover:border-teal-500/40 transition-colors overflow-hidden"
                >
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-cyan-300/0 group-hover:bg-cyan-300/30 splash transition-colors duration-700" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-cream-50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-2xl mb-3 leading-tight">
                      {v.title}
                    </h3>
                    <p className="text-ink-700/70 text-sm leading-relaxed">
                      {v.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#FBF7EE" toColor="#04222B" height={90} flip />

      <Stats />

      <WaveDivider fromColor="#04222B" toColor="#67E8F9" height={90} />

      <CTA />
      <Footer />
    </main>
  );
}
