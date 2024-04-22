import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading'
import TableComponent from '../../components/table/table-service'
import { useGetServices } from '../../service/dashboard/dashboard.services'
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
  const { isLoading } = useGetServices()

  return (
    <Fragment>
      {isLoading && <Loading isLoading={isLoading} />}
      <Container>
        {/* <Sidebar /> */}
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
          <TableComponent />
        </Content>
      </Container>
    </Fragment>
  )
}

export default DashScreen
