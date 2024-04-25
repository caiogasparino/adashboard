import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Variable } from '../../@types/variables'
import { axiosClient } from '../../utils/axios/axios-client'
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
          variables: variables?.map(variable => ({
            name: variable.name,
            aprodvalue: variable.aprodvalue,
            abetavalue: variable.abetavalue,
          })),
        },
      }).then(response => response.data)
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
