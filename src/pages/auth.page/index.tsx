import React from 'react'
import Loading from '../../components/loading'
import { useLoading } from '../../context'
import { images } from '../../design/images'
import useAuthentication from '../../hooks/useAuthentication'
import { usePermissionStore } from '../../store/permission.store'
import { TEXT } from './constants'
import { Button, Container, Content, Footer, Logo, Text } from './styles'

export const AuthScreen: React.FC = (): JSX.Element => {
  const { getAuth, data, loading } = useAuthentication()
  const { isLoading } = useLoading()
  const { authUser } = usePermissionStore()
  console.log('🚀 ~ authUser:', authUser)

  return (
    <Container>
      <Content>
        <Logo src={images.LOGO} alt="Application Image" />
        <h5>DASH - V.0.1</h5>
        {!authUser && !loading && !isLoading && <Text>{TEXT.AUTHORIZED}</Text>}
        {(loading || (isLoading && data)) && <Loading isLoading={loading || isLoading} spinner color="white" />}

        {!loading && (
          <Button onClick={() => getAuth()}>
            <h3>{TEXT.BUTTON}</h3>
          </Button>
        )}
        <Footer>
          <p>{TEXT.FOOTER}</p>
        </Footer>
      </Content>
    </Container>
  )
}
