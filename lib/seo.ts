import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { Attraction } from "@/features/attractions/types";
import type { Event } from "@/features/events/types";
import { formatPrice } from "@/features/theme/money";

export const siteUrl = siteConfig.url.replace(/\/$/, "");

export function absUrl(path = "/"): string {
  if (path.startsWith("http")) return path;

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function eventDescription(event: Event): string {
  return `${event.name} with ${event.artist} at ${event.venue}, ${event.city} on ${event.displayDate}. Tickets from ${formatPrice(event.minPrice)}.`;
}

export function attractionMinPrice(attr: Attraction): number {
  return Math.min(...attr.tiers.map((tier) => tier.price));
}

export function attractionDescription(attr: Attraction): string {
  const highlights = attr.highlights.slice(0, 3).join(", ");

  return `${attr.name} in ${attr.city} — ${highlights}. Tickets from ${formatPrice(attractionMinPrice(attr))}.`;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const url = absUrl(path);
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.creator,
      images: {
        url: ogImage,
        alt: imageAlt ?? title,
      },
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.title,
        alternateName: [siteConfig.name, "GATE Ticketing"],
        url: siteUrl,
        description: siteConfig.description,
      },
      {
        "@type": "WebSite",
        name: siteConfig.title,
        alternateName: [siteConfig.name, "GATE Ticketing"],
        url: siteUrl,
        description: siteConfig.description,
        inLanguage: "en",
        publisher: {
          "@type": "Organization",
          name: siteConfig.title,
        },
      },
    ],
  };
}

export function eventJsonLd(event: Event) {
  const available = event.tiers.some((tier) => tier.avail);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: eventDescription(event),
    startDate: event.date,
    image: event.image,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    performer: {
      "@type": "PerformingGroup",
      name: event.artist,
    },
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
      },
    },
    offers: {
      "@type": "Offer",
      url: absUrl(`/events/${event.id}`),
      price: event.minPrice,
      priceCurrency: "MMK",
      availability: available
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.title,
      url: siteUrl,
    },
  };
}

export function attractionJsonLd(attr: Attraction) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: attr.name,
    description: attractionDescription(attr),
    image: attr.image,
    address: {
      "@type": "PostalAddress",
      streetAddress: attr.address,
      addressLocality: attr.city,
    },
    openingHours: attr.hours,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: attr.rating,
      reviewCount: attr.reviews,
      bestRating: 5,
    },
    offers: {
      "@type": "Offer",
      url: absUrl(`/attractions/${attr.id}`),
      price: attractionMinPrice(attr),
      priceCurrency: "MMK",
    },
  };
}
