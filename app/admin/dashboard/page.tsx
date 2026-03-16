'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiClock, HiTrendingUp, HiUsers, HiLogout, HiPlus } from 'react-icons/hi';
import LoadingSpinner from '@/components/LoadingSpinner';

function getAdminToken(): string | null {
  try {
    return localStorage.getItem('admin_token') ?? sessionStorage.getItem('admin_token');
  } catch {
    try {
      return sessionStorage.getItem('admin_token');
    } catch {
      return null;
    }
  }
}

function clearAdminSession(): void {
  try {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_id');
  } catch {}
  try {
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_id');
  } catch {}
}

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

interface Task {
  id: string;
  name: string;
  description?: string;
  instructions?: string;
  submission_proof?: string;
  points_criteria?: string;
  example_caption?: string;
  points_min: number;
  points_max: number;
  required_proof: 'link' | 'screenshot' | 'video' | 'text';
  active: boolean;
  created_at: string;
}

interface TaskSubmission {
  id: string;
  ambassador_id: string;
  task_id: string;
  proof_link?: string;
  proof_screenshot?: string;
  status: 'pending' | 'approved' | 'rejected';
  points_awarded?: number;
  submitted_at: string;
  task?: Task;
  ambassador?: { name: string; email: string };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'all' | 'signups' | 'signupPending' | 'bulkUpload' | 'tasks' | 'taskSubmissions'>('pending');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<{ results: { success: number; failed: number; errors: { row: number; error: string }[] } } | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskSubmissions, setTaskSubmissions] = useState<(TaskSubmission & { task?: Task; ambassador?: { name: string; email: string } })[]>([]);
  const [taskSubmissionsLoading, setTaskSubmissionsLoading] = useState(false);
  const [taskSubmissionsError, setTaskSubmissionsError] = useState<string | null>(null);
  const [taskForm, setTaskForm] = useState<{
    name: string;
    description: string;
    instructions: string;
    submission_proof: string;
    points_criteria: string;
    example_caption: string;
    points_min: number;
    points_max: number;
    required_proof: Task['required_proof'];
    active: boolean;
  }>({
    name: '',
    description: '',
    instructions: '',
    submission_proof: '',
    points_criteria: '',
    example_caption: '',
    points_min: 10,
    points_max: 50,
    required_proof: 'link',
    active: true,
  });

  useEffect(() => {
    void fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeTab === 'tasks') fetchTasks();
    if (activeTab === 'taskSubmissions') fetchTaskSubmissions();
  }, [activeTab]);

  const fetchTaskSubmissions = async () => {
    setTaskSubmissionsLoading(true);
    setTaskSubmissionsError(null);
    try {
      const token = getAdminToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/admin/task-submissions', { headers, credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setTaskSubmissions(data.submissions || []);
      } else {
        setTaskSubmissionsError(data.error || 'Failed to load submissions');
      }
    } catch (e) {
      console.error('Error fetching task submissions:', e);
      setTaskSubmissionsError('Failed to load submissions');
    } finally {
      setTaskSubmissionsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const token = getAdminToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch('/api/admin/dashboard', {
        headers,
        credentials: 'include',
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

  const fetchTasks = async () => {
    try {
      const token = getAdminToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/admin/tasks', { headers, credentials: 'include' });
      if (res.ok) {
        const { tasks: t } = await res.json();
        setTasks(t || []);
      }
    } catch (e) {
      console.error('Error fetching tasks:', e);
    }
  };

  const handleCreateTask = async () => {
    if (!taskForm.name.trim()) {
      alert('Task name is required');
      return;
    }
    setLoadingAction('create-task');
    try {
      const token = getAdminToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/admin/tasks', {
        method: 'POST',
        headers,
        body: JSON.stringify(taskForm),
        credentials: 'include',
      });
      if (res.ok) {
        setTaskForm({ name: '', description: '', instructions: '', submission_proof: '', points_criteria: '', example_caption: '', points_min: 10, points_max: 50, required_proof: 'link', active: true });
        fetchTasks();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create task');
      }
    } catch (e) {
      console.error('Error creating task:', e);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleToggleTaskActive = async (id: string, active: boolean) => {
    setLoadingAction(`toggle-${id}`);
    try {
      const token = getAdminToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/admin/tasks', {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ id, active }),
        credentials: 'include',
      });
      if (res.ok) fetchTasks();
    } catch (e) {
      console.error('Error updating task:', e);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleApprove = async (ambassadorId: string) => {
    setLoadingAction(`approve-${ambassadorId}`);
    try {
      const token = getAdminToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch('/api/admin/approve-ambassador', {
        method: 'POST',
        headers,
        body: JSON.stringify({ ambassadorId, status: 'approved' }),
        credentials: 'include',
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
      const token = getAdminToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch('/api/admin/approve-ambassador', {
        method: 'POST',
        headers,
        body: JSON.stringify({ ambassadorId, status: 'rejected' }),
        credentials: 'include',
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

  const handleLogout = async () => {
    clearAdminSession();
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    } catch {}
    router.push('/admin/login');
  };

  const handleApproveSignup = async (signupId: string) => {
    setLoadingAction(`approve-signup-${signupId}`);
    try {
      const token = getAdminToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch('/api/admin/approve-signup', {
        method: 'POST',
        headers,
        body: JSON.stringify({ signupId, status: 'approved' }),
        credentials: 'include',
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

      const token = getAdminToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch('/api/admin/bulk-upload-signups', {
        method: 'POST',
        headers,
        body: JSON.stringify({ signups: bulkSignups }),
        credentials: 'include',
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

  const [submissionPoints, setSubmissionPoints] = useState<Record<string, string>>({});

  const handleReviewSubmission = async (submissionId: string, status: 'approved' | 'rejected') => {
    const pointsStr = submissionPoints[submissionId];
    if (status === 'approved' && (!pointsStr || pointsStr.trim() === '')) {
      alert('Enter points to award when approving.');
      return;
    }
    const pointsAwarded = status === 'approved' ? Math.max(0, Math.min(1000, parseInt(pointsStr, 10) || 0)) : undefined;
    setLoadingAction(`review-${submissionId}`);
    try {
      const token = getAdminToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/admin/task-submissions', {
        method: 'POST',
        headers,
        body: JSON.stringify({ submissionId, status, pointsAwarded }),
        credentials: 'include',
      });
      if (res.ok) {
        setSubmissionPoints((p) => ({ ...p, [submissionId]: '' }));
        fetchTaskSubmissions();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to review submission');
      }
    } catch (e) {
      console.error('Error reviewing submission:', e);
    } finally {
      setLoadingAction(null);
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
      none: 'bg-white/5 text-slate-400 border-white/15',
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
              COMMAND_CENTER
            </h1>
            <p className="text-slate-400 font-mono text-sm mt-4 tracking-[0.4em] uppercase">Status: Connected_To_Mainframe</p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-red-500/20 border border-white/15 hover:border-red-500/30 rounded-2xl transition-all duration-300 group"
            >
              <HiLogout className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:rotate-12 transition-transform" />
              <span className="font-mono text-sm font-bold tracking-widest uppercase text-slate-300 group-hover:text-red-500 transition-colors">Terminate_Override</span>
            </button>
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
                className="relative bg-[#0d0d14]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/15 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all">
                  <metric.icon className="w-20 h-20" style={{ color: metric.color }} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                  <h3 className="text-slate-300 font-mono text-xs uppercase tracking-widest">{metric.label}</h3>
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
            className="bg-[#0d0d14]/80 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/15 mb-20 relative overflow-hidden"
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
                  <div className="text-slate-300 font-mono text-xs tracking-[0.3em] font-bold">{tier.label}</div>
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
            { key: 'taskSubmissions', label: 'TASK_SUBMISSIONS' },
            { key: 'tasks', label: '+ ADD TASKS' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-8 py-4 rounded-2xl font-mono text-xs font-black tracking-[0.2em] transition-all duration-300 border ${activeTab === tab.key
                ? 'bg-[var(--horror-magenta)] text-white border-[var(--horror-magenta)] shadow-[0_0_20px_var(--horror-magenta)]/30 scale-105'
                : tab.key === 'tasks'
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50 hover:text-cyan-200 hover:bg-cyan-500/25'
                  : tab.key === 'taskSubmissions'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 hover:bg-amber-500/25'
                    : 'bg-white/5 text-slate-300 border-white/15 hover:border-white/30 hover:text-white hover:bg-white/10'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Data Grid / Terminal Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {!['signups', 'signupPending', 'bulkUpload', 'tasks', 'taskSubmissions'].includes(activeTab) && (
                <div className="bg-[#0d0d14]/90 backdrop-blur-3xl rounded-[3rem] border border-white/15 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto terminal-scrollbar">
                    <table className="w-full text-left font-mono text-sm">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/15 uppercase tracking-widest text-slate-200 text-sm">
                          <th className="px-8 py-6">OPERATIVE_ID</th>
                          <th className="px-8 py-6">CREDENTIALS</th>
                          <th className="px-8 py-6">SECTOR</th>
                          <th className="px-8 py-6">UPLINK_CODE</th>
                          <th className="px-8 py-6">SIGNUPS</th>
                          <th className="px-8 py-6">HIERARCHY</th>
                          {activeTab === 'pending' && <th className="px-8 py-6 text-right">PROTOCOL_ACTION</th>}
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        {filteredAmbassadors.map((ambassador) => (
                          <tr key={ambassador.id} className="border-b border-white/5 hover:bg-transparent/5 transition-colors group">
                            <td className="px-8 py-6 text-white font-bold">{ambassador.name}</td>
                            <td className="px-8 py-6 text-slate-400">
                              <div>{ambassador.email}</div>
                              <div className="text-xs mt-1">{ambassador.phone}</div>
                            </td>
                            <td className="px-8 py-6 text-slate-400">[{ambassador.college.toUpperCase()}]</td>
                            <td className="px-8 py-6 font-black text-[var(--horror-cyan)] tracking-widest">{ambassador.referral_code}</td>
                            <td className="px-8 py-6 text-white font-black">{ambassador.signup_count}</td>
                            <td className="px-8 py-6">
                              <span className={`px-4 py-1.5 rounded-full text-xs font-black border tracking-[0.2em] ${getTierBadge(ambassador.tier)}`}>
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
                <div className="bg-[#0d0d14]/90 backdrop-blur-3xl rounded-[3rem] border border-white/15 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto terminal-scrollbar">
                    <table className="w-full text-left font-mono text-sm">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/15 uppercase tracking-widest text-slate-200 text-sm">
                          <th className="px-8 py-6">PARTICIPANT</th>
                          <th className="px-8 py-6">SOURCE_NODE</th>
                          <th className="px-8 py-6">OPERATIVE_LINK</th>
                          <th className="px-8 py-6">UPLINK_CODE</th>
                          <th className="px-8 py-6">STATUS</th>
                          <th className="px-8 py-6">TIME_STAMP</th>
                          {activeTab === 'signupPending' && <th className="px-8 py-6 text-right">ACTION</th>}
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        {filteredSignups.map((signup) => (
                          <tr key={signup.id} className="border-b border-white/5 hover:bg-transparent/5 transition-colors">
                            <td className="px-8 py-6 text-white font-bold">{signup.participant_name}</td>
                            <td className="px-8 py-6 text-slate-400">{signup.participant_email}</td>
                            <td className="px-8 py-6 font-bold">{signup.ambassadors?.name || '--'}</td>
                            <td className="px-8 py-6 text-[var(--horror-magenta)] font-black tracking-widest">{signup.ambassadors?.referral_code || '--'}</td>
                            <td className="px-8 py-6">
                              <span className={`px-4 py-1.5 rounded-full text-xs font-black border tracking-[0.2em] ${signup.status === 'approved' ? 'bg-green-500/20 text-green-500 border-green-500/20' :
                                signup.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20' :
                                  'bg-red-500/20 text-red-500 border-red-500/20'
                                }`}>
                                {signup.status?.toUpperCase() || 'APPROVED'}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-slate-500 font-mono text-xs">[{new Date(signup.registered_at).toLocaleDateString()}]</td>
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

              {activeTab === 'taskSubmissions' && (
                <div className="bg-[#0d0d14]/90 backdrop-blur-3xl rounded-[3rem] border border-white/15 overflow-hidden shadow-2xl">
                  <div className="p-8 border-b border-white/15">
                    <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">Pending_Task_Submissions</h2>
                    <p className="text-slate-400 font-mono text-sm mt-2">Review ambassador task proofs and award points. Approved submissions auto-credit points.</p>
                  </div>
                  <div className="overflow-x-auto terminal-scrollbar">
                    {taskSubmissionsLoading ? (
                      <div className="p-16 text-center text-slate-400 font-mono flex items-center justify-center gap-3">
                        <LoadingSpinner size="sm" color="#f59e0b" />
                        Loading submissions...
                      </div>
                    ) : taskSubmissionsError ? (
                      <div className="p-16 text-center text-red-400 font-mono">{taskSubmissionsError}</div>
                    ) : taskSubmissions.length === 0 ? (
                      <div className="p-16 text-center text-slate-400 font-mono">No pending submissions.</div>
                    ) : (
                      <div className="divide-y divide-white/10">
                        {taskSubmissions.map((sub) => (
                          <div key={sub.id} className="p-8 hover:bg-white/[0.02] transition-colors">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                  <span className="text-white font-bold">{sub.ambassador?.name || 'Unknown'}</span>
                                  <span className="text-slate-500">•</span>
                                  <span className="text-slate-400 text-sm">{sub.ambassador?.email}</span>
                                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-mono">{sub.task?.name || 'Task'}</span>
                                </div>
                                {sub.proof_link && (
                                  <a href={sub.proof_link} target="_blank" rel="noopener noreferrer" className="text-[var(--horror-cyan)] hover:underline break-all text-sm">
                                    {sub.proof_link}
                                  </a>
                                )}
                                {sub.proof_screenshot && (
                                  <div className="mt-2">
                                    {sub.proof_screenshot.startsWith('data:') ? (
                                      <img src={sub.proof_screenshot} alt="Proof" className="max-w-xs max-h-32 rounded-lg border border-white/10" />
                                    ) : (
                                      <a href={sub.proof_screenshot} target="_blank" rel="noopener noreferrer" className="text-[var(--horror-cyan)] hover:underline text-sm">View screenshot</a>
                                    )}
                                  </div>
                                )}
                                <div className="text-slate-500 text-xs mt-2 font-mono">{new Date(sub.submitted_at).toLocaleString()}</div>
                                {sub.task && (
                                  <div className="mt-2 text-slate-400 text-xs">
                                    Points range: {sub.task.points_min}–{sub.task.points_max}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                                <div className="flex items-center gap-2">
                                  <label className="text-slate-400 text-xs font-mono whitespace-nowrap">Points:</label>
                                  <input
                                    type="number"
                                    min={0}
                                    max={1000}
                                    placeholder={sub.task ? `${sub.task.points_min}` : '0'}
                                    value={submissionPoints[sub.id] ?? ''}
                                    onChange={(e) => setSubmissionPoints((p) => ({ ...p, [sub.id]: e.target.value }))}
                                    className="w-24 px-3 py-2 bg-black/40 border border-white/15 rounded-lg text-white text-sm font-mono focus:border-amber-500/50 outline-none"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleReviewSubmission(sub.id, 'approved')}
                                    disabled={loadingAction === `review-${sub.id}`}
                                    className="px-5 py-2.5 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 font-mono text-sm font-bold hover:bg-green-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                                  >
                                    {loadingAction === `review-${sub.id}` ? <LoadingSpinner size="sm" color="#4ade80" /> : <HiCheckCircle className="w-4 h-4" />}
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleReviewSubmission(sub.id, 'rejected')}
                                    disabled={loadingAction === `review-${sub.id}`}
                                    className="px-5 py-2.5 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-mono text-sm font-bold hover:bg-red-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                                  >
                                    <HiXCircle className="w-4 h-4" />
                                    Reject
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'bulkUpload' && (
                <div className="bg-[#0d0d14]/90 backdrop-blur-3xl rounded-[3rem] border border-white/15 p-12 md:p-20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--horror-cyan)] to-transparent" />
                  <h2 className="text-4xl font-display font-black text-white mb-8 uppercase tracking-widest">Metadata_Dispatch</h2>

                  <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                      <div className="bg-white/5 border border-white/15 rounded-[2rem] p-10 font-mono text-sm leading-loose text-slate-300">
                        <h3 className="text-white font-bold mb-4 tracking-widest">CSV_SCHEMA:</h3>
                        <div className="bg-black/40 p-6 rounded-2xl mb-6 text-[var(--horror-magenta)] border border-white/5">
                          referral_code, participant_name, participant_email, phone, college
                        </div>
                        <ul className="space-y-3 text-slate-400 list-disc pl-4">
                          <li>Header row is mandatory for synchronization.</li>
                          <li>Referral codes must exist in the Authorized Node list.</li>
                          <li>Duplicate emails will trigger a validation override error.</li>
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <label className="block text-slate-300 font-mono text-xs uppercase tracking-widest">SELECT_SOURCE_FILE</label>
                        <div className="relative group">
                          <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full px-8 py-6 bg-white/5 border border-white/15 group-hover:border-[var(--horror-cyan)] rounded-[1.5rem] transition-all flex items-center justify-between font-mono text-sm">
                            <span className="text-slate-300 truncate max-w-[200px]">{uploadFile ? uploadFile.name : 'UPLOAD_TERMINAL_CSV_'}</span>
                            <span className="text-[var(--horror-cyan)] font-black px-4 py-1 bg-[var(--horror-cyan)]/10 rounded-full">SELECT</span>
                          </div>
                        </div>

                        <button
                          onClick={handleBulkUpload}
                          disabled={!uploadFile}
                          className="w-full py-6 bg-transparent text-black font-black text-xl tracking-[0.2em] rounded-[1.5rem] hover:bg-[var(--horror-cyan)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed uppercase"
                        >
                          Execute_Buffer
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {uploadResult && (
                        <motion.div
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="bg-white/5 border border-white/15 rounded-[2.5rem] p-10"
                        >
                          <h3 className="text-white font-mono text-sm font-bold mb-8 tracking-widest uppercase border-b border-white/15 pb-4">Transmission_Results:</h3>
                          <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
                              <div className="text-slate-300 text-xs font-mono tracking-widest mb-1 font-bold">SUCCESSFUL</div>
                              <div className="text-4xl font-black text-green-500">{uploadResult.results.success}</div>
                            </div>
                            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                              <div className="text-slate-300 text-xs font-mono tracking-widest mb-1 font-bold">FAILED</div>
                              <div className="text-4xl font-black text-red-500">{uploadResult.results.failed}</div>
                            </div>
                          </div>

                          {uploadResult.results.errors.length > 0 && (
                            <div className="space-y-4">
                              <div className="text-red-400 font-mono text-xs font-bold tracking-widest mb-4">LOGGED_ERRORS:</div>
                              <div className="max-h-60 overflow-y-auto terminal-scrollbar space-y-3 pr-4">
                                {uploadResult.results.errors.map((err: { row: number; error: string }, idx: number) => (
                                  <div key={idx} className="bg-white/5 border-l-2 border-red-500 p-4 font-mono text-xs leading-relaxed">
                                    <div className="text-white font-bold">Row {err.row}: {err.error}</div>
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

              {activeTab === 'tasks' && (
                <div className="bg-[#0d0d14]/90 backdrop-blur-3xl rounded-[3rem] border border-white/15 p-12 md:p-20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--horror-cyan)] to-transparent" />
                  <h2 className="text-4xl font-display font-black text-white mb-8 uppercase tracking-widest">Task_Protocol</h2>

                  <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                      <div className="bg-white/5 border border-white/15 rounded-[2rem] p-10 font-mono text-sm">
                        <h3 className="text-white font-bold mb-6 tracking-widest">CREATE_NEW_TASK</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-slate-300 text-xs uppercase tracking-widest mb-2">NAME</label>
                            <input
                              value={taskForm.name}
                              onChange={(e) => setTaskForm((f) => ({ ...f, name: e.target.value }))}
                              placeholder="e.g. Share on Instagram"
                              className="w-full px-6 py-4 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[var(--horror-cyan)] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-300 text-xs uppercase tracking-widest mb-2">DESCRIPTION (Brief summary)</label>
                            <input
                              value={taskForm.description}
                              onChange={(e) => setTaskForm((f) => ({ ...f, description: e.target.value }))}
                              placeholder="e.g. Promote AAYAM 2026 on your Instagram..."
                              className="w-full px-6 py-4 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[var(--horror-cyan)] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-300 text-xs uppercase tracking-widest mb-2">TASK INSTRUCTIONS (Detailed steps)</label>
                            <div className="flex gap-2 mb-2">
                              <button
                                type="button"
                                onClick={() => setTaskForm((f) => ({ ...f, instructions: (f.instructions ? f.instructions + '\n' : '') + '• ' }))}
                                className="px-3 py-1.5 text-xs font-mono bg-white/10 border border-white/20 rounded-lg text-slate-300 hover:bg-white/20"
                              >
                                • Add bullet
                              </button>
                              <button
                                type="button"
                                onClick={() => setTaskForm((f) => ({ ...f, instructions: (f.instructions ? f.instructions + '\n' : '') + '- ' }))}
                                className="px-3 py-1.5 text-xs font-mono bg-white/10 border border-white/20 rounded-lg text-slate-300 hover:bg-white/20"
                              >
                                - Add dash
                              </button>
                            </div>
                            <textarea
                              value={taskForm.instructions}
                              onChange={(e) => setTaskForm((f) => ({ ...f, instructions: e.target.value }))}
                              placeholder="Share the official poster or reel on Instagram (Story or Post/Reel). Tag @AAYAM and use #AAYAM2026..."
                              rows={5}
                              className="w-full px-6 py-4 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[var(--horror-cyan)] outline-none resize-y min-h-[120px]"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-300 text-xs uppercase tracking-widest mb-2">SUBMISSION PROOF (What to submit)</label>
                            <div className="flex gap-2 mb-2">
                              <button
                                type="button"
                                onClick={() => setTaskForm((f) => ({ ...f, submission_proof: (f.submission_proof ? f.submission_proof + '\n' : '') + '• ' }))}
                                className="px-3 py-1.5 text-xs font-mono bg-white/10 border border-white/20 rounded-lg text-slate-300 hover:bg-white/20"
                              >
                                • Add bullet
                              </button>
                            </div>
                            <textarea
                              value={taskForm.submission_proof}
                              onChange={(e) => setTaskForm((f) => ({ ...f, submission_proof: e.target.value }))}
                              placeholder="e.g. Submit the link to your Instagram post/story"
                              rows={2}
                              className="w-full px-6 py-4 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[var(--horror-cyan)] outline-none resize-y"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-300 text-xs uppercase tracking-widest mb-2">POINTS CRITERIA</label>
                            <div className="flex gap-2 mb-2">
                              <button
                                type="button"
                                onClick={() => setTaskForm((f) => ({ ...f, points_criteria: (f.points_criteria ? f.points_criteria + '\n' : '') + '• ' }))}
                                className="px-3 py-1.5 text-xs font-mono bg-white/10 border border-white/20 rounded-lg text-slate-300 hover:bg-white/20"
                              >
                                • Add bullet
                              </button>
                              <button
                                type="button"
                                onClick={() => setTaskForm((f) => ({ ...f, points_criteria: (f.points_criteria ? f.points_criteria + '\n' : '') + '- ' }))}
                                className="px-3 py-1.5 text-xs font-mono bg-white/10 border border-white/20 rounded-lg text-slate-300 hover:bg-white/20"
                              >
                                - Add dash
                              </button>
                            </div>
                            <textarea
                              value={taskForm.points_criteria}
                              onChange={(e) => setTaskForm((f) => ({ ...f, points_criteria: e.target.value }))}
                              placeholder="e.g. Story → 10–20 pts, Post/Reel → 30–50 pts"
                              rows={3}
                              className="w-full px-6 py-4 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[var(--horror-cyan)] outline-none resize-y"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-300 text-xs uppercase tracking-widest mb-2">EXAMPLE CAPTION (Optional)</label>
                            <div className="flex gap-2 mb-2">
                              <button
                                type="button"
                                onClick={() => setTaskForm((f) => ({ ...f, example_caption: (f.example_caption ? f.example_caption + '\n' : '') + '• ' }))}
                                className="px-3 py-1.5 text-xs font-mono bg-white/10 border border-white/20 rounded-lg text-slate-300 hover:bg-white/20"
                              >
                                • Add bullet
                              </button>
                            </div>
                            <textarea
                              value={taskForm.example_caption}
                              onChange={(e) => setTaskForm((f) => ({ ...f, example_caption: e.target.value }))}
                              placeholder="e.g. Excited for AAYAM 2026 🚀 Don't miss out. #AAYAM2026"
                              rows={3}
                              className="w-full px-6 py-4 bg-black/40 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[var(--horror-cyan)] outline-none resize-y"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-300 text-xs uppercase tracking-widest mb-2">POINTS_MIN</label>
                              <input
                                type="number"
                                min={0}
                                max={1000}
                                value={taskForm.points_min}
                                onChange={(e) => setTaskForm((f) => ({ ...f, points_min: Math.max(0, parseInt(e.target.value) || 0) }))}
                                className="w-full px-6 py-4 bg-black/40 border border-white/15 rounded-xl text-white focus:border-[var(--horror-cyan)] outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-300 text-xs uppercase tracking-widest mb-2">POINTS_MAX</label>
                              <input
                                type="number"
                                min={0}
                                max={1000}
                                value={taskForm.points_max}
                                onChange={(e) => setTaskForm((f) => ({ ...f, points_max: Math.max(0, parseInt(e.target.value) || 0) }))}
                                className="w-full px-6 py-4 bg-black/40 border border-white/15 rounded-xl text-white focus:border-[var(--horror-cyan)] outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-slate-300 text-xs uppercase tracking-widest mb-2">REQUIRED_PROOF</label>
                            <select
                              value={taskForm.required_proof}
                              onChange={(e) => setTaskForm((f) => ({ ...f, required_proof: e.target.value as Task['required_proof'] }))}
                              className="w-full px-6 py-4 bg-black/40 border border-white/15 rounded-xl text-white focus:border-[var(--horror-cyan)] outline-none"
                            >
                              <option value="link">Link</option>
                              <option value="screenshot">Screenshot</option>
                              <option value="video">Video</option>
                              <option value="text">Text</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="task-active"
                              checked={taskForm.active}
                              onChange={(e) => setTaskForm((f) => ({ ...f, active: e.target.checked }))}
                              className="w-5 h-5 rounded border-white/20 accent-[var(--horror-cyan)]"
                            />
                            <label htmlFor="task-active" className="text-slate-300 font-mono text-sm">Active (visible to ambassadors)</label>
                          </div>
                          <button
                            onClick={handleCreateTask}
                            disabled={loadingAction === 'create-task'}
                            className="w-full py-5 bg-[var(--horror-magenta)] hover:bg-[var(--horror-magenta)]/80 text-white font-black text-sm tracking-[0.2em] rounded-[1.5rem] transition-all flex items-center justify-center gap-3 disabled:opacity-50 uppercase"
                          >
                            {loadingAction === 'create-task' ? <LoadingSpinner size="sm" color="white" /> : <HiPlus className="w-5 h-5" />}
                            Create_Task
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/15 rounded-[2rem] p-10 overflow-hidden">
                      <h3 className="text-white font-bold mb-6 tracking-widest text-sm">EXISTING_TASKS</h3>
                      <div className="space-y-4 max-h-[500px] overflow-y-auto terminal-scrollbar pr-2">
                        {tasks.length === 0 ? (
                          <p className="text-slate-400 font-mono text-sm">No tasks yet. Create one above.</p>
                        ) : (
                          tasks.map((t) => (
                            <div key={t.id} className="bg-black/30 border border-white/5 rounded-xl p-5">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div className="text-white font-bold">{t.name}</div>
                                  {(t.description || t.instructions) && (
                                    <div className="text-slate-400 text-xs mt-1 line-clamp-2">{t.description || t.instructions}</div>
                                  )}
                                  <div className="flex gap-4 mt-2 text-xs text-slate-400">
                                    <span>{t.points_min}-{t.points_max} pts</span>
                                    <span className="uppercase">{t.required_proof}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleToggleTaskActive(t.id, !t.active)}
                                  disabled={loadingAction === `toggle-${t.id}`}
                                  className={`shrink-0 px-4 py-2 rounded-lg font-mono text-xs font-bold border transition-all ${t.active
                                    ? 'bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30'
                                    : 'bg-gray-500/20 text-gray-500 border-gray-500/30 hover:bg-gray-500/30'
                                    }`}
                                >
                                  {loadingAction === `toggle-${t.id}` ? <LoadingSpinner size="sm" color="currentColor" /> : t.active ? 'ACTIVE' : 'INACTIVE'}
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
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
