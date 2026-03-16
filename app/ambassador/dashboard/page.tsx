'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiUsers, HiClipboardCopy, HiPlus, HiLogout, HiTrendingUp, HiStar } from 'react-icons/hi';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import LoadingSpinner from '@/components/LoadingSpinner';
import Tasks from '@/components/Tasks';

function getAmbassadorToken(): string | null {
  try {
    return localStorage.getItem('ambassador_token') ?? sessionStorage.getItem('ambassador_token');
  } catch {
    try {
      return sessionStorage.getItem('ambassador_token');
    } catch {
      return null;
    }
  }
}

function clearAmbassadorSession(): void {
  try {
    localStorage.removeItem('ambassador_token');
    localStorage.removeItem('ambassador_id');
  } catch {}
  try {
    sessionStorage.removeItem('ambassador_token');
    sessionStorage.removeItem('ambassador_id');
  } catch {}
}

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
    const tokenFromStorage = getAmbassadorToken();
    if (!tokenFromStorage) {
      router.push('/ambassador/login');
      return;
    }
    setToken(tokenFromStorage);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = getAmbassadorToken();
      if (!token) {
        router.push('/ambassador/login');
        return;
      }
      const response = await fetch('/api/ambassador/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setAmbassador(data.ambassador);
        setSignups(data.signups || []);
      } else {
        clearAmbassadorSession();
        router.push('/ambassador/login');
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      clearAmbassadorSession();
      router.push('/ambassador/login');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    const token = getAmbassadorToken();

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

  const handleLogout = async () => {
    clearAmbassadorSession();
    try {
      await fetch('/api/ambassador/logout', { method: 'POST', credentials: 'include' });
    } catch {}
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
      <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <LoadingSpinner size="lg" color="white" />
          <p className="text-[var(--accent-cyan)] font-mono text-sm tracking-[0.3em] uppercase">Syncing_Data_Stream...</p>
        </div>
      </div>
    );
  }

  if (!ambassador) {
    return (
      <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--text-muted)] font-mono mb-4">Session expired or invalid.</p>
          <button
            onClick={() => router.push('/ambassador/login')}
            className="px-6 py-3 bg-[var(--accent-primary)] border-2 border-[var(--accent-yellow)] text-[var(--ink)] font-black rounded-xl"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const tierInfo = getTierInfo(ambassador.tier);
  const progress = ambassador.tier === 'platinum' ? 100 : (ambassador.signup_count % 100);

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-white pt-28 pb-20 relative overflow-hidden">
      {/* COMICO halftone bg */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] halftone-dots" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[var(--accent-cyan)]/5 via-transparent to-[var(--accent-magenta)]/5" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative"
          >
            <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] mb-4" />
            <h1 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight">
              <span className="whitespace-nowrap">Welcome, <span className="bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-magenta)] to-[var(--accent-orange)] bg-clip-text text-transparent">{ambassador.name}</span></span>
            </h1>
            <p className="text-[var(--text-muted)] font-mono text-sm mt-2 tracking-widest">{ambassador.college}</p>
          </motion.div>
          <motion.button
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--bg-elevated)] border-2 border-[var(--accent-red)] rounded-xl hover:bg-[var(--accent-red)]/20 transition-all font-mono text-xs tracking-widest uppercase shadow-[4px_4px_0_var(--ink)]"
          >
            <HiLogout className="w-5 h-5" />
            Terminate
          </motion.button>
        </div>

        {/* Stats Cards - COMICO panels */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[var(--bg-card)] rounded-2xl p-6 border-2 border-[var(--accent-yellow)] shadow-[8px_8px_0_var(--accent-magenta)] hover:shadow-[6px_6px_0_var(--accent-cyan)] transition-shadow"
          >
            <HiClipboardCopy className="w-10 h-10 mb-4 text-[var(--accent-cyan)]" />
            <h3 className="text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-[0.3em]">Your Referral Code</h3>
            <div className="flex items-center justify-between gap-4">
              <p className="text-2xl font-black font-mono tracking-wider text-[var(--accent-yellow)]">{ambassador.referral_code}</p>
              <button
                onClick={copyReferralCode}
                className="px-4 py-2 bg-[var(--accent-primary)] border-2 border-[var(--accent-yellow)] text-[var(--ink)] font-black text-xs uppercase rounded-lg hover:bg-[var(--accent-primary-hover)] shadow-[4px_4px_0_var(--accent-magenta)] transition-all shrink-0"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--bg-card)] rounded-2xl p-6 border-2 border-[var(--accent-magenta)] shadow-[8px_8px_0_var(--accent-cyan)]"
          >
            <HiUsers className="w-10 h-10 mb-4 text-[var(--accent-magenta)]" />
            <h3 className="text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-[0.3em]">Total Signups</h3>
            <p className="text-5xl font-black text-[var(--accent-teal)]">{ambassador.signup_count}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--bg-card)] rounded-2xl p-6 border-2 border-[var(--accent-orange)] shadow-[8px_8px_0_var(--accent-yellow)]"
          >
            <tierInfo.icon className="w-10 h-10 mb-4 text-[var(--accent-orange)]" />
            <h3 className="text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-[0.3em]">Current Tier</h3>
            <p className="text-3xl font-black text-white">{tierInfo.name}</p>
            <p className="text-xs text-[var(--text-muted)] mt-2 font-mono">Next: {tierInfo.next}</p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--bg-card)] rounded-2xl p-6 border-2 border-[var(--border-accent)] mb-10"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-mono font-bold uppercase tracking-widest">Progress to Next Tier</h3>
            <span className="text-sm text-[var(--text-muted)] font-mono">{ambassador.signup_count} signups</span>
          </div>
          <div className="w-full bg-[var(--bg-deep)] rounded-full h-3 overflow-hidden border border-[var(--border-subtle)]">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab('signups')}
            className={`px-6 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-widest transition-all border-2 ${
              activeTab === 'signups'
                ? 'bg-[var(--accent-magenta)] border-[var(--accent-magenta)] text-white shadow-[6px_6px_0_var(--accent-cyan)]'
                : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-cyan)] hover:text-white'
            }`}
          >
            <HiUsers className="inline mr-2 w-5 h-5" />
            Signups
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-6 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-widest transition-all border-2 ${
              activeTab === 'tasks'
                ? 'bg-[var(--accent-magenta)] border-[var(--accent-magenta)] text-white shadow-[6px_6px_0_var(--accent-cyan)]'
                : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-cyan)] hover:text-white'
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
                className="flex items-center gap-2 px-8 py-4 bg-[var(--accent-primary)] border-2 border-[var(--accent-yellow)] text-[var(--ink)] font-black font-mono text-sm uppercase tracking-widest rounded-xl hover:bg-[var(--accent-primary-hover)] shadow-[6px_6px_0_var(--accent-magenta)] hover:shadow-[4px_4px_0_var(--accent-magenta)] transition-all"
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
            className="bg-[var(--bg-card)] rounded-2xl p-8 border-2 border-[var(--accent-cyan)] shadow-[8px_8px_0_var(--accent-magenta)] mb-8"
          >
            <h3 className="text-lg font-mono font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[var(--accent-cyan)]" />
              Add Participant Signup
            </h3>
            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-[var(--accent-red)]/10 border-2 border-[var(--accent-red)]/50 text-[var(--accent-red)] font-mono text-sm">
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
                className="px-4 py-3 bg-[var(--bg-deep)] border-2 border-[var(--border-subtle)] rounded-xl focus:border-[var(--accent-cyan)] focus:outline-none text-white font-mono disabled:opacity-50 transition-colors"
              />
              <input
                type="email"
                placeholder="Participant Email"
                value={newSignup.participant_email}
                onChange={(e) => setNewSignup({ ...newSignup, participant_email: e.target.value })}
                required
                disabled={submitting}
                className="px-4 py-3 bg-[var(--bg-deep)] border-2 border-[var(--border-subtle)] rounded-xl focus:border-[var(--accent-cyan)] focus:outline-none text-white font-mono disabled:opacity-50 transition-colors"
              />
              <input
                type="tel"
                placeholder="Participant Phone"
                value={newSignup.participant_phone}
                onChange={(e) => setNewSignup({ ...newSignup, participant_phone: e.target.value })}
                disabled={submitting}
                className="px-4 py-3 bg-[var(--bg-deep)] border-2 border-[var(--border-subtle)] rounded-xl focus:border-[var(--accent-cyan)] focus:outline-none text-white font-mono disabled:opacity-50 transition-colors"
              />
              <input
                type="text"
                placeholder="Participant College"
                value={newSignup.participant_college}
                onChange={(e) => setNewSignup({ ...newSignup, participant_college: e.target.value })}
                disabled={submitting}
                className="px-4 py-3 bg-[var(--bg-deep)] border-2 border-[var(--border-subtle)] rounded-xl focus:border-[var(--accent-cyan)] focus:outline-none text-white font-mono disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="md:col-span-2 py-4 bg-[var(--accent-primary)] border-2 border-[var(--accent-yellow)] text-[var(--ink)] font-black font-mono uppercase tracking-widest rounded-xl hover:bg-[var(--accent-primary-hover)] shadow-[6px_6px_0_var(--accent-magenta)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
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
        <div className="bg-[var(--bg-card)] rounded-2xl p-8 border-2 border-[var(--accent-yellow)] shadow-[8px_8px_0_var(--accent-magenta)]">
          <h3 className="text-lg font-mono font-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-[var(--accent-yellow)]" />
            Your Referrals ({signups.length})
          </h3>
          {signups.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-[var(--border-subtle)] rounded-xl">
              <HiUsers className="w-16 h-16 mx-auto text-[var(--text-muted)]/50 mb-4" />
              <p className="text-[var(--text-muted)] font-mono text-sm">No signups yet. Start promoting AAYAM!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {signups.map((signup) => (
                <div
                  key={signup.id}
                  className="flex justify-between items-center p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-colors"
                >
                  <div>
                    <p className="font-bold text-white">{signup.participant_name}</p>
                    <p className="text-sm text-[var(--text-muted)]">{signup.participant_email}</p>
                    {signup.participant_college && (
                      <p className="text-xs text-[var(--text-muted)]/80 font-mono">{signup.participant_college}</p>
                    )}
                  </div>
                  <div className="text-right font-mono text-xs text-[var(--text-muted)]">
                    {new Date(signup.registered_at).toLocaleDateString()}
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
