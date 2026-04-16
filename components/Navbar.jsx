"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { contactInfo, navItems } from '../data/siteData';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mt-3 px-4 sm:px-6 lg:px-8">
        <div className="glass-panel flex w-full items-center justify-between rounded-[1.75rem] px-3 py-3 shadow-soft lg:min-h-[84px] lg:rounded-[2rem] lg:px-6">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-forest-600 to-forest-900 text-xl font-extrabold text-white">
              i2
            </div>
            <div className="min-w-0">
              <div className="truncate font-heading text-base font-extrabold text-forest-900 sm:text-lg">i2 Language</div>
              <div className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 sm:block">
                Premium Test Prep
              </div>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 px-8 lg:flex xl:gap-10">
            {navItems.map((item) => (
              <NavLinkItem key={item.to} to={item.to} badge={item.badge}>
                {item.label}
              </NavLinkItem>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <a
              href={contactInfo.phoneLink}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:border-forest-200 hover:text-forest-700"
            >
              <Phone className="h-4 w-4" />
              {contactInfo.phone}
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={contactInfo.phoneLink}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700"
              aria-label="Call i2 Language"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              className="inline-flex rounded-full border border-slate-200 bg-white/80 p-2 text-slate-700"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-5 shadow-soft lg:hidden"
            >
              <div className="space-y-4">
                <div className="rounded-[1.75rem] bg-gradient-to-br from-forest-950 to-forest-700 p-4 text-white">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-heading text-lg font-extrabold">Let&apos;s plan your score</div>
                      <div className="mt-1 text-sm text-emerald-100">Call us or explore the right test pathway.</div>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">
                      Live Support
                    </span>
                  </div>
                  <div className="mt-4">
                    <a href={contactInfo.phoneLink} className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-forest-900">
                      Call Now
                    </a>
                  </div>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    href={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3 font-semibold text-slate-700"
                  >
                    <span>{item.label}</span>
                    {item.badge ? <span className="rounded-full bg-forest-100 px-2 py-1 text-[10px] font-bold text-forest-700">{item.badge}</span> : null}
                  </Link>
                ))}

                <a
                  href={contactInfo.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-4 text-left"
                >
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-forest-700" />
                  <div>
                    <div className="text-sm font-bold text-slate-900">Visit Our Centre</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{contactInfo.address}</div>
                  </div>
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

function NavLinkItem({ to, children, badge }) {
  const pathname = usePathname();
  const isActive = pathname === to;
  return (
    <Link
      href={to}
      className={`inline-flex items-center gap-2 font-semibold transition ${
        isActive ? 'text-forest-800' : 'text-slate-700 hover:text-forest-700'
      }`}
    >
      {children}
      {badge ? <span className="rounded-full bg-forest-100 px-2 py-1 text-[10px] font-bold text-forest-700">{badge}</span> : null}
    </Link>
  );
}
