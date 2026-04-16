import {
  Award,
  BookOpen,
  Globe,
  GraduationCap,
  Languages,
  ShieldCheck,
  Sparkles,
  Target
} from 'lucide-react';

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Results', to: '/results' },
  { label: 'Voucher', to: '/voucher' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Advertisement', to: '/advertisement' },
  { label: 'Contact Us', to: '/contact' }
];

export const megaMenu = {
  PTE: [
    'PTE Core',
    'PTE Academic',
    'Online PTE Coaching',
    'PTE Mock Test',
    'PTE Coaching Classes',
    'PTE Classes Online',
    'PTE Academic Online'
  ],
  NAATI: [
    'NAATI Coaching',
    'Online NAATI Coaching',
    'Free NAATI Mock Test',
    'Download NAATI Material'
  ],
  IELTS: [
    'IELTS Coaching',
    'Online IELTS Coaching',
    'IELTS Preparation',
    'IELTS Scorecard'
  ],
  LanguageCert: ['LanguageCert Academic', 'LanguageCert Pricing', 'LanguageCert Voucher'],
  Others: ['GRE (Mock Test)', 'GMAT', 'ACT', 'CELPIP', 'OET', 'Australian Citizenship Test']
};

export const courseCards = [
  {
    title: 'PTE Academic & Core',
    description: 'AI-scored mock tests, speaking templates, and a rapid score jump framework built for Pearson-style performance.',
    icon: Globe
  },
  {
    title: 'IELTS Mastery',
    description: 'Live strategy sessions, writing correction, and band-focused study plans for academic and general modules.',
    icon: BookOpen
  },
  {
    title: 'NAATI CCL',
    description: 'Dialogue drills, vocabulary banks, and roleplay coaching to help you clear the exam with confidence.',
    icon: Languages
  },
  {
    title: 'LanguageCert',
    description: 'Fast, migration-friendly prep with voucher support, speaking practice, and documentation guidance.',
    icon: ShieldCheck
  }
];

export const trustStats = [
  { value: '10,000+', label: 'Students Coached' },
  { value: '98%', label: 'Success Rate' },
  { value: '4.9/5', label: 'Learner Rating' },
  { value: '15+', label: 'Countries Served' }
];

export const features = [
  {
    title: 'Expert Trainers',
    description: 'Certified mentors with hands-on experience in high-score test preparation and immigration pathways.',
    icon: GraduationCap
  },
  {
    title: 'Real Exam Simulation',
    description: 'Practice inside an interface designed to feel like the real thing so test-day anxiety stays low.',
    icon: Target
  },
  {
    title: 'Personalized Feedback',
    description: 'Every attempt turns into a score report with actionable feedback, weakness mapping, and trainer notes.',
    icon: Sparkles
  },
  {
    title: 'High Score Guarantee',
    description: 'Structured templates, proven frameworks, and milestone-based coaching for ambitious target scores.',
    icon: Award
  }
];

export const testimonials = [
  {
    name: 'Priya Sharma',
    achievement: 'PTE Overall 84',
    text: 'The mock test quality and speaking feedback were exactly what I needed. I went from 67 to 84 in under a month.',
    role: 'Software Professional'
  },
  {
    name: 'Rahul Verma',
    achievement: 'IELTS Band 8.5',
    text: 'Every correction was precise, and the writing sessions felt premium. The team made the whole preparation process feel manageable.',
    role: 'Master’s Applicant'
  },
  {
    name: 'Anita Patel',
    achievement: 'NAATI CCL Cleared',
    text: 'Their vocabulary sheets and dialogue practice were incredibly practical. I cleared in my first attempt.',
    role: 'Migration Candidate'
  }
];

export const blogs = [
  {
    title: 'How to Reach 79+ in PTE Without Wasting Months',
    category: 'PTE Strategy',
    excerpt: 'A focused roadmap for speaking, writing, and reading improvement using mock data and correction loops.',
    readTime: '6 min read'
  },
  {
    title: 'IELTS Writing Task 2 Structure That Still Works in 2026',
    category: 'IELTS Writing',
    excerpt: 'A premium writing framework that balances coherence, idea depth, and lexical variety.',
    readTime: '8 min read'
  },
  {
    title: 'LanguageCert for Migration: When It Makes Sense',
    category: 'Migration Exams',
    excerpt: 'A practical breakdown of who benefits most from LanguageCert and how to prepare faster.',
    readTime: '5 min read'
  }
];

export const resources = [
  {
    title: 'Monthly PTE Prediction File',
    description: 'Updated repeat questions, expected essay themes, and speaking focus areas.',
    cta: 'Unlock Download'
  },
  {
    title: 'NAATI Vocabulary Pack',
    description: 'High-frequency migration, healthcare, and daily-life terminology practice set.',
    cta: 'Get Resource'
  },
  {
    title: 'IELTS Writing Checklist',
    description: 'A submission-ready rubric for structure, coherence, grammar, and task response.',
    cta: 'Download Guide'
  }
];

export const defaultVouchers = [
  {
    id: 'pte-voucher',
    title: 'PTE Voucher',
    price: '₹14,999',
    description: 'Fast booking support, guided exam advice, and quick coordination for your PTE slot.',
    buttonLabel: 'Buy PTE Voucher'
  },
  {
    id: 'languagecert-voucher',
    title: 'LanguageCert Voucher',
    price: '₹14,999',
    description: 'Migration-friendly LanguageCert booking with support, clarification, and prep guidance.',
    buttonLabel: 'Buy LanguageCert Voucher'
  }
];

export const defaultAdvertisements = [
  {
    id: 'hero-placement',
    title: 'Homepage Hero Banner',
    placement: 'Above the fold',
    description: 'A premium banner placement for seasonal campaigns, voucher pushes, and lead-generation offers.',
    cta: 'Book Placement'
  },
  {
    id: 'results-strip',
    title: 'Results Page Spotlight',
    placement: 'Between result cards',
    description: 'Promote new batches, free demos, or mock tests right where trust and proof are highest.',
    cta: 'Promote Here'
  },
  {
    id: 'blog-feature',
    title: 'Blog Feature Card',
    placement: 'Inside blog archive',
    description: 'Use educational advertorials, featured programs, or limited-time scholarship campaigns.',
    cta: 'Launch Campaign'
  }
];

export const faqs = {
  'course fees': 'Our flagship prep programs usually start from premium-but-accessible packages, with different pricing for PTE, IELTS, NAATI, and combo plans. Share your target exam and we can route you to the right advisor.',
  'batch timings': 'We run weekday morning, weekday evening, and weekend batches, plus private 1-on-1 plans for working professionals.',
  'pte vs ielts': 'PTE is often preferred for computer-based test takers who want faster results, while IELTS suits learners comfortable with a more traditional structure. Your target use case decides the better fit.',
  'book free demo': 'You can book a free demo by filling any lead form or using the call and WhatsApp CTAs. A counsellor can usually confirm your slot quickly.',
  fees: 'We offer flexible package options, mock-test-only plans, and guided programs. A counsellor can recommend the right plan after a quick assessment.',
  default: 'I can help with courses, fees, batches, mock tests, LanguageCert vouchers, or free resources. Try one of the quick actions below.'
};

export const scorecards = [
  { name: 'Aarav', exam: 'PTE', score: '90' },
  { name: 'Khushi', exam: 'IELTS', score: '8.5' },
  { name: 'Deepak', exam: 'PTE', score: '88' },
  { name: 'Megha', exam: 'NAATI', score: 'Cleared' }
];

export const contactInfo = {
  phone: '+91 94080 77866',
  phoneLink: 'tel:+919408077866',
  whatsappLink: 'https://wa.me/919408077866',
  email: 'i2language20@gmail.com',
  address:
    '1st Floor, Yashvi Complex, near ST bus Stop, near Paramount Hotel, Alkapuri, Himatnagar, Gujarat 383001',
  coordinates: {
    latitude: '23.6056775',
    longitude: '72.9354112'
  },
  mapLink: 'https://www.google.com/maps?q=23.6056775,72.9354112'
};

export const resultGallery = [
  {
    name: 'Aarav Patel',
    exam: 'PTE Academic',
    score: 'Overall 90',
    image: 'https://placehold.co/800x1080/0c3422/ffffff?text=PTE+Overall+90'
  },
  {
    name: 'Khushi Shah',
    exam: 'IELTS',
    score: 'Band 8.5',
    image: 'https://placehold.co/800x1080/145334/ffffff?text=IELTS+Band+8.5'
  },
  {
    name: 'Mehul Desai',
    exam: 'NAATI CCL',
    score: 'Cleared',
    image: 'https://placehold.co/800x1080/16854c/ffffff?text=NAATI+CCL+Cleared'
  },
  {
    name: 'Riya Joshi',
    exam: 'PTE Core',
    score: 'Overall 88',
    image: 'https://placehold.co/800x1080/24a35f/ffffff?text=PTE+Core+88'
  },
  {
    name: 'Dev Rajput',
    exam: 'LanguageCert',
    score: 'High Pass',
    image: 'https://placehold.co/800x1080/0c3422/ffffff?text=LanguageCert+High+Pass'
  },
  {
    name: 'Anjali Parmar',
    exam: 'IELTS',
    score: 'Band 8.0',
    image: 'https://placehold.co/800x1080/145334/ffffff?text=IELTS+Band+8.0'
  }
];
