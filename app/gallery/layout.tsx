import type { Metadata } from "next";
import { PRIMARY_SITE_URL, SITE_LOGO_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery | AAYAM 2026 — Moments from Newton School of Technology",
  description:
    "AAYAM 2026 — Step beyond the known. Photos and moments: hackathons, robotics, coding, workshops, and campus life at Newton School of Technology.",
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
