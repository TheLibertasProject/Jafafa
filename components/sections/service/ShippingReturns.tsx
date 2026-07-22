import Link from "next/link";

// ─── Content ──────────────────────────────────────────────────────────────────

const SHIPPING_ROWS = [
  { region: "Finland", time: "1–2 days", cost: "Free over €120, otherwise €6" },
  { region: "European Union", time: "3–5 days", cost: "€9" },
  { region: "UK & Switzerland", time: "5–7 days", cost: "€12" },
  { region: "Elsewhere", time: "By arrangement", cost: "Write to us" },
];

const REFILL_STEPS = [
  {
    no: "01",
    hd: "Write to us",
    bd: "Tell us which fragrance and which size at letters@maisonjafafa.com. We'll send you a note back with what to do next.",
  },
  {
    no: "02",
    hd: "Post the bottle",
    bd: "Send the empty bottle to Korkeavuorenkatu 22, Helsinki, in whatever packaging you have to hand.",
  },
  {
    no: "03",
    hd: "We refill it",
    bd: "At the bench, by hand, then posted back to you: good as new, and a little more travelled.",
  },
];

// ─── Crumbs ───────────────────────────────────────────────────────────────────

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[12.5px] md:text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px]">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">Shipping &amp; returns</span>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function ShippingReturns() {
  return (
    <main className="page-enter">
      <Crumbs />

      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[40px] pb-16 max-[880px]:pb-10">
        <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2">Shipping &amp; returns</div>
        <h1
          className="font-serif font-light leading-[0.92] mt-[14px] mb-6"
          style={{ fontSize: "clamp(56px,8vw,128px)" }}
        >
          Getting it to you,<br />
          and <em className="italic">back.</em>
        </h1>
        <p className="font-serif font-light text-[22px] text-ink-2 leading-[1.35] max-w-[560px]">
          Free samples travel with every order. Complimentary shipping over
          €120, wherever you are.
        </p>
      </section>

      {/* Shipping table */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-20 border-t border-line-soft">
        <div className="pt-14">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.2em] uppercase text-muted">01</span>
            <h2 className="font-serif font-light text-[28px] leading-none">Delivery</h2>
          </div>

          <div className="border-t border-line">
            <div className="grid grid-cols-[1.4fr_1fr_1.2fr] gap-10 py-4 border-b border-line-soft max-[600px]:hidden">
              <span className="font-mono text-[12px] md:text-[10px] tracking-[0.16em] uppercase text-muted">Region</span>
              <span className="font-mono text-[12px] md:text-[10px] tracking-[0.16em] uppercase text-muted">Time</span>
              <span className="font-mono text-[12px] md:text-[10px] tracking-[0.16em] uppercase text-muted">Cost</span>
            </div>
            {SHIPPING_ROWS.map((row) => (
              <div
                key={row.region}
                className="grid grid-cols-[1.4fr_1fr_1.2fr] gap-10 py-6 border-b border-line-soft items-baseline max-[600px]:grid-cols-1 max-[600px]:gap-1 max-[600px]:py-5"
              >
                <span className="font-serif text-[22px] font-light">{row.region}</span>
                <span className="text-ink-2 text-[16px] md:text-[15px]">{row.time}</span>
                <span className="text-ink-2 text-[16px] md:text-[15px]">{row.cost}</span>
              </div>
            ))}
          </div>

          <p className="text-[15.5px] md:text-[14px] leading-[1.7] text-ink-2 max-w-[52ch] mt-8">
            Every parcel arrives with complimentary samples, whatever
            you&apos;ve ordered. If you&apos;re writing from somewhere not
            listed here, we&apos;d still like to hear from you.
          </p>
        </div>
      </section>

      {/* Returns */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-20 border-t border-line-soft">
        <div className="pt-14">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.2em] uppercase text-muted">02</span>
            <h2 className="font-serif font-light text-[28px] leading-none">Returns</h2>
          </div>

          <div className="grid grid-cols-2 gap-16 max-[720px]:grid-cols-1 max-[720px]:gap-10">
            <div>
              <div className="font-serif italic text-[20px] text-ink mb-3">Unopened bottles</div>
              <p className="text-ink-2 text-[16px] md:text-[15px] leading-[1.7] max-w-[44ch]">
                Return an unopened bottle within thirty days of it reaching
                you, and we&apos;ll refund it in full.
              </p>
            </div>
            <div>
              <div className="font-serif italic text-[20px] text-ink mb-3">A fragrance you&apos;ve worn</div>
              <p className="text-ink-2 text-[16px] md:text-[15px] leading-[1.7] max-w-[44ch]">
                Once a fragrance has been worn, it can&apos;t come back to
                us. If something&apos;s genuinely wrong, write to us and
                we&apos;ll find a way to help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Refills */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-28 border-t border-line-soft">
        <div className="pt-14">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.2em] uppercase text-muted">03</span>
            <h2 className="font-serif font-light text-[28px] leading-none">Refills by post</h2>
          </div>
          <p className="text-ink-2 text-[16px] leading-[1.7] max-w-[54ch] mb-10">
            Every bottle we make is refillable, at the maison in person or by
            post, wherever you are.
          </p>

          <div className="grid grid-cols-3 border-t border-line border-b max-[720px]:grid-cols-1">
            {REFILL_STEPS.map((step) => (
              <div
                key={step.no}
                className="px-[30px] py-10 border-r border-line-soft last:border-r-0 max-[720px]:border-r-0 max-[720px]:border-b max-[720px]:last:border-b-0 max-[720px]:px-0"
              >
                <div className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.18em] uppercase text-muted">N° {step.no}</div>
                <div className="font-serif font-light text-[26px] mt-3 mb-2">{step.hd}</div>
                <div className="text-[15.5px] md:text-[14px] text-ink-2 leading-[1.6] max-w-[36ch]">{step.bd}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
