# @lootvm/registry-docs

Structured component and block usage documentation for the LootVM UI ecosystem.

This package exports usage data — import snippets, JSX examples, and block templates — consumed by the docs site and baked into the `lootvm-ui` CLI registry at build time.

> **Note:** Most users should install [`lootvm-ui`](https://www.npmjs.com/package/lootvm-ui) (CLI) or [`@lootvm/ui`](https://www.npmjs.com/package/@lootvm/ui) (component library) instead of this package directly.

## Installation

```bash
npm install @lootvm/registry-docs
```

## Exports

```tsx
import {
  COMPONENT_DOCS,
  BLOCK_USAGE,
  getComponentDoc,
  formatImportBlock,
  formatNpmImportBlock,
} from "@lootvm/registry-docs";
```

| Export | Type | Description |
|--------|------|-------------|
| `COMPONENT_DOCS` | `Record<string, ComponentDoc>` | Usage data for all 46 components |
| `BLOCK_USAGE` | `Record<string, BlockDoc>` | Usage data for 5 page blocks |
| `getComponentDoc` | `(slug: string) => ComponentDoc \| undefined` | Lookup a single component |
| `formatImportBlock` | `(slug: string) => string` | Format CLI-style import snippet |
| `formatNpmImportBlock` | `(slug: string) => string` | Format npm-style import snippet |

### Data shape

```ts
type ComponentDoc = {
  imports: string[];  // exported symbol names
  usage: string;      // JSX example
};
```

## Consumers

| Consumer | How it uses this package |
|----------|--------------------------|
| Docs site (`lootvm-ui-internal`) | Renders component showcases and usage examples |
| `lootvm-ui` CLI | Prebuild script serializes docs into `docs.json` and `blocks-docs.json` for MCP tools |

The CLI build pipeline (`scripts/build-cli-registry.ts`) reads from this package and embeds the data into the published `lootvm-ui` tarball — so MCP users get usage examples without installing this package separately.

## Contributing

To add or update component documentation:

1. Edit `src/component-docs.ts` for components or `src/block-docs.ts` for blocks
2. Rebuild: `pnpm build` (from the monorepo root or this package)
3. Rebuild the CLI registry: `pnpm prebuild --filter=lootvm-ui`

Each entry should include the exported symbol names and a minimal working JSX example.

## Links

- [lootvm-ui CLI](https://www.npmjs.com/package/lootvm-ui)
- [@lootvm/ui](https://www.npmjs.com/package/@lootvm/ui)
- [GitHub](https://github.com/sumariw4/lootvm-ui)

## License

MIT
