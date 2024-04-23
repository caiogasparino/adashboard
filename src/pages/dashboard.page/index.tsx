import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components'
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
  const navigate = useNavigate()

  return (
    <Fragment>
      <Container>
        <Sidebar />
        <Content>
          <ContentHeader>
            <Title>{TEXT.TITLE}</Title>
            <Box>
              <ButtonCustom
                variant="contained"
                sx={{ mr: 4, width: '180px' }}
                onClick={() => navigate('/service/create')}
              >
                {TEXT.BUTTON}
              </ButtonCustom>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
            </Box>
          </ContentHeader>
          <TableService />
        </Content>
      </Container>
    </Fragment>
  )
}

export default DashScreen
