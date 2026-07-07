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

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: "pending" | "paid" | "shipped";
}

export const ORDERS_TTL_MS = 60_000;

let cachedOrders: Order[] | null = null;
let cacheTimestamp = 0;

function buildOrders(): Order[] {
  return [
    { id: "ord-1", customer: "Alice", total: 120.5, status: "pending" },
    { id: "ord-2", customer: "Bob", total: 89.99, status: "paid" },
    { id: "ord-3", customer: "Carol", total: 42, status: "shipped" },
  ];
}

export function handleOrders(): Order[] {
  const now = Date.now();
  if (cachedOrders !== null && now - cacheTimestamp < ORDERS_TTL_MS) {
    return cachedOrders;
  }
  cachedOrders = buildOrders();
  cacheTimestamp = now;
  return cachedOrders;
}

export function resetOrdersCache(): void {
  cachedOrders = null;
  cacheTimestamp = 0;
}
