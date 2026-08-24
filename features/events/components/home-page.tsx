"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

import { HomeEventCard } from "./home-event-card";
import { ALL_EVENTS } from "@/features/events/data";
import { eventSellThrough, trendingEvents } from "@/features/events/lib";
import { badgeCls, display, mono, pctColor, pctLabel, th } from "@/features/theme/tokens";
import { useGateTheme } from "@/features/theme/use-gate-theme";

export function HomePage() {
  const router = useRouter();
  const { dark } = useGateTheme();
  const [heroIdx, setHeroIdx] = useState(0);
  const featured = ALL_EVENTS.filter((event) => event.featured);
  const heroEvent = featured[heroIdx];
  const t = th(dark);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trending = trendingEvents(ALL_EVENTS, 8);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setHeroIdx((index) => (index + 1) % featured.length),
      5500,
    );

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [featured.length]);

  const goToEvent = (id: string) => router.push(`/events/${id}`);

  return (
    <div className="min-h-screen" style={{ backgroundColor: t.bg }}>
      <div className="relative h-[460px] md:h-[540px] overflow-hidden bg-zinc-900">
        {featured.map((event, index) => (
          <div
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === heroIdx ? "opacity-100" : "opacity-0"}`}
          >
            <img src={event.image} alt={event.name} className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        ))}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-14 w-full">
            <div className="max-w-xl">
              <span
                className={`inline-block text-[11px] font-semibold tracking-widest uppercase border px-3 py-1.5 rounded-full mb-5 ${badgeCls(heroEvent.badgeType, true)}`}
                style={mono}
              >
                {heroEvent.badge}
              </span>
              <h1
                className="text-5xl md:text-7xl font-black text-white leading-none mb-3"
                style={display}
              >
                {heroEvent.name}
              </h1>
              <p className="text-lg text-white/60 font-medium mb-1">{heroEvent.artist}</p>
              <p className="text-sm text-white/40 mb-8" style={mono}>
                {heroEvent.displayDate} · {heroEvent.venue}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => goToEvent(heroEvent.id)}
                  className="flex items-center gap-2.5 text-base font-bold px-7 py-4 transition-all hover:opacity-90"
                  style={{
                    ...display,
                    backgroundColor: heroEvent.color,
                    color: "#fff",
                    borderRadius: 14,
                    boxShadow: `0 6px 24px ${heroEvent.color}55`,
                  }}
                >
                  Get Tickets <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/events")}
                  className="flex items-center gap-2 text-sm font-semibold px-5 py-3.5 transition-all hover:opacity-75"
                  style={{
                    ...display,
                    color: "#fff",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    borderRadius: 14,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  Browse All Events
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-6 flex items-center gap-3">
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
        <div className="max-w-7xl mx-auto px-6 py-7">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Flame size={15} className="text-red-500" />
              <h2
                className="text-sm font-bold uppercase tracking-widest"
                style={{ ...mono, color: t.muted }}
              >
                Trending Now
              </h2>
            </div>
            <button
              type="button"
              onClick={() => router.push("/events")}
              className="text-sm font-semibold flex items-center gap-1 transition-all hover:opacity-70"
              style={{ color: "#00b894" }}
            >
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {trending.map((event) => {
              const { sold, cap, pct } = eventSellThrough(event);
              const color = pctColor(pct, dark);

              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => goToEvent(event.id)}
                  className="shrink-0 flex items-center gap-3 px-4 py-3 transition-all hover:opacity-80 group"
                  style={{
                    backgroundColor: t.card,
                    border: `1.5px solid ${t.cardBorder}`,
                    borderRadius: 14,
                    boxShadow: t.shadow,
                  }}
                >
                  <div className="w-11 h-11 overflow-hidden shrink-0 rounded-xl bg-zinc-700">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <div
                      className="text-[13px] font-bold truncate max-w-[130px]"
                      style={{ ...display, color: t.txt }}
                    >
                      {event.name}
                    </div>
                    <div className="text-[11px] truncate max-w-[130px]" style={{ color: t.muted }}>
                      {event.artist}
                    </div>
                    <div
                      className="text-[11px] font-semibold mt-0.5"
                      style={{ ...mono, color }}
                    >
                      {pctLabel(pct, sold, cap)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-3xl font-black" style={{ ...display, color: t.txt }}>
            Featured Events
          </h2>
          <button
            type="button"
            onClick={() => router.push("/events")}
            className="text-sm font-semibold flex items-center gap-1.5 transition-all hover:opacity-70"
            style={{ color: "#00b894" }}
          >
            See all events <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_EVENTS.filter((event) => event.featured)
            .concat(ALL_EVENTS.filter((event) => !event.featured).slice(0, 3))
            .map((event) => (
              <HomeEventCard
                key={event.id}
                event={event}
                dark={dark}
                onClick={() => goToEvent(event.id)}
              />
            ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div
          className="rounded-3xl overflow-hidden relative p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, #00b894 0%, #6c5ce7 100%)" }}
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2" style={display}>
              Discover your next live experience
            </h3>
            <p className="text-white/70 text-sm font-medium">
              20 events across the UK — from intimate jazz clubs to stadium shows.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/events")}
            className="shrink-0 flex items-center gap-2.5 text-base font-bold px-8 py-4 transition-all hover:opacity-90"
            style={{
              ...display,
              backgroundColor: "rgba(255,255,255,0.18)",
              color: "#fff",
              borderRadius: 14,
              border: "1.5px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            Browse Events <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
