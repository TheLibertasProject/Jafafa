"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getProduct, kindForCollection } from "@/lib/data";
import { img } from "@/lib/images";
import { Placeholder, BottleMark } from "@/components/ui/Placeholder";
import {
  MinusIcon,
  PlusIcon,
  CloseIcon,
  CheckIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "@/components/ui/Icons";

function LockIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="1" y="5.5" width="9" height="7" rx="1" />
      <path d="M3 5.5V3.5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px] flex-wrap">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">Checkout</span>
      </div>
    </div>
  );
}

function SectionHead({ step, title }: { step: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-muted">{step}</span>
      <h2 className="font-serif font-light text-[28px] leading-none">{title}</h2>
    </div>
  );
}

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  mono?: boolean;
  maxLength?: number;
  children?: React.ReactNode;
}

function Field({
  label, id, type = "text", placeholder, required, autoComplete,
  value, onChange, className = "", mono = false, maxLength, children,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-[6px]">
        {label}{required && <span className="ml-[3px] text-ink-2">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          className={[
            "w-full border border-line bg-paper/70 px-[14px] h-[46px] text-[14px] text-ink rounded-[4px]",
            "focus:outline-none focus:border-ink transition-colors duration-[180ms] placeholder:text-muted/50",
            mono ? "font-mono tracking-[0.12em] placeholder:font-mono" : "font-sans",
          ].join(" ")}
        />
        {children}
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <main className="page-enter w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 py-[100px]">
      <div className="max-w-[480px]">
        <div className="mb-8 flex">
          <BottleMark width={80} opacity={0.16} />
        </div>
        <h1 className="font-serif font-light text-[56px] leading-[0.92] mb-6">
          Your bag<br /><em className="italic">is quiet.</em>
        </h1>
        <p className="text-[16px] leading-[1.7] text-ink-2 max-w-[38ch] mb-8">
          There are no items in your bag yet. Browse our collections to discover your next fragrance.
        </p>
        <Link
          href="/collections"
          className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group hover:text-ink transition-colors"
        >
          Begin browsing
          <span className="group-hover:translate-x-1 transition-transform duration-[240ms]"><ArrowRightIcon /></span>
        </Link>
      </div>
    </main>
  );
}

function Confirmed({ orderNo }: { orderNo: string }) {
  return (
    <main className="page-enter w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="min-h-[72vh] flex items-center">
        <div className="max-w-[560px]">
          <div className="w-10 h-10 rounded-full border border-sage flex items-center justify-center text-sage mb-10">
            <CheckIcon />
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
            Order {orderNo}
          </div>
          <h1 className="font-serif font-light leading-[0.92] mb-6" style={{ fontSize: "clamp(48px,6vw,88px)" }}>
            Thank you<br /><em className="italic">for your order.</em>
          </h1>
          <p className="text-[16px] leading-[1.7] text-ink-2 max-w-[44ch] mb-2">
            Your fragrances are being prepared with care. A confirmation has been sent to your email.
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted mb-12">
            Estimated delivery · 3–5 business days
          </p>
          <Link
            href="/collections"
            className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group hover:text-ink transition-colors"
          >
            Continue browsing
            <span className="group-hover:translate-x-1 transition-transform duration-[240ms]"><ArrowRightIcon /></span>
          </Link>
        </div>
      </div>
    </main>
  );
}

const COUNTRIES = [
  "Austria", "Belgium", "Denmark", "Finland", "France", "Germany",
  "Italy", "Netherlands", "Norway", "Portugal", "Spain", "Sweden",
  "Switzerland", "United Kingdom", "United States",
];

export function Checkout() {
  const items = useStore((s) => s.items);
  const setQty = useStore((s) => s.setQty);
  const remove = useStore((s) => s.remove);
  const subtotal = useStore((s) => s.subtotal());

  const [confirmed, setConfirmed] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderNo] = useState(`JF-${Math.floor(10000 + Math.random() * 90000)}`);

  const [form, setForm] = useState({
    firstName: "", lastName: "",
    address1: "", address2: "",
    city: "", postal: "", country: "France",
    email: "", phone: "",
    card: "", expiry: "", cvv: "", cardName: "",
  });

  const shipping = subtotal > 0 && subtotal >= 120 ? 0 : 12;
  const total = subtotal + shipping;

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handlePlace = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setConfirmed(true);
    }, 1400);
  };

  if (confirmed) return <Confirmed orderNo={orderNo} />;
  if (items.length === 0) return <EmptyCart />;

  return (
    <main className="page-enter">
      <Crumbs />

      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-28">

        {/* Page heading */}
        <div className="pt-[28px] pb-12 border-b border-line-soft">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-3">
            Jafafa · Olfactive Botanicals
          </div>
          <h1
            className="font-serif font-light leading-[0.92]"
            style={{ fontSize: "clamp(50px,7vw,104px)" }}
          >
            Complete your<br />
            <em className="italic">order.</em>
          </h1>
        </div>

        {/* Two-column layout */}
        <div
          className="grid gap-[80px] pt-14 items-start max-[880px]:grid-cols-1 max-[880px]:gap-12"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >

          {/* ── LEFT: Cart items ─────────────────────────────── */}
          <div className="sticky top-[100px] max-[880px]:static">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-7">
              Your selection · {items.reduce((s, i) => s + i.qty, 0)}{" "}
              {items.reduce((s, i) => s + i.qty, 0) === 1 ? "item" : "items"}
            </div>

            <div>
              {items.map((item) => {
                const p = getProduct(item.productId);
                if (!p) return null;
                const kind = kindForCollection(p.collection);
                return (
                  <div
                    key={item.productId}
                    className="grid gap-5 py-6 border-b border-line-soft last:border-0 items-start"
                    style={{ gridTemplateColumns: "88px 1fr" }}
                  >
                    <Placeholder
                      src={img(`product/${p.id}/main`)}
                      alt={p.name}
                      kind={kind}
                      ratio="4/5"
                    />
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
                        N° {p.no}
                      </div>
                      <div className="font-serif text-[24px] leading-none mt-[5px] mb-[6px]">
                        {p.name}
                      </div>
                      <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted mb-4">
                        {p.family} · {p.volume} · Eau de Parfum
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center border border-line rounded-full font-mono text-[11px] tracking-[0.1em]">
                          <button
                            className="py-[6px] px-[10px]"
                            onClick={() => setQty(p.id, item.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            <MinusIcon />
                          </button>
                          <span className="px-[10px]">
                            {String(item.qty).padStart(2, "0")}
                          </span>
                          <button
                            className="py-[6px] px-[10px]"
                            onClick={() => setQty(p.id, item.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            <PlusIcon />
                          </button>
                        </div>
                        <div className="flex items-center gap-[18px]">
                          <span className="font-mono text-[13px] tracking-[0.06em]">
                            €{p.price * item.qty}
                          </span>
                          <button
                            onClick={() => remove(p.id)}
                            aria-label={`Remove ${p.name}`}
                            className="text-muted hover:text-ink transition-colors duration-[180ms]"
                          >
                            <CloseIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7">
              <Link
                href="/collections"
                className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group text-muted hover:text-ink transition-colors"
              >
                Continue browsing
                <span className="group-hover:translate-x-1 transition-transform duration-[240ms]">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Form + summary ────────────────────────── */}
          <div className="grid gap-0">

            {/* — Delivery — */}
            <div className="border-t border-line-soft pt-8 pb-10">
              <SectionHead step="01" title="Delivery" />
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="First name" id="firstName" required
                    autoComplete="given-name"
                    value={form.firstName} onChange={set("firstName")}
                  />
                  <Field
                    label="Last name" id="lastName" required
                    autoComplete="family-name"
                    value={form.lastName} onChange={set("lastName")}
                  />
                </div>
                <Field
                  label="Address" id="address1" required
                  autoComplete="address-line1" placeholder="Street address"
                  value={form.address1} onChange={set("address1")}
                />
                <Field
                  label="Apartment, suite, etc." id="address2"
                  autoComplete="address-line2" placeholder="Optional"
                  value={form.address2} onChange={set("address2")}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="City" id="city" required
                    autoComplete="address-level2"
                    value={form.city} onChange={set("city")}
                  />
                  <Field
                    label="Postal code" id="postal" required
                    autoComplete="postal-code"
                    value={form.postal} onChange={set("postal")}
                  />
                </div>
                {/* Country select */}
                <div>
                  <label htmlFor="country" className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-[6px]">
                    Country <span className="ml-[3px] text-ink-2">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="country"
                      value={form.country}
                      onChange={(e) => set("country")(e.target.value)}
                      className="w-full border border-line bg-paper/70 px-[14px] h-[46px] font-sans text-[14px] text-ink rounded-[4px] focus:outline-none focus:border-ink transition-colors duration-[180ms] appearance-none cursor-pointer"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* — Contact — */}
            <div className="border-t border-line-soft pt-8 pb-10">
              <SectionHead step="02" title="Contact" />
              <div className="grid gap-3">
                <Field
                  label="Email" id="email" type="email" required
                  autoComplete="email" placeholder="your@email.com"
                  value={form.email} onChange={set("email")}
                />
                <Field
                  label="Phone" id="phone" type="tel"
                  autoComplete="tel" placeholder="+33 6 00 00 00 00"
                  value={form.phone} onChange={set("phone")}
                />
              </div>
            </div>

            {/* — Payment — */}
            <div className="border-t border-line-soft pt-8 pb-10">
              <SectionHead step="03" title="Payment" />
              <div className="grid gap-3">
                {/* Card number */}
                <Field
                  label="Card number" id="card" required
                  autoComplete="cc-number" placeholder="0000  0000  0000  0000"
                  mono maxLength={19}
                  value={form.card}
                  onChange={(v) => set("card")(v.replace(/[^\d ]/g, ""))}
                >
                  {/* Card brand marks */}
                  <div className="absolute right-[12px] top-1/2 -translate-y-1/2 flex items-center gap-[6px] pointer-events-none">
                    <svg width="34" height="22" viewBox="0 0 34 22" className="opacity-35">
                      <rect width="34" height="22" rx="3" fill="#1a1a17" fillOpacity="0.06" />
                      <text x="5" y="15" fontFamily="serif" fontSize="10" fill="#1a1a17" fontStyle="italic" fontWeight="700">VISA</text>
                    </svg>
                    <svg width="28" height="22" viewBox="0 0 28 22" className="opacity-28">
                      <circle cx="10" cy="11" r="9" fill="#8a857a" fillOpacity="0.5" />
                      <circle cx="18" cy="11" r="9" fill="#8a857a" fillOpacity="0.3" />
                    </svg>
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Expiry date" id="expiry"
                    autoComplete="cc-exp" placeholder="MM / YY"
                    mono maxLength={7}
                    value={form.expiry} onChange={set("expiry")}
                  />
                  <Field
                    label="Security code" id="cvv"
                    autoComplete="cc-csc" placeholder="CVV"
                    mono maxLength={4}
                    value={form.cvv} onChange={set("cvv")}
                  />
                </div>
                <Field
                  label="Name on card" id="cardName"
                  autoComplete="cc-name"
                  value={form.cardName} onChange={set("cardName")}
                />
              </div>

              <div className="flex items-center gap-[7px] mt-4 font-mono text-[10px] tracking-[0.12em] uppercase text-muted">
                <LockIcon />
                <span>256-bit SSL encryption · PCI DSS compliant</span>
              </div>
            </div>

            {/* — Order summary + CTA — */}
            <div className="border-t border-line pt-8">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-5">
                Order summary
              </div>

              {/* Line items */}
              <div className="grid gap-[10px] mb-5">
                {items.map((item) => {
                  const p = getProduct(item.productId);
                  if (!p) return null;
                  return (
                    <div key={item.productId} className="flex justify-between items-baseline gap-4">
                      <span className="font-serif text-[17px] text-ink-2 leading-none">
                        {p.name}
                        {item.qty > 1 && (
                          <span className="font-mono text-[10px] tracking-[0.1em] uppercase ml-[6px] text-muted">
                            × {item.qty}
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-[12px] tracking-[0.06em] shrink-0">
                        €{p.price * item.qty}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Cost breakdown */}
              <div className="border-t border-line-soft pt-4 grid gap-[8px]">
                <div className="flex justify-between items-baseline font-mono text-[11px] tracking-[0.14em] uppercase">
                  <span className="text-muted">Subtotal</span>
                  <span>€{subtotal}</span>
                </div>
                <div className="flex justify-between items-baseline font-mono text-[11px] tracking-[0.14em] uppercase">
                  <span className="text-muted">Shipping</span>
                  <span className={shipping === 0 ? "text-sage" : ""}>
                    {shipping === 0 ? "Complimentary" : `€${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between items-baseline font-mono text-[10px] tracking-[0.12em] uppercase text-muted/60">
                  <span>VAT</span>
                  <span>Included</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline border-t border-line mt-5 pt-5 mb-6">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
                  Total
                </span>
                <span className="font-serif text-[38px] leading-none">€{total}</span>
              </div>

              {/* Place order */}
              <button
                onClick={handlePlace}
                disabled={placing}
                className={[
                  "w-full h-[54px] rounded-[4px] border font-sans text-[13px] tracking-[0.1em] uppercase font-medium",
                  "cursor-pointer transition-all duration-[280ms] flex items-center justify-center gap-[12px]",
                  placing
                    ? "bg-sage border-sage text-cream cursor-default"
                    : "bg-ink border-ink text-cream hover:bg-sage-deep hover:border-sage-deep",
                ].join(" ")}
              >
                {placing ? (
                  <>
                    <span
                      className="w-[14px] h-[14px] rounded-full border border-cream/30 border-t-cream inline-block"
                      style={{ animation: "spin 0.7s linear infinite" }}
                    />
                    Preparing your order…
                  </>
                ) : (
                  <>Place order · €{total}</>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 font-mono text-[10px] tracking-[0.12em] uppercase text-muted">
                <LockIcon />
                <span>Secure checkout · Free returns within 14 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
