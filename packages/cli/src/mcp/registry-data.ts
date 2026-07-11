import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import registry from "../registry/index.json" with { type: "json" };
import blocksRegistry from "../registry/blocks.json" with { type: "json" };
import docsRegistry from "../registry/docs.json" with { type: "json" };
import blocksDocs from "../registry/blocks-docs.json" with { type: "json" };
import propsRegistry from "../registry/props.json" with { type: "json" };

export type RegistryEntry = {
  file: string;
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
};

export type BlockEntry = {
  type: "block";
  description: string;
  category: string;
  files: { source: string; target: string }[];
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
};

export type ComponentDoc = {
  imports: string[];
  usage: string;
};

export type BlockDoc = {
  importCode: string;
  exampleCode: string;
  routeNote: string;
};

export type PropsEntry = {
  exports: string[];
  props: Record<string, string | string[] | Record<string, string[]>>;
  interfaces?: Record<string, string>;
  notes?: string[];
};

export const registryMap = registry as Record<string, RegistryEntry>;
export const blocksMap = blocksRegistry as Record<string, BlockEntry>;
export const docsMap = docsRegistry as Record<string, ComponentDoc>;
export const blocksDocsMap = blocksDocs as Record<string, BlockDoc>;
export const propsMap = propsRegistry as Record<string, PropsEntry>;

/** Docs slugs that map to a different CLI component file name. */
export const SLUG_ALIASES: Record<string, string> = {
  "radio-group": "radio",
};

export function getCliRoot(): string {
  let current = path.dirname(fileURLToPath(import.meta.url));

  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(current, "registry", "components"))) {
      return current;
    }

    const packageJsonPath = path.join(current, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8")) as { name?: string };
      if (pkg.name === "lootvm-ui") {
        return current;
      }
    }

    current = path.dirname(current);
  }

  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

export function resolveRegistrySlug(slug: string): string {
  return SLUG_ALIASES[slug] ?? slug;
}

export function isBlock(slug: string): boolean {
  return slug in blocksMap;
}

export function isComponent(slug: string): boolean {
  return resolveRegistrySlug(slug) in registryMap;
}

export function listComponents(): string[] {
  const slugs = new Set(Object.keys(registryMap));
  slugs.add("radio-group");
  return [...slugs].sort();
}

export function listBlocks(): string[] {
  return Object.keys(blocksMap).sort();
}

export function getComponentSource(slug: string, maxLines = 80): string | null {
  const resolved = resolveRegistrySlug(slug);
  const entry = registryMap[resolved];
  if (!entry) return null;

  const sourcePath = path.join(getCliRoot(), "registry/components", entry.file);
  if (!fs.existsSync(sourcePath)) return null;

  const lines = fs.readFileSync(sourcePath, "utf-8").split("\n");
  const truncated = lines.length > maxLines;
  const snippet = lines.slice(0, maxLines).join("\n");
  return truncated ? `${snippet}\n// ... (${lines.length - maxLines} more lines)` : snippet;
}

export function getTokensCss(): string {
  const tokensPath = path.join(getCliRoot(), "registry/tokens.css");
  if (fs.existsSync(tokensPath)) {
    return fs.readFileSync(tokensPath, "utf-8");
  }
  return "";
}

export function formatProps(props: PropsEntry["props"]): string {
  return Object.entries(props)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: ${value.join(" | ")}`;
      }
      if (typeof value === "object") {
        return `${key}: ${JSON.stringify(value)}`;
      }
      return `${key}: ${value}`;
    })
    .join("\n");
}

export function formatInstallCommands(slug: string): string {
  const resolved = resolveRegistrySlug(slug);
  const managers = ["pnpm", "npm", "yarn", "bun"] as const;
  const runners: Record<(typeof managers)[number], string> = {
    pnpm: "pnpm dlx",
    npm: "npx",
    yarn: "yarn dlx",
    bun: "bunx --bun",
  };

  const lines = managers.map((manager) => {
    return `- ${manager} CLI: ${runners[manager]} lootvm-ui add ${slug}`;
  });

  lines.push("- npm package: pnpm add @lootvm/ui");
  lines.push(`- npm package subpath: @lootvm/ui/${resolved}`);

  return lines.join("\n");
}

export function formatItemDetail(slug: string): string | null {
  if (isBlock(slug)) {
    return formatBlockDetail(slug);
  }

  const resolved = resolveRegistrySlug(slug);
  const entry = registryMap[resolved];
  if (!entry) return null;

  const doc = docsMap[slug] ?? docsMap[resolved];
  const props = propsMap[slug] ?? propsMap[resolved];
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const sections = [
    `## ${title} (@lootvm/ui)`,
    "",
    "### Install",
    formatInstallCommands(slug),
    "",
    "### Import (npm)",
    doc?.imports?.length
      ? `import { ${doc.imports.join(", ")} } from "@lootvm/ui"`
      : `import { /* see exports */ } from "@lootvm/ui"`,
    "",
    "### Import (CLI)",
    doc?.imports?.length
      ? `import { ${doc.imports.join(", ")} } from "@/components/ui/${resolved}"`
      : `import from "@/components/ui/${resolved}"`,
  ];

  if (props) {
    sections.push("", "### Exports", props.exports.join(", "));
    if (Object.keys(props.props).length > 0) {
      sections.push("", "### Props", formatProps(props.props));
    }
    if (props.notes?.length) {
      sections.push("", "### Notes", props.notes.map((note) => `- ${note}`).join("\n"));
    }
  }

  sections.push(
    "",
    "### Registry dependencies",
    entry.registryDependencies.length > 0 ? entry.registryDependencies.join(", ") : "(none)",
    "",
    "### npm dependencies",
    Object.keys(entry.npmDependencies).length > 0
      ? Object.entries(entry.npmDependencies)
          .map(([pkg, version]) => `${pkg}@${version}`)
          .join(", ")
      : "(none)",
  );

  if (doc?.usage) {
    sections.push("", "### Usage", doc.usage);
  }

  const source = getComponentSource(slug);
  if (source) {
    sections.push("", "### Source (preview)", "```tsx", source, "```");
  }

  return sections.join("\n");
}

function formatBlockDetail(slug: string): string | null {
  const entry = blocksMap[slug];
  const doc = blocksDocsMap[slug];
  if (!entry) return null;

  const sections = [
    `## Block: ${slug}`,
    "",
    entry.description,
    "",
    `Category: ${entry.category}`,
    "",
    "### Install",
    formatInstallCommands(slug),
    "",
    "### Files",
    ...entry.files.map((file) => `- ${file.target}`),
    "",
    "### Registry dependencies",
    entry.registryDependencies.join(", "),
    "",
    "### npm dependencies",
    Object.entries(entry.npmDependencies)
      .map(([pkg, version]) => `${pkg}@${version}`)
      .join(", "),
  ];

  if (doc) {
    sections.push(
      "",
      "### Import",
      doc.importCode,
      "",
      "### Example",
      doc.exampleCode,
      "",
      "### Route",
      doc.routeNote,
    );
  }

  return sections.join("\n");
}

export function searchItems(query: string): string[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];

  const results = new Set<string>();

  for (const slug of listComponents()) {
    const haystack = [
      slug,
      resolveRegistrySlug(slug),
      ...(propsMap[slug]?.exports ?? []),
      ...(docsMap[slug]?.imports ?? []),
    ]
      .join(" ")
      .toLowerCase();

    if (haystack.includes(normalized)) {
      results.add(slug);
    }
  }

  for (const slug of listBlocks()) {
    const entry = blocksMap[slug];
    const haystack = [slug, entry.description, entry.category].join(" ").toLowerCase();
    if (haystack.includes(normalized)) {
      results.add(slug);
    }
  }

  return [...results].sort();
}
