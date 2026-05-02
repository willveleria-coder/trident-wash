import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FilthOMeter from '@/components/FilthOMeter';
import WaveDivider from '@/components/WaveDivider';
import WaterParticles from '@/components/WaterParticles';
import { SITE } from '@/lib/data';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
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
            ◆ Free quote
          </div>
          <h1 className="font-display text-6xl lg:text-9xl leading-[0.85] tracking-tightest text-cream-50">
            Talk to us.
            <br />
            <span className="italic gradient-text">We don't bite.</span>
          </h1>
        </div>
      </section>

      <FilthOMeter />

      <WaveDivider fromColor="#04222B" toColor="#FBF7EE" height={90} />

      {/* Contact details + form */}
      <section className="py-24 bg-cream-50 text-ink-900 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-cyan-300/25 splash" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-sky-300/25 splash" />

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl leading-tight mb-8">
              Or just reach out
              <br />
              <span className="italic text-teal-500">directly.</span>
            </h2>

            <div className="space-y-6">
              <ContactRow
                icon={<Phone className="w-5 h-5" />}
                label="Call or text"
                value={SITE.phone}
                href={`tel:${SITE.phoneRaw}`}
              />
              <ContactRow
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                value={SITE.email}
                href={`mailto:${SITE.email}`}
              />
              <ContactRow
                icon={<MapPin className="w-5 h-5" />}
                label="Service area"
                value={SITE.location}
              />
              <ContactRow
                icon={<Clock className="w-5 h-5" />}
                label="Hours"
                value={SITE.hours}
              />
            </div>
          </div>

          {/* Form */}
          <form className="bg-ink-900 text-cream-50 rounded-3xl p-8 space-y-5 shadow-[0_0_60px_-12px_rgba(34,211,238,0.4)]">
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 block mb-2">
                Your name
              </label>
              <input
                type="text"
                placeholder="Jane Smith"
                className="w-full bg-ink-700 border border-cyan-300/20 rounded-xl px-4 py-3 text-cream-50 focus:outline-none focus:border-cyan-300 transition-colors placeholder:text-cream-100/30"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 block mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="0400 000 000"
                  className="w-full bg-ink-700 border border-cyan-300/20 rounded-xl px-4 py-3 text-cream-50 focus:outline-none focus:border-cyan-300 transition-colors placeholder:text-cream-100/30"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 block mb-2">
                  Suburb
                </label>
                <input
                  type="text"
                  placeholder="Brighton"
                  className="w-full bg-ink-700 border border-cyan-300/20 rounded-xl px-4 py-3 text-cream-50 focus:outline-none focus:border-cyan-300 transition-colors placeholder:text-cream-100/30"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 block mb-2">
                What needs cleaning?
              </label>
              <textarea
                rows={5}
                placeholder="Driveway, house, roof… give us the details"
                className="w-full bg-ink-700 border border-cyan-300/20 rounded-xl px-4 py-3 text-cream-50 focus:outline-none focus:border-cyan-300 transition-colors placeholder:text-cream-100/30 resize-none"
              />
            </div>
            <button
              type="button"
              className="w-full px-6 py-4 bg-cyan-300 text-ink-900 font-medium rounded-full hover:bg-cyan-200 transition-colors shadow-[0_0_30px_-4px_rgba(103,232,249,0.6)]"
            >
              Send my quote request
            </button>
            <p className="text-xs text-cream-100/40 text-center">
              We reply within a few hours during business days.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 group">
      <div className="w-10 h-10 rounded-full bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-cream-50 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-ink-700/50 mb-1">
          {label}
        </div>
        <div className="font-display text-xl text-ink-900 group-hover:text-teal-500 transition-colors">
          {value}
        </div>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : <div>{content}</div>;
}
