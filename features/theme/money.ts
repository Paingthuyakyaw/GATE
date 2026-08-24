export const CURRENCY = "MMK";
export const PRICE_FILTER_MAX = 400_000;
export const PRICE_FILTER_STEP = 5_000;
export const PRICE_FILTER_PRESETS = [
  [0, 25_000],
  [25_000, 80_000],
  [80_000, 200_000],
  [200_000, 400_000],
] as const;
export const EVENT_BOOKING_FEE = 1_000;
export const ATTRACTION_BOOKING_FEE = 500;

export function formatAmount(amount: number): string {
  return `${amount.toLocaleString("en-US")} ${CURRENCY}`;
}

export function formatPrice(amount: number): string {
  if (amount === 0) return "FREE";

  return formatAmount(amount);
}
