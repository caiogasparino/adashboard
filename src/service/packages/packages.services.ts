import axios from 'axios'
import { Package } from '../../@types/packages'

export const getPackages = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL_JSON_SERVER}/packages`,
  )
  return response.data
}

export const createPackage = async (packageData: Package) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL_JSON_SERVER}/package`,
    packageData,
  )
  return response.data
}

export function fetchPackages() {
  axios
    .get(`${process.env.REACT_APP_API_URL_JSON_SERVER}/packages`)
    .then((response) => response.data())
    .then((data) => {
      console.log('Packages:', data.packages)
    })
    .catch((error) => {
      console.error('Error fetching packages:', error)
    })
}

setInterval(fetchPackages, 5 * 60 * 1000)
