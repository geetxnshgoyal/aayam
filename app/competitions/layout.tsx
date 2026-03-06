import type { Metadata } from "next";
import { PRIMARY_SITE_URL, SITE_LOGO_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Competitions | AAYAM 2026 — Hackathons, CP, Robotics, Open Source",
  description:
    "AAYAM 2026 — Step beyond the known. 12+ competitions: 24h & 12h hackathons, CP contests, robotics (Racing, Soccer, Fighting, Maze, Drone), open source. Register on Unstop. April 24-25, 2026.",
  alternates: { canonical: `${PRIMARY_SITE_URL}/competitions` },
  openGraph: {
    title: "AAYAM 2026 Competitions — Step Beyond the Known",
    description: "Step beyond the known. Hackathons, CP, Robotics, Open Source. Register on Unstop.",
    url: `${PRIMARY_SITE_URL}/competitions`,
    type: "website",
    images: [{ url: `${PRIMARY_SITE_URL}${SITE_LOGO_PATH}`, width: 1200, height: 630, alt: "AAYAM 2026 Competitions" }],
  },
};

export default function CompetitionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
