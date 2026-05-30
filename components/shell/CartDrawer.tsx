"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/data";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { Placeholder, BottleMark } from "@/components/ui/Placeholder";
import { img } from "@/lib/images";
import { kindForCollection } from "@/lib/data";

export function CartDrawer() {
  const cartOpen = useStore((s) => s.cartOpen);
  const closeCart = useStore((s) => s.closeCart);
  const items = useStore((s) => s.items);
  const setQty = useStore((s) => s.setQty);
  const count = useStore((s) => s.count());
  const subtotal = useStore((s) => s.subtotal());

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  return (
    <>
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[60] bg-ink/[0.35]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.aside
            key="drawer"
            aria-label="Shopping cart"
            className="fixed top-0 right-0 bottom-0 w-[min(440px,92vw)] bg-paper z-[70] flex flex-col shadow-[-30px_0_60px_rgba(26,26,23,0.08)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.7, 0.05, 0.2, 1] }}
          >
            {/* Head */}
            <div className="flex items-center justify-between px-7 py-[22px] border-b border-line-soft">
              <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium">
                Your bag · {count} {count === 1 ? "item" : "items"}
              </h3>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-black/[0.04]"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-auto px-7 py-2 drawer-body">
              {items.length === 0 ? (
                <div className="text-center py-20 font-serif text-[22px] italic text-muted">
                  <div className="mb-4 flex justify-center">
                    <BottleMark width={64} opacity={0.18} />
                  </div>
                  Your bag is quiet.
                  <div className="mt-[18px] font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted not-italic">
                    <Link href="/collections" onClick={closeCart} className="border-b border-current pb-[3px]">
                      Begin browsing
                    </Link>
                  </div>
                </div>
              ) : (
                items.map((item) => {
                  const p = getProduct(item.productId);
                  if (!p) return null;
                  return (
                    <div
                      key={item.productId}
                      className="grid gap-4 py-5 border-b border-line-soft last:border-0 items-center"
                      style={{ gridTemplateColumns: "72px 1fr auto" }}
                    >
                      <Placeholder
                        src={img(`product/${p.id}/main`)}
                        alt={p.name}
                        kind={kindForCollection(p.collection)}
                        ratio="4/5"
                        style={{ width: 72, height: 90 }}
                      />
                      <div className="grid gap-1">
                        <div className="font-serif text-[19px] leading-none">{p.name}</div>
                        <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
                          {p.family} · {p.volume}
                        </div>
                        <div className="inline-flex items-center border border-line rounded-full font-mono text-[11px] tracking-[0.1em] mt-2 self-start">
                          <button
                            className="py-[6px] px-[10px]"
                            onClick={() => setQty(p.id, item.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            <MinusIcon />
                          </button>
                          <span className="px-[10px]">{String(item.qty).padStart(2, "0")}</span>
                          <button
                            className="py-[6px] px-[10px]"
                            onClick={() => setQty(p.id, item.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            <PlusIcon />
                          </button>
                        </div>
                      </div>
                      <div className="font-mono text-[12px] tracking-[0.06em]">€{p.price * item.qty}</div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-7 py-[22px] border-t border-line-soft grid gap-[14px]">
                <div className="flex justify-between items-baseline font-serif text-[22px]">
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted">Subtotal</span>
                  <span>€{subtotal}</span>
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
                  Shipping and taxes calculated at checkout.
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full h-[46px] bg-gold text-ink font-sans text-[13px] tracking-[0.06em] uppercase font-medium rounded-full border border-gold hover:bg-gold-soft hover:border-gold-soft transition-all duration-[220ms] flex items-center justify-center"
                >
                  Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="self-center font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 mx-auto"
                >
                  Continue browsing
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
