'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Competitions', href: '/competitions' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(href));

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl border-b-4 border-[#00ffff]/30 shadow-[0_0_15px_rgba(193,255,254,0.15)]">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative w-24 h-8">
          <Image
            src="/images/logo.png"
            alt="AAYAM"
            fill
            className="object-contain brightness-0 invert"
            priority
          />
        </div>
        <div className="hidden sm:block">
          <div className="text-2xl font-black italic tracking-tighter text-[#c1fffe] drop-shadow-[0_0_8px_rgba(193,255,254,0.8)] uppercase">AAYAM</div>
          <div className="text-[10px] font-black tracking-[0.2em] text-[#ff51fa]">TECH FEST</div>
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`font-black uppercase tracking-tighter text-sm transition-all ${
              isActive(link.href)
                ? 'text-[#ff51fa] border-b-2 border-[#ff51fa] pb-1'
                : 'text-[#c1fffe] opacity-70 hover:opacity-100 hover:text-[#ff51fa] hover:drop-shadow-[0_0_5px_rgba(255,81,250,0.5)]'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/competitions"
          className="hidden md:inline-block bg-[#c1fffe] text-black font-black uppercase px-6 py-2 text-xs tracking-widest hover:brightness-110 transition"
        >
          Register
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <motion.div 
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#c1fffe]" 
          />
          <motion.div 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-[#c1fffe]" 
          />
          <motion.div 
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#c1fffe]" 
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0e0e0e]/95 backdrop-blur-xl border-b-4 border-[#ff51fa] shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-0 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-4 px-3 font-black uppercase tracking-tighter border-l-4 transition-all ${
                    isActive(link.href)
                      ? 'text-[#ff51fa] border-l-[#ff51fa] bg-[#ff51fa]/5'
                      : 'text-[#c1fffe] border-l-transparent hover:border-l-[#c1fffe] hover:bg-[#c1fffe]/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/competitions"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-3 bg-[#c1fffe] text-black font-black uppercase tracking-widest text-sm hover:brightness-110 transition"
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

