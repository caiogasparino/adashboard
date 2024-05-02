import { create } from 'zustand'
import { Permission } from '../@types/permission'

type PermissionStore = {
  permissions: Permission
  setPermissions: (permissions: Permission) => void
}

export const initialPermissions: Permission = JSON.parse(localStorage.getItem('permissions') || 'null') || {
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

export const usePermissionStore = create<PermissionStore>(set => ({
  permissions: initialPermissions,
  setPermissions: permissions => {
    localStorage.setItem('permissions', JSON.stringify(permissions))
    set({ permissions })
  },
}))
