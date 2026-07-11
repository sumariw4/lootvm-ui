import { Command } from "commander";
import pc from "picocolors";
import { runInit } from "./commands/init.js";
import { listAllRegistryItems, runAdd } from "./commands/add.js";
import { runMcpInit, type McpClient } from "./commands/mcp-init.js";
import { startMcpServer } from "./mcp/server.js";

const program = new Command();

program
  .name("lootvm-ui")
  .description("LootVM UI CLI — add components to your project")
  .version("0.1.5");

program
  .command("init")
  .description("Initialize LootVM UI in your project")
  .action(async () => {
    try {
      await runInit();
    } catch (error) {
      console.error(pc.red(error instanceof Error ? error.message : String(error)));
      process.exit(1);
    }
  });

program
  .command("add")
  .description("Add components to your project")
  .argument("<components...>", "component names (e.g. button dialog)")
  .action(async (components: string[]) => {
    try {
      await runAdd(components);
    } catch (error) {
      console.error(pc.red(error instanceof Error ? error.message : String(error)));
      process.exit(1);
    }
  });

program
  .command("list")
  .description("List available components and blocks")
  .action(() => {
    const { components, blocks } = listAllRegistryItems();
    console.log(pc.cyan(`Available components (${components.length}):\n`));
    console.log(components.join(", "));
    console.log(pc.cyan(`\nAvailable blocks (${blocks.length}):\n`));
    console.log(blocks.join(", "));
  });

const mcpCommand = program
  .command("mcp")
  .description("Model Context Protocol server for AI assistants")
  .action(async () => {
    await startMcpServer();
  });

mcpCommand
  .command("init")
  .description("Generate MCP config for Cursor, Claude, VS Code, or Codex")
  .requiredOption("--client <client>", "cursor | claude | vscode | codex")
  .action(async (options: { client: string }) => {
    const client = options.client as McpClient;
    const valid: McpClient[] = ["cursor", "claude", "vscode", "codex"];
    if (!valid.includes(client)) {
      console.error(pc.red(`Invalid client "${client}". Use: ${valid.join(", ")}`));
      process.exit(1);
    }

    try {
      await runMcpInit(client);
    } catch (error) {
      console.error(pc.red(error instanceof Error ? error.message : String(error)));
      process.exit(1);
    }
  });

program.parse();
