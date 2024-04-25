import { useQuery } from '@tanstack/react-query'
import { ServicesResponse } from '../../@types/services'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetServices = (accessToken?: string | null) => {
  const { isFetching, error, data, isLoading } = useQuery<
    ServicesResponse,
    Error
  >({
    queryKey: ['getServices'],

    queryFn: async () => {
      try {
        const response = await axiosClient({
          method: 'get',
          url: '/services',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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

  return { isFetching, isLoading, error, data }
}
