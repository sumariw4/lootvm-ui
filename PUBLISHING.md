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
| `packages/cli` | `lootvm-ui` | ⏳ Pending republish |
| `packages/blocks` | `@lootvm/blocks` | ❌ No (private, embedded in CLI) |
| `packages/config/*` | — | ❌ No (private, internal configs) |

## Versioning rules

> **Do not** edit `version` in `package.json` manually.
> Always use `pnpm changeset` → `pnpm version-packages`.

`@lootvm/ui` and `lootvm-ui` are linked in `.changeset/config.json` (`fixed`) so they bump together on future releases.

## Publish via Changesets (recommended)

```bash
pnpm changeset        # Create a changeset describing your changes
pnpm version-packages # Apply changeset versions
git add . && git commit -m "chore: version packages"
git push              # Push to master → GitHub Actions auto-publishes
```

## Manual publish (fallback)

Set a valid Automation token first:

```bash
export NPM_TOKEN=<your-automation-token>
```

Then build and publish:

```bash
pnpm build --filter=lootvm-ui
cd packages/cli && npm publish --access public
```

Verify auth before publishing:

```bash
npm whoami --registry https://registry.npmjs.org/
```

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `EOTP` | Token is not "Automation" type | Regenerate as Automation token |
| `403 Forbidden` | Token lacks publish access | Check npm org membership |
| `404 Not Found` on `npm view` | Package not published or was unpublished | Expected for new/republished packages; changesets will attempt publish |
| `401 Unauthorized` | Invalid or expired `NPM_TOKEN` | Regenerate Automation token; update GitHub secret and local env |
| `ENEEDAUTH` | No token configured | Add `NPM_TOKEN` to GitHub Secrets |
| `E409 Failed to save packument` | Ghost packument after full unpublish | Wait 24h, bump to a new version, try manual publish once; if it persists, open npm support ticket (see below) |
| Version cannot be reused | `package@version` is immutable on npm | Bump to a new version (`0.1.3+`); never republish `lootvm-ui@0.1.0` |

### E409 after unpublishing `lootvm-ui`

If you fully unpublished `lootvm-ui`, npm keeps internal metadata (ghost packument) even though `npm view lootvm-ui` returns 404. Republishing the same name is blocked for 24 hours; after that, publish a **new version** (not a previously published one).

**Do not** retry CI publish repeatedly — each failed attempt can worsen registry state.

#### npm Support ticket template

Open https://www.npmjs.com/support if manual publish still fails with E409:

```
Subject: Cannot republish package after full unpublish (E409 ghost packument)

Package name: lootvm-ui
Unpublished at: 2026-07-10T04:19:10.333Z
Previously published versions: 0.1.0 only
Version attempting to publish: 0.1.3
Error: E409 Conflict - PUT https://registry.npmjs.org/lootvm-ui - Failed to save packument
Packument _rev: 3-8f51f77defd2c7e7beab09a157c40259

npm view lootvm-ui returns 404 but publish fails. Please clear the ghost packument
so I can republish under the same package name.
```

## Post-publish verification

```bash
npm view lootvm-ui version
npm view lootvm-ui time --json
npx lootvm-ui@latest --help
```

Expected CI log after success:

```
Published lootvm-ui@<version>
@lootvm/ui is not being published (already published)
```
