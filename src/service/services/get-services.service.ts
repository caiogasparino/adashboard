import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ServicesResponse } from '../../@types/services'
import { useServiceStore } from '../../store/services.store'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetServices = () => {
  const navigate = useNavigate()
  const { setServices } = useServiceStore()
  const accessToken = localStorage.getItem('accessToken')
  const { isFetching, error, data, isLoading } = useQuery<ServicesResponse, Error>({
    queryKey: ['getServices'],

    queryFn: async () => {
      try {
        if (accessToken) {
          const response = await axiosClient({
            method: 'get',
            url: '/services',
          })

          return response.data
        } else {
          throw new Error('No access token found')
        }
      } catch (error: { response: { data: { error: string } } } | any) {
        if (error?.response?.data?.error === 'Unauthorized user token') {
          navigate('/login')
        }
        const errorMessage = error?.response?.data?.error || 'An error occurred'
        console.error('Error getting services:', errorMessage)
        throw error
      }
    },

    refetchInterval: 100000,
    staleTime: 0,
  })

  const refetchData = async () => {
    setTimeout(async () => {
      const response = await axiosClient({
        method: 'get',
        url: '/services',
      })
      if (response.data) {
        console.log('🚀 ~ refetchData ~ response.data:', response.data)
        const data = response.data
        setServices(data.services || [])
      }
    }, 4000)
  }

  return { isFetching, isLoading, error, data, refetchData }
}
