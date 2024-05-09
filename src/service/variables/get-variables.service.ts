import { useQuery } from '@tanstack/react-query'
import { useLoading } from '../../context'
import useVariableStore from '../../store/variable.store'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetVars = () => {
  const { setVariables } = useVariableStore()
  const { setLoading } = useLoading()

  const getVariables = async (serviceName?: string) => {
    try {
      setLoading(true)
      if (serviceName) {
        const response = await axiosClient({
          method: 'get',
          url: `/service/${serviceName}/variables`,
        })
        setVariables(response.data.variables)
        setLoading(false)
        return response.data
      }
      setLoading(false)
    } catch (error: { response: { data: { error: string } } } | any) {
      setLoading(false)
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      console.error('Error getting services:', errorMessage)
      throw error
    }
  }

  const {
    isFetching,
    error,
    data: vars,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['getVars'],
    queryFn: () => getVariables(),
    enabled: false,
    refetchInterval: 100000,
    staleTime: 0,
  })

  return {
    isFetching,
    isLoading,
    error,
    vars,
    refetch,
    getVariables,
  }
}
