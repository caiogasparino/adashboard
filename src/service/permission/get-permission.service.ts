import { useQuery } from '@tanstack/react-query'
import { useLoading } from '../../context'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetPermission = () => {
  const accessToken = localStorage.getItem('accessToken')
  const { setLoading } = useLoading()
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['getPermission'],
    queryFn: async () => {
      try {
        setLoading(true)
        if (accessToken) {
          const response = await axiosClient({
            method: 'get',
            url: '/permission',
          })
          setLoading(false)
          return response.data
        } else {
          setLoading(false)
          throw new Error('No access token found')
        }
      } catch (error: { response: { data: { error: string } } } | any) {
        const errorMessage = error?.response?.data?.error || 'An error occurred'
        // toast.error(errorMessage)
        console.error('Error fetching permissions:', errorMessage)
        throw error
      }
    },
  })

  return { permission: data, isLoading, isError, isFetching }
}
