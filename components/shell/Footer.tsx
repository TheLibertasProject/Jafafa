import Link from "next/link";
import { NewsletterForm } from "@/components/shell/NewsletterForm";

const COLUMNS: { head: string; links: { label: string; href: string }[] }[] = [
  {
    head: "Shop",
    links: [
      { label: "All fragrances", href: "/collections" },
      { label: "Solaires", href: "/collections/solaires" },
      { label: "Nocturnes", href: "/collections/nocturnes" },
      { label: "Idylls", href: "/collections/idylls" },
      { label: "Discovery set", href: "/discovery-set" },
    ],
  },
  {
    head: "Maison",
    links: [
      { label: "Our story", href: "/about" },
      { label: "The perfumers", href: "/about#perfumers" },
      { label: "Journal", href: "/journal" },
      { label: "Sourcing", href: "/sourcing" },
      { label: "Stockists", href: "/stockists" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    head: "Service",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping & returns", href: "/shipping-returns" },
      { label: "Care guide", href: "/care-guide" },
      { label: "FAQ", href: "/faq" },
      { label: "Book a visit", href: "/book-visit" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-cream-deep border-t border-line">
      <div className="max-w-[1240px] mx-auto px-[52px] pt-24 pb-10 max-[720px]:px-6">
        <div className="grid [grid-template-columns:1.5fr_.9fr_.9fr_.9fr] gap-12 max-[880px]:grid-cols-2 max-[880px]:gap-x-8 max-[880px]:gap-y-12 max-[520px]:grid-cols-1">
          {/* Brand + signup */}
          <div>
            <div
              className="font-sans font-medium text-[24px] text-ink"
              style={{ letterSpacing: "0.36em", paddingLeft: "0.36em" }}
            >
              JAFAFA
            </div>
            <p className="font-body text-[16px] leading-[1.6] text-ink-2 mt-6 mb-[34px] max-w-[300px]">
              Olfactive botanicals, slow-grown in small batches. Bottled in Grasse and Helsinki.
            </p>
            <div className="font-sans font-medium text-[10.5px] uppercase tracking-[0.2em] text-label mb-4">
              Letters, twice a year.
            </div>
            <NewsletterForm />
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.head}>
              <div className="font-sans font-medium text-[10.5px] uppercase tracking-[0.2em] text-label mb-6">
                {col.head}
              </div>
              <div className="flex flex-col gap-[15px]">
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="font-body text-[15px] text-ink-2 hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[72px] pt-7 border-t border-line flex justify-between gap-6 flex-wrap font-sans font-medium text-[10px] uppercase tracking-[0.16em] text-muted">
          <span>© Maison Jafafa MMXXV · All Rights Reserved</span>
          <span>EN · EUR € · Made Between Helsinki & Grasse</span>
        </div>
      </div>
    </footer>
  );
}
