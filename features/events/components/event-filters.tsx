"use client";

import { Check } from "lucide-react";

import { CATEGORIES, CITIES } from "@/features/events/data";
import type { Filters } from "@/features/events/types";
import { display, mono, th } from "@/features/theme/tokens";

export function EventFilters({
  filters,
  setFilters,
  priceRange,
  setPriceRange,
  hasFilters,
  onClear,
  dark,
}: {
  filters: Filters;
  setFilters: (updater: (current: Filters) => Filters) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  hasFilters: boolean;
  onClear: () => void;
  dark: boolean;
}) {
  const t = th(dark);

  function toggleCat(id: string) {
    setFilters((current) => ({
      ...current,
      cats: current.cats.includes(id)
        ? current.cats.filter((cat) => cat !== id)
        : [...current.cats, id],
    }));
  }

  function toggleCity(city: string) {
    setFilters((current) => ({
      ...current,
      cities: current.cities.includes(city)
        ? current.cities.filter((item) => item !== city)
        : [...current.cities, city],
    }));
  }

  return (
    <div className="space-y-7">
      <div>
        <h4
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ ...mono, color: t.muted }}
        >
          Category
        </h4>
        <div className="space-y-1">
          {CATEGORIES.filter((category) => category.id !== "all").map(
            ({ id, label, Icon }) => (
              <label
                key={id}
                className="flex items-center gap-3 py-2 px-3 rounded-xl cursor-pointer transition-all hover:opacity-80 select-none"
                style={{
                  backgroundColor: filters.cats.includes(id)
                    ? "rgba(0,184,148,0.1)"
                    : "transparent",
                }}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0"
                  style={{
                    backgroundColor: filters.cats.includes(id) ? "#00b894" : "transparent",
                    borderColor: filters.cats.includes(id) ? "#00b894" : t.border,
                  }}
                >
                  {filters.cats.includes(id) && <Check size={11} color="#fff" />}
                </div>
                <input
                  type="checkbox"
                  checked={filters.cats.includes(id)}
                  onChange={() => toggleCat(id)}
                  className="sr-only"
                />
                <Icon
                  size={13}
                  style={{ color: filters.cats.includes(id) ? "#00b894" : t.muted }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: filters.cats.includes(id) ? "#00b894" : t.muted }}
                >
                  {label}
                </span>
              </label>
            ),
          )}
        </div>
      </div>

      <div>
        <h4
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ ...mono, color: t.muted }}
        >
          City
        </h4>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => toggleCity(city)}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
              style={
                filters.cities.includes(city)
                  ? { backgroundColor: "#00b894", color: "#fff" }
                  : {
                      backgroundColor: t.card2,
                      color: t.muted,
                      border: `1.5px solid ${t.border}`,
                    }
              }
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ ...mono, color: t.muted }}
        >
          Price Range
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold" style={{ ...display, color: t.txt }}>
              £{priceRange[0]}
            </span>
            <span className="text-sm font-bold" style={{ ...display, color: t.txt }}>
              £{priceRange[1]}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={700}
            step={10}
            value={priceRange[1]}
            onChange={(event) => {
              const value = Number(event.target.value);
              setPriceRange([priceRange[0], value]);
              setFilters((current) => ({ ...current, priceMax: value }));
            }}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="grid grid-cols-2 gap-2">
            {[
              [0, 50],
              [50, 150],
              [150, 400],
              [400, 700],
            ].map(([lo, hi]) => (
              <button
                key={`${lo}-${hi}`}
                type="button"
                onClick={() => {
                  setPriceRange([lo, hi]);
                  setFilters((current) => ({ ...current, priceMin: lo, priceMax: hi }));
                }}
                className="text-xs py-1.5 rounded-lg font-medium transition-all"
                style={{
                  backgroundColor:
                    priceRange[0] === lo && priceRange[1] === hi ? "#00b894" : t.card2,
                  color: priceRange[0] === lo && priceRange[1] === hi ? "#fff" : t.muted,
                  border: `1px solid ${t.border}`,
                }}
              >
                £{lo}–£{hi}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ ...mono, color: t.muted }}
        >
          Availability
        </h4>
        <div className="space-y-1">
          {(
            [
              { v: "all" as const, label: "All events" },
              { v: "available" as const, label: "In stock" },
              { v: "selling-fast" as const, label: "Selling fast" },
            ]
          ).map((option) => (
            <button
              key={option.v}
              type="button"
              onClick={() =>
                setFilters((current) => ({ ...current, availability: option.v }))
              }
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
              style={{
                backgroundColor:
                  filters.availability === option.v
                    ? "rgba(0,184,148,0.1)"
                    : "transparent",
              }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                style={{
                  borderColor:
                    filters.availability === option.v ? "#00b894" : t.border,
                }}
              >
                {filters.availability === option.v && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#00b894" }} />
                )}
              </div>
              <span
                className="text-sm font-medium"
                style={{
                  color: filters.availability === option.v ? "#00b894" : t.muted,
                }}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="w-full py-2.5 text-sm font-semibold rounded-xl transition-all hover:opacity-80"
          style={{
            color: "#ef4444",
            backgroundColor: "rgba(239,68,68,0.08)",
            border: "1.5px solid rgba(239,68,68,0.2)",
          }}
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
