import { Command } from "commander";
import pc from "picocolors";
import { runInit } from "./commands/init.js";
import { listAllRegistryItems, runAdd } from "./commands/add.js";

const program = new Command();

program
  .name("lootvm-ui")
  .description("LootVM UI CLI — add components to your project")
  .version("0.1.0");

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

program.parse();
