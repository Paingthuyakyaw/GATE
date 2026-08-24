"use client";

import { ChevronRight, Clock, MapPin, Star } from "lucide-react";

import { ATTR_CATS } from "@/features/attractions/data";
import type { Attraction } from "@/features/attractions/types";
import { formatPrice } from "@/features/theme/money";
import { badgeCls, display, mono, th } from "@/features/theme/tokens";

export function AttractionCard({
  attr,
  onClick,
  dark,
}: {
  attr: Attraction;
  onClick: () => void;
  dark: boolean;
}) {
  const t = th(dark);
  const paidPrices = attr.tiers.map((tier) => tier.price).filter((price) => price > 0);
  const minPrice = paidPrices.length ? Math.min(...paidPrices) : 0;
  const hasFree = attr.tiers.some((tier) => tier.price === 0);

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left group overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: t.card,
        border: `1.5px solid ${t.cardBorder}`,
        borderRadius: 18,
        boxShadow: t.shadow,
      }}
    >
      <div className="relative h-44 overflow-hidden bg-zinc-800">
        <img
          src={attr.image}
          alt={attr.name}
          className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-[9px] font-semibold tracking-widest uppercase border px-2 py-0.5 rounded-full ${badgeCls(attr.badgeType, true)}`}
            style={mono}
          >
            {attr.badge}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={9}
                fill={index < Math.round(attr.rating) ? attr.color : "none"}
                style={{
                  color:
                    index < Math.round(attr.rating) ? attr.color : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
            <span className="text-[10px] text-white/70 ml-1" style={mono}>
              {attr.rating}
            </span>
          </div>
          <span className="text-[10px] text-white/50" style={mono}>
            {attr.reviews.toLocaleString()} reviews
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="min-w-0">
            <h3
              className="text-base font-bold leading-tight truncate group-hover:opacity-80 transition-opacity"
              style={{ ...display, color: t.txt }}
            >
              {attr.name}
            </h3>
            <p className="text-[11px] truncate mt-0.5" style={{ ...mono, color: t.muted }}>
              {attr.operator}
            </p>
          </div>
          <div className="shrink-0 text-right">
            {hasFree ? (
              <div className="text-sm font-bold" style={{ color: "#10b981" }}>
                Free +
              </div>
            ) : (
              <>
                <div
                  className="text-[9px] uppercase tracking-wider"
                  style={{ ...mono, color: t.faint }}
                >
                  from
                </div>
                <div className="text-base font-bold" style={{ ...display, color: attr.color }}>
                  {formatPrice(minPrice)}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={10} style={{ color: t.faint }} />
          <span className="text-[11px] truncate" style={{ ...mono, color: t.muted }}>
            {attr.city}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <Clock size={10} style={{ color: t.faint }} />
          <span className="text-[11px] truncate" style={{ ...mono, color: t.muted }}>
            {attr.hours}
          </span>
        </div>
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: `1px solid ${t.border}` }}
        >
          <span
            className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ ...mono, color: attr.color, backgroundColor: `${attr.color}15` }}
          >
            {ATTR_CATS.find((category) => category.id === attr.cat)?.label ?? attr.cat}
          </span>
          <span
            className="text-[11px] font-semibold flex items-center gap-1 group-hover:opacity-70 transition-opacity"
            style={{ ...mono, color: attr.color }}
          >
            View tickets <ChevronRight size={10} />
          </span>
        </div>
      </div>
    </button>
  );
}
