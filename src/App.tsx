import { StrictMode } from 'react'
import { ThemeProvider } from 'styled-components'
import { LoadingProvider } from './context'
import { theme } from './design/theme'
import IndexRoutes from './routes/index.routes'

function App() {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <IndexRoutes />
        </LoadingProvider>
      </ThemeProvider>
    </StrictMode>
  )
}

export default App
