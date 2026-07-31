export function handleHealth() {
  return {
    status: "ok",
    buildSha: process.env.BUILD_SHA ?? "unknown",
  };
}

export function handleReady() {
  return {
    ready: true,
  };
}

export type Product = { id: string; name: string; price: number };
export type ProductsResponse = { products: Product[]; cached: boolean };

const PRODUCTS_TTL_MS = 60_000;

type CacheEntry = { expiresAt: number; products: Product[] };
let productsCache: CacheEntry | null = null;

function loadProducts(): Product[] {
  return [
    { id: "p1", name: "Teclado", price: 25 },
    { id: "p2", name: "Mouse", price: 15 },
    { id: "p3", name: "Monitor", price: 200 },
  ];
}

export function handleProducts(now: number = Date.now()): ProductsResponse {
  if (productsCache !== null && now < productsCache.expiresAt) {
    return { products: productsCache.products, cached: true };
  }

  const products = loadProducts();
  productsCache = { products, expiresAt: now + PRODUCTS_TTL_MS };
  return { products, cached: false };
}

export function __resetProductsCache(): void {
  productsCache = null;
}
