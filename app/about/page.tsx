'use client';

import { motion } from 'framer-motion';
import { HiUsers, HiLightningBolt, HiAcademicCap, HiStar, HiGlobe } from 'react-icons/hi';
import { FaTrophy, FaUniversity } from 'react-icons/fa';

export default function AboutPage() {
  const stats = [
    { icon: HiUsers, value: '3000+', label: 'Participants Expected' },
    { icon: FaTrophy, value: '12+', label: 'Competitions' },
    { icon: HiLightningBolt, value: '₹5L+', label: 'Prize Pool' },
    { icon: HiAcademicCap, value: '20+', label: 'Partner Institutions' },
  ];

  const team = [
    { name: 'Dr. Rajesh Kumar', role: 'Faculty Advisor', icon: HiAcademicCap, gradient: 'from-[var(--energy)] to-[var(--dc1426)]' },
    { name: 'Priya Sharma', role: 'Lead Organizer', icon: HiUsers, gradient: 'from-[var(--dc1426)] to-[var(--black-red)]' },
    { name: 'Arjun Singh', role: 'Technical Lead', icon: HiLightningBolt, gradient: 'from-[var(--energy)] to-[var(--midich)]' },
    { name: 'Neha Gupta', role: 'Partnerships Lead', icon: HiGlobe, gradient: 'from-[var(--dc1426)] to-[var(--energy)]' },
    { name: 'Rahul Verma', role: 'Design Lead', icon: HiStar, gradient: 'from-[var(--black-red)] to-[var(--dc1426)]' },
    { name: 'Ananya Reddy', role: 'Events Lead', icon: FaTrophy, gradient: 'from-[var(--energy)] to-[var(--dc1426)]' },
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'Pushing boundaries with hackathons, AI challenges, and cutting-edge robotics competitions',
      gradient: 'from-[var(--energy)] to-[var(--dc1426)]',
    },
    {
      title: 'Open Source Spirit',
      description: 'Fostering collaboration through open-source contribution challenges and community-driven projects',
      gradient: 'from-[var(--dc1426)] to-[var(--black-red)]',
    },
    {
      title: 'Builder Culture',
      description: 'We celebrate those who build — from autonomous bots to full-stack apps to competitive algorithms',
      gradient: 'from-[var(--energy)] to-[var(--mydiry)]',
    },
    {
      title: 'Inclusive Access',
      description: 'Open to developers, engineers, robotics enthusiasts, hackers, and students from all institutions',
      gradient: 'from-[var(--black-red)] to-[var(--dc1426)]',
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Hero */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 pt-8"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent">
              AAYAM
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Exploring New Dimensions of Technology
          </p>
        </motion.div>

        {/* What is AAYAM */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-3xl p-10 md:p-14 relative overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-[#560F28]/10 to-[#200934]/5" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--energy)] to-[var(--dc1426)]">
                  <FaUniversity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">What is AAYAM?</h2>
                  <p className="text-gray-600 font-medium">Hosted by Newton School of Technology</p>
                </div>
              </div>

              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-white">AAYAM</strong> — meaning &quot;New Dimensions&quot; — is the flagship techfest of <strong className="text-white">Newton School of Technology</strong>. It represents our vision to explore every dimension of technology, innovation, and human potential.
                </p>
                <p>
                  With 12+ competitions spanning hackathons, competitive programming, robotics, and open-source contribution, AAYAM brings together <strong className="text-[var(--horror-cyan)]">3000+ developers, engineers, robotics enthusiasts, hackers, and students</strong> for two days of intense competition and collaboration.
                </p>
                <p>
                  Whether you&apos;re building autonomous bots, shipping code at 3 AM in a hackathon, optimizing algorithms, or contributing to open-source — AAYAM is where you prove what you can build.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                To be the most impactful student-run techfest in India — a launchpad where the next generation of builders, creators, and innovators come together to push beyond what&apos;s possible.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Create a platform where technical excellence meets real-world impact. We believe in learning by building, competing, and collaborating — not just attending talks.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br from-[var(--energy)] to-[var(--dc1426)] rounded-xl">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Participate?</h2>
          <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
            AAYAM isn&apos;t just another college fest. Here&apos;s what makes it different.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 overflow-hidden hover:scale-[1.02] transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} mb-6`} />
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">The Team</h2>
          <p className="text-gray-400 text-center text-lg mb-12">
            Student organizers at Newton School of Technology
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br ${member.gradient} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                  <member.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 rounded-3xl p-12 md:p-16 text-center border border-white/5">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Want to Get Involved?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join us as a volunteer, sponsor, or participant. AAYAM is built by builders, for builders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/competitions" className="px-8 py-4 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[0_12px_30px_rgba(220,20,38,0.3)] transition-all duration-300 hover:scale-105 active:scale-95">
                View Competitions
              </a>
              <a href="/sponsors" className="px-8 py-4 border border-white/20 rounded-full font-semibold text-lg hover:bg-transparent/10 transition-all duration-300 backdrop-blur-sm bg-transparent/5">
                Become a Sponsor
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
