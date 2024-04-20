import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import { Box, IconButton, Tooltip } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import * as React from 'react'
import { useCallback, useMemo, useRef } from 'react'
import { theme } from '../../../design/theme'
import { useGetServices } from '../../../service/dashboard/dashboard.services'
import { useServiceStore } from '../../../store/services.store'
import { Input, Text } from './styles'
const TableService: React.FC = () => {
  const { setServices } = useServiceStore()
  const { data: services } = useGetServices()

  useCallback(() => {
    setServices(services || [])
  }, [services])

  const gridRef = useRef<AgGridReact>(null)
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), [])

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    }
  }, [])

  const onFilterTextBoxChanged = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.setGridOption(
        'quickFilterText',
        (document.getElementById('filter-text-box') as HTMLInputElement).value,
      )
    }
  }, [gridRef.current])

  const styles = {
    icon: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  }

  const checkboxRendererApi = (params: any) => {
    const { data } = params
    return (
      <Checkbox
        style={{ color: theme.colors.lightGray }}
        disabled
        checked={data?.database}
      />
    )
  }
  const checkboxRendererBase = (params: any) => {
    const { data } = params
    return (
      <Checkbox
        style={{ color: theme.colors.lightGray }}
        disabled
        checked={data?.api}
      />
    )
  }

  const statusRendererProd = (params: any) => {
    const { data } = params
    const [version, status, alerts] = data?.aproducao
    const color =
      status === 'true online' ? theme.colors.lightGreen : theme.colors.red
    return (
      <Box>
        <Text color={color}>{`${version + ' - ' + status}`}</Text>
        {alerts && status === 'false indisponivel' && (
          <Tooltip title={alerts} style={{ fontFamily: 'Montserrat' }}>
            <IconButton>
              <PrivacyTipIcon
                sx={{
                  color:
                    status === 'true online'
                      ? theme.colors.lightGreen
                      : theme.colors.red,
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    )
  }

  const statusRendererBeta = (params: any) => {
    const { data } = params
    const [version, status, alerts] = data?.abeta
    const color =
      status === 'true online' ? theme.colors.lightGreen : theme.colors.red
    return (
      <Box>
        <Text color={color}>{`${version + ' - ' + status}`}</Text>
        {alerts && status === 'false indisponivel' && (
          <Tooltip title={alerts} style={{ fontFamily: 'Montserrat' }}>
            <IconButton>
              <PrivacyTipIcon
                sx={{
                  color:
                    status === 'true online'
                      ? theme.colors.lightGreen
                      : theme.colors.red,
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    )
  }

  const actionsRenderer = () => {
    return (
      <Box sx={styles.icon}>
        <IconButton>
          <DeleteIcon sx={{ color: theme.colors.red }} />
        </IconButton>
        <IconButton>
          <EditIcon sx={{ color: theme.colors.grayMaxLight }} />
        </IconButton>
      </Box>
    )
  }

  const columnDefs: AgGridReactProps['columnDefs'] = [
    {
      headerName: 'Name',
      field: 'name',
      cellStyle: { color: theme.colors.lightGray, fontWeight: 600 },
    },
    {
      headerName: 'AProd',
      field: 'aproducao',
      cellRenderer: statusRendererProd,
    },
    { headerName: 'ABeta', field: 'abeta', cellRenderer: statusRendererBeta },

    { headerName: 'Api', field: 'api', cellRenderer: checkboxRendererApi },
    {
      headerName: 'Database',
      field: 'database',
      cellRenderer: checkboxRendererBase,
    },
    {
      headerName: 'Variables',
      field: 'variables',
      cellRenderer: (params: any) => {
        const { data } = params
        return (
          <Text color={theme.colors.lightGray}>{data?.variables.length}</Text>
        )
      },
    },
    { headerName: 'Actions', field: 'actions', cellRenderer: actionsRenderer },
  ]

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <Input
            id="filter-text-box"
            placeholder="Search"
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
              rowData={services}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination
              paginationPageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableService
