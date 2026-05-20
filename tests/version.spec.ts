import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { handleVersion } from "../src/routes/index.js";

describe("handleVersion", () => {
  const originalBuildSha = process.env.BUILD_SHA;

  beforeEach(() => {
    delete process.env.BUILD_SHA;
  });

  afterEach(() => {
    if (originalBuildSha === undefined) {
      delete process.env.BUILD_SHA;
    } else {
      process.env.BUILD_SHA = originalBuildSha;
    }
  });

  it("devuelve version desde BUILD_SHA cuando está seteado", () => {
    process.env.BUILD_SHA = "abc123";
    expect(handleVersion()).toEqual({ version: "abc123" });
  });

  it("devuelve version 'unknown' cuando BUILD_SHA no está seteado", () => {
    expect(handleVersion()).toEqual({ version: "unknown" });
  });
});
