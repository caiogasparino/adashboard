import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Service } from '../../@types/services'
import { axiosClient } from '../../utils/axios/axios-client'
import { useGetServices } from './get-services.service'

export const useCreateService = () => {
  const {
    mutate: createService,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (service: Service) => {
      return axiosClient({
        method: 'post',
        url: '/service',
        data: {
          name: service.name,
          database: service.database,
          api: service.api,
          variables: service.variables,
        },
      })
    },
    mutationKey: ['createService'],

    onSuccess: () => {
      toast.success('Service created successfully!')
      useGetServices()
    },

    onError: (error: { response: { data: { error: string } } }) => {
      console.log('🚀 ~ useCreateService ~ error:', error)
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
    },
  })

  return { createService, isPending, error, data }
}
