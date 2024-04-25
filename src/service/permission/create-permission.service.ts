import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetPermission = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getPermission'],
    queryFn: async () => {
      try {
        const response = await axiosClient({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}/permission`,
        })
        return response.data
      } catch (error: { response: { data: { error: string } } } | any) {
        const errorMessage = error?.response?.data?.error || 'An error occurred'
        toast.error(errorMessage)
        console.error('Error fetching permissions:', error)
        throw error
      }
    },
  })

  return { permission: data, isLoading, isError }
}
