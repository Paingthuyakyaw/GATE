export type BadgeType = "urgent" | "new" | "featured";

export interface Tier {
  name: string;
  label: string;
  price: number;
  cap: number;
  sold: number;
  perks: string[];
  avail: boolean;
}

export interface Event {
  id: string;
  cat: string;
  featured: boolean;
  name: string;
  artist: string;
  venue: string;
  city: string;
  date: string;
  displayDate: string;
  time: string;
  image: string;
  badge: string;
  badgeType: BadgeType;
  color: string;
  minPrice: number;
  tiers: Tier[];
}

export type SortKey = "trending" | "date" | "price-asc" | "price-desc" | "name";

export interface Filters {
  cats: string[];
  cities: string[];
  priceMin: number;
  priceMax: number;
  availability: "all" | "available" | "selling-fast";
}
