import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import { Sidebar } from '../../../components'
import AddPostPackageForm from '../../../components/forms/form-package'
import { TEXT } from '../constants'
import { Container, Content, ContentHeader, Title } from './styles'

const CreatePackageScreen: React.FC = () => {
  const navigate = useNavigate()
  // const { isLoading, setLoading } = useLoading()
  //   const { setPermissions } = usePermissionStore()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true)
  //     const data = await createServices()
  //     setPermissions(data)
  //     setLoading(false)
  //   }
  //   fetchData()
  // }, [])

  return (
    <Fragment>
      {/* {isLoading && <Loading isLoading={isLoading} />} */}
      <Container>
        <Sidebar />
        <Content>
          <ContentHeader>
            <Title>{TEXT.CREATEPACKAGE}</Title>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
          </ContentHeader>
          <AddPostPackageForm />
        </Content>
      </Container>
    </Fragment>
  )
}

export default CreatePackageScreen
