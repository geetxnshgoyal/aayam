'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiUserAdd, HiMail, HiPhone, HiAcademicCap, HiLockClosed } from 'react-icons/hi';
import Link from 'next/link';

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
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
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
          text: 'Registration successful! Please wait for admin approval. You will receive an email once approved.' 
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
        setMessage({ type: 'error', text: data.error || 'Registration failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0A0B16] text-white pt-28 pb-20">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, #200934 0%, #0A0B16 30%, #560F28 60%, #0A0B16 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 20s ease infinite',
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#560F28] rounded-full blur-[120px] opacity-20 animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#200934] rounded-full blur-[120px] opacity-25 animate-glow-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] rounded-full mb-6">
            <HiUserAdd className="w-5 h-5" />
            <span className="font-bold">Become an Ambassador</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] bg-clip-text text-transparent">
              Ambassador Registration
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg">
            Fill out the form below. Admin will review and approve your application.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] rounded-3xl p-8 md:p-10 border border-[#560F28]/20"
        >
          {message && (
            <div className={`mb-6 p-4 rounded-xl ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <HiUserAdd className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none transition-colors text-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none transition-colors text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none transition-colors text-white"
                    placeholder="Min. 8 characters"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none transition-colors text-white"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none transition-colors text-white"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            {/* College & Year */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  College/University <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <HiAcademicCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none transition-colors text-white"
                    placeholder="Your College Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Year of Study <span className="text-red-400">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none transition-colors text-white"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
            </div>

            {/* Why Ambassador */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Why do you want to be an Ambassador? <span className="text-red-400">*</span>
              </label>
              <textarea
                name="whyAmbassador"
                value={formData.whyAmbassador}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none transition-colors text-white resize-none"
                placeholder="Tell us why you want to represent AAYAM on your campus..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[0_12px_30px_rgba(220,20,38,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Already registered? <Link href="/ambassador/login" className="text-[#560F28] hover:text-[#dc1426] font-semibold">Login here</Link>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>After submitting, admin will review your application.</p>
          <p>You'll receive an email with login credentials once approved.</p>
        </div>
      </div>
    </div>
  );
}
