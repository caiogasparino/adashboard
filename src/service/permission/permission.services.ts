import axios from 'axios'

export const getPermissions = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL_JSON_SERVER}/permission`,
  )
  return response.data
}
