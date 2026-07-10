import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../utils/cn";
import { useField } from "./field";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { error?: boolean }
>(({ className, error: errorProp, id: idProp, ...props }, ref) => {
  const field = useField();
  const id = idProp || field?.id;
  const error = errorProp || field?.error;

  return (
    <SliderPrimitive.Root
      ref={ref}
      id={id}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className={cn("absolute h-full bg-primary", error && "bg-destructive")} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={cn("block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", error && "border-destructive focus-visible:ring-destructive")} />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
