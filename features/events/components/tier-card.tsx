"use client";

import { Check, ChevronRight } from "lucide-react";

import { AvailBar } from "./avail-bar";
import type { Tier } from "@/features/events/types";
import { display, mono, th } from "@/features/theme/tokens";

export function TierCard({
  tier,
  accent,
  selected,
  onSelect,
  dark,
}: {
  tier: Tier;
  accent: string;
  selected: boolean;
  onSelect: () => void;
  dark: boolean;
}) {
  const soldOut = !tier.avail;
  const t = th(dark);

  return (
    <button
      type="button"
      onClick={!soldOut ? onSelect : undefined}
      disabled={soldOut}
      className="w-full text-left transition-all duration-200 p-5 relative"
      style={{
        backgroundColor: selected && !soldOut ? `${accent}08` : t.card,
        border: `1.5px solid ${selected && !soldOut ? accent : t.cardBorder}`,
        borderRadius: 16,
        opacity: soldOut ? 0.38 : 1,
        cursor: soldOut ? "not-allowed" : "pointer",
        boxShadow:
          selected && !soldOut
            ? `0 0 0 3px ${accent}22, ${t.shadowHover}`
            : t.shadow,
      }}
    >
      <div className="flex justify-between gap-3 mb-4">
        <div>
          <div
            className="text-[10px] font-bold tracking-widest uppercase mb-1"
            style={{ ...mono, color: accent }}
          >
            {tier.name}
          </div>
          <div className="text-sm font-medium" style={{ color: t.muted }}>
            {tier.label}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold" style={{ ...display, color: t.txt }}>
            £{tier.price}
          </div>
          <div className="text-[10px]" style={{ ...mono, color: t.faint }}>
            per person
          </div>
        </div>
      </div>
      <AvailBar sold={tier.sold} cap={tier.cap} dark={dark} />
      <ul className="mt-4 space-y-1.5">
        {tier.perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-[13px]"
            style={{ color: t.muted }}
          >
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accent}20` }}
            >
              <Check size={9} style={{ color: accent }} />
            </span>
            {perk}
          </li>
        ))}
      </ul>
      {!soldOut && (
        <div
          className="mt-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider"
          style={{ ...mono, color: selected ? accent : t.faint }}
        >
          <span>{selected ? "Selected" : "Select tier"}</span>
          {selected ? <Check size={12} /> : <ChevronRight size={12} />}
        </div>
      )}
    </button>
  );
}
