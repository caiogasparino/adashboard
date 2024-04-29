import { create } from 'zustand'

type Theme = 'dark' | 'light'

type ThemeStore = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>(set => ({
  theme: 'dark',
  setTheme: theme => {
    set({ theme })
    try {
      localStorage.setItem('theme', theme)
    } catch (error) {
      console.error('Erro ao salvar o tema no AsyncStorage:', error)
    }
  },
}))
;(() => {
  try {
    const theme = localStorage.getItem('theme')
    if (theme) {
      useThemeStore.setState({ theme } as ThemeStore)
    }
  } catch (error) {
    console.error('Erro ao carregar o tema do AsyncStorage:', error)
  }
})()
