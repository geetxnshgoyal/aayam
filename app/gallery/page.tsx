'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const categories = ['All', 'Hackathon', 'Robotics', 'Coding', 'Workshops', 'Campus'];

const galleryImages = [
  { id: 1, category: 'Hackathon', title: '24-Hour Hackathon', description: 'Teams building through the night', src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80' },
  { id: 2, category: 'Robotics', title: 'Robo Fighting Arena', description: 'Combat bots in action', src: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80' },
  { id: 3, category: 'Coding', title: 'CP Contest Finals', description: 'Intense algorithmic battles', src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80' },
  { id: 4, category: 'Workshops', title: 'AI/ML Workshop', description: 'Hands-on machine learning session', src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80' },
  { id: 5, category: 'Campus', title: 'Opening Ceremony', description: 'Newton School of Technology campus', src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80' },
  { id: 6, category: 'Hackathon', title: 'Team Collaboration', description: 'Brainstorming innovative solutions', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80' },
  { id: 7, category: 'Robotics', title: 'Drone Hurdle Racing', description: 'Precision flying competition', src: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80' },
  { id: 8, category: 'Coding', title: 'Open Source Sprint', description: 'Contributing to real projects', src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80' },
  { id: 9, category: 'Workshops', title: 'IoT Lab Session', description: 'Smart device programming', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 10, category: 'Campus', title: 'Networking Zone', description: 'Connecting with industry leaders', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
  { id: 11, category: 'Robotics', title: 'Maze Solver Challenge', description: 'Autonomous bot navigation', src: 'https://images.unsplash.com/photo-1561557944-6e7860b7b847?w=600&q=80' },
  { id: 12, category: 'Campus', title: 'Prize Ceremony', description: 'Celebrating the winners', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80' },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20 min-w-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <motion.header
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="font-mono text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
            &gt; GALLERY
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Moments from AAYAM at Newton School of Technology
          </p>
        </motion.header>

        <motion.nav
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
          aria-label="Filter by category"
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`font-mono text-sm px-4 py-2.5 min-h-[44px] rounded border transition-all touch-manipulation ${
                selectedCategory === category
                  ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
                  : 'border-[var(--border-accent)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.article
              key={image.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              viewport={{ once: true }}
              className="card-retro rounded-sm overflow-hidden cursor-pointer group border-2 border-[var(--border-subtle)] hover:border-[var(--accent-magenta)] hover:shadow-[8px_8px_0_var(--accent-yellow)] transition-all duration-300"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="relative w-full aspect-[4/3] bg-[var(--bg-elevated)] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 border-2 border-[var(--border-subtle)] group-hover:border-[var(--accent-yellow)] transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--bg-card)] to-transparent">
                  <h3 className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                    {image.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs">{image.description}</p>
                  <span className="inline-block mt-2 font-mono text-[10px] text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 px-2 py-0.5 rounded">
                    {image.category}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="card-retro rounded-sm p-10 text-center">
            <h2 className="font-mono text-xl md:text-2xl font-bold mb-4 text-[var(--text-primary)]">
              &gt; SEE MORE
            </h2>
            <p className="text-[var(--text-secondary)] mb-6 max-w-lg mx-auto">
              Follow AAYAM on social media for live updates, photos, and behind-the-scenes content.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://instagram.com/aayamfest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-semibold bg-[var(--phosphor-green)] text-[var(--bg-deep)] border border-[var(--phosphor-green)] hover:shadow-[0_0_15px_var(--glow-primary)] transition-all"
              >
                Follow on Instagram
              </a>
              <button
                type="button"
                className="px-6 py-3 font-mono text-sm font-semibold border border-[var(--border-accent)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
              >
                View Full Album
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      {selectedImage !== null && (() => {
        const img = galleryImages.find((i) => i.id === selectedImage);
        return img ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full aspect-video bg-[var(--bg-card)] rounded-sm border-4 border-[var(--accent-yellow)] overflow-hidden shadow-[12px_12px_0_var(--accent-magenta)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={img.src} alt={img.title} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 896px" />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 min-w-[44px] min-h-[44px] rounded border border-[var(--border-accent)] bg-[var(--bg-elevated)] hover:border-[var(--phosphor-green)] flex items-center justify-center transition-colors touch-manipulation"
              aria-label="Close preview"
            >
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="font-mono font-bold text-white">{img.title}</h3>
              <p className="text-sm text-white/80">{img.description}</p>
            </div>
          </motion.div>
        </motion.div>
        ) : null;
      })()}
    </div>
  );
}
