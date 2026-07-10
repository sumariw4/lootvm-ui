import * as React from "react";
import { cn } from "../utils/cn";
import { Label } from "./label";

interface FieldContextValue {
  id: string;
  error?: boolean;
}

const FieldContext = React.createContext<FieldContextValue | undefined>(undefined);

export function useField() {
  const context = React.useContext(FieldContext);
  return context;
}

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, error, id: idProp, ...props }, ref) => {
    const id = React.useId();
    const fieldId = idProp || id;

    return (
      <FieldContext.Provider value={{ id: fieldId, error }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FieldContext.Provider>
    );
  }
);
Field.displayName = "Field";

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const field = useField();
  return (
    <Label
      ref={ref}
      htmlFor={field?.id}
      className={cn(field?.error && "text-destructive", className)}
      {...props}
    />
  );
});
FieldLabel.displayName = "FieldLabel";

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
});
FieldDescription.displayName = "FieldDescription";

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const field = useField();
  if (!field?.error || !children) return null;

  return (
    <p
      ref={ref}
      className={cn("text-xs font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
});
FieldError.displayName = "FieldError";

export { Field, FieldLabel, FieldDescription, FieldError };
