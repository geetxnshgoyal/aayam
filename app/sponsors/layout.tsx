import type { Metadata } from "next";
import { PRIMARY_SITE_URL, SITE_LOGO_PATH, SITE_KEYWORDS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sponsorship | AAYAM 2026 | NST Bengaluru Techfest",
  description:
    "Sponsor AAYAM 2026 (aayamfest, aayam tech fest). NST Bengaluru techfest sponsorship. Title, Concert, Associate packages. 15,000+ participants, 250+ colleges.",
  alternates: {
    canonical: `${PRIMARY_SITE_URL}/sponsors`,
  },
  keywords: [
    ...SITE_KEYWORDS,
    "AAYAM sponsorship",
    "aayamfest sponsor",
    "tech fest sponsorship",
    "NST sponsorship",
    "Bengaluru techfest sponsor",
    "AAYAM sponsor brochure",
  ],
  openGraph: {
    title: "Sponsor AAYAM 2026",
    description:
      "Explore AAYAM 2026 sponsorship tiers and benefits. Download the sponsorship booklet and contact the partnerships team.",
    url: `${PRIMARY_SITE_URL}/sponsors`,
    type: "website",
    images: [{ url: `${PRIMARY_SITE_URL}${SITE_LOGO_PATH}`, width: 1200, height: 630, alt: "AAYAM 2026 Sponsors" }],
  },
};

export default function SponsorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
