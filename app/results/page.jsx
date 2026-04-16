import { Download, ImagePlus } from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Student Results | i2 Language',
  description: 'Student result gallery with scorecard images for PTE, IELTS, NAATI, and LanguageCert learners.'
};

export default function ResultsPage() {
  const directoryPath = path.join(process.cwd(), 'public', 'results');
  let resultImages = [];
  
  try {
    if (fs.existsSync(directoryPath)) {
      const files = fs.readdirSync(directoryPath);
      resultImages = files
        .filter((file) => /\.(png|jpg|jpeg|webp|svg)$/i.test(file))
        .sort((a, b) => a.localeCompare(b))
        .map((file) => {
          const fileName = file.replace(/\.[^/.]+$/, '');
          const title = fileName
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());

          return {
            source: `/results/${file}`,
            title
          };
        });
    }
  } catch (error) {
    console.error('Error reading results directory:', error);
  }

  return (
    <section className="py-16">
      <div className="section-shell">
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {resultImages.map((result) => (
            <article key={result.title} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
              <img src={result.source} alt={`${result.title} result`} className="h-[420px] w-full object-cover" />
            </article>
          ))}
          {resultImages.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              <ImagePlus className="mx-auto mb-4 h-8 w-8 text-slate-400" />
              No results found. Add images to public/results/.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
