import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'

import Loading from '../../components/loading'
import { useLoading } from '../../context'
import useAuthentication from '../../hooks/useAuthentication'
import useOAuthStore from '../../store/oauth.store'
import { initialPermissions, usePermissionStore } from '../../store/permission.store'
import { Container, Content, Logo } from './styles'

export const LogoutScreen: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { logout } = useAuthentication()
  const { isLoading, setLoading } = useLoading()
  const { setAccessToken } = useOAuthStore()
  const { setPermissions } = usePermissionStore()

  useEffect(() => {
    setTimeout(() => {
      logout()
      setAccessToken('')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('permissions')
      setPermissions(initialPermissions)
      setAccessToken(null)
      setLoading(false)
      navigate('/login')
    }, 2000)
  }, [navigate])

  return (
    <Container>
      <Content>
        <Logo src={images.LOGO} alt="Logo" />
        <Loading isLoading={isLoading} spinner color="white" />
      </Content>
    </Container>
  )
}
