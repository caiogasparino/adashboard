export interface Package {
  name: string
  version: string
  links: PackageLink[]
}

export interface PackageLink {
  version: string
  link: string
}

export interface PackageResponse {
  packages: Package[]
}
