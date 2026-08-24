"use client";

import { Calendar, ChevronRight, Clock, LayoutGrid, List, MapPin } from "lucide-react";

import { CATEGORIES } from "@/features/events/data";
import { eventSellThrough, minAvailablePrice } from "@/features/events/lib";
import type { Event } from "@/features/events/types";
import { formatPrice } from "@/features/theme/money";
import { badgeCls, display, mono, pctColor, pctLabel, th } from "@/features/theme/tokens";

export function EventsGridCard({
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
  const color = pctColor(pct, dark);

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
        className="relative h-44 overflow-hidden"
        style={{ borderRadius: "16px 16px 0 0", backgroundColor: "#27272a" }}
      >
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span
            className={`text-[10px] font-semibold tracking-widest uppercase border px-2.5 py-1 rounded-full ${badgeCls(event.badgeType, dark)}`}
            style={mono}
          >
            {event.badge}
          </span>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              ...mono,
              color: event.color,
              backgroundColor: `${event.color}18`,
              border: `1px solid ${event.color}40`,
            }}
          >
            {CATEGORIES.find((category) => category.id === event.cat)?.label}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-[11px] text-white/60" style={mono}>
            {event.displayDate} · {event.city}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-1.5">
          <div className="min-w-0">
            <h3
              className="text-[17px] font-bold leading-snug truncate"
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
            style={{ width: `${Math.min(pct * 100, 100)}%`, backgroundColor: color }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium" style={{ ...mono, color }}>
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

export function EventsListCard({
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
  const maxP = Math.max(...event.tiers.map((tier) => tier.price));
  const { sold, cap, pct } = eventSellThrough(event);
  const color = pctColor(pct, dark);

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left transition-all duration-200 group flex gap-4 p-4 overflow-hidden"
      style={{
        backgroundColor: t.card,
        border: `1.5px solid ${t.cardBorder}`,
        borderRadius: 18,
        boxShadow: t.shadow,
      }}
    >
      <div className="w-28 h-24 md:w-36 md:h-28 shrink-0 overflow-hidden rounded-2xl bg-zinc-800">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className={`text-[10px] font-semibold tracking-widest uppercase border px-2 py-0.5 rounded-full ${badgeCls(event.badgeType, dark)}`}
                  style={mono}
                >
                  {event.badge}
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    ...mono,
                    color: event.color,
                    backgroundColor: `${event.color}15`,
                    border: `1px solid ${event.color}35`,
                  }}
                >
                  {CATEGORIES.find((category) => category.id === event.cat)?.label}
                </span>
              </div>
              <h3
                className="text-lg md:text-xl font-bold leading-tight"
                style={{ ...display, color: t.txt }}
              >
                {event.name}
              </h3>
              <p className="text-[13px] font-medium" style={{ color: t.muted }}>
                {event.artist}
              </p>
            </div>
            <div className="shrink-0 text-right hidden sm:block">
              <div className="text-[10px] uppercase tracking-wide" style={{ ...mono, color: t.faint }}>
                from
              </div>
              <div className="text-2xl font-bold" style={{ ...display, color: event.color }}>
                {formatPrice(minP)}
              </div>
              <div className="text-[10px]" style={{ ...mono, color: t.faint }}>
                to {formatPrice(maxP)}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {[
              { Icon: Calendar, val: event.displayDate },
              { Icon: Clock, val: event.time },
              { Icon: MapPin, val: `${event.venue}, ${event.city}` },
            ].map(({ Icon, val }) => (
              <div key={val} className="flex items-center gap-1.5">
                <Icon size={11} style={{ color: t.faint }} />
                <span className="text-[12px] font-medium" style={{ color: t.muted }}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 gap-3">
          <div className="flex-1">
            <div
              className="h-1.5 w-full rounded-full overflow-hidden mb-1"
              style={{ backgroundColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.min(pct * 100, 100)}%`, backgroundColor: color }}
              />
            </div>
            <span className="text-[11px] font-medium" style={{ ...mono, color }}>
              {pctLabel(pct, sold, cap)}
            </span>
          </div>
          <div
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all group-hover:opacity-80"
            style={{ backgroundColor: event.color, color: "#fff" }}
          >
            Tickets <ChevronRight size={13} />
          </div>
        </div>
      </div>
    </button>
  );
}

export function ViewToggle({
  view,
  setView,
  dark,
}: {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  dark: boolean;
}) {
  const t = th(dark);

  return (
    <div className="flex rounded-xl overflow-hidden" style={{ border: `1.5px solid ${t.border}` }}>
      {([["grid", LayoutGrid], ["list", List]] as const).map(([value, Icon]) => (
        <button
          key={value}
          type="button"
          onClick={() => setView(value)}
          className="w-10 h-10 flex items-center justify-center transition-all"
          style={{
            backgroundColor: view === value ? "#00b894" : t.card,
            color: view === value ? "#fff" : t.faint,
          }}
        >
          <Icon size={15} />
        </button>
      ))}
    </div>
  );
}
