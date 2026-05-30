import Link from "next/link";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { img } from "@/lib/images";

export function EditorialSplit() {
  return (
    <section className="py-[110px] max-[880px]:py-[70px]">
      <div className="w-full max-w-[1200px] mx-auto px-10 max-[720px]:px-5">
        <div className="grid gap-[100px] items-center max-[880px]:grid-cols-1 max-[880px]:gap-10" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Art */}
          <div className="relative">
            <Placeholder
              src={img("landing/atelier")}
              alt="Atelier in Grasse, May"
              label="atelier · grasse, may"
              code="IMG_217"
              ratio="4 / 5"
            />
            <div className="flex justify-between mt-[14px] font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
              <span>Plate 02</span>
              <span>Grasse, 05.24</span>
            </div>
          </div>

          {/* Text */}
          <div className="grid gap-[22px] max-w-[480px] max-[880px]:max-w-none">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
              N° 02 — The Method
            </div>
            <h2 className="font-serif font-light text-[56px] leading-[0.95] mt-4 max-[880px]:text-[36px]">
              We compose the way a botanist{" "}
              <em className="italic">writes a letter</em>— slowly, and from life.
            </h2>
            <p className="text-[16px] leading-[1.7] text-ink-2 m-0 max-w-[44ch]">
              Each Jafafa fragrance begins in a notebook: pressed leaves, a date,
              weather. The bottles come later, sometimes by years. We work in editions
              of two thousand, and we are not in a hurry to make more.
            </p>
            <p className="text-[16px] leading-[1.7] text-ink-2 m-0 max-w-[44ch]">
              Sourcing is direct. Frankincense from a single cooperative in the
              Boswellia hills. Iris butter cured for three winters in a stone cellar
              outside Florence. Oud aged ten years before it is allowed near the bench.
            </p>
            <Link
              href="/about"
              className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group self-start"
            >
              The full story{" "}
              <span className="inline-block transition-transform duration-[240ms] group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
