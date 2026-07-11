import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Project } from "ts-morph";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COMPONENTS_DIR = path.join(ROOT, "packages/ui/src/components");
const PROPS_PATH = path.join(ROOT, "packages/cli/src/registry/props.json");

const DOCS_SLUG_ALIASES: Record<string, string> = {
  radio: "radio-group",
};

const COMPONENT_NOTES: Record<string, string[]> = {
  button: ["Default variant is 'primary', not shadcn 'default'"],
};

type PropValue = string | string[] | Record<string, string[]>;

type ComponentPropsEntry = {
  exports: string[];
  props: Record<string, PropValue>;
  interfaces?: Record<string, string>;
  notes?: string[];
};

function extractCvaVariants(content: string): Record<string, string[]> {
  const variants: Record<string, string[]> = {};
  const variantsMatch = content.match(/variants:\s*\{([\s\S]*?)\n\s*\}/);
  if (!variantsMatch) return variants;

  const block = variantsMatch[1];
  const groupRegex = /(\w+):\s*\{([^}]*)\}/g;
  let groupMatch: RegExpExecArray | null;
  while ((groupMatch = groupRegex.exec(block)) !== null) {
    const groupName = groupMatch[1];
    const keys = [...groupMatch[2].matchAll(/(\w+):/g)].map((m) => m[1]);
    if (keys.length > 0) {
      variants[groupName] = keys;
    }
  }
  return variants;
}

function extractExports(sourceFile: import("ts-morph").SourceFile): string[] {
  const exports = new Set<string>();

  for (const [name] of sourceFile.getExportedDeclarations()) {
    if (name && !name.endsWith("Props")) {
      exports.add(name);
    }
  }

  const content = sourceFile.getFullText();
  for (const match of content.matchAll(/export\s+(?:const|function)\s+([A-Za-z0-9_]+)/g)) {
    exports.add(match[1]);
  }

  return [...exports].sort();
}

function extractInterfaceProps(
  project: Project,
  filePath: string,
  content: string,
): { props: Record<string, PropValue>; interfaces: Record<string, string> } {
  const props: Record<string, PropValue> = {};
  const interfaces: Record<string, string> = {};
  const sourceFile = project.addSourceFileAtPath(filePath);

  for (const iface of sourceFile.getInterfaces()) {
    if (!iface.isExported()) continue;
    const name = iface.getName();
    interfaces[name] = iface.getText();

    if (!name.endsWith("Props")) continue;

    for (const member of iface.getProperties()) {
      const propName = member.getName();
      const typeText = member.getType().getText(member).replace(/\s+/g, " ").trim();
      if (typeText === "boolean") {
        props[propName] = "boolean";
      } else if (typeText.includes("|")) {
        const literals = typeText
          .split("|")
          .map((part) => part.trim().replace(/^["']|["']$/g, ""))
          .filter((part) => part && part !== "undefined" && !part.startsWith("React."));
        if (literals.length > 0 && literals.every((l) => /^[\w-]+$/.test(l))) {
          props[propName] = literals;
        } else {
          props[propName] = typeText;
        }
      } else {
        props[propName] = typeText;
      }
    }
  }

  Object.assign(props, extractCvaVariants(content));
  return { props, interfaces };
}

function buildPropsManifest() {
  const project = new Project({
    compilerOptions: {
      jsx: 2,
      target: 99,
    },
    skipAddingFilesFromTsConfig: true,
  });

  const manifest: Record<string, ComponentPropsEntry> = {};

  for (const entry of fs.readdirSync(COMPONENTS_DIR)) {
    if (!/\.(tsx|ts)$/.test(entry)) continue;
    const slug = entry.replace(/\.(tsx|ts)$/, "");
    const filePath = path.join(COMPONENTS_DIR, entry);
    const content = fs.readFileSync(filePath, "utf-8");
    const { props, interfaces } = extractInterfaceProps(project, filePath, content);
    const exports = extractExports(project.getSourceFileOrThrow(filePath));

    const docSlug = DOCS_SLUG_ALIASES[slug] ?? slug;
    const notes = COMPONENT_NOTES[slug] ?? COMPONENT_NOTES[docSlug];

    manifest[docSlug] = {
      exports,
      props,
      ...(Object.keys(interfaces).length > 0 ? { interfaces } : {}),
      ...(notes ? { notes } : {}),
    };

    if (docSlug !== slug) {
      manifest[slug] = manifest[docSlug];
    }
  }

  fs.mkdirSync(path.dirname(PROPS_PATH), { recursive: true });
  fs.writeFileSync(PROPS_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Props manifest: ${Object.keys(manifest).length} entries`);
}

buildPropsManifest();
