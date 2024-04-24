import { TextField } from '@mui/material'
import styled from 'styled-components'

interface Props {
  color?: string
}

export const TextCell = styled.text`
  color: ${({ theme }) => theme.COLORS.background};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 12px;
`
export const TextCellVars = styled.text`
  color: ${({ theme }) => theme.COLORS.background};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 14px;
`
export const Text = styled.text<Props>`
  color: ${(props) => props.color};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 14px;
`

export const Input = styled(TextField)(({ theme }) => ({
  width: '300px',
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
    color: theme.COLORS.muted,
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
