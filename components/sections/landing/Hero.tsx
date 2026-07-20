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
          alt="Maison Jafafa: the garden, distilled"
          fill
          priority
          sizes="100vw"
          className="object-cover max-[720px]:object-[30%_center]"
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

      {/* Film grain: masks upscale softness on very wide screens (source art is 1024px) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "240px 240px",
        }}
      />

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
      </div>
    </section>
  );
}
