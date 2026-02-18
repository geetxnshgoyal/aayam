import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LiquidCursor from "@/components/LiquidCursor";
import DynamicBackground from "@/components/DynamicBackground";

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
  description: "AAYAM is the flagship techfest of Newton School of Technology. 12+ competitions including hackathons, robotics, competitive programming, and open source. March 14-15, 2026. ₹5L+ prize pool.",
  keywords: ["AAYAM", "techfest", "Newton School of Technology", "NST", "hackathon", "robotics", "competitive programming", "open source", "drone racing", "tech fest 2026"],
  openGraph: {
    title: "AAYAM 2026 — Exploring New Dimensions of Technology",
    description: "12+ competitions. ₹5L+ prizes. 3000+ innovators. March 14-15 at Newton School of Technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} ${manrope.variable} ${cinzel.variable} antialiased bg-[#0A0B16]`}>
        <DynamicBackground type="combined" opacity={1} />
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
