import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'

import { useGetPermission } from '../../service/permission/create-permission.service'
import { useGetServices } from '../../service/services/get-services.service'
import { usePermissionStore } from '../../store/permission.store'
import { setDefaultToken } from '../../utils/libs/axios/client'
import { Container, Content, Logo } from './styles'

const Preload: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { permission, isLoading, isError } = useGetPermission()
  const { setPermissions } = usePermissionStore()
  const accessToken = localStorage.getItem('accessToken')
  console.log('🚀 ~ accessToken:', accessToken)

  useEffect(() => {
    if (accessToken) {
      navigate('/dashboard')
      setDefaultToken(accessToken)
      useGetServices()
    } else {
      navigate('/login')
    }
  }, [accessToken, navigate])

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
