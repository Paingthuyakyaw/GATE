"use client";

import { th } from "@/features/theme/tokens";
import { useGateTheme } from "@/features/theme/use-gate-theme";

export function GateShell({ children }: { children: React.ReactNode }) {
  const { dark } = useGateTheme();
  const t = th(dark);

  return (
    <div
      className="relative flex flex-col min-h-screen"
      style={{ backgroundColor: t.bg, color: t.txt }}
    >
      {children}
    </div>
  );
}
