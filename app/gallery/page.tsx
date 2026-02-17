'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = ['All', 'Hackathon', 'Robotics', 'Coding', 'Workshops', 'Campus'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const galleryImages = [
    { id: 1, category: 'Hackathon', title: '24-Hour Hackathon', description: 'Teams building through the night' },
    { id: 2, category: 'Robotics', title: 'Robo Fighting Arena', description: 'Combat bots in action' },
    { id: 3, category: 'Coding', title: 'CP Contest Finals', description: 'Intense algorithmic battles' },
    { id: 4, category: 'Workshops', title: 'AI/ML Workshop', description: 'Hands-on machine learning session' },
    { id: 5, category: 'Campus', title: 'Opening Ceremony', description: 'Newton School of Technology campus' },
    { id: 6, category: 'Hackathon', title: 'Team Collaboration', description: 'Brainstorming innovative solutions' },
    { id: 7, category: 'Robotics', title: 'Drone Hurdle Racing', description: 'Precision flying competition' },
    { id: 8, category: 'Coding', title: 'Open Source Sprint', description: 'Contributing to real projects' },
    { id: 9, category: 'Workshops', title: 'IoT Lab Session', description: 'Smart device programming' },
    { id: 10, category: 'Campus', title: 'Networking Zone', description: 'Connecting with industry leaders' },
    { id: 11, category: 'Robotics', title: 'Maze Solver Challenge', description: 'Autonomous bot navigation' },
    { id: 12, category: 'Campus', title: 'Prize Ceremony', description: 'Celebrating the winners' },
  ];

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0A0B16] text-white pt-28 pb-20">
      {/* Dark cyberpunk ambiance */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(86,15,40,0.3),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(32,9,52,0.25),transparent_55%)]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Hero */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Moments from AAYAM at Newton School of Technology
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === category
                ? 'bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] text-white shadow-lg shadow-[0_12px_30px_rgba(220,20,38,0.3)]'
                  : 'bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-white border border-white/5'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/15 transition-all duration-300"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Image src="/images/logo.png" alt="AAYAM" fill className="object-contain" />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B16]/80 via-[#180C16]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                <p className="text-gray-300 text-sm mb-2">{image.description}</p>
                <span className="inline-block px-3 py-1 bg-[#dc1426]/20 text-[#dc1426] rounded-full text-xs font-medium">
                  {image.category}
                </span>
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 rounded-3xl p-12 text-center border border-white/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to See More?</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Follow AAYAM on social media for live updates, photos, and behind-the-scenes content.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3.5 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] rounded-full font-semibold hover:shadow-lg hover:shadow-[0_12px_30px_rgba(220,20,38,0.3)] transition-all duration-300 hover:scale-105 active:scale-95">
                Follow on Instagram
              </button>
              <button className="px-8 py-3.5 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm bg-white/5">
                View Full Album
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0A0B16]/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 opacity-20">
                <Image src="/images/logo.png" alt="AAYAM" fill className="object-contain" />
              </div>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
