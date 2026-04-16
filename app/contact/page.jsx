"use client";
import { MapPin, MessageCircleMore, Phone } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import SectionIntro from '@/components/SectionIntro';
import { contactInfo } from '@/data/siteData';
import { useSEO } from '@/hooks/useSEO';

export default function ContactPage() {
  useSEO('Contact Us | i2 Language', 'Contact page with form, map placeholder, call button, and WhatsApp conversion actions.');

  return (
    <section className="py-16">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Contact"
          title="Talk to the team that can map your best exam path."
          description="Built for fast lead handling with call, WhatsApp, map, and a premium enquiry form."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
            <div className="space-y-5">
              <div className="flex gap-4 rounded-[1.5rem] bg-white/5 p-5">
                <Phone className="h-6 w-6 text-emerald-300" />
                <div>
                  <div className="font-heading text-xl font-extrabold">Call Us</div>
                  <a href={contactInfo.phoneLink} className="text-slate-300 hover:text-white">{contactInfo.phone}</a>
                </div>
              </div>
              <div className="flex gap-4 rounded-[1.5rem] bg-white/5 p-5">
                <MessageCircleMore className="h-6 w-6 text-emerald-300" />
                <div>
                  <div className="font-heading text-xl font-extrabold">WhatsApp</div>
                  <a href={contactInfo.whatsappLink} className="text-slate-300 hover:text-white">Chat for quick counselling and batch details</a>
                </div>
              </div>
              <div className="flex gap-4 rounded-[1.5rem] bg-white/5 p-5">
                <MapPin className="h-6 w-6 text-emerald-300" />
                <div>
                  <div className="font-heading text-xl font-extrabold">Visit Centre</div>
                  <a href={contactInfo.mapLink} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">
                    {contactInfo.address}
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-[1.75rem] bg-gradient-to-br from-white/10 to-white/5 p-5">
              <a
                href={contactInfo.mapLink}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-72 flex-col items-start justify-end rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(74,222,128,0.28),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,0.1),_rgba(255,255,255,0.03))] p-6 text-left"
              >
                <div className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">
                  Map Coordinates
                </div>
                <div className="mt-4 font-heading text-2xl font-extrabold text-white">
                  {contactInfo.coordinates.latitude}, {contactInfo.coordinates.longitude}
                </div>
                <div className="mt-2 max-w-sm text-sm leading-6 text-slate-300">
                  Tap to open the centre location in Google Maps.
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="font-heading text-3xl font-extrabold text-slate-900">Send us your goal</h3>
            <p className="mt-3 text-slate-600">
              The lead form is designed for CRM routing, counsellor assignment, and campaign tracking.
            </p>
            <div className="mt-8">
              <EnquiryForm
                source="contact_page"
                submitLabel="Submit Enquiry"
                showEmail
                showTargetExam
                showBatch
                showMessage
                layout="grid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
