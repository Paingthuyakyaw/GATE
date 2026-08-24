"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Tag, X, XCircle } from "lucide-react";

import { EventFilters } from "./event-filters";
import { EventsGridCard, EventsListCard, ViewToggle } from "./event-cards";
import { ALL_EVENTS, CATEGORIES } from "@/features/events/data";
import { DEFAULT_FILTERS, filterAndSortEvents } from "@/features/events/lib";
import type { Filters, SortKey } from "@/features/events/types";
import { formatAmount, PRICE_FILTER_MAX } from "@/features/theme/money";
import { display, mono, th } from "@/features/theme/tokens";
import { useGateTheme } from "@/features/theme/use-gate-theme";

export function EventsBrowse() {
  const router = useRouter();
  const { dark } = useGateTheme();
  const t = th(dark);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>("trending");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebar] = useState(false);
  const [priceRange, setPriceRange] = useState([0, PRICE_FILTER_MAX]);

  const activeFilters: { label: string; remove: () => void }[] = [
    ...filters.cats.map((cat) => ({
      label: CATEGORIES.find((item) => item.id === cat)?.label ?? cat,
      remove: () =>
        setFilters((current) => ({
          ...current,
          cats: current.cats.filter((item) => item !== cat),
        })),
    })),
    ...filters.cities.map((city) => ({
      label: city,
      remove: () =>
        setFilters((current) => ({
          ...current,
          cities: current.cities.filter((item) => item !== city),
        })),
    })),
    ...(filters.priceMin > 0 || filters.priceMax < PRICE_FILTER_MAX
      ? [
          {
            label: `${formatAmount(filters.priceMin)}–${formatAmount(filters.priceMax)}`,
            remove: () => {
              setFilters((current) => ({ ...current, priceMin: 0, priceMax: PRICE_FILTER_MAX }));
              setPriceRange([0, PRICE_FILTER_MAX]);
            },
          },
        ]
      : []),
    ...(filters.availability !== "all"
      ? [
          {
            label: filters.availability === "available" ? "In Stock" : "Selling Fast",
            remove: () =>
              setFilters((current) => ({ ...current, availability: "all" })),
          },
        ]
      : []),
  ];

  const filtered = useMemo(
    () => filterAndSortEvents(ALL_EVENTS, filters, search, sort),
    [filters, search, sort],
  );

  function clearAll() {
    setFilters(DEFAULT_FILTERS);
    setPriceRange([0, PRICE_FILTER_MAX]);
    setSearch("");
  }

  const hasFilters = activeFilters.length > 0 || search !== "";

  const sidebar = (
    <EventFilters
      filters={filters}
      setFilters={setFilters}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      hasFilters={hasFilters}
      onClear={clearAll}
      dark={dark}
    />
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: t.bg }}>
      <div style={{ backgroundColor: t.sectionBg, borderBottom: `1px solid ${t.border}` }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-end gap-5">
            <div className="flex-1">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ ...mono, color: "#00b894" }}
              >
                Browse
              </p>
              <h1 className="text-4xl md:text-5xl font-black" style={{ ...display, color: t.txt }}>
                All Events
              </h1>
              <p className="text-sm mt-1.5 font-medium" style={{ color: t.muted }}>
                {ALL_EVENTS.length} events across the UK — music, theatre, sports &amp; more
              </p>
            </div>
            <div className="flex items-center gap-3 flex-1 md:max-w-sm">
              <div
                className="flex flex-1 items-center gap-2.5 px-4 py-3 rounded-2xl"
                style={{ backgroundColor: t.inputBg, border: `1.5px solid ${t.border}` }}
              >
                <Search size={15} style={{ color: t.faint }} />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Artist, event, venue…"
                  className="flex-1 bg-transparent text-sm font-medium outline-none"
                  style={{ color: t.txt }}
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")}>
                    <X size={13} style={{ color: t.faint }} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <button
            type="button"
            onClick={() => setSidebar((open) => !open)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              backgroundColor: sidebarOpen ? "#00b894" : t.card,
              color: sidebarOpen ? "#fff" : t.muted,
              border: `1.5px solid ${sidebarOpen ? "#00b894" : t.border}`,
            }}
          >
            <SlidersHorizontal size={14} /> Filters{" "}
            {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>

          {activeFilters.map((filter) => (
            <div
              key={filter.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "rgba(0,184,148,0.12)",
                color: "#00b894",
                border: "1.5px solid rgba(0,184,148,0.25)",
              }}
            >
              <Tag size={11} />
              {filter.label}
              <button type="button" onClick={filter.remove} className="hover:opacity-70 ml-0.5">
                <XCircle size={13} />
              </button>
            </div>
          ))}
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold transition-all hover:opacity-70"
              style={{ color: "#ef4444" }}
            >
              Clear all
            </button>
          )}

          <div className="ml-auto flex items-center gap-2">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="text-sm font-medium outline-none cursor-pointer px-3 py-2.5 rounded-xl appearance-none pr-8 transition-all"
              style={{
                backgroundColor: t.card,
                color: t.muted,
                border: `1.5px solid ${t.border}`,
                ...mono,
              }}
            >
              <option value="trending" style={{ backgroundColor: dark ? "#161616" : "#fff" }}>
                Trending
              </option>
              <option value="date" style={{ backgroundColor: dark ? "#161616" : "#fff" }}>
                Date: Soonest
              </option>
              <option value="price-asc" style={{ backgroundColor: dark ? "#161616" : "#fff" }}>
                Price: Low–High
              </option>
              <option value="price-desc" style={{ backgroundColor: dark ? "#161616" : "#fff" }}>
                Price: High–Low
              </option>
              <option value="name" style={{ backgroundColor: dark ? "#161616" : "#fff" }}>
                Name A–Z
              </option>
            </select>
            <ViewToggle view={view} setView={setView} dark={dark} />
          </div>
        </div>

        <div className="flex gap-7">
          <aside className="hidden md:block w-64 shrink-0">
            <div
              className="sticky top-24 rounded-2xl p-5"
              style={{
                backgroundColor: t.card,
                border: `1.5px solid ${t.cardBorder}`,
                boxShadow: t.shadow,
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal size={14} style={{ color: "#00b894" }} />
                <span className="text-sm font-bold" style={{ color: t.txt }}>
                  Filters
                </span>
                {activeFilters.length > 0 && (
                  <span
                    className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#00b894", color: "#fff" }}
                  >
                    {activeFilters.length}
                  </span>
                )}
              </div>
              {sidebar}
            </div>
          </aside>

          {sidebarOpen && (
            <div className="md:hidden fixed inset-0 z-40 flex">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSidebar(false)} />
              <div
                className="relative z-50 w-80 h-full overflow-y-auto p-5 ml-auto"
                style={{ backgroundColor: t.card }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-base font-bold" style={{ color: t.txt }}>
                    Filters
                  </span>
                  <button
                    type="button"
                    onClick={() => setSidebar(false)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: t.card2, color: t.muted }}
                  >
                    <X size={15} />
                  </button>
                </div>
                {sidebar}
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium mb-5" style={{ color: t.faint }}>
              Showing{" "}
              <span style={{ color: t.txt, fontWeight: 600 }}>{filtered.length}</span> of{" "}
              {ALL_EVENTS.length} events
            </p>

            {filtered.length === 0 ? (
              <div
                className="h-64 flex flex-col items-center justify-center gap-3 rounded-2xl"
                style={{ border: `1.5px dashed ${t.border}`, backgroundColor: t.card }}
              >
                <Search size={28} style={{ color: t.faint }} />
                <p className="text-base font-semibold" style={{ color: t.muted }}>
                  No events match your filters
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-sm font-semibold"
                  style={{ color: "#00b894" }}
                >
                  Clear filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((event) => (
                  <EventsGridCard
                    key={event.id}
                    event={event}
                    dark={dark}
                    onClick={() => router.push(`/events/${event.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((event) => (
                  <EventsListCard
                    key={event.id}
                    event={event}
                    dark={dark}
                    onClick={() => router.push(`/events/${event.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
