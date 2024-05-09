import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Service } from '../../@types/services'
import { useLoading } from '../../context'
import { axiosClient } from '../../utils/axios/axios-client'
import { useGetServices } from './get-services.service'

export const useUpdateService = () => {
  const { getServices } = useGetServices()
  const { setLoading } = useLoading()
  const {
    mutate: updateService,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (service: Service) => {
      setLoading(true)
      const response = await axiosClient({
        method: 'post',
        url: '/service',
        data: {
          name: service.name,
          database: service.database,
          api: service.api,
          variables: service.variables,
        },
      })
      setTimeout(() => {
        getServices()
        setLoading(false)
        toast.success('Service updated successfully!')
      }, 3000)
      return response.data
    },

    mutationKey: ['updateService'],

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error updating service:', errorMessage)
    },
  })

  return { updateService, isPending, error, data }
}
