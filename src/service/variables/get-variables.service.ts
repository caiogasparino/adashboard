import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetVars = (serviceName?: string) => {
  const accessToken = localStorage.getItem('accessToken')
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getVars', serviceName],

    queryFn: async () => {
      try {
        if (!serviceName) return
        const response = await axios.get(
          `${process.env.REACT_APP_API_UR}/service/${serviceName}/variables`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
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
