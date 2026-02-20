'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiUserAdd, HiMail, HiPhone, HiAcademicCap, HiLockClosed } from 'react-icons/hi';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import Magnetic from '@/components/Magnetic';
import TextEncrypt from '@/components/TextEncrypt';

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

    // Validation
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
          text: 'UPLINK_ESTABLISHED: Registration successful! Direct clearance pending Architect review.'
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
      setMessage({ type: 'error', text: 'SYSTEM_ERROR: Request terminated by external node.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-32 pb-32 relative bg-transparent overflow-hidden">
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
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-transparent/5 backdrop-blur-md rounded-full border border-white/10 text-[var(--horror-magenta)] font-mono text-xs tracking-[0.4em] uppercase"
          >
            <HiUserAdd className="w-4 h-4" />
            <span>Operative Recruitment</span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-display font-black mb-6 text-white tracking-tighter uppercase">
            <TextEncrypt text="PROTOCOL_ENTRY" />
          </h1>

          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Initialize your profile in the Syndicate. The Architects will review your nodal credentials for clearance.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-[#050508]/60 backdrop-blur-3xl rounded-[3rem] p-8 md:p-16 border border-white/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--horror-magenta)] to-transparent opacity-50" />

          {message && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-10 p-6 rounded-2xl font-mono text-sm tracking-widest ${message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/30 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                : 'bg-red-500/10 border border-red-500/30 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                }`}>
              {message.text}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Full Name */}
            <div className="group/field">
              <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[var(--horror-magenta)] transition-colors">
                Operative_Identity
              </label>
              <div className="relative">
                <HiUserAdd className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-[var(--horror-magenta)] transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-16 pr-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-[var(--horror-magenta)] focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg disabled:opacity-50"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group/field">
              <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[var(--horror-cyan)] transition-colors">
                Source_Node (Email)
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
                  className="w-full pl-16 pr-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-[var(--horror-cyan)] focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg disabled:opacity-50"
                  placeholder="name@node.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group/field">
                <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-white transition-colors">
                  Clearance_Key
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-white transition-colors" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    disabled={loading}
                    className="w-full pl-16 pr-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-white/40 focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg disabled:opacity-50"
                    placeholder="Min. 8 chars"
                  />
                </div>
              </div>

              <div className="group/field">
                <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-white transition-colors">
                  Verify_Key
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-white transition-colors" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full pl-16 pr-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-white/40 focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg disabled:opacity-50"
                    placeholder="Re-enter key"
                  />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group/field">
              <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[var(--horror-magenta)] transition-colors">
                Uplink_Signal (Phone)
              </label>
              <div className="relative">
                <HiPhone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-[var(--horror-magenta)] transition-colors" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-16 pr-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-[var(--horror-magenta)] focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg disabled:opacity-50"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            {/* College & Year */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group/field">
                <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[var(--horror-cyan)] transition-colors">
                  Deployment_Sector
                </label>
                <div className="relative">
                  <HiAcademicCap className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/field:text-[var(--horror-cyan)] transition-colors" />
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full pl-16 pr-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-[var(--horror-cyan)] focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg disabled:opacity-50"
                    placeholder="Sector (College)"
                  />
                </div>
              </div>

              <div className="group/field">
                <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[var(--horror-cyan)] transition-colors">
                  Experience_Tier
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-[var(--horror-cyan)] focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg disabled:opacity-50 appearance-none"
                >
                  <option value="" className="bg-[#050508]">Phase</option>
                  <option value="1st Year" className="bg-[#050508]">Phase_01</option>
                  <option value="2nd Year" className="bg-[#050508]">Phase_02</option>
                  <option value="3rd Year" className="bg-[#050508]">Phase_03</option>
                  <option value="4th Year" className="bg-[#050508]">Phase_04</option>
                  <option value="Graduate" className="bg-[#050508]">Post_Graduate</option>
                </select>
              </div>
            </div>

            {/* Why Ambassador */}
            <div className="group/field">
              <label className="block text-xs font-mono font-bold mb-4 text-gray-500 uppercase tracking-[0.3em] group-focus-within/field:text-[var(--horror-magenta)] transition-colors">
                Directive_Intent
              </label>
              <textarea
                name="whyAmbassador"
                value={formData.whyAmbassador}
                onChange={handleChange}
                required
                disabled={loading}
                rows={4}
                className="w-full px-6 py-5 bg-transparent/5 border border-white/10 rounded-2xl focus:border-[var(--horror-magenta)] focus:bg-transparent/10 focus:outline-none transition-all text-white font-light text-lg resize-none disabled:opacity-50"
                placeholder="Declare your objectives for the infiltration..."
              />
            </div>

            {/* Submit Button */}
            <Magnetic>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-transparent text-black font-black text-xl tracking-[0.2em] rounded-2xl hover:bg-[var(--horror-magenta)] hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 uppercase shadow-[0_20px_40px_rgba(0,0,0,0.3)] group-hover:shadow-[0_20px_40px_var(--horror-magenta)]/20"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" color="black" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  'Synchronize'
                )}
              </button>
            </Magnetic>
          </form>

          <div className="mt-12 text-center text-gray-500 font-mono text-xs uppercase tracking-widest leading-loose">
            Synchronized before? <Link href="/ambassador/login" className="text-[var(--horror-cyan)] hover:text-white transition-colors border-b border-[var(--horror-cyan)]/30">Decrypt Login</Link>
          </div>
        </motion.div>

        <div className="mt-12 text-center text-gray-600 font-mono text-[10px] uppercase tracking-[0.4em] space-y-2 opacity-50">
          <p>ARCHITECT_REVIEW_REQUIRED_FOR_NODAL_CLEARANCE</p>
          <p>SUCCESSFUL_AUTHORIZATION_WILL_TRIGGER_METADATA_DISPATCH</p>
        </div>
      </div>
    </div>
  );
}
