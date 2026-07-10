import * as React from "react";
import { cn } from "../utils/cn";

const Fieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    className={cn(
      "space-y-4 rounded-lg border border-border p-6",
      className
    )}
    {...props}
  />
));
Fieldset.displayName = "Fieldset";

const FieldsetLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement>
>(({ className, ...props }, ref) => (
  <legend
    ref={ref}
    className={cn(
      "-ml-1 px-1 text-sm font-semibold text-foreground",
      className
    )}
    {...props}
  />
));
FieldsetLegend.displayName = "FieldsetLegend";

export { Fieldset, FieldsetLegend };
