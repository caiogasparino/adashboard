import { useQuery } from '@tanstack/react-query'
import { PackageResponse } from '../../@types/packages'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetPackages = () => {
  const { isFetching, error, data, isLoading } = useQuery<
    PackageResponse,
    Error
  >({
    queryKey: ['getPackages'],

    queryFn: async () => {
      try {
        const response = await axiosClient({
          method: 'get',
          url: '/packages',
        })
        return response.data
      } catch (error: { response: { data: { error: string } } } | any) {
        const errorMessage = error?.response?.data?.error || 'An error occurred'
        // toast.error(errorMessage)
        console.error('Error getting service packages:', errorMessage)
        throw error
      }
    },

    refetchInterval: 100000,
  })

  return { isFetching, isLoading, error, data }
}
