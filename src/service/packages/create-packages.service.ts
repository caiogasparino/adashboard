import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { axiosClient } from '../../utils/axios/axios-client'

import { Package } from '../../@types/packages'
import { useLoading } from '../../context'
import { useGetPackages } from './get-packages.service'

export const useCreatePackage = () => {
  const { getPackages } = useGetPackages()
  const { setLoading } = useLoading()
  const {
    mutate: createPackage,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (packages: Package) => {
      setLoading(true)
      const response = await axiosClient({
        method: 'post',
        url: '/package',
        data: {
          name: packages.name,
        },
      })
      setTimeout(() => {
        getPackages()
        setLoading(false)
        toast.success('Package created successfully!')
      }, 3000)
      return response.data
    },

    mutationKey: ['createPackage'],

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error creating package:', errorMessage)
    },
  })

  return { createPackage, isPending, error, data }
}
