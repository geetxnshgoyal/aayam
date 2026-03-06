import type { Metadata } from "next";
import { Press_Start_2P, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import RetroTechBackground from "@/components/RetroTechBackground";
import { ALL_SITE_URLS, PRIMARY_SITE_URL } from "@/lib/site";

const siteUrl = PRIMARY_SITE_URL;

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans-app",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-app",
});

export const metadata: Metadata = {
  title: "AAYAM 2026 — Exploring New Dimensions of Technology | Newton School of Technology",
  description: "AAYAM is the flagship techfest of Newton School of Technology. 6+ competitions including hackathons, robotics, competitive programming, and open source. April 24-25, 2026. ₹2L+ prize pool.",
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
    description: "6+ competitions. ₹2L+ prizes. 3000+ innovators. April 24-25 at Newton School of Technology.",
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
    startDate: "2026-04-24",
    endDate: "2026-04-25",
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
    <html lang="en" className="crt-scanlines">
      <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} ${pressStart2P.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
        <BreadcrumbSchema />
        <RetroTechBackground />
        <Navbar />
        <main className="relative z-10" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
