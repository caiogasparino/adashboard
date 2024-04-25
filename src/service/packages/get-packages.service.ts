import axios from 'axios'

export const getPackages = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL_JSON_SERVER}/packages`,
  )
  return response.data
}
