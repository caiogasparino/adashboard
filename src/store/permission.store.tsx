import { create } from 'zustand'
import { AuthUser, Permission } from '../@types/permission'

type PermissionStore = {
  authUser: AuthUser
  permissions: Permission
  setAuthUser: (authUser: AuthUser) => void
  setPermissions: (permissions: Permission) => void
}

export const authUserState: AuthUser = {
  UserAuthorized: null,
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
  authUser: authUserState,
  permissions: initialPermissions,
  setAuthUser: authUser => {
    set({ authUser })
  },
  setPermissions: permissions => {
    localStorage.setItem('permissions', JSON.stringify(permissions))
    set({ permissions })
  },
}))
