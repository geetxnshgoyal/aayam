'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Competitions', href: '/competitions' },
    { name: 'Ambassador', href: '/ambassador' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Brochure', href: '/brochure/aayam-sponsorship-booklet-2026.pdf', external: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/40 backdrop-blur-md border-b border-white/5`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group">
            <div className="relative w-28 h-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-125">
              <Image
                src="/images/logo.png"
                alt="AAYAM Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`relative px-5 py-2.5 font-medium text-[15px] transition-colors duration-200 group ${pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
                  ? 'text-[var(--horror-cyan)] font-bold drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
            <div className="ml-4 h-6 w-px bg-white/10" />
            <Link
              href="/competitions"
              className="ml-4 px-7 py-2.5 bg-gradient-to-r from-[var(--horror-magenta)] to-[var(--horror-purple)] text-white font-semibold rounded-full text-sm hover:shadow-[0_0_20px_rgba(200,0,100,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10"
            >
              Register Now
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2.5 hover:text-[#dc1426] transition-colors rounded-lg hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0b1220]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={`block text-lg font-medium py-3 px-4 rounded-xl transition-all duration-200 ${pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
                      ? 'bg-gradient-to-r from-[var(--energy)]/10 to-[var(--dc1426)]/10 border border-[#560F28]/30 text-transparent bg-clip-text bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)]'
                      : 'text-white hover:text-[#dc1426] hover:bg-white/5'
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-3"
              >
                <Link
                  href="/competitions"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-8 py-4 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] text-white font-bold rounded-2xl text-center hover:shadow-lg hover:shadow-[0_12px_30px_rgba(220,20,38,0.3)] transition-all"
                >
                  Register Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
