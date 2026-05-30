import { notFound } from "next/navigation";
import { CollectionDetail } from "@/components/sections/collections/CollectionDetail";
import { COLLECTIONS, getCollection } from "@/lib/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const collection = getCollection(id);
  if (!collection) return { title: "Not Found" };
  return {
    title: `${collection.name} — Jafafa · Olfactive Botanicals`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { id } = await params;
  const collection = getCollection(id);
  if (!collection) notFound();
  return <CollectionDetail id={id} />;
}
