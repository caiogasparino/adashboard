import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../design/images'

import useOAuthStore from '../../store/oauth.store'
import { Container, Content, Logo } from './styles'

const Preload: React.FC = (): JSX.Element => {
  const { accessToken } = useOAuthStore()
  console.log('🚀 ~ accessToken:', accessToken)
  const navigate = useNavigate()

  useEffect(() => {
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
