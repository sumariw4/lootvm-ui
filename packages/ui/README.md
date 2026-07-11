# @lootvm/ui

React component library built with Radix UI, Tailwind CSS, and Class Variance Authority.

46 accessible, composable components with LootVM design tokens. Tree-shakeable subpath exports for optimal bundle size.

**Requirements:** React 18 or 19 · Tailwind CSS 4

## Installation

```bash
npm install @lootvm/ui
```

## Setup

### 1. Design tokens

Import LootVM CSS variables into your global stylesheet. If you use the CLI, `lootvm-ui init` copies `lootvm-ui.css` automatically. Otherwise, add the token file from the [lootvm-ui CLI package](https://www.npmjs.com/package/lootvm-ui) and import it:

```css
/* src/app/globals.css */
@import "../styles/lootvm-ui.css";
```

### 2. Tooltip provider

Wrap your app (or sections using tooltips) with `TooltipProvider`:

```tsx
import { TooltipProvider } from "@lootvm/ui/tooltip";

export function App({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
```

### 3. Toast (optional)

Add `<Toaster />` to your root layout when using toast notifications:

```tsx
import { Toaster } from "@lootvm/ui/toaster";
```

## Usage

### Barrel import

```tsx
import { Button, Dialog, DialogContent, DialogTrigger } from "@lootvm/ui";
```

### Subpath import (recommended for tree-shaking)

```tsx
import { Button } from "@lootvm/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@lootvm/ui/dialog";
```

### Example

```tsx
import { Button } from "@lootvm/ui/button";

export function SubmitForm() {
  return (
    <Button variant="primary" isLoading={false}>
      Save changes
    </Button>
  );
}
```

## Component catalog

### Form & input

| Component | Import path |
|-----------|-------------|
| Button | `@lootvm/ui/button` |
| Checkbox | `@lootvm/ui/checkbox` |
| Field | `@lootvm/ui/field` |
| Fieldset | `@lootvm/ui/fieldset` |
| Form | `@lootvm/ui/form` |
| Input | `@lootvm/ui/input` |
| Input OTP | `@lootvm/ui/input-otp` |
| Label | `@lootvm/ui/label` |
| Radio | `@lootvm/ui/radio` |
| Radio Group | `@lootvm/ui/radio-group` |
| Select | `@lootvm/ui/select` |
| Slider | `@lootvm/ui/slider` |
| Switch | `@lootvm/ui/switch` |
| Toggle | `@lootvm/ui/toggle` |
| Toggle Group | `@lootvm/ui/toggle-group` |

### Overlays & feedback

| Component | Import path |
|-----------|-------------|
| Alert Dialog | `@lootvm/ui/alert-dialog` |
| Dialog | `@lootvm/ui/dialog` |
| Drawer | `@lootvm/ui/drawer` |
| Hover Card | `@lootvm/ui/hover-card` |
| Popover | `@lootvm/ui/popover` |
| Progress | `@lootvm/ui/progress` |
| Sheet | `@lootvm/ui/sheet` |
| Toast | `@lootvm/ui/toast` |
| Toaster | `@lootvm/ui/toaster` |
| Tooltip | `@lootvm/ui/tooltip` |
| useToast | `@lootvm/ui/use-toast` |

### Data display & navigation

| Component | Import path |
|-----------|-------------|
| Accordion | `@lootvm/ui/accordion` |
| Avatar | `@lootvm/ui/avatar` |
| Badge | `@lootvm/ui/badge` |
| Breadcrumb | `@lootvm/ui/breadcrumb` |
| Calendar | `@lootvm/ui/calendar` |
| Card | `@lootvm/ui/card` |
| Carousel | `@lootvm/ui/carousel` |
| Chart | `@lootvm/ui/chart` |
| Collapsible | `@lootvm/ui/collapsible` |
| Command | `@lootvm/ui/command` |
| Context Menu | `@lootvm/ui/context-menu` |
| Dropdown Menu | `@lootvm/ui/dropdown-menu` |
| Menubar | `@lootvm/ui/menubar` |
| Navigation Menu | `@lootvm/ui/navigation-menu` |
| Pagination | `@lootvm/ui/pagination` |
| Resizable | `@lootvm/ui/resizable` |
| Scroll Area | `@lootvm/ui/scroll-area` |
| Separator | `@lootvm/ui/separator` |
| Sidebar | `@lootvm/ui/sidebar` |
| Table | `@lootvm/ui/table` |
| Tabs | `@lootvm/ui/tabs` |
| Toolbar | `@lootvm/ui/toolbar` |

### Utilities

| Export | Import path |
|--------|-------------|
| cn | `@lootvm/ui/utils` |

## LootVM vs shadcn/ui

| | shadcn/ui | LootVM UI |
|---|-----------|-----------|
| Button default variant | `default` | `primary` |
| Form primitives | — | `Field`, `Fieldset` |
| Loading state | — | `Button isLoading` prop |
| Distribution | Copy-to-project only | npm package **or** CLI copy |

Use `variant="primary"` instead of shadcn's `default`. Prefer `Field` + `Label` + `Input` for accessible forms.

## Alternative: copy-to-project

For full source ownership (shadcn-style), use the CLI instead of npm:

```bash
npx lootvm-ui init
npx lootvm-ui add button dialog
```

See [lootvm-ui on npm](https://www.npmjs.com/package/lootvm-ui) for CLI and MCP documentation.

## Peer dependencies

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```

## Links

- [Documentation](https://lootvm.dev)
- [GitHub](https://github.com/sumariw4/lootvm-ui)
- [lootvm-ui CLI](https://www.npmjs.com/package/lootvm-ui) — add components with MCP support

## License

MIT
