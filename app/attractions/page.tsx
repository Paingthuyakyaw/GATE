import type { Metadata } from "next";

import { AttractionsBrowse } from "@/features/attractions/components/attractions-browse";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Attractions",
  description:
    "Book UK attractions — theme parks, museums, zoos, heritage sites and unforgettable experiences.",
  path: "/attractions",
});

export default function AttractionsPage() {
  return <AttractionsBrowse />;
}
