import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReactProps } from 'ag-grid-react'
import { ReactNode } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import { Box, IconButton, Tooltip } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { theme } from '../../../design/theme'
import { Text } from './styles'

export function createData(
  services: string,
  prod: ReactNode,
  beta: ReactNode,
  dba: ReactNode,
  api: ReactNode,
  vars: number,
  actions: ReactNode,
) {
  return { services, prod, beta, dba, api, vars, actions }
}

export const rows = [
  createData(
    'Service Name',
    'Status Prod',
    'Status Beta',
    'Status DBA',
    'Status API',
    0,
    0,
  ),
]

export const styles = {
  icon: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}

export const checkboxRendererApi = (params: any) => {
  const { data } = params
  return (
    <Checkbox
      style={{ color: theme.colors.lightGray }}
      disabled
      checked={data?.database}
    />
  )
}
export const checkboxRendererBase = (params: any) => {
  const { data } = params
  return (
    <Checkbox
      style={{ color: theme.colors.lightGray }}
      disabled
      checked={data?.api}
    />
  )
}

export const statusRendererProd = (params: any) => {
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

export const statusRendererBeta = (params: any) => {
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

export const actionsRenderer = () => {
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

export const columnDefs: AgGridReactProps['columnDefs'] = [
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
    cellRenderer: (params: any) => {
      const { data } = params
      const color = data.variables[1]
        ? theme.colors.lightGray
        : theme.colors.lightGray
      return (
        <Tooltip title={data.variables[1]} style={{ fontFamily: 'Montserrat' }}>
          <Text color={color}>{data?.variables[0]}</Text>
        </Tooltip>
      )
    },
  },
  { headerName: 'Actions', field: 'actions', cellRenderer: actionsRenderer },
]
