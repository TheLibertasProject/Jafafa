import type { Metadata } from "next";
import { Press } from "@/components/sections/maison/Press";

export const metadata: Metadata = {
  title: "Press · Jafafa · Olfactive Botanicals",
  description:
    "A few words written about the maison, and how to request a press kit or samples.",
};

export default function PressPage() {
  return <Press />;
}
