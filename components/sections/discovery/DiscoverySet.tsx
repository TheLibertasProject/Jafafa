"use client";

import { useState } from "react";
import Link from "next/link";
import { DISCOVERY_SET, PRODUCTS, kindForCollection } from "@/lib/data";
import { img } from "@/lib/images";
import { useStore } from "@/lib/store";
import { Placeholder } from "@/components/ui/Placeholder";
import { CheckIcon } from "@/components/ui/Icons";

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[12.5px] md:text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px] flex-wrap">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <Link href="/collections" className="hover:text-ink transition-colors">Collections</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">The Discovery Set</span>
      </div>
    </div>
  );
}

const STEPS = [
  {
    no: "01",
    label: "Wear",
    body: "Wear each of the five for a full day, in whichever order you like. Clean skin, no layering, no rush.",
  },
  {
    no: "02",
    label: "Live with it",
    body: "Notice which one you keep lifting your wrist to smell, days after the vial is empty. That is usually the answer.",
  },
  {
    no: "03",
    label: "Redeem",
    body: "Bring the set's card to the maison, or enter it at checkout, any time within a year. The €38 comes off any full bottle.",
  },
];

export function DiscoverySet() {
  const add = useStore((s) => s.add);
  const openCart = useStore((s) => s.openCart);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(DISCOVERY_SET.id, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 240);
    setTimeout(() => setAdded(false), 1840);
  };

  return (
    <main className="page-enter">
      <Crumbs />

      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
        <div className="grid grid-cols-[1.15fr_1fr] gap-20 pt-[30px] pb-20 items-start max-[880px]:grid-cols-1 max-[880px]:gap-9 max-[880px]:pt-5 max-[880px]:pb-10">
          {/* Left — image */}
          <div className="sticky top-[100px] max-[880px]:static">
            <Placeholder
              src={img("product/discovery-set/main")}
              alt="The Discovery Set: five 2ml vials in a small wooden box"
              kind={kindForCollection(DISCOVERY_SET.collection)}
              ratio="4/5"
              label="the discovery set"
              code={`N° ${DISCOVERY_SET.no}`}
            />
          </div>

          {/* Right — info */}
          <div className="pt-2">
            <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2">
              Discovery · Five compositions
            </div>

            <h1
              className="font-serif font-light leading-[0.95] mt-4 mb-6"
              style={{ fontSize: "clamp(56px, 7vw, 108px)" }}
            >
              All five, <em className="italic">in miniature.</em>
            </h1>

            <p className="text-[16px] leading-[1.7] text-ink-2 max-w-[52ch] mb-7">
              Five 2ml vials, one of each composition, arranged in a small wooden
              box. A quiet way to begin, before you commit to a bottle.
            </p>

            {/* Meta strip */}
            <div className="flex gap-6 flex-wrap font-mono text-[13px] md:text-[11px] tracking-[0.16em] uppercase text-ink-2 py-[14px] border-t border-line-soft border-b mb-7">
              <span className="flex gap-2 items-center">
                <b className="font-medium text-ink">Contents</b> · 5 × 2ml vials
              </span>
              <span className="flex gap-2 items-center">
                <b className="font-medium text-ink">Box</b> · Small, wooden, hand-packed
              </span>
              <span className="flex gap-2 items-center">
                <b className="font-medium text-ink">Perfumers</b> · L. Audemars &amp; M. Aaltonen
              </span>
            </div>

            {/* The quiet promise */}
            <div className="border border-line-soft rounded-[4px] px-6 py-5 mb-7 bg-paper">
              <div className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.14em] uppercase text-muted mb-2">
                The quiet promise
              </div>
              <p className="font-serif text-[19px] leading-[1.5] text-ink m-0">
                Within a year, the €38 comes back off any full bottle you choose.
              </p>
            </div>

            {/* Add row */}
            <button
              onClick={handleAdd}
              className={`w-full h-14 rounded-[4px] border font-sans text-[14.5px] md:text-[13px] tracking-[0.08em] uppercase font-medium cursor-pointer transition-all duration-[240ms] flex items-center justify-center gap-[14px] ${
                added
                  ? "bg-sage border-sage text-cream"
                  : "bg-ink border-ink text-cream hover:bg-sage-deep hover:border-sage-deep"
              }`}
            >
              {added ? (
                <>
                  <CheckIcon /> Added to bag
                </>
              ) : (
                <>Add to bag · €{DISCOVERY_SET.price}</>
              )}
            </button>

            {/* Perks */}
            <div className="grid grid-cols-3 border-t border-line-soft border-b mt-6">
              {[
                { a: "Complimentary shipping", b: "over €120" },
                { a: "Free samples", b: "with every order" },
                { a: "Redeemable", b: "within one year" },
              ].map((perk) => (
                <div
                  key={perk.a}
                  className="px-4 py-[14px] font-mono text-[12.5px] md:text-[10.5px] tracking-[0.14em] uppercase text-muted text-center border-r border-line-soft last:border-r-0"
                >
                  {perk.a}
                  <br />
                  {perk.b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="pt-[20px] pb-[20px] border-t border-line-soft">
          <div className="pt-[40px] pb-8">
            <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2">How it works</div>
            <h2 className="font-serif font-light text-[48px] leading-[0.95] mt-2 max-[880px]:text-[36px]">
              Three steps, <em className="italic">no rush.</em>
            </h2>
          </div>
          <div className="grid grid-cols-3 border-t border-line border-b max-[880px]:grid-cols-1">
            {STEPS.map((s, i) => (
              <div
                key={s.no}
                className={`px-[30px] py-10 border-r border-line-soft last:border-r-0 max-[880px]:border-r-0 ${
                  i > 0 ? "max-[880px]:border-t max-[880px]:border-line-soft" : ""
                }`}
              >
                <div className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.18em] uppercase text-muted">N° {s.no}</div>
                <div className="font-serif font-light text-[28px] mt-3 mb-2">{s.label}</div>
                <div className="text-[14.5px] md:text-[13px] text-ink-2 leading-[1.6]">{s.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The five */}
        <div className="py-[60px] pb-20">
          <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-8">The five</div>
          <div className="grid grid-cols-5 gap-6 max-[880px]:grid-cols-2 max-[520px]:grid-cols-1">
            {PRODUCTS.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="prod-card cursor-pointer block group">
                <Placeholder
                  src={img(`product/${p.id}/main`)}
                  alt={p.name}
                  kind={kindForCollection(p.collection)}
                  ratio="4/5"
                  label={`bottle · ${p.id}`}
                  code={`N° ${p.no}`}
                />
                <div className="mt-4 grid gap-1">
                  <div className="font-mono text-[12px] md:text-[10px] tracking-[0.12em] uppercase text-muted">N° {p.no}</div>
                  <div className="font-serif font-light text-[20px] leading-[1.05] group-hover:opacity-70 transition-opacity duration-[200ms]">
                    {p.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
