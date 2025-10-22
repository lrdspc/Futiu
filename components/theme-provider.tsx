'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * A theme provider component that wraps the application and provides theme context.
 *
 * This component uses the `next-themes` library to provide theme functionality to the
 * application. It should be used to wrap the root layout of the application.
 *
 * @param {ThemeProviderProps} props - The props for the component.
 * @returns {JSX.Element} The theme provider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
