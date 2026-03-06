'use client';

import { motion } from 'framer-motion';
import { HiCode, HiChip, HiLightningBolt, HiCog, HiPuzzle, HiCube } from 'react-icons/hi';
import { FiExternalLink } from 'react-icons/fi';
import { FaRobot, FaRocket, FaDragon, FaGamepad, FaHelicopter, FaGithub } from 'react-icons/fa';

const competitions = [
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
  },
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
  },
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
  },
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
  },
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
  },
];

const categories = ['Hackathon', 'Coding', 'Open Source', 'Robotics', 'General'];

/** Background images per category for card styling */
const CATEGORY_BG: Record<string, string> = {
  Hackathon: '/images/backgrounds/tech-glows.jpg',
  Coding: '/images/backgrounds/tech-matrix.jpg',
  'Open Source': '/images/backgrounds/tech-matrix.jpg',
  Robotics: '/images/backgrounds/tech-circuit.jpg',
  General: '/images/backgrounds/tech-glows.jpg',
};

export default function CompetitionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="font-mono text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
            &gt; COMPETITIONS
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-2">
            12+ events across Hackathons, Coding, Robotics, and Open Source. Choose your arena.
          </p>
          <p className="text-[var(--text-muted)] text-sm">
            All registrations via Unstop. April 24-25, 2026 at Newton School of Technology.
          </p>
        </motion.header>

        {categories.map((category) => {
          const categoryComps = competitions.filter((c) => c.category === category);
          if (categoryComps.length === 0) return null;

          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="font-mono text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-[var(--accent-cyan)]">{category}</span>
                <span className="text-[var(--text-muted)] text-sm font-normal border border-[var(--border-accent)] px-2 py-0.5 rounded">
                  {categoryComps.length} event{categoryComps.length > 1 ? 's' : ''}
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryComps.map((comp, index) => (
                  <motion.article
                    key={comp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col h-full transition-all duration-200 hover:border-[var(--border-accent)] hover:shadow-[0_0_0_1px_var(--accent-cyan-muted)]"
                  >
                    {/* Category-based background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-[0.22]"
                      style={{ backgroundImage: `url(${CATEGORY_BG[comp.category] ?? CATEGORY_BG['General']})` }}
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-[var(--bg-card)]/92 via-[var(--bg-card)]/88 to-[var(--bg-card)]/95"
                      aria-hidden
                    />
                    <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded border border-[var(--border-accent)]">
                        <comp.icon className="w-6 h-6 text-[var(--accent-cyan)]" aria-hidden />
                      </div>
                      <div className="flex gap-2">
                        <span className="font-mono text-[10px] px-2 py-1 border border-[var(--border-accent)] rounded text-[var(--text-muted)]">
                          {comp.type}
                        </span>
                        <span className="font-mono text-[10px] px-2 py-1 border border-[var(--border-accent)] rounded text-[var(--text-muted)]">
                          {comp.difficulty}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {comp.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4 flex-grow leading-relaxed">
                      {comp.description}
                    </p>

                    <dl className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-[var(--text-muted)]">Prize</dt>
                        <dd className="font-mono text-[var(--accent-cyan)]">{comp.prize}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[var(--text-muted)]">Duration</dt>
                        <dd className="text-[var(--text-secondary)]">{comp.duration}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[var(--text-muted)]">Team</dt>
                        <dd className="text-[var(--text-secondary)]">{comp.participants}</dd>
                      </div>
                      <div className="pt-2 border-t border-[var(--border-subtle)]">
                        <dd className="text-[var(--text-muted)] text-xs">{comp.details}</dd>
                      </div>
                    </dl>

                    <a
                      href={comp.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 font-mono text-sm font-semibold bg-[var(--accent-primary)] text-white border border-[var(--accent-primary)] hover:shadow-[0_0_15px_var(--glow-primary)] transition-all"
                    >
                      Register on Unstop
                      <FiExternalLink className="w-4 h-4" aria-hidden />
                    </a>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          );
        })}

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="card-retro rounded-sm p-10 md:p-14 text-center">
            <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)]">
              &gt; READY TO COMPETE?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              All registrations happen on Unstop. Click any event above to register your team.
            </p>
            <a
              href="https://unstop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-mono text-sm font-semibold bg-[var(--phosphor-green)] text-[var(--bg-deep)] border border-[var(--phosphor-green)] hover:shadow-[0_0_20px_var(--glow-primary)] transition-all"
            >
              Browse All on Unstop
              <FiExternalLink className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
