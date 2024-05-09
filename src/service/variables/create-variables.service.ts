import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Variable } from '../../@types/variables'
import { useLoading } from '../../context'
import { axiosClient } from '../../utils/axios/axios-client'
import { useGetServices } from '../services/get-services.service'
import { useGetVars } from './get-variables.service'

interface CreateVarsProps {
  serviceName: string
  variables: Variable[]
}

export const useCreateVars = () => {
  const { getServices } = useGetServices()
  const { getVariables } = useGetVars()
  const { setLoading } = useLoading()
  const {
    mutate: createVars,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async ({ serviceName, variables }: CreateVarsProps) => {
      setLoading(true)
      const response = await axiosClient({
        method: 'post',
        url: `/service/${serviceName}/variables`,
        data: {
          variables: variables?.map(variable => ({
            name: variable.name,
            aprodvalue: variable.aprodvalue,
            abetavalue: variable.abetavalue,
          })),
        },
      })
      setTimeout(() => {
        getVariables(serviceName)
        getServices()
        toast.success('Variable created successfully!')
      }, 3000)
      return response.data
    },
    mutationKey: ['createVars'],

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error creating variable:', errorMessage)
    },
  })

  return { createVars, isPending, error, data }
}
