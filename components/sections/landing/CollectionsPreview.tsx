import Link from "next/link";
import { COLLECTIONS, productsIn, kindForCollection } from "@/lib/data";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { img } from "@/lib/images";

export function CollectionsPreview() {
  return (
    <section className="py-[110px] max-[880px]:py-[70px]">
      <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
        {/* Head */}
        <div className="flex justify-between items-end gap-10 mb-14 max-[880px]:flex-col max-[880px]:items-start max-[880px]:gap-6 max-[880px]:mb-9">
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">N° 03 — Series</div>
            <h2 className="font-serif font-light text-[72px] leading-[0.95] mt-[14px] max-w-[14ch] max-[880px]:text-[44px]">
              Three collections,{" "}
              <em className="italic">arranged by light.</em>
            </h2>
          </div>
          <Link
            href="/collections"
            className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group flex-shrink-0"
          >
            View all{" "}
            <span className="inline-block transition-transform duration-[240ms] group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-8 max-[880px]:grid-cols-1 max-[880px]:gap-9">
          {COLLECTIONS.map((c) => {
            const kind = kindForCollection(c.id);
            const count = productsIn(c.id).length;
            return (
              <Link key={c.id} href={`/collections/${c.id}`} className="coll-card block cursor-pointer">
                <div className="coll-art overflow-hidden">
                  <div className="coll-art-inner">
                    <Placeholder
                      src={img(`collection-editorial/${c.id}`)}
                      alt={c.name}
                      kind={kind}
                      label={c.name.toLowerCase()}
                      code={`SER. ${c.no}`}
                      ratio="5 / 6"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-end pt-[18px] border-t border-line-soft mt-[18px]">
                  <div>
                    <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Series {c.no}</div>
                    <div className="font-serif font-light text-[32px] leading-[0.95] mt-1">{c.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
                      {count} {count === 1 ? "fragrance" : "fragrances"}
                    </div>
                    <div className="font-serif italic text-[18px] text-ink-2 mt-1">{c.tagline}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
