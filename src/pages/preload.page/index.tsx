import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'

import useGetToken from '../../hooks/useAuthentication'
import { useGetPermission } from '../../service/permission/create-permission.service'
import useOAuthStore from '../../store/oauth.store'
import { usePermissionStore } from '../../store/permission.store'
import { setDefaultToken } from '../../utils/libs/axios/client'
import { Container, Content, Logo } from './styles'

const Preload: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { accessToken } = useOAuthStore()
  const { authData } = useGetToken()
  const { permission } = useGetPermission()
  const { setPermissions } = usePermissionStore()

  console.log('🚀 ~ authData:', authData)
  console.log('🚀 ~ accessToken:', accessToken)

  useCallback(() => {
    setPermissions(permission)
  }, [permission])

  useEffect(() => {
    setDefaultToken(accessToken?.toString() || '')
    if (accessToken) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <Container>
      <Content>
        <Logo src={images.LOGO} alt="Logo" />
      </Content>
    </Container>
  )
}

export default Preload
