import Link from "next/link";
import type { Product } from "@/lib/types";
import { PRODUCTS, kindForCollection } from "@/lib/data";
import { Placeholder } from "@/components/ui/Placeholder";
import { img } from "@/lib/images";

const CREDENTIALS = [
  "Bottled in Helsinki",
  "IFRA-Certified",
  "Vegan & Cruelty-Free",
  "Recyclable Packaging",
];

function GridCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.id}`} className="featured-card group block">
      <div className="featured-art overflow-hidden">
        <div className="featured-art-inner">
          <Placeholder
            src={img(`product/${p.id}/main`)}
            alt={p.name}
            kind={kindForCollection(p.collection)}
            label={`bottle · ${p.id}`}
            code={`N° ${p.no}`}
            ratio="4 / 5"
          />
        </div>
      </div>
      <div className="mt-5 font-sans font-medium text-[12.5px] md:text-[10.5px] uppercase tracking-[0.2em] text-label">
        N° {p.no} · {p.family}
      </div>
      <div className="flex justify-between items-baseline gap-4 mt-[14px] border-t border-line pt-[15px]">
        <span className="font-serif font-normal text-[28px] leading-none text-ink">{p.name}</span>
        <span className="font-sans text-[15.5px] md:text-[14px] tracking-[0.03em] text-ink-2 whitespace-nowrap">
          €{p.price}
        </span>
      </div>
      <div className="mt-[9px] font-sans font-medium text-[12px] md:text-[10px] uppercase tracking-[0.18em] text-muted">
        {p.volume.toUpperCase()} · Eau de Parfum
      </div>
    </Link>
  );
}

export function FeaturedFragrances() {
  const grid = PRODUCTS.slice(0, 4);
  const feature = PRODUCTS[4];

  return (
    <>
      {/* ── Intro · N° 01 ───────────────────────────────────────── */}
      <section className="max-w-[1240px] mx-auto px-[52px] pt-[132px] pb-[82px] max-[880px]:pt-[90px] max-[880px]:pb-[60px] max-[720px]:px-6">
        <div className="max-w-[760px] mx-auto flex flex-col items-center text-center">
          <div className="font-sans font-medium text-[13px] md:text-[11px] uppercase tracking-[0.26em] text-label mb-[26px]">
            N° 01 · The Five
          </div>
          <h2
            className="font-serif font-light text-ink m-0"
            style={{ fontSize: "clamp(36px, 4.4vw, 60px)", lineHeight: 1.04, letterSpacing: "-0.01em" }}
          >
            Compositions, in order of intensity.
          </h2>
          <p className="font-body text-[19px] leading-[1.6] text-ink-2 mt-[30px] max-w-[560px]">
            Five fragrances. Three collections. Composed slowly, from botanicals
            chosen for their patience.
          </p>
          <div className="flex items-center gap-[30px] mt-[42px] flex-wrap justify-center">
            <Link
              href="/collections"
              className="font-sans font-medium text-[13px] md:text-[11px] uppercase tracking-[0.2em] text-ink border border-ink rounded-full px-9 py-4 transition-colors duration-300 hover:bg-ink hover:text-cream"
            >
              Explore Fragrances
            </Link>
            <Link
              href="/about"
              className="font-sans font-medium text-[13px] md:text-[11px] uppercase tracking-[0.2em] text-ink border-b border-ink pb-[5px] inline-flex items-center gap-[10px] group"
            >
              The Maison
              <span className="text-[15.5px] md:text-[14px] transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Credentials row */}
        <div className="mt-[132px] max-[880px]:mt-[80px] border-t border-b border-line grid grid-cols-4 max-[640px]:grid-cols-2">
          {CREDENTIALS.map((c, i) => (
            <div
              key={c}
              className={[
                "py-[26px] px-2 text-center font-sans font-medium text-[12.5px] md:text-[10.5px] uppercase tracking-[0.2em] text-ink-2",
                i === 0 ? "" : "border-l border-line",
                i === 2 ? "max-[640px]:border-l-0 max-[640px]:border-t max-[640px]:border-line" : "",
                i === 3 ? "max-[640px]:border-t max-[640px]:border-line" : "",
              ].join(" ")}
            >
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* ── Product grid + feature ──────────────────────────────── */}
      <section className="max-w-[1240px] mx-auto px-[52px] pb-[132px] max-[880px]:pb-[90px] max-[720px]:px-6">
        <div className="grid grid-cols-2 gap-y-[72px] gap-x-[60px] max-[720px]:gap-x-6 max-[720px]:gap-y-[50px]">
          {grid.map((p) => (
            <GridCard key={p.id} p={p} />
          ))}
        </div>

        {/* Feature — the fifth fragrance */}
        <div className="grid grid-cols-2 gap-16 items-center mt-[72px] pt-[72px] border-t border-line max-[880px]:grid-cols-1 max-[880px]:gap-10 max-[880px]:mt-[60px] max-[880px]:pt-[60px]">
          <Link href={`/products/${feature.id}`} className="featured-card overflow-hidden block">
            <div className="featured-art-inner">
              <Placeholder
                src={img(`product/${feature.id}/main`)}
                alt={feature.name}
                kind={kindForCollection(feature.collection)}
                label={`bottle · ${feature.id}`}
                code={`N° ${feature.no}`}
                ratio="1 / 1"
              />
            </div>
          </Link>
          <div className="flex flex-col items-start">
            <div className="font-sans font-medium text-[12.5px] md:text-[10.5px] uppercase tracking-[0.2em] text-label">
              N° {feature.no} · {feature.family}
            </div>
            <h3
              className="font-serif font-light text-ink mt-[18px] mb-0"
              style={{ fontSize: "clamp(40px, 4.6vw, 58px)", lineHeight: 1 }}
            >
              {feature.name}
            </h3>
            <div className="mt-[18px] flex items-baseline gap-[18px]">
              <span className="font-sans text-[16px] tracking-[0.03em] text-ink-2">€{feature.price}</span>
              <span className="font-sans font-medium text-[12px] md:text-[10px] uppercase tracking-[0.18em] text-muted">
                {feature.volume.toUpperCase()}
              </span>
            </div>
            <Link
              href={`/products/${feature.id}`}
              className="mt-[34px] font-sans font-medium text-[13px] md:text-[11px] uppercase tracking-[0.2em] text-ink border-b border-ink pb-[5px] inline-flex items-center gap-[10px] group"
            >
              Discover
              <span className="text-[15.5px] md:text-[14px] transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
