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
  updatePackage: (
    name: string,
    version: string,
    updatedPackage: Package,
  ) => void
}

export const usePackageStore = create<PackageStore>((set) => ({
  packages: [],
  setPackages: (packages) => set({ packages }),
  updatePackage: (name, version, updatedPackage) => {
    set((state) => ({
      packages: state.packages.map((pkg) => {
        if (pkg.name === name && pkg.version === version) {
          return updatedPackage
        }
        return pkg
      }),
    }))
  },
}))
