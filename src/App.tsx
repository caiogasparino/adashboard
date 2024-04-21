import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/build/modern/production.js'
import { StrictMode, Suspense, lazy, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'styled-components'
import { LoadingProvider } from './context'
import { theme } from './design/theme'
import IndexRoutes from './routes/index.routes'

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

function App() {
  const [showDevtools, setShowDevtools] = useState(false)
  useEffect(() => {
    ;(window as any).toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Toaster />
          <LoadingProvider>
            <IndexRoutes />
          </LoadingProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen />
        {showDevtools && (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        )}
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App
