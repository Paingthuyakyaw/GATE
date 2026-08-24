"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, MapPin, Search, Star, X } from "lucide-react";

import { AttractionCard } from "./attraction-card";
import { ALL_ATTRACTIONS, ATTR_CATS } from "@/features/attractions/data";
import { badgeCls, display, mono, th } from "@/features/theme/tokens";
import { useGateTheme } from "@/features/theme/use-gate-theme";

export function AttractionsBrowse() {
  const router = useRouter();
  const { dark } = useGateTheme();
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [heroIdx, setHeroIdx] = useState(0);
  const t = th(dark);
  const featured = ALL_ATTRACTIONS.filter((item) => item.featured);
  const heroAttr = featured[heroIdx];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setHeroIdx((index) => (index + 1) % featured.length),
      5000,
    );

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [featured.length]);

  const filtered = useMemo(
    () =>
      ALL_ATTRACTIONS.filter((item) => {
        if (cat !== "all" && item.cat !== cat) return false;
        if (search) {
          const query = search.toLowerCase();

          return (
            item.name.toLowerCase().includes(query) ||
            item.city.toLowerCase().includes(query) ||
            item.operator.toLowerCase().includes(query)
          );
        }

        return true;
      }),
    [cat, search],
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: t.bg }}>
      <div className="relative h-[400px] md:h-[480px] overflow-hidden bg-zinc-900">
        {featured.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === heroIdx ? "opacity-100" : "opacity-0"}`}
          >
            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        ))}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ ...mono, color: "#00b894" }}
                >
                  Attractions
                </span>
                <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
                <span className="text-[11px]" style={{ ...mono, color: "rgba(255,255,255,0.5)" }}>
                  Featured
                </span>
              </div>
              <span
                className={`inline-block text-[11px] font-semibold tracking-widest uppercase border px-3 py-1.5 rounded-full mb-4 ${badgeCls(heroAttr.badgeType, true)}`}
                style={mono}
              >
                {heroAttr.badge}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-none mb-2" style={display}>
                {heroAttr.name}
              </h1>
              <p className="text-base text-white/55 mb-1">{heroAttr.operator}</p>
              <div className="flex items-center gap-2 mb-7">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={12}
                    fill={index < Math.round(heroAttr.rating) ? heroAttr.color : "none"}
                    style={{
                      color:
                        index < Math.round(heroAttr.rating)
                          ? heroAttr.color
                          : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
                <span className="text-sm text-white/60" style={mono}>
                  {heroAttr.rating} · {heroAttr.reviews.toLocaleString()} reviews
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push(`/attractions/${heroAttr.id}`)}
                  className="flex items-center gap-2.5 text-base font-bold px-7 py-4 transition-all hover:opacity-90"
                  style={{
                    ...display,
                    backgroundColor: heroAttr.color,
                    color: "#fff",
                    borderRadius: 14,
                    boxShadow: `0 6px 24px ${heroAttr.color}55`,
                  }}
                >
                  Book Tickets <ChevronRight size={16} />
                </button>
                <div
                  className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <MapPin size={12} className="text-white/60" />
                  <span className="text-sm text-white/70 font-medium">{heroAttr.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setHeroIdx((index) => (index - 1 + featured.length) % featured.length)
            }
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/50 hover:text-white transition-all"
          >
            <ChevronLeft size={15} />
          </button>
          <div className="flex gap-2">
            {featured.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setHeroIdx(index)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: index === heroIdx ? 28 : 8,
                  backgroundColor: index === heroIdx ? "#00b894" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setHeroIdx((index) => (index + 1) % featured.length)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/50 hover:text-white transition-all"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: t.sectionBg, borderBottom: `1px solid ${t.border}` }}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {ATTR_CATS.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setCat(category.id)}
                className="shrink-0 text-sm font-semibold px-5 py-2.5 transition-all"
                style={{
                  borderRadius: 30,
                  backgroundColor: cat === category.id ? "#00b894" : t.pill,
                  color: cat === category.id ? "#fff" : t.muted,
                  border: `1.5px solid ${cat === category.id ? "#00b894" : t.border}`,
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-7">
          <div
            className="flex-1 max-w-sm flex items-center gap-2 px-4 py-3 transition-all"
            style={{
              backgroundColor: t.card,
              border: `1.5px solid ${t.cardBorder}`,
              borderRadius: 14,
              boxShadow: t.shadow,
            }}
          >
            <Search size={14} style={{ color: t.faint }} />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search attractions…"
              className="flex-1 text-sm font-medium outline-none bg-transparent"
              style={{ color: t.txt }}
            />
            {search && (
              <button type="button" onClick={() => setSearch("")}>
                <X size={13} style={{ color: t.faint }} />
              </button>
            )}
          </div>
          <span className="text-sm font-medium" style={{ ...mono, color: t.muted }}>
            {filtered.length} attraction{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div
            className="h-48 flex flex-col items-center justify-center gap-3 rounded-3xl"
            style={{ border: `2px dashed ${t.border}`, backgroundColor: t.card }}
          >
            <Search size={28} style={{ color: t.faint }} />
            <p className="text-base font-medium" style={{ color: t.faint }}>
              No attractions match your search
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <AttractionCard
                key={item.id}
                attr={item}
                dark={dark}
                onClick={() => router.push(`/attractions/${item.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
