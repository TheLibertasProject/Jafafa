import type { Metadata } from "next";
import { Stockists } from "@/components/sections/maison/Stockists";

export const metadata: Metadata = {
  title: "Stockists · Jafafa · Olfactive Botanicals",
  description:
    "The maison in Helsinki, and a short list of rooms in Stockholm, Copenhagen, Paris, London and Berlin we trust to carry us.",
};

export default function StockistsPage() {
  return <Stockists />;
}
