"use client";
import { ArrowRight, CheckCircle2, MonitorSmartphone, TimerReset } from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import { contactInfo } from '@/data/siteData';
import { useSEO } from '@/hooks/useSEO';

export default function MockTestPage() {
  useSEO('Mock Test | i2 Language', 'Premium mock test landing page with exam simulation, lead capture, and conversion CTAs.');

  return (
    <section className="py-16">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Mock Test Funnel"
          title="Free mock tests that qualify leads and build confidence."
          description="Positioned as a key conversion engine with realistic interface previews, score breakdowns, and advisor follow-up."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
            <div className="grid grid-cols-3 gap-3 border-b border-slate-100 bg-slate-50 p-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-3 rounded-full bg-slate-200" />
              ))}
            </div>
            <div className="p-6">
              <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                    Exam Preview
                  </span>
                  <MonitorSmartphone className="h-5 w-5 text-emerald-200" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.25rem] bg-white/5 p-4">
                    <div className="text-sm font-semibold text-emerald-200">Reading</div>
                    <div className="mt-2 h-28 rounded-2xl bg-white/10" />
                  </div>
                  <div className="rounded-[1.25rem] bg-white/5 p-4">
                    <div className="text-sm font-semibold text-emerald-200">Speaking</div>
                    <div className="mt-2 h-28 rounded-2xl bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-forest-900 to-forest-700 p-8 text-white shadow-2xl">
            <h3 className="font-heading text-3xl font-extrabold">Start a free diagnostic test</h3>
            <p className="mt-4 text-emerald-100">
              Capture intent early, score users fast, then route them to the most relevant counsellor or course.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: CheckCircle2, text: 'Exam-like interface for realistic confidence building' },
                { icon: TimerReset, text: 'Timed sections with instant analytics and score estimate' },
                { icon: ArrowRight, text: 'CTA flow into free demo, counselling, or premium batch' }
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 rounded-[1.5rem] bg-white/10 p-4">
                  <item.icon className="mt-0.5 h-5 w-5 text-emerald-200" />
                  <p className="text-sm text-white">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <button className="cta-primary rounded-2xl bg-white text-forest-900 hover:bg-emerald-50">Start Free Mock Test</button>
              <a href={contactInfo.phoneLink} className="cta-secondary rounded-2xl border-white/20 bg-white/10 text-white">Call Our Team</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
