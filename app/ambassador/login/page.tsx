'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import Magnetic from '@/components/Magnetic';
import TextEncrypt from '@/components/TextEncrypt';

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

    try {
      const response = await fetch('/api/ambassador/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store session
        localStorage.setItem('ambassador_token', data.token);
        localStorage.setItem('ambassador_id', data.ambassador.id);

        // Redirect to dashboard
        router.push('/ambassador/dashboard');
      } else {
        setError(data.error || 'AUTHORIZATION_DENIED');
      }
    } catch (error) {
      setError('CONNECTION_ERROR: Node unreachable.');
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
            className="inline-block px-6 py-2 bg-transparent/5 backdrop-blur-md rounded-full border border-white/10 text-[var(--horror-magenta)] font-mono text-xs tracking-[0.4em] uppercase mb-8"
          >
            Encryption Layer
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-display font-black mb-6 text-white tracking-tighter uppercase">
            <TextEncrypt text="DECRYPT_LOG" />
          </h1>

          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Authorized operatives only. Enter your credentials to access the Syndicate data stream.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-[#050508]/60 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--horror-cyan)] to-transparent opacity-50" />

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
                  className="w-full pl-16 pr-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-[var(--horror-cyan)] focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg"
                  placeholder="name@node.com"
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
                  className="w-full pl-16 pr-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-[var(--horror-magenta)] focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Magnetic>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-transparent text-black font-black text-xl tracking-[0.2em] rounded-2xl hover:bg-[var(--horror-cyan)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 uppercase"
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
              </Magnetic>
            </div>
          </form>

          <div className="mt-12 space-y-4 text-center">
            <div className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              No clearance? <Link href="/ambassador/register" className="text-[var(--horror-magenta)] hover:text-white transition-colors border-b border-[var(--horror-magenta)]/30">Request Entry</Link>
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
