import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '../../context'
import { images } from '../../design/images'
import useAuthentication from '../../hooks/useAuthentication'
import useOAuthStore from '../../store/oauth.store'
import { initialState, usePermissionStore } from '../../store/permission.store'
import { TEXT } from './constants'
import {
  ButtonCustom,
  ButtonLink,
  Container,
  Content,
  Footer,
  Logo,
  Menu,
  MenuItem,
} from './styles'

export const Sidebar: React.FC = (): JSX.Element => {
  const { logout } = useAuthentication()
  const { setLoading } = useLoading()
  const { setAccessToken } = useOAuthStore()
  const { setPermissions } = usePermissionStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    setLoading(true)
    setTimeout(() => {
      logout()
      setAccessToken('')
      setPermissions(initialState)
      navigate('/login')
    }, 2000)
  }

  return (
    <Container>
      <Content>
        <Menu>
          <Logo src={images.LOGO} alt="Logo" />
          <MenuItem>
            <ButtonLink
              onClick={() => navigate('/dashboard')}
              active={location.pathname === '/dashboard'}
            >
              {TEXT.DASHBOARD}
            </ButtonLink>
          </MenuItem>
          <MenuItem>
            <ButtonLink
              onClick={() => navigate('/service/create')}
              active={location.pathname === '/service/create'}
            >
              {TEXT.CREATESERVICE}
            </ButtonLink>
          </MenuItem>
          <MenuItem>
            <ButtonLink
              onClick={() => navigate('/packages')}
              active={location.pathname === '/packages'}
            >
              {TEXT.PACKAGES}
            </ButtonLink>
          </MenuItem>
          <MenuItem>
            <ButtonLink
              onClick={() => navigate('/package/create')}
              active={location.pathname === '/package/create'}
            >
              {TEXT.CREATEPACKAGE}
            </ButtonLink>
          </MenuItem>
        </Menu>
        <Footer>
          <ButtonCustom sx={{ width: '180px' }} onClick={handleLogout}>
            {TEXT.LOGOUT}
          </ButtonCustom>
        </Footer>
      </Content>
    </Container>
  )
}
