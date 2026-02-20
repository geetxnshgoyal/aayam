import type { MetadataRoute } from "next";
import { ALL_SITE_URLS, PRIMARY_SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: ALL_SITE_URLS.map((url) => `${url}/sitemap.xml`),
    host: PRIMARY_SITE_URL,
  };
}
