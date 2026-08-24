import { notFound } from "next/navigation";

import { EventDetail } from "@/features/events/components/event-detail";
import { ALL_EVENTS } from "@/features/events/data";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = ALL_EVENTS.find((item) => item.id === id);

  if (!event) notFound();

  return <EventDetail event={event} />;
}
