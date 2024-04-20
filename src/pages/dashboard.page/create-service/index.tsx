import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import AddPostServiceForm from '../../../components/forms/create-service'
import { Sidebar } from '../../../components/sidebar'

import Loading from '../../../components/loading'
import { useLoading } from '../../../context'
import { TEXT } from '../constants'
import { Container, Content, ContentHeader, Title } from './styles'

const CreateServiceScreen: React.FC = () => {
  const navigate = useNavigate()

  const { isLoading } = useLoading()

  return (
    <Fragment>
      {isLoading && <Loading isLoading={isLoading} />}
      <Container>
        <Sidebar />
        <Content>
          <ContentHeader>
            <Title>{TEXT.TITLE}</Title>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
          </ContentHeader>
          <AddPostServiceForm />
        </Content>
      </Container>
    </Fragment>
  )
}

export default CreateServiceScreen
