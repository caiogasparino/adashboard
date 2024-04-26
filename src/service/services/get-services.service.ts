import { useQuery } from '@tanstack/react-query'
import { ServicesResponse } from '../../@types/services'

const url = process.env.REACT_APP_API_URL

export const useGetServices = () => {
  const accessToken = localStorage.getItem('accessToken')
  const { isFetching, error, data, isLoading } = useQuery<
    ServicesResponse,
    Error
  >({
    queryKey: ['getServices'],

    queryFn: async () => {
      try {
        const response = await fetch(`${url}/services`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch services')
        }

        return response.json()
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
