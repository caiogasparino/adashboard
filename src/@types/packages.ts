export interface Package {
  id?: string
  name?: string
  version?: string
  links?: PackageLink[]
}

export interface PackageLink {
  version: string
  link: string
}

export interface PackageResponse {
  packages: Package[]
}
