import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
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
  const theme = useTheme()

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
                onClick={() => navigate('/service/create')}
              >
                {TEXT.BUTTON}
              </ButtonCustom>
            </Box>
          </ContentHeader>
          <TableService />
        </Content>
      </Container>
    </Fragment>
  )
}

export default DashScreen
