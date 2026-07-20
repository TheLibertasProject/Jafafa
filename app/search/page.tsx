import type { Metadata } from "next";
import { Search } from "@/components/sections/discovery/Search";

export const metadata: Metadata = {
  title: "Search · Jafafa · Olfactive Botanicals",
  description: "Find a fragrance or collection by name, family, or note.",
};

export default function SearchPage() {
  return <Search />;
}
