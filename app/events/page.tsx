import type { Metadata } from "next";

import { EventsBrowse } from "@/features/events/components/events-browse";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description:
    "Browse live events across London, Manchester, Birmingham, Glasgow and Leeds — music, theatre, sports, comedy and more.",
  path: "/events",
});

export default function EventsPage() {
  return <EventsBrowse />;
}
