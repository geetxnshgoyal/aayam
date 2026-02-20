import type { MetadataRoute } from "next";
import { PRIMARY_SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = PRIMARY_SITE_URL;
  const lastModified = new Date();

  const routes = [
    "/",
    "/about",
    "/competitions",
    "/sponsors",
    "/gallery",
    "/ambassador",
    "/ambassador/register",
    "/ambassador/login",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
