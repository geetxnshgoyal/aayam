'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Competitions', href: '/competitions' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Sponsor Brochure', href: '/brochure/aayam-sponsorship-booklet-2026.pdf', external: true },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
  ];

  const events = ['24-Hour Hackathon', 'CP Contest', 'Robo Fighting', 'Open Source Challenge', 'Drone Racing'];

  return (
    <footer
      className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] pt-16 pb-8"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="relative w-32 h-10 mb-4">
              <Image src="/images/logo.png" alt="AAYAM 2026" fill className="object-contain" />
            </div>
            <p className="font-mono text-xs text-[var(--accent-yellow)] mb-1 tracking-wider">
              STEP BEYOND THE KNOWN
            </p>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Techfest by Newton School of Technology
            </p>
            <a
              href="https://instagram.com/aayamfest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-yellow)] transition-colors border-2 border-[var(--accent-yellow)]/40 px-3 py-2 rounded-sm"
              aria-label="Follow AAYAM on Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.766 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent-yellow)] mb-4 font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-yellow)] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent-yellow)] mb-4 font-semibold">
              Events
            </h3>
            <ul className="space-y-2.5">
              {events.map((name) => (
                <li key={name}>
                  <Link
                    href="/competitions"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-yellow)] transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent-yellow)] mb-4 font-semibold">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li>
                <a href="mailto:aayam.fest@newtonschool.co" className="hover:text-[var(--accent-yellow)] transition-colors">
                  aayam.fest@newtonschool.co
                </a>
              </li>
              <li>
                <a href="tel:+919983241206" className="hover:text-[var(--accent-yellow)] transition-colors">
                  +91 9983241206
                </a>
              </li>
              <li>
                <a href="tel:+917569319430" className="hover:text-[var(--accent-yellow)] transition-colors">
                  +91 7569319430
                </a>
              </li>
              <li className="leading-relaxed break-words max-w-[min(100%,20rem)]">
                Newton School of Technology, NST S-VYASA University, P3 Block, Sattva Global City, Global Village, Bengaluru, Karnataka 560059
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 pb-[env(safe-area-inset-bottom)]">
          <p className="font-mono text-xs text-[var(--text-muted)] text-center md:text-left">
            © {currentYear} AAYAM · Newton School of Technology
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 font-mono text-xs">
            <Link href="#" className="text-[var(--text-muted)] hover:text-[var(--accent-yellow)] transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-[var(--text-muted)] hover:text-[var(--accent-yellow)] transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-[var(--text-muted)] hover:text-[var(--accent-yellow)] transition-colors">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
