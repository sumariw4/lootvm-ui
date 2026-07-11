# LootVM UI

React component library and CLI for building modern UIs with Tailwind CSS and Radix UI.

Two ways to consume: install from npm (`@lootvm/ui`) or copy source into your project (`lootvm-ui` CLI). Both include MCP support for AI assistants.

**Documentation:** [lootvm.dev](https://lootvm.dev)

## Architecture

```
Developer
├── npm install @lootvm/ui          → import from node_modules
└── npx lootvm-ui init / add        → copy source into project
    ├── MCP server (9 tools)        → AI assistant integration
    ├── 46 components               → Radix + Tailwind + CVA
    └── 5 page blocks               → dashboard, layouts, auth
```

| Package | npm | README |
|---------|-----|--------|
| `@lootvm/ui` | [npm](https://www.npmjs.com/package/@lootvm/ui) | [packages/ui/README.md](./packages/ui/README.md) |
| `lootvm-ui` | [npm](https://www.npmjs.com/package/lootvm-ui) | [packages/cli/README.md](./packages/cli/README.md) |
| `@lootvm/registry-docs` | [npm](https://www.npmjs.com/package/@lootvm/registry-docs) | [packages/registry-docs/README.md](./packages/registry-docs/README.md) |
| `@lootvm/blocks` | — | Page blocks source (bundled in CLI) |

## Quick start

### CLI (copy-to-project)

```bash
npx lootvm-ui init
npx lootvm-ui add button dialog
npx lootvm-ui add dashboard-01
```

### npm library

```bash
npm install @lootvm/ui
```

```tsx
import { Button } from "@lootvm/ui/button";
```

### MCP for AI assistants

```bash
npx lootvm-ui mcp init --client cursor
```

## Development

Requires Node.js >= 22 and pnpm.

```bash
pnpm install
pnpm dev      # watch @lootvm/ui
pnpm build    # build all packages
pnpm lint
pnpm typecheck
```

## Release

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning. See [PUBLISHING.md](./PUBLISHING.md) for npm publish details.

```bash
pnpm changeset          # describe your changes
pnpm version-packages   # bump versions
pnpm release            # build and publish to npm
```

## License

MIT
