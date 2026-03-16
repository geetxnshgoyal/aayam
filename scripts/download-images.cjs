#!/usr/bin/env node
/**
 * Download high-quality images from Unsplash for AAYAM website.
 * Run: node scripts/download-images.cjs
 * Images are saved to public/images/downloaded/
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES = [
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80', name: 'hero-tech.jpg' },
  { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80', name: 'hackathon.jpg' },
  { url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&q=80', name: 'robotics.jpg' },
  { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80', name: 'coding.jpg' },
  { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80', name: 'campus.jpg' },
  { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80', name: 'team-collab.jpg' },
];

const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'downloaded');

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (r) => r.pipe(file).on('finish', resolve).on('error', reject));
      } else {
        res.pipe(file).on('finish', resolve).on('error', reject);
      }
    }).on('error', reject);
  });
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const { url, name } of IMAGES) {
    const filepath = path.join(OUT_DIR, name);
    try {
      await download(url, filepath);
      console.log('Downloaded:', name);
    } catch (e) {
      console.error('Failed', name, e.message);
    }
  }
  console.log('Done. Images in public/images/downloaded/');
})();
