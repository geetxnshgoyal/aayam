import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import RetroTechBackground from "@/components/RetroTechBackground";
import { ALL_SITE_URLS, PRIMARY_SITE_URL, SITE_LOGO_PATH, SITE_KEYWORDS } from "@/lib/site";

const siteUrl = PRIMARY_SITE_URL;
const logoUrl = `${siteUrl}${SITE_LOGO_PATH}`;

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
  title: {
    default: "AAYAM 2026 — Step Beyond the Known | Newton School of Technology Techfest",
    template: "%s | AAYAM 2026",
  },
  description: "AAYAM 2026 (aayamfest, aayam techfest): Step beyond the known. NST Bengaluru techfest by Newton School of Technology — hackathons, robotics, CP, open source. April 24-25, 2026. ₹2L+ prize pool.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  applicationName: "AAYAM 2026",
  category: "Technology",
  creator: "Newton School of Technology",
  publisher: "Newton School of Technology",
  authors: [{ name: "AAYAM Organizing Team", url: siteUrl }],
  icons: {
    icon: SITE_LOGO_PATH,
    apple: SITE_LOGO_PATH,
  },
  keywords: SITE_KEYWORDS,
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
    title: "AAYAM 2026 — Step Beyond the Known | AAYAM fest | NST Bengaluru Techfest",
    description: "AAYAM (aayamfest, aayam tech fest). Step beyond the known. NST Bengaluru techfest — 6+ competitions, ₹2L+ prizes. April 24-25, 2026.",
    type: "website",
    url: siteUrl,
    siteName: "AAYAM 2026",
    locale: "en_IN",
    images: [
      {
        url: SITE_LOGO_PATH,
        width: 1200,
        height: 630,
        alt: "AAYAM 2026 — Step Beyond the Known | Newton School of Technology Techfest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AAYAM 2026 — AAYAM fest | NST Bengaluru Techfest",
    description: "AAYAM techfest (aayamfest). Step beyond the known. 6+ competitions, ₹2L+ prizes. April 24-25 at NST, Bengaluru.",
    images: [SITE_LOGO_PATH],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1a2e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "AAYAM 2026",
    alternateName: ["AAYAM", "AAYAM fest", "aayamfest", "AAYAM techfest", "AAYAM tech fest", "NST Bengaluru techfest"],
    slogan: "Step Beyond the Known",
    url: siteUrl,
    logo: logoUrl,
    sameAs: ["https://instagram.com/aayamfest", ...ALL_SITE_URLS],
    contactPoint: {
      "@type": "ContactPoint",
      email: "aayam.fest@newtonschool.co",
      contactType: "customer service",
      areaServed: "IN",
    },
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
      "AAYAM 2026 (aayamfest, AAYAM tech fest) — Step beyond the known. NST Bengaluru techfest by Newton School of Technology. Hackathons, robotics, CP, open source. April 24-25, 2026.",
    startDate: "2026-04-24T09:00:00+05:30",
    endDate: "2026-04-25T20:00:00+05:30",
    organizer: {
      "@type": "Organization",
      name: "Newton School of Technology",
      url: siteUrl,
    },
    location: {
      "@type": "Place",
      name: "Newton School of Technology, NST S-VYASA University",
      address: {
        "@type": "PostalAddress",
        streetAddress: "P3 Block, Sattva Global City, Global Village",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560059",
        addressCountry: "IN",
      },
    },
    image: [logoUrl],
    url: siteUrl,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/competitions`,
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AAYAM 2026",
    url: siteUrl,
    description: "AAYAM 2026 (aayamfest, aayam techfest) — Step beyond the known. NST Bengaluru techfest by Newton School of Technology.",
    publisher: { "@id": `${siteUrl}#organization` },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", url: `${siteUrl}/competitions?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="crt-scanlines">
      <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} ${pressStart2P.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
