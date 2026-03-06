import type { Metadata } from "next";
import { PRIMARY_SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery | AAYAM 2026 — Moments from Newton School of Technology",
  description:
    "Photos and moments from AAYAM techfest: hackathons, robotics, coding, workshops, and campus life at Newton School of Technology.",
  alternates: { canonical: `${PRIMARY_SITE_URL}/gallery` },
  openGraph: {
    title: "AAYAM 2026 Gallery",
    description: "Moments from AAYAM at Newton School of Technology.",
    url: `${PRIMARY_SITE_URL}/gallery`,
    type: "website",
    images: [{ url: `${PRIMARY_SITE_URL}/images/logo_clean.png`, width: 1200, height: 630, alt: "AAYAM 2026 Gallery" }],
  },
};

export default function GalleryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
