import { rmSync, existsSync } from "fs";
import { execSync } from "child_process";

const run = (cmd: string) => execSync(cmd, { stdio: "inherit" });

const removeDir = (dir: string, label: string) => {
  if (existsSync(dir)) {
    console.log(`Removing ${label}...`);
    rmSync(dir, { recursive: true, force: true });
  }
};

// 1. 清理資料夾
console.log("\n[1/4] Cleaning up...");
removeDir("node_modules", "node_modules");
removeDir("dist", "dist");
removeDir(".vite", ".vite");

// 2. 清除 pnpm store
console.log("\n[2/4] Pruning pnpm store...");
run("pnpm store prune");

// 3. 安裝依賴
console.log("\n[3/4] Installing dependencies...");
run("pnpm install");

// 4. 切換到 dev 環境
console.log("\n[4/4] Switching to dev environment...");
run("pnpm switch dev");

console.log("\nSetup complete!\n");
