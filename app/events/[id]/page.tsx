import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { EventDetail } from "@/features/events/components/event-detail";
import { ALL_EVENTS } from "@/features/events/data";
import { eventDescription, eventJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return ALL_EVENTS.map((event) => ({ id: event.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = ALL_EVENTS.find((item) => item.id === id);

  if (!event) {
    return { title: "Event not found" };
  }

  return pageMetadata({
    title: event.name,
    description: eventDescription(event),
    path: `/events/${event.id}`,
    image: event.image,
    imageAlt: `${event.name} at ${event.venue}`,
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = ALL_EVENTS.find((item) => item.id === id);

  if (!event) notFound();

  return (
    <>
      <JsonLd data={eventJsonLd(event)} />
      <EventDetail event={event} />
    </>
  );
}
