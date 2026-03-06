import type { Metadata } from "next";
import { PRIMARY_SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About AAYAM 2026 | Newton School of Technology Techfest",
  description:
    "AAYAM — New Dimensions. The flagship techfest of Newton School of Technology. Vision, mission, team, and why you should participate. 3000+ participants, 12+ competitions.",
  alternates: { canonical: `${PRIMARY_SITE_URL}/about` },
  openGraph: {
    title: "About AAYAM 2026",
    description: "Exploring New Dimensions of Technology. Vision, mission, and team.",
    url: `${PRIMARY_SITE_URL}/about`,
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
