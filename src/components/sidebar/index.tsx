import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { useLoading } from '../../context'
import { images } from '../../design/images'
import useAuthentication from '../../hooks/useAuthentication'
import useOAuthStore from '../../store/oauth.store'
import { initialState, usePermissionStore } from '../../store/permission.store'
import { useThemeStore } from '../../store/theme.store'
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
  const { theme, setTheme } = useThemeStore()
  const { COLORS } = useTheme()
  const { logout } = useAuthentication()
  const { setLoading } = useLoading()
  const { setAccessToken } = useOAuthStore()
  const { setPermissions } = usePermissionStore()
  const navigate = useNavigate()
  const [isMinimized, setIsMinimized] = useState(false)

  const ICON = isMinimized ? (
    <ArrowCircleRightIcon sx={{ color: COLORS.background }} />
  ) : (
    <ArrowCircleLeftIcon sx={{ color: COLORS.background }} />
  )

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const handleLogout = () => {
    setLoading(true)
    setTimeout(() => {
      logout()
      setAccessToken('')
      localStorage.removeItem('accessToken')
      setPermissions(initialState)
      navigate('/login')
    }, 2000)
  }

  const activeScreen = (path: string) => {
    if (location.pathname === path) return 'true'
  }

  return (
    <Container isMinimized={isMinimized}>
      <Content>
        {!isMinimized && (
          <Menu>
            <Logo src={images.LOGO} alt="Logo" />
            <MenuItem>
              <ButtonLink
                onClick={() => navigate('/dashboard')}
                active={activeScreen('/dashboard')}
              >
                {TEXT.DASHBOARD}
              </ButtonLink>
            </MenuItem>
            <MenuItem>
              <ButtonLink
                onClick={() => navigate('/packages')}
                active={activeScreen('/packages')}
              >
                {TEXT.PACKAGES}
              </ButtonLink>
            </MenuItem>
          </Menu>
        )}
        <IconButton onClick={() => setIsMinimized(!isMinimized)}>
          {ICON}
        </IconButton>
        <IconButton onClick={() => toggleTheme()}>
          <DarkModeIcon sx={{ color: COLORS.background }} />
        </IconButton>
        {!isMinimized && (
          <Footer>
            <ButtonCustom sx={{ width: '180px' }} onClick={handleLogout}>
              {TEXT.LOGOUT}
            </ButtonCustom>
          </Footer>
        )}
      </Content>
    </Container>
  )
}
