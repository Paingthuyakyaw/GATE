import type { CSSProperties } from "react";

export const mono: CSSProperties = {
  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
};

export const display: CSSProperties = {
  fontFamily: "var(--font-display), 'Barlow Condensed', sans-serif",
};

export function th(dark: boolean) {
  return {
    bg: dark ? "#080808" : "#f6f5f2",
    hdrBg: dark ? "rgba(8,8,8,0.94)" : "rgba(255,255,255,0.96)",
    hdrBorder: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    hdrShadow: dark
      ? "none"
      : "0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)",
    card: dark ? "#161616" : "#ffffff",
    card2: dark ? "#1e1e1e" : "#f0efe9",
    cardBorder: dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)",
    sectionBg: dark ? "#0e0e0e" : "#eeede8",
    border: dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)",
    txt: dark ? "#f0f0ee" : "#111111",
    muted: dark ? "rgba(240,240,238,0.52)" : "#595959",
    faint: dark ? "rgba(240,240,238,0.28)" : "#9b9b9f",
    inputBg: dark ? "#1c1c1c" : "#ffffff",
    pill: dark ? "#1a1a1a" : "#e8e7e3",
    shadow: dark
      ? "0 2px 16px rgba(0,0,0,0.55)"
      : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.07)",
    shadowHover: dark
      ? "0 6px 28px rgba(0,0,0,0.7)"
      : "0 4px 8px rgba(0,0,0,0.07), 0 16px 40px rgba(0,0,0,0.10)",
    shadowMd: dark
      ? "0 8px 40px rgba(0,0,0,0.8)"
      : "0 8px 24px rgba(0,0,0,0.10), 0 32px 64px rgba(0,0,0,0.10)",
  };
}

export function badgeCls(type: string, dark: boolean) {
  if (type === "urgent")
    return dark
      ? "bg-red-500/15 text-red-400 border-red-500/30"
      : "bg-red-50 text-red-600 border-red-300/60 font-semibold";
  if (type === "new")
    return dark
      ? "bg-emerald-500/12 text-emerald-400 border-emerald-500/25"
      : "bg-emerald-50 text-emerald-700 border-emerald-300/60 font-semibold";
  if (type === "featured")
    return dark
      ? "bg-white/8 text-white/60 border-white/15"
      : "bg-amber-50 text-amber-700 border-amber-300/60 font-semibold";

  return dark
    ? "bg-white/8 text-white/50 border-white/12"
    : "bg-zinc-100 text-zinc-500 border-zinc-200 font-medium";
}

export function pctColor(pct: number, dark: boolean) {
  if (pct >= 1) return dark ? "#555555" : "#cbd5e1";
  if (pct >= 0.85) return dark ? "#ef4444" : "#dc2626";
  if (pct >= 0.6) return dark ? "#f59e0b" : "#d97706";

  return dark ? "#00b894" : "#059669";
}

export function pctLabel(pct: number, sold: number, cap: number) {
  const remaining = cap - sold;

  if (pct >= 1) return "Sold Out";
  if (pct >= 0.85) return `${remaining} left!`;
  if (pct >= 0.6) return `${remaining} remaining`;

  return `${remaining} available`;
}
