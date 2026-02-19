'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiShieldCheck } from 'react-icons/hi';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import Magnetic from '@/components/Magnetic';
import TextEncrypt from '@/components/TextEncrypt';

export default function AdminLoginPage() {
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

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_id', data.admin.id);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'OVERRIDE_REJECTED');
      }
    } catch (error) {
      setError('CONNECTION_ERROR: Core node unreachable.');
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
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-transparent/5 backdrop-blur-md rounded-3xl border border-white/10 mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            <HiShieldCheck className="w-10 h-10 text-[var(--horror-magenta)]" />
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-[var(--font-cinzel)] font-black mb-6 text-white tracking-tighter uppercase">
            <TextEncrypt text="ARCHITECT_OVERRIDE" />
          </h1>

          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Restricted Core Access. Root credentials required for protocol management.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-[#050508]/60 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 border border-white/5 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--horror-magenta)] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--horror-cyan)] to-transparent" />

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-center font-mono text-xs tracking-widest uppercase"
            >
              {error}
            </motion.div>
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
              <Magnetic>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-transparent text-black font-black text-xl tracking-[0.2em] rounded-2xl hover:bg-[var(--horror-magenta)] hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 uppercase"
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
              </Magnetic>
            </div>
          </form>

          <div className="mt-12 text-center">
            <Link href="/ambassador/login" className="text-gray-500 hover:text-white font-mono text-xs uppercase tracking-[0.2em] transition-colors border-b border-white/10">
              ← TERMINATE_ADMIN_SESSION
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 text-center text-gray-600 font-mono text-[9px] uppercase tracking-[0.6em] opacity-30 leading-loose">
          CORE_SYSTEM_V2.0_CLEARANCE_REQUIRED <br />
          ALL_ACTIVITY_MONITORED_BY_SYNAPSE_NET
        </div>
      </div>
    </div>
  );
}
