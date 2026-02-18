'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiClock, HiTrendingUp, HiUsers, HiUserGroup, HiLogout } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import LoadingSpinner from '@/components/LoadingSpinner';

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
      alert('Please select a CSV file');
      return;
    }

    try {
      const text = await uploadFile.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      // Parse CSV (assuming: referral_code, participant_name, participant_email, participant_phone, participant_college)
      const signups = lines.slice(1).map(line => {
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
        body: JSON.stringify({ signups }),
      });

      if (response.ok) {
        const result = await response.json();
        setUploadResult(result);
        fetchData();
        alert(`Upload complete! ${result.results.success} successful, ${result.results.failed} failed`);
      }
    } catch (error) {
      console.error('Error uploading CSV:', error);
      alert('Failed to upload CSV');
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
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: 'pending', label: 'Pending Ambassadors' },
            { key: 'approved', label: 'Approved Ambassadors' },
            { key: 'all', label: 'All Ambassadors' },
            { key: 'signupPending', label: 'Pending Signups' },
            { key: 'signups', label: 'Approved Signups' },
            { key: 'bulkUpload', label: 'Bulk Upload' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Ambassadors Table */}
        {!['signups', 'signupPending', 'bulkUpload'].includes(activeTab) && (
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
                              disabled={loadingAction === `approve-${ambassador.id}`}
                              className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-10"
                              title="Approve"
                            >
                              {loadingAction === `approve-${ambassador.id}` ? (
                                <LoadingSpinner size="sm" color="#4ade80" />
                              ) : (
                                <HiCheckCircle className="w-5 h-5 text-green-400" />
                              )}
                            </button>
                            <button
                              onClick={() => handleReject(ambassador.id)}
                              disabled={loadingAction === `reject-${ambassador.id}`}
                              className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-10"
                              title="Reject"
                            >
                              {loadingAction === `reject-${ambassador.id}` ? (
                                <LoadingSpinner size="sm" color="#f87171" />
                              ) : (
                                <HiXCircle className="w-5 h-5 text-red-400" />
                              )}
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

        {/* Signups Tables */}
        {(activeTab === 'signups' || activeTab === 'signupPending') && (
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Registered</th>
                    {activeTab === 'signupPending' && (
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredSignups.map((signup) => (
                    <tr key={signup.id} className="border-t border-white/5 hover:bg-white/5">
                      <td className="px-6 py-4">{signup.participant_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{signup.participant_email}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{signup.participant_college}</td>
                      <td className="px-6 py-4 text-sm">{signup.ambassadors?.name || 'N/A'}</td>
                      <td className="px-6 py-4 font-mono text-sm text-[var(--dc1426)]">
                        {signup.ambassadors?.referral_code || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          signup.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                          signup.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {signup.status || 'approved'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(signup.registered_at).toLocaleDateString()}
                      </td>
                      {activeTab === 'signupPending' && (
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApproveSignup(signup.id)}
                              disabled={loadingAction === `approve-signup-${signup.id}`}
                              className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-10"
                              title="Approve"
                            >
                              {loadingAction === `approve-signup-${signup.id}` ? (
                                <LoadingSpinner size="sm" color="#4ade80" />
                              ) : (
                                <HiCheckCircle className="w-5 h-5 text-green-400" />
                              )}
                            </button>
                            <button
                              onClick={() => handleRejectSignup(signup.id)}
                              disabled={loadingAction === `reject-signup-${signup.id}`}
                              className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-10"
                              title="Reject"
                            >
                              {loadingAction === `reject-signup-${signup.id}` ? (
                                <LoadingSpinner size="sm" color="#f87171" />
                              ) : (
                                <HiXCircle className="w-5 h-5 text-red-400" />
                              )}
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

        {/* Bulk Upload */}
        {activeTab === 'bulkUpload' && (
          <div className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] rounded-2xl border border-[#560F28]/20 p-8">
            <h2 className="text-2xl font-bold mb-6">Bulk Upload Signups from CSV</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">CSV Format Required:</h3>
              <div className="bg-black/30 p-4 rounded font-mono text-sm text-gray-300 mb-4">
                <div>referral_code,participant_name,participant_email,participant_phone,participant_college</div>
                <div className="text-gray-500">AAYAM123456,John Doe,john@email.com,9876543210,ABC College</div>
                <div className="text-gray-500">AAYAM789012,Jane Smith,jane@email.com,8765432109,XYZ University</div>
              </div>
              <p className="text-sm text-gray-400">
                • First row should be header<br/>
                • Referral codes must belong to approved ambassadors<br/>
                • Email addresses must be unique<br/>
                • Phone and college are optional
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Select CSV File</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[var(--energy)]"
                />
              </div>

              <button
                onClick={handleBulkUpload}
                disabled={!uploadFile}
                className="px-8 py-4 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload and Process
              </button>

              {uploadResult && (
                <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Upload Results</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <p className="text-sm text-gray-400">Successful</p>
                      <p className="text-3xl font-bold text-green-400">{uploadResult.results.success}</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <p className="text-sm text-gray-400">Failed</p>
                      <p className="text-3xl font-bold text-red-400">{uploadResult.results.failed}</p>
                    </div>
                  </div>

                  {uploadResult.results.errors.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-red-400">Errors:</h4>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {uploadResult.results.errors.map((err: any, idx: number) => (
                          <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded p-3 text-sm">
                            <p className="font-semibold">Row {err.row}: {err.error}</p>
                            <p className="text-gray-400 text-xs mt-1">{JSON.stringify(err.data)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
