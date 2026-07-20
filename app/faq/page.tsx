import type { Metadata } from "next";
import { Faq } from "@/components/sections/service/Faq";

export const metadata: Metadata = {
  title: "FAQ · Jafafa · Olfactive Botanicals",
  description:
    "Samples, shipping, refills, editions, and how to choose your first bottle. Answered plainly.",
};

export default function FaqPage() {
  return <Faq />;
}
