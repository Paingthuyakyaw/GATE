import { notFound } from "next/navigation";

import { AttractionDetail } from "@/features/attractions/components/attraction-detail";
import { ALL_ATTRACTIONS } from "@/features/attractions/data";

export default async function AttractionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const attraction = ALL_ATTRACTIONS.find((item) => item.id === id);

  if (!attraction) notFound();

  return <AttractionDetail attr={attraction} />;
}
