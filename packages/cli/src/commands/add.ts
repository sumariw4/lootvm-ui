import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";
import type { ComponentsConfig } from "../utils/config.js";
import { CONFIG_FILENAME } from "../utils/config.js";
import {
  aliasToPath,
  detectPackageManager,
  ensureDir,
  resolveUiFilePath,
} from "../utils/paths.js";
import { installDependencies } from "../utils/install.js";
import { transformBlockImports, transformImports } from "../utils/transform.js";
import registry from "../registry/index.json" with { type: "json" };
import blocksRegistry from "../registry/blocks.json" with { type: "json" };

type RegistryEntry = {
  file: string;
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
};

type BlockFile = { source: string; target: string };

type BlockEntry = {
  type: "block";
  description: string;
  category: string;
  files: BlockFile[];
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
};

const registryMap = registry as Record<string, RegistryEntry>;
const blocksMap = blocksRegistry as Record<string, BlockEntry>;

/** Docs-friendly slugs that differ from registry keys. */
const SLUG_ALIASES: Record<string, string> = {
  "radio-group": "radio",
};

function resolveSlug(slug: string): string {
  return SLUG_ALIASES[slug] ?? slug;
}

function getCliRoot(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

function getRegistryComponentPath(slug: string): string {
  const resolved = resolveSlug(slug);
  const entry = registryMap[resolved];
  if (!entry) {
    throw new Error(`Component "${slug}" not found in registry.`);
  }
  return path.join(getCliRoot(), "registry/components", entry.file);
}

function getBlockSourcePath(slug: string, source: string): string {
  return path.join(getCliRoot(), "registry/blocks", slug, source);
}

function resolveComponentTree(slug: string): string[] {
  const resolved = new Set<string>();
  const queue = [resolveSlug(slug)];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (resolved.has(current)) continue;
    if (!registryMap[current]) {
      throw new Error(`Component "${current}" not found in registry.`);
    }
    resolved.add(current);
    for (const dep of registryMap[current].registryDependencies) {
      if (!resolved.has(dep)) queue.push(dep);
    }
  }

  return [...resolved];
}

function collectNpmDependencies(
  componentSlugs: string[],
  blockSlugs: string[],
): Record<string, string> {
  const deps: Record<string, string> = {};
  for (const slug of componentSlugs) {
    Object.assign(deps, registryMap[slug].npmDependencies);
  }
  for (const slug of blockSlugs) {
    Object.assign(deps, blocksMap[slug].npmDependencies);
  }
  return deps;
}

function resolveBlockFilePath(target: string, cwd: string, config: ComponentsConfig): string {
  if (target.startsWith("@/")) {
    if (target.startsWith("@/components/ui/")) {
      const slug = target.replace("@/components/ui/", "").replace(/\.(tsx|ts)$/, "");
      return resolveUiFilePath(config, slug, cwd);
    }
    if (target.startsWith("@/components/blocks/")) {
      const blocksAlias = config.aliases.blocks ?? "@/components/blocks";
      const rel = target.replace("@/components/blocks/", "");
      return path.join(aliasToPath(blocksAlias, cwd), rel) + (path.extname(rel) ? "" : ".tsx");
    }
    return aliasToPath(target.replace(/\.(tsx|ts)$/, ""), cwd) + path.extname(target);
  }

  const hasSrcDir = fs.existsSync(path.join(cwd, "src"));
  const normalized = target.replace(/\\/g, "/");

  if (hasSrcDir && (normalized.startsWith("app/") || normalized.startsWith("components/"))) {
    return path.join(cwd, "src", target);
  }

  return path.join(cwd, target);
}

async function addComponents(config: ComponentsConfig, slugs: Set<string>, cwd: string) {
  const written: string[] = [];

  for (const slug of slugs) {
    const destPath = resolveUiFilePath(config, slug, cwd, registryMap[slug].file);
    if (fs.existsSync(destPath)) {
      console.log(pc.yellow(`  ↷ Skipping ${slug} (already exists)`));
      continue;
    }

    const sourcePath = getRegistryComponentPath(slug);
    const content = fs.readFileSync(sourcePath, "utf-8");
    const transformed = transformImports(content, config);

    ensureDir(destPath);
    fs.writeFileSync(destPath, transformed, "utf-8");
    written.push(slug);
    console.log(pc.green(`  ✓ Added ${slug}`));
  }

  return written;
}

async function addBlocks(blockSlugs: string[], config: ComponentsConfig, cwd: string) {
  const written: string[] = [];

  for (const slug of blockSlugs) {
    const entry = blocksMap[slug];
    if (!entry) {
      throw new Error(`Block "${slug}" not found in registry.`);
    }

    console.log(pc.cyan(`\nAdding block: ${slug}`));

    for (const file of entry.files) {
      const destPath = resolveBlockFilePath(file.target, cwd, config);
      if (fs.existsSync(destPath)) {
        console.log(pc.yellow(`  ↷ Skipping ${file.target} (already exists)`));
        continue;
      }

      const sourcePath = getBlockSourcePath(slug, file.source);
      const content = fs.readFileSync(sourcePath, "utf-8");
      const transformed = transformBlockImports(content, config);

      ensureDir(destPath);
      fs.writeFileSync(destPath, transformed, "utf-8");
      written.push(file.target);
      console.log(pc.green(`  ✓ Added ${file.target}`));
    }
  }

  return written;
}

export async function runAdd(components: string[], cwd: string = process.cwd()) {
  const configPath = path.join(cwd, CONFIG_FILENAME);
  if (!fs.existsSync(configPath)) {
    throw new Error(`${CONFIG_FILENAME} not found. Run \`npx lootvm-ui init\` first.`);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8")) as ComponentsConfig;
  const componentSlugs = new Set<string>();
  const blockSlugs: string[] = [];

  for (const item of components) {
    if (blocksMap[item]) {
      blockSlugs.push(item);
      for (const dep of blocksMap[item].registryDependencies) {
        for (const slug of resolveComponentTree(dep)) {
          componentSlugs.add(slug);
        }
      }
    } else if (registryMap[resolveSlug(item)]) {
      for (const slug of resolveComponentTree(item)) {
        componentSlugs.add(slug);
      }
    } else {
      throw new Error(`"${item}" not found in component or block registry.`);
    }
  }

  const writtenComponents = await addComponents(config, componentSlugs, cwd);
  const writtenBlocks = await addBlocks(blockSlugs, config, cwd);

  if (writtenComponents.length === 0 && writtenBlocks.length === 0) {
    console.log(pc.dim("No new files added."));
    return;
  }

  const npmDeps = collectNpmDependencies([...componentSlugs], blockSlugs);
  if (Object.keys(npmDeps).length > 0) {
    const packageManager = detectPackageManager(cwd);
    console.log(pc.cyan(`\nInstalling dependencies via ${packageManager}...`));
    installDependencies(cwd, packageManager, npmDeps);
  }

  console.log(pc.green(`\nDone!`));
  if (writtenComponents.length > 0) {
    console.log(pc.dim(`  Components: import from "${config.aliases.ui}/<component>"`));
  }
  if (writtenBlocks.length > 0) {
    console.log(pc.dim(`  Blocks: route files added under app/ and components/blocks/`));
  }
}

export function listRegistryComponents(): string[] {
  return Object.keys(registryMap).sort();
}

export function listRegistryBlocks(): string[] {
  return Object.keys(blocksMap).sort();
}

export function listAllRegistryItems(): { components: string[]; blocks: string[] } {
  return {
    components: listRegistryComponents(),
    blocks: listRegistryBlocks(),
  };
}
