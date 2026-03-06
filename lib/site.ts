export const PRIMARY_DOMAIN = "aayam.xyz";
export const PRIMARY_SITE_URL = `https://${PRIMARY_DOMAIN}`;

/** Logo used for favicon, OG, Twitter, and all indexing/social images */
export const SITE_LOGO_PATH = "/images/logo_clean.png";

export const DOMAIN_ALIASES = [
  "aayamfest.xyz",
  "aayamtechfest.xyz",
  "aayamfest.com",
];

export const ALL_SITE_URLS = [PRIMARY_SITE_URL, ...DOMAIN_ALIASES.map((domain) => `https://${domain}`)];
