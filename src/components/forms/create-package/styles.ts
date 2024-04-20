import { Button, Grid } from '@mui/material'
import styled from 'styled-components'

interface TextProps {
  colorText?: string
  fontSize?: number
}

export const Container = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.colors.white,
}))

export const Item = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  '& .MuiFormControlLabel-root, & .MuiFormLabel-root': {
    color: theme.colors.gray,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 500,
  },
}))

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  background: ${(props) => props.theme.colors.lightGray};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-left: -8px;
  padding-left: 20px;
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 600;
  outline: none;
  color: ${(props) => props.theme.colors.primary};
`

export const ButtonCustom = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.colors.gray,
      color: theme.colors.white,
    },
    '&.Mui-disabled': {
      backgroundColor: theme.colors.gray,
      color: theme.colors.white,
    },
  },
}))

export const Title = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.colors.red};
  width: 20%;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`
export const Text = styled.span<TextProps>`
  color: ${(props) => props.colorText};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: ${(props) => props.fontSize || 12}px;
`
export const TextUrl = styled.span<TextProps>`
  color: ${(props) => props.colorText};
  font-weight: 400;
  font-family: 'Montserrat';
  font-size: ${(props) => props.fontSize || 12}px;
`
export const TextRunPackages = styled.span<TextProps>`
  margin-left: 85px;
  color: ${(props) => props.colorText};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: ${(props) => props.fontSize || 12}px;
`
