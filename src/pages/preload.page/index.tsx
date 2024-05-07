import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'

import Loading from '../../components/loading'
import { useLoading } from '../../context'
import useAuthentication from '../../hooks/useAuthentication'
import { useGetPermission } from '../../service/permission/get-permission.service'
import { Container, Content, Logo } from './styles'

export const PreloadScreen: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { loading, data } = useAuthentication()
  const { getPermission } = useGetPermission()
  const { isLoading } = useLoading()

  useEffect(() => {
    const fetchData = async () => {
      const permissions = await getPermission()
      console.log('🚀 ~ fetchData ~ response:', permissions?.UserAuthorized)
      if (permissions?.UserAuthorized === true) {
        navigate('/dashboard')
      } else {
        navigate('/login')
      }
    }
    fetchData()
  }, [navigate, data])

  return (
    <Container>
      <Content>
        <Logo src={images.LOGO} alt="Logo" />
        <Loading isLoading={isLoading || loading} spinner />
      </Content>
    </Container>
  )
}
