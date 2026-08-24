import type { MetadataRoute } from "next";

import { ALL_ATTRACTIONS } from "@/features/attractions/data";
import { ALL_EVENTS } from "@/features/events/data";
import { absUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absUrl("/events"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absUrl("/attractions"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const eventRoutes: MetadataRoute.Sitemap = ALL_EVENTS.map((event) => ({
    url: absUrl(`/events/${event.id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: event.featured ? 0.8 : 0.7,
  }));

  const attractionRoutes: MetadataRoute.Sitemap = ALL_ATTRACTIONS.map(
    (attraction) => ({
      url: absUrl(`/attractions/${attraction.id}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: attraction.featured ? 0.8 : 0.7,
    }),
  );

  return [...staticRoutes, ...eventRoutes, ...attractionRoutes];
}
