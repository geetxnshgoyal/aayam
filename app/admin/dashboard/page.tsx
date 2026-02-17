'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiClock, HiTrendingUp, HiUsers, HiUserGroup, HiLogout } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';

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
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all' | 'signups'>('pending');

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
    }
  };

  const handleReject = async (ambassadorId: string) => {
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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_id');
    router.push('/admin/login');
  };

  const filteredAmbassadors = ambassadors.filter(a => {
    if (activeTab === 'pending') return a.status === 'pending';
    if (activeTab === 'approved') return a.status === 'approved';
    return true;
  });

  const getTierBadge = (tier: string) => {
    const colors = {
      bronze: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      silver: 'bg-gray-400/20 text-gray-300 border-gray-400/30',
      gold: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      platinum: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      none: 'bg-gray-600/20 text-gray-500 border-gray-600/30',
    };
    return colors[tier as keyof typeof colors] || colors.none;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B16] text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B16] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors"
          >
            <HiLogout /> Logout
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] p-6 rounded-2xl border border-[#560F28]/20">
              <div className="flex items-center gap-3 mb-2">
                <HiUsers className="w-8 h-8 text-[var(--dc1426)]" />
                <h3 className="text-gray-400 text-sm">Total Ambassadors</h3>
              </div>
              <p className="text-3xl font-bold">{stats.totalAmbassadors}</p>
            </div>

            <div className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] p-6 rounded-2xl border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-2">
                <HiClock className="w-8 h-8 text-yellow-400" />
                <h3 className="text-gray-400 text-sm">Pending Approval</h3>
              </div>
              <p className="text-3xl font-bold">{stats.pendingAmbassadors}</p>
            </div>

            <div className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] p-6 rounded-2xl border border-green-500/20">
              <div className="flex items-center gap-3 mb-2">
                <HiCheckCircle className="w-8 h-8 text-green-400" />
                <h3 className="text-gray-400 text-sm">Approved</h3>
              </div>
              <p className="text-3xl font-bold">{stats.approvedAmbassadors}</p>
            </div>

            <div className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] p-6 rounded-2xl border border-purple-500/20">
              <div className="flex items-center gap-3 mb-2">
                <HiTrendingUp className="w-8 h-8 text-purple-400" />
                <h3 className="text-gray-400 text-sm">Total Signups</h3>
              </div>
              <p className="text-3xl font-bold">{stats.totalSignups}</p>
            </div>
          </div>
        )}

        {/* Tier Distribution */}
        {stats && (
          <div className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] p-6 rounded-2xl border border-[#560F28]/20 mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaTrophy className="text-yellow-400" />
              Tier Distribution
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{stats.tierDistribution.bronze}</div>
                <div className="text-sm text-gray-400">Bronze</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-300">{stats.tierDistribution.silver}</div>
                <div className="text-sm text-gray-400">Silver</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.tierDistribution.gold}</div>
                <div className="text-sm text-gray-400">Gold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.tierDistribution.platinum}</div>
                <div className="text-sm text-gray-400">Platinum</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['pending', 'approved', 'all', 'signups'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Ambassadors Table */}
        {activeTab !== 'signups' && (
          <div className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] rounded-2xl border border-[#560F28]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">College</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Referral Code</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Signups</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Tier</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                    {activeTab === 'pending' && (
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredAmbassadors.map((ambassador) => (
                    <tr key={ambassador.id} className="border-t border-white/5 hover:bg-white/5">
                      <td className="px-6 py-4">{ambassador.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{ambassador.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{ambassador.college}</td>
                      <td className="px-6 py-4 font-mono text-sm text-[var(--dc1426)]">{ambassador.referral_code}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold">{ambassador.signup_count}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTierBadge(ambassador.tier)}`}>
                          {ambassador.tier.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ambassador.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                          ambassador.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {ambassador.status}
                        </span>
                      </td>
                      {activeTab === 'pending' && (
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(ambassador.id)}
                              className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <HiCheckCircle className="w-5 h-5 text-green-400" />
                            </button>
                            <button
                              onClick={() => handleReject(ambassador.id)}
                              className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <HiXCircle className="w-5 h-5 text-red-400" />
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

        {/* Signups Table */}
        {activeTab === 'signups' && (
          <div className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] rounded-2xl border border-[#560F28]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Participant</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">College</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Ambassador</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Referral Code</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.map((signup) => (
                    <tr key={signup.id} className="border-t border-white/5 hover:bg-white/5">
                      <td className="px-6 py-4">{signup.participant_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{signup.participant_email}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{signup.participant_college}</td>
                      <td className="px-6 py-4 text-sm">{signup.ambassadors?.name || 'N/A'}</td>
                      <td className="px-6 py-4 font-mono text-sm text-[var(--dc1426)]">
                        {signup.ambassadors?.referral_code || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(signup.registered_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
