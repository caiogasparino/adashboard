import { useQuery } from '@tanstack/react-query'
import { useLoading } from '../../context'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetVars = (serviceName?: string) => {
  const { setLoading } = useLoading()
  const getVariables = async () => {
    try {
      setLoading(true)
      if (!serviceName) return
      const response = await axiosClient({
        method: 'get',
        url: `/service/${serviceName}/variables`,
      })
      setLoading(false)
      return response.data
    } catch (error: { response: { data: { error: string } } } | any) {
      setLoading(false)
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      console.error('Error getting service variables:', errorMessage)
      throw error
    }
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['getVars', serviceName],
    queryFn: getVariables,
    enabled: false,
    refetchInterval: 100000,
  })

  return { data, isLoading, isError, refetch, getVariables }
}
