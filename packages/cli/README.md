# lootvm-ui

CLI to add LootVM UI components and page blocks to your project — with MCP support for AI assistants.

Built with Radix UI, Tailwind CSS, and TypeScript. Inspired by [shadcn/ui](https://ui.shadcn.com), with LootVM-specific design tokens and form primitives.

**Requirements:** Node.js >= 22 · Tailwind CSS 4 · React 18/19

## Quick start

```bash
npx lootvm-ui init
npx lootvm-ui add button dialog
npx lootvm-ui add dashboard-01
```

After `init`, import components from your project aliases:

```tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
```

## Commands

| Command | Description |
|---------|-------------|
| `lootvm-ui init` | Create `components.json`, `cn` utility, and design tokens |
| `lootvm-ui add <items...>` | Copy components or blocks into your project |
| `lootvm-ui list` | List all 46 components and 5 blocks |
| `lootvm-ui mcp` | Start the MCP server (stdio) |
| `lootvm-ui mcp init --client <client>` | Generate MCP config for an AI client |

Supported MCP clients: `cursor`, `claude`, `vscode`, `codex`

## What `init` sets up

1. **`components.json`** — project configuration (see below)
2. **`@/lib/utils`** — `cn()` helper (clsx + tailwind-merge)
3. **`src/styles/lootvm-ui.css`** — design tokens, imported into your globals CSS
4. **Base dependencies** — `clsx`, `tailwind-merge`, `class-variance-authority`

Make sure your `tsconfig.json` has a `@/*` path alias before running `init`.

## `components.json`

```json
{
  "$schema": "https://lootvm.dev/schema.json",
  "tsx": true,
  "tailwind": {
    "css": "src/app/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "blocks": "@/components/blocks"
  }
}
```

## Blocks

Full-page templates installed via `lootvm-ui add <block>`:

| Block | Category | Route created |
|-------|----------|---------------|
| `dashboard-01` | dashboard | `app/dashboard/page.tsx` |
| `layout-grid-01` | layouts | `app/layout-grid-01/page.tsx` |
| `layout-grid-02` | layouts | `app/layout-grid-02/page.tsx` |
| `auth-login-centered` | authentication | `app/login/page.tsx` |
| `auth-login-split` | authentication | `app/login-split/page.tsx` |

Blocks automatically install their component dependencies (e.g. `sidebar`, `chart`, `card`).

## MCP integration

Connect LootVM UI to your AI assistant so it can browse the registry, add components, and scaffold pages.

```bash
npx lootvm-ui mcp init --client cursor
```

This writes MCP config to `.cursor/mcp.json` (or the equivalent for your client). Restart your AI client and enable the `lootvm-ui` server.

### MCP tools

| Tool | Description |
|------|-------------|
| `list_items` | List components and/or blocks from the registry |
| `search_items` | Search by name, export, or description |
| `view_items` | Full docs: props, usage, dependencies, install commands |
| `get_item_examples` | Import snippets and usage examples |
| `get_design_tokens` | CSS variables, colors, typography, motion |
| `get_audit_checklist` | Setup checklist for LootVM UI in a project |
| `get_project_config` | Read and validate `components.json` |
| `init_project` | Run `lootvm-ui init` in the current project |
| `add_items` | Add components or blocks to the current project |

Example prompts:

- "List all LootVM UI components"
- "Add button and dialog to my project"
- "Create a login page using auth-login-centered block"

## LootVM vs shadcn/ui

| | shadcn/ui | LootVM UI |
|---|-----------|-----------|
| Button default variant | `default` | `primary` |
| Form primitives | — | `Field`, `Fieldset` |
| Loading state | — | `Button isLoading` |
| Design tokens | shadcn CSS vars | `lootvm-variables.css` |
| MCP server | — | Built-in (9 tools) |

## Alternative: npm library

If you prefer importing from `node_modules` instead of copying source:

```bash
npm install @lootvm/ui
```

See [@lootvm/ui on npm](https://www.npmjs.com/package/@lootvm/ui) for library usage.

## Links

- [Documentation](https://lootvm.dev)
- [GitHub](https://github.com/sumariw4/lootvm-ui)
- [@lootvm/ui](https://www.npmjs.com/package/@lootvm/ui) — React component library

## License

MIT
