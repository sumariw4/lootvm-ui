import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOCK_USAGE } from "../packages/registry-docs/src/block-docs.ts";
import { COMPONENT_DOCS } from "../packages/registry-docs/src/component-docs.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const UI_SRC = path.join(ROOT, "packages/ui/src");
const CLI_REGISTRY = path.join(ROOT, "packages/cli/registry");
const MANIFEST_PATH = path.join(ROOT, "packages/cli/src/registry/index.json");
const DOCS_PATH = path.join(ROOT, "packages/cli/src/registry/docs.json");
const BLOCKS_DOCS_PATH = path.join(ROOT, "packages/cli/src/registry/blocks-docs.json");
const TOKENS_DEST = path.join(CLI_REGISTRY, "tokens.css");
const TOKENS_SOURCE = path.join(ROOT, "packages/cli/assets/lootvm-variables.css");
const INTERNAL_TOKENS = path.resolve(
  ROOT,
  "../lootvm-ui-internal/packages/config/tailwind/tokens.css",
);

const UI_PACKAGE_JSON = JSON.parse(
  fs.readFileSync(path.join(ROOT, "packages/ui/package.json"), "utf-8"),
) as { dependencies: Record<string, string> };

function extractRegistryDependencies(content: string): string[] {
  const deps = new Set<string>();
  const regex = /from\s+["']\.\/([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    deps.add(match[1].replace(/\.(tsx|ts)$/, ""));
  }
  return [...deps];
}

function extractNpmDependencies(content: string): string[] {
  const deps = new Set<string>();
  const regex = /from\s+["']((?:@[^/"']+\/[^"']+|[^"']+))["']/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    const pkg = match[1];
    if (pkg.startsWith(".") || pkg === "react" || pkg === "react-dom") continue;
    deps.add(pkg);
  }
  return [...deps];
}

function resolveVersion(pkg: string): string {
  return UI_PACKAGE_JSON.dependencies[pkg] ?? "latest";
}

function writeDocsManifests() {
  fs.mkdirSync(path.dirname(DOCS_PATH), { recursive: true });
  fs.writeFileSync(DOCS_PATH, JSON.stringify(COMPONENT_DOCS, null, 2));
  fs.writeFileSync(BLOCKS_DOCS_PATH, JSON.stringify(BLOCK_USAGE, null, 2));
  console.log(`Docs manifest: ${Object.keys(COMPONENT_DOCS).length} component entries`);
  console.log(`Blocks docs: ${Object.keys(BLOCK_USAGE).length} block entries`);
}

function copyTokens() {
  const source = fs.existsSync(INTERNAL_TOKENS) ? INTERNAL_TOKENS : TOKENS_SOURCE;
  fs.mkdirSync(path.dirname(TOKENS_DEST), { recursive: true });
  fs.copyFileSync(source, TOKENS_DEST);
  console.log(`Tokens copied from ${path.relative(ROOT, source)}`);
}

function copyRegistryFiles() {
  const componentsSrc = path.join(UI_SRC, "components");
  const componentsDest = path.join(CLI_REGISTRY, "components");
  const utilsDest = path.join(CLI_REGISTRY, "utils");

  fs.rmSync(CLI_REGISTRY, { recursive: true, force: true });
  fs.mkdirSync(componentsDest, { recursive: true });
  fs.mkdirSync(utilsDest, { recursive: true });
  fs.mkdirSync(path.join(CLI_REGISTRY, "blocks"), { recursive: true });

  fs.copyFileSync(path.join(UI_SRC, "utils/cn.ts"), path.join(utilsDest, "cn.ts"));

  const manifest: Record<
    string,
    { file: string; registryDependencies: string[]; npmDependencies: Record<string, string> }
  > = {};

  for (const entry of fs.readdirSync(componentsSrc)) {
    if (!/\.(tsx|ts)$/.test(entry)) continue;
    const slug = entry.replace(/\.(tsx|ts)$/, "");
    const srcPath = path.join(componentsSrc, entry);
    const destPath = path.join(componentsDest, entry);
    fs.copyFileSync(srcPath, destPath);

    const content = fs.readFileSync(srcPath, "utf-8");
    const npmDeps = extractNpmDependencies(content);
    const npmDependencies: Record<string, string> = {};
    for (const dep of npmDeps) {
      npmDependencies[dep] = resolveVersion(dep);
    }

    manifest[slug] = {
      file: entry,
      registryDependencies: extractRegistryDependencies(content),
      npmDependencies,
    };
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Registry built: ${Object.keys(manifest).length} components`);

  writeDocsManifests();
  copyTokens();
}

copyRegistryFiles();
