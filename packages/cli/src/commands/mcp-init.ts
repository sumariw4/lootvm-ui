import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";

export type McpClient = "cursor" | "claude" | "vscode" | "codex";

const MCP_SERVER_CONFIG = {
  command: "npx",
  args: ["lootvm-ui@latest", "mcp"],
};

const CLIENT_TARGETS: Record<McpClient, { file: string; key: "mcpServers" | "servers" }> = {
  cursor: { file: ".cursor/mcp.json", key: "mcpServers" },
  claude: { file: ".mcp.json", key: "mcpServers" },
  vscode: { file: ".vscode/mcp.json", key: "servers" },
  codex: { file: "", key: "mcpServers" },
};

function mergeConfig(
  existing: Record<string, unknown>,
  key: "mcpServers" | "servers",
): Record<string, unknown> {
  const servers = (existing[key] as Record<string, unknown> | undefined) ?? {};
  return {
    ...existing,
    [key]: {
      ...servers,
      "lootvm-ui": MCP_SERVER_CONFIG,
    },
  };
}

export async function runMcpInit(client: McpClient, cwd: string = process.cwd()): Promise<void> {
  if (client === "codex") {
    console.log(pc.cyan("Add the following to ~/.codex/config.toml:\n"));
    console.log(`[mcp_servers.lootvm-ui]
command = "npx"
args = ["lootvm-ui@latest", "mcp"]
`);
    return;
  }

  const target = CLIENT_TARGETS[client];
  const configPath = path.join(cwd, target.file);
  const dir = path.dirname(configPath);

  let existing: Record<string, unknown> = {};
  if (fs.existsSync(configPath)) {
    existing = JSON.parse(fs.readFileSync(configPath, "utf-8")) as Record<string, unknown>;
  } else {
    fs.mkdirSync(dir, { recursive: true });
  }

  const merged = mergeConfig(existing, target.key);
  fs.writeFileSync(configPath, `${JSON.stringify(merged, null, 2)}\n`, "utf-8");

  console.log(pc.green(`✓ MCP config written to ${target.file}`));
  console.log(pc.dim("  Restart your AI client and enable the lootvm-ui MCP server."));
  console.log(pc.dim("\n  Example prompts:"));
  console.log(pc.dim('  - "List all LootVM UI components"'));
  console.log(pc.dim('  - "Add button and dialog to my project"'));
  console.log(pc.dim('  - "Create a login page using auth-login-centered block"'));
}

export function printMcpConfigSnippet(): void {
  console.log(JSON.stringify({ mcpServers: { "lootvm-ui": MCP_SERVER_CONFIG } }, null, 2));
}
