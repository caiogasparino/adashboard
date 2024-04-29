import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import InventoryIcon from '@mui/icons-material/Inventory'
import LogoutIcon from '@mui/icons-material/Logout'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { useLoading } from '../../context'
import { images } from '../../design/images'
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
  const location = useLocation()
  const { COLORS } = useTheme()
  const { setLoading } = useLoading()
  const navigate = useNavigate()
  const [isMin, setIsMinimized] = useState(location.state?.isMin || false)

  const ICON = isMin ? (
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
    navigate('/logout')
  }

  const activeScreen = (path: string) => {
    if (location.pathname === path) return 'true'
  }

  const handleBntDashboard = () => {
    navigate('/dashboard', { state: { isMin: true } })
    activeScreen('/dashboard')
  }

  const handleBntPackages = () => {
    navigate('/packages', { state: { isMin: true } })
    activeScreen('/packages')
  }

  return (
    <Container isMin={isMin}>
      <Content>
        {!isMin && (
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
        <IconButton onClick={() => setIsMinimized(!isMin)}>{ICON}</IconButton>
        {isMin && (
          <>
            <IconButton onClick={handleBntDashboard}>
              <SpaceDashboardIcon
                sx={{
                  color: activeScreen('/dashboard')
                    ? COLORS.secondary
                    : COLORS.background,
                }}
              />
            </IconButton>
            <IconButton onClick={handleBntPackages}>
              <InventoryIcon
                sx={{
                  color: activeScreen('/packages')
                    ? COLORS.secondary
                    : COLORS.background,
                }}
              />
            </IconButton>
          </>
        )}
        <IconButton onClick={() => toggleTheme()}>
          <DarkModeIcon sx={{ color: COLORS.background }} />
        </IconButton>
        {isMin && (
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ color: COLORS.background }} />
          </IconButton>
        )}
        {!isMin && (
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
