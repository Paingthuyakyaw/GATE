import type { Metadata } from "next";

import { EventsBrowse } from "@/features/events/components/events-browse";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description:
    "Browse live events on GATE Tickets — music, theatre, sports, comedy and more.",
  path: "/events",
});

export default function EventsPage() {
  return <EventsBrowse />;
}
