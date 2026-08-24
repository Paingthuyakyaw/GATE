import type { Event, Filters, SortKey } from "./types";

export function eventSellThrough(event: Event) {
  const sold = event.tiers.reduce((sum, tier) => sum + tier.sold, 0);
  const cap = event.tiers.reduce((sum, tier) => sum + tier.cap, 0);

  return { sold, cap, pct: cap === 0 ? 0 : sold / cap };
}

export function minAvailablePrice(event: Event) {
  const available = event.tiers.filter((tier) => tier.avail);

  return available.length
    ? Math.min(...available.map((tier) => tier.price))
    : event.minPrice;
}

export function trendingEvents(events: Event[], limit = 8) {
  return [...events]
    .sort((a, b) => eventSellThrough(b).pct - eventSellThrough(a).pct)
    .slice(0, limit);
}

export function filterAndSortEvents(
  events: Event[],
  filters: Filters,
  search: string,
  sort: SortKey,
) {
  const query = search.toLowerCase();
  let result = events.filter((event) => {
    if (filters.cats.length && !filters.cats.includes(event.cat)) return false;
    if (filters.cities.length && !filters.cities.includes(event.city))
      return false;
    if (event.minPrice < filters.priceMin || event.minPrice > filters.priceMax)
      return false;
    if (query) {
      const haystack = `${event.name} ${event.artist} ${event.venue}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.availability !== "all") {
      const { pct } = eventSellThrough(event);
      if (filters.availability === "available" && pct >= 1) return false;
      if (filters.availability === "selling-fast" && pct < 0.6) return false;
    }

    return true;
  });

  if (sort === "date") {
    result = [...result].sort((a, b) => a.date.localeCompare(b.date));
  } else if (sort === "price-asc") {
    result = [...result].sort((a, b) => a.minPrice - b.minPrice);
  } else if (sort === "price-desc") {
    result = [...result].sort((a, b) => b.minPrice - a.minPrice);
  } else if (sort === "name") {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    result = [...result].sort(
      (a, b) => eventSellThrough(b).pct - eventSellThrough(a).pct,
    );
  }

  return result;
}

export const DEFAULT_FILTERS: Filters = {
  cats: [],
  cities: [],
  priceMin: 0,
  priceMax: 700,
  availability: "all",
};
