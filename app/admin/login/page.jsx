"use client";
import { useState } from 'react';
import SectionIntro from '@/components/SectionIntro';

export default function AdminLoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(apiUrl + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (data.success && data.token) {
        onLogin(data.token);
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="section-shell max-w-lg mx-auto">
        <SectionIntro
          eyebrow="Admin Access"
          title="Secure Panel Login"
          description="Please enter the administrator password to access the content management system."
        />
        
        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                className="input-shell"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {error && (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
                {error}
              </div>
            )}
            
            <button 
              className="cta-primary w-full rounded-2xl" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Access Admin Panel'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
