import type { Metadata } from "next";
import { Sourcing } from "@/components/sections/maison/Sourcing";

export const metadata: Metadata = {
  title: "Sourcing · Jafafa · Olfactive Botanicals",
  description:
    "Where the botanicals come from: single cooperatives, paid above the syndicate rate, published every spring.",
};

export default function SourcingPage() {
  return <Sourcing />;
}
