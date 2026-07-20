import type { Metadata } from "next";
import { DiscoverySet } from "@/components/sections/discovery/DiscoverySet";

export const metadata: Metadata = {
  title: "The Discovery Set · Jafafa · Olfactive Botanicals",
  description:
    "Five 2ml vials, one of each composition, in a small wooden box. Within a year, the €38 comes back off any full bottle.",
};

export default function DiscoverySetPage() {
  return <DiscoverySet />;
}
