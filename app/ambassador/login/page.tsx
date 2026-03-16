'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AmbassadorLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const doPost = () =>
      fetch('/api/ambassador/login', {
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
        setError('CONNECTION_ERROR: Node unreachable. Check your network or try again.');
        setLoading(false);
        return;
      }
    }

    try {
      const text = await response.text();
      let data: { error?: string; token?: string; ambassador?: { id: string } };
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setError(`Server returned invalid response (status ${response.status}). Try again.`);
        setLoading(false);
        return;
      }
      if (response.ok) {
        if (data.token && data.ambassador?.id) {
          try {
            localStorage.setItem('ambassador_token', data.token);
            localStorage.setItem('ambassador_id', data.ambassador.id);
          } catch {
            try {
              sessionStorage.setItem('ambassador_token', data.token);
              sessionStorage.setItem('ambassador_id', data.ambassador.id);
            } catch {
              // Storage blocked; show message
              setError('Browser blocked storage. Open in a new tab (not iframe), allow cookies, or disable strict privacy mode.');
              setLoading(false);
              return;
            }
          }
          router.push('/ambassador/dashboard');
        } else {
          setError(data.error || 'AUTHORIZATION_DENIED');
        }
      } else {
        setError(data.error || `Error ${response.status}. Try again.`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      const isStorage = /localStorage|sessionStorage|access is denied/i.test(msg);
      setError(
        isStorage
          ? 'Browser blocked storage. Open in a new tab and allow cookies.'
          : `Request failed: ${msg}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-32 pb-32 relative bg-transparent flex items-center justify-center overflow-hidden px-6">
      <div className="max-w-xl w-full relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-block px-6 py-2 bg-[var(--bg-card)] rounded-full border-2 border-[var(--accent-magenta)] text-[var(--accent-magenta)] font-mono text-xs tracking-[0.4em] uppercase mb-8 shadow-[4px_4px_0_var(--accent-cyan)]"
          >
            Encryption Layer
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black mb-6 text-white tracking-tight uppercase">
            DECRYPT_LOG
          </h1>

          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Authorized operatives only. Enter your credentials to access the Syndicate data stream.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[var(--bg-card)] backdrop-blur-3xl rounded-[2rem] p-10 md:p-16 border-2 border-[var(--accent-yellow)] shadow-[8px_8px_0_var(--accent-magenta)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-magenta)] to-[var(--accent-orange)]" />

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-center font-mono text-xs tracking-widest uppercase"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email */}
            <div className="group/field">
              <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[var(--horror-cyan)] transition-colors">
                Nodal_ID (Email)
              </label>
              <div className="relative">
                <HiMail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-[var(--horror-cyan)] transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-16 pr-6 py-5 bg-[var(--bg-deep)] border-2 border-[var(--border-subtle)] rounded-2xl focus:border-[var(--accent-cyan)] focus:outline-none transition-all text-white font-mono"
                  placeholder="name@node.com"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Password */}
            <div className="group/field">
              <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[var(--horror-magenta)] transition-colors">
                Access_Key
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-[var(--horror-magenta)] transition-colors" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-16 pr-6 py-5 bg-[var(--bg-deep)] border-2 border-[var(--border-subtle)] rounded-2xl focus:border-[var(--accent-magenta)] focus:outline-none transition-all text-white font-mono"
                  placeholder="Password"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-[var(--accent-primary)] border-2 border-[var(--accent-yellow)] text-[var(--ink)] font-black font-mono text-xl tracking-[0.2em] rounded-2xl hover:bg-[var(--accent-primary-hover)] shadow-[6px_6px_0_var(--accent-magenta)] hover:shadow-[4px_4px_0_var(--accent-magenta)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 uppercase"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" color="black" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  'Authorize'
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 space-y-4 text-center">
            <div className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-widest">
              No clearance? <Link href="/ambassador/register" className="text-[var(--accent-magenta)] hover:text-white transition-colors border-b border-[var(--accent-magenta)]/50">Request Entry</Link>
            </div>

            <div className="pt-4 opacity-30 hover:opacity-100 transition-opacity">
              <Link href="/admin/login" className="text-gray-400 hover:text-white text-[10px] font-mono uppercase tracking-[0.3em]">
                ADMIN_ACCESS_OVERRIDE →
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-gray-600 font-mono text-[9px] uppercase tracking-[0.5em] opacity-30 leading-loose">
          UNAUTHORIZED_ACCESS_WILL_BE_LOGGED <br />
          ENCRYPTION_BY_ARCHITECT_COUNCIL
        </div>
      </div>
    </div>
  );
}
