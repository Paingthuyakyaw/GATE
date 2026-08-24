"use client";

import { useState } from "react";
import { Check, ChevronRight, Share2, Ticket, X } from "lucide-react";

import { genRef } from "./gen-ref";
import { QRCode } from "./qr-code";
import { display, mono, th } from "@/features/theme/tokens";

export interface PayProps {
  name: string;
  venue: string;
  date: string;
  tierName: string;
  tierLabel: string;
  qty: number;
  subtotal: number;
  fee: number;
  isFree: boolean;
  accentColor: string;
  dark: boolean;
  onClose: () => void;
}

type PayStep = "form" | "processing" | "ticket";

export function PaymentFlow(props: PayProps) {
  const {
    name,
    venue,
    date,
    tierName,
    tierLabel,
    qty,
    subtotal,
    fee,
    isFree,
    accentColor,
    dark,
    onClose,
  } = props;
  const t = th(dark);
  const total = isFree ? 0 : subtotal + fee;

  const [step, setStep] = useState<PayStep>("form");
  const [method, setMethod] = useState<"card" | "paypal" | "apple">("card");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingRef] = useState(genRef);
  const [progWidth, setProgWidth] = useState(0);

  const issuedAt = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  function fmtCard(value: string) {
    return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  function fmtExp(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    return digits.length >= 3 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
  }

  function validate() {
    const next: Record<string, string> = {};
    if (method === "card" && !isFree) {
      if (cardNum.replace(/\s/g, "").length < 16)
        next.cardNum = "Enter a valid 16-digit card number";
      if (expiry.length < 5) next.expiry = "Enter MM/YY";
      if (cvv.length < 3) next.cvv = "Enter 3-digit CVV";
      if (!cardName.trim()) next.cardName = "Name required";
    }
    setErrors(next);

    return Object.keys(next).length === 0;
  }

  function handlePay() {
    if (!validate()) return;
    setStep("processing");
    let width = 0;
    const interval = setInterval(() => {
      width += Math.random() * 18 + 4;
      if (width >= 100) {
        width = 100;
        clearInterval(interval);
        setTimeout(() => setStep("ticket"), 400);
      }
      setProgWidth(width);
    }, 120);
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: dark ? t.card2 : "#f9f9f7",
    border: `1.5px solid ${dark ? t.border : "rgba(0,0,0,0.13)"}`,
    borderRadius: 10,
    color: t.txt,
    outline: "none",
    width: "100%",
    padding: "10px 14px",
    fontSize: 14,
    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
    boxShadow: dark ? "none" : "inset 0 1px 2px rgba(0,0,0,0.04)",
  };
  const errStyle: React.CSSProperties = {
    fontSize: 11,
    color: "#ef4444",
    marginTop: 4,
    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-md max-h-[90vh] overflow-y-auto relative"
        style={{
          backgroundColor: t.card,
          border: `1.5px solid ${t.cardBorder}`,
          borderRadius: 24,
          boxShadow: t.shadowMd,
          scrollbarWidth: "none",
        }}
      >
        {step === "form" && (
          <>
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: `1px solid ${t.border}` }}
            >
              <div>
                <div className="text-lg font-black" style={{ ...display, color: t.txt }}>
                  {isFree ? "Reserve Free Ticket" : "Secure Checkout"}
                </div>
                <div className="text-xs mt-0.5" style={{ ...mono, color: t.muted }}>
                  {qty}× {tierLabel} · {isFree ? "Free" : `£${total.toFixed(2)}`}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:opacity-70"
                style={{
                  backgroundColor: t.card2,
                  border: `1.5px solid ${t.border}`,
                  color: t.muted,
                }}
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div
                className="p-4 rounded-2xl flex items-center gap-4"
                style={{
                  backgroundColor: `${accentColor}12`,
                  border: `1px solid ${accentColor}35`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${accentColor}25` }}
                >
                  <Ticket size={16} style={{ color: accentColor }} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold truncate" style={{ ...display, color: t.txt }}>
                    {name}
                  </div>
                  <div className="text-xs truncate" style={{ ...mono, color: t.muted }}>
                    {qty}× {tierName} · {venue}
                  </div>
                </div>
                <div
                  className="ml-auto shrink-0 font-bold text-lg"
                  style={{ ...display, color: accentColor }}
                >
                  {isFree ? "FREE" : `£${total.toFixed(2)}`}
                </div>
              </div>

              {!isFree && (
                <>
                  <div>
                    <div
                      className="text-xs font-semibold uppercase tracking-widest mb-3"
                      style={{ ...mono, color: t.faint }}
                    >
                      Payment Method
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(["card", "paypal", "apple"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setMethod(option)}
                          className="py-3 text-sm font-semibold transition-all"
                          style={{
                            borderRadius: 10,
                            border: `1.5px solid ${method === option ? accentColor : t.border}`,
                            backgroundColor: method === option ? `${accentColor}15` : t.card2,
                            color: method === option ? accentColor : t.muted,
                          }}
                        >
                          {option === "card"
                            ? "Card"
                            : option === "paypal"
                              ? "PayPal"
                              : "Apple Pay"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {method === "card" && (
                    <div className="space-y-3">
                      <div>
                        <label
                          className="text-xs font-semibold uppercase tracking-wider block mb-1.5"
                          style={{ ...mono, color: t.faint }}
                        >
                          Card Number
                        </label>
                        <input
                          value={cardNum}
                          onChange={(event) => setCardNum(fmtCard(event.target.value))}
                          placeholder="1234 5678 9012 3456"
                          style={inputStyle}
                        />
                        {errors.cardNum && <div style={errStyle}>{errors.cardNum}</div>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            className="text-xs font-semibold uppercase tracking-wider block mb-1.5"
                            style={{ ...mono, color: t.faint }}
                          >
                            Expiry
                          </label>
                          <input
                            value={expiry}
                            onChange={(event) => setExpiry(fmtExp(event.target.value))}
                            placeholder="MM/YY"
                            style={inputStyle}
                          />
                          {errors.expiry && <div style={errStyle}>{errors.expiry}</div>}
                        </div>
                        <div>
                          <label
                            className="text-xs font-semibold uppercase tracking-wider block mb-1.5"
                            style={{ ...mono, color: t.faint }}
                          >
                            CVV
                          </label>
                          <input
                            value={cvv}
                            onChange={(event) =>
                              setCvv(event.target.value.replace(/\D/g, "").slice(0, 4))
                            }
                            placeholder="123"
                            type="password"
                            style={inputStyle}
                          />
                          {errors.cvv && <div style={errStyle}>{errors.cvv}</div>}
                        </div>
                      </div>
                      <div>
                        <label
                          className="text-xs font-semibold uppercase tracking-wider block mb-1.5"
                          style={{ ...mono, color: t.faint }}
                        >
                          Name on Card
                        </label>
                        <input
                          value={cardName}
                          onChange={(event) => setCardName(event.target.value)}
                          placeholder="J. SMITH"
                          style={inputStyle}
                        />
                        {errors.cardName && <div style={errStyle}>{errors.cardName}</div>}
                      </div>
                    </div>
                  )}

                  {method !== "card" && (
                    <div
                      className="h-24 flex items-center justify-center rounded-2xl"
                      style={{
                        border: `1.5px dashed ${t.border}`,
                        backgroundColor: t.card2,
                      }}
                    >
                      <span className="text-sm font-medium" style={{ color: t.muted }}>
                        {method === "paypal"
                          ? "You will be redirected to PayPal"
                          : "Continue with Apple Pay"}
                      </span>
                    </div>
                  )}

                  <div className="space-y-2 pt-1" style={{ borderTop: `1px solid ${t.border}` }}>
                    {[
                      { l: `${qty}× ${tierLabel}`, v: `£${subtotal}` },
                      { l: "Booking fee", v: `£${fee.toFixed(2)}` },
                    ].map((row) => (
                      <div
                        key={row.l}
                        className="flex justify-between text-sm"
                        style={{ ...mono, color: t.muted }}
                      >
                        <span>{row.l}</span>
                        <span>{row.v}</span>
                      </div>
                    ))}
                    <div
                      className="flex justify-between font-bold text-base pt-1"
                      style={{
                        ...display,
                        color: t.txt,
                        borderTop: `1px solid ${t.border}`,
                      }}
                    >
                      <span>Total</span>
                      <span style={{ color: accentColor }}>£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}

              <button
                type="button"
                onClick={handlePay}
                className="w-full py-4 font-bold text-base transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{
                  ...display,
                  backgroundColor: accentColor,
                  color: "#fff",
                  borderRadius: 14,
                  boxShadow: `0 6px 20px ${accentColor}55`,
                }}
              >
                {isFree ? "Reserve Ticket — Free" : `Pay £${total.toFixed(2)} Now`}
                <ChevronRight size={16} />
              </button>

              <div
                className="flex items-center justify-center gap-4 text-xs"
                style={{ ...mono, color: t.faint }}
              >
                {["SSL Secure", "No hidden fees", "E-ticket by email"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {step === "processing" && (
          <div className="p-10 flex flex-col items-center justify-center gap-6 min-h-[320px]">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full animate-spin" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke={t.border}
                  strokeWidth="4"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="4"
                  strokeDasharray="175"
                  strokeDashoffset={175 - (175 * progWidth) / 100}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.15s ease" }}
                />
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center font-bold text-sm"
                style={{ ...mono, color: accentColor }}
              >
                {Math.round(progWidth)}%
              </div>
            </div>
            <div className="text-center space-y-1.5">
              <div className="text-xl font-black" style={{ ...display, color: t.txt }}>
                Processing Payment
              </div>
              <div className="text-sm" style={{ ...mono, color: t.muted }}>
                {progWidth < 35
                  ? "Verifying card details…"
                  : progWidth < 65
                    ? "Contacting bank…"
                    : progWidth < 90
                      ? "Confirming booking…"
                      : "Generating your ticket…"}
              </div>
            </div>
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: t.border }}
            >
              <div
                className="h-full rounded-full transition-all duration-150"
                style={{ width: `${progWidth}%`, backgroundColor: accentColor }}
              />
            </div>
          </div>
        )}

        {step === "ticket" && (
          <div>
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: `1px solid ${t.border}` }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#10b981" }}
                >
                  <Check size={14} color="#fff" />
                </span>
                <div>
                  <div className="text-base font-black" style={{ ...display, color: t.txt }}>
                    Payment Confirmed!
                  </div>
                  <div className="text-xs" style={{ ...mono, color: t.muted }}>
                    Your ticket is ready
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:opacity-70"
                style={{
                  backgroundColor: t.card2,
                  border: `1.5px solid ${t.border}`,
                  color: t.muted,
                }}
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-6">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: `1.5px solid ${t.border}`,
                  boxShadow: `0 8px 32px ${accentColor}30`,
                }}
              >
                <div
                  className="px-6 py-5 flex items-start justify-between gap-3"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
                  }}
                >
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1"
                      style={mono}
                    >
                      GATE · Official Ticket
                    </div>
                    <div className="text-2xl font-black text-white leading-tight" style={display}>
                      {name}
                    </div>
                    <div className="text-sm text-white/75 mt-1 font-medium">{venue}</div>
                  </div>
                  <Ticket size={32} className="text-white/40 shrink-0 mt-1" />
                </div>

                <div className="relative h-0" style={{ borderTop: `2px dashed ${t.border}` }}>
                  {[-10, 10].map((side) => (
                    <div
                      key={side}
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                      style={{
                        [side < 0 ? "left" : "right"]: side,
                        backgroundColor: dark ? "#080808" : "#f4f3ef",
                        border: `1.5px solid ${t.border}`,
                      }}
                    />
                  ))}
                </div>

                <div className="px-6 py-5" style={{ backgroundColor: t.card }}>
                  <div className="flex gap-5 items-start">
                    <div
                      className="shrink-0 p-2.5 rounded-xl"
                      style={{ backgroundColor: "#fff", border: `1.5px solid ${t.border}` }}
                    >
                      <QRCode value={bookingRef} size={110} fg="#0a0a0a" bg="#ffffff" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      {[
                        { l: "Booking Ref", v: bookingRef.replace("GATE-", ""), isMono: true },
                        { l: "Ticket Type", v: `${tierName} · ${tierLabel}`, isMono: false },
                        {
                          l: "Quantity",
                          v: `${qty} ticket${qty > 1 ? "s" : ""}`,
                          isMono: false,
                        },
                        { l: "Date", v: date, isMono: false },
                        { l: "Issued", v: issuedAt, isMono: true },
                      ].map(({ l, v, isMono }) => (
                        <div key={l}>
                          <div
                            className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-0.5"
                            style={{ ...mono, color: t.faint }}
                          >
                            {l}
                          </div>
                          <div
                            className="text-[12px] font-bold leading-tight break-all"
                            style={{ ...(isMono ? mono : display), color: t.txt }}
                          >
                            {v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${t.border}` }}>
                    <div className="flex justify-between items-center">
                      <div
                        className="text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ ...mono, color: t.faint }}
                      >
                        {isFree ? "FREE ENTRY" : `£${total.toFixed(2)} PAID`}
                      </div>
                      <div
                        className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          ...mono,
                          color: accentColor,
                          backgroundColor: `${accentColor}18`,
                        }}
                      >
                        VALID
                      </div>
                    </div>
                    <div
                      className="mt-3 flex gap-px h-8 items-end overflow-hidden rounded"
                      style={{ opacity: 0.45 }}
                    >
                      {Array.from({ length: 60 }, (_, i) => {
                        const h = bookingRef.charCodeAt(i % bookingRef.length);

                        return (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: `${40 + ((h * (i + 1)) % 60)}%`,
                              backgroundColor: accentColor,
                              minWidth: 2,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-75"
                  style={{
                    ...display,
                    backgroundColor: `${accentColor}18`,
                    color: accentColor,
                    border: `1.5px solid ${accentColor}40`,
                    borderRadius: 12,
                  }}
                >
                  <Share2 size={14} /> Share
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{
                    ...display,
                    backgroundColor: accentColor,
                    color: "#fff",
                    borderRadius: 12,
                  }}
                >
                  <Check size={14} /> Done
                </button>
              </div>

              <p className="text-center text-xs mt-4" style={{ ...mono, color: t.faint }}>
                This ticket has been sent to your email address
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
