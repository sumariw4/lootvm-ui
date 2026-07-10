# Publishing to npm

## Prerequisites

1. **Create npm organization** `@lootvm` at https://www.npmjs.com/org/create
2. **Login locally:** `npm login`
3. **GitHub secret:** Add `NPM_TOKEN` (automation token) to `sumariw4/lootvm-ui` repo settings

## Publish via Changesets (recommended)

```bash
pnpm changeset
pnpm version-packages
pnpm release
```

## Manual publish

```bash
pnpm build
cd packages/ui && npm publish --access public
cd ../cli && npm publish --access public
```

## Known issues

- `@lootvm/ui` requires the `@lootvm` npm scope to exist and your account must have publish access
- `lootvm-ui` is an unscoped package — ensure your npm account owns it or the name is available
