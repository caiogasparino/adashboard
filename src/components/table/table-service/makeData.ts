import { ReactNode } from 'react'

export function createData(
  services: string,
  prod: ReactNode,
  beta: ReactNode,
  dba: ReactNode,
  api: ReactNode,
  vars: number,
  actions: ReactNode,
) {
  return { services, prod, beta, dba, api, vars, actions }
}

export const rows = [
  createData(
    'Service Name',
    'Status Prod',
    'Status Beta',
    'Status DBA',
    'Status API',
    0,
    0,
  ),
]
