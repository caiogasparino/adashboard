import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Service } from '../../@types/services'
import { axiosClient } from '../../utils/axios/axios-client'

export const useUpdateService = () => {
  const {
    mutate: updateService,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (service: Service) => {
      return axiosClient({
        method: 'put',
        url: '/service',
        data: {
          name: service.name,
          database: service.database,
          api: service.api,
          variables: service.variables,
        },
      })
    },
    mutationKey: ['updateService'],

    onSuccess: () => {
      toast.success('Service updated successfully!')
    },

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error updating service:', errorMessage)
    },
  })

  return { updateService, isPending, error, data }
}
