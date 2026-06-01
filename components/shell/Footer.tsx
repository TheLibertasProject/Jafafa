import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-cream pt-20 pb-[30px] mt-[120px] max-[880px]:pt-[60px] max-[880px]:pb-6 max-[880px]:mt-20">
      <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 text-cream">
        <div
          className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-[60px] pb-[60px] max-[880px]:grid-cols-2 max-[880px]:gap-x-6 max-[880px]:gap-y-10 max-[880px]:pb-10"
        >
          {/* Brand col */}
          <div>
            <div className="font-serif text-[44px] tracking-[0.16em] leading-none mb-[18px] max-[880px]:text-[32px]">
              JAFAFA
            </div>
            <p className="opacity-75 max-w-[360px] text-[14px] mt-0">
              Olfactive botanicals, slow-grown in small batches.
              <br />
              Bottled in Grasse and Helsinki.
            </p>
            <div className="flex items-center gap-0 border-b border-cream/40 max-w-[320px] mt-7 max-[880px]:max-w-none">
              <input
                type="email"
                placeholder="Letters, twice a year."
                className="bg-transparent border-0 text-cream placeholder:text-cream/45 py-3 font-[inherit] text-[14px] flex-1 outline-none"
              />
              <button className="font-mono text-[11px] tracking-[0.16em] uppercase text-cream py-3 pl-[14px]">
                Subscribe →
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-cream/55 mb-[18px] mt-0">Shop</h4>
            <ul className="list-none p-0 m-0 grid gap-[10px] text-[14px]">
              {[
                { label: "All fragrances", href: "/collections" },
                { label: "Solaires", href: "/collections/solaires" },
                { label: "Nocturnes", href: "/collections/nocturnes" },
                { label: "Idylls", href: "/collections/idylls" },
                { label: "Discovery set", href: "/collections" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="opacity-85 hover:opacity-100 hover:text-gold-soft transition-opacity">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maison */}
          <div>
            <h4 className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-cream/55 mb-[18px] mt-0">Maison</h4>
            <ul className="list-none p-0 m-0 grid gap-[10px] text-[14px]">
              {["Our story", "The perfumers", "Sourcing", "Stockists", "Press"].map((l) => (
                <li key={l}>
                  <Link href="/about" className="opacity-85 hover:opacity-100 hover:text-gold-soft transition-opacity">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-cream/55 mb-[18px] mt-0">Service</h4>
            <ul className="list-none p-0 m-0 grid gap-[10px] text-[14px]">
              {["Contact", "Shipping & returns", "Care guide", "FAQ"].map((l) => (
                <li key={l}>
                  <Link href="/about" className="opacity-85 hover:opacity-100 hover:text-gold-soft transition-opacity">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-baseline pt-7 border-t border-cream/[0.15] font-mono text-[10.5px] tracking-[0.14em] uppercase text-cream/60 max-[880px]:flex-col max-[880px]:gap-[14px]">
          <span>© Maison Jafafa MMXXV · All rights reserved</span>
          <span>EN · EUR € · Made between Helsinki & Grasse</span>
        </div>
      </div>
    </footer>
  );
}
