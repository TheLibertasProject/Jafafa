import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

const STOCKISTS: { no: string; city: string; name: string; line: string }[] = [
  {
    no: "01",
    city: "Stockholm",
    name: "Norrmalm & Sand",
    line: "A two-room apothecary off Sveavägen, carrying eight independent houses and pouring good coffee.",
  },
  {
    no: "02",
    city: "Copenhagen",
    name: "Fru Lund",
    line: "A florist turned perfumery in Nørrebro, open Thursday to Saturday only.",
  },
  {
    no: "03",
    city: "Paris",
    name: "Le Comptoir Rare",
    line: "A glass-fronted room in the Marais, three doors from a bookbinder we're fond of.",
  },
  {
    no: "04",
    city: "London",
    name: "The Quiet Room",
    line: "An appointment-only fragrance library above a Marylebone tailor.",
  },
  {
    no: "05",
    city: "Berlin",
    name: "Duft & Papier",
    line: "A stationer and perfumery sharing one long counter in Prenzlauer Berg.",
  },
];

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[12.5px] md:text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px]">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">Stockists</span>
      </div>
    </div>
  );
}

export function Stockists() {
  return (
    <main className="page-enter">
      <Crumbs />

      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[40px] pb-16">
        <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2">Where to find us</div>
        <h1
          className="font-serif font-light leading-[0.94] mt-[14px] mb-6"
          style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
        >
          In few places,<br />
          <em className="italic">on purpose.</em>
        </h1>
        <p className="font-serif font-light text-[22px] text-ink-2 leading-[1.4] max-w-[520px]">
          We keep the circle small: the maison itself, and a short list of rooms
          we trust to hold a bottle the way we would.
        </p>
      </section>

      {/* The maison itself */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-16">
        <div className="border border-line rounded-[4px] bg-paper p-10 max-[720px]:p-6 grid grid-cols-[1.3fr_1fr] gap-10 items-center max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <div className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.2em] uppercase text-muted mb-3">
              The maison itself
            </div>
            <div className="font-serif font-light text-[32px] leading-[1.1] mb-5">Maison Jafafa</div>
            <div className="grid gap-[10px]">
              <div className="grid gap-1" style={{ gridTemplateColumns: "110px 1fr" }}>
                <span className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.14em] uppercase text-muted">Address</span>
                <span className="font-serif text-[17px] text-ink-2">Korkeavuorenkatu 22, Helsinki</span>
              </div>
              <div className="grid gap-1" style={{ gridTemplateColumns: "110px 1fr" }}>
                <span className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.14em] uppercase text-muted">Hours</span>
                <span className="font-serif text-[17px] text-ink-2">Tuesday – Saturday, 12:00 – 18:00</span>
              </div>
            </div>
          </div>
          <div className="justify-self-start max-[880px]:justify-self-start">
            <Link
              href="/book-visit"
              className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group hover:text-ink transition-colors"
            >
              Book a visit
              <span className="group-hover:translate-x-1 transition-transform duration-[240ms]"><ArrowRightIcon /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stockist list */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-[100px]">
        <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-6">
          Selected by us, not by size
        </div>
        <div className="border-t border-line">
          {STOCKISTS.map((s) => (
            <div
              key={s.no}
              className="grid grid-cols-[50px_120px_1fr_2fr] gap-8 py-8 border-b border-line-soft items-baseline max-[880px]:grid-cols-1 max-[880px]:gap-[6px] max-[880px]:py-6"
            >
              <span className="font-mono text-[12px] md:text-[10px] tracking-[0.12em] text-muted/50 max-[880px]:hidden">{s.no}</span>
              <span className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.18em] uppercase text-muted">{s.city}</span>
              <span className="font-serif font-light text-[26px] leading-none">{s.name}</span>
              <span className="text-ink-2 text-[16px] md:text-[15px] leading-[1.6] max-w-[52ch]">{s.line}</span>
            </div>
          ))}
        </div>
        <p className="font-serif italic font-light text-ink-2 text-[17px] leading-[1.6] max-w-[520px] mt-10">
          New rooms join once a year, if at all. We would rather keep this list
          short and true than long and thin.
        </p>
      </section>
    </main>
  );
}
