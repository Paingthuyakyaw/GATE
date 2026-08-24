"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Share2,
  Ticket,
} from "lucide-react";

import { TierCard } from "./tier-card";
import { PaymentFlow } from "@/features/checkout/payment-flow";
import type { Event } from "@/features/events/types";
import { EVENT_BOOKING_FEE, formatPrice } from "@/features/theme/money";
import { badgeCls, display, mono, th } from "@/features/theme/tokens";
import { useGateTheme } from "@/features/theme/use-gate-theme";

export function EventDetail({ event }: { event: Event }) {
  const router = useRouter();
  const { dark } = useGateTheme();
  const [selTier, setSelTier] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [paying, setPaying] = useState(false);
  const chosen = selTier !== null ? event.tiers[selTier] : null;
  const subtotal = chosen ? chosen.price * qty : 0;
  const fee = EVENT_BOOKING_FEE * qty;
  const t = th(dark);

  return (
    <div className="min-h-screen" style={{ backgroundColor: t.bg }}>
      {paying && chosen && (
        <PaymentFlow
          name={event.name}
          venue={event.venue}
          date={event.displayDate}
          tierName={chosen.name}
          tierLabel={chosen.label}
          qty={qty}
          subtotal={subtotal}
          fee={fee}
          isFree={false}
          accentColor={event.color}
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
            onClick={() => router.push("/events")}
            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={12} /> All Events
          </button>
          <ChevronRight size={10} style={{ color: t.faint }} />
          <span className="truncate" style={{ color: t.txt }}>
            {event.name}
          </span>
        </div>
      </div>

      <div className="relative h-64 md:h-96 overflow-hidden bg-zinc-900">
        <img src={event.image} alt={event.name} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 pb-8">
            <span
              className={`inline-block text-[11px] font-semibold tracking-widest uppercase border px-3 py-1.5 rounded-full mb-4 ${badgeCls(event.badgeType, true)}`}
              style={mono}
            >
              {event.badge}
            </span>
            <h1
              className="text-4xl md:text-6xl font-black text-white leading-none mb-2"
              style={display}
            >
              {event.name}
            </h1>
            <p className="text-base text-white/60 font-medium">{event.artist}</p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: t.card, borderBottom: `1px solid ${t.border}` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-6 py-4 items-center">
            {[
              { Icon: Calendar, val: event.displayDate },
              { Icon: Clock, val: event.time },
              { Icon: MapPin, val: `${event.venue}, ${event.city}` },
            ].map(({ Icon, val }) => (
              <div key={val} className="flex items-center gap-2">
                <Icon size={13} style={{ color: event.color }} />
                <span className="text-sm font-medium" style={{ color: t.muted }}>
                  {val}
                </span>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2">
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
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ ...display, color: t.txt }}>
                Select Ticket Type
              </h2>
              <span
                className="text-[12px] flex items-center gap-1.5"
                style={{ ...mono, color: t.faint }}
              >
                <AlertCircle size={11} /> Excl. booking fee
              </span>
            </div>
            <div className="space-y-4">
              {event.tiers.map((tier, index) => (
                <TierCard
                  key={tier.name}
                  tier={tier}
                  accent={event.color}
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
                <Ticket size={14} style={{ color: event.color }} />
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
                      Select a ticket type to continue
                    </p>
                  </div>
                ) : (
                  <>
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        backgroundColor: `${event.color}12`,
                        border: `1px solid ${event.color}30`,
                      }}
                    >
                      <div
                        className="text-[10px] font-bold uppercase tracking-widest mb-1"
                        style={{ ...mono, color: event.color }}
                      >
                        {chosen.name}
                      </div>
                      <div className="text-base font-bold" style={{ ...display, color: t.txt }}>
                        {event.name}
                      </div>
                      <div className="text-[13px] mt-0.5" style={{ color: t.muted }}>
                        {event.venue} · {event.displayDate}
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
                          onClick={() => setQty((value) => Math.min(8, value + 1))}
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
                        Max 8 per booking
                      </p>
                    </div>
                    <div className="space-y-2 text-sm" style={{ ...mono }}>
                      <div className="flex justify-between">
                        <span style={{ color: t.muted }}>
                          {qty}× {chosen.label}
                        </span>
                        <span style={{ color: t.txt }}>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: t.muted }}>Booking fee</span>
                        <span style={{ color: t.txt }}>{formatPrice(fee)}</span>
                      </div>
                      <div
                        className="pt-2 flex justify-between font-bold text-base"
                        style={{ borderTop: `1px solid ${t.border}` }}
                      >
                        <span style={{ color: t.muted }}>Total</span>
                        <span style={{ color: event.color }}>
                          {formatPrice(subtotal + fee)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => chosen && setPaying(true)}
                  disabled={!chosen}
                  className="w-full py-4 font-bold text-base transition-all flex items-center justify-center gap-2"
                  style={{
                    ...display,
                    backgroundColor: chosen ? event.color : t.card2,
                    color: chosen ? "#fff" : t.faint,
                    border: `1.5px solid ${chosen ? event.color : t.border}`,
                    borderRadius: 14,
                    cursor: chosen ? "pointer" : "not-allowed",
                    boxShadow: chosen ? `0 6px 20px ${event.color}40` : "none",
                  }}
                >
                  {chosen ? (
                    <>
                      <Ticket size={16} /> Buy Now — {formatPrice(subtotal + fee)}
                    </>
                  ) : (
                    "Select a Ticket Type"
                  )}
                </button>
                {chosen && (
                  <p className="text-center text-xs" style={{ ...mono, color: t.faint }}>
                    Secure checkout · E-ticket by email
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
