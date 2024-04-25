import { Button, Grid, TextField } from '@mui/material'
import styled from 'styled-components'

interface TextProps {
  colorText?: string
  fontSize?: number
}

export const Container = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.COLORS.backgroundColor,
}))

export const Item = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  '& .MuiFormControlLabel-root, & .MuiFormLabel-root': {
    color: theme.COLORS.gray,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 500,
  },
}))

export const Input = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: 8,
    height: 45,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.COLORS.gray,
    },
    '&:hover fieldset': {
      borderColor: theme.COLORS.background,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.COLORS.background,
    },
  },
  '& .MuiInputBase-input': {
    color: theme.COLORS.background,
    fontFamily: 'Montserrat',
    fontSize: 14,
    borderRadius: 8,
  },

  '& .MuiInputLabel-outlined': {
    color: theme.COLORS.gray,
    lineHeight: 1,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 500,
  },

  '& .MuiInputLabel-outlined.Mui-focused': {
    color: theme.COLORS.background,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 500,
  },
}))

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

export const Title = styled.h1`
  font-size: 20px;
  color: ${props => props.theme.COLORS.secondary};
  width: 20%;

  @media screen and (max-width: 768px) {
    width: auto;
  }
`

export const Text = styled.span<TextProps>`
  color: ${props => props.colorText};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: ${props => props.fontSize || 12}px;
`

export const TextUrl = styled.span<TextProps>`
  color: ${props => props.colorText};
  font-weight: 400;
  font-family: 'Montserrat';
  font-size: ${props => props.fontSize || 12}px;
`

export const TextRunPackages = styled.span<TextProps>`
  margin-left: 85px;
  color: ${props => props.colorText};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: ${props => props.fontSize || 12}px;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    text-align: center;
  }
`
