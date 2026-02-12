import { writeFileSync } from "fs";

const env = process.argv[2];

if (!env || !["dev", "prod"].includes(env)) {
  console.error("Usage: pnpm switch <dev|prod>");
  process.exit(1);
}

const config = await import(`../config/env.${env}.ts`);
const envContent = Object.entries(config.default)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n");

writeFileSync(".env", envContent);
console.log(`Switched to ${env} environment`);
