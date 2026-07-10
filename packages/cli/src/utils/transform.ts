import type { ComponentsConfig } from "./config.js";

export function transformImports(content: string, config: ComponentsConfig): string {
  let result = content;

  result = result.replace(
    /from\s+["']\.\.\/utils\/cn["']/g,
    `from "${config.aliases.utils}"`,
  );

  result = result.replace(
    /from\s+["']\.\/([^"']+)["']/g,
    (_match, dep: string) => {
      const slug = dep.replace(/\.(tsx|ts)$/, "");
      return `from "${config.aliases.ui}/${slug}"`;
    },
  );

  const blocksAlias = config.aliases.blocks ?? "@/components/blocks";

  result = result.replace(
    /from\s+["']@\/components\/ui\/([^"']+)["']/g,
    (_match, dep: string) => `from "${config.aliases.ui}/${dep}"`,
  );

  result = result.replace(
    /from\s+["']@\/components\/blocks\/([^"']+)["']/g,
    (_match, dep: string) => `from "${blocksAlias}/${dep}"`,
  );

  return result;
}

export function transformBlockImports(content: string, config: ComponentsConfig): string {
  let result = content;

  result = result.replace(
    /from\s+["']\.\.\/utils\/cn["']/g,
    `from "${config.aliases.utils}"`,
  );

  const blocksAlias = config.aliases.blocks ?? "@/components/blocks";

  result = result.replace(
    /from\s+["']@\/components\/ui\/([^"']+)["']/g,
    (_match, dep: string) => `from "${config.aliases.ui}/${dep}"`,
  );

  result = result.replace(
    /from\s+["']@\/components\/blocks\/([^"']+)["']/g,
    (_match, dep: string) => `from "${blocksAlias}/${dep}"`,
  );

  return result;
}
