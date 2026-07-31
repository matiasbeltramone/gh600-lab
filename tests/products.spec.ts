import { beforeEach, describe, expect, it } from "vitest";
import {
  handleProducts,
  __resetProductsCache,
  type Product,
} from "../src/routes/index.js";

beforeEach(() => __resetProductsCache());

describe("handleProducts", () => {
  it("primera llamada devuelve cached:false y productos con shape válido", () => {
    const result = handleProducts();
    expect(result.cached).toBe(false);
    expect(result.products.length).toBeGreaterThan(0);
    for (const product of result.products) {
      const p: Product = product;
      expect(typeof p.id).toBe("string");
      expect(typeof p.name).toBe("string");
      expect(typeof p.price).toBe("number");
    }
  });

  it("cache hit dentro del TTL devuelve la misma referencia", () => {
    const first = handleProducts(1000);
    expect(first.cached).toBe(false);
    const second = handleProducts(1000 + 59_000);
    expect(second.cached).toBe(true);
    expect(second.products).toBe(first.products);
  });

  it("cache miss/refresh pasado el TTL", () => {
    expect(handleProducts(1000).cached).toBe(false);
    expect(handleProducts(1000 + 60_001).cached).toBe(false);
  });

  it("borde exacto del TTL expira (now < expiresAt)", () => {
    expect(handleProducts(1000).cached).toBe(false);
    expect(handleProducts(1000 + 60_000).cached).toBe(false);
  });

  it("__resetProductsCache fuerza un miss", () => {
    expect(handleProducts(1000).cached).toBe(false);
    __resetProductsCache();
    expect(handleProducts(1000).cached).toBe(false);
  });
});
