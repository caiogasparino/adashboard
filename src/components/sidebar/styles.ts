import { Button } from '@mui/material'
import styled from 'styled-components'

interface ButtonLinkProps {
  active?: string
  isMinimized?: boolean
}

const media = {
  mobile: '@media(max-width: 968px)',
}

export const Container = styled.div<ButtonLinkProps>`
  width: ${(props) => (props.isMinimized ? '60px' : '200px')};
  padding: 24px 0;
  max-width: 350px;

  border-right: 1px solid ${({ theme }) => theme.COLORS.border};
  background: ${({ theme }) => theme.COLORS.backgroundColor};
  ${media.mobile} {
    display: none;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.COLORS.backgroundColor};
  ${media.mobile} {
    display: none;
  }
`
export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.COLORS.backgroundColor};
  ${media.mobile} {
    display: none;
  }
`

export const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
`

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.COLORS.backgroundColor};
  ${media.mobile} {
    display: none;
  }
`

export const Logo = styled.img`
  align-self: center;
  margin-bottom: 24px;
  border-radius: 8px;
`

export const ButtonCustom = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    borderRadius: 8,
    backgroundColor: theme.COLORS.background,
    color: theme.COLORS.text,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.COLORS.gray,
      color: theme.COLORS.text,
    },
    '&.Mui-disabled': {
      backgroundColor: theme.COLORS.gray,
      color: theme.COLORS.text,
    },
  },
}))

export const ButtonLink = styled.button<ButtonLinkProps>`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  font-family: Montserrat;
  font-weight: 600;
  width: 90%;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  color: ${(props) =>
    props.active === 'true'
      ? props.theme.COLORS.secondary
      : props.theme.COLORS.text};
  margin: 12px 0;
  background: ${(props) =>
    props.active
      ? props.theme.COLORS.redRgbaLight
      : props.theme.COLORS.background};
  border-right: 12px solid
    ${(props) =>
      props.active === 'true'
        ? props.theme.COLORS.secondary
        : props.theme.COLORS.background};
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.active === 'true'
        ? props.theme.COLORS.redRgbaLight
        : props.theme.COLORS.overlay};
    color: ${(props) =>
      props.active === 'true'
        ? props.theme.COLORS.secondary
        : props.theme.COLORS.text};
  }
`
