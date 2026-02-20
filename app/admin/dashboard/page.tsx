'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiClock, HiTrendingUp, HiUsers, HiUserGroup, HiLogout } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import LoadingSpinner from '@/components/LoadingSpinner';
import Magnetic from '@/components/Magnetic';
import TextEncrypt from '@/components/TextEncrypt';

interface Ambassador {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  referral_code: string;
  status: 'pending' | 'approved' | 'rejected';
  signup_count: number;
  tier: 'none' | 'bronze' | 'silver' | 'gold' | 'platinum';
  created_at: string;
}

interface Signup {
  id: string;
  ambassador_id: string;
  participant_name: string;
  participant_email: string;
  participant_phone: string;
  participant_college: string;
  registered_at: string;
  status?: 'pending' | 'approved' | 'rejected';
  ambassadors?: {
    name: string;
    referral_code: string;
  };
}

interface Stats {
  totalAmbassadors: number;
  pendingAmbassadors: number;
  approvedAmbassadors: number;
  rejectedAmbassadors: number;
  totalSignups: number;
  tierDistribution: {
    bronze: number;
    silver: number;
    gold: number;
    platinum: number;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all' | 'signups' | 'signupPending' | 'bulkUpload'>('pending');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAmbassadors(data.ambassadors);
        setSignups(data.signups);
        setStats(data.stats);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (ambassadorId: string) => {
    setLoadingAction(`approve-${ambassadorId}`);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/approve-ambassador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ambassadorId, status: 'approved' }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error approving ambassador:', error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleReject = async (ambassadorId: string) => {
    setLoadingAction(`reject-${ambassadorId}`);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/approve-ambassador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ambassadorId, status: 'rejected' }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error rejecting ambassador:', error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_id');
    router.push('/admin/login');
  };

  const handleApproveSignup = async (signupId: string) => {
    setLoadingAction(`approve-signup-${signupId}`);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/approve-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ signupId, status: 'approved' }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error approving signup:', error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRejectSignup = async (signupId: string) => {
    setLoadingAction(`reject-signup-${signupId}`);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/approve-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ signupId, status: 'rejected' }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error rejecting signup:', error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleBulkUpload = async () => {
    if (!uploadFile) {
      alert('METADATA_MISSING: Select a source file.');
      return;
    }

    try {
      const text = await uploadFile.text();
      const lines = text.split('\n').filter(line => line.trim());

      const bulkSignups = lines.slice(1).map(line => {
        const parts = line.split(',').map(p => p.trim());
        return {
          referral_code: parts[0],
          participant_name: parts[1],
          participant_email: parts[2],
          participant_phone: parts[3] || '',
          participant_college: parts[4] || '',
        };
      });

      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/bulk-upload-signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ signups: bulkSignups }),
      });

      if (response.ok) {
        const result = await response.json();
        setUploadResult(result);
        fetchData();
      }
    } catch (error) {
      console.error('Error uploading CSV:', error);
    }
  };

  const filteredAmbassadors = ambassadors.filter(a => {
    if (activeTab === 'pending') return a.status === 'pending';
    if (activeTab === 'approved') return a.status === 'approved';
    return true;
  });

  const filteredSignups = signups.filter(s => {
    if (activeTab === 'signupPending') return s.status === 'pending';
    if (activeTab === 'signups') return s.status === 'approved';
    return true;
  });

  const getTierBadge = (tier: string) => {
    const colors = {
      bronze: 'bg-orange-500/20 text-orange-400 border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]',
      silver: 'bg-gray-400/20 text-gray-300 border-gray-400/30 shadow-[0_0_10px_rgba(156,163,175,0.1)]',
      gold: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.1)]',
      platinum: 'bg-purple-500/20 text-purple-400 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.1)]',
      none: 'bg-transparent/5 text-gray-500 border-white/10',
    };
    return colors[tier as keyof typeof colors] || colors.none;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent text-white flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-6">
          <LoadingSpinner size="lg" color="white" />
          <div className="text-xl tracking-[0.4em] uppercase animate-pulse">Synchronizing_With_Core...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-32 relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-7xl font-display font-black text-white tracking-tighter uppercase leading-none">
              <TextEncrypt text="COMMAND_CENTER" />
            </h1>
            <p className="text-gray-500 font-mono text-xs mt-4 tracking-[0.4em] uppercase">Status: Connected_To_Mainframe</p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic>
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-8 py-4 bg-transparent/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-2xl transition-all duration-500 group"
              >
                <HiLogout className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:rotate-12 transition-transform" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-gray-400 group-hover:text-red-500 transition-colors">Terminate_Override</span>
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* High-Level Metrics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { label: 'TOTAL_OPERATIVES', value: stats.totalAmbassadors, icon: HiUsers, color: 'var(--horror-magenta)' },
              { label: 'PENDING_CLEARANCE', value: stats.pendingAmbassadors, icon: HiClock, color: 'var(--horror-cyan)' },
              { label: 'AUTHORIZED_NODES', value: stats.approvedAmbassadors, icon: HiCheckCircle, color: '#4ade80' },
              { label: 'SIGNAL_PROPAGATION', value: stats.totalSignups, icon: HiTrendingUp, color: '#a855f7' },
            ].map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-[#050508]/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all">
                  <metric.icon className="w-20 h-20" style={{ color: metric.color }} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                  <h3 className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{metric.label}</h3>
                </div>
                <p className="text-4xl font-black text-white tracking-tighter">{metric.value}</p>
                <div className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to r, transparent, ${metric.color}, transparent)` }} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Tier Distribution & Analytics */}
        {stats && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-[#050508]/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 mb-20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 font-mono text-white/5 text-[10rem] font-black pointer-events-none select-none">
              TIERS
            </div>

            <div className="flex items-center gap-6 mb-12">
              <div className="w-12 h-1 bg-[var(--horror-magenta)] rounded-full shadow-[0_0_15px_var(--horror-magenta)]" />
              <h3 className="text-3xl font-display font-bold text-white uppercase tracking-widest">Global_Hierarchy</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'BRONZE', value: stats.tierDistribution.bronze, color: 'text-orange-400' },
                { label: 'SILVER', value: stats.tierDistribution.silver, color: 'text-gray-300' },
                { label: 'GOLD', value: stats.tierDistribution.gold, color: 'text-yellow-500' },
                { label: 'PLATINUM', value: stats.tierDistribution.platinum, color: 'text-purple-400' },
              ].map((tier) => (
                <div key={tier.label} className="text-center group">
                  <div className={`text-5xl font-black mb-2 tracking-tighter ${tier.color} group-hover:scale-110 transition-transform duration-500`}>
                    {tier.value}
                  </div>
                  <div className="text-gray-500 font-mono text-[10px] tracking-[0.3em] font-bold">{tier.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tabs - Protocol Selection */}
        <div className="flex gap-4 mb-12 flex-wrap justify-center md:justify-start">
          {[
            { key: 'pending', label: 'PENDING_OPERATIVES' },
            { key: 'approved', label: 'AUTHORIZED_NODES' },
            { key: 'signups', label: 'PROPAGATION_LOGS' },
            { key: 'signupPending', label: 'PENDING_SIGNUPS' },
            { key: 'bulkUpload', label: 'METADATA_DISPATCH' },
          ].map((tab) => (
            <Magnetic key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-8 py-4 rounded-2xl font-mono text-[10px] font-black tracking-[0.2em] transition-all duration-500 border ${activeTab === tab.key
                  ? 'bg-[var(--horror-magenta)] text-white border-[var(--horror-magenta)] shadow-[0_0_20px_var(--horror-magenta)]/30 scale-105'
                  : 'bg-transparent/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white'
                  }`}
              >
                {tab.label}
              </button>
            </Magnetic>
          ))}
        </div>

        {/* Data Grid / Terminal Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {!['signups', 'signupPending', 'bulkUpload'].includes(activeTab) && (
                <div className="bg-[#050508]/60 backdrop-blur-3xl rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto terminal-scrollbar">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="bg-transparent/5 border-b border-white/10 uppercase tracking-widest text-gray-500">
                          <th className="px-8 py-6">OPERATIVE_ID</th>
                          <th className="px-8 py-6">CREDENTIALS</th>
                          <th className="px-8 py-6">SECTOR</th>
                          <th className="px-8 py-6">UPLINK_CODE</th>
                          <th className="px-8 py-6">SIGNUPS</th>
                          <th className="px-8 py-6">HIERARCHY</th>
                          {activeTab === 'pending' && <th className="px-8 py-6 text-right">PROTOCOL_ACTION</th>}
                        </tr>
                      </thead>
                      <tbody className="text-gray-400">
                        {filteredAmbassadors.map((ambassador) => (
                          <tr key={ambassador.id} className="border-b border-white/5 hover:bg-transparent/5 transition-colors group">
                            <td className="px-8 py-6 text-white font-bold">{ambassador.name}</td>
                            <td className="px-8 py-6 opacity-60">
                              <div>{ambassador.email}</div>
                              <div className="text-[10px] mt-1">{ambassador.phone}</div>
                            </td>
                            <td className="px-8 py-6 opacity-60">[{ambassador.college.toUpperCase()}]</td>
                            <td className="px-8 py-6 font-black text-[var(--horror-cyan)] tracking-widest">{ambassador.referral_code}</td>
                            <td className="px-8 py-6 text-white font-black">{ambassador.signup_count}</td>
                            <td className="px-8 py-6">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black border tracking-[0.2em] ${getTierBadge(ambassador.tier)}`}>
                                {ambassador.tier.toUpperCase()}
                              </span>
                            </td>
                            {activeTab === 'pending' && (
                              <td className="px-8 py-6 text-right">
                                <div className="flex gap-4 justify-end">
                                  <button
                                    onClick={() => handleApprove(ambassador.id)}
                                    disabled={loadingAction === `approve-${ambassador.id}`}
                                    className="w-10 h-10 flex items-center justify-center bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-all text-green-500 disabled:opacity-50"
                                  >
                                    {loadingAction === `approve-${ambassador.id}` ? <LoadingSpinner size="sm" color="#22c55e" /> : <HiCheckCircle className="w-5 h-5" />}
                                  </button>
                                  <button
                                    onClick={() => handleReject(ambassador.id)}
                                    disabled={loadingAction === `reject-${ambassador.id}`}
                                    className="w-10 h-10 flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all text-red-500 disabled:opacity-50"
                                  >
                                    {loadingAction === `reject-${ambassador.id}` ? <LoadingSpinner size="sm" color="#ef4444" /> : <HiXCircle className="w-5 h-5" />}
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {(activeTab === 'signups' || activeTab === 'signupPending') && (
                <div className="bg-[#050508]/60 backdrop-blur-3xl rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto terminal-scrollbar">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="bg-transparent/5 border-b border-white/10 uppercase tracking-widest text-gray-500">
                          <th className="px-8 py-6">PARTICIPANT</th>
                          <th className="px-8 py-6">SOURCE_NODE</th>
                          <th className="px-8 py-6">OPERATIVE_LINK</th>
                          <th className="px-8 py-6">UPLINK_CODE</th>
                          <th className="px-8 py-6">STATUS</th>
                          <th className="px-8 py-6">TIME_STAMP</th>
                          {activeTab === 'signupPending' && <th className="px-8 py-6 text-right">ACTION</th>}
                        </tr>
                      </thead>
                      <tbody className="text-gray-400">
                        {filteredSignups.map((signup) => (
                          <tr key={signup.id} className="border-b border-white/5 hover:bg-transparent/5 transition-colors">
                            <td className="px-8 py-6 text-white font-bold">{signup.participant_name}</td>
                            <td className="px-8 py-6 opacity-60">{signup.participant_email}</td>
                            <td className="px-8 py-6 font-bold">{signup.ambassadors?.name || '--'}</td>
                            <td className="px-8 py-6 text-[var(--horror-magenta)] font-black tracking-widest">{signup.ambassadors?.referral_code || '--'}</td>
                            <td className="px-8 py-6">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black border tracking-[0.2em] ${signup.status === 'approved' ? 'bg-green-500/20 text-green-500 border-green-500/20' :
                                signup.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20' :
                                  'bg-red-500/20 text-red-500 border-red-500/20'
                                }`}>
                                {signup.status?.toUpperCase() || 'APPROVED'}
                              </span>
                            </td>
                            <td className="px-8 py-6 opacity-40 font-mono">[{new Date(signup.registered_at).getTime()}]</td>
                            {activeTab === 'signupPending' && (
                              <td className="px-8 py-6 text-right">
                                <div className="flex gap-4 justify-end">
                                  <button
                                    onClick={() => handleApproveSignup(signup.id)}
                                    className="w-10 h-10 flex items-center justify-center bg-green-500/10 border border-green-500/20 rounded-xl text-green-500"
                                  >
                                    <HiCheckCircle className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'bulkUpload' && (
                <div className="bg-[#050508]/60 backdrop-blur-3xl rounded-[3rem] border border-white/5 p-12 md:p-20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--horror-cyan)] to-transparent" />
                  <h2 className="text-4xl font-display font-black text-white mb-8 uppercase tracking-widest">Metadata_Dispatch</h2>

                  <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                      <div className="bg-transparent/5 border border-white/10 rounded-[2rem] p-10 font-mono text-xs leading-loose text-gray-400">
                        <h3 className="text-white font-bold mb-4 tracking-widest">CSV_SCHEMA:</h3>
                        <div className="bg-black/40 p-6 rounded-2xl mb-6 text-[var(--horror-magenta)] border border-white/5">
                          referral_code, participant_name, participant_email, phone, college
                        </div>
                        <ul className="space-y-3 opacity-60 list-disc pl-4">
                          <li>Header row is mandatory for synchronization.</li>
                          <li>Referral codes must exist in the Authorized Node list.</li>
                          <li>Duplicate emails will trigger a validation override error.</li>
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <label className="block text-gray-500 font-mono text-[10px] uppercase tracking-widest">SELECT_SOURCE_FILE</label>
                        <div className="relative group">
                          <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full px-8 py-6 bg-transparent/5 border border-white/10 group-hover:border-[var(--horror-cyan)] rounded-[1.5rem] transition-all flex items-center justify-between font-mono text-xs">
                            <span className="text-gray-400 truncate max-w-[200px]">{uploadFile ? uploadFile.name : 'UPLOAD_TERMINAL_CSV_'}</span>
                            <span className="text-[var(--horror-cyan)] font-black px-4 py-1 bg-[var(--horror-cyan)]/10 rounded-full">SELECT</span>
                          </div>
                        </div>

                        <Magnetic>
                          <button
                            onClick={handleBulkUpload}
                            disabled={!uploadFile}
                            className="w-full py-6 bg-transparent text-black font-black text-xl tracking-[0.2em] rounded-[1.5rem] hover:bg-[var(--horror-cyan)] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed uppercase"
                          >
                            Execute_Buffer
                          </button>
                        </Magnetic>
                      </div>
                    </div>

                    <AnimatePresence>
                      {uploadResult && (
                        <motion.div
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="bg-transparent/5 border border-white/10 rounded-[2.5rem] p-10"
                        >
                          <h3 className="text-white font-mono text-sm font-bold mb-8 tracking-widest uppercase border-b border-white/10 pb-4">Transmission_Results:</h3>
                          <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
                              <div className="text-gray-500 text-[9px] font-mono tracking-widest mb-1 font-bold">SUCCESSFUL</div>
                              <div className="text-4xl font-black text-green-500">{uploadResult.results.success}</div>
                            </div>
                            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                              <div className="text-gray-500 text-[9px] font-mono tracking-widest mb-1 font-bold">FAILED</div>
                              <div className="text-4xl font-black text-red-500">{uploadResult.results.failed}</div>
                            </div>
                          </div>

                          {uploadResult.results.errors.length > 0 && (
                            <div className="space-y-4">
                              <div className="text-red-500 font-mono text-[10px] font-bold tracking-widest mb-4">LOGGED_ERRORS:</div>
                              <div className="max-h-60 overflow-y-auto terminal-scrollbar space-y-3 pr-4">
                                {uploadResult.results.errors.map((err: any, idx: number) => (
                                  <div key={idx} className="bg-transparent/5 border-l-2 border-red-500 p-4 font-mono text-[9px] leading-relaxed">
                                    <div className="text-white font-bold mb-1">Row {err.row}: {err.error}</div>
                                    <div className="opacity-40">{JSON.stringify(err.data)}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Table Scanline Effect */}
          <div className="absolute inset-0 scanline-effect opacity-10 pointer-events-none rounded-[3rem]" />
        </div>
      </div>
    </div>
  );
}
