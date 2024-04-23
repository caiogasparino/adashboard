import { Variable } from './variables'

export interface Service {
  name: string
  database: boolean
  api: boolean
  variables: Variable[]
}

export interface Services {
  name: string
  aproducao: string[]
  abeta: string[]
  database: boolean
  api: boolean
  variables: string[]
}

export interface ServicesResponse {
  services: Services[]
}
