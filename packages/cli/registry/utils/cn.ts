import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Menggabungkan class names dengan resolusi konflik Tailwind CSS.
 *
 * Menggunakan `clsx` untuk conditional class building,
 * lalu `twMerge` untuk menghapus konflik utility classes.
 *
 * @example
 * ```tsx
 * cn("px-4 py-2", isActive && "bg-primary", className)
 * // → "px-4 py-2 bg-primary ..."
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
