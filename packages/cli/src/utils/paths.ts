import fs from "node:fs";
import path from "node:path";
import type { ComponentsConfig } from "./config.js";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "bun.lock")) || fs.existsSync(path.join(cwd, "bun.lockb"))) {
    return "bun";
  }
  return "npm";
}

export function aliasToPath(alias: string, cwd: string): string {
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  if (fs.existsSync(tsconfigPath)) {
    try {
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8")) as {
        compilerOptions?: { paths?: Record<string, string[]> };
      };
      const paths = tsconfig.compilerOptions?.paths ?? {};
      for (const [key, values] of Object.entries(paths)) {
        const pattern = key.replace(/\*$/, "");
        if (alias.startsWith(pattern) && values[0]) {
          const rel = values[0].replace(/\*$/, "");
          const suffix = alias.slice(pattern.length);
          return path.join(cwd, rel, suffix);
        }
      }
    } catch {
      // fall through
    }
  }

  if (alias.startsWith("@/")) {
    return path.join(cwd, "src", alias.slice(2));
  }

  return path.join(cwd, alias);
}

export function resolveUiFilePath(
  config: ComponentsConfig,
  slug: string,
  cwd: string,
  fileName?: string
): string {
  const base = aliasToPath(config.aliases.ui, cwd);
  const ext = fileName ? path.extname(fileName) : config.tsx ? ".tsx" : ".ts";
  return path.join(base, `${slug}${ext}`);
}

export function resolveUtilsFilePath(config: ComponentsConfig, cwd: string): string {
  return aliasToPath(config.aliases.utils, cwd) + ".ts";
}

export function ensureDir(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function hasTsPathAlias(cwd: string): boolean {
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  if (!fs.existsSync(tsconfigPath)) return false;
  try {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8")) as {
      compilerOptions?: { paths?: Record<string, string[]> };
    };
    return Object.keys(tsconfig.compilerOptions?.paths ?? {}).some((k) => k.startsWith("@/"));
  } catch {
    return false;
  }
}
