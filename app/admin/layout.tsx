import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | AAYAM 2026",
  description: "Admin dashboard for AAYAM 2026",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
