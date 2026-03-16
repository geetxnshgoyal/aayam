'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiMail, HiLockClosed, HiShieldCheck } from 'react-icons/hi';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [testStatus, setTestStatus] = useState<string | null>(null);

  const testConnection = async () => {
    setTestStatus('Checking...');
    try {
      const r = await fetch('/api/admin/login');
      const data = await r.json();
      setTestStatus(r.ok ? 'API reachable from this page.' : `API returned ${r.status}`);
    } catch (e) {
      setTestStatus(`Failed: ${e instanceof Error ? e.message : 'Could not reach API'}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const doPost = () =>
      fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

    let response: Response;
    try {
      response = await doPost();
    } catch {
      await new Promise((r) => setTimeout(r, 800));
      try {
        response = await doPost();
      } catch {
        setError('Connection error. Click "Test connection" below to verify the API from this page.');
        setLoading(false);
        return;
      }
    }

    try {
      const text = await response.text();
      let data: { error?: string; token?: string; admin?: { id: string } };
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setError(`Server returned non-JSON (status ${response.status}). Check server logs.`);
        setLoading(false);
        return;
      }
      if (response.ok) {
        if (data.token && data.admin?.id) {
          try {
            localStorage.setItem('admin_token', data.token);
            localStorage.setItem('admin_id', data.admin.id);
          } catch {
            try {
              sessionStorage.setItem('admin_token', data.token);
              sessionStorage.setItem('admin_id', data.admin.id);
            } catch {
              // Cookie is set by API — redirect anyway; dashboard will use credentials
            }
          }
          window.location.href = '/admin/dashboard';
        } else {
          setError('Server returned an invalid response. Try again.');
        }
      } else {
        setError(data.error || `Error ${response.status}. Try again.`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      const isStorage = /localStorage|sessionStorage|access is denied/i.test(msg);
      setError(
        isStorage
          ? 'Your browser blocked storage. Open this page in a new tab (not iframe), allow cookies, or disable strict privacy mode.'
          : `Request failed: ${msg}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  return (
    <div className="min-h-screen pt-32 pb-32 relative bg-transparent flex items-center justify-center overflow-hidden px-6">
      <div className="max-w-xl w-full relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-transparent/5 backdrop-blur-md rounded-3xl border border-white/10 mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <HiShieldCheck className="w-10 h-10 text-[var(--horror-magenta)]" />
          </div>

          <h1 className="text-4xl md:text-7xl font-display font-black mb-6 text-white tracking-tighter uppercase">
            ARCHITECT_OVERRIDE
          </h1>

          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Restricted Core Access. Root credentials required for protocol management.
          </p>
        </div>

        <div className="bg-[#050508]/60 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--horror-magenta)] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--horror-cyan)] to-transparent" />

          {error && (
            <div className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-center font-mono text-xs tracking-widest uppercase space-y-2">
              <p>{error}</p>
            </div>
          )}
          {testStatus && (
            <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-center font-mono text-xs">
              {testStatus}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group/field">
              <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-white transition-colors">
                Root_Email
              </label>
              <div className="relative">
                <HiMail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-white transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-16 pr-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-white/40 focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg"
                  placeholder="admin@aayam.com"
                />
              </div>
            </div>

            <div className="group/field">
              <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-white transition-colors">
                Master_Passkey
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-white transition-colors" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-16 pr-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-white/40 focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg"
                  placeholder="Enter passkey"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-transparent text-black font-black text-xl tracking-[0.2em] rounded-2xl hover:bg-[var(--horror-magenta)] hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 uppercase"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" color="black" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  'Initialize'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={testConnection}
              disabled={loading}
              className="text-gray-500 hover:text-white font-mono text-xs uppercase tracking-[0.2em] transition-colors underline disabled:opacity-50"
            >
              Test connection
            </button>
            <Link href="/ambassador/login" className="text-gray-500 hover:text-white font-mono text-xs uppercase tracking-[0.2em] transition-colors border-b border-white/10">
              ← TERMINATE_ADMIN_SESSION
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600 font-mono text-[9px] uppercase tracking-[0.6em] opacity-30 leading-loose">
          CORE_SYSTEM_V2.0_CLEARANCE_REQUIRED <br />
          ALL_ACTIVITY_MONITORED_BY_SYNAPSE_NET
        </div>
      </div>
    </div>
  );
}
