import Link from "next/link";
import type { Product } from "@/lib/types";
import { PRODUCTS, kindForCollection } from "@/lib/data";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { img } from "@/lib/images";

function ProductCard({ p, nameClass }: { p: Product; nameClass: string }) {
  return (
    <Link
      href={`/products/${p.id}`}
      className="featured-card block cursor-pointer relative"
    >
      <div className="featured-art overflow-hidden relative">
        <div className="featured-art-inner">
          <Placeholder
            src={img(`product/${p.id}/main`)}
            alt={p.name}
            kind={kindForCollection(p.collection)}
            label={`bottle · ${p.id}`}
            code={`N° ${p.no}`}
            ratio="3 / 4"
          />
        </div>
        <div className="absolute inset-0 flex items-end justify-end p-[18px] opacity-0 hover:opacity-100 transition-opacity duration-[280ms] text-paper bg-gradient-to-b from-transparent via-transparent to-ink/50">
          <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase">View ↗</span>
        </div>
      </div>

      {/* Consistent metadata: label → thin rule → name + price → size */}
      <div className="mt-5">
        <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
          N° {p.no} · {p.family}
        </div>
        <div className="flex justify-between items-baseline gap-4 border-t border-line-soft mt-[14px] pt-[14px]">
          <span className={`font-serif font-light leading-[0.95] ${nameClass}`}>{p.name}</span>
          <span className="font-mono text-[13px] tracking-[0.06em] text-ink-2">€{p.price}</span>
        </div>
        <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted mt-[12px]">
          {p.volume} · Eau de Parfum
        </div>
      </div>
    </Link>
  );
}

export function FeaturedFragrances() {
  // Split into two equal columns; the right column carries one controlled offset.
  const left = PRODUCTS.filter((_, i) => i % 2 === 0);
  const right = PRODUCTS.filter((_, i) => i % 2 === 1);

  return (
    <section className="py-[110px] max-[880px]:py-[70px]">
      <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
        {/* Section head */}
        <div className="flex justify-between items-end gap-10 mb-14 max-[880px]:flex-col max-[880px]:items-start max-[880px]:gap-6 max-[880px]:mb-9">
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">N° 01 — The Five</div>
            <h2 className="font-serif font-light text-[72px] leading-[0.95] mt-[14px] max-w-[14ch] max-[880px]:text-[44px]">
              Compositions,{" "}
              <em className="italic">in order of intensity.</em>
            </h2>
          </div>
          <Link
            href="/collections"
            className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group flex-shrink-0"
          >
            All fragrances{" "}
            <span className="inline-block transition-transform duration-[240ms] group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>

        {/* Two equal columns — desktop. 80px gutter, single offset on the right column. */}
        <div className="hidden min-[880px]:grid grid-cols-2 gap-x-[80px] items-start">
          <div className="flex flex-col gap-y-[110px]">
            {left.map((p) => (
              <ProductCard key={p.id} p={p} nameClass="text-[32px]" />
            ))}
          </div>
          <div className="flex flex-col gap-y-[110px] mt-[120px]">
            {right.map((p) => (
              <ProductCard key={p.id} p={p} nameClass="text-[32px]" />
            ))}
          </div>
        </div>

        {/* Mobile — 2 col grid */}
        <div className="min-[880px]:hidden grid grid-cols-2 gap-x-4 gap-y-10">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              className={
                i === PRODUCTS.length - 1 && PRODUCTS.length % 2 !== 0
                  ? "col-span-2 justify-self-center w-[calc(50%-8px)]"
                  : ""
              }
            >
              <ProductCard p={p} nameClass="text-[24px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
