export const PRIMARY_DOMAIN = "aayamfest.com";
export const PRIMARY_SITE_URL = `https://${PRIMARY_DOMAIN}`;

/** Logo used for favicon, OG, Twitter, and all indexing/social images */
export const SITE_LOGO_PATH = "/images/logo_clean.png";

/** Other configured domains (for sameAs / SEO); primary is aayamfest.com */
export const DOMAIN_ALIASES = [
  "www.aayamfest.com",
  "aayam.xyz",
  "www.aayam.xyz",
  "aayamfest.xyz",
  "www.aayamfest.xyz",
  "aayamtechfest.xyz",
  "www.aayamtechfest.xyz",
];

export const ALL_SITE_URLS = [PRIMARY_SITE_URL, ...DOMAIN_ALIASES.map((domain) => `https://${domain}`)];
