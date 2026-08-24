"use client";

import { mono, pctColor, pctLabel, th } from "@/features/theme/tokens";

export function AvailBar({
  sold,
  cap,
  dark,
}: {
  sold: number;
  cap: number;
  dark: boolean;
}) {
  const pct = Math.min(sold / cap, 1);
  const color = pctColor(pct, dark);
  const t = th(dark);
  const track = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";

  return (
    <div className="space-y-1.5">
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: track }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct * 100}%`, backgroundColor: color }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-[11px] font-semibold" style={{ ...mono, color }}>
          {pctLabel(pct, sold, cap)}
        </span>
        <span className="text-[11px]" style={{ ...mono, color: t.faint }}>
          {sold}/{cap}
        </span>
      </div>
    </div>
  );
}
