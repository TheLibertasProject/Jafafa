import type { Metadata } from "next";
import { ShippingReturns } from "@/components/sections/service/ShippingReturns";

export const metadata: Metadata = {
  title: "Shipping & Returns · Jafafa · Olfactive Botanicals",
  description:
    "Delivery times and costs by region, our returns policy, and how refills by post work.",
};

export default function ShippingReturnsPage() {
  return <ShippingReturns />;
}
