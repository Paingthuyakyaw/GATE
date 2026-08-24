"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function useGateTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted ? resolvedTheme !== "light" : true;

  const toggleDark = () => {
    setTheme(dark ? "light" : "dark");
  };

  return { dark, toggleDark, mounted };
}
