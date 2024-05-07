export interface Permission {
  service: {
    create: boolean
    delete: boolean
    edit: boolean
  }
  variables: {
    create: boolean
    delete: boolean
    edit: boolean
  }
  packages: {
    create: boolean
    delete: boolean
    edit: boolean
  }
  UserAuthorized: boolean
}

export interface AuthUser {
  UserAuthorized: boolean | null
}
