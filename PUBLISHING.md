# Publishing to npm

## Prerequisites

1. **Create npm organization** `@lootvm` at https://www.npmjs.com/org/create
2. **Login locally:** `npm login`
3. **GitHub secret:** Add `NPM_TOKEN` to `sumariw4/lootvm-ui` → Settings → Secrets → Actions

## NPM Token Requirements

> **Important:** The `NPM_TOKEN` must be an **Automation** token, not a Publish token.
> If your npm account has 2FA/OTP enabled, Publish tokens will fail in CI with `EOTP` error.

### How to create an Automation token:

1. Go to https://www.npmjs.com/settings/~/tokens
2. Click **"Generate New Token"**
3. Select **"Automation"** as the token type
4. Copy the token and add it as `NPM_TOKEN` secret in GitHub

## Packages published

| Package | npm name | Published |
|---|---|---|
| `packages/ui` | `@lootvm/ui` | ✅ Yes |
| `packages/cli` | `lootvm-ui` | ✅ Yes |
| `packages/blocks` | `@lootvm/blocks` | ❌ No (private, embedded in CLI) |
| `packages/config/*` | — | ❌ No (private, internal configs) |

## Publish via Changesets (recommended)

```bash
pnpm changeset        # Create a changeset describing your changes
pnpm version-packages # Apply changeset versions
git add . && git commit -m "chore: version packages"
git push              # Push to master → GitHub Actions auto-publishes
```

## Manual publish (fallback)

```bash
pnpm build
cd packages/ui && npm publish --access public
cd ../cli && npm publish --access public
```

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `EOTP` | Token is not "Automation" type | Regenerate as Automation token |
| `403 Forbidden` | Token lacks publish access | Check npm org membership |
| `404 Not Found` | Package/scope doesn't exist yet | Create `@lootvm` org on npm first |
| `ENEEDAUTH` | No token configured | Add `NPM_TOKEN` to GitHub Secrets |
