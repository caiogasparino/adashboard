import { Variable } from './variables'

export interface Service {
  name: string
  database: boolean
  api: boolean
  variables: Variable[]
}
