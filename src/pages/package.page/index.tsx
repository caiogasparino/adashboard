import { Box } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { Sidebar } from '../../components'
import PackageForm from '../../components/forms/package-forms'
import Loading from '../../components/loading'
import ModalComponent from '../../components/modal'
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
  const { isLoading, setLoading } = useLoading()
  const { setPackages } = usePackageStore()
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
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
                sx={{ width: '180px' }}
                onClick={() => setOpenModal(true)}
              >
                {TEXT.BUTTON}
              </ButtonCustom>
            </Box>
          </ContentHeader>
          <TablePackage />
        </Content>
      </Container>
      <ModalComponent
        open={openModal}
        onClose={handleCloseModal}
        title={'Create Package'}
      >
        <PackageForm />
      </ModalComponent>
    </Fragment>
  )
}

export default PackageScreen
