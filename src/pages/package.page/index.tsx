import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/sidebar'

import TablePackage from '../../components/table/table-packages'
import { TEXT } from './constants'
import {
  ButtonCustom,
  Container,
  Content,
  ContentHeader,
  Title,
} from './styles'

const PackageScreen: React.FC = () => {
  const navigate = useNavigate()
  //   const { isLoading, setLoading } = useLoading()
  //   const { setPermissions } = usePermissionStore()

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true)
  //       const data = await getPermissions()
  //       setPermissions(data)
  //       setLoading(false)
  //     }
  //     fetchData()
  //   }, [])

  return (
    <Fragment>
      {/* {isLoading && <Loading isLoading={isLoading} />} */}
      <Container>
        <Sidebar />
        <Content>
          <ContentHeader>
            <Title>{TEXT.TITLE}</Title>
            <Box>
              <ButtonCustom
                variant="contained"
                sx={{ width: '180px', mr: 4 }}
                onClick={() => navigate('/package/create')}
              >
                {TEXT.BUTTON}
              </ButtonCustom>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
            </Box>
          </ContentHeader>
          <TablePackage />
        </Content>
      </Container>
    </Fragment>
  )
}

export default PackageScreen
