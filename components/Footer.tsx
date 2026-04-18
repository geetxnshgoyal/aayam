"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Competitions", href: "/competitions" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Sponsor Brochure", href: "/brochure/aayam-sponsorship-booklet-2026.pdf", external: true },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <footer
      className="w-full py-12 px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start bg-[#0e0e0e] border-t-4 border-[#ff51fa]"
      role="contentinfo"
    >
      <div className="flex flex-col gap-4">
        <div className="relative w-28 h-8 mb-2">
          <Image src="/images/logo.png" alt="AAYAM 2026" fill className="object-contain brightness-0 invert" />
        </div>
        <p className="text-[#fffeac] font-bold font-headline text-xs uppercase tracking-[0.2em]">
          © 2026 MISSION CONTROL - AAYAM TECH UNIT
        </p>
        <a
          href="https://instagram.com/aayamfest"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-[#c1fffe] hover:text-[#fffeac] transition-colors font-bold uppercase tracking-[0.15em]"
          aria-label="Follow AAYAM on Instagram"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.766 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          Instagram
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[#c1fffe] font-headline text-xs uppercase tracking-[0.2em] font-bold mb-2 underline decoration-[#ff51fa]">
          Encrypted_Data
        </h3>
        <ul className="space-y-2">
          {quickLinks.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-xs text-[#c1fffe] hover:text-[#fffeac] hover:underline decoration-wavy transition-all font-medium uppercase tracking-[0.08em]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[#ff51fa] font-headline text-xs uppercase tracking-[0.2em] font-bold mb-2 underline decoration-[#fffeac]">
          Signal_Status
        </h3>
        <ul className="space-y-2">
          <li>
            <a href="mailto:aayam.fest@newtonschool.co" className="text-xs text-[#c1fffe] hover:text-[#fffeac] transition-all font-medium uppercase tracking-[0.08em]">
              aayam.fest@newtonschool.co
            </a>
          </li>
          <li>
            <a href="tel:+918968949795" className="text-xs text-[#c1fffe] hover:text-[#fffeac] transition-all font-medium uppercase tracking-[0.08em] block">
              +91 8968949795
            </a>
          </li>
          <li>
            <a href="tel:+917569319430" className="text-xs text-[#c1fffe] hover:text-[#fffeac] transition-all font-medium uppercase tracking-[0.08em] block">
              +91 7569319430
            </a>
          </li>
          <li className="text-[10px] text-[#fffeac] font-black italic mt-3">
            ENCRYPTED CONNECTION : ACTIVE
          </li>
        </ul>
      </div>
    </footer>
  );
}
