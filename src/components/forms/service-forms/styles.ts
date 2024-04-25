import { Button, Grid, TextField } from '@mui/material'
import styled from 'styled-components'
import { colors } from '../../../design/colors'

export const Container = styled(Grid)(({ theme }) => ({
  paddingTop: 20,
  paddingLeft: 40,
  backgroundColor: theme.COLORS.backgroundColor,
}))

export const Item = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  '& .MuiFormControlLabel-root, & .MuiFormLabel-root': {
    color: theme.COLORS.muted,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 500,
  },
}))

export const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    borderRadius: 8,
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
    color: theme.COLORS.backgroundColor,
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.COLORS.secondary,
      color: colors.white,
    },
    '&.Mui-disabled': {
      backgroundColor: theme.COLORS.lightGray,
      color: theme.COLORS.text,
    },
  },
}))

export const Title = styled.h1`
  font-size: 20px;
  font-family: 'Montserrat';
  color: ${props => props.theme.COLORS.secondary};
  width: 20%;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

export const Text = styled.span`
  color: ${({ theme }) => theme.COLORS.gray};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 12px;
`
