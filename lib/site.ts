export const PRIMARY_DOMAIN = "aayamfest.com";
export const PRIMARY_SITE_URL = `https://www.${PRIMARY_DOMAIN}`;

/** Logo used for favicon, OG, Twitter, and all indexing/social images */
export const SITE_LOGO_PATH = "/images/logo_clean.png";

/** Other configured domains (for sameAs / SEO); primary is aayamfest.com */
export const DOMAIN_ALIASES = [
  "aayamfest.com",
  "www.aayamfest.com",
  "aayam.xyz",
  "www.aayam.xyz",
  "aayamfest.xyz",
  "www.aayamfest.xyz",
  "aayamtechfest.xyz",
  "www.aayamtechfest.xyz",
];

export const ALL_SITE_URLS = [PRIMARY_SITE_URL, ...DOMAIN_ALIASES.map((domain) => `https://${domain}`)];

/** Core SEO keywords: AAYAM, AAYAM fest, NST, Bengaluru techfest, and related terms */
export const SITE_KEYWORDS = [
  "AAYAM",
  "AAYAM 2026",
  "aayam",
  "aayamfest",
  "aayam fest",
  "aayam tech",
  "aayam techfest",
  "aayam tech fest",
  "AAYAM techfest",
  "AAYAM tech fest",
  "NST",
  "Newton School of Technology",
  "Bengaluru techfest",
  "Bengaluru tech fest",
  "NST Bengaluru",
  "techfest Bengaluru",
  "step beyond the known",
  "techfest",
  "tech fest",
  "tech fest 2026",
  "hackathon",
  "robotics",
  "competitive programming",
  "open source",
  "drone racing",
  "Newton School techfest",
];
