import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";
import { runAdd } from "../commands/add.js";
import { runInit } from "../commands/init.js";
import { CONFIG_FILENAME, type ComponentsConfig } from "../utils/config.js";
import {
  blocksMap,
  formatItemDetail,
  getTokensCss,
  isBlock,
  isComponent,
  listBlocks,
  listComponents,
  resolveRegistrySlug,
  searchItems,
  blocksDocsMap,
  docsMap,
} from "./registry-data.js";

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;

function textResult(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

function getAuditChecklist(): string {
  return `# LootVM UI Project Checklist

1. Run \`npx lootvm-ui init\` to create \`components.json\`
2. Ensure \`@/*\` path alias exists in tsconfig.json
3. Import design tokens in globals.css (\`src/styles/lootvm-ui.css\`)
4. Install \`cn\` utility at \`@/lib/utils\`
5. Add components via \`npx lootvm-ui add <slug>\` or \`pnpm add @lootvm/ui\`
6. Use LootVM variants (e.g. Button \`variant="primary"\`, not shadcn \`default\`)
7. Wrap app sections with \`TooltipProvider\` when using tooltips
8. Use \`Field\` + \`Label\` + \`Input\` for accessible forms`;
}

export function createMcpServer(): Server {
  const server = new Server(
    {
      name: "lootvm-ui",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "list_items",
        description: "List LootVM UI components and/or blocks from the registry",
        inputSchema: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["component", "block", "all"],
              description: "Filter by item type (default: all)",
            },
          },
        },
      },
      {
        name: "search_items",
        description: "Search LootVM UI components and blocks by name, export, or description",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Search query" },
          },
          required: ["query"],
        },
      },
      {
        name: "view_items",
        description:
          "Get full documentation for components or blocks: props, usage, dependencies, install commands",
        inputSchema: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: { type: "string" },
              description: "Component or block slugs (e.g. button, dialog, dashboard-01)",
            },
          },
          required: ["items"],
        },
      },
      {
        name: "get_item_examples",
        description: "Get usage examples and import snippets for a component or block",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Component or block slug" },
          },
          required: ["query"],
        },
      },
      {
        name: "get_design_tokens",
        description: "Get LootVM UI design tokens (CSS variables, colors, typography, motion)",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_audit_checklist",
        description: "Get a checklist for setting up LootVM UI correctly in a project",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_project_config",
        description: "Read and validate components.json in the current project",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "init_project",
        description: "Initialize LootVM UI in the current project (creates components.json, cn util, tokens)",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "add_items",
        description: "Add components or blocks to the current project via lootvm-ui CLI",
        inputSchema: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: { type: "string" },
              description: "Component or block slugs to install",
            },
          },
          required: ["items"],
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const cwd = process.cwd();

    try {
      switch (request.params.name) {
        case "list_items": {
          const input = z
            .object({ type: z.enum(["component", "block", "all"]).optional() })
            .parse(request.params.arguments ?? {});
          const type = input.type ?? "all";

          if (type === "component") {
            return textResult(
              `Components (${listComponents().length}):\n${listComponents().join(", ")}`,
            );
          }
          if (type === "block") {
            return textResult(`Blocks (${listBlocks().length}):\n${listBlocks().join(", ")}`);
          }

          return textResult(
            [
              `Components (${listComponents().length}):`,
              listComponents().join(", "),
              "",
              `Blocks (${listBlocks().length}):`,
              listBlocks().join(", "),
            ].join("\n"),
          );
        }

        case "search_items": {
          const { query } = z.object({ query: z.string() }).parse(request.params.arguments);
          const results = searchItems(query);
          if (results.length === 0) {
            return textResult(`No items found for "${query}".`);
          }
          return textResult(`Found ${results.length} item(s):\n${results.join(", ")}`);
        }

        case "view_items": {
          const { items } = z.object({ items: z.array(z.string()) }).parse(request.params.arguments);
          const sections: string[] = [];

          for (const item of items) {
            const detail = formatItemDetail(item);
            if (detail) {
              sections.push(detail);
            } else {
              sections.push(`## ${item}\n\nNot found in LootVM UI registry.`);
            }
          }

          return textResult(sections.join("\n\n---\n\n"));
        }

        case "get_item_examples": {
          const { query } = z.object({ query: z.string() }).parse(request.params.arguments);

          if (isBlock(query)) {
            const doc = blocksDocsMap[query];
            if (!doc) {
              return textResult(`No examples found for block "${query}".`);
            }
            return textResult(
              [
                `Block: ${query}`,
                "",
                "Import:",
                doc.importCode,
                "",
                "Example:",
                doc.exampleCode,
                "",
                "Route:",
                doc.routeNote,
              ].join("\n"),
            );
          }

          const resolved = resolveRegistrySlug(query);
          const doc = docsMap[query] ?? docsMap[resolved];
          if (!doc) {
            return textResult(`No examples found for "${query}".`);
          }

          const cliImport =
            doc.imports.length > 0
              ? `import { ${doc.imports.join(", ")} } from "@/components/ui/${resolved}"`
              : "No import required.";

          return textResult(
            [
              `Component: ${query}`,
              "",
              "CLI import:",
              cliImport,
              "",
              "npm import:",
              doc.imports.length > 0
                ? `import { ${doc.imports.join(", ")} } from "@lootvm/ui"`
                : "No import required.",
              "",
              "Usage:",
              doc.usage,
            ].join("\n"),
          );
        }

        case "get_design_tokens": {
          const tokens = getTokensCss();
          if (!tokens) {
            return textResult("Design tokens file not found in registry.");
          }
          return textResult(tokens);
        }

        case "get_audit_checklist": {
          return textResult(getAuditChecklist());
        }

        case "get_project_config": {
          const configPath = path.join(cwd, CONFIG_FILENAME);
          if (!fs.existsSync(configPath)) {
            return textResult(
              `No ${CONFIG_FILENAME} found in ${cwd}.\n\nRun init_project first:\n\`npx lootvm-ui init\``,
            );
          }

          const config = JSON.parse(fs.readFileSync(configPath, "utf-8")) as ComponentsConfig;
          return textResult(
            [
              `${CONFIG_FILENAME} found at ${configPath}:`,
              "",
              "```json",
              JSON.stringify(config, null, 2),
              "```",
              "",
              "Install commands:",
              ...PACKAGE_MANAGERS.map((manager) => {
                const runner =
                  manager === "pnpm"
                    ? "pnpm dlx"
                    : manager === "npm"
                      ? "npx"
                      : manager === "yarn"
                        ? "yarn dlx"
                        : "bunx --bun";
                return `- ${runner} lootvm-ui add <slug>`;
              }),
            ].join("\n"),
          );
        }

        case "init_project": {
          await runInit(cwd);
          return textResult(`LootVM UI initialized in ${cwd}. Run add_items to install components.`);
        }

        case "add_items": {
          const { items } = z.object({ items: z.array(z.string()) }).parse(request.params.arguments);
          const configPath = path.join(cwd, CONFIG_FILENAME);

          if (!fs.existsSync(configPath)) {
            return textResult(
              `Error: ${CONFIG_FILENAME} not found. Run init_project first before add_items.`,
            );
          }

          for (const item of items) {
            if (!isComponent(item) && !isBlock(item)) {
              return textResult(`Error: "${item}" not found in LootVM UI registry.`);
            }
          }

          const logs: string[] = [];
          const originalLog = console.log;
          const originalError = console.error;
          console.log = (...args: unknown[]) => {
            logs.push(args.map(String).join(" "));
          };
          console.error = (...args: unknown[]) => {
            logs.push(args.map(String).join(" "));
          };

          try {
            await runAdd(items, cwd);
          } finally {
            console.log = originalLog;
            console.error = originalError;
          }

          const blockInfo = items
            .filter((item) => isBlock(item))
            .map((item) => `- ${item}: ${blocksMap[item].description}`)
            .join("\n");

          return textResult(
            [
              `Installed: ${items.join(", ")}`,
              blockInfo ? `\nBlocks:\n${blockInfo}` : "",
              logs.length > 0 ? `\nOutput:\n${logs.join("\n")}` : "",
            ]
              .filter(Boolean)
              .join("\n"),
          );
        }

        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return textResult(`Error: ${message}`);
    }
  });

  return server;
}

export async function startMcpServer(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
