import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aayamfest.xyz";
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
