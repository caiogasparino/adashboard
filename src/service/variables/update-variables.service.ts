import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Variable } from '../../@types/variables'
import { axiosClient } from '../../utils/axios/axios-client'
import { useGetServices } from '../services/get-services.service'

interface UpdateVarsProps {
  serviceName: string
  variables: Variable[]
}
export const useUpdateVars = () => {
  const { refetchData: refetchServices } = useGetServices()
  const {
    mutate: updateVars,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async ({ serviceName, variables }: UpdateVarsProps) => {
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
    mutationKey: ['updateVars'],

    onSuccess: () => {
      toast.success('Variable updated successfully!')
      refetchServices()
    },

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error updating variable:', errorMessage)
    },
  })

  return { updateVars, isPending, error, data }
}
