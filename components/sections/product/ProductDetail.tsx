"use client";

import { useState } from "react";
import Link from "next/link";
import { getProduct, getCollection, PRODUCTS, kindForCollection } from "@/lib/data";
import { img } from "@/lib/images";
import { useStore } from "@/lib/store";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowRightIcon, MinusIcon, PlusIcon, CheckIcon } from "@/components/ui/Icons";
import type { Product } from "@/lib/types";

function Crumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px] flex-wrap">
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

function ScentPyramid({ product }: { product: Product }) {
  const bands = [
    { name: "TOP", color: "#4A5D3F", w: 70 },
    { name: "HEART", color: "#1A1A17", w: 130 },
    { name: "BASE", color: "#1A1A17", w: 200 },
  ];
  return (
    <svg viewBox="0 0 220 240" className="w-[220px] h-[240px] max-[880px]:w-[160px] max-[880px]:h-[170px]">
      <path d="M110 12 L210 228 L10 228 Z" stroke="#d9d2c4" strokeWidth="0.6" fill="none" />
      {bands.map((b, i) => {
        const y = 50 + i * 64;
        const cx = 110;
        const x1 = cx - b.w / 2;
        const x2 = cx + b.w / 2;
        return (
          <g key={b.name}>
            <text
              x={cx}
              y={y - 8}
              fontFamily="var(--font-jetbrains), monospace"
              fontSize="9"
              letterSpacing="2"
              textAnchor="middle"
              fill="#8a857a"
            >
              {b.name}
            </text>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke={b.color} strokeWidth="1.4" />
            <circle cx={x1} cy={y} r="2.4" fill={b.color} />
            <circle cx={x2} cy={y} r="2.4" fill={b.color} />
          </g>
        );
      })}
      <circle cx="110" cy="12" r="2" fill="#1A1A17" />
      <text
        x="110"
        y="238"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="8"
        letterSpacing="2"
        textAnchor="middle"
        fill="#8a857a"
      >
        OLFACTIVE PYRAMID
      </text>
    </svg>
  );
}

function Bars({ value }: { value: number }) {
  return (
    <div className="flex gap-1 flex-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`flex-1 h-1 rounded-[1px] block ${i < value ? "bg-ink" : "bg-line"}`}
        />
      ))}
    </div>
  );
}

export function ProductDetail({ id }: { id: string }) {
  const product = getProduct(id);
  const add = useStore((s) => s.add);
  const openCart = useStore((s) => s.openCart);
  const [size, setSize] = useState(1);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [thumb, setThumb] = useState(0);

  if (!product) {
    return (
      <main className="page-enter w-full max-w-[1440px] mx-auto px-10 py-[120px]">
        <div className="font-serif font-light text-[64px]">Fragrance not found.</div>
        <Link href="/collections" className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center mt-6 group">
          Back to fragrances <span className="group-hover:translate-x-1 transition-transform duration-[240ms]"><ArrowRightIcon /></span>
        </Link>
      </main>
    );
  }

  const collection = getCollection(product.collection)!;
  const kind = kindForCollection(product.collection);
  const others = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const sizes = [
    { vol: "10ml", pr: 45, sub: "Travel" },
    { vol: "50ml", pr: product.price, sub: "Signature" },
    { vol: "100ml", pr: Math.round(product.price * 1.7), sub: "Maison" },
  ];

  const thumbLabels = [
    `bottle · ${product.id}`,
    `on skin · ${product.id}`,
    `ingredient · ${product.id}`,
    `packaging · ${product.id}`,
  ];

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 240);
    setTimeout(() => setAdded(false), 1840);
  };

  return (
    <main className="page-enter">
      <Crumbs items={[
        { label: "Maison", href: "/" },
        { label: "Collections", href: "/collections" },
        { label: collection.name, href: `/collections/${collection.id}` },
        { label: product.name },
      ]} />

      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
        {/* PDP grid */}
        <div
          className="grid gap-20 pt-[30px] pb-20 items-start max-[880px]:grid-cols-1 max-[880px]:gap-9 max-[880px]:pt-5 max-[880px]:pb-10"
          style={{ gridTemplateColumns: "1.15fr 1fr" }}
        >
          {/* Left — Art */}
          <div className="sticky top-[100px] max-[880px]:static">
            <Placeholder
              src={img(thumb === 0 ? `product/${product.id}/main` : `product/${product.id}/${thumb}`)}
              alt={product.name}
              kind={kind}
              ratio="4/5"
              label={thumbLabels[thumb]}
              code={`N° ${product.no} · ${thumb + 1}/4`}
            />
            {/* Thumbnail strip */}
            <div className="grid grid-cols-4 gap-[10px] mt-[10px]">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setThumb(i)}
                  className="cursor-pointer"
                  aria-label={`View ${thumbLabels[i]}`}
                >
                  <Placeholder
                    src={img(i === 0 ? `product/${product.id}/main` : `product/${product.id}/${i}`)}
                    alt={product.name}
                    kind={kind}
                    ratio="1"
                    className={thumb === i ? "outline outline-1 outline-ink outline-offset-2" : ""}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Info */}
          <div className="pt-2">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
              <Link href={`/collections/${collection.id}`} className="hover:text-ink transition-colors">
                Series {collection.no} · {collection.name}
              </Link>
              <span className="mx-[10px]">·</span>
              <span>N° {product.no}</span>
            </div>

            <h1
              className="font-serif font-light leading-[0.95] mt-4 mb-[14px]"
              style={{ fontSize: "clamp(64px, 8vw, 128px)" }}
            >
              {product.name}
            </h1>
            <p className="font-serif italic text-[26px] text-ink-2 m-0 mb-7 max-w-[24ch]">
              {product.tagline}
            </p>

            {/* Meta strip */}
            <div className="flex gap-6 flex-wrap font-mono text-[11px] tracking-[0.16em] uppercase text-ink-2 py-[14px] border-t border-line-soft border-b mb-7">
              <span className="flex gap-2 items-center">
                <b className="font-medium text-ink">Family</b> · {product.family}
              </span>
              <span className="flex gap-2 items-center">
                <b className="font-medium text-ink">Perfumer</b> · {product.perfumer}
              </span>
              <span className="flex gap-2 items-center">
                <b className="font-medium text-ink">Concentration</b> · EdP 20%
              </span>
            </div>

            <p className="text-[16px] leading-[1.7] text-ink-2 max-w-[52ch]">{product.description}</p>

            {/* Size picker */}
            <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted mt-8 mb-[10px]">Format</div>
            <div className="flex gap-2 mb-6">
              {sizes.map((s, i) => (
                <button
                  key={s.vol}
                  onClick={() => setSize(i)}
                  className={`flex-1 px-4 py-[14px] border rounded-[4px] text-left cursor-pointer transition-all duration-[200ms] ${i === size ? "border-ink bg-paper" : "border-line hover:border-ink"}`}
                >
                  <span className="font-serif text-[22px] leading-none block">{s.vol}</span>
                  <span className="font-mono text-[11px] tracking-[0.1em] text-muted mt-[6px] block">
                    {s.sub} · €{s.pr}
                  </span>
                </button>
              ))}
            </div>

            {/* Add row */}
            <div className="grid gap-[10px] mb-2" style={{ gridTemplateColumns: "1fr 2fr" }}>
              {/* Qty */}
              <div className="flex items-center justify-between border border-ink rounded-[4px] h-14 px-[10px] font-mono text-[11px] tracking-[0.1em]">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="py-0 px-[14px]" aria-label="Decrease">
                  <MinusIcon />
                </button>
                <span className="flex-1 text-center">{String(qty).padStart(2, "0")}</span>
                <button onClick={() => setQty((q) => q + 1)} className="py-0 px-[14px]" aria-label="Increase">
                  <PlusIcon />
                </button>
              </div>

              {/* Add button */}
              <button
                onClick={handleAdd}
                className={`h-14 rounded-[4px] border font-sans text-[13px] tracking-[0.08em] uppercase font-medium cursor-pointer transition-all duration-[240ms] flex items-center justify-center gap-[14px] ${
                  added
                    ? "bg-sage border-sage text-cream"
                    : "bg-ink border-ink text-cream hover:bg-sage-deep hover:border-sage-deep"
                }`}
              >
                {added ? (
                  <><CheckIcon /> Added to bag</>
                ) : (
                  <>Add to bag — €{sizes[size].pr * qty}</>
                )}
              </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 border-t border-line-soft border-b mt-6">
              {[
                { a: "Complimentary shipping", b: "over €120" },
                { a: "Free samples", b: "with every order" },
                { a: "Refillable", b: "at the maison" },
              ].map((perk) => (
                <div key={perk.a} className="px-4 py-[14px] font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted text-center border-r border-line-soft last:border-r-0">
                  {perk.a}<br />{perk.b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scent notes diagram */}
        <div className="py-20 pt-[80px] pb-[50px]">
          <div className="flex justify-between items-end mb-[50px] max-[880px]:flex-col max-[880px]:items-start max-[880px]:gap-[14px]">
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">The composition</div>
              <h2 className="font-serif font-light text-[56px] leading-[0.95] mt-2 max-[880px]:text-[36px]">
                Notes, <em className="italic">arranged.</em>
              </h2>
            </div>
            <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
              read top → base · open 15 min · skin scent 8 h
            </div>
          </div>

          <div className="grid gap-[60px] items-center max-[880px]:grid-cols-1 max-[880px]:gap-[30px]" style={{ gridTemplateColumns: "220px 1fr" }}>
            <div className="max-[880px]:mx-auto">
              <ScentPyramid product={product} />
            </div>
            <div className="grid gap-7">
              {(["top", "heart", "base"] as const).map((tier) => (
                <div
                  key={tier}
                  className="grid gap-[18px] items-baseline py-[18px] border-b border-line-soft"
                  style={{ gridTemplateColumns: "90px 1fr 1fr" }}
                >
                  <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted capitalize">{tier}</span>
                  <span className={`font-serif font-light text-[28px] leading-none ${tier === "top" ? "text-sage" : "text-ink"}`}>
                    {tier === "top" ? "Opening" : tier === "heart" ? "Composition" : "Dry-down"}
                  </span>
                  <div className="flex flex-wrap gap-x-[14px] gap-y-[6px] font-serif italic font-light text-[22px] text-ink-2">
                    {product.notes[tier].map((n, i) => (
                      <span key={n}>{n}{i < product.notes[tier].length - 1 ? " ·" : ""}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strength bars */}
          <div className="grid gap-4 pt-[30px] pb-[30px]">
            {[
              { label: "Intensity", value: product.intensity },
              { label: "Longevity", value: product.longevity },
              { label: "Sillage", value: product.sillage },
            ].map((row) => (
              <div key={row.label} className="grid items-center gap-[18px]" style={{ gridTemplateColumns: "110px 1fr 40px" }}>
                <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-muted">{row.label}</span>
                <Bars value={row.value} />
                <span className="font-mono text-[12px] text-ink-2 text-right">{row.value}/5</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to wear / Ingredients */}
        <div className="grid gap-[60px] py-[60px] border-t border-line-soft border-b max-[880px]:grid-cols-1 max-[880px]:gap-10" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">Composition</div>
            <h3 className="font-serif font-light text-[36px] leading-none mt-[10px] mb-4">How to wear</h3>
            <p className="text-ink-2 leading-[1.7] max-w-[44ch] text-[16px]">
              Spray once on the inner wrist and once at the base of the neck. The composition
              opens for fifteen minutes; rest the bottle for an hour between applications. Do
              not rub.
            </p>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">Provenance</div>
            <h3 className="font-serif font-light text-[36px] leading-none mt-[10px] mb-4">Ingredients & origin</h3>
            <ul className="list-none p-0 m-0 text-[13px] text-ink-2 leading-[1.8]" style={{ columns: 2, columnGap: 20 }}>
              {["Alcohol denat.", "Parfum", "Aqua", "Linalool*", "Limonene*", "Geraniol*", "Citronellol*", "Eugenol*", "Coumarin*", "Benzyl Salicylate*"].map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted mt-[14px]">
              * naturally occurring in essential oils
            </div>
          </div>
        </div>

        {/* You might also wear */}
        <div className="py-[60px] pb-10">
          <div className="flex justify-between items-end mb-10 max-[880px]:flex-col max-[880px]:items-start max-[880px]:gap-6">
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">Counterparts</div>
              <h2 className="font-serif font-light text-[48px] leading-[0.95] mt-2">You might also wear</h2>
            </div>
            <Link href={`/collections/${collection.id}`} className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group flex-shrink-0">
              See series <span className="group-hover:translate-x-1 transition-transform duration-[240ms]"><ArrowRightIcon /></span>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-x-8 gap-y-10 max-[880px]:grid-cols-2">
            {others.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="prod-card cursor-pointer block">
                <Placeholder
                  src={img(`product/${p.id}/main`)}
                  alt={p.name}
                  kind={kindForCollection(p.collection)}
                  ratio="4/5"
                  label={`bottle · ${p.id}`}
                  code={`N° ${p.no}`}
                />
                <div className="mt-5 grid gap-[6px]">
                  <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">N° {p.no} · {p.family}</div>
                  <div className="flex justify-between items-baseline border-b border-line-soft pb-[10px] mt-1">
                    <span className="font-serif font-light text-[28px] leading-[0.95]">{p.name}</span>
                    <span className="font-mono text-[13px] tracking-[0.06em] text-ink-2">€{p.price}</span>
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
