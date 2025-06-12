"use client"

import type { ReactNode } from "react"
import { ErrorBoundary } from "@/shared/components/ErrorBoundary"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}
