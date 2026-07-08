import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { handleHealth } from "../src/routes/index.js";

describe("handleHealth", () => {
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

  it("devuelve buildSha desde BUILD_SHA cuando está seteado", () => {
    process.env.BUILD_SHA = "abc123";
    expect(handleHealth()).toEqual({ status: "healthy", buildSha: "abc123" });
  });

  it("devuelve buildSha 'unknown' cuando BUILD_SHA no está seteado", () => {
    expect(handleHealth()).toEqual({ status: "healthy", buildSha: "unknown" });
  });
});
