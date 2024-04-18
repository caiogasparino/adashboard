import { ReactNode } from 'react'

export function createData(
  PACKAGE: string,
  VERSION: ReactNode,
  ACTIONS: ReactNode,
) {
  return { PACKAGE, VERSION, ACTIONS }
}

export const rows = [createData('PACKAGE NAME', 'VERSION NUMBER', 0)]
