import { create } from 'zustand'

type Link = {
  version: string
  link: string
}

type Package = {
  name: string
  version: string
  links: Link[]
}

type PackageStore = {
  packages: Package[]
  setPackages: (packages: Package[]) => void
}

export const usePackageStore = create<PackageStore>((set) => ({
  packages: [],
  setPackages: (packages) => set({ packages }),
}))
