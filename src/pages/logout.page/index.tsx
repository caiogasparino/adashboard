import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'

import Loading from '../../components/loading'
import { useLoading } from '../../context'
import useAuthentication from '../../hooks/useAuthentication'
// import { useGetServices } from '../../service/services/get-services.service'
import useOAuthStore from '../../store/oauth.store'
import { initialState, usePermissionStore } from '../../store/permission.store'
import { Container, Content, Logo } from './styles'

export const LogoutScreen: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { logout } = useAuthentication()
  const { isLoading } = useLoading()
  const { setAccessToken } = useOAuthStore()
  const { setPermissions } = usePermissionStore()

  useEffect(() => {
    setTimeout(() => {
      logout()
      setAccessToken('')
      localStorage.removeItem('accessToken')
      setPermissions(initialState)
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
