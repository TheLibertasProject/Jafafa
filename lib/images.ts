/**
 * Central image registry.
 * Add an entry here when you drop an image into /public/images/.
 * Anything NOT listed here falls back to the striped placeholder.
 */

export const IMAGES: Record<string, string> = {
  // Landing
  "landing/atelier": "/images/landing/atelier.jpg",
  "landing/hero":    "/images/landing/main.jpeg",
  // "landing/discovery": "/images/landing/discovery-set.jpg",

  // Collection editorials.
  // Swapped 20 Jul 2026: the original AI editorials showed ~15 fragrances the
  // maison does not make; each collection now leads with a scene from one of
  // its own members, so every bottle on the site is one of the real five.
  "collection-editorial/solaires": "/images/products/floral-frenzy/floral-frenzy-3.jpeg",
  "collection-editorial/nocturnes": "/images/products/midnight-sun/midnight-sun-2.jpeg",
  "collection-editorial/idylls":    "/images/products/fairy-garden/fairy-garden-3.jpeg",

  // Collection headers
  // "collection-header/solaires":  "/images/collections/solaires-header.jpg",
  // "collection-header/nocturnes": "/images/collections/nocturnes-header.jpg",
  // "collection-header/idylls":    "/images/collections/idylls-header.jpg",

  // Products
  // Glory's studio shot leads; the bottle stamped "GLORY 1927" (which
  // contradicts est. MMXIX) sits last in the gallery as an archive curio.
  "product/glory/main": "/images/products/glory/glory-3.jpeg",
  "product/glory/1":    "/images/products/glory/glory-1.jpeg",
  "product/glory/2":    "/images/products/glory/glory-2.jpeg",
  "product/glory/3":    "/images/products/glory/glory.jpeg",

  "product/midnight-sun/main": "/images/products/midnight-sun/midnight-sun.jpeg",
  "product/midnight-sun/1":    "/images/products/midnight-sun/midnight-sun-1.jpeg",
  "product/midnight-sun/2":    "/images/products/midnight-sun/midnight-sun-2.jpeg",
  "product/midnight-sun/3":    "/images/products/midnight-sun/midnight-sun-3.jpeg",

  "product/oud-opulence/main": "/images/products/oud-opulence/oud-opulence.jpeg",
  "product/oud-opulence/1":    "/images/products/oud-opulence/oud-opulence-1.jpeg",
  "product/oud-opulence/2":    "/images/products/oud-opulence/oud-opulence-2.jpeg",
  "product/oud-opulence/3":    "/images/products/oud-opulence/oud-opulence-3.jpeg",

  "product/fairy-garden/main": "/images/products/fairy-garden/fairy-garden.jpeg",
  "product/fairy-garden/1":    "/images/products/fairy-garden/fairy-garden--1.jpeg",
  "product/fairy-garden/2":    "/images/products/fairy-garden/fairy-garden-2.jpeg",
  "product/fairy-garden/3":    "/images/products/fairy-garden/fairy-garden-3.jpeg",

  "product/floral-frenzy/main": "/images/products/floral-frenzy/foral-frenzy.jpeg",
  "product/floral-frenzy/1":    "/images/products/floral-frenzy/floral-frenzy-1.jpeg",
  "product/floral-frenzy/2":    "/images/products/floral-frenzy/floral-frenzy-2.jpeg",
  "product/floral-frenzy/3":    "/images/products/floral-frenzy/floral-frenzy-3.jpeg",

  // Discovery set
  "product/discovery-set/main": "/images/landing/5vials.jpeg",

  // About
  // "about/botanicals": "/images/about/botanicals.jpg",
  // "about/perfumers":  "/images/about/perfumers.jpg",
};

/** Returns the public path if the image is registered, or undefined. */
export function img(key: string): string | undefined {
  return IMAGES[key];
}
