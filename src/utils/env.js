export function getEnv() {
  return window.location.hostname === "beepy.club" ? "prod" : "test";
}
