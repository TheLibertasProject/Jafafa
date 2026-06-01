import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { kindForCollection } from "@/lib/data";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { img } from "@/lib/images";

const CARD_GRID: Array<{ col: string; mt?: string }> = [
  { col: "col-start-1 col-span-5" },
  { col: "col-start-7 col-span-4", mt: "mt-[60px]" },
  { col: "col-start-2 col-span-5" },
  { col: "col-start-8 col-span-4", mt: "-mt-[40px]" },
  { col: "col-start-5 col-span-5" },
];

export function FeaturedFragrances() {
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

        {/* Asymmetric grid — desktop */}
        <div className="hidden min-[880px]:grid grid-cols-12 gap-x-8 gap-y-14">
          {PRODUCTS.map((p, i) => {
            const pos = CARD_GRID[i] ?? { col: "col-span-4" };
            return (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className={`featured-card block cursor-pointer relative ${pos.col} ${pos.mt ?? ""}`}
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
                <div className="mt-5 grid gap-[6px]">
                  <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
                    N° {p.no} · {p.family}
                  </div>
                  <div className="flex justify-between items-baseline border-b border-line-soft pb-[10px] mt-1">
                    <span className="font-serif font-light text-[32px] leading-[0.95]">{p.name}</span>
                    <span className="font-mono text-[13px] tracking-[0.06em] text-ink-2">€{p.price}</span>
                  </div>
                  <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
                    {p.volume} · Eau de Parfum
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile — 2 col grid */}
        <div className="min-[880px]:hidden grid grid-cols-2 gap-x-4 gap-y-10">
          {PRODUCTS.map((p, i) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className={`featured-card block cursor-pointer relative ${i === PRODUCTS.length - 1 && PRODUCTS.length % 2 !== 0 ? "col-span-2 justify-self-center w-[calc(50%-8px)]" : ""}`}
            >
              <div className="featured-art overflow-hidden">
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
              </div>
              <div className="mt-5 grid gap-[6px]">
                <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
                  N° {p.no} · {p.family}
                </div>
                <div className="flex justify-between items-baseline border-b border-line-soft pb-[10px] mt-1">
                  <span className="font-serif font-light text-[24px] leading-[0.95]">{p.name}</span>
                  <span className="font-mono text-[13px] tracking-[0.06em] text-ink-2">€{p.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
