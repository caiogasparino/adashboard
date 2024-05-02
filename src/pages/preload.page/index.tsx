import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'

import Loading from '../../components/loading'
import { useGetPermission } from '../../service/permission/get-permission.service'
import { usePermissionStore } from '../../store/permission.store'
import { Container, Content, Logo } from './styles'

export const PreloadScreen: React.FC = (): JSX.Element => {
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate()
  const { permission, isLoading, isError } = useGetPermission()
  const { setPermissions } = usePermissionStore()

  const isLoggedIn = !!accessToken && !!permission?.UserAuthorized

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [navigate])

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
      <Loading isLoading={isLoading} spinner />
    </Container>
  )
}
