import React, { Fragment } from 'react'
import { Sidebar } from '../../../components/sidebar'

import ServiceForm from '../../../components/forms/service-forms'
import Loading from '../../../components/loading'
import { useLoading } from '../../../context'
import { TEXT } from '../constants'
import { Container, Content, ContentHeader, Title } from './styles'

const CreateServiceScreen: React.FC = () => {
  const { isLoading } = useLoading()

  return (
    <Fragment>
      {isLoading && <Loading isLoading={isLoading} />}
      <Container>
        <Sidebar />
        <Content>
          <ContentHeader>
            <Title>{TEXT.TITLE}</Title>
          </ContentHeader>
          <ServiceForm />
        </Content>
      </Container>
    </Fragment>
  )
}

export default CreateServiceScreen
