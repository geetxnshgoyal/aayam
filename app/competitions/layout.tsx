import type { Metadata } from "next";
import { PRIMARY_SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Competitions | AAYAM 2026 — Hackathons, CP, Robotics, Open Source",
  description:
    "12+ competitions at AAYAM 2026: 24h & 12h hackathons, CP contests, robotics (Racing, Soccer, Fighting, Maze, Drone), open source challenge. Register on Unstop. April 24-25, 2026.",
  alternates: { canonical: `${PRIMARY_SITE_URL}/competitions` },
  openGraph: {
    title: "AAYAM 2026 Competitions",
    description: "Hackathons, CP, Robotics, Open Source. Register on Unstop.",
    url: `${PRIMARY_SITE_URL}/competitions`,
    type: "website",
  },
};

export default function CompetitionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
