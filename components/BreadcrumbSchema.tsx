'use client';

import { usePathname } from 'next/navigation';
import { PRIMARY_SITE_URL } from '@/lib/site';

const pathToName: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/competitions': 'Competitions',
  '/gallery': 'Gallery',
  '/sponsors': 'Sponsors',
  '/ambassador': 'Ambassador',
  '/ambassador/register': 'Register',
  '/ambassador/login': 'Login',
  '/ambassador/dashboard': 'Dashboard',
};

function getBreadcrumbItems(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ name: 'Home', path: '/' }];
  let current = '';
  for (const seg of segments) {
    current += `/${seg}`;
    items.push({ name: pathToName[current] || seg.replace(/-/g, ' '), path: current });
  }
  return items;
}

export default function BreadcrumbSchema() {
  const pathname = usePathname();
  if (!pathname || pathname === '/') return null;

  const items = getBreadcrumbItems(pathname);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${PRIMARY_SITE_URL}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
