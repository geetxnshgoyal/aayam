'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCode, HiChip, HiLightningBolt, HiCog, HiPuzzle, HiCube } from 'react-icons/hi';
import { FiExternalLink } from 'react-icons/fi';
import { FaRobot, FaRocket, FaDragon, FaGamepad, FaHelicopter, FaGithub } from 'react-icons/fa';

type CompItem = (typeof competitions)[number];

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

/** COMICO panel border/shadow by category */
const CATEGORY_STYLE: Record<string, { border: string; shadow: string; badge: string }> = {
  Hackathon: { border: 'border-[var(--accent-orange)]', shadow: 'shadow-[8px_8px_0_var(--accent-magenta)]', badge: 'bg-[var(--accent-orange)] text-[var(--ink)]' },
  Coding: { border: 'border-[var(--accent-cyan)]', shadow: 'shadow-[8px_8px_0_var(--accent-yellow)]', badge: 'bg-[var(--accent-cyan)] text-[var(--ink)]' },
  'Open Source': { border: 'border-[var(--accent-magenta)]', shadow: 'shadow-[8px_8px_0_var(--accent-cyan)]', badge: 'bg-[var(--accent-magenta)] text-[var(--ink)]' },
  Robotics: { border: 'border-[var(--accent-yellow)]', shadow: 'shadow-[8px_8px_0_var(--accent-orange)]', badge: 'bg-[var(--accent-yellow)] text-[var(--ink)]' },
  General: { border: 'border-[var(--accent-magenta)]', shadow: 'shadow-[8px_8px_0_var(--accent-yellow)]', badge: 'bg-[var(--accent-magenta)] text-[var(--ink)]' },
};

export default function CompetitionsPage() {
  const [selectedComp, setSelectedComp] = useState<CompItem | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-20 min-w-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <motion.header
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 pt-8"
        >
          <div className="inline-block border-4 border-[var(--accent-yellow)] bg-[var(--bg-card)] px-6 py-4 mb-6 shadow-[10px_10px_0_var(--accent-magenta)]">
            <h1 className="font-pixel text-xl sm:text-2xl md:text-4xl font-bold text-[var(--accent-yellow)] break-words">
              &gt; COMPETITIONS
            </h1>
          </div>
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
          const style = CATEGORY_STYLE[category] ?? CATEGORY_STYLE.General;

          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="font-pixel text-lg md:text-xl font-bold mb-6 flex flex-wrap items-center gap-3">
                <span className={`inline-block px-3 py-1.5 border-2 border-[var(--ink)] ${style.badge} shadow-[4px_4px_0_var(--ink)]`}>
                  {category}
                </span>
                <span className="font-mono text-sm font-normal text-[var(--text-muted)] border-2 border-[var(--accent-yellow)] px-2 py-1 rounded-sm bg-[var(--bg-card)]">
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
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedComp(comp)}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedComp(comp)}
                    className={`relative overflow-hidden rounded-sm border-4 ${style.border} bg-[var(--bg-card)] flex flex-col h-full transition-all duration-200 ${style.shadow} hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_var(--ink)] cursor-pointer`}
                  >
                    <div className="relative z-10 p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 rounded-sm border-2 border-[var(--ink)] bg-[var(--paper)]/10">
                          <comp.icon className="w-6 h-6 text-[var(--accent-yellow)]" aria-hidden />
                        </div>
                        <div className="flex gap-2">
                          <span className="font-mono text-[10px] px-2 py-1 border-2 border-[var(--ink)] rounded-sm text-[var(--text-muted)] bg-[var(--bg-elevated)]">
                            {comp.type}
                          </span>
                          <span className="font-mono text-[10px] px-2 py-1 border-2 border-[var(--accent-yellow)] rounded-sm text-[var(--accent-yellow)]">
                            {comp.difficulty}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-pixel text-base font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide">
                        {comp.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm mb-4 flex-grow leading-relaxed">
                        {comp.description}
                      </p>

                      <dl className="space-y-2 mb-4 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-[var(--text-muted)]">Prize</dt>
                          <dd className="font-mono font-bold text-[var(--accent-yellow)]">{comp.prize}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-[var(--text-muted)]">Duration</dt>
                          <dd className="text-[var(--text-secondary)]">{comp.duration}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-[var(--text-muted)]">Team</dt>
                          <dd className="text-[var(--text-secondary)]">{comp.participants}</dd>
                        </div>
                        <div className="pt-2 border-t-2 border-[var(--border-subtle)]">
                          <dd className="text-[var(--text-muted)] text-xs">{comp.details}</dd>
                        </div>
                      </dl>

                      <a
                        href={comp.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 font-pixel text-xs font-bold bg-[var(--accent-primary)] text-[var(--ink)] border-[3px] border-[var(--accent-yellow)] shadow-[4px_4px_0_var(--ink)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[2px_2px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
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
          <div className="border-4 border-[var(--accent-magenta)] bg-[var(--bg-card)] rounded-sm p-10 md:p-14 text-center shadow-[12px_12px_0_var(--accent-cyan)]">
            <h2 className="font-pixel text-xl md:text-2xl font-bold mb-4 text-[var(--accent-yellow)] uppercase">
              &gt; READY TO COMPETE?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              All registrations happen on Unstop. Click any event above to register your team.
            </p>
            <a
              href="https://unstop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-pixel text-xs font-bold bg-[var(--accent-primary)] text-[var(--ink)] border-[3px] border-[var(--accent-yellow)] shadow-[6px_6px_0_var(--ink)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Browse All on Unstop
              <FiExternalLink className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </motion.section>

        <AnimatePresence>
          {selectedComp && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-[var(--ink)]/85 z-50 backdrop-blur-sm"
                onClick={() => setSelectedComp(null)}
                aria-hidden
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed left-4 right-4 top-[max(1rem,env(safe-area-inset-top))] bottom-[max(1rem,env(safe-area-inset-bottom))] md:inset-auto md:left-1/2 md:top-1/2 md:bottom-auto md:right-auto md:max-h-[90vh] md:max-w-lg md:w-full md:-translate-x-1/2 md:-translate-y-1/2 z-50 rounded-sm border-4 border-[var(--accent-yellow)] overflow-hidden bg-[var(--bg-card)] shadow-[12px_12px_0_var(--accent-magenta)] flex flex-col"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.key === 'Escape' && setSelectedComp(null)}
              >
                <div className="relative min-h-0 flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
                  <div className="relative z-10 p-4 sm:p-6 flex flex-col flex-grow min-h-[320px]">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="p-2 rounded-sm border-2 border-[var(--ink)] bg-[var(--accent-yellow)]">
                        <selectedComp.icon className="w-6 h-6 text-[var(--ink)]" aria-hidden />
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedComp(null)}
                        className="p-2 rounded-sm border-2 border-[var(--accent-magenta)] text-[var(--text-muted)] hover:text-[var(--accent-yellow)] hover:border-[var(--accent-yellow)] transition-colors"
                        aria-label="Close"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <span className={`font-pixel text-xs font-bold px-2 py-0.5 inline-block w-fit mb-2 ${(CATEGORY_STYLE[selectedComp.category] ?? CATEGORY_STYLE.General).badge} text-[var(--ink)]`}>
                      {selectedComp.category}
                    </span>
                    <h3 id="modal-title" className="font-pixel text-lg font-bold text-[var(--text-primary)] mb-2 uppercase">{selectedComp.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4 flex-grow">{selectedComp.description}</p>
                    <dl className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between"><dt className="text-[var(--text-muted)]">Prize</dt><dd className="font-mono font-bold text-[var(--accent-yellow)]">{selectedComp.prize}</dd></div>
                      <div className="flex justify-between"><dt className="text-[var(--text-muted)]">Duration</dt><dd className="text-[var(--text-secondary)]">{selectedComp.duration}</dd></div>
                      <div className="flex justify-between"><dt className="text-[var(--text-muted)]">Team</dt><dd className="text-[var(--text-secondary)]">{selectedComp.participants}</dd></div>
                      <p className="text-[var(--text-muted)] text-xs pt-2 border-t-2 border-[var(--border-subtle)]">{selectedComp.details}</p>
                    </dl>
                    <a
                      href={selectedComp.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 font-pixel text-xs font-bold bg-[var(--accent-primary)] text-[var(--ink)] border-[3px] border-[var(--accent-yellow)] shadow-[4px_4px_0_var(--ink)] hover:bg-[var(--accent-primary-hover)] transition-all"
                    >
                      Register on Unstop
                      <FiExternalLink className="w-4 h-4" aria-hidden />
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
