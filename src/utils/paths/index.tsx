const url = process.env.REACT_APP_API_URL

export const PATHS = {
  permission: ` ${url}/permission`,
  user: `${url}/users`,
  service: `${url}/services`,
  variable: `${url}/variables`,
  package: `${url}/packages`,
  userPermission: `${url}/user-permission`,
  userVariable: `${url}/user-variables`,
}
