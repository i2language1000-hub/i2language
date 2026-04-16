"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import EnquiryForm from './EnquiryForm';

export default function ConsultancyPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = window.localStorage.getItem('i2-consultancy-popup-seen');
    if (!seen) {
      const timer = window.setTimeout(() => {
        setOpen(true);
        window.localStorage.setItem('i2-consultancy-popup-seen', 'true');
      }, 1800);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }} className="relative grid w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-[0.9fr,1.1fr]">
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-slate-600">
              <X className="h-5 w-5" />
            </button>

            <div className="relative bg-gradient-to-br from-forest-950 via-forest-900 to-forest-700 p-8 text-white md:p-10">
              <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="relative">
                <div className="mb-5 inline-flex rounded-2xl bg-white/10 p-3">
                  <ShieldCheck className="h-10 w-10 text-emerald-300" />
                </div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-emerald-200">Limited Free Offer</p>
                <h3 className="font-heading text-3xl font-extrabold leading-tight">Claim your free 1-on-1 consultancy before you leave.</h3>
                <p className="mt-4 max-w-sm text-emerald-100">
                  Get a custom prep roadmap, score target advice, and the best exam option for your migration or study goal.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <h4 className="font-heading text-2xl font-extrabold text-slate-900">Book Free Consultancy</h4>
              <p className="mt-2 text-sm text-slate-500">Slots are limited this week for new students.</p>
              <div className="mt-8">
                <EnquiryForm source="consultancy_popup" submitLabel="Claim Free Session" showEmail={false} onSuccess={() => setOpen(false)} />
              </div>
              <p className="mt-4 text-center text-xs text-slate-400">By continuing, you agree to our privacy and communication terms.</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
