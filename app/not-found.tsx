import Link from "next/link";

import { display, mono } from "@/features/theme/tokens";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ ...mono, color: "#00b894" }}
      >
        404
      </p>
      <h1 className="text-4xl font-black" style={display}>
        Page not found
      </h1>
      <p className="text-sm text-muted">
        That event or attraction isn&apos;t on sale here.
      </p>
      <Link
        href="/events"
        className="mt-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
        style={{ ...display, backgroundColor: "#00b894" }}
      >
        Browse events
      </Link>
    </div>
  );
}
