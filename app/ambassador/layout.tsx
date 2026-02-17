import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ambassador Portal — AAYAM 2026",
  description: "Ambassador registration and dashboard for AAYAM 2026",
};

export default function AmbassadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
