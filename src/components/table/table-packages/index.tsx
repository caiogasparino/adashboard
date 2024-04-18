import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, IconButton } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import { theme } from '../../../design/theme'

import ModalComponent from '../../modal'
import { rows } from './makeData'
import { StyledTableCell, StyledTableRow, TextCell } from './styles'

const TablePackage: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const styles = {
    icon: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left" width={'60%'} scope="row">
                PACKAGE
              </StyledTableCell>
              <StyledTableCell align="left">VERSION</StyledTableCell>
              <StyledTableCell align="center">ACTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.PACKAGE}>
                <StyledTableCell component="th" scope="row">
                  <TextCell>{row.PACKAGE}</TextCell>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <TextCell>{row.VERSION}</TextCell>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box sx={styles.icon}>
                    <IconButton onClick={handleOpenModal}>
                      <ContentCopyIcon sx={{ color: theme.colors.primary }} />
                    </IconButton>
                    <IconButton onClick={handleOpenModal}>
                      <OpenInNewIcon sx={{ color: theme.colors.primary }} />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Package View"
      >
        Modal content goes here.
      </ModalComponent>
    </React.Fragment>
  )
}

export default TablePackage
