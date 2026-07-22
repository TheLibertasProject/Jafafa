"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { CloseIcon } from "@/components/ui/Icons";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS = [
  { label: "Collections", num: "01", href: "/collections" },
  { label: "About", num: "02", href: "/about" },
  { label: "Journal", num: "03", href: "/journal" },
  { label: "Stockists", num: "04", href: "/stockists" },
  { label: "Book a visit", num: "05", href: "/book-visit" },
];

export function MobileNav() {
  const open = useStore((s) => s.menuOpen);
  const closeMenu = useStore((s) => s.closeMenu);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mnav-scrim"
          className="fixed inset-0 z-[80]"
          style={{ background: "rgba(20, 14, 8, 0.32)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeMenu}
        />
      )}
      {open && (
        <motion.div
          key="mnav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-y-0 left-0 z-[81] w-[min(100vw,420px)] bg-cream flex flex-col border-r border-line"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.38, ease: [0.6, 0.05, 0.2, 1] }}
        >
          {/* Head */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-line-soft">
            <span className="font-sans font-medium text-[18px] tracking-[0.42em] pl-[0.42em]">JAFAFA</span>
            <button
              onClick={closeMenu}
              className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-black/[0.04]"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Links */}
          <nav className="px-5 pt-6 grid gap-1">
            {ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="flex justify-between items-baseline py-[18px] border-b border-line-soft font-serif text-[32px] font-light"
              >
                <span>{item.label}</span>
                <span className="font-mono text-[12px] md:text-[10px] tracking-[0.18em] text-muted">{item.num}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-5 pb-7 mt-auto border-t border-line-soft pt-[18px]">
            <div className="font-mono text-[12.5px] md:text-[10.5px] tracking-[0.14em] uppercase text-muted">
              Maison Jafafa · est. 2019
            </div>
            <div className="flex gap-4 mt-3 font-mono text-[13px] md:text-[11px] tracking-[0.14em] uppercase text-muted">
              <span>EN</span><span>·</span><span>EUR €</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
