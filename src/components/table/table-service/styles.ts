import { TextField } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { styled as materialStyles } from '@mui/material/styles'
import styled from 'styled-components'
import { colors } from '../../../design/colors'
import { theme } from '../../../design/theme'

interface Props {
  color?: string
}

export const StyledTableCell = materialStyles(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.lightGray,
    color: colors.gray,
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export const StyledTableRow = materialStyles(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.colors.darkGray,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const TextCell = styled.text`
  color: ${colors.primary};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 12px;
`
export const TextCellVars = styled.text`
  color: ${colors.primary};
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
