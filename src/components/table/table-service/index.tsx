import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ReportRoundedIcon from '@mui/icons-material/ReportRounded'
import { Box, IconButton, Tooltip } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import { theme } from '../../../design/theme'
import { rows } from './makeData'
import {
  StyledTableCell,
  StyledTableRow,
  Text,
  TextCell,
  TextCellVars,
} from './styles'

const TableService: React.FC = () => {
  const styles = {
    status: {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      borderRadius: '8px',
      padding: '4px 12px',
      backgroundColor: theme.colors.white,
    },
    icon: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SERVICES</StyledTableCell>
            <StyledTableCell align="center">PROD</StyledTableCell>
            <StyledTableCell align="center">BETA</StyledTableCell>
            <StyledTableCell align="center">DBA ACCESS</StyledTableCell>
            <StyledTableCell align="center">API PUBLIC</StyledTableCell>
            <StyledTableCell align="center">VARS</StyledTableCell>
            <StyledTableCell align="center">ACTIONS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.services}>
              <StyledTableCell
                component="th"
                align="left"
                width={120}
                scope="row"
              >
                <TextCell>SERVICES</TextCell>
              </StyledTableCell>
              <StyledTableCell align="center" width={120}>
                {
                  <Box sx={styles.status}>
                    <Text>STATUS</Text>
                    <Tooltip title="TESTE STATUS PRD">
                      <ReportRoundedIcon sx={{ color: theme.colors.red }} />
                    </Tooltip>
                  </Box>
                }
              </StyledTableCell>
              <StyledTableCell align="left" width={120}>
                {
                  <Box sx={styles.status}>
                    <Text>STATUS</Text>
                    <Tooltip title="TESTE STATUS BETA ">
                      <ReportRoundedIcon sx={{ color: theme.colors.red }} />
                    </Tooltip>
                  </Box>
                }
              </StyledTableCell>
              <StyledTableCell align="center">
                <Checkbox color="default" />
              </StyledTableCell>
              <StyledTableCell align="center">
                <Checkbox color="default" />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextCellVars>2</TextCellVars>
              </StyledTableCell>
              <StyledTableCell align="center">
                {
                  <Box sx={styles.icon}>
                    <IconButton>
                      <DeleteIcon sx={{ color: theme.colors.red }} />
                    </IconButton>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Box>
                }
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableService
