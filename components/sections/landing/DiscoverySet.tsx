"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Placeholder } from "@/components/ui/Placeholder";
import { CheckIcon } from "@/components/ui/Icons";
import { img } from "@/lib/images";

export function DiscoverySet() {
  const add = useStore((s) => s.add);
  const openCart = useStore((s) => s.openCart);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add("discovery-set");
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 240);
    setTimeout(() => setAdded(false), 1840);
  };

  return (
    <section className="max-w-[880px] mx-auto px-[52px] py-[132px] max-[880px]:py-[90px] flex flex-col items-center text-center max-[720px]:px-6">
      <div className="w-full">
        <Placeholder
          src={img("product/discovery-set/main")}
          alt="The Discovery Set — five hand-decanted vials"
          label="discovery set"
          code="N° DS"
          ratio="16 / 10"
        />
      </div>

      <div className="font-sans font-medium text-[11px] uppercase tracking-[0.26em] text-label mt-11 mb-[22px]">
        N° DS — For the Curious
      </div>
      <h2
        className="font-serif font-light text-ink m-0"
        style={{ fontSize: "clamp(38px, 4.6vw, 58px)", lineHeight: 1 }}
      >
        The Discovery Set
      </h2>
      <p className="font-body text-[18px] leading-[1.65] text-ink-2 mt-[26px] max-w-[440px]">
        All five fragrances, in 2ml hand-decanted vials. Posted in a linen-wrapped
        box, with a letter from the perfumer.
      </p>

      <button
        onClick={handleAdd}
        className={[
          "mt-[38px] inline-flex items-center justify-center gap-[10px] rounded-full border font-sans font-medium text-[11px] uppercase tracking-[0.2em] px-[42px] py-[18px] transition-opacity duration-300",
          added
            ? "bg-sage border-sage text-cream"
            : "bg-ink border-ink text-cream hover:opacity-[0.84]",
        ].join(" ")}
      >
        {added ? (
          <>
            <CheckIcon /> Added to Bag
          </>
        ) : (
          <>Add to Bag — €38</>
        )}
      </button>
      <div className="mt-[22px] font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-muted">
        Ships Within 48 Hours
      </div>
    </section>
  );
}
