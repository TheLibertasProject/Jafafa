import Link from "next/link";
import Image from "next/image";
import aboutPhoto from "@/public/images/about/about.jpeg";
import meetingPhoto from "@/public/images/about/meeting.jpeg";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowRightIcon } from "@/components/ui/Icons";

const TIMELINE = [
  { yr: "2017", hd: "The notebook", bd: "Laure and Mikael meet at a frankincense cooperative outside Salalah, Oman. They begin exchanging compositions by post." },
  { yr: "2019", hd: "Maison Jafafa", bd: "First atelier rented in Grasse. Three compositions, none yet bottled. The name is chosen for the way it feels to say it aloud." },
  { yr: "2021", hd: "Glory, first bottling", bd: "Two thousand bottles of N° 01. Sold in twelve weeks; the iris had been waiting three winters." },
  { yr: "2023", hd: "Solaires & Nocturnes", bd: "The first two series, four compositions in total. A small store opens in Helsinki, by appointment only." },
  { yr: "2025", hd: "Idylls", bd: "Fairy Garden released as a series-of-one. We promise we will not rush the next one." },
];

const VALUES = [
  { no: "N° 01", nm: "Botanical", dsc: "Every composition is built around a living botanical — distilled, infused, or fractioned. No molecules pretending to be flowers." },
  { no: "N° 02", nm: "Patient", dsc: "Some materials are aged three winters before they reach the bench. We make small editions and wait without apology." },
  { no: "N° 03", nm: "Sourced direct", dsc: "From single cooperatives where possible. We visit annually, we pay above the syndicate rate, and we publish our partners every spring." },
  { no: "N° 04", nm: "Refillable", dsc: "Every bottle is refillable at the maison or by post. Glass is heavy and we have made peace with that." },
];

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px]">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">About</span>
      </div>
    </div>
  );
}

export function About() {
  return (
    <main className="page-enter">
      <Crumbs />

      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[60px] pb-[120px] max-[880px]:pb-16">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">The Maison · est. MMXIX</div>
        <h1
          className="font-serif font-light leading-[0.9] mt-6 mb-6"
          style={{ fontSize: "clamp(72px, 12vw, 200px)" }}
        >
          A small house,{" "}
          <em className="italic">making slowly.</em>
        </h1>
        <p className="font-serif font-light text-[24px] leading-[1.35] max-w-[640px] mt-[30px]">
          Jafafa is a perfumery of two: a chemist who grew up in Grasse,
          and a botanist who grew up in Karelia. We make five fragrances. We
          intend to make ten, perhaps, by 2032.
        </p>
      </section>

      {/* Photo + prose */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
        <div
          className="grid grid-cols-[1fr_1fr] gap-20 py-10 max-[880px]:grid-cols-1 max-[880px]:gap-10"
        >
          <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
            <Image
              src={aboutPhoto}
              alt="Jafafa atelier"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 880px) 100vw, 50vw"
            />
          </div>
          <div className="about-prose text-[17px] leading-[1.8] text-ink-2 max-w-[52ch]">
            <p>
              Jafafa began as a notebook between two friends — pressed leaves,
              a date, weather. Compositions came later, sometimes by years.
              The first bottle of <em>Glory</em> was filled in a kitchen in Helsinki
              on a March afternoon; the iris had been waiting for three winters.
            </p>
            <p>
              We work in editions of two thousand. When a fragrance sells out, we
              wait — sometimes a season, sometimes a year — until the ingredients
              meet us again. Patience is the only material we have in abundance.
            </p>
            <p>
              We are based in two places. The benchwork happens in a small atelier
              in Grasse; the bottling, labelling and posting happens in a warehouse
              outside Helsinki, on a street the locals still call <em>the perfume road</em>,
              for no good reason.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
        <div className="grid grid-cols-4 border-t border-line border-b my-[60px] max-[880px]:grid-cols-2">
          {VALUES.map((v, i) => (
            <div
              key={v.no}
              className={`px-[30px] py-10 border-r border-line-soft last:border-r-0 ${i === 1 ? "max-[880px]:border-r-0" : ""}`}
            >
              <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted">{v.no}</div>
              <div className="font-serif font-light text-[28px] mt-3 mb-2">{v.nm}</div>
              <div className="text-[13px] text-ink-2 leading-[1.6]">{v.dsc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Perfumers */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
        <div
          className="grid grid-cols-[2fr_3fr] gap-[60px] py-20 items-center max-[880px]:grid-cols-1 max-[880px]:gap-[30px]"
        >
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">The perfumers</div>
            <h2
              className="font-serif font-light leading-[0.95] mt-4 mb-[18px]"
              style={{ fontSize: 64 }}
            >
              Laure Audemars
              <br />
              <em className="italic">& Mikael Aaltonen.</em>
            </h2>
            <p className="text-ink-2 leading-[1.7] max-w-[44ch] text-[16px]">
              Laure trained at the Givaudan school in Grasse before working five
              years for an indie house in Marseille. Mikael read botany at Helsinki
              and spent a decade as a forager and distiller in the Finnish lakelands.
            </p>
            <p className="text-ink-2 leading-[1.7] max-w-[44ch] mt-[14px] text-[16px]">
              They met in 2017 at a frankincense cooperative in Oman, both there
              for the same week, both buying small. Jafafa is what came of that
              week, eventually.
            </p>
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center mt-6 group"
            >
              The full biography{" "}
              <span className="inline-block transition-transform duration-[240ms] group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </Link>
          </div>
          <div>
            <div className="relative w-full" style={{ aspectRatio: "5 / 4" }}>
              <Image
                src={meetingPhoto}
                alt="Laure and Mikael at the Grasse atelier"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 880px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
        <div className="pt-[60px] pb-[60px] border-t border-line">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-6">Chronology</div>
          {TIMELINE.map((row) => (
            <div
              key={row.yr}
              className="grid grid-cols-[120px_1fr_1.6fr] gap-10 py-[30px] border-b border-line-soft items-baseline max-[880px]:grid-cols-[80px_1fr] max-[880px]:gap-5"
            >
              <div className="font-mono text-[13px] tracking-[0.14em] text-sage">{row.yr}</div>
              <div className="font-serif font-light text-[28px]">{row.hd}</div>
              <div className="text-ink-2 text-[14px] leading-[1.6] max-w-[50ch] max-[880px]:col-start-2">{row.bd}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Visit CTA */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-20 pb-0">
        <div
          className="p-[60px_50px] bg-ink text-cream grid grid-cols-[1.4fr_1fr] items-center gap-[60px] max-[880px]:grid-cols-1 max-[880px]:gap-8 max-[880px]:p-[40px_24px]"
        >
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-cream/60">Visit the maison</div>
            <h2 className="font-serif font-light text-[56px] leading-[0.95] mt-3 mb-3 text-cream">Helsinki · by appointment</h2>
            <p className="text-cream/80 max-w-[50ch] leading-[1.7]">
              Korkeavuorenkatu 22. Tuesday through Saturday, twelve to six.
              Bring an afternoon; we will make tea.
            </p>
          </div>
          <div className="justify-self-end max-[880px]:justify-self-start">
            <Link
              href="/book-visit"
              className="inline-flex items-center justify-center h-[46px] px-[22px] bg-gold text-ink border border-gold hover:bg-gold-soft hover:border-gold-soft font-sans text-[13px] tracking-[0.06em] uppercase font-medium rounded-full transition-all duration-[220ms]"
            >
              Book a visit →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
