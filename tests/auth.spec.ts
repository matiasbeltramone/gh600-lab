import { describe, expect, it } from "vitest";
import { createSession, isExpired, refreshSession } from "../src/auth/session.js";

describe("refreshSession", () => {
  it("renueva issuedAt manteniendo userId y ttlSeconds", () => {
    const original = createSession("user-1", 1_000);
    const refreshed = refreshSession(original, 5_000);

    expect(refreshed.userId).toBe(original.userId);
    expect(refreshed.ttlSeconds).toBe(original.ttlSeconds);
    expect(refreshed.issuedAt).toBe(5_000);
  });

  it("devuelve una sesión nueva sin mutar la original", () => {
    const original = createSession("user-1", 1_000);
    const refreshed = refreshSession(original, 5_000);

    expect(refreshed).not.toBe(original);
    expect(original.issuedAt).toBe(1_000);
  });

  it("una sesión expirada deja de estar expirada tras renovarla", () => {
    const original = createSession("user-1", 0);
    const later = original.ttlSeconds * 1000 + 1;

    // La original ya venció en `later`.
    expect(isExpired(original, later)).toBe(true);

    // Al renovarla en `later`, vuelve a estar vigente.
    const refreshed = refreshSession(original, later);
    expect(isExpired(refreshed, later)).toBe(false);
  });
});
