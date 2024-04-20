import { Button, Grid, TextField } from '@mui/material'
import styled from 'styled-components'
import { colors } from '../../../design/colors'

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

export const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    borderRadius: 8,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.colors.lightGray,
    },
    '&:hover fieldset': {
      borderColor: theme.colors.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.colors.primary,
    },
  },
  '& .MuiInputBase-input': {
    color: theme.colors.primary,
    fontFamily: 'Montserrat',
    fontSize: 14,
    borderRadius: 8,
  },

  '& .MuiInputLabel-outlined': {
    color: theme.colors.gray,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 500,
  },

  '& .MuiInputLabel-outlined.Mui-focused': {
    color: theme.colors.primary,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 500,
  },
}))

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

export const Text = styled.span`
  color: ${colors.gray};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 12px;
`
