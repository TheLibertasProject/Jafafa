"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PRODUCTS, COLLECTIONS } from "@/lib/data";
import { SearchIcon, CloseIcon } from "@/components/ui/Icons";
import type { Product, Collection } from "@/lib/types";

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[12.5px] md:text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px] flex-wrap">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">Search</span>
      </div>
    </div>
  );
}

function matchesProduct(p: Product, q: string): boolean {
  const haystack = [p.name, p.family, ...p.notes.top, ...p.notes.heart, ...p.notes.base]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

function matchesCollection(c: Collection, q: string): boolean {
  const haystack = [c.name, c.tagline, c.description].join(" ").toLowerCase();
  return haystack.includes(q);
}

const rowClass =
  "grid grid-cols-[64px_1fr_1fr_auto] gap-6 items-baseline py-5 px-2 -mx-2 rounded-[4px] border-b border-line-soft hover:bg-paper focus-visible:bg-paper transition-colors duration-[160ms] max-[720px]:grid-cols-[44px_1fr_auto] max-[720px]:gap-3";

function ProductRow({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.id}`} className={rowClass}>
      <span className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.14em] text-muted">N° {p.no}</span>
      <span className="font-serif font-light text-[26px] leading-none">{p.name}</span>
      <span className="font-mono text-[13px] md:text-[11px] tracking-[0.12em] uppercase text-ink-2 max-[720px]:hidden">
        {p.family}
      </span>
      <span className="font-mono text-[14.5px] md:text-[13px] tracking-[0.06em] text-ink-2">€{p.price}</span>
    </Link>
  );
}

function CollectionRow({ c }: { c: Collection }) {
  return (
    <Link href={`/collections/${c.id}`} className={rowClass}>
      <span className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.14em] text-muted">SER. {c.no}</span>
      <span className="font-serif font-light text-[26px] leading-none">{c.name}</span>
      <span className="font-serif italic text-[16px] text-ink-2 max-[720px]:hidden">{c.tagline}</span>
      <span className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.14em] uppercase text-muted">Series</span>
    </Link>
  );
}

export function Search() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const matchingProducts = useMemo(
    () => (q === "" ? [] : PRODUCTS.filter((p) => matchesProduct(p, q))),
    [q]
  );
  const matchingCollections = useMemo(
    () => (q === "" ? [] : COLLECTIONS.filter((c) => matchesCollection(c, q))),
    [q]
  );
  const hasResults = matchingProducts.length > 0 || matchingCollections.length > 0;
  const resultCount = matchingProducts.length + matchingCollections.length;

  return (
    <main className="page-enter">
      <Crumbs />

      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[40px] pb-8">
        <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2">
          Search · Five fragrances, three collections
        </div>
        <h1
          className="font-serif font-light leading-[0.95] mt-[14px] mb-4"
          style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
        >
          Find your <em className="italic">composition.</em>
        </h1>
        <p className="font-serif italic font-light text-[22px] text-ink-2 max-w-[520px] mb-12">
          By name, by family, or by note. Type a word, a mood, a single ingredient.
        </p>

        <label
          htmlFor="q"
          className="block font-mono text-[12px] md:text-[10px] tracking-[0.16em] uppercase text-muted mb-[10px]"
        >
          Search fragrances &amp; collections
        </label>
        <div className="flex items-center gap-4 border-b-2 border-line-soft focus-within:border-ink transition-colors duration-[200ms] pb-4 max-w-[720px]">
          <SearchIcon width={22} height={22} className="text-muted flex-shrink-0" />
          <input
            id="q"
            type="text"
            inputMode="search"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Iris, amber, oud…"
            className="flex-1 min-w-0 bg-transparent border-0 outline-none font-serif font-light text-[clamp(24px,4vw,40px)] text-ink placeholder:text-muted/50"
          />
          {query !== "" && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-muted hover:text-ink transition-colors duration-[160ms] flex-shrink-0"
            >
              <CloseIcon width={18} height={18} />
            </button>
          )}
        </div>
      </section>

      <section
        className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-[120px]"
        aria-live="polite"
      >
        {q === "" ? (
          <>
            <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-2 mt-6">
              The five
            </div>
            <div className="border-t border-line">
              {PRODUCTS.map((p) => (
                <ProductRow key={p.id} p={p} />
              ))}
            </div>
          </>
        ) : hasResults ? (
          <>
            <div className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.14em] uppercase text-muted mb-2 mt-6">
              {resultCount} {resultCount === 1 ? "result" : "results"}
            </div>
            {matchingProducts.length > 0 && (
              <>
                <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-2 mt-6">
                  Fragrances
                </div>
                <div className="border-t border-line">
                  {matchingProducts.map((p) => (
                    <ProductRow key={p.id} p={p} />
                  ))}
                </div>
              </>
            )}
            {matchingCollections.length > 0 && (
              <>
                <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-2 mt-10">
                  Collections
                </div>
                <div className="border-t border-line">
                  {matchingCollections.map((c) => (
                    <CollectionRow key={c.id} c={c} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="py-16 border border-dashed border-line rounded-[4px] text-center mt-6">
            <p className="font-serif italic text-[20px] text-muted m-0">
              Nothing by that name yet. Try a note: iris, amber, oud.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
