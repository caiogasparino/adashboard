import { create } from 'zustand'
import { Permission } from '../@types/permission'

type PermissionStore = {
  permissions: Permission
  setPermissions: (permissions: Permission) => void
}

export const initialState: Permission = {
  service: {
    create: false,
    delete: false,
    edit: false,
  },
  variables: {
    create: false,
    delete: false,
    edit: false,
  },
  packages: {
    create: false,
    delete: false,
    edit: false,
  },
  UserAuthorized: false,
}

export const usePermissionStore = create<PermissionStore>((set) => ({
  permissions: initialState,
  setPermissions: (permissions) => set({ permissions }),
}))
