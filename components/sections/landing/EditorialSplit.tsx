import { Placeholder } from "@/components/ui/Placeholder";
import { img } from "@/lib/images";

export function EditorialSplit() {
  return (
    <section className="bg-cream-deep border-t border-b border-line">
      <div className="max-w-[1240px] mx-auto px-[52px] py-[132px] max-[880px]:py-[90px] max-[720px]:px-6">
        <div className="flex gap-20 items-center max-[880px]:flex-col max-[880px]:gap-12">
          {/* Image */}
          <div className="flex-1 min-w-0 w-full">
            <Placeholder
              src={img("landing/atelier")}
              alt="The atelier in Grasse"
              label="atelier · grasse, may"
              code="PLATE 02"
              ratio="4 / 5"
            />
            <div className="mt-4 font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-muted">
              Plate 02 · Grasse, 05.24
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="font-sans font-medium text-[11px] uppercase tracking-[0.26em] text-label mb-[26px]">
              N° 02 · The Method
            </div>
            <h2
              className="font-serif font-light text-ink m-0 mb-8"
              style={{ fontSize: "clamp(30px, 3.4vw, 46px)", lineHeight: 1.12, letterSpacing: "-0.005em" }}
            >
              We compose the way a botanist writes a letter: slowly, and from life.
            </h2>
            <p className="font-body text-[17.5px] leading-[1.72] text-ink-2 m-0 mb-5">
              Each Jafafa fragrance begins in a notebook: pressed leaves, a date,
              weather. The bottles come later, sometimes by years. We work in editions
              of two thousand, and we are not in a hurry to make more.
            </p>
            <p className="font-body text-[17.5px] leading-[1.72] text-ink-2 m-0">
              Sourcing is direct. Frankincense from a single cooperative in the
              Boswellia hills. Iris butter cured for three winters in a stone cellar
              outside Florence. Oud aged ten years before it is allowed near the bench.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
