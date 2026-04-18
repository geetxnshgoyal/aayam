"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const highlightCards = [
  {
    id: "PANEL 01",
    title: "HYPER-STRUCTURES",
    description:
      "Explore architecture of the impossible with live demos of gravity-defying digital constructs and metaverse urban systems.",
    tone: "cyan",
  },
  {
    id: "PANEL 02",
    title: "NEURAL SYNTHESIS",
    description:
      "Direct interface workshops that blend human intuition with machine-speed creation across AI, systems, and interaction design.",
    tone: "pink",
  },
  {
    id: "PANEL 03",
    title: "QUANTUM VOID",
    description:
      "Step into zero-point simulations and multi-sensory data realms with real-time visual computing and sound-reactive environments.",
    tone: "yellow",
  },
];

const tickerItems = [
  "SIGNAL STRENGTH: MAXIMUM",
  "ARENA STATUS: READY",
  "COORDINATES: NST BENGALURU",
  "ACCESS LEVEL: OPEN",
];

function Countdown() {
  const target = useMemo(() => new Date("2026-04-25T09:00:00+05:30").getTime(), []);
  const [now, setNow] = useState(() => new Date().valueOf());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const total = Math.max(0, target - now);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return (
    <span>
      INITIATING IN: {String(days).padStart(2, "0")}D : {String(hours).padStart(2, "0")}H : {String(minutes).padStart(2, "0")}M : {String(seconds).padStart(2, "0")}S
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#0e0e0e] text-white pt-36 md:pt-40 overflow-hidden">
      <section className="relative px-6 md:px-12 lg:px-20 pb-20">
        <div className="aayam-halftone absolute inset-0 opacity-30 pointer-events-none" />
        <div className="aayam-grid absolute inset-x-0 top-0 h-[480px] opacity-50 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-7xl mx-auto">
          <div className="lg:col-span-7">
            <div className="inline-block bg-[#ff51fa] text-black px-4 py-1 text-xs font-black tracking-[0.22em] uppercase">
              EST. 2026 // NEO-TOKYO SECTOR
            </div>

            <h1 className="mt-6 leading-none uppercase italic font-black tracking-tighter">
              <span className="block text-6xl md:text-8xl lg:text-9xl text-[#c1fffe] drop-shadow-[4px_4px_0px_#ff51fa]">
                AAYAM
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl text-transparent [-webkit-text-stroke:1px_#c1fffe] -mt-1 md:-mt-3">
                2026
              </span>
            </h1>

            <p className="mt-8 max-w-2xl border-l-4 border-[#fffeac] pl-5 text-base md:text-xl font-semibold uppercase tracking-wide text-zinc-100">
              The protocol reset is live. Join the convergence of neural systems, quantum computation, and high-impact builder culture.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/competitions"
                className="bg-gradient-to-r from-[#c1fffe] to-[#00ffff] text-black font-black uppercase px-8 py-4 text-sm md:text-base tracking-[0.08em] hover:brightness-110 transition"
              >
                Join The Arena
              </Link>
              <Link
                href="/about"
                className="border-2 border-[#484847] text-[#ff51fa] font-black uppercase px-8 py-4 text-sm md:text-base tracking-[0.08em] hover:bg-[#ff51fa]/10 hover:border-[#ff51fa] transition"
              >
                View Manifesto
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border border-[#2a2a2a] bg-[#131313] p-3">
              <div className="absolute -top-2 -left-2 h-8 w-8 border-t-4 border-l-4 border-[#00ffff] z-10" />
              <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-4 border-r-4 border-[#00ffff] z-10" />

              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#1e1e1e] via-[#0f0f0f] to-[#1a1a1a]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ3rqzNeAxMDMVhOVCh9S3xk3W1iPCgp9SV59KxLS-Icg0eGjb5JiWMkB6EbEenjygRds9Ti_aTB_6H1XTWoGd7zkbf574ifyO9GKdPpVbmUYtVl8LmFqi-yqigK4i_DCds69c8nkgDE-CthVkF5nIuYeR3QSX2hL0hIiVa2tQW603mgcSrhPE2G7KfAHQigcXBp2PuCl5kAn2k89fZP-v1znL1qReNOqv9P-U09OeN-fi7XmczNQmwt03NsEEzSaxX-CxLILCo4F0"
                  alt="Neural Synthesis Terminal"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 30vw"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,81,250,0.22),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(193,255,254,0.2),transparent_38%),radial-gradient(circle_at_50%_95%,rgba(255,255,0,0.14),transparent_30%)]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ff51fa]/20 via-transparent to-[#00ffff]/20 mix-blend-screen" />

                <div className="absolute bottom-5 left-5 right-5 border-l-4 border-[#ff51fa] bg-black/70 backdrop-blur px-4 py-3">
                  <span className="block text-[#ff51fa] font-bold text-[10px] tracking-[0.22em] uppercase">ID: PROTOCOL_01</span>
                  <span className="font-black text-base tracking-tight">Neural Synthesis Terminal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-y-4 border-[#131313] bg-[#131313] py-6">
          <div className="aayam-ticker-track whitespace-nowrap text-2xl md:text-4xl font-black italic uppercase tracking-tight">
            <div className="inline-flex items-center gap-8 px-4">
              <span className="text-[#fffeac]"><Countdown /></span>
              <span className="text-[#484847]">•</span>
              {tickerItems.map((item) => (
                <span key={item} className="text-[#c1fffe]">{item}</span>
              ))}
              <span className="text-[#484847]">•</span>
              <span className="text-[#ff51fa]">ARENA STATUS: READY</span>
            </div>
            <div className="inline-flex items-center gap-8 px-4" aria-hidden>
              <span className="text-[#fffeac]"><Countdown /></span>
              <span className="text-[#484847]">•</span>
              {tickerItems.map((item) => (
                <span key={`dup-${item}`} className="text-[#c1fffe]">{item}</span>
              ))}
              <span className="text-[#484847]">•</span>
              <span className="text-[#ff51fa]">ARENA STATUS: READY</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end gap-4 mb-14">
            <div className="h-1 bg-[#00ffff] flex-grow mb-4" />
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              Festival <span className="text-[#ff51fa]">Highlights</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <article className="md:col-span-8 bg-[#131313] border-r-8 border-black p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#00ffff] text-black font-black px-5 py-1 text-sm -skew-x-12 z-10">
                {highlightCards[0].id}
              </div>
              <div className="h-64 md:h-80 bg-gradient-to-br from-[#0d1b1f] via-[#0d0d0d] to-[#1a1020] border border-[#262626] relative overflow-hidden">
                <Image
                  src="/images/downloaded/coding.jpg"
                  alt="Hyper-Structures"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
                />
              </div>
              <h3 className="mt-8 text-4xl font-black italic text-[#c1fffe]">{highlightCards[0].title}</h3>
              <p className="mt-4 text-zinc-300 max-w-2xl uppercase tracking-wide text-sm">{highlightCards[0].description}</p>
              <Link href="/competitions" className="inline-block mt-6 bg-[#262626] px-5 py-2 font-bold uppercase text-sm hover:bg-[#00ffff] hover:text-black transition">
                Access Data
              </Link>
            </article>

            <article className="md:col-span-4 bg-[#1f1f1f] border-l-8 border-black p-8 flex flex-col justify-between">
              <div>
                <div className="h-16 w-16 bg-[#ff51fa] text-black flex items-center justify-center font-black text-3xl">N</div>
                <h3 className="mt-6 text-4xl font-black italic text-[#ff51fa] leading-none">NEURAL<br />SYNTHESIS</h3>
                <p className="mt-5 text-zinc-300 uppercase text-sm tracking-wide">{highlightCards[1].description}</p>
              </div>
              <div className="mt-8 h-36 border-4 border-[#ff51fa]/30 bg-gradient-to-br from-[#210b20] to-[#0d0d0d] relative overflow-hidden">
                <Image
                  src="/images/downloaded/robotics.jpg"
                  alt="Neural Synthesis"
                  fill
                  className="object-cover opacity-60"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </article>

            <article className="md:col-span-12 bg-[#fffeac] text-[#1f1f00] border-t-8 border-black p-10 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Quantum Void</h3>
                <p className="mt-3 text-lg md:text-2xl font-black uppercase leading-tight">Step into the unknown data field and challenge perception, speed, and strategy.</p>
              </div>
              <div className="h-32 bg-black text-[#c1fffe] relative overflow-hidden">
                <Image
                  src="/images/downloaded/hackathon.jpg"
                  alt="Quantum Void"
                  fill
                  className="object-cover opacity-40"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-center justify-center font-black tracking-[0.4em] uppercase bg-black/40">
                  Connecting...
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 md:px-12 lg:px-20 bg-[#131313] overflow-hidden">
        <div className="absolute bottom-0 right-0 text-[12rem] md:text-[18rem] font-black italic text-white/5 leading-none select-none pointer-events-none">
          AAYAM
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
            Ready To <span className="text-[#00ffff]">Breach?</span>
          </h2>
          <p className="mt-8 text-zinc-200 font-semibold uppercase tracking-wide">
            Registration is open. Limited slots for high-latency operators only.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="ENTER OPERATOR ID (EMAIL)"
              className="bg-[#262626] px-6 py-4 text-center md:text-left font-black uppercase tracking-wide min-w-[280px] border border-[#3a3a3a] focus:border-[#00ffff] outline-none"
            />
            <Link
              href="/competitions"
              className="bg-[#ff51fa] text-black font-black px-10 py-4 uppercase tracking-wide hover:brightness-110 transition"
            >
              Initialize Registration
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
