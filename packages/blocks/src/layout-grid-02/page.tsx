import { Card, CardContent } from "@/components/ui/card";
import { LayoutShell } from "@/components/blocks/layout-grid-02/layout-shell";

export default function LayoutGrid02Page() {
  return (
    <LayoutShell title="Page Layout">
      <div className="grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Card key={n} className="aspect-[4/3] border-dashed">
            <CardContent className="flex h-full items-center justify-center p-4">
              <span className="text-sm text-muted-foreground">Module {n}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="min-h-[200px] border-dashed">
        <CardContent className="flex h-full items-center justify-center p-6">
          <span className="text-sm text-muted-foreground">Full-width section</span>
        </CardContent>
      </Card>
    </LayoutShell>
  );
}
