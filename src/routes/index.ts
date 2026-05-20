export function handleHealth() {
  return {
    status: "ok",
    buildSha: process.env.BUILD_SHA ?? "unknown",
  };
}
