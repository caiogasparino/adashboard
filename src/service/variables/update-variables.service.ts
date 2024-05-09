import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Variable } from '../../@types/variables'
import { useLoading } from '../../context'
import { axiosClient } from '../../utils/axios/axios-client'
import { useGetServices } from '../services/get-services.service'
import { useGetVars } from './get-variables.service'

interface UpdateVarsProps {
  serviceName: string
  variables: Variable[]
}
export const useUpdateVars = () => {
  const { setLoading } = useLoading()
  const { getVariables } = useGetVars()
  const { getServices } = useGetServices()
  const {
    mutate: updateVars,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async ({ serviceName, variables }: UpdateVarsProps) => {
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
        toast.success('Variable updated successfully!')
      }, 3000)
      return response.data
    },
    mutationKey: ['updateVars'],

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error updating variable:', errorMessage)
    },
  })

  return { updateVars, isPending, error, data }
}
