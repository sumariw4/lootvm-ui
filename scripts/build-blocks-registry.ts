import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOCKS_SRC = path.join(ROOT, "packages/blocks/src");
const BLOCKS_MANIFEST = path.join(ROOT, "packages/blocks/index.json");
const CLI_BLOCKS_REGISTRY = path.join(ROOT, "packages/cli/registry/blocks");
const CLI_BLOCKS_MANIFEST = path.join(ROOT, "packages/cli/src/registry/blocks.json");

type BlockFile = { source: string; target: string };

type BlockEntry = {
  type: "block";
  description: string;
  category: string;
  files: BlockFile[];
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
};

function copyBlocksRegistry() {
  const manifest = JSON.parse(fs.readFileSync(BLOCKS_MANIFEST, "utf-8")) as Record<
    string,
    BlockEntry
  >;

  fs.rmSync(CLI_BLOCKS_REGISTRY, { recursive: true, force: true });
  fs.mkdirSync(CLI_BLOCKS_REGISTRY, { recursive: true });

  for (const [slug, entry] of Object.entries(manifest)) {
    const blockSrcDir = path.join(BLOCKS_SRC, slug);
    const blockDestDir = path.join(CLI_BLOCKS_REGISTRY, slug);
    fs.mkdirSync(blockDestDir, { recursive: true });

    for (const file of entry.files) {
      const srcPath = path.join(blockSrcDir, file.source);
      const destPath = path.join(blockDestDir, file.source);
      if (!fs.existsSync(srcPath)) {
        throw new Error(`Block file not found: ${srcPath}`);
      }
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }

  fs.mkdirSync(path.dirname(CLI_BLOCKS_MANIFEST), { recursive: true });
  fs.writeFileSync(CLI_BLOCKS_MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`Blocks registry built: ${Object.keys(manifest).length} blocks`);
}

copyBlocksRegistry();
