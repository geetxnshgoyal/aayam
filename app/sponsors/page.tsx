"use client";

import Link from "next/link";

const tiers = [
  {
    name: "Title Sponsor",
    amount: "INR 5,00,000",
    tone: "secondary",
    points: [
      "Prime branding across all digital and physical collateral",
      "Dedicated weekly social media campaign",
      "Hero header logo placement on website",
      "15-minute keynote slot on main stage",
    ],
    cta: "Secure Partnership",
  },
  {
    name: "Powered Sponsor",
    amount: "INR 3,00,000",
    tone: "primary",
    points: [
      "Secondary branding placement",
      "Bi-weekly social media promotion",
      "Logo on website footer and partners page",
      "Stage mentions during flagship events",
    ],
    cta: "Apply Now",
  },
  {
    name: "Associate Partner",
    amount: "INR 1,50,000",
    tone: "tertiary",
    points: [
      "Branding on specific event zone",
      "Collaborative social media post",
      "Logo in partner grid on website",
      "Curated campus activation opportunity",
    ],
    cta: "Inquire",
  },
];

const collaborators = [
  "Newton School",
  "Abhibus",
  "TruScholar",
  "Prera",
  "F Community India",
];


export default function SponsorsPage() {
  return (
    <div className="bg-[#0e0e0e] text-white pt-36 md:pt-40 overflow-hidden">
      <section className="relative px-6 md:px-12 lg:px-20 min-h-[520px] flex items-end pb-14">
        <div className="aayam-halftone absolute inset-0 opacity-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block bg-[radial-gradient(circle_at_20%_20%,rgba(193,255,254,0.2),transparent_35%),radial-gradient(circle_at_70%_30%,rgba(255,81,250,0.2),transparent_40%),linear-gradient(135deg,#111,#0b0b0b)] opacity-80" />

        <div className="relative z-10 max-w-6xl">
          <div className="inline-block bg-[#ff51fa] text-black px-4 py-1 font-black italic uppercase tracking-[0.2em] text-xs mb-6">
            Join The Elite Vanguard / FY26
          </div>
          <h1 className="font-black italic uppercase tracking-tighter leading-none text-5xl md:text-8xl">
            Fuel The <span className="text-[#c1fffe]">Future.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[#c1fffe] font-bold uppercase tracking-wide text-lg md:text-2xl">
            Partner with AAYAM and put your brand in front of 50K+ builders, operators, and engineering minds.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          <article className="md:col-span-12 lg:col-span-7 bg-[#20201f] border-l-8 border-[#ff51fa] p-8 md:p-10 min-h-[460px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-5 -top-8 text-[#ff51fa]/15 text-[9rem] font-black leading-none">01</div>
            <div>
              <h2 className="text-[#ff51fa] font-black italic uppercase tracking-tighter text-4xl md:text-5xl">{tiers[0].name}</h2>
              <p className="text-[#c1fffe] text-2xl md:text-3xl font-black tracking-widest mt-2">{tiers[0].amount}</p>
              <ul className="mt-8 space-y-4">
                {tiers[0].points.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm md:text-base uppercase tracking-wide font-bold text-zinc-100">
                    <span className="text-[#ff51fa]">▣</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="mailto:aayam.fest@newtonschool.co" className="mt-10 inline-block w-full md:w-auto bg-[#ff51fa] text-black font-black italic uppercase tracking-[0.12em] px-8 py-4 hover:brightness-110 transition">
              {tiers[0].cta}
            </Link>
          </article>

          <article className="md:col-span-6 lg:col-span-5 bg-[#262626] border-t-8 border-[#c1fffe] p-8 min-h-[460px] flex flex-col justify-between">
            <div>
              <h3 className="text-[#c1fffe] font-black italic uppercase tracking-tighter text-3xl md:text-4xl">{tiers[1].name}</h3>
              <p className="text-[#fffeac] text-xl md:text-2xl font-black tracking-widest mt-2">{tiers[1].amount}</p>
              <ul className="mt-7 space-y-3">
                {tiers[1].points.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm uppercase tracking-wide font-bold text-zinc-100">
                    <span className="text-[#c1fffe]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="mailto:aayam.fest@newtonschool.co" className="mt-8 inline-block bg-[#c1fffe] text-black font-black italic uppercase tracking-[0.12em] px-8 py-4 text-center hover:brightness-110 transition">
              {tiers[1].cta}
            </Link>
          </article>

          <article className="md:col-span-6 lg:col-span-4 bg-[#1a1a1a] border-b-8 border-[#fffeac] p-8 min-h-[360px] flex flex-col justify-between">
            <div>
              <h3 className="text-[#fffeac] font-black italic uppercase tracking-tighter text-3xl">{tiers[2].name}</h3>
              <p className="text-zinc-300 text-lg font-black tracking-widest mt-2">{tiers[2].amount}</p>
              <ul className="mt-6 space-y-3">
                {tiers[2].points.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs md:text-sm uppercase tracking-wide font-bold text-zinc-200">
                    <span className="text-[#fffeac]">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="mailto:aayam.fest@newtonschool.co" className="mt-8 inline-block border-4 border-[#fffeac] text-[#fffeac] font-black italic uppercase tracking-[0.12em] px-6 py-3 text-center hover:bg-[#fffeac] hover:text-black transition">
              {tiers[2].cta}
            </Link>
          </article>

          <article className="md:col-span-12 lg:col-span-8 border-2 border-[#484847]/40 bg-[#202020]/60 backdrop-blur p-8 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-4xl font-black italic text-[#c1fffe]">50K+</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-bold">Footfall Expected</p>
              </div>
              <div>
                <p className="text-4xl font-black italic text-[#ff51fa]">200+</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-bold">Colleges</p>
              </div>
              <div>
                <p className="text-4xl font-black italic text-[#fffeac]">1M+</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-bold">Social Impressions</p>
              </div>
              <div>
                <p className="text-4xl font-black italic text-[#00e6e6]">15+</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 font-bold">Core Domains</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-20 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
            <div>
              <h3 className="font-black italic uppercase tracking-tighter text-4xl">Past Collaborators</h3>
              <div className="h-1 w-32 bg-[#ff51fa] mt-2" />
            </div>
            <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] font-bold md:text-right max-w-md">
              Join the league of global tech partners that powered our ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[2px] bg-[#484847]/40 border border-[#484847]/40">
            {collaborators.map((brand, index) => (
              <div
                key={brand}
                className={`aspect-square bg-[#1a1a1a] flex items-center justify-center p-5 font-black uppercase tracking-tight text-center text-sm transition ${index % 3 === 0 ? "hover:bg-[#c1fffe]/10" : index % 3 === 1 ? "hover:bg-[#ff51fa]/10" : "hover:bg-[#fffeac]/10"}`}
              >
                <span className="text-zinc-200">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-20 text-center border-t-8 border-[#00ffff] relative overflow-hidden">
        <div className="aayam-halftone absolute inset-0 opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="font-black italic uppercase tracking-tighter text-5xl md:text-7xl">
            Ready To Become An <span className="text-[#ff51fa] underline decoration-4 underline-offset-8">Icon?</span>
          </h2>
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/brochure/aayam-sponsorship-booklet-2026.pdf" target="_blank" rel="noopener noreferrer" className="bg-[#c1fffe] text-black font-black italic uppercase tracking-[0.12em] px-10 py-5 hover:brightness-110 transition">
              Download Brochure
            </Link>
            <Link href="mailto:aayam.fest@newtonschool.co" className="border-4 border-white text-white font-black italic uppercase tracking-[0.12em] px-10 py-5 hover:bg-white hover:text-black transition">
              Connect With Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
