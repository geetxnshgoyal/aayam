# Site images

- **logo.png** — Main logo (navbar, footer, hero). Use for in-page branding.
- **logo_clean.png** — Clean logo used for favicon, OG/Twitter cards, and metadata (`SITE_LOGO_PATH`).
- **app/icon.png, apple-icon.png, opengraph-image.png, twitter-image.png** — Generated from `logo_clean.png`; Next.js serves these for favicon and social previews.
- **backgrounds/** — Tech backgrounds for global BG and competition cards (see `backgrounds/README.md`).
- **competitions/** — Optional per-competition images (currently unused).
- **tech-horror/** — Legacy BG assets; main site uses `RetroTechBackground` and `backgrounds/`.

For best social previews, consider adding a 1200×630 version of the logo (or a dedicated OG image) and referencing it in layout metadata; current OG uses the logo and may be letterboxed on some platforms.
