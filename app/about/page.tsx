'use client';

import { motion } from 'framer-motion';
import { HiUsers, HiLightningBolt, HiAcademicCap, HiStar, HiGlobe } from 'react-icons/hi';
import { FaTrophy, FaUniversity } from 'react-icons/fa';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { icon: HiUsers, value: '3000+', label: 'Participants Expected' },
    { icon: FaTrophy, value: '12+', label: 'Competitions' },
    { icon: HiLightningBolt, value: '₹5L+', label: 'Prize Pool' },
    { icon: HiAcademicCap, value: '20+', label: 'Partner Institutions' },
  ];

  const team = [
    { name: 'Dr. Rajesh Kumar', role: 'Faculty Advisor', icon: HiAcademicCap },
    { name: 'Priya Sharma', role: 'Lead Organizer', icon: HiUsers },
    { name: 'Arjun Singh', role: 'Technical Lead', icon: HiLightningBolt },
    { name: 'Neha Gupta', role: 'Partnerships Lead', icon: HiGlobe },
    { name: 'Rahul Verma', role: 'Design Lead', icon: HiStar },
    { name: 'Ananya Reddy', role: 'Events Lead', icon: FaTrophy },
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'Pushing boundaries with hackathons, AI challenges, and cutting-edge robotics competitions',
    },
    {
      title: 'Open Source Spirit',
      description: 'Fostering collaboration through open-source contribution challenges and community-driven projects',
    },
    {
      title: 'Builder Culture',
      description: 'We celebrate those who build — from autonomous bots to full-stack apps to competitive algorithms',
    },
    {
      title: 'Inclusive Access',
      description: 'Open to developers, engineers, robotics enthusiasts, hackers, and students from all institutions',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 min-w-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <motion.header
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 pt-8"
        >
          <h1 className="font-mono text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
            &gt; ABOUT AAYAM
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Step Beyond the Known
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <article className="card-retro rounded-sm p-6 sm:p-8 md:p-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="p-3 rounded border border-[var(--border-accent)] w-fit">
                <FaUniversity className="w-6 h-6 text-[var(--accent-cyan)]" aria-hidden />
              </div>
              <div className="min-w-0">
                <h2 className="font-mono text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                  What is AAYAM?
                </h2>
                <p className="text-[var(--text-muted)] text-sm">Hosted by Newton School of Technology</p>
              </div>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                <strong className="text-[var(--accent-cyan)]">AAYAM</strong> — meaning &quot;New Dimensions&quot; — is the flagship techfest of{' '}
                <strong className="text-[var(--accent-cyan)]">Newton School of Technology</strong>. It represents our vision to explore every dimension of technology, innovation, and human potential.
              </p>
              <p>
                With 12+ competitions spanning hackathons, competitive programming, robotics, and open-source contribution, AAYAM brings together{' '}
                <strong className="text-[var(--accent-cyan)]">3000+ developers, engineers, robotics enthusiasts, hackers, and students</strong> for two days of intense competition and collaboration.
              </p>
              <p>
                Whether you&apos;re building autonomous bots, shipping code at 3 AM in a hackathon, optimizing algorithms, or contributing to open-source — AAYAM is where you prove what you can build.
              </p>
            </div>
          </article>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <article className="card-retro rounded-sm p-8">
              <h2 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-4">
                &gt; OUR VISION
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To be the most impactful student-run techfest in India — a launchpad where the next generation of builders, creators, and innovators come together to push beyond what&apos;s possible.
              </p>
            </article>
            <article className="card-retro rounded-sm p-8">
              <h2 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-4">
                &gt; OUR MISSION
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Create a platform where technical excellence meets real-world impact. We believe in learning by building, competing, and collaborating — not just attending talks.
              </p>
            </article>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-10 text-[var(--text-primary)]">
            &gt; BY THE NUMBERS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="card-retro rounded-sm p-6 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[var(--accent-cyan)]" aria-hidden />
                <p className="font-mono text-2xl md:text-3xl font-bold text-[var(--accent-cyan)] mb-1">
                  {stat.value}
                </p>
                <p className="font-mono text-xs text-[var(--text-muted)]">{stat.label}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-2 text-[var(--text-primary)]">
            &gt; WHY PARTICIPATE?
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-10 max-w-xl mx-auto">
            AAYAM isn&apos;t just another college fest. Here&apos;s what makes it different.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="card-retro rounded-sm p-6"
              >
                <div className="w-10 h-10 rounded border border-[var(--border-accent)] flex items-center justify-center mb-4">
                  <span className="text-[var(--accent-cyan)] font-mono">▸</span>
                </div>
                <h3 className="font-mono text-lg font-semibold text-[var(--accent-cyan)] mb-2">
                  {value.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{value.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-2 text-[var(--text-primary)]">
            &gt; THE TEAM
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-10">
            Student organizers at Newton School of Technology
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {team.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="card-retro rounded-sm p-6 text-center"
              >
                <member.icon className="w-8 h-8 mx-auto mb-3 text-[var(--accent-amber)]" aria-hidden />
                <h3 className="font-mono text-sm font-semibold text-[var(--accent-cyan)] mb-1">
                  {member.name}
                </h3>
                <p className="text-[var(--text-muted)] text-xs">{member.role}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="card-retro rounded-sm p-10 md:p-14 text-center">
            <h2 className="font-mono text-2xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
              &gt; WANT TO GET INVOLVED?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              Join us as a volunteer, sponsor, or participant. AAYAM is built by builders, for builders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/competitions"
                className="inline-flex justify-center px-6 py-3 font-mono text-sm font-semibold bg-[var(--accent-primary)] text-white border border-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[0_0_20px_var(--glow-primary)] transition-all"
              >
                View Competitions
              </Link>
              <Link
                href="/sponsors"
                className="inline-flex justify-center px-6 py-3 font-mono text-sm font-semibold border border-[var(--border-accent)] text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
