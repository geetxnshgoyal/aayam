'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import Link from 'next/link';

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
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0A0B16] text-white flex items-center justify-center px-6">
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

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] bg-clip-text text-transparent">
              Ambassador Login
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg">
            Access your dashboard and track your progress
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] rounded-3xl p-8 border border-[#560F28]/20"
        >
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Email
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
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none transition-colors text-white"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[0_12px_30px_rgba(220,20,38,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Not registered yet? <Link href="/ambassador/register" className="text-[#560F28] hover:text-[#dc1426] font-semibold">Apply here</Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/admin/login" className="text-gray-500 hover:text-gray-300 text-xs">
              Admin Login →
            </Link>
          </div>
        </motion.div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>If you forgot your password, contact the admin team.</p>
        </div>
      </div>
    </div>
  );
}
