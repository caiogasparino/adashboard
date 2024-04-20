import { create } from 'zustand'
import { Service } from '../@types/services'

type ServiceStore = {
  services: Service[]
  setServices: (services: Service[]) => void
}

export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
}))
