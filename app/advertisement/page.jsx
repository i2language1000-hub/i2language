"use client";
import { Megaphone, MonitorPlay, LayoutTemplate } from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import { defaultAdvertisements } from '@/data/siteData';
import { useRemoteContent } from '@/hooks/useRemoteContent';
import { useSEO } from '@/hooks/useSEO';

export default function AdvertisementPage() {
  useSEO('Advertisement | i2 Language', 'Advertisement placements and campaign design page for i2 Language.');
  const { items: advertisements } = useRemoteContent('advertisements', defaultAdvertisements);

  return (
    <section className="py-16">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Advertisement"
          title="Campaign spaces designed to promote offers, vouchers, and lead magnets."
          description="Use this page to present ad placements, featured campaigns, and marketing creatives that can be managed from the admin panel."
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {advertisements.map((advertisement, index) => (
            <article
              key={advertisement.id || advertisement.title}
              className={`rounded-[2rem] p-8 shadow-soft ${
                index === 0
                  ? 'bg-gradient-to-br from-forest-900 via-forest-800 to-emerald-700 text-white shadow-2xl'
                  : 'border border-slate-200 bg-white'
              }`}
            >
              {advertisement.image ? (
                <img
                  src={advertisement.image}
                  alt={advertisement.title}
                  className={`mb-6 h-56 w-full rounded-[1.5rem] object-cover ${index === 0 ? 'border border-white/10' : ''}`}
                />
              ) : null}
              <div className={`inline-flex rounded-2xl p-3 ${index === 0 ? 'bg-white/10' : 'bg-forest-50'}`}>
                {index === 0 ? (
                  <Megaphone className={`h-6 w-6 ${index === 0 ? 'text-emerald-200' : 'text-forest-700'}`} />
                ) : index === 1 ? (
                  <MonitorPlay className="h-6 w-6 text-forest-700" />
                ) : (
                  <LayoutTemplate className="h-6 w-6 text-forest-700" />
                )}
              </div>
              <div className={`mt-5 text-sm font-bold uppercase tracking-[0.18em] ${index === 0 ? 'text-emerald-200' : 'text-slate-500'}`}>
                {advertisement.placement}
              </div>
              <h3 className={`mt-3 font-heading text-3xl font-extrabold ${index === 0 ? 'text-white' : 'text-slate-900'}`}>
                {advertisement.title}
              </h3>
              <p className={`mt-4 ${index === 0 ? 'text-emerald-100' : 'text-slate-600'}`}>
                {advertisement.description}
              </p>
              <button className={`mt-8 rounded-full px-5 py-3 font-semibold ${
                index === 0 ? 'bg-white text-forest-900' : 'bg-slate-950 text-white'
              }`}>
                {advertisement.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
