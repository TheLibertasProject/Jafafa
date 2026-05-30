"use client";

import { useState } from "react";
import Link from "next/link";
import { getCollection, productsIn, kindForCollection } from "@/lib/data";
import { img } from "@/lib/images";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/Icons";
import type { Product } from "@/lib/types";

function Crumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px]">
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-[10px]">
            {i > 0 && <span className="opacity-50">/</span>}
            {c.href ? (
              <Link href={c.href} className="hover:text-ink transition-colors">{c.label}</Link>
            ) : (
              <span className="text-ink">{c.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ p, kind }: { p: Product; kind: "default" | "dark" | "sage" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/products/${p.id}`}
      className="prod-card cursor-pointer relative block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="featured-art overflow-hidden relative">
        <div className="featured-art-inner">
          <Placeholder
            src={img(`product/${p.id}/main`)}
            alt={p.name}
            kind={kind}
            label={hovered ? `on skin · ${p.id}` : `bottle · ${p.id}`}
            code={`N° ${p.no}`}
            ratio="4 / 5"
          />
        </div>
        <div className="absolute inset-0 flex items-end justify-end p-[18px] opacity-0 hover:opacity-100 transition-opacity duration-[280ms] text-paper bg-gradient-to-b from-transparent via-transparent to-ink/50">
          <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase">View ↗</span>
        </div>
      </div>
      <div className="mt-5 grid gap-[6px]">
        <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">N° {p.no} · {p.family}</div>
        <div className="flex justify-between items-baseline border-b border-line-soft pb-[10px] mt-1">
          <span className="font-serif font-light text-[32px] leading-[0.95]">{p.name}</span>
          <span className="font-mono text-[13px] tracking-[0.06em] text-ink-2">€{p.price}</span>
        </div>
        <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">{p.volume} · Eau de Parfum</div>
      </div>
    </Link>
  );
}

export function CollectionDetail({ id }: { id: string }) {
  const collection = getCollection(id);
  const [filter, setFilter] = useState("all");

  if (!collection) {
    return (
      <main className="page-enter w-full max-w-[1440px] mx-auto px-10 py-[120px]">
        <div className="font-serif font-light text-[64px]">Collection not found.</div>
        <Link href="/collections" className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center mt-6 group">
          Back to collections <span className="group-hover:translate-x-1 transition-transform duration-[240ms]"><ArrowRightIcon /></span>
        </Link>
      </main>
    );
  }

  const products = productsIn(id);
  const kind = kindForCollection(id);
  const families = Array.from(new Set(products.map((p) => p.family)));
  const filtered = filter === "all" ? products : products.filter((p) => p.family === filter);

  const perfumerQuote =
    id === "solaires"
      ? `"We wanted these to wear like sunlight on linen — present, but never insisting. The whole series is meant to be reapplied without thought."`
      : id === "nocturnes"
      ? `"Nocturnes are the ones we wear for ourselves, late, with no audience. The oud took eleven years to find. The wait was the point."`
      : `"Idylls are pastorals — places we imagine more than visit. Fairy Garden is the smallest thing we make, and the one we are most fond of."`;

  return (
    <main className="page-enter">
      <Crumbs items={[
        { label: "Maison", href: "/" },
        { label: "Collections", href: "/collections" },
        { label: collection.name },
      ]} />

      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
        {/* Collection head */}
        <div
          className="grid gap-[60px] items-end pt-[50px] pb-20 max-[880px]:grid-cols-1 max-[880px]:gap-4 max-[880px]:pt-[30px] max-[880px]:pb-[50px]"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
              Series {collection.no} · {products.length} {products.length === 1 ? "fragrance" : "fragrances"}
            </div>
            <h1
              className="font-serif font-light leading-[0.92] mt-[14px] mb-6"
              style={{ fontSize: "clamp(72px, 10vw, 160px)" }}
            >
              {collection.name}
            </h1>
            <p className="font-serif italic font-light text-[22px] text-ink-2 max-w-[460px] m-0">
              {collection.description}
            </p>
          </div>
          <div>
            <Placeholder
              src={img(`collection-editorial/${id}`)}
              kind={kind}
              ratio="5/4"
              label={collection.name.toLowerCase()}
              code={`SER. ${collection.no}`}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center py-[18px] border-t border-line border-b mb-16 max-[880px]:flex-col max-[880px]:gap-4 max-[880px]:items-start">
          <div className="flex gap-2 items-center flex-wrap">
            <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted mr-2">Family</span>
            <button
              onClick={() => setFilter("all")}
              className={`font-mono text-[10.5px] tracking-[0.16em] uppercase px-[14px] py-2 border rounded-full cursor-pointer transition-all duration-[220ms] ${filter === "all" ? "bg-ink text-cream border-ink" : "border-line text-ink-2 hover:bg-ink hover:text-cream hover:border-ink"}`}
            >
              All
            </button>
            {families.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono text-[10.5px] tracking-[0.16em] uppercase px-[14px] py-2 border rounded-full cursor-pointer transition-all duration-[220ms] ${filter === f ? "bg-ink text-cream border-ink" : "border-line text-ink-2 hover:bg-ink hover:text-cream hover:border-ink"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted flex items-center gap-[10px]">
            Sort · <b className="text-ink font-medium">Intensity, ascending</b>
            <ChevronDownIcon />
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-16 max-[880px]:grid-cols-2 max-[880px]:gap-x-4 max-[880px]:gap-y-10">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} kind={kind} />
          ))}
        </div>

        {/* Perfumer note */}
        <div className="mt-[100px] py-[60px] border-t border-line-soft border-b grid gap-[60px] max-[880px]:grid-cols-1 max-[880px]:gap-6" style={{ gridTemplateColumns: "1fr 2fr" }}>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">From the perfumer</div>
          <div>
            <p className="font-serif font-light text-[24px] leading-[1.35] m-0 max-w-[600px]">
              {perfumerQuote}
            </p>
            <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted mt-6">
              — L. Audemars & M. Aaltonen
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
