'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Sparkles,
  Star,
  ArrowRight,
  Phone,
  X,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import HazardTape from './HazardTape';
import { SITE } from '@/lib/data';
import { SUBURB_JOBS, SuburbJob } from '@/lib/suburb-jobs';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function SuburbMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selected, setSelected] = useState<SuburbJob | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    if (!MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
     center: [145.10, -37.85],
zoom: 9.8,
      attributionControl: false,
      cooperativeGestures: true,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

    // Fix sizing: force resize after the container has its real dimensions
    const resizeMap = () => map.resize();
    const ro = new ResizeObserver(resizeMap);
    ro.observe(mapContainer.current);

    // Also resize once on load and a tick after, to catch any layout shifts
    map.on('load', () => {
      map.resize();
      setTimeout(() => map.resize(), 100);
      setTimeout(() => map.resize(), 500);
      // ── Miami-style overlay: tint the map with cyan ──
      map.setPaintProperty('water', 'fill-color', '#A5F3FC');
      try {
        map.setPaintProperty('land', 'background-color', '#FFFDF5');
      } catch (e) {
        // some styles don't expose 'land' the same way; safe to ignore
      }

      // Add custom markers
      SUBURB_JOBS.forEach((suburb) => {
        const el = document.createElement('button');
        el.className = 'suburb-pin';
        el.setAttribute('aria-label', suburb.name);
        el.innerHTML = `
          <span class="suburb-pin-dot"></span>
          <span class="suburb-pin-ping"></span>
          <span class="suburb-pin-label">${suburb.name}</span>
        `;
        el.addEventListener('click', () => setSelected(suburb));
        el.addEventListener('mouseenter', () => setHovered(suburb.name));
        el.addEventListener('mouseleave', () => setHovered(null));

        new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat(suburb.coords)
          .addTo(map);
      });
    });

    mapRef.current = map;

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section className="relative py-24 lg:py-32 bg-white text-slate-900 overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px]" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[80px]" />

      {/* Watermark */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
        <div className="font-display text-[20vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
          MELBOURNE
        </div>
      </div>

      {/* Decorative stamps */}
      <div className="absolute top-32 right-4 lg:right-12 rotate-12 hidden md:block pointer-events-none">
        <div className="bg-[#00B8D9] text-white border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#0F172A]">
          Click any pin
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 lg:mb-16">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A]"
            >
              <MapPin className="w-3 h-3" />
              Live coverage map
            </motion.div>

            <h2 className="font-display text-5xl lg:text-7xl leading-[0.86] tracking-tightest text-slate-900">
              From the
              <br />
              CBD to the
              <br />
              <span className="italic relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)',
                  }}
                >
                  peninsula.
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 400 12"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 8 Q 100 2, 200 6 T 398 5"
                    stroke="#FFD60A"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            <p className="text-slate-700 text-base lg:text-lg leading-relaxed font-medium mb-6 border-l-4 border-[#00B8D9] pl-5">
              <span className="font-bold">Click any pin</span> to see real jobs we've done in that suburb — last service, average quote, and a photo.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-400 border-2 border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0_0_#0F172A] -rotate-1">
                <div className="font-display text-3xl lg:text-4xl leading-none tracking-tightest text-slate-900 tabular">
                  {SUBURB_JOBS.length}+
                </div>
                <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-slate-900/80 mt-2">
                  Suburbs · Live data
                </div>
              </div>
              <div className="bg-[#00B8D9] border-2 border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0_0_#FFD60A] rotate-1">
                <div className="font-display text-3xl lg:text-4xl leading-none tracking-tightest text-white tabular">
                  50km
                </div>
                <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/85 mt-2">
                  Service radius
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT — suburb chips */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-slate-900 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A] p-5 lg:p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] tracking-[0.3em] uppercase text-yellow-400 font-bold">
                  ◆ All suburbs · A–Z
                </div>
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              </div>

              <div className="grid grid-cols-2 gap-1.5 max-h-[420px] overflow-y-auto no-scrollbar pr-1">
                {SUBURB_JOBS.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelected(s)}
                    onMouseEnter={() => setHovered(s.name)}
                    onMouseLeave={() => setHovered(null)}
                    className={`text-left px-2.5 py-2 rounded-lg border-2 transition-all text-xs lg:text-sm font-bold ${
                      hovered === s.name || selected?.name === s.name
                        ? 'bg-yellow-400 border-yellow-400 text-slate-900'
                        : 'bg-transparent border-transparent text-white/70 hover:text-white hover:border-yellow-400/40'
                    }`}
                  >
                    · {s.name}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/60 font-bold">
                  Not listed?
                </span>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="text-yellow-400 font-bold text-xs tracking-wide hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3 h-3" />
                  Call us
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — the MAPBOX map */}
          <div className="lg:col-span-8 order-1 lg:order-2 relative">
            {/* Yellow stamp behind */}
            <div
              aria-hidden
              className="absolute -top-5 -left-5 w-20 h-20 bg-yellow-400 rounded-full border-4 border-slate-900 shadow-xl z-0 -rotate-12 hidden lg:flex items-center justify-center"
            >
              <div className="text-center leading-none">
                <div className="text-[8px] tracking-[0.2em] font-bold uppercase text-slate-900/70">Live</div>
                <div className="font-display text-base mt-1">★</div>
              </div>
            </div>

            <div className="relative z-10 rounded-3xl border-2 border-slate-900 shadow-[10px_10px_0_0_#FFD60A] overflow-hidden bg-white">
              <HazardTape className="w-full h-2" />

              <div className="relative aspect-[4/5] lg:aspect-[5/4]">
                {/* Mapbox container */}
                <div ref={mapContainer} className="absolute inset-0" />

                {!MAPBOX_TOKEN && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 p-8">
                    <div className="max-w-md text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                      <div className="font-display text-xl mb-2 text-slate-900">
                        Add your Mapbox token
                      </div>
                      <p className="text-sm text-slate-600">
                        Create <code className="bg-slate-200 px-2 py-1 rounded text-xs">.env.local</code> in your project root and add <code className="bg-slate-200 px-2 py-1 rounded text-xs">NEXT_PUBLIC_MAPBOX_TOKEN=pk....</code>
                      </p>
                    </div>
                  </div>
                )}

                {/* Counter sticker (overlaid on map) */}
                <div className="absolute bottom-5 left-5 bg-slate-900 text-white px-5 py-3 rounded-2xl flex items-center gap-3 border-2 border-slate-900 shadow-[4px_4px_0_0_#FFD60A] z-10 pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-slate-900 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-slate-900" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="font-display text-2xl leading-none tabular text-yellow-400">
                      {SUBURB_JOBS.length}+
                    </div>
                    <div className="text-[9px] tracking-[0.25em] uppercase text-white/70 font-bold mt-0.5">
                      Suburbs covered
                    </div>
                  </div>
                </div>

                {/* Legend (top-left overlay) */}
                <div className="absolute top-5 left-5 bg-white border-2 border-slate-900 px-3 py-2 rounded-xl shadow-[3px_3px_0_0_#0F172A] flex items-center gap-3 text-[10px] font-bold tracking-wide uppercase z-10 pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-slate-900" />
                    Click a pin
                  </div>
                </div>

                {/* Selected job INFO CARD */}
                <AnimatePresence>
                  {selected && (
                    <motion.div
                      key={selected.name}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-5 right-5 left-5 md:left-auto md:bottom-5 md:right-5 md:w-[320px] bg-white border-2 border-slate-900 rounded-2xl shadow-[6px_6px_0_0_#0F172A] overflow-hidden z-20"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={selected.photo}
                          alt={selected.name}
                          fill
                          sizes="320px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                        <button
                          onClick={() => setSelected(null)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center text-slate-900 hover:bg-yellow-400 transition-colors"
                          aria-label="Close"
                        >
                          <X className="w-3.5 h-3.5" strokeWidth={3} />
                        </button>
                        <div className="absolute bottom-2 left-3 text-white">
                          <div className="font-display text-2xl leading-none">{selected.name}</div>
                          <div className="text-[9px] tracking-[0.3em] uppercase text-yellow-300 font-bold mt-1 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {selected.date}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-[9px] tracking-[0.25em] uppercase font-bold text-slate-500">
                              Last service
                            </div>
                            <div className="font-bold text-sm text-slate-900 mt-0.5">
                              {selected.lastJob}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[9px] tracking-[0.25em] uppercase font-bold text-slate-500">
                              Avg quote
                            </div>
                            <div className="font-display text-xl text-[#00B8D9] tabular leading-none mt-0.5">
                              {selected.avgQuote}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                          <TrendingUp className="w-3 h-3 text-[#00B8D9]" />
                          <span className="font-bold">{selected.jobsDone} jobs</span> completed in this area
                        </div>

                        <Link
                          href="/contact"
                          className="group flex items-center justify-between px-4 py-2.5 bg-yellow-400 text-slate-900 font-bold rounded-xl border-2 border-slate-900 shadow-[3px_3px_0_0_#0F172A] hover:shadow-[0_0_0_0_#0F172A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-xs"
                        >
                          <span>Quote for {selected.name}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <HazardTape className="w-full h-2" />
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-12 lg:mt-16 grid lg:grid-cols-12 gap-6 items-center bg-slate-900 rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0_0_#00B8D9] p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0">
            <HazardTape className="w-full h-1.5" />
          </div>
          <div className="absolute bottom-0 inset-x-0">
            <HazardTape className="w-full h-1.5" />
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-yellow-400 text-[10px] tracking-[0.3em] uppercase font-bold">
                Outside the map?
              </span>
            </div>
            <div className="font-display text-3xl lg:text-4xl text-white leading-tight tracking-tight">
              We travel for the right job.{' '}
              <span className="italic text-yellow-400">Just ask.</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="group inline-flex items-center justify-between gap-3 px-5 py-3 bg-yellow-400 text-slate-900 font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] hover:shadow-[0_0_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {SITE.phone}
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-between gap-3 px-5 py-3 bg-transparent text-white font-bold rounded-2xl border-2 border-white hover:bg-white hover:text-slate-900 transition-colors"
            >
              <span>Send a postcode</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Custom pin styles */}
      <style jsx global>{`
        .suburb-pin {
          position: relative;
          width: 24px;
          height: 24px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .suburb-pin-dot {
          position: relative;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #FFD60A;
          border: 2.5px solid #0F172A;
          box-shadow: 1px 1px 0 0 #0F172A;
          transition: all 0.2s;
          z-index: 2;
        }
        .suburb-pin:hover .suburb-pin-dot {
          background: #00B8D9;
          transform: scale(1.4);
          box-shadow: 0 0 0 4px rgba(0, 184, 217, 0.25), 2px 2px 0 0 #0F172A;
        }
        .suburb-pin-ping {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #00B8D9;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .suburb-pin:hover .suburb-pin-ping {
          opacity: 0.4;
          animation: pin-ping 1.2s ease-out infinite;
        }
        @keyframes pin-ping {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .suburb-pin-label {
          position: absolute;
          left: 50%;
          top: -28px;
          transform: translateX(-50%);
          white-space: nowrap;
          background: #0F172A;
          color: #FFD60A;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 6px;
          border-radius: 4px;
          border: 1.5px solid #FFD60A;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }
        .suburb-pin:hover .suburb-pin-label {
          opacity: 1;
        }
        .mapboxgl-ctrl-bottom-right .mapboxgl-ctrl {
          margin: 0 8px 8px 0 !important;
        }
        .mapboxgl-ctrl-attrib {
          font-size: 10px !important;
        }
      `}</style>
    </section>
  );
}