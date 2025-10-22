import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function to merge Tailwind CSS classes.
 *
 * This function is a wrapper around `clsx` and `tailwind-merge` that allows you to conditionally
 * apply and merge Tailwind CSS classes. It's useful for creating dynamic and reusable components.
 *
 * @param {...ClassValue[]} inputs - A list of class values to be merged. These can be strings,
 * objects, or arrays.
 * @returns {string} The merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
