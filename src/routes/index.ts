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

export interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductsCacheEntry {
  data: Product[];
  expiresAt: number; // epoch ms
}

const PRODUCTS_TTL_MS = 60_000;
let productsCache: ProductsCacheEntry | null = null;

function loadProducts(): Product[] {
  return [
    { id: "p1", name: "Teclado mecánico", price: 120 },
    { id: "p2", name: "Mouse inalámbrico", price: 45 },
    { id: "p3", name: "Monitor 27 pulgadas", price: 320 },
  ];
}

export function handleProducts(now: number = Date.now()): {
  products: Product[];
  cached: boolean;
} {
  if (productsCache !== null && now < productsCache.expiresAt) {
    return { products: productsCache.data, cached: true };
  }
  const data = loadProducts();
  productsCache = { data, expiresAt: now + PRODUCTS_TTL_MS };
  return { products: data, cached: false };
}

export function __resetProductsCache(): void {
  productsCache = null;
}
