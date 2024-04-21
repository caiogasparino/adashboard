import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Service } from '../../@types/services'

export const useGetServices = () => {
  const { isFetching, error, data, isLoading } = useQuery<Service[], Error>({
    queryKey: ['services'],
    queryFn: () => {
      return axios
        .get(`${process.env.REACT_APP_API_URL_JSON_SERVER}/services`)
        .then((response) => response.data)
    },
    refetchInterval: 30000,
  })

  return { isFetching, isLoading, error, data }
}

export const useCreateService = () => {
  const {
    mutate: createService,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: (service: Service) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL_JSON_SERVER}/services`, service)
        .then((response) => response.data)
    },
    mutationKey: ['services'], // Set mutationKey to ['services']

    onSuccess: () => {
      toast.success('Service created successfully!')
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { createService, isPending, error, data }
}
