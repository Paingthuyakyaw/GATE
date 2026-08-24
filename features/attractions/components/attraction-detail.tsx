"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Share2,
  Star,
  Ticket,
} from "lucide-react";

import { AttrTierCard } from "./attr-tier-card";
import { PaymentFlow } from "@/features/checkout/payment-flow";
import type { Attraction } from "@/features/attractions/types";
import { badgeCls, display, mono, th } from "@/features/theme/tokens";
import { useGateTheme } from "@/features/theme/use-gate-theme";

export function AttractionDetail({ attr }: { attr: Attraction }) {
  const router = useRouter();
  const { dark } = useGateTheme();
  const [selTier, setSelTier] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [paying, setPaying] = useState(false);
  const chosen = selTier !== null ? attr.tiers[selTier] : null;
  const subtotal = chosen ? chosen.price * qty : 0;
  const isFree = chosen?.price === 0;
  const fee = isFree ? 0 : parseFloat((0.95 * qty).toFixed(2));
  const t = th(dark);

  return (
    <div className="min-h-screen" style={{ backgroundColor: t.bg }}>
      {paying && chosen && (
        <PaymentFlow
          name={attr.name}
          venue={attr.city}
          date={attr.hours}
          tierName={chosen.name}
          tierLabel={chosen.label}
          qty={qty}
          subtotal={subtotal}
          fee={fee}
          isFree={!!isFree}
          accentColor={attr.color}
          dark={dark}
          onClose={() => setPaying(false)}
        />
      )}

      <div style={{ backgroundColor: t.sectionBg, borderBottom: `1px solid ${t.border}` }}>
        <div
          className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-[13px]"
          style={{ ...mono, color: t.muted }}
        >
          <button
            type="button"
            onClick={() => router.push("/attractions")}
            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={12} /> Attractions
          </button>
          <ChevronRight size={10} style={{ color: t.faint }} />
          <span className="truncate" style={{ color: t.txt }}>
            {attr.name}
          </span>
        </div>
      </div>

      <div className="relative h-64 md:h-80 overflow-hidden bg-zinc-900">
        <img src={attr.image} alt={attr.name} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 pb-7">
            <span
              className={`inline-block text-[11px] font-semibold tracking-widest uppercase border px-3 py-1.5 rounded-full mb-3 ${badgeCls(attr.badgeType, true)}`}
              style={mono}
            >
              {attr.badge}
            </span>
            <h1
              className="text-4xl md:text-5xl font-black text-white leading-none mb-1"
              style={display}
            >
              {attr.name}
            </h1>
            <p className="text-sm text-white/50" style={mono}>
              {attr.operator}
            </p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: t.card, borderBottom: `1px solid ${t.border}` }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={13}
                    fill={index < Math.round(attr.rating) ? attr.color : "none"}
                    style={{
                      color: index < Math.round(attr.rating) ? attr.color : t.faint,
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold" style={{ color: t.txt }}>
                {attr.rating}
              </span>
              <span className="text-sm" style={{ color: t.muted }}>
                ({attr.reviews.toLocaleString()} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} style={{ color: attr.color }} />
              <span className="text-sm" style={{ color: t.muted }}>
                {attr.address}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} style={{ color: attr.color }} />
              <span className="text-sm" style={{ color: t.muted }}>
                {attr.hours}
              </span>
            </div>
            <div className="ml-auto flex gap-2">
              {[{ Icon: Heart, label: "Save" }, { Icon: Share2, label: "Share" }].map(
                ({ Icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    className="flex items-center gap-2 text-sm font-medium px-4 py-2 transition-all hover:opacity-75"
                    style={{
                      color: t.muted,
                      border: `1px solid ${t.border}`,
                      borderRadius: 10,
                      backgroundColor: t.card2,
                    }}
                  >
                    <Icon size={13} />
                    {label}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="space-y-8">
            <div
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: t.card,
                border: `1.5px solid ${t.cardBorder}`,
                boxShadow: t.shadow,
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ ...display, color: t.txt }}>
                What&apos;s Included
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {attr.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: t.card2 }}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${attr.color}20` }}
                    >
                      <Check size={12} style={{ color: attr.color }} />
                    </span>
                    <span className="text-sm font-medium" style={{ color: t.txt }}>
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: t.card,
                border: `1.5px solid ${t.cardBorder}`,
                boxShadow: t.shadow,
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ ...display, color: t.txt }}>
                Visit Information
              </h2>
              <div className="space-y-3">
                {[
                  { Icon: Clock, label: "Opening Hours", val: attr.hours },
                  { Icon: Calendar, label: "Closed", val: attr.closedOn },
                  { Icon: MapPin, label: "Address", val: attr.address },
                ].map(({ Icon, label, val }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${attr.color}15` }}
                    >
                      <Icon size={13} style={{ color: attr.color }} />
                    </div>
                    <div>
                      <div
                        className="text-[11px] font-semibold uppercase tracking-wider mb-0.5"
                        style={{ ...mono, color: t.faint }}
                      >
                        {label}
                      </div>
                      <div className="text-sm font-medium" style={{ color: t.txt }}>
                        {val}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold" style={{ ...display, color: t.txt }}>
                  Select Ticket Type
                </h2>
                <span
                  className="text-[12px] flex items-center gap-1.5"
                  style={{ ...mono, color: t.faint }}
                >
                  <AlertCircle size={11} /> Booking fee may apply
                </span>
              </div>
              <div className="space-y-3">
                {attr.tiers.map((tier, index) => (
                  <AttrTierCard
                    key={tier.name}
                    tier={tier}
                    accent={attr.color}
                    dark={dark}
                    selected={selTier === index}
                    onSelect={() => {
                      setSelTier(index);
                      setQty(1);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 self-start">
            <div
              className="overflow-hidden"
              style={{
                backgroundColor: t.card,
                border: `1.5px solid ${t.cardBorder}`,
                borderRadius: 20,
                boxShadow: t.shadowHover,
              }}
            >
              <div
                className="px-6 py-4 flex items-center gap-2.5"
                style={{ borderBottom: `1px solid ${t.border}` }}
              >
                <Ticket size={14} style={{ color: attr.color }} />
                <span className="text-sm font-semibold" style={{ ...mono, color: t.muted }}>
                  Order Summary
                </span>
              </div>
              <div className="p-6 space-y-5">
                {!chosen ? (
                  <div
                    className="h-28 flex flex-col items-center justify-center gap-2 rounded-2xl"
                    style={{ border: `1.5px dashed ${t.border}`, backgroundColor: t.card2 }}
                  >
                    <Ticket size={22} style={{ color: t.faint }} />
                    <p className="text-sm font-medium text-center" style={{ color: t.faint }}>
                      Select a ticket type above
                    </p>
                  </div>
                ) : (
                  <>
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        backgroundColor: `${attr.color}12`,
                        border: `1px solid ${attr.color}30`,
                      }}
                    >
                      <div
                        className="text-[10px] font-bold uppercase tracking-widest mb-1"
                        style={{ ...mono, color: attr.color }}
                      >
                        {chosen.name}
                      </div>
                      <div className="text-base font-bold" style={{ ...display, color: t.txt }}>
                        {attr.name}
                      </div>
                      <div className="text-[13px] mt-0.5" style={{ color: t.muted }}>
                        {attr.city} · {attr.hours}
                      </div>
                    </div>

                    <div>
                      <label
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-2.5"
                        style={{ ...mono, color: t.faint }}
                      >
                        Quantity
                      </label>
                      <div className="flex items-center gap-0">
                        <button
                          type="button"
                          onClick={() => setQty((value) => Math.max(1, value - 1))}
                          className="w-11 h-11 flex items-center justify-center text-xl font-bold transition-all hover:opacity-75"
                          style={{
                            backgroundColor: t.card2,
                            border: `1.5px solid ${t.border}`,
                            borderRadius: "12px 0 0 12px",
                            color: t.txt,
                          }}
                        >
                          −
                        </button>
                        <div
                          className="w-14 h-11 flex items-center justify-center font-bold text-base border-y"
                          style={{
                            ...display,
                            color: t.txt,
                            borderColor: t.border,
                            backgroundColor: t.card,
                          }}
                        >
                          {qty}
                        </div>
                        <button
                          type="button"
                          onClick={() => setQty((value) => Math.min(10, value + 1))}
                          className="w-11 h-11 flex items-center justify-center text-xl font-bold transition-all hover:opacity-75"
                          style={{
                            backgroundColor: t.card2,
                            border: `1.5px solid ${t.border}`,
                            borderRadius: "0 12px 12px 0",
                            color: t.txt,
                          }}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-[11px] mt-1.5" style={{ ...mono, color: t.faint }}>
                        Max 10 per booking
                      </p>
                    </div>

                    <div className="space-y-2 text-sm" style={{ ...mono }}>
                      <div className="flex justify-between">
                        <span style={{ color: t.muted }}>
                          {qty}× {chosen.label}
                        </span>
                        <span style={{ color: t.txt }}>{isFree ? "FREE" : `£${subtotal}`}</span>
                      </div>
                      {!isFree && (
                        <div className="flex justify-between">
                          <span style={{ color: t.muted }}>Booking fee</span>
                          <span style={{ color: t.txt }}>£{fee}</span>
                        </div>
                      )}
                      <div
                        className="pt-2 flex justify-between font-bold text-base"
                        style={{ borderTop: `1px solid ${t.border}` }}
                      >
                        <span style={{ color: t.muted }}>Total</span>
                        <span style={{ color: t.txt }}>
                          {isFree ? "FREE" : `£${(subtotal + fee).toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => chosen && setPaying(true)}
                  disabled={!chosen}
                  className="w-full py-4 font-bold transition-all text-base flex items-center justify-center gap-2"
                  style={{
                    ...display,
                    backgroundColor: chosen ? attr.color : t.card2,
                    color: chosen ? "#fff" : t.faint,
                    border: `1.5px solid ${chosen ? attr.color : t.border}`,
                    borderRadius: 14,
                    cursor: chosen ? "pointer" : "not-allowed",
                    boxShadow: chosen ? `0 6px 20px ${attr.color}40` : "none",
                  }}
                >
                  {chosen ? (
                    <>
                      <Ticket size={16} />
                      {isFree
                        ? "Reserve Free Ticket"
                        : `Book Now — £${(subtotal + fee).toFixed(2)}`}
                    </>
                  ) : (
                    "Select a Ticket Type"
                  )}
                </button>

                <div className="space-y-1.5 pt-1" style={{ borderTop: `1px solid ${t.border}` }}>
                  {[
                    "E-ticket delivered by email",
                    "Free cancellation up to 24h before",
                    "Photo ID may be required",
                  ].map((item) => (
                    <p
                      key={item}
                      className="text-[11px] flex items-start gap-1.5"
                      style={{ ...mono, color: t.faint }}
                    >
                      <Check size={9} className="mt-0.5 shrink-0" style={{ color: attr.color }} />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
