import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { handleHealth } from "../src/routes/index.js";

describe("handleHealth", () => {
  let originalBuildSha: string | undefined;

  beforeEach(() => {
    originalBuildSha = process.env.BUILD_SHA;
  });

  afterEach(() => {
    if (originalBuildSha === undefined) {
      delete process.env.BUILD_SHA;
    } else {
      process.env.BUILD_SHA = originalBuildSha;
    }
  });

  it("returns ok status with BUILD_SHA when env var is set", () => {
    process.env.BUILD_SHA = "abc123";

    expect(handleHealth()).toEqual({
      status: "ok",
      buildSha: "abc123",
    });
  });

  it("returns ok status with 'unknown' when BUILD_SHA is not set", () => {
    delete process.env.BUILD_SHA;

    expect(handleHealth()).toEqual({
      status: "ok",
      buildSha: "unknown",
    });
  });
});
