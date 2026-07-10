import { Card, CardContent } from "@/components/ui/card";
import { LayoutShell } from "@/components/blocks/layout/layout-shell";

export default function LayoutGrid01Page() {
  return (
    <LayoutShell title="Page Layout">
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <Card key={n} className="min-h-[180px] border-dashed">
            <CardContent className="flex h-full items-center justify-center p-6">
              <span className="text-sm text-muted-foreground">Content area {n}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="min-h-[240px] border-dashed">
        <CardContent className="flex h-full items-center justify-center p-6">
          <span className="text-sm text-muted-foreground">Wide content section</span>
        </CardContent>
      </Card>
    </LayoutShell>
  );
}
