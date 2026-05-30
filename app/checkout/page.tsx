import type { Metadata } from "next";
import { Checkout } from "@/components/sections/checkout/Checkout";

export const metadata: Metadata = {
  title: "Checkout — Jafafa · Olfactive Botanicals",
  description: "Complete your order.",
};

export default function CheckoutPage() {
  return <Checkout />;
}
