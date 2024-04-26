import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'

import { useGetPermission } from '../../service/permission/create-permission.service'
import { useGetServices } from '../../service/services/get-services.service'
import { usePermissionStore } from '../../store/permission.store'
import { Container, Content, Logo } from './styles'

const Preload: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { permission, isLoading, isError } = useGetPermission()
  const { setPermissions } = usePermissionStore()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      navigate('/login')
    } else {
      navigate('/dashboard')
    }
  }, [navigate, useGetServices])

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
