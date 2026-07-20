"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, MinusIcon } from "@/components/ui/Icons";

// ─── Content ──────────────────────────────────────────────────────────────────

const QUESTIONS: { q: string; a: string }[] = [
  {
    q: "Do samples come with every order?",
    a: "Yes. Every order arrives with complimentary samples, chosen to introduce you to fragrances you haven't tried yet.",
  },
  {
    q: "Is shipping free?",
    a: "Orders over €120 travel free. Below that, delivery is priced by region: see our shipping and returns page for the full table.",
  },
  {
    q: "Can I refill a bottle once it's empty?",
    a: "Every bottle we make is refillable, at the maison in Helsinki or by post. It's part of why the glass is heavy.",
  },
  {
    q: "What happens when a fragrance sells out?",
    a: "We work in editions of two thousand. When one sells out, we wait for the ingredients to meet us again: sometimes a season, sometimes a year.",
  },
  {
    q: "Can I see the ingredient or allergen list before I buy?",
    a: "Yes, on request. Write to us at letters@maisonjafafa.com and we'll send the full list for any fragrance.",
  },
  {
    q: "Can I visit the maison in person?",
    a: "By appointment, Tuesday through Saturday, twelve to six, at Korkeavuorenkatu 22 in Helsinki. Visits are private, free, and last an hour.",
  },
  {
    q: "What is your returns policy?",
    a: "Unopened bottles can be returned within thirty days. A fragrance that's been worn can't come back to us, but write to us and we'll find a way to help.",
  },
  {
    q: "Are your fragrances for men or women?",
    a: "Neither, or both. We think of them as compositions, not categories, and wear them the same way ourselves.",
  },
  {
    q: "How do I choose my first bottle?",
    a: "Start with the discovery set: all five fragrances in 2ml vials, for the cost of an evening out. Most people know within a week which one follows them home.",
  },
  {
    q: "Do you ship worldwide?",
    a: "We ship across Finland, the EU, the UK, and Switzerland with published rates. Elsewhere, write to us and we'll work out a way to send it.",
  },
];

// ─── Crumbs ───────────────────────────────────────────────────────────────────

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px]">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">FAQ</span>
      </div>
    </div>
  );
}

// ─── Accordion item ───────────────────────────────────────────────────────────

function AccordionItem({
  index,
  q,
  a,
  open,
  onToggle,
}: {
  index: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const no = String(index + 1).padStart(2, "0");
  const buttonId = `faq-button-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-line-soft">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center gap-6 py-7 text-left cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-4 max-[600px]:gap-4 max-[600px]:py-5"
        >
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted/50 w-6 shrink-0">{no}</span>
          <span className="font-serif font-light text-[24px] leading-[1.2] flex-1 max-[600px]:text-[19px]">
            {q}
          </span>
          <span className="text-ink-2 shrink-0 transition-colors group-hover:text-ink">
            {open ? <MinusIcon /> : <PlusIcon />}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.6,0.2,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <p
            className="text-[16px] leading-[1.7] text-ink-2 max-w-[62ch] pb-8 pl-[48px] max-[600px]:pl-[40px]"
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function Faq() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <main className="page-enter">
      <Crumbs />

      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[40px] pb-16 max-[880px]:pb-10">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">Before you write to us</div>
        <h1
          className="font-serif font-light leading-[0.92] mt-[14px] mb-6"
          style={{ fontSize: "clamp(56px,8vw,128px)" }}
        >
          Questions, <em className="italic">answered.</em>
        </h1>
        <p className="font-serif font-light text-[22px] text-ink-2 leading-[1.35] max-w-[540px]">
          The things people ask us most, in no particular order of importance.
        </p>
      </section>

      {/* Accordion */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-28">
        <div className="max-w-[860px] border-t border-line">
          {QUESTIONS.map((item, i) => (
            <AccordionItem
              key={item.q}
              index={i}
              q={item.q}
              a={item.a}
              open={openSet.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        <p className="text-[15px] leading-[1.7] text-ink-2 max-w-[52ch] mt-16">
          Still have a question? We&apos;re a small maison and we like
          hearing from people.{" "}
          <Link href="/contact" className="border-b border-current hover:text-ink transition-colors">
            Write to us
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
