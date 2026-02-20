'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black/80 backdrop-blur-xl text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="relative w-36 h-14 mb-5">
              <Image 
                src="/images/logo.png" 
                alt="AAYAM Logo" 
                fill 
                className="object-contain" 
              />
            </div>
            <p className="text-gray-400 mb-2 text-sm leading-relaxed">
              Exploring New Dimensions of Technology
            </p>
            <p className="text-gray-500 mb-6 text-sm">
              A techfest by Newton School of Technology
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/aayamfest' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#560F28] hover:border-[#560F28]/30 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-5 text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Competitions', href: '/competitions' },
                { name: 'Sponsors', href: '/sponsors' },
                { name: 'About', href: '/about' },
                { name: 'Gallery', href: '/gallery' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-[#dc1426] transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-sm font-bold mb-5 text-white uppercase tracking-wider">
              Events
            </h3>
            <ul className="space-y-3">
              {['24-Hour Hackathon', 'CP Contest', 'Robo Fighting', 'Open Source Challenge', 'Drone Racing'].map((item) => (
                <li key={item}>
                  <Link href="/competitions" className="text-gray-400 hover:text-[#dc1426] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-5 text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiMail className="text-[#dc1426] mt-0.5 flex-shrink-0" size={18} />
                <a href="mailto:goyalgeetansh@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors">
                  goyalgeetansh@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <HiPhone className="text-[#dc1426] mt-0.5 flex-shrink-0" size={18} />
                <a href="tel:+919983241206" className="text-gray-400 text-sm hover:text-white transition-colors">
                  +91 9983241206
                </a>
              </li>
              <li className="flex items-start gap-3">
                <HiPhone className="text-[#dc1426] mt-0.5 flex-shrink-0" size={18} />
                <a href="tel:+917569319430" className="text-gray-400 text-sm hover:text-white transition-colors">
                  +91 7569319430
                </a>
              </li>
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-[#dc1426] mt-0.5 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">
                  Newton School of Technology<br />
                  Rishihood University Campus<br />
                  Sonipat, Haryana
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © {currentYear} AAYAM · Newton School of Technology. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link href="#" className="text-gray-500 hover:text-[#dc1426] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#dc1426] transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#dc1426] transition-colors">
                Code of Conduct
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
