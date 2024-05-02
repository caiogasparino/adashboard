import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Variable } from '../../@types/variables'
import { axiosClient } from '../../utils/axios/axios-client'
import { useGetServices } from '../services/get-services.service'

interface DeleteVarsProps {
  serviceName: string
  variables: Variable[]
}

export const useDeleteVars = () => {
  const { refetchData: refetchServices } = useGetServices()
  const {
    mutate: deleteVars,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async ({ serviceName, variables }: DeleteVarsProps) => {
      console.log('🚀 ~ mutationFn: ~ variables:', variables)
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
    mutationKey: ['deleteVars'],

    onSuccess: () => {
      toast.success('Variable deleted successfully!')
      refetchServices()
    },

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error deleting variable:', errorMessage)
    },
  })

  return { deleteVars, isPending, error, data }
}
