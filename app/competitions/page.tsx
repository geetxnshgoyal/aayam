'use client';

import { motion } from 'framer-motion';
import { HiCode, HiChip, HiLightningBolt, HiCog, HiPuzzle, HiCube } from 'react-icons/hi';
import { FiExternalLink } from 'react-icons/fi';
import { FaRobot, FaRocket, FaDragon, FaGamepad, FaHelicopter, FaGithub } from 'react-icons/fa';
import InfiniteMarquee from '@/components/InfiniteMarquee';

const competitions = [
  // Hackathons
  {
    id: '24h-hackathon',
    title: '24-Hour Hackathon',
    category: 'Hackathon',
    icon: HiLightningBolt,
    description: 'An intense 24-hour innovation marathon featuring Blind Code Challenge, AI vs Human coding battles, and Tech Meme Challenge. Build innovative solutions under extreme time constraints.',
    details: 'Team: 2-4 members | Mentorship | Meals included',
    duration: '24 Hours',
    type: 'Team',
    difficulty: 'Advanced',
    prize: '₹50,000',
    participants: '2-4',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)]',
    glowColor: 'rgba(220, 20, 38, 0.18)',
  },
  {
    id: '12h-hackathon',
    title: '12-Hour Hackathon',
    category: 'Hackathon',
    icon: FaRocket,
    description: 'A fast-paced half-day hackathon. Ideate, prototype, and pitch — all in 12 hours. Perfect for first-time hackers and seasoned builders alike.',
    details: 'Team: 2-3 members | Theme reveal at start',
    duration: '12 Hours',
    type: 'Team',
    difficulty: 'Intermediate',
    prize: '₹30,000',
    participants: '2-3',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--dc1426)] via-[var(--energy)] to-[var(--mydiry)]',
    glowColor: 'rgba(220, 20, 38, 0.16)',
  },
  // Coding
  {
    id: 'cp-individual',
    title: 'CP Contest — Individual',
    category: 'Coding',
    icon: HiCode,
    description: 'Solo competitive programming showdown. Solve algorithmic problems under time pressure. Codeforces-style rounds with increasing difficulty.',
    details: '3 Rounds | 5 problems each | Time-ranked',
    duration: '3 Hours',
    type: 'Individual',
    difficulty: 'Advanced',
    prize: '₹25,000',
    participants: '1',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--energy)] via-[var(--midich)] to-[var(--dc1426)]',
    glowColor: 'rgba(59, 31, 106, 0.18)',
  },
  {
    id: 'cp-team',
    title: 'CP Contest — Team',
    category: 'Coding',
    icon: HiPuzzle,
    description: 'ICPC-style team contest. Three minds, one keyboard. Collaborate, strategize, and solve the hardest problems together.',
    details: 'Team of 3 | 1 system per team | ICPC rules',
    duration: '4 Hours',
    type: 'Team',
    difficulty: 'Advanced',
    prize: '₹40,000',
    participants: '3',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--dc1426)] via-[var(--black-red)] to-[var(--energy)]',
    glowColor: 'rgba(220, 20, 38, 0.16)',
  },
  {
    id: 'code-optimizer',
    title: 'Code Optimizer Challenge',
    category: 'Coding',
    icon: HiCog,
    description: 'Given working but inefficient code, optimize it for speed, memory, and elegance. The tightest solution wins.',
    details: 'Individual | Optimize for time & space complexity',
    duration: '2 Hours',
    type: 'Individual',
    difficulty: 'Intermediate',
    prize: '₹15,000',
    participants: '1',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--energy)] via-[var(--dc1426)] to-[var(--midich)]',
    glowColor: 'rgba(220, 20, 38, 0.16)',
  },
  // Open Source
  {
    id: 'open-source',
    title: 'Open Source Challenge',
    category: 'Open Source',
    icon: FaGithub,
    description: 'Contribute to real open-source projects. Fix bugs, add features, improve documentation. Judged on quality, impact, and collaboration.',
    details: 'Team: 1-3 | Real repos | PR-based judging',
    duration: '48 Hours',
    type: 'Team',
    difficulty: 'All levels',
    prize: '₹20,000',
    participants: '1-3',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--mydiry)] via-[var(--midich)] to-[var(--black-red)]',
    glowColor: 'rgba(32, 16, 21, 0.2)',
  },
  // Robotics
  {
    id: 'robo-racing',
    title: 'Robo Racing',
    category: 'Robotics',
    icon: FaRobot,
    description: 'Build the fastest autonomous or manual robot and race it through an obstacle-filled track. Speed + precision = victory.',
    details: 'Team: 2-4 | Bot weight: 5kg max | Track provided',
    duration: 'Day event',
    type: 'Team',
    difficulty: 'Intermediate',
    prize: '₹30,000',
    participants: '2-4',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--black-red)] via-[var(--dc1426)] to-[var(--energy)]',
    glowColor: 'rgba(220, 20, 38, 0.2)',
  },
  {
    id: 'robo-soccer',
    title: 'Robo Soccer',
    category: 'Robotics',
    icon: FaGamepad,
    description: 'Football, but with robots. Design and control your robot to score goals in a head-to-head robotic soccer match.',
    details: 'Team: 2-4 | 2v2 format | Manual control',
    duration: 'Day event',
    type: 'Team',
    difficulty: 'Intermediate',
    prize: '₹25,000',
    participants: '2-4',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)]',
    glowColor: 'rgba(220, 20, 38, 0.18)',
  },
  {
    id: 'robo-fighting',
    title: 'Robo Fighting',
    category: 'Robotics',
    icon: FaDragon,
    description: 'Enter the arena. Build combat-ready bots designed to push, flip, and overpower opponents. Last bot standing wins.',
    details: 'Team: 2-5 | Bot weight: 15kg max | 3 min rounds',
    duration: 'Day event',
    type: 'Team',
    difficulty: 'Advanced',
    prize: '₹40,000',
    participants: '2-5',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--dc1426)] via-[var(--black-red)] to-[var(--energy)]',
    glowColor: 'rgba(220, 20, 38, 0.2)',
  },
  {
    id: 'maze-solver',
    title: 'Maze Solver',
    category: 'Robotics',
    icon: HiCube,
    description: 'Design an autonomous robot that navigates a complex maze in the shortest time. Sensors, algorithms, and precision matter.',
    details: 'Team: 1-3 | Autonomous only | Line/wall following',
    duration: 'Day event',
    type: 'Team',
    difficulty: 'Advanced',
    prize: '₹20,000',
    participants: '1-3',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--energy)] via-[var(--dc1426)] to-[var(--mydiry)]',
    glowColor: 'rgba(59, 31, 106, 0.18)',
  },
  {
    id: 'drone-hurdle',
    title: 'Drone Hurdle Racing',
    category: 'Robotics',
    icon: FaHelicopter,
    description: 'Pilot your drone through a series of hurdles, hoops, and checkpoints. Precision flying meets speed racing.',
    details: 'Team: 1-3 | Bring your own drone | Safety gear provided',
    duration: 'Day event',
    type: 'Team',
    difficulty: 'Intermediate',
    prize: '₹35,000',
    participants: '1-3',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--midich)] via-[var(--energy)] to-[var(--dc1426)]',
    glowColor: 'rgba(59, 31, 106, 0.16)',
  },
  // Wildcard
  {
    id: 'tech-quiz',
    title: 'Tech Quiz',
    category: 'General',
    icon: HiChip,
    description: 'Test your knowledge across CS, electronics, robotics, AI, and more. Fast-paced buzzer rounds for the sharpest minds.',
    details: '3 Rounds | Buzzer finale | Speed + accuracy',
    duration: '2 Hours',
    type: 'Team',
    difficulty: 'All levels',
    prize: '₹10,000',
    participants: '2',
    registrationLink: 'https://unstop.com/competitions',
    gradient: 'from-[var(--dc1426)] via-[var(--energy)] to-[var(--black-red)]',
    glowColor: 'rgba(220, 20, 38, 0.16)',
  },
];

const categories = ['All', 'Hackathon', 'Coding', 'Open Source', 'Robotics', 'General'];

export default function CompetitionsPage() {
  return (
    <div className="min-h-screen bg-[#0A0B16] text-white pt-32 pb-20">
      <InfiniteMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>
            COMPETITIONS
          </h1>
          <motion.p
            className="text-2xl text-gray-400 max-w-3xl mx-auto mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            12+ events across Hackathons, Coding, Robotics, and Open Source. Choose your arena.
          </motion.p>
          <motion.p
            className="text-lg text-gray-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            All registrations via Unstop. March 14-15, 2026 at Newton School of Technology.
          </motion.p>
        </motion.div>

        {/* Category sections */}
        {categories.filter(c => c !== 'All').map((category) => {
          const categoryComps = competitions.filter(c => c.category === category);
          if (categoryComps.length === 0) return null;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
                <span className="bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent">
                  {category}
                </span>
                <span className="text-sm font-normal text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                  {categoryComps.length} event{categoryComps.length > 1 ? 's' : ''}
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryComps.map((comp, index) => (
                  <motion.div
                    key={comp.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className="relative h-full bg-gradient-to-br from-[#180C16] via-[#200934] to-[#350609] rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                      style={{ boxShadow: '0 0 0 rgba(0,0,0,0)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 25px 50px -12px ${comp.glowColor}`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)'; }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${comp.gradient} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300`} />

                      <div className="relative z-10 p-8 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                          <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${comp.gradient} shadow-lg`}>
                            <comp.icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs font-bold px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-gray-400">
                              {comp.type}
                            </span>
                            <span className="text-xs font-bold px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-gray-400">
                              {comp.difficulty}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-black mb-3 text-white">{comp.title}</h3>
                        <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{comp.description}</p>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-sm font-medium">Prize Pool</span>
                            <span className={`font-black text-lg bg-gradient-to-r ${comp.gradient} bg-clip-text text-transparent`}>
                              {comp.prize}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-sm font-medium">Duration</span>
                            <span className="text-gray-300 font-semibold text-sm">{comp.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-sm font-medium">Team Size</span>
                            <span className="text-gray-300 font-semibold text-sm">{comp.participants}</span>
                          </div>
                          <div className="pt-2 border-t border-white/5">
                            <span className="text-gray-500 text-xs">{comp.details}</span>
                          </div>
                        </div>

                        <a
                          href={comp.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r ${comp.gradient} rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 text-white`}
                        >
                          Register on Unstop
                          <FiExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative bg-gradient-to-br from-[#180C16] via-[#200934] to-[#350609] rounded-3xl p-16 text-center border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#560F28]/10 via-[#200934]/10 to-[#350609]/10" />
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-6">Ready to Compete?</h2>
              <p className="text-2xl text-gray-400 mb-10 max-w-2xl mx-auto">
                All registrations happen on Unstop. Click any event above to register your team.
              </p>
              <a
                href="https://unstop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-12 py-5 bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] rounded-full font-bold text-xl shadow-2xl shadow-[0_18px_50px_rgba(220,20,38,0.28)] hover:shadow-[0_22px_60px_rgba(220,20,38,0.38)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Browse All on Unstop
                <FiExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
