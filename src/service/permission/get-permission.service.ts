import { useQuery } from '@tanstack/react-query'
import { useLoading } from '../../context'
import { usePermissionStore } from '../../store/permission.store'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetPermission = () => {
  const accessToken = localStorage.getItem('accessToken')
  const { setPermissions, setAuthUser } = usePermissionStore()
  const { setLoading } = useLoading()

  const getPermission = async () => {
    try {
      setLoading(true)
      if (accessToken) {
        const response = await axiosClient({
          method: 'get',
          url: '/permission',
        })
        setLoading(false)
        setPermissions(response.data)
        setAuthUser(response.data.UserAuthorized)
        return response.data
      }
    } catch (error: { response: { data: { error: string } } } | any) {
      setLoading(false)
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      // toast.error(errorMessage)
      console.error('Error fetching permissions:', errorMessage)
      throw error
    }
  }

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['getPermission'],
    queryFn: getPermission,
    enabled: false,
  })

  return { permission: data, isLoading, isError, isFetching, getPermission }
}
