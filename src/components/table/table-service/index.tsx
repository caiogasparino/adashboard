import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReact } from 'ag-grid-react'

import { Box, Button } from '@mui/material'
import * as React from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Services } from '../../../@types/services'
import { colors } from '../../../design/colors'
import { theme } from '../../../design/theme'
import { servicesmock } from '../../../pages/dashboard.page/mock'
import {
  useDeleteService,
  useGetServices,
} from '../../../service/dashboard/dashboard.services'
import { useServiceStore } from '../../../store/services.store'
import Loading from '../../loading'
import ModalComponent from '../../modal'
import {
  actionsRenderer,
  checkboxRendererApi,
  checkboxRendererBase,
  renderVariables,
  statusRendererBeta,
  statusRendererProd,
} from './constants'
import { Input, Text } from './styles'
const TableService: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null)
  const containerStyle = useMemo(() => ({ width: '100%', height: '10px' }), [])
  const gridStyle = useMemo(() => ({ height: '400px', width: '100%' }), [])
  const { data } = useGetServices()
  const { setServices } = useServiceStore()
  const { isPending, deleteService } = useDeleteService()
  const [openModal, setOpenModal] = useState(false)
  const [serviceSelectRow, setServiceSelectRow] = useState<Services>(
    {} as Services,
  )

  useCallback(() => {
    setServices(data?.services || servicesmock?.services)
  }, [data])

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    }
  }, [])

  const handleOpenModal = (params: any) => {
    setServiceSelectRow(params)
    setOpenModal(true)
  }
  const handleDeleteService = () => {
    deleteService(serviceSelectRow.name)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const onFilterTextBoxChanged = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.setGridOption(
        'quickFilterText',
        (document.getElementById('filter-text-box') as HTMLInputElement).value,
      )
    }
  }, [gridRef.current])

  const columnDefs = [
    {
      headerName: 'Name',
      field: 'name',
      cellStyle: { color: theme.colors.lightGray, fontWeight: 600 },
    },
    {
      headerName: 'AProd',
      field: 'aproducao',
      minWidth: 220,
      cellRenderer: statusRendererProd,
    },
    {
      headerName: 'ABeta',
      field: 'abeta',
      minWidth: 220,
      cellRenderer: statusRendererBeta,
    },
    { headerName: 'Api', field: 'api', cellRenderer: checkboxRendererApi },
    {
      headerName: 'Database',
      field: 'database',
      cellRenderer: checkboxRendererBase,
    },
    {
      headerName: 'Variables',
      field: 'variables',
      cellRenderer: renderVariables,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: actionsRenderer,
      cellRenderParams: { handleOpenModal, handleDeleteService },
    },
  ]

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <Input
            id="filter-text-box"
            label="Search"
            variant="outlined"
            style={{ margin: '10px 0' }}
            onChange={onFilterTextBoxChanged}
          />
          <div className="ag-theme-quartz-dark" style={gridStyle}>
            <AgGridReact
              ref={gridRef}
              rowStyle={{
                fontFamily: 'Montserrat',
                fontSize: '14px',
                fontWeight: 400,
              }}
              onGridSizeChanged={onFilterTextBoxChanged}
              onFilterChanged={onFilterTextBoxChanged}
              rowData={data?.services || servicesmock?.services}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination
              paginationPageSize={10}
            />
          </div>
        </div>
      </div>
      <ModalComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Service Delete"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text>Deseja realmente excluir o servico?</Text>
          {isPending && <Loading spinner isLoading={isPending} />}
          {!isPending && (
            <Button
              variant="contained"
              onClick={handleDeleteService}
              sx={{
                mt: 4,
                width: '30%',
                bgcolor: colors.primary,
                ':hover': { bgcolor: colors.gray },
              }}
            >
              Save
            </Button>
          )}
        </Box>
      </ModalComponent>
    </div>
  )
}

export default TableService
