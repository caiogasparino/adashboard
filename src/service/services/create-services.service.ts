import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Service } from '../../@types/services'
import { axiosClient } from '../../utils/axios/axios-client'
import { useGetServices } from './get-services.service'

export const useCreateService = (accessToken: string) => {
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
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
      useGetServices(accessToken)
    },

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      //   toast.error(errorMessage)
      console.error('Error creating service:', errorMessage)
    },
  })

  return { createService, isPending, error, data }
}
