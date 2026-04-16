"use client";
import { motion } from 'framer-motion';
import SectionIntro from '@/components/SectionIntro';
import { blogs } from '@/data/siteData';
import { useRemoteContent } from '@/hooks/useRemoteContent';
import { useSEO } from '@/hooks/useSEO';

export default function BlogsPage() {
  useSEO('Blogs | i2 Language', 'SEO-friendly blog archive for PTE, IELTS, NAATI, and migration test preparation.');
  const { items } = useRemoteContent('blogs', blogs);

  return (
    <section className="py-16">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Blog Library"
          title="Content clusters for rankings, trust, and lead generation."
          description="Designed as a scalable editorial grid with category filters, read-time previews, and room for CMS integration."
        />
        <div className="mt-12 flex flex-wrap gap-3">
          {['All', 'PTE', 'IELTS', 'NAATI', 'Migration'].map((filter) => (
            <button key={filter} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
              {filter}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((post, index) => (
            <motion.article
              key={`${post.title}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft"
            >
              <span className="rounded-full bg-forest-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-forest-700">
                {post.category}
              </span>
              <h3 className="mt-5 font-heading text-2xl font-extrabold text-slate-900">{post.title}</h3>
              <p className="mt-4 text-slate-600">{post.excerpt}</p>
              <div className="mt-6 text-sm font-semibold text-slate-500">{post.readTime}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
