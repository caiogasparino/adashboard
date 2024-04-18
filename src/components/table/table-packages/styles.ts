import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { styled as materialStyles } from '@mui/material/styles'
import styled from 'styled-components'
import { colors } from '../../../design/colors'
import { theme } from '../../../design/theme'

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
  color: ${colors.white};
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 14px;
`
export const Text = styled.text`
  color: ${colors.red};
  font-family: 'Montserrat';
  font-weight: bold;
  font-size: 10px;
`
