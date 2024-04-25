import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { axiosClient } from '../../utils/axios/axios-client'

export const useDeleteService = () => {
  const {
    mutate: deleteService,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: (serviceName: string) => {
      return axiosClient({
        method: 'delete',
        url: `/service/${serviceName}`,
      }).then(response => response.data)
    },
    mutationKey: ['deleteService'],

    onSuccess: () => {
      toast.success('Service deleted successfully!')
    },

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
    },
  })

  return { deleteService, isPending, error, data }
}
