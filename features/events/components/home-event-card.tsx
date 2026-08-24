"use client";

import { ChevronRight, MapPin } from "lucide-react";

import { CATEGORIES } from "@/features/events/data";
import { eventSellThrough, minAvailablePrice } from "@/features/events/lib";
import type { Event } from "@/features/events/types";
import { formatPrice } from "@/features/theme/money";
import { badgeCls, display, mono, pctColor, pctLabel, th } from "@/features/theme/tokens";

export function HomeEventCard({
  event,
  onClick,
  dark,
}: {
  event: Event;
  onClick: () => void;
  dark: boolean;
}) {
  const t = th(dark);
  const minP = minAvailablePrice(event);
  const { sold, cap, pct } = eventSellThrough(event);

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left overflow-hidden transition-all duration-200 group"
      style={{
        backgroundColor: t.card,
        border: `1.5px solid ${t.cardBorder}`,
        borderRadius: 18,
        boxShadow: t.shadow,
      }}
    >
      <div
        className="relative h-48 overflow-hidden"
        style={{ borderRadius: "16px 16px 0 0", backgroundColor: "#27272a" }}
      >
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <span
            className={`text-[10px] font-semibold tracking-widest uppercase border px-2.5 py-1 rounded-full ${badgeCls(event.badgeType, dark)}`}
            style={mono}
          >
            {event.badge}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <span
            className="text-[10px] font-semibold tracking-widest uppercase border px-2 py-0.5 rounded-full"
            style={{
              ...mono,
              color: event.color,
              borderColor: `${event.color}50`,
              backgroundColor: `${event.color}18`,
            }}
          >
            {CATEGORIES.find((category) => category.id === event.cat)?.label}
          </span>
          <div className="text-[11px] text-white/60 font-medium mt-1" style={mono}>
            {event.displayDate}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="min-w-0">
            <h3
              className="text-[18px] font-bold leading-snug truncate"
              style={{ ...display, color: t.txt }}
            >
              {event.name}
            </h3>
            <p className="text-[13px] truncate mt-0.5" style={{ color: t.muted }}>
              {event.artist}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-[10px] uppercase tracking-wide" style={{ ...mono, color: t.faint }}>
              from
            </div>
            <div className="text-xl font-bold" style={{ ...display, color: event.color }}>
              {formatPrice(minP)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={11} style={{ color: t.faint }} className="shrink-0" />
          <span className="text-[12px] truncate" style={{ color: t.faint }}>
            {event.venue}
          </span>
        </div>
        <div
          className="h-1.5 w-full rounded-full overflow-hidden mb-2"
          style={{ backgroundColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${Math.min(pct * 100, 100)}%`, backgroundColor: pctColor(pct, dark) }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span
            className="text-[12px] font-medium"
            style={{ ...mono, color: pctColor(pct, dark) }}
          >
            {pctLabel(pct, sold, cap)}
          </span>
          <span
            className="text-[12px] font-semibold flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity"
            style={{ ...mono, color: event.color }}
          >
            Tickets <ChevronRight size={11} />
          </span>
        </div>
      </div>
    </button>
  );
}
