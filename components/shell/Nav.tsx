"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { SearchIcon, UserIcon, BagIcon, MenuIcon } from "@/components/ui/Icons";

const NAV_PRIMARY = [
  { label: "Shop", href: "/collections", match: (p: string) => p.startsWith("/collections") || p.startsWith("/products") },
  { label: "Collections", href: "/collections", match: (p: string) => p.startsWith("/collections") },
];
const NAV_SECONDARY = [
  { label: "Story", href: "/about", match: (p: string) => p === "/about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openCart, openMenu } = useStore();
  const count = useStore((s) => s.count());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-40 transition-all duration-[240ms] ease-out",
        scrolled
          ? "bg-cream/92 backdrop-blur-[10px] backdrop-saturate-[140%] border-b border-line-soft"
          : "bg-cream border-b border-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "grid items-center gap-6 transition-[padding] duration-[240ms] ease-out",
          "max-w-[1440px] mx-auto",
          scrolled ? "px-10 py-[14px]" : "px-10 py-[22px]",
          "[grid-template-columns:1fr_auto_1fr]",
          "max-[880px]:px-5 max-[880px]:py-[14px] max-[880px]:[grid-template-columns:auto_1fr_auto]",
        ].join(" ")}
      >
        {/* Desktop nav — left */}
        <nav className="hidden min-[880px]:flex items-center gap-8 font-mono text-[11px] tracking-[0.18em] uppercase">
          {[...NAV_PRIMARY, ...NAV_SECONDARY].map((item) => {
            const isActive = item.match ? item.match(pathname) : false;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={["nav-link relative py-1 cursor-pointer", isActive ? "active" : ""].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile — hamburger */}
        <div className="min-[880px]:hidden flex items-center gap-[14px]">
          <button
            aria-label="Menu"
            onClick={openMenu}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-black/[0.04]"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Brand / wordmark — center */}
        <Link
          href="/"
          className="font-serif font-normal text-[28px] tracking-[0.18em] text-center select-none max-[880px]:text-[22px] max-[880px]:tracking-[0.22em]"
        >
          JAFAFA
        </Link>

        {/* Right — icons */}
        <div className="flex items-center gap-2 justify-end">
          <button
            aria-label="Search"
            className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-black/[0.04]"
          >
            <SearchIcon />
          </button>
          <button
            aria-label="Account"
            className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-black/[0.04]"
          >
            <UserIcon />
          </button>
          <button
            aria-label="Cart"
            onClick={openCart}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-black/[0.04] relative"
          >
            <BagIcon />
            {count > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-sage text-paper font-mono text-[9px] font-medium inline-flex items-center justify-center tracking-[0.04em]">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
