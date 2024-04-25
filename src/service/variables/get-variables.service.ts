import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetVars = (serviceName?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getVars', serviceName],

    queryFn: async () => {
      try {
        if (!serviceName) return
        const response = await axiosClient({
          method: 'get',
          url: `/service/${serviceName}/variables`,
        })
        return response.data
      } catch (error: { response: { data: { error: string } } } | any) {
        const errorMessage = error?.response?.data?.error || 'An error occurred'
        toast.error(errorMessage)
        console.error('Error getting service variables:', error)
        throw error
      }
    },

    refetchInterval: 30000,
  })

  console.log('🚀 ~ useGetVars ~ data:', data)

  return { vars: data, isLoading, isError }
}
