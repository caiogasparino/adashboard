import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReact } from 'ag-grid-react'

import { Box, Button } from '@mui/material'
import * as React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import { Service } from '../../../@types/services'
import { servicesmock } from '../../../pages/dashboard.page/mock'

import { useDeleteService } from '../../../service/services/delete-services.service'
import { useGetServices } from '../../../service/services/get-services.service'
import useOAuthStore from '../../../store/oauth.store'
import { useServiceStore } from '../../../store/services.store'
import { useThemeStore } from '../../../store/theme.store'
import ServiceForm from '../../forms/service-forms'
import Loading from '../../loading'
import ModalComponent from '../../modal'
import { TEXT_MODAL, columnDefs, stylesSx } from './constants'
import { Text } from './styles'

const TableService: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null)
  const { accessToken } = useOAuthStore()
  const theme = useTheme()
  const { theme: themeStore } = useThemeStore()
  const containerStyle = useMemo(() => ({ width: '100%', height: '10px' }), [])
  const gridStyle = useMemo(() => ({ height: '80vh', width: '100%' }), [])
  const { data } = useGetServices(accessToken)
  const { setServices } = useServiceStore()
  const { isPending, deleteService } = useDeleteService()
  const [type, setType] = useState('edit | delete')
  const [openModal, setOpenModal] = useState(false)
  const [serviceSelectRow, setServiceSelectRow] = useState<Service>(
    {} as Service,
  )

  const classNameTheme =
    themeStore === 'dark' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'

  useEffect(() => {
    setServices(data?.services || servicesmock?.services)
  }, [data])

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    }
  }, [])

  const handleOpenModalDelete = (params: any) => {
    setServiceSelectRow(params)
    setType('delete')
    setOpenModal(true)
  }
  const handleOpenModalUser = (params: any) => {
    setServiceSelectRow(params)
    setType('edit')
    setOpenModal(true)
  }
  const handleDeleteService = () => {
    deleteService(serviceSelectRow.name)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const hasEditOrDelete = () => {
    if (type === 'edit') {
      return (
        <React.Fragment>
          <ServiceForm data={serviceSelectRow} type={type} />
        </React.Fragment>
      )
    } else if (type === 'delete') {
      return (
        <React.Fragment>
          <Box sx={stylesSx().modal}>
            <Text color={theme.COLORS.gray}>{TEXT_MODAL}</Text>
            {isPending && <Loading spinner isLoading={isPending} />}
            {!isPending && (
              <Button
                variant="contained"
                onClick={handleDeleteService}
                sx={stylesSx().button}
              >
                Save
              </Button>
            )}
          </Box>
        </React.Fragment>
      )
    }
  }

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <div className={classNameTheme} style={gridStyle}>
            <AgGridReact
              ref={gridRef}
              rowStyle={stylesSx().row}
              rowData={data?.services || servicesmock?.services}
              columnDefs={columnDefs({
                handleOpenModalDelete,
                handleOpenModalUser,
                handleDeleteService,
              })}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      </div>
      <ModalComponent
        open={openModal}
        onClose={handleCloseModal}
        title={type === 'edit' ? '' : 'Delete Service'}
      >
        {hasEditOrDelete()}
      </ModalComponent>
    </div>
  )
}

export default TableService
