import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ServicesResponse } from '../../@types/services'
import { useLoading } from '../../context'
import { useServiceStore } from '../../store/services.store'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetServices = () => {
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate()
  const { setServices } = useServiceStore()
  const { setLoading } = useLoading()

  const getServices = async () => {
    try {
      setLoading(true)
      if (accessToken) {
        const response = await axiosClient({
          method: 'get',
          url: '/services',
        })
        setLoading(false)
        setServices(response.data.services || [])
        return response.data
      }
    } catch (error: { response: { data: { error: string } } } | any) {
      setLoading(false)
      if (error?.response?.data?.error === 'Unauthorized user token') {
        navigate('/login')
      }
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      console.error('Error getting services:', errorMessage)
      throw error
    }
  }

  const { isFetching, error, data, isLoading } = useQuery<ServicesResponse, Error>({
    queryKey: ['getServices'],
    queryFn: getServices,
    enabled: false,
    refetchInterval: 100000,
    staleTime: 0,
  })

  const refetchData = async () => {
    setTimeout(async () => {
      getServices()
    }, 4000)
  }

  return { isFetching, isLoading, error, data, getServices, refetchData }
}
