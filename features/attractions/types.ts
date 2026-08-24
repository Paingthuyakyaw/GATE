export type BadgeType = "urgent" | "new" | "featured";

export interface AttrTier {
  name: string;
  label: string;
  price: number;
  perks: string[];
}

export interface Attraction {
  id: string;
  cat: string;
  featured: boolean;
  name: string;
  operator: string;
  city: string;
  address: string;
  hours: string;
  closedOn: string;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  badgeType: BadgeType;
  color: string;
  highlights: string[];
  tiers: AttrTier[];
}

export interface AttrCategory {
  id: string;
  label: string;
}
