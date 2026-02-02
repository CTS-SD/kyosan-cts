import { execSync } from "node:child_process";

export default async function globalSetup() {
  execSync("docker compose down");
  execSync("docker compose up -d");
  execSync("pnpm drizzle-kit push --force", { stdio: "inherit" });
}
