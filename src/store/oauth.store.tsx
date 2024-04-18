import { create } from 'zustand'

interface OAuthState {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
}

const useOAuthStore = create<OAuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}))

export default useOAuthStore
