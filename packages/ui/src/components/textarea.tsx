import * as React from "react";
import { cn } from "../utils/cn";
import { useField } from "./field";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  describedBy?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error: errorProp,
      id: idProp,
      describedBy,
      "aria-describedby": ariaDescribedByProp,
      ...props
    },
    ref,
  ) => {
    const field = useField();
    const id = idProp || field?.id;
    const error = errorProp || field?.error;
    const ariaDescribedBy = ariaDescribedByProp ?? describedBy;

    return (
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={ariaDescribedBy}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm",
          "ring-offset-background placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-200",
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
