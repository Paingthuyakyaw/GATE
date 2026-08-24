import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { AttractionDetail } from "@/features/attractions/components/attraction-detail";
import { ALL_ATTRACTIONS } from "@/features/attractions/data";
import {
  attractionDescription,
  attractionJsonLd,
  pageMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return ALL_ATTRACTIONS.map((attraction) => ({ id: attraction.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const attraction = ALL_ATTRACTIONS.find((item) => item.id === id);

  if (!attraction) {
    return { title: "Attraction not found" };
  }

  return pageMetadata({
    title: attraction.name,
    description: attractionDescription(attraction),
    path: `/attractions/${attraction.id}`,
    image: attraction.image,
    imageAlt: attraction.name,
  });
}

export default async function AttractionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const attraction = ALL_ATTRACTIONS.find((item) => item.id === id);

  if (!attraction) notFound();

  return (
    <>
      <JsonLd data={attractionJsonLd(attraction)} />
      <AttractionDetail attr={attraction} />
    </>
  );
}
