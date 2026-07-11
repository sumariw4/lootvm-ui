"use client";

import { Star } from "lucide-react";
import { cn } from "../utils/cn";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

export interface RatingProps {
  mode?: "stars" | "nps";
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  labels?: { low?: string; high?: string };
}

function Rating({
  mode = "stars",
  value,
  onChange,
  disabled = false,
  className,
  id,
  labels,
}: RatingProps) {
  if (mode === "nps") {
    const items = Array.from({ length: 11 }, (_, i) => i);
    return (
      <div className={cn("space-y-2", className)} id={id}>
        <ToggleGroup
          type="single"
          value={value !== undefined ? String(value) : undefined}
          onValueChange={(v) => v && onChange?.(Number(v))}
          disabled={disabled}
          className="flex flex-wrap justify-center gap-1"
        >
          {items.map((n) => (
            <ToggleGroupItem
              key={n}
              value={String(n)}
              className="size-9 px-0 text-xs data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              aria-label={`Score ${n}`}
            >
              {n}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{labels?.low ?? "Not likely"}</span>
          <span>{labels?.high ?? "Very likely"}</span>
        </div>
      </div>
    );
  }

  const max = 5;
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      id={id}
      role="radiogroup"
      aria-label="Rating"
    >
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1;
        const filled = value !== undefined && star <= value;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            disabled={disabled}
            onClick={() => onChange?.(star)}
            className={cn(
              "rounded p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <Star
              className={cn(
                "size-6",
                filled
                  ? "fill-primary text-primary"
                  : "fill-transparent text-muted-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

Rating.displayName = "Rating";

export { Rating };
