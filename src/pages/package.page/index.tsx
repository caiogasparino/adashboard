import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, IconButton } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components'
import Loading from '../../components/loading'
import TablePackage from '../../components/table/table-packages'
import { useLoading } from '../../context'
import { usePackageStore } from '../../store/package.store'
import { TEXT } from './constants'
import { packages } from './mock'
import {
  ButtonCustom,
  Container,
  Content,
  ContentHeader,
  Title,
} from './styles'

const PackageScreen: React.FC = () => {
  const navigate = useNavigate()
  const { isLoading, setLoading } = useLoading()
  const { setPackages } = usePackageStore()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      //   const packages = await getPackages()
      setPackages(packages)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <Fragment>
      {isLoading && <Loading isLoading={isLoading} />}
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
