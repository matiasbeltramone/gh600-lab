import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  handleOrders,
  resetOrdersCache,
  ORDERS_TTL_MS,
} from "../src/routes/index.js";

describe("handleOrders", () => {
  beforeEach(() => {
    resetOrdersCache();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("devuelve un array no vacío con la forma esperada", () => {
    const orders = handleOrders();
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeGreaterThan(0);

    const first = orders[0];
    expect(typeof first.id).toBe("string");
    expect(typeof first.customer).toBe("string");
    expect(typeof first.total).toBe("number");
    expect(["pending", "paid", "shipped"]).toContain(first.status);
  });

  it("devuelve la misma referencia dentro del TTL (cache hit)", () => {
    const a = handleOrders();
    const b = handleOrders();
    expect(b).toBe(a);
  });

  it("refresca la cache después del TTL", () => {
    const a = handleOrders();
    vi.advanceTimersByTime(ORDERS_TTL_MS + 1);
    const c = handleOrders();
    expect(c).not.toBe(a);
    expect(c).toEqual(a);
  });
});
