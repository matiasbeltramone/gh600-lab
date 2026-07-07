import { beforeEach, describe, expect, it } from "vitest";
import {
  handleProducts,
  __resetProductsCache,
  type Product,
} from "../src/routes/index.js";

describe("handleProducts", () => {
  beforeEach(() => {
    __resetProductsCache();
  });

  it("devuelve la lista de productos sin cache en la primera llamada", () => {
    const res = handleProducts(1000);
    expect(res.cached).toBe(false);
    expect(res.products.length).toBeGreaterThan(0);

    const first: Product = res.products[0]!;
    expect(typeof first.id).toBe("string");
    expect(typeof first.name).toBe("string");
    expect(typeof first.price).toBe("number");
  });

  it("devuelve cache-hit dentro del TTL", () => {
    const first = handleProducts(1000);
    expect(first.cached).toBe(false);

    const second = handleProducts(1000 + 30_000);
    expect(second.cached).toBe(true);
    expect(second.products).toEqual(first.products);
  });

  it("recomputa después de que expira el TTL", () => {
    const first = handleProducts(1000);
    expect(first.cached).toBe(false);

    const second = handleProducts(1000 + 60_000);
    expect(second.cached).toBe(false);
  });
});
