import { Hero } from "@/components/sections/landing/Hero";
import { FeaturedFragrances } from "@/components/sections/landing/FeaturedFragrances";
import { EditorialSplit } from "@/components/sections/landing/EditorialSplit";
import { CollectionsPreview } from "@/components/sections/landing/CollectionsPreview";
import { DiscoverySet } from "@/components/sections/landing/DiscoverySet";

export default function Home() {
  return (
    <main className="page-enter">
      <Hero />
      <FeaturedFragrances />
      <EditorialSplit />
      <CollectionsPreview />
      <DiscoverySet />
    </main>
  );
}
