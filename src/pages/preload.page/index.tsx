import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'

import { useQueryClient } from '@tanstack/react-query' // Importe useQueryClient
import { useGetPermission } from '../../service/permission/create-permission.service'
import { useGetServices } from '../../service/services/get-services.service'
import { usePermissionStore } from '../../store/permission.store'
import { setDefaultToken } from '../../utils/libs/axios/client'
import { Container, Content, Logo } from './styles'

const Preload: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { permission, isLoading, isError } = useGetPermission()
  const { setPermissions } = usePermissionStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setDefaultToken(accessToken)
      queryClient.setQueryData(['accessToken'], accessToken)
      navigate('/dashboard')
      useGetServices()
    } else {
      navigate('/login')
    }
  }, [navigate, queryClient, useGetServices])

  useEffect(() => {
    if (!isLoading && !isError) {
      setPermissions(permission)
    }
  }, [permission, isLoading, isError, setPermissions])

  return (
    <Container>
      <Content>
        <Logo src={images.LOGO} alt="Logo" />
      </Content>
    </Container>
  )
}

export default Preload
