"use client";
import { BookOpenText, Megaphone, ReceiptText, Trash2, Edit3, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import SectionIntro from '@/components/SectionIntro';
import { useSEO } from '@/hooks/useSEO';
import { createContentItem, getContentItems, updateContentItem, deleteContentItem } from '@/lib/api';
import AdminLoginPage from './login/page';

const tabs = [
  { id: 'vouchers', label: 'Vouchers', icon: ReceiptText },
  { id: 'blogs', label: 'Blogs', icon: BookOpenText },
  { id: 'advertisements', label: 'Advertisements', icon: Megaphone }
];

export default function AdminPanelPage() {
  useSEO('Admin Panel | i2 Language', 'Admin panel for managing site content.');

  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState('vouchers');
  const [vouchers, setVouchers] = useState([]);
  const [blogItems, setBlogItems] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [status, setStatus] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    setIsClient(true);
    setToken(localStorage.getItem('admin_token'));
    
    let isMounted = true;
    async function loadContent() {
      try {
        const [vData, bData, aData] = await Promise.all([
          getContentItems('vouchers'),
          getContentItems('blogs'),
          getContentItems('advertisements')
        ]);
        if (isMounted) {
          setVouchers(vData);
          setBlogItems(bData);
          setAdvertisements(aData);
        }
      } catch (error) {
        if (isMounted) setStatus(`Unable to load content: ${error.message}`);
      }
    }
    loadContent();
    return () => { isMounted = false; };
  }, []);

  const saveItem = async (type, item, setter) => {
    setStatus('Processing...');
    try {
      if (editingItem) {
        const updated = await updateContentItem(type, editingItem._id || editingItem.id, item);
        setter((prev) => prev.map(i => (i._id === updated._id || i.id === updated.id) ? updated : i));
        setStatus('Item updated successfully.');
      } else {
        const saved = await createContentItem(type, item);
        setter((prev) => [saved, ...prev]);
        setStatus('Saved to MongoDB successfully.');
      }
      setEditingItem(null);
      return true;
    } catch (error) {
      setStatus(`Error: ${error.message}`);
      return false;
    }
  };

  const removeItem = async (type, id, setter) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteContentItem(type, id);
      setter((prev) => prev.filter(i => (i._id !== id && i.id !== id)));
      setStatus("Deleted successfully.");
    } catch (error) {
      setStatus(`Delete failed: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  if (!isClient) return null;
  if (!token) return <AdminLoginPage onLogin={(t) => { localStorage.setItem('admin_token', t); setToken(t); }} />;

  return (
    <section className="py-16">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Admin Panel"
          title="Manage vouchers, blog posts, and advertisements."
          description="Create, Edit, or Delete content across all devices instantly."
        />
        
        {status && (
          <div className="mt-6 rounded-2xl border border-forest-100 bg-forest-50 px-5 py-4 text-sm font-semibold text-forest-800 flex justify-between items-center">
            {status}
            <X className="h-4 w-4 cursor-pointer" onClick={() => setStatus('')} />
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setEditingItem(null); }}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${
                  activeTab === tab.id ? 'bg-forest-700 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border border-red-200 bg-red-50 text-red-600 hover:bg-red-100">
            Logout
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          {activeTab === 'vouchers' && (
            <>
              <VoucherForm onAdd={(item) => saveItem('vouchers', item, setVouchers)} editData={editingItem} />
              <PreviewList title="Voucher Preview" items={vouchers} onEdit={setEditingItem} onDelete={(id) => removeItem('vouchers', id, setVouchers)} />
            </>
          )}
          {activeTab === 'blogs' && (
            <>
              <BlogForm onAdd={(item) => saveItem('blogs', item, setBlogItems)} editData={editingItem} />
              <PreviewList title="Blog Preview" items={blogItems} onEdit={setEditingItem} onDelete={(id) => removeItem('blogs', id, setBlogItems)} />
            </>
          )}
          {activeTab === 'advertisements' && (
            <>
              <AdvertisementForm onAdd={(item) => saveItem('advertisements', item, setAdvertisements)} editData={editingItem} />
              <PreviewList title="Ad Preview" items={advertisements} onEdit={setEditingItem} onDelete={(id) => removeItem('advertisements', id, setAdvertisements)} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* --- FORM COMPONENTS (Exact Design) --- */

function VoucherForm({ onAdd, editData }) {
  const [values, setValues] = useState({ title: '', price: '', description: '', buttonLabel: '', image: '' });
  useEffect(() => { if (editData) setValues(editData); }, [editData]);
  
  return (
    <FormShell title={editData ? "Edit Voucher" : "Add Voucher"} values={values} setValues={setValues} fields={[
      { name: 'title', placeholder: 'Voucher title' },
      { name: 'price', placeholder: 'Price' },
      { name: 'description', placeholder: 'Description', textarea: true },
      { name: 'buttonLabel', placeholder: 'Button label' },
      { name: 'image', placeholder: 'Voucher image', file: true }
    ]} onSubmit={async () => { if (await onAdd(values)) setValues({ title: '', price: '', description: '', buttonLabel: '', image: '' }); }} />
  );
}

function BlogForm({ onAdd, editData }) {
  const [values, setValues] = useState({ title: '', category: '', excerpt: '', readTime: '', image: '' });
  useEffect(() => { if (editData) setValues(editData); }, [editData]);

  return (
    <FormShell title={editData ? "Edit Blog" : "Write Blog"} values={values} setValues={setValues} fields={[
      { name: 'title', placeholder: 'Blog title' },
      { name: 'category', placeholder: 'Category' },
      { name: 'excerpt', placeholder: 'Excerpt', textarea: true },
      { name: 'readTime', placeholder: 'Read time' },
      { name: 'image', placeholder: 'Blog image', file: true }
    ]} onSubmit={async () => { if (await onAdd(values)) setValues({ title: '', category: '', excerpt: '', readTime: '', image: '' }); }} />
  );
}

function AdvertisementForm({ onAdd, editData }) {
  const [values, setValues] = useState({ title: '', placement: '', description: '', cta: '', image: '', link: '' });
  useEffect(() => { if (editData) setValues(editData); }, [editData]);

  return (
    <FormShell title={editData ? "Edit Ad" : "Add Advertisement"} values={values} setValues={setValues} fields={[
      { name: 'title', placeholder: 'Ad title' },
      { name: 'placement', placeholder: 'Placement' },
      { name: 'description', placeholder: 'Description', textarea: true },
      { name: 'cta', placeholder: 'CTA label' },
      { name: 'link', placeholder: 'Link URL' },
      { name: 'image', placeholder: 'Ad image', file: true }
    ]} onSubmit={async () => { if (await onAdd(values)) setValues({ title: '', placement: '', description: '', cta: '', image: '', link: '' }); }} />
  );
}

function FormShell({ title, values, setValues, fields, onSubmit }) {
  const handleFileUpload = (e, name) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setValues(prev => ({ ...prev, [name]: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
      <h3 className="font-heading text-3xl font-extrabold text-slate-900">{title}</h3>
      <form className="mt-8 space-y-4" onSubmit={async (e) => { e.preventDefault(); await onSubmit(); }}>
        {fields.map(f => f.file ? (
          <div key={f.name} className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{f.placeholder}</label>
            <input className="input-shell file:mr-4 file:rounded-full file:border-0 file:bg-forest-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" type="file" onChange={(e) => handleFileUpload(e, f.name)} />
          </div>
        ) : f.textarea ? (
          <textarea key={f.name} className="input-shell min-h-32" value={values[f.name] || ''} onChange={e => setValues({...values, [f.name]: e.target.value})} placeholder={f.placeholder} required />
        ) : (
          <input key={f.name} className="input-shell" value={values[f.name] || ''} onChange={e => setValues({...values, [f.name]: e.target.value})} placeholder={f.placeholder} required />
        ))}
        <button className="cta-primary rounded-2xl w-full" type="submit">Save to MongoDB</button>
      </form>
    </div>
  );
}

function PreviewList({ title, items, onEdit, onDelete }) {
  return (
    <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl overflow-y-auto max-h-[800px]">
      <h3 className="font-heading text-3xl font-extrabold">{title}</h3>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div key={item._id || item.id} className="rounded-[1.5rem] bg-white/5 p-5 group relative">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onEdit(item)} className="p-2 bg-forest-600 rounded-full hover:bg-forest-500"><Edit3 size={14}/></button>
              <button onClick={() => onDelete(item._id || item.id)} className="p-2 bg-red-600 rounded-full hover:bg-red-500"><Trash2 size={14}/></button>
            </div>
            {item.image && <img src={item.image} alt="" className="mb-4 h-36 w-full rounded-2xl object-cover" />}
            <div className="font-heading text-xl font-extrabold">{item.title}</div>
            <div className="mt-2 text-sm text-slate-300 italic">{item.price || item.category || item.placement}</div>
            <div className="mt-3 text-sm text-slate-400 line-clamp-2">{item.description || item.excerpt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}