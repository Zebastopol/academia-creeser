import { Component } from 'react'

/**
 * Error Boundary global que captura errores de renderizado en React.
 * Muestra un fallback amigable en lugar de romper toda la app.
 *
 * @param {{ children: React.ReactNode, fallback?: React.ReactNode }} props
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
          <div className="max-w-md">
            <div className="flex justify-center mb-6">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full"
                style={{ backgroundColor: 'var(--color-primary, #714790)', opacity: 0.15 }}
              >
                <span className="text-3xl">⚠️</span>
              </div>
            </div>

            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Algo salió mal
            </h1>
            <p className="mb-6 text-gray-600">
              Ha ocurrido un error inesperado. Puedes intentar recargar la página
              o volver al inicio.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg shadow-sm"
                style={{ backgroundColor: 'var(--color-primary, #714790)' }}
              >
                Intentar de nuevo
              </button>
              <a
                href="/"
                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
              >
                Ir al inicio
              </a>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 p-4 text-left text-xs text-red-700 bg-red-50 rounded-lg border border-red-200">
                <summary className="cursor-pointer font-semibold">
                  Detalle del error (solo desarrollo)
                </summary>
                <pre className="mt-2 overflow-auto whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
