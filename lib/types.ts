export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  no: string;
  tagline: string;
  family: string;
  price: number;
  volume: string;
  collection: string;
  description: string;
  perfumer: string;
  notes: ScentNotes;
  intensity: number;
  longevity: number;
  sillage: number;
}

export interface Collection {
  id: string;
  name: string;
  no: string;
  tagline: string;
  description: string;
  palette: string;
  products: string[];
}

export interface CartItem {
  productId: string;
  qty: number;
}

export type PlaceholderKind = "default" | "dark" | "sage";
