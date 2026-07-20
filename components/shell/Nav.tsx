"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { SearchIcon, BagIcon } from "@/components/ui/Icons";

export function Nav() {
  const openCart = useStore((s) => s.openCart);
  const openMenu = useStore((s) => s.openMenu);
  const count = useStore((s) => s.count());

  return (
    <header
      className="sticky top-0 z-50 border-b border-line"
      style={{
        background: "color-mix(in srgb, var(--color-cream) 86%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-[52px] py-[17px] grid items-center [grid-template-columns:1fr_auto_1fr] max-[720px]:px-6">
        {/* Left — menu */}
        <div className="flex items-center gap-[14px] text-ink justify-self-start">
          <button
            onClick={openMenu}
            aria-label="Menu"
            className="flex flex-col gap-1 cursor-pointer py-1"
          >
            <span className="block w-[22px] h-px bg-current" />
            <span className="block w-[22px] h-px bg-current" />
          </button>
          <button
            onClick={openMenu}
            className="font-sans font-medium text-[10.5px] uppercase tracking-[0.26em] text-ink-2 max-[520px]:hidden cursor-pointer"
          >
            Menu
          </button>
        </div>

        {/* Center — wordmark */}
        <Link
          href="/"
          className="font-sans font-medium text-[19px] text-ink text-center select-none max-[520px]:text-[16px]"
          style={{ letterSpacing: "0.42em", paddingLeft: "0.42em" }}
        >
          JAFAFA
        </Link>

        {/* Right — utilities */}
        <div className="flex items-center justify-end gap-[22px] text-ink justify-self-end max-[520px]:gap-4">
          <Link href="/search" aria-label="Search" className="inline-flex">
            <SearchIcon width={17} height={17} />
          </Link>
          <button onClick={openCart} aria-label="Bag" className="relative inline-flex cursor-pointer">
            <BagIcon width={17} height={17} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-ink text-cream font-sans text-[9px] font-medium inline-flex items-center justify-center tracking-[0.02em]">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
