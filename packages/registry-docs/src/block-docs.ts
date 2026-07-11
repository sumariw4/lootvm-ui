export const BLOCK_USAGE: Record<string, { importCode: string; exampleCode: string; routeNote: string }> = {
  "dashboard-01": {
    importCode: `import { DashboardShell } from "@/components/blocks/dashboard/dashboard-shell";`,
    exampleCode: `export default function DashboardPage() {
  return <DashboardShell />;
}`,
    routeNote: "Files are installed to app/dashboard/page.tsx. Visit /dashboard after installation.",
  },
  "layout-grid-01": {
    importCode: `import { LayoutShell } from "@/components/blocks/layout/layout-shell";`,
    exampleCode: `export default function LayoutPage() {
  return (
    <LayoutShell title="Page Layout">
      {/* Your content */}
    </LayoutShell>
  );
}`,
    routeNote: "Installed at app/layout-grid-01/page.tsx. Visit /layout-grid-01 after installation.",
  },
  "layout-grid-02": {
    importCode: `import { LayoutShell } from "@/components/blocks/layout-grid-02/layout-shell";`,
    exampleCode: `export default function LayoutPage() {
  return (
    <LayoutShell title="Page Layout">
      {/* Your content */}
    </LayoutShell>
  );
}`,
    routeNote: "Installed at app/layout-grid-02/page.tsx. Visit /layout-grid-02 after installation.",
  },
  "auth-login-centered": {
    importCode: `import { LoginFormCentered } from "@/components/blocks/auth/login-form-centered";`,
    exampleCode: `export default function LoginPage() {
  return <LoginFormCentered />;
}`,
    routeNote: "Installed at app/login/page.tsx. Visit /login after installation.",
  },
  "auth-login-split": {
    importCode: `import { LoginFormSplit } from "@/components/blocks/auth/login-form-split";`,
    exampleCode: `export default function LoginPage() {
  return <LoginFormSplit />;
}`,
    routeNote: "Installed at app/login-split/page.tsx. Visit /login-split after installation.",
  },
};
