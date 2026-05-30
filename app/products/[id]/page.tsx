import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/sections/product/ProductDetail";
import { PRODUCTS, getProduct } from "@/lib/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — Jafafa · Olfactive Botanicals`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  return <ProductDetail id={id} />;
}
