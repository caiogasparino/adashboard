import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReact } from 'ag-grid-react'

import { Box, Button } from '@mui/material'
import * as React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import { Service } from '../../../@types/services'
import { useDeleteService } from '../../../service/services/delete-services.service'
import { useGetServices } from '../../../service/services/get-services.service'
import { useServiceStore } from '../../../store/services.store'
import { useThemeStore } from '../../../store/theme.store'
import { setDefaultToken } from '../../../utils/libs/axios/client'
import ServiceForm from '../../forms/service-forms'
import Loading from '../../loading'
import ModalComponent from '../../modal'
import { TEXT_MODAL, columnDefs, stylesSx } from './constants'
import { Text } from './styles'

const TableService: React.FC = () => {
  const accessToken = localStorage.getItem('accessToken')
  const gridRef = useRef<AgGridReact>(null)
  const theme = useTheme()
  const { theme: themeStore } = useThemeStore()
  const containerStyle = useMemo(() => ({ width: '100%', height: '10px' }), [])
  const gridStyle = useMemo(() => ({ height: '80vh', width: '100%' }), [])
  const { isPending, deleteService } = useDeleteService()
  const [type, setType] = useState('edit | delete')
  const [openModal, setOpenModal] = useState(false)
  const { getServices } = useGetServices()
  const { services, setServices } = useServiceStore()

  const [serviceSelectRow, setServiceSelectRow] = useState<Service>({} as Service)

  const [deleteTrue, setDeleteTrue] = useState<{ deleteTrue: boolean; serverName: string }>({
    deleteTrue: false,
    serverName: '',
  })

  const classNameTheme = themeStore === 'dark' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    }
  }, [])

  useEffect(() => {
    setDefaultToken(accessToken)
    const fetchServices = async () => {
      const response = await getServices()
      if (response) {
        setServices(response.data)
      }
    }
    fetchServices()
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
    setDeleteTrue({ deleteTrue: true, serverName: serviceSelectRow.name })
    setTimeout(() => {
      setOpenModal(false)
    }, 1000)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const hasEditOrDelete = () => {
    if (type === 'edit') {
      return (
        <React.Fragment>
          <ServiceForm data={serviceSelectRow} type={type} onClose={handleCloseModal} />
        </React.Fragment>
      )
    } else if (type === 'delete') {
      return (
        <React.Fragment>
          <Box sx={stylesSx().modal}>
            <Text color={theme.COLORS.gray}>{TEXT_MODAL}</Text>
            {isPending && <Loading spinner isLoading={isPending} />}
            {!isPending && (
              <Button variant="contained" onClick={handleDeleteService} sx={stylesSx().button}>
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
              rowData={services}
              columnDefs={columnDefs({
                handleOpenModalDelete,
                handleOpenModalUser,
                handleDeleteService,
                deleteTrue,
              })}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      </div>
      <ModalComponent open={openModal} onClose={handleCloseModal} title={type === 'edit' ? '' : 'Delete Service'}>
        {hasEditOrDelete()}
      </ModalComponent>
    </div>
  )
}

export default TableService
