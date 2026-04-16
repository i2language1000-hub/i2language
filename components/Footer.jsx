"use client";
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { contactInfo } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 pb-10 pt-16 text-slate-300">
      <div className="section-shell grid gap-12 lg:grid-cols-[1.2fr,0.8fr,0.8fr,1fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-500 font-heading text-xl font-extrabold text-slate-950">
              i2
            </div>
            <div className="font-heading text-2xl font-extrabold text-white">i2 Language</div>
          </div>
          <p className="max-w-md text-slate-400">
            A premium EdTech platform for ambitious students preparing for English proficiency and migration-focused exams.
          </p>
          <div className="mt-6 flex gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                <Globe className="h-4 w-4" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-white">Quick Links</h3>
          <div className="mt-5 space-y-3 text-sm">
            <Link className="block hover:text-white" href="/">Home</Link>
            <Link className="block hover:text-white" href="/results">Results</Link>
            <Link className="block hover:text-white" href="/voucher">Voucher</Link>
            <Link className="block hover:text-white" href="/blogs">Blogs</Link>
            <Link className="block hover:text-white" href="/advertisement">Advertisement</Link>
            <Link className="block hover:text-white" href="/admin">Admin Panel</Link>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-white">Courses</h3>
          <div className="mt-5 space-y-3 text-sm">
            <p>PTE Academic</p>
            <p>IELTS Coaching</p>
            <p>NAATI CCL</p>
            <p>LanguageCert</p>
            <p>OET / CELPIP</p>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-white">Contact</h3>
          <div className="mt-5 space-y-4 text-sm text-slate-400">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-forest-400" />
              <a href={contactInfo.mapLink} target="_blank" rel="noreferrer" className="hover:text-white">
                {contactInfo.address}
              </a>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-forest-400" />
              <a href={contactInfo.phoneLink} className="hover:text-white">{contactInfo.phone}</a>
            </div>
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-forest-400" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-white">{contactInfo.email}</a>
            </div>
          </div>
        </div>
      </div>
      <div className="section-shell mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} i2 Language. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
