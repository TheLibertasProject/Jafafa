import Image from "next/image";
import { img } from "@/lib/images";

const HERO_SRC = img("landing/hero");

export function Hero() {
  return (
    <section className="relative flex items-end min-h-[88vh] overflow-hidden">
      {/* Photography (placeholder for editorial hero) */}
      {HERO_SRC ? (
        <Image
          src={HERO_SRC}
          alt="Maison Jafafa — the garden, distilled"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 95% at 26% 16%, rgba(206,170,108,.40), transparent 55%), radial-gradient(120% 110% at 82% 88%, rgba(122,78,46,.34), transparent 60%), linear-gradient(158deg,#3a2c1d 0%,#241a11 58%,#130d08 100%)",
          }}
        />
      )}

      {/* Top-down darkening wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,8,4,.34) 0%, rgba(12,8,4,.04) 34%, rgba(12,8,4,.62) 100%)",
        }}
      />

      {/* Bottom-aligned, centered editorial content */}
      <div className="relative w-full max-w-[1240px] mx-auto px-[52px] pb-[9.5vh] flex flex-col items-center text-center max-[720px]:px-6">
        <div
          className="reveal font-sans font-medium text-[11px] uppercase mb-[30px] max-[720px]:text-[10px]"
          style={{ letterSpacing: "0.34em", color: "rgba(245,238,226,.82)" }}
        >
          Maison Jafafa · Olfactive Botanicals · Est. MMXIX
        </div>
        <h1
          className="reveal font-serif font-light m-0"
          style={{
            fontSize: "clamp(54px, 7.2vw, 108px)",
            lineHeight: 0.97,
            letterSpacing: "-0.012em",
            color: "#f5ede1",
            animationDelay: "0.12s",
          }}
        >
          The garden, distilled.
        </h1>
        <div
          className="reveal font-sans font-medium text-[12px] uppercase mt-[34px]"
          style={{
            letterSpacing: "0.52em",
            paddingLeft: "0.52em",
            color: "rgba(245,238,226,.72)",
            animationDelay: "0.28s",
          }}
        >
          Jafafa
        </div>
      </div>
    </section>
  );
}
