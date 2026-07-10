# LootVM UI

React component library and CLI for building modern UIs with Tailwind CSS and Radix UI.

## Packages

| Package | npm | Description |
|---------|-----|-------------|
| `@lootvm/ui` | [npm](https://www.npmjs.com/package/@lootvm/ui) | React component library |
| `lootvm-ui` | [npm](https://www.npmjs.com/package/lootvm-ui) | CLI to add components and blocks to your project |
| `@lootvm/blocks` | — | Page blocks source (bundled in CLI) |

## Install

```bash
# Component library
npm install @lootvm/ui

# CLI
npx lootvm-ui init
npx lootvm-ui add button
npx lootvm-ui add dashboard-01
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

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning.

```bash
pnpm changeset          # describe your changes
pnpm version-packages   # bump versions
pnpm release            # build and publish to npm
```

## License

MIT
