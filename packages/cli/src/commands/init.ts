import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";
import { CONFIG_FILENAME, DEFAULT_CONFIG } from "../utils/config.js";
import {
  detectPackageManager,
  ensureDir,
  hasTsPathAlias,
  resolveUtilsFilePath,
} from "../utils/paths.js";
import { installDependencies } from "../utils/install.js";

const BASE_DEPENDENCIES: Record<string, string> = {
  clsx: "^2.1.1",
  "tailwind-merge": "^3.0.0",
  "class-variance-authority": "^0.7.1",
};

function getCliRoot(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

function findGlobalsCss(cwd: string): string | null {
  const candidates = [
    "src/app/globals.css",
    "app/globals.css",
    "src/index.css",
    "src/styles/globals.css",
  ];

  for (const candidate of candidates) {
    const full = path.join(cwd, candidate);
    if (fs.existsSync(full)) return candidate;
  }

  return null;
}

function setupUtils(cwd: string) {
  const utilsPath = resolveUtilsFilePath(DEFAULT_CONFIG, cwd);
  if (fs.existsSync(utilsPath)) {
    console.log(pc.yellow(`  ↷ ${utilsPath} already exists`));
    return;
  }

  const cnSource = path.join(getCliRoot(), "registry/utils/cn.ts");
  ensureDir(utilsPath);
  fs.copyFileSync(cnSource, utilsPath);
  console.log(pc.green(`  ✓ Created ${path.relative(cwd, utilsPath)}`));
}

function setupTokens(cwd: string, cssPath: string) {
  const stylesDir = path.join(cwd, "src/styles");
  const tokensDest = path.join(stylesDir, "lootvm-ui.css");
  const tokensSource = path.join(getCliRoot(), "assets/lootvm-variables.css");

  ensureDir(tokensDest);
  fs.copyFileSync(tokensSource, tokensDest);
  console.log(pc.green(`  ✓ Created ${path.relative(cwd, tokensDest)}`));

  const globalsFull = path.join(cwd, cssPath);
  if (!fs.existsSync(globalsFull)) {
    ensureDir(globalsFull);
    fs.writeFileSync(globalsFull, '@import "tailwindcss";\n', "utf-8");
    console.log(pc.green(`  ✓ Created ${cssPath}`));
  }

  const relativeImport = path
    .relative(path.dirname(globalsFull), tokensDest)
    .replace(/\\/g, "/");
  const importLine = `@import "${relativeImport.startsWith(".") ? relativeImport : `./${relativeImport}`}";`;
  let globalsContent = fs.readFileSync(globalsFull, "utf-8");

  if (!globalsContent.includes("lootvm-ui.css")) {
    globalsContent = `${globalsContent.trimEnd()}\n\n${importLine}\n`;
    fs.writeFileSync(globalsFull, globalsContent, "utf-8");
    console.log(pc.green(`  ✓ Added LootVM tokens import to ${cssPath}`));
  } else {
    console.log(pc.yellow(`  ↷ LootVM tokens already imported in ${cssPath}`));
  }
}

function ensureTsconfigPaths(cwd: string) {
  if (hasTsPathAlias(cwd)) {
    console.log(pc.green("  ✓ tsconfig paths alias @/* detected"));
    return;
  }

  console.log(pc.yellow("\n  ⚠ tsconfig.json missing paths alias @/* → ./src/*"));
  console.log(pc.dim("    Add to compilerOptions.paths:"));
  console.log(pc.dim('    { "@/*": ["./src/*"] }'));
}

export async function runInit(cwd: string = process.cwd()) {
  const configPath = path.join(cwd, CONFIG_FILENAME);

  if (fs.existsSync(configPath)) {
    console.log(pc.yellow(`${CONFIG_FILENAME} already exists. Skipping init.`));
    return;
  }

  const cssPath = findGlobalsCss(cwd) ?? DEFAULT_CONFIG.tailwind.css;
  const config = {
    ...DEFAULT_CONFIG,
    tailwind: { css: cssPath },
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
  console.log(pc.green(`✓ Created ${CONFIG_FILENAME}`));

  setupUtils(cwd);
  setupTokens(cwd, cssPath);
  ensureTsconfigPaths(cwd);

  const packageManager = detectPackageManager(cwd);
  console.log(pc.cyan(`\nInstalling base dependencies via ${packageManager}...`));
  installDependencies(cwd, packageManager, BASE_DEPENDENCIES);

  console.log(pc.green("\n✓ LootVM UI initialized!"));
  console.log(pc.dim("  Next: npx lootvm-ui add button"));
}
