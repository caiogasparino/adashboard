import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Service } from '../../@types/services'
import { useLoading } from '../../context'
import useVariableStore from '../../store/variable.store'
import { axiosClient } from '../../utils/axios/axios-client'
import { useGetServices } from './get-services.service'

export const useCreateService = () => {
  const { getServices } = useGetServices()
  const { setVariables } = useVariableStore()
  const { setLoading } = useLoading()
  const {
    mutate: createService,
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
        setVariables([])
        getServices()
        setLoading(false)
        toast.success('Service created successfully!')
      }, 3000)
      return response.data
    },
    mutationKey: ['createService'],

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error creating service:', errorMessage)
    },
  })

  return { createService, isPending, error, data }
}
