export const PRIMARY_DOMAIN = "aayam.xyz";
export const PRIMARY_SITE_URL = `https://${PRIMARY_DOMAIN}`;

export const DOMAIN_ALIASES = [
  "aayamfest.xyz",
  "aayamtechfest.xyz",
  "aayamfest.com",
];

export const ALL_SITE_URLS = [PRIMARY_SITE_URL, ...DOMAIN_ALIASES.map((domain) => `https://${domain}`)];
