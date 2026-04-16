"use client";
import { BadgeCheck, ShieldCheck } from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import { contactInfo, defaultVouchers } from '@/data/siteData';
import { useRemoteContent } from '@/hooks/useRemoteContent';
import { useSEO } from '@/hooks/useSEO';

export default function VoucherPage() {
  useSEO('Voucher | i2 Language', 'Voucher page for PTE and LanguageCert purchase blocks with premium CTAs.');
  const { items: vouchers } = useRemoteContent('vouchers', defaultVouchers);

  return (
    <section className="py-16">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Voucher"
          title="Voucher offers designed for clarity and conversion."
          description="Sell PTE and LanguageCert vouchers with a premium, trust-heavy purchase experience."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {vouchers.map((voucher, index) => (
            <article
              key={voucher.id || voucher.title}
              className={`rounded-[2rem] p-8 shadow-2xl ${
                index % 2 === 0
                  ? 'bg-gradient-to-br from-forest-900 via-forest-800 to-emerald-700 text-white'
                  : 'border border-slate-200 bg-white text-slate-900 shadow-soft'
              }`}
            >
              {voucher.image ? (
                <img
                  src={voucher.image}
                  alt={voucher.title}
                  className={`mb-6 h-56 w-full rounded-[1.5rem] object-cover ${index % 2 === 0 ? 'border border-white/10' : ''}`}
                />
              ) : null}
              <span className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] ${
                index % 2 === 0 ? 'bg-white/10 text-emerald-200' : 'bg-forest-50 text-forest-700'
              }`}>
                Featured Voucher
              </span>
              <h3 className="mt-5 font-heading text-4xl font-extrabold">{voucher.title}</h3>
              <div className={`mt-4 text-4xl font-extrabold ${index % 2 === 0 ? 'text-white' : 'text-forest-800'}`}>
                {voucher.price}
              </div>
              <p className={`mt-4 text-lg ${index % 2 === 0 ? 'text-emerald-100' : 'text-slate-600'}`}>
                {voucher.description}
              </p>
              <div className={`mt-8 space-y-4 ${index % 2 === 0 ? 'text-white' : 'text-slate-600'}`}>
                {[
                  'Booking support and confirmation guidance',
                  'Team assistance for exam questions and next steps',
                  'Optional prep and WhatsApp follow-up available'
                ].map((item) => (
                  <div key={item} className={`flex items-start gap-3 rounded-[1.5rem] p-4 ${
                    index % 2 === 0 ? 'bg-white/10' : 'bg-slate-50'
                  }`}>
                    <BadgeCheck className={`mt-0.5 h-5 w-5 ${index % 2 === 0 ? 'text-emerald-200' : 'text-forest-700'}`} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <a href={contactInfo.phoneLink} className="cta-primary rounded-2xl text-center">
                  {voucher.buttonLabel || 'Purchase Voucher'}
                </a>
                <a href={contactInfo.phoneLink} className={`rounded-2xl border px-5 py-3 text-center font-semibold ${
                  index % 2 === 0 ? 'border-white/20 text-white' : 'border-slate-200 text-slate-700'
                }`}>
                  <ShieldCheck className="mr-2 inline h-4 w-4" />
                  Talk to Support
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
