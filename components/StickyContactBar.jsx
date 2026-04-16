"use client";
import { MessageCircleMore, Phone } from 'lucide-react';
import { contactInfo } from '../data/siteData';

export default function StickyContactBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-soft backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-lg gap-3">
        <a href={contactInfo.phoneLink} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700">
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a href={contactInfo.whatsappLink} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-forest-700 px-4 py-3 font-semibold text-white">
          <MessageCircleMore className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
