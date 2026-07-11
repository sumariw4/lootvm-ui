# Changesets

Folder ini dikelola oleh [@changesets/cli](https://github.com/changesets/changesets).

## Cara Menggunakan

### 1. Buat changeset saat melakukan perubahan:

```bash
pnpm changeset
```

### 2. Bump versi berdasarkan changesets:

```bash
pnpm version-packages
```

### 3. Publish ke npm:

```bash
pnpm release
```

Atau push ke `master` — GitHub Actions akan publish otomatis.

## Aturan penting

- **Jangan** edit field `version` di `package.json` secara manual.
- Selalu gunakan `pnpm changeset` lalu `pnpm version-packages`.
- `@lootvm/ui` dan `lootvm-ui` di-link lewat `fixed` di `config.json` — keduanya akan di-bump bersamaan pada release berikutnya.

Lihat [PUBLISHING.md](../PUBLISHING.md) untuk troubleshooting publish (termasuk error E409 setelah unpublish).
