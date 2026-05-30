import type { Metadata } from "next";
import { BookVisit } from "@/components/sections/book-visit/BookVisit";

export const metadata: Metadata = {
  title: "Book a Visit — Jafafa · Olfactive Botanicals",
  description:
    "Sixty minutes with one of our perfumers. A fragrance profile, a quiet room, and two small vials to take home.",
};

export default function BookVisitPage() {
  return <BookVisit />;
}
