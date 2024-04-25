import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/build/modern/production.js'
import { StrictMode, Suspense, lazy, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'styled-components'
import Loading from './components/loading'
import { LoadingProvider, useLoading } from './context'
import { THEME_DARK, THEME_LIGHT } from './design/theme'
import IndexRoutes from './routes/index.routes'
import { useThemeStore } from './store/theme.store'

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    d => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

function App() {
  const { isLoading } = useLoading()
  const { theme } = useThemeStore()
  const [showDevtools, setShowDevtools] = useState(false)

  const THEME = theme === 'light' ? THEME_LIGHT : THEME_DARK

  useEffect(() => {
    ;(window as any).toggleDevtools = () => setShowDevtools(old => !old)
  }, [])

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={THEME}>
          <Toaster />
          <LoadingProvider>
            <Loading spinner={false} isLoading={isLoading} />
            <IndexRoutes />
          </LoadingProvider>
        </ThemeProvider>
        {showDevtools && <ReactQueryDevtools initialIsOpen />}
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
