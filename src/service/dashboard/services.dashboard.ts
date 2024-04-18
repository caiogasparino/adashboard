//create createService
import axios from 'axios'
import { Service } from '../../@types/services'

export const getServices = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL_JSON_SERVER}/services`,
  )
  return response.data
}

export const createService = async (service: Service) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL_JSON_SERVER}/service`,
    service,
  )
  return response.data
}

export function fetchServices() {
  axios
    .get(`${process.env.REACT_APP_API_URL_JSON_SERVER}/services`)
    .then((response) => response.data())
    .then((data) => {
      console.log('Services:', data.services)
    })
    .catch((error) => {
      console.error('Error fetching services:', error)
    })
}

// Fetch services every 5 minutes
setInterval(fetchServices, 5 * 60 * 1000)
