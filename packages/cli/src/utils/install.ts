import { spawnSync } from "node:child_process";
import type { PackageManager } from "./paths.js";

export function installDependencies(
  cwd: string,
  packageManager: PackageManager,
  dependencies: Record<string, string>
) {
  const entries = Object.entries(dependencies);
  if (entries.length === 0) return;

  const packages = entries.map(([name, version]) => `${name}@${version}`);

  const commands: Record<PackageManager, { cmd: string; args: string[] }> = {
    pnpm: { cmd: "pnpm", args: ["add", ...packages] },
    npm: { cmd: "npm", args: ["install", ...packages] },
    yarn: { cmd: "yarn", args: ["add", ...packages] },
    bun: { cmd: "bun", args: ["add", ...packages] },
  };

  const { cmd, args } = commands[packageManager];
  const result = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: process.platform === "win32" });

  if (result.status !== 0) {
    throw new Error(`Failed to install dependencies with ${packageManager}`);
  }
}
