"use client";
import { BookOpenText, Megaphone, ReceiptText } from 'lucide-react';
import { useEffect, useState } from 'react';
import SectionIntro from '@/components/SectionIntro';
import { useSEO } from '@/hooks/useSEO';
import { createContentItem, getContentItems } from '@/lib/api';
import AdminLoginPage from './login/page';

const tabs = [
  { id: 'vouchers', label: 'Vouchers', icon: ReceiptText },
  { id: 'blogs', label: 'Blogs', icon: BookOpenText },
  { id: 'advertisements', label: 'Advertisements', icon: Megaphone }
];

export default function AdminPanelPage() {
  useSEO('Admin Panel | i2 Language', 'Admin panel for adding vouchers, blogs, and advertisements.');

  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState('vouchers');
  const [vouchers, setVouchers] = useState([]);
  const [blogItems, setBlogItems] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [status, setStatus] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setToken(localStorage.getItem('admin_token'));
    
    let isMounted = true;

    async function loadContent() {
      try {
        const [voucherData, blogData, advertisementData] = await Promise.all([
          getContentItems('vouchers'),
          getContentItems('blogs'),
          getContentItems('advertisements')
        ]);

        if (isMounted) {
          setVouchers(voucherData);
          setBlogItems(blogData);
          setAdvertisements(advertisementData);
        }
      } catch (error) {
        if (isMounted) {
          setStatus(`Unable to load MongoDB content: ${error.message}`);
        }
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const saveItem = async (type, item, setter) => {
    setStatus('Saving...');

    try {
      const savedItem = await createContentItem(type, item);
      setter((previous) => [savedItem, ...previous]);
      setStatus('Saved to MongoDB. It will now show on every device.');
      return true;
    } catch (error) {
      setStatus(`Save failed: ${error.message}`);
      return false;
    }
  };

  const handleLogin = (jwtToken) => {
    localStorage.setItem('admin_token', jwtToken);
    setToken(jwtToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  if (!isClient) {
    return null;
  }

  if (!token) {
    return <AdminLoginPage onLogin={handleLogin} />;
  }

  return (
    <section className="py-16">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Admin Panel"
          title="Manage vouchers, blog posts, and advertisements from one place."
          description="This panel saves content to MongoDB so vouchers, blogs, and advertisements appear on every device."
        />
        {status ? (
          <div className="mt-6 rounded-2xl border border-forest-100 bg-forest-50 px-5 py-4 text-sm font-semibold text-forest-800">
            {status}
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${
                  activeTab === tab.id ? 'bg-forest-700 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <button 
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          >
            Logout
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          {activeTab === 'vouchers' ? (
            <>
              <VoucherForm onAdd={(item) => saveItem('vouchers', item, setVouchers)} />
              <PreviewList title="Voucher Preview" items={vouchers} />
            </>
          ) : null}

          {activeTab === 'blogs' ? (
            <>
              <BlogForm onAdd={(item) => saveItem('blogs', item, setBlogItems)} />
              <PreviewList title="Blog Preview" items={blogItems} />
            </>
          ) : null}

          {activeTab === 'advertisements' ? (
            <>
              <AdvertisementForm
                onAdd={(item) => saveItem('advertisements', item, setAdvertisements)}
              />
              <PreviewList title="Advertisement Preview" items={advertisements} />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function VoucherForm({ onAdd }) {
  const [values, setValues] = useState({ title: '', price: '', description: '', buttonLabel: '', image: '' });
  return (
    <FormShell
      title="Add Voucher"
      values={values}
      setValues={setValues}
      fields={[
        { name: 'title', placeholder: 'Voucher title' },
        { name: 'price', placeholder: 'Price' },
        { name: 'description', placeholder: 'Description', textarea: true },
        { name: 'buttonLabel', placeholder: 'Button label' },
        { name: 'image', placeholder: 'Upload voucher image', file: true }
      ]}
      onSubmit={async () => {
        const saved = await onAdd(values);
        if (saved) {
          setValues({ title: '', price: '', description: '', buttonLabel: '', image: '' });
        }
      }}
    />
  );
}

function BlogForm({ onAdd }) {
  const [values, setValues] = useState({ title: '', category: '', excerpt: '', readTime: '' });
  return (
    <FormShell
      title="Write Blog"
      values={values}
      setValues={setValues}
      fields={[
        { name: 'title', placeholder: 'Blog title' },
        { name: 'category', placeholder: 'Category' },
        { name: 'excerpt', placeholder: 'Excerpt', textarea: true },
        { name: 'readTime', placeholder: 'Read time' }
      ]}
      onSubmit={async () => {
        const saved = await onAdd(values);
        if (saved) {
          setValues({ title: '', category: '', excerpt: '', readTime: '' });
        }
      }}
    />
  );
}

function AdvertisementForm({ onAdd }) {
  const [values, setValues] = useState({ title: '', placement: '', description: '', cta: '', image: '' });
  return (
    <FormShell
      title="Add Advertisement"
      values={values}
      setValues={setValues}
      fields={[
        { name: 'title', placeholder: 'Advertisement title' },
        { name: 'placement', placeholder: 'Placement' },
        { name: 'description', placeholder: 'Description', textarea: true },
        { name: 'cta', placeholder: 'CTA label' },
        { name: 'image', placeholder: 'Upload advertisement image', file: true }
      ]}
      onSubmit={async () => {
        const saved = await onAdd(values);
        if (saved) {
          setValues({ title: '', placement: '', description: '', cta: '', image: '' });
        }
      }}
    />
  );
}

function FormShell({ title, values, setValues, fields, onSubmit }) {
  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setValues((previous) => ({ ...previous, [fieldName]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
      <h3 className="font-heading text-3xl font-extrabold text-slate-900">{title}</h3>
      <form
        className="mt-8 space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          await onSubmit();
        }}
        >
        {fields.map((field) =>
          field.file ? (
            <div key={field.name} className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">{field.placeholder}</label>
              <input
                className="input-shell file:mr-4 file:rounded-full file:border-0 file:bg-forest-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={(event) => handleFileUpload(event, field.name)}
              />
              {values[field.name] ? (
                <img src={values[field.name]} alt={field.placeholder} className="h-32 w-full rounded-2xl object-cover" />
              ) : null}
            </div>
          ) : field.textarea ? (
            <textarea
              key={field.name}
              className="input-shell min-h-32"
              value={values[field.name]}
              onChange={(event) => setValues((previous) => ({ ...previous, [field.name]: event.target.value }))}
              placeholder={field.placeholder}
              required
            />
          ) : (
            <input
              key={field.name}
              className="input-shell"
              value={values[field.name]}
              onChange={(event) => setValues((previous) => ({ ...previous, [field.name]: event.target.value }))}
              placeholder={field.placeholder}
              required
            />
          )
        )}
        <button className="cta-primary rounded-2xl" type="submit">Save Item</button>
      </form>
    </div>
  );
}

function PreviewList({ title, items }) {
  return (
    <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
      <h3 className="font-heading text-3xl font-extrabold">{title}</h3>
      <div className="mt-8 space-y-4">
        {items.map((item, index) => (
          <div key={item.id || `${item.title}-${index}`} className="rounded-[1.5rem] bg-white/5 p-5">
            {item.image ? (
              <img src={item.image} alt={item.title} className="mb-4 h-36 w-full rounded-2xl object-cover" />
            ) : null}
            <div className="font-heading text-xl font-extrabold">{item.title}</div>
            <div className="mt-2 text-sm text-slate-300">
              {item.price || item.category || item.placement || 'Content item'}
            </div>
            <div className="mt-3 text-sm text-slate-300">
              {item.description || item.excerpt || 'No description provided yet.'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
