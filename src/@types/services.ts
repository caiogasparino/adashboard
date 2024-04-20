import { Variable } from './variables'

export interface Service {
  name: string
  aproducao: [string, boolean, string[]]
  abeta: [string, boolean, string[]]
  database: boolean
  api: boolean
  variables: Variable[]
}
