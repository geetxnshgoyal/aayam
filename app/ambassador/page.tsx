'use client';

import { motion } from 'framer-motion';
import { HiSpeakerphone, HiUserGroup, HiTrendingUp, HiGift, HiAcademicCap, HiStar, HiBadgeCheck, HiLightningBolt } from 'react-icons/hi';
import { FaTrophy, FaUsers, FaShare, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';

export default function AmbassadorPage() {
  const benefits = [
    {
      icon: HiGift,
      title: 'Exclusive Goodies',
      description: 'Get official AAYAM merchandise, tech swag, and exclusive gifts',
      gradient: 'from-[var(--energy)] to-[var(--dc1426)]',
    },
    {
      icon: HiBadgeCheck,
      title: 'Certificate & Recognition',
      description: 'Receive an official Ambassador certificate and LinkedIn recognition',
      gradient: 'from-[var(--dc1426)] to-[var(--black-red)]',
    },
    {
      icon: HiStar,
      title: 'Free Event Access',
      description: 'Complimentary passes to all AAYAM events and competitions',
      gradient: 'from-[var(--black-red)] to-[var(--energy)]',
    },
    {
      icon: HiLightningBolt,
      title: 'Priority Support',
      description: 'Direct access to organizing team and exclusive updates',
      gradient: 'from-[var(--energy)] to-[var(--mydiry)]',
    },
    {
      icon: FaTrophy,
      title: 'Performance Rewards',
      description: 'Top performers get bonus prizes, gadgets, and special recognition',
      gradient: 'from-[var(--dc1426)] to-[var(--energy)]',
    },
    {
      icon: HiUserGroup,
      title: 'Networking Access',
      description: 'Connect with sponsors, mentors, and tech leaders at exclusive sessions',
      gradient: 'from-[var(--black-red)] to-[var(--dc1426)]',
    },
  ];

  const responsibilities = [
    {
      icon: FaShare,
      title: 'Social Media Promotion',
      description: 'Share AAYAM posts, create content, and engage your network',
    },
    {
      icon: FaUsers,
      title: 'Campus Outreach',
      description: 'Spread awareness in your college through posters, WhatsApp groups, etc.',
    },
    {
      icon: FaChartLine,
      title: 'Drive Registrations',
      description: 'Use your unique referral link to get students to register',
    },
    {
      icon: HiTrendingUp,
      title: 'Report Progress',
      description: 'Share your promotion activities and track performance weekly',
    },
  ];

  const tiers = [
    {
      name: 'Bronze Ambassador',
      target: '10-25 Sign-ups',
      rewards: ['Certificate', 'Stickers Pack'],
      gradient: 'from-orange-600 to-orange-800',
    },
    {
      name: 'Silver Ambassador',
      target: '25-50 Sign-ups',
      rewards: ['AAYAM T-shirt', 'Certificate', 'Tech Swag Pack', 'LinkedIn Badge'],
      gradient: 'from-gray-400 to-gray-600',
    },
    {
      name: 'Gold Ambassador',
      target: '50-100 Sign-ups',
      rewards: ['Premium Goodie', 'Gold Certificate', 'LinkedIn Badge', 'Letter of Recommendation', 'Exclusive Mentor Session'],
      gradient: 'from-yellow-400 to-yellow-600',
    },
    {
      name: 'Platinum Ambassador',
      target: '100+ Sign-ups',
      rewards: ['Full Merch Set', 'Platinum Certificate', 'All-Access Pass', 'Letter of Recommendation', 'Meet Organizers', 'Featured on Website', 'Future Organizing Team Priority'],
      gradient: 'from-purple-400 to-purple-600',
    },
  ];

  const faqs = [
    {
      q: 'Who can become an ambassador?',
      a: 'Any college/university student passionate about technology and events can apply. No prior experience needed!',
    },
    {
      q: 'How do I track my referrals?',
      a: "You'll get a unique referral link and access to a dashboard showing your real-time sign-ups and tier progress.",
    },
    {
      q: 'When do I receive my rewards?',
      a: 'Goodies are shipped as you hit each tier. Final rewards are distributed at the event or within 2 weeks after.',
    },
    {
      q: 'Can I be an ambassador from any city?',
      a: 'Absolutely! Our program is open to students from across India. Promote AAYAM anywhere!',
    },
    {
      q: 'What if I don\'t hit a tier?',
      a: 'All active ambassadors get a certificate of participation and exclusive merch. Every effort counts!',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0B16] text-white pt-28 pb-20">
      {/* Cyberpunk background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, #200934 0%, #0A0B16 25%, #560F28 50%, #0A0B16 75%, #350609 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 35s ease infinite',
          }}
        />
        <div className="absolute inset-0 bg-[#0A0B16]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(86,15,40,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(32,9,52,0.25),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 pt-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] rounded-full"
          >
            <HiSpeakerphone className="w-6 h-6" />
            <span className="font-bold text-lg">Now Recruiting</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Become an{' '}
            <span className="bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] bg-clip-text text-transparent">
              AAYAM Ambassador
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Promote India's most exciting techfest on your campus and earn exclusive rewards, goodies, and recognition
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] rounded-full font-bold text-xl shadow-2xl shadow-[0_20px_60px_rgba(220,20,38,0.35)]"
            >
              Apply Now
            </motion.a>
            <motion.a
              href="#rewards"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border border-white/20 rounded-full font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-sm bg-white/5"
            >
              View Rewards
            </motion.a>
          </div>
        </motion.div>

        {/* What is Ambassador Program */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-3xl p-10 md:p-14 relative overflow-hidden border border-[#560F28]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#560F28]/10 to-[#200934]/5" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--energy)] to-[var(--dc1426)]">
                  <HiUserGroup className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">What is the Ambassador Program?</h2>
              </div>

              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  The <strong className="text-white">AAYAM Ambassador Program</strong> is your chance to be the face of India's most innovative techfest at your campus. As an ambassador, you'll:
                </p>
                <ul className="space-y-3 list-none">
                  <li className="flex items-start gap-3">
                    <span className="text-[#560F28] mt-1">▸</span>
                    <span>Spread awareness about AAYAM 2026 through social media, WhatsApp groups, and campus events</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#560F28] mt-1">▸</span>
                    <span>Use your unique referral link to drive registrations from your college and network</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#560F28] mt-1">▸</span>
                    <span>Earn exclusive merchandise, tech goodies, certificates, and prizes based on your performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#560F28] mt-1">▸</span>
                    <span>Build your portfolio with real marketing experience and campus leadership</span>
                  </li>
                </ul>
                <p className="text-white font-semibold text-xl mt-8">
                  💡 No experience needed. All you need is passion for tech and the drive to promote something amazing!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Become an Ambassador?</h2>
          <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
            Perks, recognition, and exclusive benefits you'll receive
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-[#180C16] rounded-2xl p-8 border border-[#560F28]/20 hover:border-[#560F28]/60 transition-all duration-300 hover:scale-105"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 mb-6 bg-gradient-to-br ${benefit.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Responsibilities */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Your Role as Ambassador</h2>
          <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
            Simple tasks that make a big impact
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {responsibilities.map((task, index) => (
              <motion.div
                key={task.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gray-900/50 rounded-2xl p-6 border border-white/5 hover:border-[#560F28]/40 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-[var(--energy)] to-[var(--dc1426)] rounded-full">
                  <task.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{task.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{task.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reward Tiers */}
        <motion.div
          id="rewards"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Performance-Based Rewards</h2>
          <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
            The more sign-ups you drive, the better your rewards! Track your progress in real-time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-gray-900/70 rounded-3xl p-8 border border-white/10 hover:border-[#560F28]/50 transition-all duration-300 overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-2xl font-black bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}>
                      {tier.name}
                    </h3>
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${tier.gradient} text-white text-sm font-bold`}>
                      {tier.target}
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {tier.rewards.map((reward, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-300">
                        <span className="text-[#560F28]">✓</span>
                        <span>{reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 text-center p-6 bg-gradient-to-r from-[#200934] to-[#350609] rounded-2xl border border-[#560F28]/30"
          >
            <p className="text-lg text-white font-semibold">
              🎯 <strong>Pro Tip:</strong> Top 3 ambassadors nationwide get special bonuses: Latest tech gadgets, organizing team invites, and lifetime AAYAM passes!
            </p>
          </motion.div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 rounded-2xl p-6 border border-white/5"
              >
                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Apply CTA */}
        <motion.div
          id="apply"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 rounded-3xl p-12 md:p-16 text-center border border-[#560F28]/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#560F28]/10 via-[#200934]/10 to-[#350609]/10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Make an Impact?</h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Join 100+ ambassadors spreading the word about AAYAM 2026. Applications close soon!
              </p>
              
              <Link href="/ambassador/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] rounded-full font-bold text-2xl shadow-2xl shadow-[0_20px_60px_rgba(220,20,38,0.4)] hover:shadow-[0_25px_70px_rgba(220,20,38,0.5)] transition-all duration-300"
                >
                  Apply for Ambassador Program →
                </motion.button>
              </Link>
              
              <p className="text-sm text-gray-500 mt-6">
                Application takes just 2 minutes • No prior experience required
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
