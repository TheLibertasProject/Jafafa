import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/lib/types";
import { COLLECTIONS, productsIn } from "@/lib/data";
import { img } from "@/lib/images";

function Band({ c }: { c: Collection }) {
  const src = img(`collection-editorial/${c.id}`);
  const count = productsIn(c.id).length;
  return (
    <Link href={`/collections/${c.id}`} className="block group">
      <div
        className="relative w-full overflow-hidden h-[48vh] min-h-[380px]"
        style={{ boxShadow: "inset 0 0 140px rgba(0,0,0,.30)" }}
      >
        {src ? (
          <Image
            src={src}
            alt={c.name}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: c.palette }} />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 140px rgba(0,0,0,.30)" }}
        />
      </div>
      <div className="max-w-[1240px] mx-auto px-[52px] py-6 flex justify-between items-end gap-6 border-b border-line max-[720px]:px-6">
        <div className="flex flex-col gap-[10px]">
          <span className="font-sans font-medium text-[10.5px] uppercase tracking-[0.2em] text-label">
            Series {c.no}
          </span>
          <span className="font-serif font-normal text-ink leading-none" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
            {c.name}
          </span>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <span className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-muted">
            {count} {count === 1 ? "Fragrance" : "Fragrances"}
          </span>
          <span className="font-body italic text-[19px] text-ink-2">{c.tagline}</span>
        </div>
      </div>
    </Link>
  );
}

export function CollectionsPreview() {
  return (
    <>
      <section className="max-w-[1240px] mx-auto px-[52px] pt-[132px] pb-[66px] max-[880px]:pt-[90px] max-[880px]:pb-[50px] max-[720px]:px-6">
        <div className="flex justify-between items-end gap-8 flex-wrap">
          <div>
            <div className="font-sans font-medium text-[11px] uppercase tracking-[0.26em] text-label mb-6">
              N° 03 · Series
            </div>
            <h2
              className="font-serif font-light text-ink m-0 max-w-[11ch]"
              style={{ fontSize: "clamp(36px, 4.4vw, 58px)", lineHeight: 1.02, letterSpacing: "-0.01em" }}
            >
              Three collections, arranged by light.
            </h2>
          </div>
          <Link
            href="/collections"
            className="font-sans font-medium text-[11px] uppercase tracking-[0.2em] text-ink border-b border-ink pb-[5px] inline-flex items-center gap-[10px] group"
          >
            View All
            <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {COLLECTIONS.map((c) => (
        <Band key={c.id} c={c} />
      ))}
    </>
  );
}
