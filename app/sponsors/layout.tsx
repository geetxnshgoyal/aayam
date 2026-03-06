import type { Metadata } from "next";
import { PRIMARY_SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sponsorship Opportunities | AAYAM 2026",
  description:
    "AAYAM 2026 — Step beyond the known. Sponsor the flagship techfest with tailored packages: Title, Concert, Associate, Barter. Reach 15,000+ participants across 250+ colleges.",
  alternates: {
    canonical: `${PRIMARY_SITE_URL}/sponsors`,
  },
  keywords: [
    "AAYAM sponsorship",
    "tech fest sponsorship",
    "college sponsorship opportunities",
    "Newton School of Technology sponsorship",
    "AAYAM sponsor brochure",
  ],
  openGraph: {
    title: "Sponsor AAYAM 2026",
    description:
      "Explore AAYAM 2026 sponsorship tiers and benefits. Download the sponsorship booklet and contact the partnerships team.",
    url: `${PRIMARY_SITE_URL}/sponsors`,
    type: "website",
    images: [{ url: `${PRIMARY_SITE_URL}/images/logo_clean.png`, width: 1200, height: 630, alt: "AAYAM 2026 Sponsors" }],
  },
};

export default function SponsorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
