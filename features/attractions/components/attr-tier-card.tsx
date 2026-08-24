"use client";

import { Check, ChevronRight } from "lucide-react";

import type { AttrTier } from "@/features/attractions/types";
import { formatPrice } from "@/features/theme/money";
import { display, mono, th } from "@/features/theme/tokens";

export function AttrTierCard({
  tier,
  accent,
  selected,
  onSelect,
  dark,
}: {
  tier: AttrTier;
  accent: string;
  selected: boolean;
  onSelect: () => void;
  dark: boolean;
}) {
  const free = tier.price === 0;
  const t = th(dark);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left transition-all duration-200 p-5 relative"
      style={{
        backgroundColor: selected ? `${accent}10` : t.card,
        border: `1.5px solid ${selected ? accent : t.border}`,
        borderRadius: 16,
        boxShadow: selected ? `0 0 0 3px ${accent}22` : t.shadow,
      }}
    >
      {selected && (
        <div
          className="absolute inset-0 opacity-[0.03] rounded-2xl pointer-events-none"
          style={{ backgroundColor: accent }}
        />
      )}
      <div className="flex justify-between gap-3 mb-3">
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
          {free ? (
            <div className="text-xl font-bold" style={{ ...display, color: "#10b981" }}>
              FREE
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold" style={{ ...display, color: t.txt }}>
                {formatPrice(tier.price)}
              </div>
              <div className="text-[10px]" style={{ ...mono, color: t.faint }}>
                per person
              </div>
            </>
          )}
        </div>
      </div>
      <ul className="space-y-1.5">
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
      <div
        className="mt-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider"
        style={{ ...mono, color: selected ? accent : t.faint }}
      >
        <span>{selected ? "Selected" : "Select"}</span>
        {selected ? <Check size={12} /> : <ChevronRight size={12} />}
      </div>
    </button>
  );
}
