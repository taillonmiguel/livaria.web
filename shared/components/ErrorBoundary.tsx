"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Algo deu errado</h2>
              <p className="text-gray-600 mb-6">Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</p>
              <details className="text-left mb-6">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">Detalhes do erro</summary>
                <p className="mt-2 text-xs text-gray-400 font-mono bg-gray-100 p-2 rounded">
                  {this.state.error?.toString()}
                </p>
              </details>
              <button
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors"
                onClick={() => window.location.reload()}
              >
                Recarregar página
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
