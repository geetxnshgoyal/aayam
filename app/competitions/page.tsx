"use client";

import Link from "next/link";

const categories = ["All Ops", "Robotics", "Hackathons", "CP", "Gaming", "Non-Tech"];

const events = [
  {
    title: "BugBash",
    category: "Hackathons",
    pool: "INR 65,000",
    description: "A grueling 24-hour hackathon focused on next-gen implementation. Break systems, build products, and ship under pressure.",
    duration: "24 Hours / Live",
    status: "Priority Alpha",
    accent: "error",
    link: "https://unstop.com/hackathons/bugbash-aayam-newton-school-of-technology-bengaluru-karnataka-1658793"
  },
  {
    title: "Robo Striker",
    category: "Robotics",
    pool: "INR 60,000",
    description: "Steel meets turf. Autonomous and manual bots battle for mechanical glory in a tactical arena format (Robosoccer).",
    duration: "Arena Format",
    status: "Open Sector",
    accent: "primary",
    link: "https://unstop.com/competitions/robo-striker-aayam-newton-school-of-technology-bengaluru-karnataka-1661801"
  },
  {
    title: "FPV Drone Racing",
    category: "Robotics",
    pool: "INR 70,000",
    description: "High-octane FPV drone racing challenge through a tactical obstacle circuit.",
    duration: "Track Event",
    accent: "secondary",
    link: "https://unstop.com/competitions/fpv-drone-racing-challenge-aayam-newton-school-of-technology-bengaluru-karnataka-1661904"
  },
  {
    title: "RC Racing",
    category: "Robotics",
    pool: "INR 50,000",
    description: "High-speed precision driving challenge in a customized obstacle course.",
    duration: "Track Event",
    accent: "tertiary",
    link: "https://unstop.com/competitions/rc-racing-aayam-newton-school-of-technology-bengaluru-karnataka-1667510"
  },
  {
    title: "Line Maze Solver",
    category: "Robotics",
    pool: "INR 15,000",
    description: "Autonomous navigation challenge through complex geometric patterns.",
    duration: "Live Run",
    accent: "primary",
    link: "https://unstop.com/competitions/robo-maze-solver-aayam-newton-school-of-technology-bengaluru-karnataka-1662290"
  },
  {
    title: "SheBuilds",
    category: "Hackathons",
    pool: "INR 30,000",
    description: "Empowering women in tech through a 12-hour high-intensity build-a-thon.",
    duration: "12 Hours",
    accent: "secondary",
    link: "https://unstop.com/hackathons/shebuilds-aayam-newton-school-of-technology-bengaluru-karnataka-1667183"
  },
  {
    title: "BGMI Esports",
    category: "Gaming",
    pool: "INR 50,000",
    description: "Tactical squad-based battle royale action on the big stage.",
    duration: "LAN Final",
    accent: "secondary",
    link: "https://unstop.com/events/bgmi-esports-tournament-aayam-newton-school-of-technology-bengaluru-karnataka-1662088"
  },
  {
    title: "Next Turing",
    category: "CP",
    pool: "INR 10,000",
    description: "Advanced algorithmic challenges for the brightest minds (Competitive Programming).",
    duration: "Speed Rank",
    accent: "tertiary",
    link: "https://unstop.com/hackathons/nextturing-aayam-newton-school-of-technology-bengaluru-karnataka-1661493"
  },
  {
    title: "Next Turing Blind",
    category: "CP",
    pool: "INR 5,000",
    description: "Algorithmic precision test with a twist - code without visual feedback.",
    duration: "Blindfolded",
    accent: "primary",
    link: "https://unstop.com/hackathons/nextturing-blindfolded-aayam-newton-school-of-technology-bengaluru-karnataka-1667199"
  },
  {
    title: "Free Fire Max",
    category: "Gaming",
    pool: "INR 15,000 + 40k Diamonds",
    description: "Fast-paced survival shooter battles for the victory.",
    duration: "Tournament",
    accent: "secondary",
    link: "https://unstop.com/events/free-fire-max-esports-tournament-aayam-newton-school-of-technology-bengaluru-karnataka-1661948"
  },
  {
    title: "CAD Modelling",
    category: "Robotics",
    pool: "INR 5,000",
    description: "Precision design challenge for future mechanical engineers.",
    duration: "Lab Event",
    accent: "tertiary",
    link: "https://unstop.com/competitions/cad-design-aayam-newton-school-of-technology-bengaluru-karnataka-1662293"
  },
  {
    title: "Scripted Timelines",
    category: "Non-Tech",
    pool: "INR 5,000",
    description: "Visual storytelling through cinematic photography (ChronoCapture).",
    duration: "Submissions",
    accent: "primary",
    link: "https://unstop.com/events/chronocapture-aayam-newton-school-of-technology-bengaluru-karnataka-1661017"
  },
];

export default function CompetitionsPage() {
  const hero = events[0];
  const side = events[1];
  const strip = events.slice(2);

  return (
    <div className="bg-[#000000] text-white pt-36 md:pt-40 overflow-hidden">
      <section className="px-6 md:px-12 lg:px-20 pb-16">
        <div className="max-w-7xl mx-auto border-l-8 border-[#ff51fa] pl-7 py-5 bg-[#131313] aayam-panel-shadow-pink">
          <h1 className="font-black italic uppercase tracking-tighter leading-none text-5xl md:text-8xl">
            Choose Your <span className="text-[#c1fffe]">Battle</span>
          </h1>
          <p className="mt-4 text-[#fffeac] text-sm md:text-xl font-black uppercase tracking-[0.2em]">
            2026 Technical Mission Logs // Select Category
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          {categories.map((cat, index) => (
            <button
              type="button"
              key={cat}
              className={`px-7 py-3 font-black uppercase skew-x-[-12deg] tracking-wide transition ${
                index === 0
                  ? "bg-[#ff51fa] text-black"
                  : "bg-[#262626] text-[#c1fffe] border-2 border-[#c1fffe] hover:bg-[#c1fffe] hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          <article className="md:col-span-8 bg-[#20201f] relative overflow-hidden aayam-panel-shadow-pink">
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-[#ff716c] text-black font-black px-4 py-1 uppercase text-xs">{hero.status}</span>
            </div>

            <div className="h-64 md:h-96 bg-[radial-gradient(circle_at_20%_20%,rgba(193,255,254,0.3),transparent_38%),radial-gradient(circle_at_80%_35%,rgba(255,81,250,0.3),transparent_35%),linear-gradient(135deg,#101010,#1b1b1b)]" />

            <div className="p-8">
              <div className="flex justify-between items-start gap-5 mb-5">
                <div>
                  <span className="text-[#ff51fa] font-bold uppercase tracking-[0.2em] text-xs block">Category: {hero.category}</span>
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter text-[#c1fffe] mt-2">{hero.title}</h2>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#fffeac] font-black italic text-3xl">{hero.pool}</p>
                  <p className="text-zinc-400 text-xs uppercase">Total Prize Pool</p>
                </div>
              </div>
              <p className="text-zinc-300 max-w-2xl text-lg leading-relaxed">{hero.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link href={hero.link || "https://unstop.com"} target="_blank" rel="noopener noreferrer" className="bg-[#c1fffe] text-black font-black uppercase px-8 py-4 text-lg flex items-center gap-2 hover:brightness-110 transition">
                  Register Mission <span>⚡</span>
                </Link>
                <div>
                  <span className="text-xs uppercase text-zinc-500 tracking-[0.2em]">Duration</span>
                  <p className="text-[#c1fffe] font-bold uppercase">{hero.duration}</p>
                </div>
              </div>
            </div>
          </article>

          <article className="md:col-span-4 bg-[#c1fffe] text-black aayam-panel-shadow-cyan flex flex-col">
            <div className="p-8 flex-grow">
              <span className="font-black uppercase tracking-[0.2em] text-xs border-b-2 border-black pb-1 inline-block">Category: {side.category}</span>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mt-4">{side.title}</h2>
              <p className="mt-4 text-black/80 font-semibold italic">{side.description}</p>

              <div className="mt-8 bg-black/10 p-4 border-l-4 border-black">
                <p className="text-xs uppercase">Combat Bounty</p>
                <p className="text-3xl font-black tracking-tight">{side.pool}</p>
              </div>

              <div className="mt-7 h-44 bg-[linear-gradient(160deg,#0f0f0f,#2c2c2c)] opacity-80" />
            </div>

            <Link href={side.link || "https://unstop.com"} target="_blank" rel="noopener noreferrer" className="w-full bg-black text-[#c1fffe] font-black uppercase py-6 text-center text-xl hover:bg-[#131313] transition">
              Initiate Protocol
            </Link>
          </article>

          {strip.map((item) => (
            <article
              key={item.title}
              className={`md:col-span-4 bg-[#262626] border-t-8 ${
                item.accent === "tertiary"
                  ? "border-[#fffeac]"
                  : item.accent === "secondary"
                    ? "border-[#ff51fa]"
                    : "border-[#c1fffe]"
              } aayam-panel-shadow-pink`}
            >
              <div className="p-6">
                <span
                  className={`font-bold uppercase text-xs tracking-[0.2em] ${
                    item.accent === "tertiary"
                      ? "text-[#fffeac]"
                      : item.accent === "secondary"
                        ? "text-[#ff51fa]"
                        : "text-[#c1fffe]"
                  }`}
                >
                  {item.category}
                </span>
                <h3 className="text-3xl font-black italic uppercase mt-2 mb-4">{item.title}</h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-black italic">{item.pool}</p>
                  <span
                    className={`font-black ${
                      item.accent === "tertiary"
                        ? "text-[#fffeac]"
                        : item.accent === "secondary"
                          ? "text-[#ff51fa]"
                          : "text-[#c1fffe]"
                    }`}
                  >
                    ⌁
                  </span>
                </div>
                <p className="text-zinc-300 text-sm min-h-12">{item.description}</p>
                <Link
                  href={item.link || "https://unstop.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 block w-full border-2 text-center font-black uppercase py-3 transition ${
                    item.accent === "tertiary"
                      ? "border-[#fffeac] text-[#fffeac] hover:bg-[#fffeac] hover:text-black"
                      : item.accent === "secondary"
                        ? "border-[#ff51fa] text-[#ff51fa] hover:bg-[#ff51fa] hover:text-black"
                        : "border-[#c1fffe] text-[#c1fffe] hover:bg-[#c1fffe] hover:text-black"
                  }`}
                >
                  {item.title.includes("Turing")
                    ? "Join Queue"
                    : item.title.includes("BGMI") || item.title.includes("Free")
                      ? "Enter Arena"
                      : "Capture Log"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className="bg-[#262626]/60 backdrop-blur p-6 border-l-2 border-[#00e6e6]">
            <h4 className="text-xs text-[#00e6e6] uppercase tracking-[0.2em] mb-2 font-black">Live Telemetry</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">1.2k</span>
              <span className="text-xs uppercase text-zinc-400">Operators Registered</span>
            </div>
          </article>
          <article className="bg-[#262626]/60 backdrop-blur p-6 border-l-2 border-[#ff51fa]">
            <h4 className="text-xs text-[#ff51fa] uppercase tracking-[0.2em] mb-2 font-black">System Status</h4>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black">Online</span>
              <span className="h-3 w-3 bg-[#ff51fa] rounded-full animate-pulse" />
            </div>
          </article>
          <article className="bg-[#262626]/60 backdrop-blur p-6 border-l-2 border-[#fffeac]">
            <h4 className="text-xs text-[#fffeac] uppercase tracking-[0.2em] mb-2 font-black">Event Countdown</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">14:02:55</span>
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-20 border-t-4 border-[#ff51fa] bg-[#0e0e0e] text-center">
        <h2 className="font-black italic uppercase tracking-tighter text-4xl md:text-6xl">
          Cross The <span className="text-[#c1fffe]">Event Horizon</span>
        </h2>
        <p className="mt-5 text-zinc-400 italic max-w-2xl mx-auto">
          The future belongs to teams who build under pressure and ship with intent.
        </p>
        <Link href="https://unstop.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-8 bg-[#ff51fa] text-black font-black uppercase px-10 py-4 tracking-[0.12em] hover:brightness-110 transition">
          Browse All Dimensions
        </Link>
      </section>
    </div>
  );
}
