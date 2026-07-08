export function handleHealth() {
  return {
    status: "healthy",
    buildSha: process.env.BUILD_SHA ?? "unknown",
  };
}

export function handleReady() {
  return {
    ready: true,
  };
}
