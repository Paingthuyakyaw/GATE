"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, User, X, Zap } from "lucide-react";

import { display, mono, th } from "@/features/theme/tokens";
import { useGateTheme } from "@/features/theme/use-gate-theme";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "Events", href: "/events" },
  { label: "Attractions", href: "/attractions" },
  { label: "Promotions", href: "/" },
  { label: "Explore", href: "/" },
];

function isActive(pathname: string, label: string) {
  if (label === "Events") return pathname.startsWith("/events");
  if (label === "Attractions") return pathname.startsWith("/attractions");

  return false;
}

export function Header() {
  const pathname = usePathname();
  const { dark, toggleDark } = useGateTheme();
  const t = th(dark);
  const [menu, setMenu] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: t.hdrBg,
        borderBottom: `1px solid ${t.hdrBorder}`,
        backdropFilter: "blur(20px)",
        boxShadow: t.hdrShadow,
      }}
    >
      {!dark && (
        <div
          className="h-0.5 w-full"
          style={{ background: "linear-gradient(90deg,#00b894,#00cec9,#6c5ce7)" }}
        />
      )}
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center gap-5 h-16">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-xl"
              style={{ backgroundColor: "#00b894" }}
            >
              <Zap size={15} color="#fff" />
            </div>
            <span
              className="text-lg font-black tracking-wide leading-none"
              style={{ ...display, color: t.txt }}
            >
              {siteConfig.title}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.label);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: active ? "#00b894" : t.muted,
                    backgroundColor: active
                      ? dark
                        ? "rgba(0,184,148,0.1)"
                        : "rgba(0,184,148,0.08)"
                      : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <button
              type="button"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleDark}
              className="w-9 h-9 flex items-center justify-center rounded-xl transition-all hover:opacity-75"
              style={{
                backgroundColor: t.card2,
                border: `1.5px solid ${t.border}`,
                color: t.muted,
              }}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              type="button"
              className="hidden md:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl"
              style={{
                color: t.txt,
                backgroundColor: t.card2,
                border: `1.5px solid ${t.border}`,
              }}
            >
              <User size={14} /> Sign In
            </button>
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu((open) => !open)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl"
              style={{
                backgroundColor: t.card2,
                border: `1.5px solid ${t.border}`,
                color: t.muted,
              }}
            >
              {menu ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
        {menu && (
          <div
            className="md:hidden pb-4 space-y-2"
            style={{ borderTop: `1px solid ${t.border}`, paddingTop: 12 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenu(false)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium block"
                style={{ color: t.muted, backgroundColor: t.card2 }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
