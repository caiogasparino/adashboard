import { create } from 'zustand'
import { Services } from '../@types/services'

type ServiceStore = {
  services: Services[]
  setServices: (services: Services[]) => void
}

export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
}))
