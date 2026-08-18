import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * clsx  → conditional classes.  twMerge → later class wins on conflicts.
 * Together they let a component set defaults that a caller can still override.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
