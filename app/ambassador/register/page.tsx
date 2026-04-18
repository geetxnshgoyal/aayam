'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiUserAdd, HiMail, HiPhone, HiAcademicCap, HiLockClosed } from 'react-icons/hi';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AmbassadorRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    college: '',
    year: '',
    whyAmbassador: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'METADATA_MISMATCH: Passwords do not match' });
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setMessage({ type: 'error', text: 'INSUFFICIENT_ENTROPY: Password min 8 chars' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/ambassador/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'UPLINK_ESTABLISHED: Registration successful! Clearance pending.',
        });
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          college: '',
          year: '',
          whyAmbassador: '',
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'UPLINK_FAILURE' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'SYSTEM_ERROR: Request failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-32 pb-32 relative bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] aayam-grid pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-[#131313] border-2 border-[#ff51fa] text-[#ff51fa] font-mono text-xs tracking-[0.4em] uppercase shadow-[4px_4px_0px_#c1fffe]"
          >
            <HiUserAdd className="w-4 h-4" />
            <span>OPERATIVE RECRUITMENT</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 text-[#c1fffe] tracking-wider uppercase">
            PROTOCOL_ENTRY
          </h1>

          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Initialize your profile in the Syndicate. Architects will review your credentials for clearance.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-[#131313] backdrop-blur-3xl p-8 md:p-16 border-2 border-[#fffeac] shadow-[8px_8px_0px_#ff51fa] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c1fffe] via-[#ff51fa] to-[#fffeac]" />

          {message && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-10 p-6 font-mono text-sm tracking-widest ${message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                : 'bg-red-500/10 border border-red-500/30 text-red-500'
                }`}>
              {message.text}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="group/field">
              <label className="block text-xs font-mono font-black mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[#c1fffe]">
                Identity
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-6 py-5 bg-[#0e0e0e] border-2 border-[#262626] focus:border-[#ff51fa] outline-none transition-all text-white font-mono disabled:opacity-50"
                placeholder="Full Name"
              />
            </div>

            <div className="group/field">
              <label className="block text-xs font-mono font-black mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[#c1fffe]">
                Source_Node
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-6 py-5 bg-[#0e0e0e] border-2 border-[#262626] focus:border-[#c1fffe] outline-none transition-all text-white font-mono disabled:opacity-50"
                placeholder="email@example.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group/field">
                <label className="block text-xs font-mono font-black mb-4 text-gray-500 uppercase tracking-[0.3em]">
                  Clearance_Key
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  disabled={loading}
                  className="w-full px-6 py-5 bg-[#0e0e0e] border-2 border-[#262626] focus:border-[#fffeac] outline-none transition-all text-white font-mono disabled:opacity-50"
                  placeholder="Min 8 chars"
                />
              </div>

              <div className="group/field">
                <label className="block text-xs font-mono font-black mb-4 text-gray-500 uppercase tracking-[0.3em]">
                  Verify_Key
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-6 py-5 bg-[#0e0e0e] border-2 border-[#262626] focus:border-[#fffeac] outline-none transition-all text-white font-mono disabled:opacity-50"
                  placeholder="Re-enter key"
                />
              </div>
            </div>

            <div className="group/field">
              <label className="block text-xs font-mono font-black mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[#ff51fa]">
                Signal (Phone)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-6 py-5 bg-[#0e0e0e] border-2 border-[#262626] focus:border-[#ff51fa] outline-none transition-all text-white font-mono disabled:opacity-50"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group/field">
                <label className="block text-xs font-mono font-black mb-4 text-gray-500 uppercase tracking-[0.3em]">
                  Sector (College)
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-6 py-5 bg-[#0e0e0e] border-2 border-[#262626] focus:border-[#c1fffe] outline-none transition-all text-white font-mono disabled:opacity-50"
                  placeholder="College"
                />
              </div>

              <div className="group/field">
                <label className="block text-xs font-mono font-black mb-4 text-gray-500 uppercase tracking-[0.3em]">
                  Tier
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-6 py-5 bg-[#0e0e0e] border-2 border-[#262626] focus:border-[#c1fffe] outline-none transition-all text-white font-mono"
                >
                  <option value="">Select Phase</option>
                  <option value="1st Year">Phase_01</option>
                  <option value="2nd Year">Phase_02</option>
                  <option value="3rd Year">Phase_03</option>
                  <option value="4th Year">Phase_04</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
            </div>

            <div className="group/field">
              <label className="block text-xs font-mono font-black mb-4 text-gray-500 uppercase tracking-[0.3em]">
                Directive_Intent
              </label>
              <textarea
                name="whyAmbassador"
                value={formData.whyAmbassador}
                onChange={handleChange}
                required
                disabled={loading}
                rows={4}
                className="w-full px-6 py-5 bg-[#0e0e0e] border-2 border-[#262626] focus:border-[#ff51fa] outline-none transition-all text-white font-mono resize-none disabled:opacity-50"
                placeholder="Why do you want to be an ambassador?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-[#fffeac] border-2 border-[#fffeac] text-[#0e0e0e] font-black font-mono text-xl tracking-[0.2em] uppercase hover:shadow-[0px_0px_20px_#c1fffe] shadow-[6px_6px_0px_#ff51fa] transition-all disabled:opacity-50 flex items-center justify-center gap-4"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" color="#0e0e0e" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                'REGISTER NOW'
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-12 font-mono">
            Already registered? 
            <Link href="/ambassador/login" className="text-[#c1fffe] hover:text-[#ff51fa] transition-colors ml-2 font-black uppercase">
              LOGIN
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
