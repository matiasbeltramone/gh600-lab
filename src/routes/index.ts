export function handleHealth() {
  return {
    status: "ok",
    buildSha: process.env.BUILD_SHA ?? "unknown",
  };
}

export function handleVersion() {
  return {
    version: process.env.BUILD_SHA ?? "unknown",
  };
}
