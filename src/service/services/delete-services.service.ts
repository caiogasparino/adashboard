import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useLoading } from '../../context'
import { axiosClient } from '../../utils/axios/axios-client'
import { useGetServices } from './get-services.service'

export const useDeleteService = () => {
  const { getServices } = useGetServices()
  const { setLoading } = useLoading()
  const {
    mutate: deleteService,
    isPending,
    error,
    data: deleteServiceData,
  } = useMutation({
    mutationFn: async (serviceName: string) => {
      setLoading(true)
      const response = await axiosClient({
        method: 'delete',
        url: `/service/${serviceName}`,
      })
      setTimeout(() => {
        getServices()
        setLoading(false)
        toast.success('Service deleted successfully!')
      }, 3000)
      return response.data
    },
    mutationKey: ['deleteService'],

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error deleting service:', errorMessage)
    },
  })

  return { deleteService, isPending, error, deleteServiceData }
}
