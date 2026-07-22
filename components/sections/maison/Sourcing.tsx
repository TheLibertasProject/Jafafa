import Link from "next/link";
import { Placeholder } from "@/components/ui/Placeholder";
import { img } from "@/lib/images";

const PARTNERS: { no: string; material: string; place: string; line: string }[] = [
  {
    no: "01",
    material: "Iris",
    place: "Tuscany",
    line: "Ten families in the hills above Florence, harvesting rhizomes that rest three years before distillation. We buy the whole crop.",
  },
  {
    no: "02",
    material: "Frankincense",
    place: "Dhofar, Oman",
    line: "The Dhofar Frankincense Cooperative, the same growers Laure and Mikael met in 2017. We still buy from the same trees.",
  },
  {
    no: "03",
    material: "Sandalwood",
    place: "Plantation-grown, Western Australia",
    line: "A single family plantation near Kununurra, replanting three trees for every one we use.",
  },
  {
    no: "04",
    material: "Oud",
    place: "Cultivated, Assam",
    line: "A growers' collective in the Brahmaputra valley, ageing wood the old way, without shortcuts.",
  },
  {
    no: "05",
    material: "Hay absolute",
    place: "Karelia",
    line: "Meadows Mikael has cut since boyhood, now shared with two neighbouring farms.",
  },
  {
    no: "06",
    material: "Damask rose",
    place: "Isparta",
    line: "A women-run cooperative in the rose valley, picked before sunrise as always.",
  },
];

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[12.5px] md:text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px]">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">Sourcing</span>
      </div>
    </div>
  );
}

export function Sourcing() {
  return (
    <main className="page-enter">
      <Crumbs />

      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[40px] pb-16">
        <div className="font-mono text-[13px] md:text-[11px] tracking-[0.18em] uppercase text-ink-2">Where the botanicals come from</div>
        <h1
          className="font-serif font-light leading-[0.94] mt-[14px] mb-6"
          style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
        >
          Every partner,<br />
          <em className="italic">named.</em>
        </h1>
        <p className="font-serif font-light text-[22px] text-ink-2 leading-[1.4] max-w-[560px]">
          From single cooperatives where possible. We visit annually, we pay
          above the syndicate rate, and we publish our partners every spring.
          This is the list as it stands.
        </p>
      </section>

      {/* Image */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-16">
        <Placeholder
          src={img("landing/atelier")}
          alt="A cooperative partner at work"
          ratio="21/9"
          className="max-[720px]:hidden"
        />
      </section>

      {/* Partner table */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-20">
        <div className="border-t border-line">
          {PARTNERS.map((p) => (
            <div
              key={p.no}
              className="grid grid-cols-[50px_1fr_1fr_2fr] gap-8 py-8 border-b border-line-soft items-baseline max-[880px]:grid-cols-1 max-[880px]:gap-[6px] max-[880px]:py-6"
            >
              <span className="font-mono text-[12px] md:text-[10px] tracking-[0.12em] text-muted/50 max-[880px]:hidden">{p.no}</span>
              <span className="font-serif font-light text-[26px] leading-none">{p.material}</span>
              <span className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.16em] uppercase text-muted">{p.place}</span>
              <span className="text-ink-2 text-[16px] md:text-[15px] leading-[1.6] max-w-[52ch]">{p.line}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing line */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-24">
        <p className="font-serif italic font-light text-[24px] text-ink-2 leading-[1.4] max-w-[560px]">
          Every composition is built around a living botanical: distilled,
          infused, or fractioned. No molecules pretending to be flowers.
        </p>
      </section>
    </main>
  );
}
