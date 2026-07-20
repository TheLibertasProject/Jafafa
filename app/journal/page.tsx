import type { Metadata } from "next";
import { Journal } from "@/components/sections/maison/Journal";

export const metadata: Metadata = {
  title: "Journal · Jafafa · Olfactive Botanicals",
  description: "Notes from the bench, written when there is something worth saying.",
};

export default function JournalPage() {
  return <Journal />;
}
