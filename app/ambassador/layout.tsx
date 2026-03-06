import type { Metadata } from "next";
import { PRIMARY_SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ambassador Portal — AAYAM 2026",
  description:
    "Become an AAYAM 2026 campus ambassador. Promote the techfest, earn rewards, and get exclusive access. Register or login to the ambassador portal.",
  alternates: { canonical: `${PRIMARY_SITE_URL}/ambassador` },
  openGraph: {
    title: "AAYAM 2026 Ambassador Program",
    description: "Join the ambassador program. Promote AAYAM on your campus and earn rewards.",
    url: `${PRIMARY_SITE_URL}/ambassador`,
    type: "website",
    images: [{ url: `${PRIMARY_SITE_URL}/images/logo_clean.png`, width: 1200, height: 630, alt: "AAYAM 2026" }],
  },
  keywords: ["AAYAM ambassador", "campus ambassador", "tech fest ambassador", "AAYAM 2026 register"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Who can become an ambassador?", acceptedAnswer: { "@type": "Answer", text: "Any college/university student passionate about technology and events can apply. No prior experience needed!" } },
    { "@type": "Question", name: "How do I track my progress?", acceptedAnswer: { "@type": "Answer", text: "You'll get a unique link and access to a dashboard showing your real-time recruitment and tier progress." } },
    { "@type": "Question", name: "When do I receive my rewards?", acceptedAnswer: { "@type": "Answer", text: "Gear is dispatched as you hit each tier. Final rewards are distributed at the event or within 2 weeks after." } },
    { "@type": "Question", name: "Can I be an ambassador from any college?", acceptedAnswer: { "@type": "Answer", text: "Absolutely! Our program is open to students from across India. Promote AAYAM anywhere!" } },
    { "@type": "Question", name: "What if I don't hit a tier?", acceptedAnswer: { "@type": "Answer", text: "All active ambassadors get a certificate of participation and exclusive swag. Every bit of effort counts!" } },
  ],
};

export default function AmbassadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
