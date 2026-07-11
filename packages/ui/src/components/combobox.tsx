"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "../utils/cn";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  mode?: "single" | "multi";
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  error?: boolean;
}

function Combobox({
  options,
  value,
  onChange,
  mode = "single",
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No results found.",
  disabled = false,
  className,
  id,
  error = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isMulti = mode === "multi";

  const selectedValues = React.useMemo(() => {
    if (isMulti) {
      return Array.isArray(value) ? value : value ? [value] : [];
    }
    return typeof value === "string" ? value : "";
  }, [value, isMulti]);

  const selectedLabels = React.useMemo(() => {
    if (isMulti) {
      const vals = selectedValues as string[];
      return vals
        .map((v) => options.find((o) => o.value === v)?.label ?? v)
        .filter(Boolean);
    }
    const v = selectedValues as string;
    return v ? [options.find((o) => o.value === v)?.label ?? v] : [];
  }, [options, selectedValues, isMulti]);

  const handleSelect = (optionValue: string) => {
    if (isMulti) {
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue];
      onChange?.(next);
    } else {
      onChange?.(optionValue);
      setOpen(false);
    }
  };

  const removeValue = (optionValue: string) => {
    if (!isMulti) return;
    const current = Array.isArray(value) ? value : [];
    onChange?.(current.filter((v) => v !== optionValue));
  };

  const handleRemoveKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    optionValue: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      removeValue(optionValue);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          className={cn(
            "h-auto min-h-10 w-full justify-between font-normal",
            error && "border-destructive",
            className,
          )}
        >
          <span className="flex flex-1 flex-wrap gap-1 text-left">
            {selectedLabels.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : isMulti ? (
              selectedLabels.map((label, i) => {
                const val = (selectedValues as string[])[i];
                return (
                  <Badge key={val} variant="secondary" className="gap-1">
                    {label}
                    <span
                      role="button"
                      tabIndex={0}
                      className="cursor-pointer rounded-full outline-none hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeValue(val!);
                      }}
                      onKeyDown={(e) => handleRemoveKeyDown(e, val!)}
                      aria-label={`Remove ${label}`}
                    >
                      <X className="size-3" aria-hidden="true" />
                    </span>
                  </Badge>
                );
              })
            ) : (
              selectedLabels[0]
            )}
          </span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = isMulti
                  ? (selectedValues as string[]).includes(option.value)
                  : selectedValues === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

Combobox.displayName = "Combobox";

export { Combobox };
