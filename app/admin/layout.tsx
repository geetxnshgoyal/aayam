import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — AAYAM 2026",
  description: "Admin panel for managing AAYAM ambassador applications",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
