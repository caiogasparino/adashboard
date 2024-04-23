import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Service, ServicesResponse } from '../../@types/services'
import { Variable } from '../../@types/variables'
import { axiosClient } from '../../utils/axios/axios-client'

export const useGetServices = () => {
  const { isFetching, error, data, isLoading } = useQuery<
    ServicesResponse,
    Error
  >({
    queryKey: ['getServices'],

    queryFn: () => {
      return axiosClient({
        method: 'get',
        url: '/services',
      }).then((response) => response.data)
    },

    refetchInterval: 30000,
  })

  console.log('🚀 ~ useGetServices ~ data:', data)

  return { isFetching, isLoading, error, data }
}

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
        data: service,
      })
    },
    mutationKey: ['createService'],

    onSuccess: () => {
      toast.success('Service created successfully!')
    },

    onError: (error: { response: { data: { error: string } } }) => {
      console.log('🚀 ~ useCreateService ~ error:', error)
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
    },
  })

  return { createService, isPending, error, data }
}

export const useCreateVars = () => {
  const {
    mutate: createVars,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (serviceName?: string, variables?: Variable[]) => {
      console.log('🚀 ~ useCreateVars ~ variables:', variables)
      console.log('🚀 ~ useCreateVars ~ serviceName:', serviceName)
      return axiosClient({
        method: 'post',
        url: `/service/${serviceName}/variables`,
        data: {
          variables: variables?.map((variable) => ({
            name: variable.name,
            aprodvalue: variable.aprodvalue,
            abetavalue: variable.abetavalue,
          })),
        },
      }).then((response) => response.data)
    },
    mutationKey: ['createVars'],

    onSuccess: () => {
      toast.success('Service created successfully!')
    },

    onError: (error: { response: { data: { error: string } } }) => {
      console.log('🚀 ~ useCreateService ~ error:', error)
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
    },
  })

  return { createVars, isPending, error, data }
}

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
      }).then((response) => response.data)
    },
    mutationKey: ['deleteService'],

    onSuccess: () => {
      toast.success('Service deleted successfully!')
    },

    onError: (error: { response: { data: { error: string } } }) => {
      console.log('🚀 ~ useCreateService ~ error:', error)
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
    },
  })

  return { deleteService, isPending, error, data }
}
