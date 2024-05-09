import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import { colors } from '../../design/colors'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

const Title = styled.h1`
  font-size: 20px;
  color: ${props => props.theme.COLORS.secondary};
  font-family: 'Montserrat';
  width: 100%;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

const ModalComponent: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  const theme = useTheme()
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: theme.COLORS.backgroundColor,
          border: `1px solid ${theme.COLORS.input}`,
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CloseIcon sx={{ color: theme.COLORS.secondary }} onClick={onClose} />
        </IconButton>
        {title && <Title>{title}</Title>}
        {children && (
          <Typography variant="body1" id="modal-description">
            {children}
          </Typography>
        )}
        {!children && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                mr: 1,
                bgcolor: theme.COLORS.background,
                ':hover': { bgcolor: theme.COLORS.gray },
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                bgcolor: theme.COLORS.background,
                ':hover': { bgcolor: colors.gray },
              }}
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default ModalComponent
