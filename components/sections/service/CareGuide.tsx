import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

// ─── Content ──────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    no: "01",
    hd: "Cool, and dark",
    bd: "Light and heat are what age a fragrance fastest, so the bathroom shelf, however handy, is the one place not to keep it: the steam and the sun through the window both work against you. A drawer, a cabinet, anywhere out of direct light, will keep a bottle honest for years.",
  },
  {
    no: "02",
    hd: "Twenty-four months, once opened",
    bd: "Unopened, a bottle waits patiently. Once it's opened and air reaches the liquid, it's at its best for around twenty-four months. Nothing dramatic happens after that: it simply softens, the way flowers do.",
  },
  {
    no: "03",
    hd: "Built for the road",
    bd: "The 10ml exists for exactly this: a coat pocket, a wash bag, a flight with a liquids limit. It's the same composition as the 50ml and 100ml, only smaller, and just as refillable when it runs dry.",
  },
  {
    no: "04",
    hd: "The refill ritual",
    bd: "Every bottle we make is refillable, at the maison in Helsinki or by post from wherever you are. It's slower than buying a new one, and that's rather the point.",
  },
];

// ─── Crumbs ───────────────────────────────────────────────────────────────────

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[12.5px] md:text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px]">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">Care guide</span>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function CareGuide() {
  return (
    <main className="page-enter">
      <Crumbs />

      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[40px] pb-16 max-[880px]:pb-10">
        <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2">How to keep it</div>
        <h1
          className="font-serif font-light leading-[0.92] mt-[14px] mb-6"
          style={{ fontSize: "clamp(56px,8vw,128px)" }}
        >
          Caring for your <em className="italic">bottle.</em>
        </h1>
        <p className="font-serif font-light text-[22px] text-ink-2 leading-[1.35] max-w-[560px]">
          A fragrance is a living thing, more or less. Kept well, it will
          outlast most of what&apos;s around it.
        </p>
      </section>

      {/* Editorial sections */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-20">
        <div className="border-t border-line">
          {SECTIONS.map((s) => (
            <div
              key={s.no}
              className="grid grid-cols-[120px_1fr_1.6fr] gap-10 py-[42px] border-b border-line-soft items-baseline max-[880px]:grid-cols-1 max-[880px]:gap-3 max-[880px]:py-8"
            >
              <div className="font-mono text-[14.5px] md:text-[13px] tracking-[0.14em] text-sage">N° {s.no}</div>
              <div className="font-serif font-light text-[30px] leading-[1.1] max-[880px]:text-[26px]">{s.hd}</div>
              <div className="text-ink-2 text-[16px] md:text-[15px] leading-[1.75] max-w-[54ch]">{s.bd}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Refill CTA */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-4 pb-0">
        <div className="p-[60px_50px] bg-ink text-cream grid grid-cols-[1.4fr_1fr] items-center gap-[60px] max-[880px]:grid-cols-1 max-[880px]:gap-8 max-[880px]:p-[40px_24px]">
          <div>
            <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-cream/60">Running low?</div>
            <h2 className="font-serif font-light text-[48px] leading-[0.95] mt-3 mb-3 text-cream max-[720px]:text-[36px]">
              Refill it, don&apos;t replace it.
            </h2>
            <p className="text-cream/80 max-w-[50ch] leading-[1.7]">
              At the maison or by post: see how the refill ritual works
              below.
            </p>
          </div>
          <div className="justify-self-end max-[880px]:justify-self-start">
            <Link
              href="/shipping-returns"
              className="inline-flex items-center justify-center h-[46px] px-[26px] bg-cream text-ink border border-cream hover:opacity-[0.84] font-sans text-[13.5px] md:text-[12px] tracking-[0.2em] uppercase font-medium rounded-full transition-opacity duration-[220ms] gap-[10px]"
            >
              Shipping &amp; returns
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
