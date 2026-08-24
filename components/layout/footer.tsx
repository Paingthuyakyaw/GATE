"use client";

import { Zap } from "lucide-react";

import { mono, th } from "@/features/theme/tokens";
import { useGateTheme } from "@/features/theme/use-gate-theme";

export function Footer({ label = "GATE Ticketing © 2026" }: { label?: string }) {
  const { dark } = useGateTheme();
  const t = th(dark);

  return (
    <footer className="py-8" style={{ borderTop: `1px solid ${t.border}`, backgroundColor: t.bg }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 flex items-center justify-center rounded-lg"
            style={{ backgroundColor: "#00b894" }}
          >
            <Zap size={12} color="#fff" />
          </div>
          <span className="text-sm font-medium" style={{ ...mono, color: t.faint }}>
            {label}
          </span>
        </div>
        <div className="flex gap-6">
          {["Terms", "Privacy", "Help", "Contact"].map((item) => (
            <button
              key={item}
              type="button"
              className="text-sm font-medium"
              style={{ color: t.faint }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
