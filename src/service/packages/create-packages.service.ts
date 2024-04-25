import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { axiosClient } from '../../utils/axios/axios-client'

import { Package } from '../../@types/packages'
import { useGetPackages } from './get-packages.service'

export const useCreatePackage = () => {
  const {
    mutate: createPackage,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (packages: Package) => {
      return axiosClient({
        method: 'post',
        url: '/package',
        data: {
          name: packages.name,
          version: packages.version,
          links: packages.links,
        },
      })
    },
    mutationKey: ['createPackage'],

    onSuccess: () => {
      toast.success('Package created successfully!')
      useGetPackages()
    },

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      //   toast.error(errorMessage)
      console.error('Error creating package:', errorMessage)
    },
  })

  return { createPackage, isPending, error, data }
}
