import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'
import useAuthentication from '../../hooks/useAuthentication'
import { TEXT } from './constants'
import { Button, Container, Content, Footer, Logo } from './styles'

export const AuthScreen: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { getAuth, loading, data } = useAuthentication()

  useEffect(() => {
    if (data?.access_token) {
      navigate('/dashboard')
    }
  }, [data])

  return (
    <Container>
      <Content>
        <Logo src={images.LOGO} alt="Logo da Aplicação" />
        <h5>DASH - V.0.1</h5>
        <Button onClick={() => getAuth()}>
          <h3>{TEXT.BUTTON}</h3>
        </Button>
        <Footer>
          <p>{TEXT.FOOTER}</p>
        </Footer>
      </Content>
    </Container>
  )
}
