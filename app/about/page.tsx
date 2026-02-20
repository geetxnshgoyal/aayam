'use client';

import { motion } from 'framer-motion';
import { HiUsers, HiLightningBolt, HiAcademicCap, HiStar, HiGlobe } from 'react-icons/hi';
import { FaTrophy, FaUniversity } from 'react-icons/fa';

export default function AboutPage() {
  const stats = [
    { icon: HiUsers, value: '3000+', label: 'Participants Expected' },
    { icon: FaTrophy, value: '6+', label: 'Competitions' },
    { icon: HiLightningBolt, value: '₹2L+', label: 'Prize Pool' },
    { icon: HiAcademicCap, value: '20+', label: 'Partner Institutions' },
  ];

  const team = [
    { name: 'Dr. Rajesh Kumar', role: 'Faculty Advisor', icon: HiAcademicCap, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Priya Sharma', role: 'Lead Organizer', icon: HiUsers, gradient: 'from-orange-500 to-red-500' },
    { name: 'Arjun Singh', role: 'Technical Lead', icon: HiLightningBolt, gradient: 'from-cyan-500 to-blue-500' },
    { name: 'Neha Gupta', role: 'Partnerships Lead', icon: HiGlobe, gradient: 'from-emerald-400 to-teal-500' },
    { name: 'Rahul Verma', role: 'Design Lead', icon: HiStar, gradient: 'from-yellow-400 to-orange-500' },
    { name: 'Ananya Reddy', role: 'Events Lead', icon: FaTrophy, gradient: 'from-indigo-500 to-purple-500' },
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'Pushing boundaries with hackathons, AI challenges, and cutting-edge robotics competitions',
      gradient: 'from-pink-500 to-orange-400',
    },
    {
      title: 'Open Source Spirit',
      description: 'Fostering collaboration through open-source contribution challenges and community-driven projects',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      title: 'Builder Culture',
      description: 'We celebrate those who build — from autonomous bots to full-stack apps to competitive algorithms',
      gradient: 'from-indigo-400 to-purple-500',
    },
    {
      title: 'Inclusive Access',
      description: 'Open to developers, engineers, robotics enthusiasts, hackers, and students from all institutions',
      gradient: 'from-emerald-400 to-teal-500',
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
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
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
          <div className="bg-gray-900/70 backdrop-blur-md rounded-3xl p-10 md:p-14 relative overflow-hidden border border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#dc1426]/10 to-[var(--energy)]/5" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 shadow-lg shadow-pink-500/20">
                  <FaUniversity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">What is AAYAM?</h2>
                  <p className="text-gray-300 font-medium">Hosted by Newton School of Technology</p>
                </div>
              </div>

              <div className="space-y-6 text-lg text-gray-200 leading-relaxed font-medium">
                <p>
                  <strong className="text-white drop-shadow-sm">AAYAM</strong> — meaning &quot;New Dimensions&quot; — is the flagship techfest of <strong className="text-white drop-shadow-sm">Newton School of Technology</strong>. It represents our vision to explore every dimension of technology, innovation, and human potential.
                </p>
                <p>
                  With 6+ competitions spanning hackathons, competitive programming, robotics, and open-source contribution, AAYAM brings together <strong className="text-white drop-shadow-sm">3000+ developers, engineers, robotics enthusiasts, hackers, and students</strong> for two days of intense competition and collaboration.
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
            <div className="bg-gray-900/70 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent drop-shadow-md">Our Vision</h3>
              <p className="text-gray-200 leading-relaxed text-lg font-medium">
                To be the most impactful student-run techfest in India — a launchpad where the next generation of builders, creators, and innovators come together to push beyond what&apos;s possible.
              </p>
            </div>
            <div className="bg-gray-900/70 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent drop-shadow-md">Our Mission</h3>
              <p className="text-gray-200 leading-relaxed text-lg font-medium">
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
                className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center group hover:border-white/30 transition-all duration-500 shadow-2xl overflow-hidden"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-pink-500/20">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
                    {stat.value}
                  </div>
                  <div className="text-gray-200 font-medium text-sm">{stat.label}</div>
                </div>
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
                className="group relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 overflow-hidden hover:scale-[1.02] transition-all duration-500 border border-white/10 hover:border-white/30 shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} mb-6`} />
                  <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">{value.title}</h3>
                  <p className="text-gray-200 leading-relaxed font-medium">{value.description}</p>
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
                className="text-center group bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl overflow-hidden relative"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br ${member.gradient} rounded-full group-hover:scale-110 shadow-lg transition-transform duration-500`}>
                    <member.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-white drop-shadow-md">{member.name}</h3>
                  <p className="text-gray-300 text-sm font-medium">{member.role}</p>
                </div>
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
              <a href="/sponsors" className="px-8 py-4 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm bg-white/5">
                Become a Sponsor
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
