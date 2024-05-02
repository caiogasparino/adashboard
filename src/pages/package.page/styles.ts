import { Button } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

export const Content = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px;
  width: 100%;
  background: ${props => props.theme.COLORS.input};
  @media screen and (max-width: 768px) {
    height: auto;
  }
`

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
  width: 100%;
`

export const Title = styled.h1`
  font-size: 20px;
  color: ${props => props.theme.COLORS.secondary};
  width: 10%;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-top: 24px;
  padding-bottom: 24px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`
export const ButtonCustom = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    borderRadius: 8,
    backgroundColor: theme.COLORS.background,
    color: theme.COLORS.text,
    fontFamily: 'Montserrat',
    fontSize: 12,
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
