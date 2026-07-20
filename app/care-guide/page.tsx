import type { Metadata } from "next";
import { CareGuide } from "@/components/sections/service/CareGuide";

export const metadata: Metadata = {
  title: "Care Guide · Jafafa · Olfactive Botanicals",
  description:
    "How to keep a fragrance well: storage, longevity once opened, travel notes, and the refill ritual.",
};

export default function CareGuidePage() {
  return <CareGuide />;
}
