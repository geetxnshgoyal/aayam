'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiUsers, HiClipboardCopy, HiPlus, HiLogout, HiTrendingUp, HiStar } from 'react-icons/hi';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import LoadingSpinner from '@/components/LoadingSpinner';
import Tasks from '@/components/Tasks';

interface Ambassador {
  id: string;
  name: string;
  email: string;
  referral_code: string;
  signup_count: number;
  tier: string;
  college: string;
}

interface Signup {
  id: string;
  participant_name: string;
  participant_email: string;
  participant_college: string;
  registered_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [ambassador, setAmbassador] = useState<Ambassador | null>(null);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddSignup, setShowAddSignup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeTab, setActiveTab] = useState<'signups' | 'tasks'>('signups');
  const [token, setToken] = useState('');

  const [newSignup, setNewSignup] = useState({
    participant_name: '',
    participant_email: '',
    participant_phone: '',
    participant_college: '',
  });

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('ambassador_token');
    if (!tokenFromStorage) {
      router.push('/ambassador/login');
      return;
    }
    setToken(tokenFromStorage);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('ambassador_token');
      const response = await fetch('/api/ambassador/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAmbassador(data.ambassador);
        setSignups(data.signups);
      } else {
        router.push('/ambassador/login');
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    const token = localStorage.getItem('ambassador_token');

    try {
      const response = await fetch('/api/ambassador/add-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newSignup),
      });

      const data = await response.json();

      if (response.ok) {
        setNewSignup({
          participant_name: '',
          participant_email: '',
          participant_phone: '',
          participant_college: '',
        });
        setShowAddSignup(false);
        fetchDashboardData(); // Refresh data
      } else {
        setSubmitError(data.error || 'Failed to add signup');
      }
    } catch (error) {
      console.error('Error adding signup:', error);
      setSubmitError('Error adding signup. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyReferralCode = () => {
    if (ambassador) {
      navigator.clipboard.writeText(ambassador.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ambassador_token');
    localStorage.removeItem('ambassador_id');
    router.push('/ambassador/login');
  };

  const getTierInfo = (tier: string) => {
    const tiers = {
      none: { name: 'Not Yet', color: 'gray', icon: HiStar, next: 'Bronze (10 signups)' },
      bronze: { name: 'Bronze', color: 'orange', icon: FaMedal, next: 'Silver (25 signups)' },
      silver: { name: 'Silver', color: 'gray', icon: FaMedal, next: 'Gold (50 signups)' },
      gold: { name: 'Gold', color: 'yellow', icon: FaTrophy, next: 'Platinum (100 signups)' },
      platinum: { name: 'Platinum', color: 'purple', icon: FaTrophy, next: 'Max Tier!' },
    };
    return tiers[tier as keyof typeof tiers] || tiers.none;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B16] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!ambassador) {
    return null;
  }

  const tierInfo = getTierInfo(ambassador.tier);
  const progress = ambassador.tier === 'platinum' ? 100 : (ambassador.signup_count % 100);

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
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Welcome, <span className="bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent">{ambassador.name}</span>!
            </h1>
            <p className="text-gray-400">{ambassador.college}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-colors"
          >
            <HiLogout className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Referral Code */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-br from-[#200934] to-[#180C16] rounded-2xl p-6 border border-[#560F28]/30"
          >
            <HiClipboardCopy className="w-8 h-8 mb-4 text-[#560F28]" />
            <h3 className="text-sm text-gray-400 mb-2">Your Referral Code</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-black">{ambassador.referral_code}</p>
              <button
                onClick={copyReferralCode}
                className="px-4 py-2 bg-[#560F28]/20 hover:bg-[#560F28]/40 rounded-lg transition-colors text-sm"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </motion.div>

          {/* Total Signups */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#180C16] to-[#350609] rounded-2xl p-6 border border-[#560F28]/30"
          >
            <HiUsers className="w-8 h-8 mb-4 text-[#560F28]" />
            <h3 className="text-sm text-gray-400 mb-2">Total Signups</h3>
            <p className="text-4xl font-black">{ambassador.signup_count}</p>
          </motion.div>

          {/* Current Tier */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#560F28] to-[#350609] rounded-2xl p-6 border border-[#560F28]/30"
          >
            <tierInfo.icon className="w-8 h-8 mb-4 text-white" />
            <h3 className="text-sm text-gray-200 mb-2">Current Tier</h3>
            <p className="text-3xl font-black">{tierInfo.name}</p>
            <p className="text-xs text-gray-300 mt-2">Next: {tierInfo.next}</p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] rounded-2xl p-6 border border-[#560F28]/20 mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Progress to Next Tier</h3>
            <span className="text-sm text-gray-400">{ambassador.signup_count} signups</span>
          </div>
          <div className="w-full bg-transparent/10 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab('signups')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'signups'
                ? 'bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] text-white'
                : 'bg-transparent/5 text-gray-400 hover:bg-transparent/10'
            }`}
          >
            <HiUsers className="inline mr-2 w-5 h-5" />
            Signups
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'tasks'
                ? 'bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] text-white'
                : 'bg-transparent/5 text-gray-400 hover:bg-transparent/10'
            }`}
          >
            <HiStar className="inline mr-2 w-5 h-5" />
            Tasks & Points
          </button>
        </div>

        {/* Tasks Tab */}
        {activeTab === 'tasks' && token && (
          <Tasks ambassadorId={ambassador?.id || ''} token={token} />
        )}

        {/* Signups Tab */}
        {activeTab === 'signups' && (
          <>
            {/* Add Signup Button */}
            <div className="mb-8">
              <button
                onClick={() => setShowAddSignup(!showAddSignup)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <HiPlus className="w-5 h-5" />
                {showAddSignup ? 'Cancel' : 'Add New Signup'}
              </button>
            </div>

        {/* Add Signup Form */}
        {showAddSignup && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] rounded-2xl p-6 border border-[#560F28]/20 mb-8"
          >
            <h3 className="text-xl font-bold mb-4">Add Participant Signup</h3>
            {submitError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {submitError}
              </div>
            )}
            <form onSubmit={handleAddSignup} className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Participant Name"
                value={newSignup.participant_name}
                onChange={(e) => setNewSignup({ ...newSignup, participant_name: e.target.value })}
                required
                disabled={submitting}
                className="px-4 py-3 bg-transparent/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              />
              <input
                type="email"
                placeholder="Participant Email"
                value={newSignup.participant_email}
                onChange={(e) => setNewSignup({ ...newSignup, participant_email: e.target.value })}
                required
                disabled={submitting}
                className="px-4 py-3 bg-transparent/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              />
              <input
                type="tel"
                placeholder="Participant Phone"
                value={newSignup.participant_phone}
                onChange={(e) => setNewSignup({ ...newSignup, participant_phone: e.target.value })}
                disabled={submitting}
                className="px-4 py-3 bg-transparent/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              />
              <input
                type="text"
                placeholder="Participant College"
                value={newSignup.participant_college}
                onChange={(e) => setNewSignup({ ...newSignup, participant_college: e.target.value })}
                disabled={submitting}
                className="px-4 py-3 bg-transparent/5 border border-white/10 rounded-xl focus:border-[#560F28] focus:outline-none text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              />
              <button
                type="submit"
                disabled={submitting}
                className="md:col-span-2 py-3 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  'Add Signup'
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* Signups List */}
        <div className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] rounded-2xl p-6 border border-[#560F28]/20">
          <h3 className="text-xl font-bold mb-4">Your Referrals ({signups.length})</h3>
          {signups.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No signups yet. Start promoting AAYAM!</p>
          ) : (
            <div className="space-y-3">
              {signups.map((signup) => (
                <div
                  key={signup.id}
                  className="flex justify-between items-center p-4 bg-transparent/5 rounded-xl hover:bg-transparent/10 transition-colors"
                >
                  <div>
                    <p className="font-semibold">{signup.participant_name}</p>
                    <p className="text-sm text-gray-400">{signup.participant_email}</p>
                    {signup.participant_college && (
                      <p className="text-xs text-gray-500">{signup.participant_college}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {new Date(signup.registered_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </div>
  );
}
