import type { Product, Collection } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "glory",
    name: "Glory",
    no: "01",
    tagline: "A hymn to first light.",
    family: "Resinous · Solar",
    price: 185,
    volume: "50ml",
    collection: "solaires",
    description:
      "Composed at the hour the fields turn gold. Olibanum smoulders against sun-warmed hay; white iris cools the centre; everything settles into a slow, luminous amber.",
    perfumer: "L. Audemars",
    notes: {
      top: ["Frankincense", "Cardamom", "Pink Pepper"],
      heart: ["White Iris", "Sun-warmed Hay", "Immortelle"],
      base: ["Golden Amber", "Sandalwood", "Benzoin"],
    },
    intensity: 3,
    longevity: 4,
    sillage: 3,
  },
  {
    id: "midnight-sun",
    name: "Midnight Sun",
    no: "02",
    tagline: "Heat at the hour without shadow.",
    family: "Smoke · Floral",
    price: 220,
    volume: "50ml",
    collection: "nocturnes",
    description:
      "A paradox bottled. Birch tar curls beneath cold neroli; jasmine opens long after sundown. The dry-down is a white amber so soft it reads as quiet.",
    perfumer: "M. Aaltonen",
    notes: {
      top: ["Cold Neroli", "Bergamot Peel", "Pink Salt"],
      heart: ["Midnight Jasmine", "Tuberose", "Birch Tar"],
      base: ["White Amber", "Cashmeran", "Ambergris"],
    },
    intensity: 4,
    longevity: 5,
    sillage: 4,
  },
  {
    id: "oud-opulence",
    name: "Oud Opulence",
    no: "03",
    tagline: "The slow burn of the rare.",
    family: "Oud · Leather",
    price: 320,
    volume: "50ml",
    collection: "nocturnes",
    description:
      "Cambodian oud aged ten winters, married to a saffron-laced rose. Leather lies underneath like a hand-bound book. An hour in, a thread of incense.",
    perfumer: "K. Saidi",
    notes: {
      top: ["Saffron", "Pink Pepper", "Damask Rose"],
      heart: ["Cambodian Oud", "Rose Absolute", "Labdanum"],
      base: ["Aged Leather", "Oud Wood", "Smoked Vanilla"],
    },
    intensity: 5,
    longevity: 5,
    sillage: 5,
  },
  {
    id: "floral-frenzy",
    name: "Floral Frenzy",
    no: "04",
    tagline: "A garden, slightly over-watered.",
    family: "White Floral",
    price: 195,
    volume: "50ml",
    collection: "solaires",
    description:
      "Tuberose and ylang ylang in full bloom; peony at the cheekbones; a vetiver root keeps the whole thing from floating away. Worn well, it reads as defiance.",
    perfumer: "L. Audemars",
    notes: {
      top: ["Peony", "Green Mandarin", "Aldehydes"],
      heart: ["Tuberose Absolute", "Ylang Ylang", "Orange Blossom"],
      base: ["Vetiver", "White Musk", "Tonka Bean"],
    },
    intensity: 4,
    longevity: 4,
    sillage: 5,
  },
  {
    id: "fairy-garden",
    name: "Fairy Garden",
    no: "05",
    tagline: "Green things, half-imagined.",
    family: "Green · Aromatic",
    price: 175,
    volume: "50ml",
    collection: "idylls",
    description:
      "Violet leaf cracked between fingers, dew still on the lily of the valley. A whisper of fig sap; a moss so soft it could be a memory of moss.",
    perfumer: "M. Aaltonen",
    notes: {
      top: ["Violet Leaf", "Dewy Galbanum", "Bergamot"],
      heart: ["Lily of the Valley", "Fig Leaf", "Green Tea"],
      base: ["Oakmoss", "White Cedar", "Soft Musk"],
    },
    intensity: 2,
    longevity: 3,
    sillage: 3,
  },
];

export const DISCOVERY_SET: Product = {
  id: "discovery-set",
  name: "The Discovery Set",
  no: "DS",
  tagline: "All five, in miniature.",
  family: "Discovery",
  price: 38,
  volume: "5 × 2ml",
  collection: "",
  description:
    "All five fragrances in 2ml hand-decanted vials, posted in a linen-wrapped box with a letter from the perfumer.",
  perfumer: "L. Audemars & M. Aaltonen",
  notes: { top: [], heart: [], base: [] },
  intensity: 0,
  longevity: 0,
  sillage: 0,
};

export const COLLECTIONS: Collection[] = [
  {
    id: "solaires",
    name: "Solaires",
    no: "I",
    tagline: "Light, held.",
    description:
      "Compositions of warmth and openness — resin, citrus pith, white flowers in midday sun. For wearing into the bright hours.",
    palette: "#C9A87C",
    products: ["glory", "floral-frenzy"],
  },
  {
    id: "nocturnes",
    name: "Nocturnes",
    no: "II",
    tagline: "Heat after dark.",
    description:
      "Studies in shadow and resonance — oud, smoked amber, midnight jasmine. Worn when the room has been lit by lamps for some time.",
    palette: "#1A1A17",
    products: ["midnight-sun", "oud-opulence"],
  },
  {
    id: "idylls",
    name: "Idylls",
    no: "III",
    tagline: "Green, imagined.",
    description:
      "Pastorals from places that may not exist — moss, violet leaf, the cool side of a fig. The smallest, quietest of the three series.",
    palette: "#4A5D3F",
    products: ["fairy-garden"],
  },
];

export function getProduct(id: string): Product | undefined {
  if (id === "discovery-set") return DISCOVERY_SET;
  return PRODUCTS.find((p) => p.id === id);
}

export function getCollection(id: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}

export function productsIn(collectionId: string): Product[] {
  return PRODUCTS.filter((p) => p.collection === collectionId);
}

export function kindForCollection(collectionId: string): "dark" | "sage" | "default" {
  if (collectionId === "nocturnes") return "dark";
  if (collectionId === "idylls") return "sage";
  return "default";
}
