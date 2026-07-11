"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { cn } from "../utils/cn";
import { Progress } from "./progress";

export interface FileUploadFile {
  file: File;
  progress?: number;
  error?: string;
}

export interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  value?: FileUploadFile[];
  onChange?: (files: FileUploadFile[]) => void;
  onUpload?: (file: File) => Promise<void>;
  className?: string;
  id?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileUpload({
  accept,
  maxSize,
  multiple = false,
  disabled = false,
  value = [],
  onChange,
  onUpload,
  className,
  id,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);

  const processFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const incoming = Array.from(fileList);
    const valid: FileUploadFile[] = [];

    for (const file of incoming) {
      if (maxSize && file.size > maxSize) {
        valid.push({ file, error: `Max size ${formatBytes(maxSize)}` });
        continue;
      }
      valid.push({ file, progress: onUpload ? 0 : undefined });
    }

    const next = multiple ? [...value, ...valid] : valid.slice(0, 1);
    onChange?.(next);

    if (onUpload) {
      for (let i = 0; i < next.length; i++) {
        const entry = next[i]!;
        if (entry.error) continue;
        try {
          await onUpload(entry.file);
          next[i] = { ...entry, progress: 100 };
          onChange?.([...next]);
        } catch {
          next[i] = { ...entry, error: "Upload failed" };
          onChange?.([...next]);
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    void processFiles(e.dataTransfer.files);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-labelledby={id ? `${id}-label` : undefined}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-6 transition-colors",
          dragOver && "border-primary bg-primary/5",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <Upload className="mb-2 size-8 text-muted-foreground" />
        <p id={id ? `${id}-label` : undefined} className="text-sm font-medium">
          Drop files here or click to browse
        </p>
        {accept && (
          <p className="mt-1 text-xs text-muted-foreground">Accepted: {accept}</p>
        )}
        {maxSize && (
          <p className="text-xs text-muted-foreground">
            Max size: {formatBytes(maxSize)}
          </p>
        )}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => void processFiles(e.target.files)}
        />
      </div>
      {value.length > 0 && (
        <ul className="space-y-2">
          {value.map((entry, i) => (
            <li
              key={`${entry.file.name}-${i}`}
              className="rounded-md border border-border p-2 text-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate">{entry.file.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatBytes(entry.file.size)}
                </span>
              </div>
              {entry.progress !== undefined && entry.progress < 100 && (
                <Progress value={entry.progress} className="mt-2 h-1" />
              )}
              {entry.error && (
                <p className="mt-1 text-xs text-destructive">{entry.error}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

FileUpload.displayName = "FileUpload";

export { FileUpload };
