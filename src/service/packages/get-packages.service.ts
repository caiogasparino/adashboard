import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { PackageResponse } from '../../@types/packages'
import { useLoading } from '../../context'
import { usePackageStore } from '../../store/package.store'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetPackages = () => {
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate()
  const { setPackages } = usePackageStore()
  const { setLoading } = useLoading()

  const getPackages = async () => {
    try {
      setLoading(true)
      if (accessToken) {
        const response = await axiosClient({
          method: 'get',
          url: '/packages',
        })
        setPackages(response.data.packages)
        setLoading(false)
        return response.data
      }
    } catch (error: { response: { data: { error: string } } } | any) {
      setLoading(false)
      if (error?.response?.data?.error === 'Unauthorized user token') {
        navigate('/login')
      }

      const errorMessage = error?.response?.data?.error || 'An error occurred'
      console.error('Error getting service packages:', errorMessage)
      throw error
    }
  }

  const { isFetching, error, data, isLoading, refetch } = useQuery<PackageResponse, Error>({
    queryKey: ['getPackages'],
    queryFn: getPackages,
    enabled: false,
    refetchInterval: 100000,
    staleTime: 0,
  })

  return { isFetching, isLoading, error, data, refetch, getPackages }
}
