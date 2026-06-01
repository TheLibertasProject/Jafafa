"use client";

import Link from "next/link";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { img } from "@/lib/images";

const TICKER_ITEMS = [
  "Composed in Grasse",
  "Bottled in Helsinki",
  "IFRA-certified",
  "Vegan & cruelty-free",
  "Recyclable glass",
  "Small-batch",
  "Botanical sourcing",
];

export function Hero() {
  return (
    <section className="relative pb-20 max-[880px]:pb-[60px]">
      {/* Main grid */}
      <div
        className="grid gap-[60px] px-10 pt-[40px] items-end grid-cols-[1.05fr_1fr] min-h-[70vh] max-[880px]:grid-cols-1 max-[880px]:min-h-0 max-[720px]:px-5"
      >
        {/* Text col */}
        <div className="pb-[60px] pr-10 max-[880px]:pb-0 max-[880px]:pr-0 max-[880px]:order-2">
          <div className="reveal font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 flex gap-3 flex-wrap" style={{ animationDelay: "0.05s" }}>
            <span>Maison Jafafa</span>
            <span className="mx-3">·</span>
            <span>Olfactive Botanicals</span>
            <span className="mx-3">·</span>
            <span>est. MMXIX</span>
          </div>

          <h1
            className="reveal font-serif font-light mt-[26px] mb-8 leading-[0.92]"
            style={{
              fontSize: "clamp(72px, 11vw, 168px)",
              animationDelay: "0.18s",
            }}
          >
            <span className="block" style={{ animationDelay: "0.18s" }}>The garden,</span>
            <em className="block italic" style={{ animationDelay: "0.32s" }}>distilled.</em>
          </h1>

          <div className="reveal max-w-[460px]" style={{ animationDelay: "0.5s" }}>
            <p className="font-serif font-light text-[24px] leading-[1.35] tracking-[-0.005em] text-ink m-0">
              Five fragrances. Three collections. Composed slowly,
              from botanicals chosen for their patience.
            </p>
          </div>

          <div className="reveal flex gap-[22px] items-center mt-10 max-[880px]:flex-col max-[880px]:items-start max-[880px]:gap-[18px]" style={{ animationDelay: "0.65s" }}>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-[10px] h-[46px] px-[22px] bg-gold text-ink font-sans text-[13px] tracking-[0.06em] uppercase font-medium rounded-full hover:bg-gold-soft border border-gold hover:border-gold-soft transition-all duration-[220ms]"
            >
              Explore fragrances
            </Link>
            <Link
              href="/about"
              className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group"
            >
              The maison{" "}
              <span className="inline-block transition-transform duration-[240ms] group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </Link>
          </div>
        </div>

        {/* Art col */}
        <div
          className="relative overflow-hidden max-[880px]:order-1 h-[80vh] max-h-[760px] min-h-[480px] max-[880px]:h-[70vw] max-[880px]:max-h-none max-[880px]:min-h-0"
        >
          <div className="hero-drift">
            <Placeholder
              src={img("landing/hero")}
              alt="Jafafa hero"
              kind="dark"
              label="hero · 03 botanicals on linen"
              code="IMG_001"
              ratio="3 / 4"
              style={{ height: "100%", aspectRatio: "unset" }}
            />
          </div>
          <div className="absolute bottom-[-40px] left-0 flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-muted max-[880px]:bottom-[-28px]">
            <span>N° 002 — Composition</span>
            <span className="w-[5px] h-[5px] rounded-full bg-current opacity-40" />
            <span>Helsinki, 04:12</span>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="mt-[100px] border-t border-line-soft border-b overflow-hidden py-4 relative max-[880px]:mt-[70px]">
        <div className="ticker-track">
          {Array.from({ length: 3 }).flatMap((_, ti) =>
            TICKER_ITEMS.map((s, i) => (
              <span
                key={`${ti}-${i}`}
                className="inline-flex items-center gap-[18px] font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2"
              >
                <span className="w-1 h-1 rounded-full bg-sage" />
                {s}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
