import axios from 'axios'
import { Package } from '../../@types/packages'

export const createPackage = async (packageData: Package) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL_JSON_SERVER}/package`,
    packageData,
  )
  return response.data
}
