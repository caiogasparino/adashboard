import { Box } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useTheme } from 'styled-components'
import { Sidebar } from '../../components'
import ServiceForm from '../../components/forms/service-forms'
import ModalComponent from '../../components/modal'
import TableService from '../../components/table/table-service'
import { TEXT } from './constants'
import {
  ButtonCustom,
  Container,
  Content,
  ContentHeader,
  Title,
} from './styles'

const DashScreen: React.FC = () => {
  const theme = useTheme()

  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Fragment>
      <Container>
        <Sidebar />
        <Content>
          <ContentHeader>
            <Title>{TEXT.TITLE}</Title>
            <Box>
              <ButtonCustom
                theme={theme}
                variant="contained"
                sx={{ width: '180px' }}
                onClick={() => setOpenModal(true)}
              >
                {TEXT.BUTTON}
              </ButtonCustom>
            </Box>
          </ContentHeader>
          <TableService />
        </Content>
      </Container>
      <ModalComponent open={openModal} onClose={handleCloseModal}>
        <ServiceForm />
      </ModalComponent>
    </Fragment>
  )
}

export default DashScreen
