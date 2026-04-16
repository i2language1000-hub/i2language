"use client";
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star
} from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import Link from 'next/link';
import SectionIntro from '@/components/SectionIntro';
import {
  blogs,
  contactInfo,
  courseCards,
  features,
  resources,
  scorecards,
  testimonials,
  trustStats
} from '@/data/siteData';
import { useSEO } from '@/hooks/useSEO';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

export default function HomePage() {
  useSEO(
    'i2 Language | Premium PTE, IELTS, NAATI & LanguageCert Coaching',
    'Premium coaching, mock tests, score strategies, and migration-focused prep for PTE, IELTS, NAATI, and LanguageCert.'
  );

  return (
    <div>
      <HeroSection />
      <TrustBar />
      <CoursesSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <ScorecardsSection />
      <BlogsSection />
      <FinalCta />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="overflow-hidden bg-hero">
      <div className="section-shell grid gap-16 pb-20 pt-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:pb-28 lg:pt-12">
        <motion.div {...fadeUp}>
          <div className="pill">
            <Sparkles className="h-4 w-4" />
            Trusted by 10,000+ students globally
          </div>
          <h1 className="mt-6 max-w-3xl font-heading text-5xl font-extrabold leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Crack <span className="gradient-text">PTE, IELTS & More</span> with expert coaching.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            A premium, conversion-first learning experience for ambitious students targeting high scores, faster visa movement, and better outcomes.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="cta-primary">
              Book Free Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/mock-test" className="cta-secondary">
              Start Free Mock Test
              <PlayCircle className="ml-2 h-5 w-5 text-forest-600" />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-200 pt-8">
            <div className="flex -space-x-3">
              {[11, 15, 22, 30].map((id) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/120?img=${id}`}
                  alt="Student"
                  className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-soft"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-700">4.9/5 from 2,500+ verified learners</p>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="relative">
          <div className="absolute -left-10 top-12 h-48 w-48 rounded-full bg-emerald-300/30 blur-3xl" />
          <div className="absolute -right-8 bottom-4 h-56 w-56 rounded-full bg-forest-300/20 blur-3xl" />
          <div className="relative mesh-card rounded-[2rem] border border-white/60 p-6 shadow-2xl sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                    Success Snapshot
                  </span>
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                </div>
                <h3 className="font-heading text-3xl font-extrabold">Score. Study. Settle.</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Mock tests, expert feedback, and a high-touch counselling experience designed to move learners from confusion to confidence.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                  alt="Students preparing for exam"
                  className="mt-6 h-64 w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <div className="glass-panel rounded-[1.75rem] p-6">
                <h3 className="font-heading text-2xl font-extrabold text-slate-900">Start your journey</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Get a personalized study plan and exam-fit consultation from our team.
                </p>
                <div className="mt-6">
                  <EnquiryForm source="hero_section" submitLabel="Get Free Consultation" showEmail={false} />
                </div>
                <p className="mt-4 text-center text-xs text-slate-400">Data-safe enquiry flow for premium counselling.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="bg-forest-950 py-8 text-white">
      <div className="section-shell grid grid-cols-2 gap-8 md:grid-cols-4">
        {trustStats.map((item) => (
          <div key={item.label} className="text-center">
            <div className="font-heading text-4xl font-extrabold text-white">{item.value}</div>
            <div className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Programs"
          title="Structured coaching built around target scores."
          description="Every program is engineered for outcomes, not just classroom time."
          center
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {courseCards.map((course) => {
            const Icon = course.icon;
            return (
              <motion.article
                key={course.title}
                {...fadeUp}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-50">
                  <Icon className="h-6 w-6 text-forest-700" />
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-slate-900">{course.title}</h3>
                <p className="mt-4 text-slate-600">{course.description}</p>
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="font-semibold text-forest-700">Explore Course</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 transition group-hover:bg-forest-700">
                    <ArrowRight className="h-4 w-4 text-forest-700 group-hover:text-white" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="bg-sand py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
        <motion.div {...fadeUp} className="relative">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] bg-gradient-to-br from-forest-600/15 to-emerald-400/20" />
          <img
            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1000&q=80"
            alt="Mentor helping student"
            className="relative h-[620px] w-full rounded-[2.5rem] object-cover shadow-2xl"
          />
          <div className="glass-panel absolute bottom-6 left-6 rounded-[1.75rem] px-5 py-4 shadow-soft">
            <div className="font-heading text-2xl font-extrabold text-forest-900">#1</div>
            <div className="text-sm font-semibold text-slate-600">Loved for premium mentoring</div>
          </div>
        </motion.div>

        <div>
          <SectionIntro
            eyebrow="Why i2 Language"
            title="A premium prep experience that converts effort into outcomes."
            description="We blend expert mentoring, exam realism, and CRO-driven trust signals so the platform performs like a serious education brand."
          />
          <div className="mt-10 space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div {...fadeUp} key={feature.title} className="flex gap-4 rounded-[1.75rem] bg-white p-5 shadow-soft">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-forest-600 to-forest-800 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-slate-900">{feature.title}</h3>
                    <p className="mt-2 text-slate-600">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-forest-950 py-24 text-white">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Testimonials"
          title="Real learners. Real score jumps."
          description="Positioned like premium proof blocks to support high-intent conversions."
          center
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article key={item.name} {...fadeUp} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="mb-5 flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-lg leading-8 text-slate-100">“{item.text}”</p>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <div className="font-heading text-xl font-extrabold text-white">{item.name}</div>
                  <div className="text-sm text-emerald-200">{item.role}</div>
                </div>
                <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-200">
                  {item.achievement}
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-200">
                <PlayCircle className="h-4 w-4" />
                Video testimonial {index + 1}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScorecardsSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Latest Results"
          title="Recent high achievers and scorecard proof."
          description="Use this block for screenshots, PDF previews, or CMS-managed result cards later."
          center
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {scorecards.map((item) => (
            <motion.div key={`${item.name}-${item.score}`} {...fadeUp} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex h-44 items-center justify-center rounded-[1.5rem] bg-gradient-to-b from-forest-50 to-slate-100">
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{item.exam} Result</div>
                  <div className="mt-3 font-heading text-4xl font-extrabold text-forest-800">{item.score}</div>
                </div>
              </div>
              <div className="mt-5">
                <div className="font-heading text-xl font-extrabold text-slate-900">{item.name}</div>
                <div className="mt-1 text-sm text-slate-500">Verified student outcome</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/results" className="cta-secondary">
            View Full Results Gallery
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-forest-900 to-emerald-700 p-8 text-white shadow-2xl md:p-12">
          <div className="grid gap-12 lg:grid-cols-[1fr,0.95fr] lg:items-center">
            <div>
              <span className="pill border-white/10 bg-white/10 text-white shadow-none">Free resources funnel</span>
              <h2 className="mt-5 font-heading text-4xl font-extrabold tracking-tight">Turn resource seekers into qualified leads.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-100">
                Offer prediction files, templates, practice kits, and mock access behind light lead capture for stronger conversion.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {resources.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
                    <h3 className="font-heading text-lg font-extrabold">{item.title}</h3>
                    <p className="mt-2 text-sm text-emerald-100">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-7 text-slate-900 shadow-soft">
              <h3 className="font-heading text-2xl font-extrabold">Unlock this month’s premium PTE pack</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">Designed as a lead magnet with premium positioning and immediate value.</p>
              <div className="mt-6">
                <EnquiryForm
                  source="resources_section"
                  submitLabel="Download Free Resource"
                  showEmail
                  showTargetExam={false}
                />
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                {['100+ repeat essay ideas', 'Speaking repeat database', 'High-score attempt checklist'].map((line) => (
                  <div key={line} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogsSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow="SEO Content"
            title="Blog content designed to rank and convert."
            description="Structured preview cards for topical authority and better organic acquisition."
          />
          <Link href="/blogs" className="cta-secondary w-fit">View all blogs</Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blogs.map((post) => (
            <motion.article key={post.title} {...fadeUp} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft">
              <span className="rounded-full bg-forest-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-forest-700">
                {post.category}
              </span>
              <h3 className="mt-5 font-heading text-2xl font-extrabold text-slate-900">{post.title}</h3>
              <p className="mt-4 text-slate-600">{post.excerpt}</p>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">{post.readTime}</span>
                <button className="font-semibold text-forest-700">Read article</button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <div className="rounded-[2.5rem] bg-slate-950 px-8 py-14 text-center text-white shadow-2xl sm:px-12">
          <Award className="mx-auto h-12 w-12 text-emerald-300" />
          <h2 className="mt-6 font-heading text-4xl font-extrabold sm:text-5xl">Start your journey today.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Join thousands of students who trusted i2 Language for score improvement, migration support, and premium mentoring.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="cta-primary">Enroll Now</Link>
            <a href={contactInfo.phoneLink} className="cta-secondary">Call Our Team</a>
          </div>
        </div>
      </div>
    </section>
  );
}
