import Link from "next/link";
import { COLLECTIONS, productsIn, kindForCollection } from "@/lib/data";
import { Placeholder } from "@/components/ui/Placeholder";
import { img } from "@/lib/images";

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

export function CollectionsIndex() {
  return (
    <main className="page-enter">
      <Crumbs items={[{ label: "Maison", href: "/" }, { label: "Collections" }]} />

      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[60px] pb-20">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
          Three series · Five compositions
        </div>
        <h1
          className="font-serif font-light leading-[0.95] mt-[14px]"
          style={{ fontSize: "clamp(72px, 10vw, 160px)" }}
        >
          The <em className="italic">collections.</em>
        </h1>
        <p className="font-serif italic font-light text-[24px] text-ink-2 mt-[18px] max-w-[540px]">
          Arranged by light, not by note family. Solaires for the bright hours;
          Nocturnes for after; Idylls for the rooms in between.
        </p>
      </section>

      {/* Index table */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-[120px]">
        <div className="border-t border-line">
          {COLLECTIONS.map((c) => {
            const kind = kindForCollection(c.id);
            const products = productsIn(c.id);
            return (
              <Link
                key={c.id}
                href={`/collections/${c.id}`}
                className="coll-row grid grid-cols-[90px_1.4fr_1fr_1fr_auto] gap-10 py-9 border-b border-line-soft cursor-pointer relative block max-[880px]:grid-cols-1 max-[880px]:gap-2 max-[880px]:py-6"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-muted">SER. {c.no}</span>
                <span className="font-serif text-[56px] font-light leading-none tracking-[-0.01em] max-[880px]:text-[40px]">
                  {c.name}
                </span>
                <span className="font-serif italic text-ink-2 text-[22px]">{c.tagline}</span>
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
                  {products.length} {products.length === 1 ? "fragrance" : "fragrances"}
                </span>
                <div className="grid gap-[6px] w-[156px] max-[880px]:hidden" style={{ gridTemplateColumns: "48px 48px 48px" }}>
                  {(() => {
                    const thumbs: { src: string | undefined; alt: string }[] = [];
                    for (const suffix of ["main", "1", "2", "3"] as const) {
                      for (const p of products) {
                        if (thumbs.length >= 3) break;
                        thumbs.push({ src: img(`product/${p.id}/${suffix}`), alt: p.name });
                      }
                      if (thumbs.length >= 3) break;
                    }
                    return thumbs.map((t, i) => (
                      <Placeholder key={i} src={t.src} alt={t.alt} kind={kind} ratio="1" />
                    ));
                  })()}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Editorial 3-up */}
        <div className="grid grid-cols-3 gap-8 mt-[100px] max-[880px]:hidden">
          {COLLECTIONS.map((c, i) => (
            <Link key={c.id} href={`/collections/${c.id}`} className="block">
              <Placeholder
                src={img(`collection-editorial/${c.id}`)}
                alt={`${c.name} editorial`}
                kind={kindForCollection(c.id)}
                ratio="3/4"
                label={`${c.name.toLowerCase()} editorial`}
                code={`PL ${String(i + 1).padStart(2, "0")}`}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
