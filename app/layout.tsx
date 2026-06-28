import type { Metadata } from "next";
import { Cormorant, EB_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/shell/Nav";
import { MobileNav } from "@/components/shell/MobileNav";
import { CartDrawer } from "@/components/shell/CartDrawer";
import { Footer } from "@/components/shell/Footer";

// Display serif — headlines & product names (handoff: Cormorant 300/400/500/600)
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body serif — paragraphs, footer links, italic taglines (handoff: EB Garamond)
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Sans — uppercase labels, eyebrows, prices, buttons, nav (handoff: Jost)
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jafafa · Olfactive Botanicals",
  description:
    "A small house of five fragrances, three collections. Quiet luxury · botanical · slow-grown.",
  openGraph: {
    title: "Jafafa · Olfactive Botanicals",
    description: "Composed slowly, from botanicals chosen for their patience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${ebGaramond.variable} ${jost.variable}`}
    >
      <body className="min-h-screen flex flex-col" style={{ background: "#f5f1e9" }}>
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileNav />
        <CartDrawer />
      </body>
    </html>
  );
}
