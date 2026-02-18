'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiCheckCircle, HiClock, HiXCircle, HiLink, HiCamera, HiSpeakerphone, HiTrendingUp } from 'react-icons/hi';
import { Task, TaskSubmission } from '@/lib/supabase';
import LoadingSpinner from '@/components/LoadingSpinner';

interface TasksProps {
  ambassadorId: string;
  token: string;
}

export default function Tasks({ ambassadorId, token }: TasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<TaskSubmission[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [proofLink, setProofLink] = useState('');
  const [proofScreenshot, setProofScreenshot] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [convertingPoints, setConvertingPoints] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/ambassador/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks || []);
        setSubmissions(data.submissions || []);
        setTotalPoints(data.totalPoints || 0);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setMessage({ type: 'error', text: 'Failed to load tasks' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTask = async () => {
    if (!selectedTask) return;

    setSubmitting(selectedTask.id);
    setMessage(null);

    try {
      const response = await fetch('/api/ambassador/submit-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          taskId: selectedTask.id,
          proofLink,
          proofScreenshot,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setProofLink('');
        setProofScreenshot('');
        setSelectedTask(null);
        fetchTasks(); // Refresh submissions
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit task. Try again.' });
    } finally {
      setSubmitting(null);
    }
  };

  const handleConvertPoints = async () => {
    setConvertingPoints(true);
    setMessage(null);

    try {
      const response = await fetch('/api/ambassador/convert-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ pointsNeeded: 12 }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        fetchTasks(); // Refresh points
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to convert points' });
    } finally {
      setConvertingPoints(false);
    }
  };

  const getSubmissionStatus = (taskId: string) => {
    const submission = submissions.find(s => s.task_id === taskId);
    return submission;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" color="#dc1426" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Points Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#180C16] to-[#0A0B16] rounded-2xl p-6 border border-[#560F28]/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-2">Your Points</h3>
            <p className="text-4xl font-bold text-[var(--energy)]">{totalPoints}</p>
            <p className="text-gray-500 text-xs mt-1">12 points = 1 signup</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm mb-2">Signups from Points</p>
            <p className="text-2xl font-bold">{Math.floor(totalPoints / 12)}</p>
            <button
              onClick={handleConvertPoints}
              disabled={totalPoints < 12 || convertingPoints}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center gap-2"
            >
              {convertingPoints ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  Converting...
                </>
              ) : (
                <>
                  <HiTrendingUp className="w-4 h-4" />
                  Convert to Signup
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 rounded-xl border ${
            message.type === 'success'
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Tasks Grid */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <HiStar className="text-yellow-400" />
          Available Tasks
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {tasks.map((task) => {
            const submission = getSubmissionStatus(task.id);
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#1a0f1f] to-[#0f0a15] rounded-xl p-5 border border-[#560F28]/30 hover:border-[#560F28] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-white">{task.name}</h4>
                    <p className="text-gray-400 text-xs mt-1">{task.description}</p>
                  </div>
                  <div className="px-3 py-1 bg-[var(--energy)]/20 rounded-full">
                    <p className="text-sm font-bold text-[var(--energy)]">
                      {task.points_min}-{task.points_max} pts
                    </p>
                  </div>
                </div>

                {/* Proof Type */}
                <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                  {task.required_proof === 'link' && (
                    <>
                      <HiLink className="w-4 h-4" />
                      <span>Link required</span>
                    </>
                  )}
                  {task.required_proof === 'screenshot' && (
                    <>
                      <HiCamera className="w-4 h-4" />
                      <span>Screenshot required</span>
                    </>
                  )}
                  {task.required_proof === 'text' && (
                    <>
                      <HiSpeakerphone className="w-4 h-4" />
                      <span>Description required</span>
                    </>
                  )}
                </div>

                {/* Submission Status */}
                {submission ? (
                  <div className="flex items-center gap-2 mb-3">
                    {submission.status === 'pending' && (
                      <>
                        <HiClock className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-yellow-400">Pending Review</span>
                      </>
                    )}
                    {submission.status === 'approved' && (
                      <>
                        <HiCheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400">
                          Approved! +{submission.points_awarded} pts
                        </span>
                      </>
                    )}
                    {submission.status === 'rejected' && (
                      <>
                        <HiXCircle className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-red-400">Rejected</span>
                      </>
                    )}
                  </div>
                ) : null}

                {/* Submit Form */}
                {selectedTask?.id === task.id ? (
                  <div className="space-y-3 mt-4 p-3 bg-black/20 rounded-lg">
                    {task.required_proof === 'link' && (
                      <input
                        type="url"
                        placeholder="Paste your link here..."
                        value={proofLink}
                        onChange={(e) => setProofLink(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#560F28]"
                      />
                    )}
                    {task.required_proof === 'screenshot' && (
                      <input
                        type="url"
                        placeholder="Screenshot URL..."
                        value={proofScreenshot}
                        onChange={(e) => setProofScreenshot(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#560F28]"
                      />
                    )}
                    {task.required_proof === 'text' && (
                      <textarea
                        placeholder="Describe your activity..."
                        value={proofLink}
                        onChange={(e) => setProofLink(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#560F28] resize-none"
                      />
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={handleSubmitTask}
                        disabled={submitting === task.id || (task.required_proof === 'link' && !proofLink) || (task.required_proof === 'text' && !proofLink) || (task.required_proof === 'screenshot' && !proofScreenshot)}
                        className="flex-1 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-xs font-semibold text-green-400 hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1"
                      >
                        {submitting === task.id ? (
                          <>
                            <LoadingSpinner size="sm" color="#4ade80" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <HiCheckCircle className="w-4 h-4" />
                            Submit
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedTask(null)}
                        className="flex-1 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/30 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : !submission || submission.status === 'rejected' ? (
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setProofLink('');
                      setProofScreenshot('');
                    }}
                    className="w-full px-3 py-2 bg-[var(--energy)]/20 border border-[var(--energy)]/30 rounded-lg text-xs font-semibold text-[var(--energy)] hover:bg-[var(--energy)]/30 transition-all"
                  >
                    {submission?.status === 'rejected' ? 'Resubmit' : 'Submit'}
                  </button>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
