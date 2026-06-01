"use client";

import { useState } from "react";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { CheckIcon } from "@/components/ui/Icons";

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
    <section className="py-[110px] max-[880px]:py-[70px]">
      <div className="w-full max-w-[1200px] mx-auto px-10 max-[720px]:px-5">
        <div
          className="grid grid-cols-[1fr_1fr] items-center gap-20 p-[80px_60px] border border-line-soft bg-paper max-[880px]:grid-cols-1 max-[880px]:gap-10 max-[880px]:p-[40px_24px]"
        >
          {/* Text */}
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
              N° DS — For the curious
            </div>
            <h2 className="font-serif font-light leading-[0.95] text-[56px] mt-3 mb-[18px] max-[880px]:text-[40px]">
              The Discovery Set
            </h2>
            <p className="font-serif font-light text-[24px] leading-[1.35] max-w-[460px] m-0">
              All five fragrances, in 2ml hand-decanted vials.
              Posted in a linen-wrapped box, with a letter from the perfumer.
            </p>
            <div className="flex gap-[14px] mt-7 items-center max-[880px]:flex-col max-[880px]:items-start max-[880px]:gap-[12px]">
              <button
                onClick={handleAdd}
                className={[
                  "inline-flex items-center justify-center gap-[10px] h-[46px] px-[22px]",
                  "font-sans text-[13px] tracking-[0.06em] uppercase font-medium rounded-full",
                  "border transition-all duration-[220ms]",
                  added
                    ? "bg-sage border-sage text-cream"
                    : "bg-gold text-ink border-gold hover:bg-gold-soft hover:border-gold-soft",
                ].join(" ")}
              >
                {added ? (
                  <><CheckIcon /> Added to bag</>
                ) : (
                  <>Add to bag — €38</>
                )}
              </button>
              <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
                Ships within 48 hours
              </span>
            </div>
          </div>

          {/* Art */}
          <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
            <Image
              src="/images/landing/5vials.jpeg"
              alt="Five hand-decanted fragrance vials"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 880px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
