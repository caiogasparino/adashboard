import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosInstance } from '../libs/axios/client'

export type ParamsClientType = AxiosRequestConfig['params']

type AxiosClientProps = Omit<AxiosRequestConfig, 'params'> & {
  params?: ParamsClientType
}

export async function axiosClient({
  method = 'get',
  url,
  params,
  headers,
  responseType = 'json',
  ...restConfig
}: AxiosClientProps): Promise<AxiosResponse<any>> {
  const response = await axiosInstance({
    method,
    url,
    params,
    headers: {
      ...(headers || {}),
      Authorization:
        headers?.Authorization ||
        `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
    responseType,
    ...restConfig,
  })

  return response
}
