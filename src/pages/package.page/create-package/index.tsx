import React, { Fragment } from 'react'
import { Sidebar } from '../../../components'
import PackageForm from '../../../components/forms/package-forms'
import Loading from '../../../components/loading'
import { useLoading } from '../../../context'
import { TEXT } from '../constants'
import { Container, Content, ContentHeader, Title } from './styles'

const CreatePackageScreen: React.FC = () => {
  const { isLoading } = useLoading()

  return (
    <Fragment>
      {isLoading && <Loading isLoading={isLoading} />}
      <Container>
        <Sidebar />
        <Content>
          <ContentHeader>
            <Title>{TEXT.CREATEPACKAGE}</Title>
          </ContentHeader>
          <PackageForm />
        </Content>
      </Container>
    </Fragment>
  )
}

export default CreatePackageScreen
