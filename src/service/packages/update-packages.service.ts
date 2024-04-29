import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { axiosClient } from '../../utils/axios/axios-client'

import { Package } from '../../@types/packages'
import { useGetPackages } from './get-packages.service'

export const useUpdatePackage = () => {
  const {
    mutate: updatePackage,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (packages: Package) => {
      return axiosClient({
        method: 'put',
        url: '/package',
        data: {
          id: packages.id,
          name: packages.name,
        },
      })
    },
    mutationKey: ['updatePackage'],

    onSuccess: () => {
      toast.success('Package updated successfully!')
      useGetPackages()
    },

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error updating package:', errorMessage)
    },
  })

  return { updatePackage, isPending, error, data }
}
