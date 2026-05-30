import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/shell/Nav";
import { MobileNav } from "@/components/shell/MobileNav";
import { CartDrawer } from "@/components/shell/CartDrawer";
import { Footer } from "@/components/shell/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      className={`${cormorant.variable} ${jetbrains.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col" style={{ background: "#efe7dc" }}>
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileNav />
        <CartDrawer />
      </body>
    </html>
  );
}
