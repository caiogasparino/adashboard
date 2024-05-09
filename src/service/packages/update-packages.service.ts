import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { axiosClient } from '../../utils/axios/axios-client'

import { Package } from '../../@types/packages'
import { useLoading } from '../../context'
import { useGetPackages } from './get-packages.service'

export const useUpdatePackage = () => {
  const { getPackages } = useGetPackages()
  const { setLoading } = useLoading()
  const {
    mutate: updatePackage,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (packages: Package) => {
      setLoading(true)
      const response = await axiosClient({
        method: 'put',
        url: '/package',
        data: {
          id: packages.id,
          name: packages.name,
        },
      })
      setTimeout(() => {
        getPackages()
        setLoading(false)
        toast.success('Package updated successfully!')
      }, 3000)
      return response.data
    },
    mutationKey: ['updatePackage'],

    onError: (error: { response: { data: { error: string } } }) => {
      const errorMessage = error?.response?.data?.error || 'An error occurred'
      toast.error(errorMessage)
      console.error('Error updating package:', errorMessage)
    },
  })

  return { updatePackage, isPending, error, data }
}
