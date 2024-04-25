import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'

import { useGetPermission } from '../../service/permission/create-permission.service'
import useOAuthStore from '../../store/oauth.store'
import { usePermissionStore } from '../../store/permission.store'
import { setDefaultToken } from '../../utils/libs/axios/client'
import { Container, Content, Logo } from './styles'

const Preload: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { accessToken } = useOAuthStore()
  const { permission, isLoading, isError } = useGetPermission()
  const { setPermissions } = usePermissionStore()

  useEffect(() => {
    if (accessToken) {
      setDefaultToken(accessToken.toString())
      navigate('/dashboard')
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
