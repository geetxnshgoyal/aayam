'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Competitions', href: '/competitions' },
    { name: 'Ambassador', href: '/ambassador' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Brochure', href: '/brochure/aayam-sponsorship-booklet-2026.pdf', external: true },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(href));

  return (
    <header role="banner">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top)] ${
          scrolled ? 'bg-[var(--bg-card)]/95 border-b border-[var(--border-subtle)]' : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group" aria-label="AAYAM Home">
              <div className="relative w-24 h-8 md:w-28 md:h-10 transition-opacity group-hover:opacity-90">
                <Image
                  src="/images/logo.png"
                  alt="AAYAM 2026"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-mono text-[10px] md:text-xs text-[var(--text-muted)] hidden sm:inline border-l border-[var(--border-accent)] pl-2 ml-2">
                AAYAM.2026
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={`font-mono text-sm px-3 py-2 rounded border border-transparent transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan-muted)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--border-accent)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
                <Link
                  href="/competitions"
                  className="ml-3 font-pixel text-[10px] px-4 py-2 bg-[var(--accent-primary)] text-[var(--text-primary)] font-semibold border-[3px] border-[var(--accent-primary-border)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[0_4px_12px_var(--glow-primary)] transition-all duration-200"
                >
                  Register
                </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent-cyan)] border border-[var(--border-accent)] rounded transition-colors touch-manipulation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-[var(--bg-card)] border-t border-[var(--border-subtle)]"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className={`block font-mono text-sm py-3 px-4 rounded border transition-colors ${
                      isActive(link.href)
                        ? 'text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan-muted)]'
                        : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-elevated)]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/competitions"
                  onClick={() => setIsOpen(false)}
                  className="block w-full mt-3 py-3 px-4 font-pixel text-[10px] text-center bg-[var(--accent-primary)] text-[var(--text-primary)] font-semibold rounded border-[3px] border-[var(--accent-primary-border)]"
                >
                  Register
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
