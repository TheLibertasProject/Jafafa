import Link from "next/link";

const QUOTES: { no: string; quote: string; pub: string }[] = [
  {
    no: "01",
    quote:
      "Jafafa is what happens when two people refuse to hurry a flower. Glory smells like the wait was worth it.",
    pub: "Norrsken Parfum Annual · Nordic Edition",
  },
  {
    no: "02",
    quote:
      "In a category built on volume, Jafafa built on restraint instead: two thousand bottles, then silence until the next harvest allows more.",
    pub: "The Long Season · A Quarterly of Slow Luxury",
  },
  {
    no: "03",
    quote:
      "A small house with an unfashionable patience. Their frankincense alone is reason enough to visit Korkeavuorenkatu.",
    pub: "Cahier de Grasse",
  },
];

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px]">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">Press</span>
      </div>
    </div>
  );
}

export function Press() {
  return (
    <main className="page-enter">
      <Crumbs />

      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[40px] pb-16">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">In print</div>
        <h1
          className="font-serif font-light leading-[0.94] mt-[14px] mb-6"
          style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
        >
          A few kind<br />
          <em className="italic">words.</em>
        </h1>
        <p className="font-serif font-light text-[22px] text-ink-2 leading-[1.4] max-w-[520px]">
          We don&apos;t send fragrance to everyone who asks. These are three who
          wrote back.
        </p>
      </section>

      {/* Pull quotes */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-[100px] border-t border-line">
        {QUOTES.map((q) => (
          <div key={q.no} className="grid gap-6 py-16 border-b border-line-soft max-[880px]:py-12">
            <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-muted">N° {q.no}</span>
            <p
              className="font-serif italic font-light leading-[1.25] max-w-[880px]"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              &ldquo;{q.quote}&rdquo;
            </p>
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">{q.pub}</span>
          </div>
        ))}
      </section>

      {/* For writers */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-24">
        <div className="max-w-[560px]">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-4">For writers</div>
          <p className="font-serif font-light text-[20px] text-ink-2 leading-[1.5]">
            Press kits and samples are available on request. Write to us at{" "}
            <a
              href="mailto:press@maisonjafafa.com"
              className="border-b border-current text-ink hover:opacity-70 transition-opacity"
            >
              press@maisonjafafa.com
            </a>{" "}
            and tell us what you&apos;re working on.
          </p>
        </div>
      </section>
    </main>
  );
}
