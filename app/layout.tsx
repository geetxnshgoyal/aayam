import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LiquidCursor from "@/components/LiquidCursor";
import VideoBackground from "@/components/VideoBackground";
import { ALL_SITE_URLS, PRIMARY_SITE_URL } from "@/lib/site";

const siteUrl = PRIMARY_SITE_URL;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "AAYAM 2026 — Exploring New Dimensions of Technology | Newton School of Technology",
  description: "AAYAM is the flagship techfest of Newton School of Technology. 6+ competitions including hackathons, robotics, competitive programming, and open source. March 14-15, 2026. ₹2L+ prize pool.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  applicationName: "AAYAM 2026",
  category: "Technology",
  creator: "Newton School of Technology",
  publisher: "Newton School of Technology",
  authors: [{ name: "AAYAM Organizing Team" }],
  icons: {
    icon: "/images/logo_clean.png",
    apple: "/images/logo_clean.png",
  },
  keywords: ["AAYAM", "techfest", "Newton School of Technology", "NST", "hackathon", "robotics", "competitive programming", "open source", "drone racing", "tech fest 2026"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "AAYAM 2026 — Exploring New Dimensions of Technology",
    description: "6+ competitions. ₹2L+ prizes. 3000+ innovators. March 14-15 at Newton School of Technology.",
    type: "website",
    url: siteUrl,
    siteName: "AAYAM 2026",
    locale: "en_IN",
    images: [
      {
        url: "/images/logo_clean.png",
        width: 1200,
        height: 630,
        alt: "AAYAM 2026 logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AAYAM 2026 — Exploring New Dimensions of Technology",
    description: "6+ competitions. ₹2L+ prizes. 3000+ innovators.",
    images: ["/images/logo_clean.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AAYAM",
    url: siteUrl,
    logo: `${siteUrl}/images/logo_clean.png`,
    sameAs: ["https://instagram.com/aayamfest", ...ALL_SITE_URLS],
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Newton School of Technology",
    },
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "AAYAM 2026",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description:
      "AAYAM 2026 is the flagship techfest of Newton School of Technology with hackathons, robotics, coding, and open-source competitions.",
    startDate: "2026-03-14",
    endDate: "2026-03-15",
    organizer: {
      "@type": "Organization",
      name: "Newton School of Technology",
      url: siteUrl,
    },
    location: {
      "@type": "Place",
      name: "Newton School of Technology",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    image: [`${siteUrl}/images/logo_clean.png`],
    url: siteUrl,
  };

  return (
    <html lang="en">
      <body className={`${manrope.className} ${manrope.variable} ${cinzel.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
        <VideoBackground />
        <CustomCursor />
        <LiquidCursor />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
