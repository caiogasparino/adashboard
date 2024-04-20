import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { colors } from '../../design/colors'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

const Title = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.colors.red};
  font-family: 'Montserrat';
  width: 10%;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

const ModalComponent: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          border: '1px solid #000',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
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
                bgcolor: colors.primary,
                ':hover': { bgcolor: colors.gray },
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                bgcolor: colors.primary,
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
