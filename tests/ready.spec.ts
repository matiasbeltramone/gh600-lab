import { describe, expect, it } from "vitest";
import { handleReady } from "../src/routes/index.js";

describe("handleReady", () => {
  it("devuelve { ready: true }", () => {
    expect(handleReady()).toEqual({ ready: true });
  });
});
