import type { Metadata } from "next";
import { PRIMARY_SITE_URL, SITE_LOGO_PATH, SITE_KEYWORDS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About AAYAM 2026 | AAYAM fest | NST Bengaluru Techfest",
  description:
    "About AAYAM 2026 (aayamfest, aayam tech fest). Step beyond the known. NST Bengaluru techfest by Newton School of Technology. Vision, mission, team. 3000+ participants, 12+ competitions.",
  keywords: [...SITE_KEYWORDS, "about AAYAM", "AAYAM about", "aayamfest about"],
  alternates: { canonical: `${PRIMARY_SITE_URL}/about` },
  openGraph: {
    title: "About AAYAM 2026",
    description: "AAYAM 2026. Step beyond the known. Vision, mission, and team.",
    url: `${PRIMARY_SITE_URL}/about`,
    type: "website",
    images: [{ url: `${PRIMARY_SITE_URL}${SITE_LOGO_PATH}`, width: 1200, height: 630, alt: "AAYAM 2026" }],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
