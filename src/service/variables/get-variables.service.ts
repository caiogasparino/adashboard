import { useQuery } from '@tanstack/react-query'
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
        // toast.error(errorMessage)
        console.error('Error getting service variables:', errorMessage)
        throw error
      }
    },

    refetchInterval: 100000,
  })

  return { vars: data, isLoading, isError }
}
