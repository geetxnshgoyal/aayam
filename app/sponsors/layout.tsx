import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorship Opportunities | AAYAM 2026",
  description:
    "Sponsor AAYAM 2026 with tailored packages for Title Sponsor, Concert Sponsor, Associate Partner, and Barter/In-Kind Partner. Reach 15,000+ participants across 250+ colleges.",
  alternates: {
    canonical: "/sponsors",
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
    url: "https://aayamfest.xyz/sponsors",
    type: "website",
  },
};

export default function SponsorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
