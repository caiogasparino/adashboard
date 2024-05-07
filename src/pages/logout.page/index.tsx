import React, { useEffect } from 'react'
import { images } from '../../design/images'

import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading'
import { useLoading } from '../../context'
import useOAuthStore from '../../store/oauth.store'
import { authUserState, initialPermissions, usePermissionStore } from '../../store/permission.store'
import { Container, Content, Logo } from './styles'

export const LogoutScreen: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { isLoading, setLoading } = useLoading()
  const { setAccessToken } = useOAuthStore()
  const { setPermissions, setAuthUser } = usePermissionStore()

  useEffect(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('permissions')
    setAccessToken('')
    setPermissions(initialPermissions)
    setAuthUser(authUserState)
    setAccessToken(null)

    setTimeout(() => {
      navigate('/login')
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <Container>
      <Content>
        <Logo src={images.LOGO} alt="Logo" />
        <Loading isLoading={isLoading} spinner color="white" />
      </Content>
    </Container>
  )
}
