import type { Metadata } from "next";
import { PRIMARY_SITE_URL, SITE_LOGO_PATH, SITE_KEYWORDS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery | AAYAM 2026 | NST Bengaluru Techfest",
  description:
    "AAYAM 2026 (aayamfest, aayam tech fest) gallery. Photos and moments from NST Bengaluru techfest: hackathons, robotics, workshops.",
  keywords: [...SITE_KEYWORDS, "AAYAM gallery", "aayamfest photos", "NST techfest gallery"],
  alternates: { canonical: `${PRIMARY_SITE_URL}/gallery` },
  openGraph: {
    title: "AAYAM 2026 Gallery",
    description: "Moments from AAYAM at Newton School of Technology.",
    url: `${PRIMARY_SITE_URL}/gallery`,
    type: "website",
    images: [{ url: `${PRIMARY_SITE_URL}${SITE_LOGO_PATH}`, width: 1200, height: 630, alt: "AAYAM 2026 Gallery" }],
  },
};

export default function GalleryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
