'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiUsers, HiLightningBolt, HiAcademicCap, HiStar, HiGlobe } from 'react-icons/hi';
import { FaTrophy, FaUniversity, FaLinkedin } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import Link from 'next/link';

function TeamCard({ member, index }: { member: { name: string; role: string; icon: IconType; image: string; linkedin: string }; index: number }) {
  const [imgError, setImgError] = useState(false);
  const Icon = member.icon;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
      className="card-retro rounded-sm p-6 text-center flex flex-col items-center"
    >
      <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[var(--border-accent)] bg-[var(--bg-card)] flex items-center justify-center">
        {!imgError ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        ) : (
          <Icon className="w-10 h-10 text-[var(--accent-amber)]" aria-hidden />
        )}
      </div>
      <h3 className="font-mono text-sm font-semibold text-[var(--accent-cyan)] mb-1">
        {member.name}
      </h3>
      <p className="text-[var(--text-muted)] text-xs mb-3">{member.role}</p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors text-xs"
        >
          <FaLinkedin className="w-4 h-4" />
          <span className="font-mono">LinkedIn</span>
        </a>
      )}
    </motion.article>
  );
}

export default function AboutPage() {
  const stats = [
    { icon: HiUsers, value: '3000+', label: 'Participants Expected' },
    { icon: FaTrophy, value: '12+', label: 'Competitions' },
    { icon: HiLightningBolt, value: '₹5L+', label: 'Prize Pool' },
    { icon: HiAcademicCap, value: '20+', label: 'Partner Institutions' },
  ];

  const team = [
    { name: 'Prerana Pandey', role: 'Faculty Advisor', icon: HiAcademicCap, image: 'https://media.licdn.com/dms/image/v2/D5603AQFsGaVazmywHg/profile-displayphoto-scale_400_400/B56ZmFalpVIsAg-/0/1758879964284?e=1774483200&v=beta&t=hiYfODHP1i_LRzJjR1btcPEXigh7w7tufEa0cWDiB5E', linkedin: 'https://www.linkedin.com/in/prerana-pandey-60710216a/' },
    { name: 'Still Figuring Out', role: 'Lead Organizer', icon: HiUsers, image: '/images/team/priya.jpg', linkedin: '' },
    { name: 'Shaaz', role: 'Technical Lead', icon: HiLightningBolt, image: 'https://media.licdn.com/dms/image/v2/D4D03AQH8QsTdg7EtTw/profile-displayphoto-scale_400_400/B4DZrl53W4G4Ag-/0/1764793745034?e=1774483200&v=beta&t=IWXoD70q-U0NYGh4r52UrAhawY7baucte215igMGIXg', linkedin: 'https://www.linkedin.com/in/shaaz-hemani-229150276/' },
    { name: 'Rachana', role: 'Partnerships Lead', icon: HiGlobe, image: 'https://media.licdn.com/dms/image/v2/D4E03AQHt9CfF_YSAeA/profile-displayphoto-scale_400_400/B4EZllLsuEKcAg-/0/1758339192068?e=1774483200&v=beta&t=E8z3yYixOYlrd2j5GfqMUJh2iieSPrh3fHiz-C8r0hQ', linkedin: 'https://www.linkedin.com/in/rachana-adhikary-133a3b36b/' },
    { name: 'Archita Singh', role: 'Design Lead', icon: HiStar, image: 'https://media.licdn.com/dms/image/v2/D4E03AQHtsUSKzu7O0g/profile-displayphoto-scale_400_400/B4EZy07zIfKsAo-/0/1772562102892?e=1774483200&v=beta&t=0_McntIwbEui5K4vq3cwIwUCqWw5mbJGBEpW3KBmbfQ', linkedin: 'https://www.linkedin.com/in/archita-singh-668193380/' },
    { name: 'Sainy Verma', role: 'Events Lead', icon: FaTrophy, image: '/images/team/sainy.jpeg', linkedin: 'https://www.linkedin.com/in/sainy-verma-/' },
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
              <TeamCard key={member.name} member={member} index={index} />
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
