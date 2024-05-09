import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { ReactNode } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import { Box, IconButton, Tooltip } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from 'styled-components'
import { Services } from '../../../@types/services'
import { usePermissionStore } from '../../../store/permission.store'
import { Text } from './styles'

export const TEXT_MODAL = 'Deseja realmente excluir o servico?'

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

export const rows = [createData('Service Name', 'Status Prod', 'Status Beta', 'Status DBA', 'Status API', 0, 0)]

export const stylesSx = () => {
  const theme = useTheme()
  return {
    modal: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    row: {
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: 400,
    },
    icon: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    button: {
      mt: 4,
      width: '30%',
      color: theme.COLORS.text,
      fontFamily: 'Montserrat',
      bgcolor: theme.COLORS.background,
      ':hover': { bgcolor: theme.COLORS.gray },
    },
  }
}

const nameRenderer = (params: any) => {
  console.log('🚀 ~ nameRenderer ~ params:', params.colDef.cellRenderParams.deleteTrue.serverName)
  const theme = useTheme()
  const { data } = params
  return (
    <Box>
      <Text
        color={theme.COLORS.gray}
        fontWeight={600}
        width={'100%'}
        style={{
          color:
            params.colDef.cellRenderParams.deleteTrue.serverName === data?.name
              ? theme.COLORS.secondary
              : theme.COLORS.gray,
          textDecoration:
            params.colDef.cellRenderParams.deleteTrue.serverName === data?.name ? 'line-through' : 'normal',
          textDecorationColor: theme.COLORS.secondary,
        }}
      >
        {data?.name}
      </Text>
    </Box>
  )
}

export const statusRendererProd = (params: Services | any) => {
  const theme = useTheme()
  const { data } = params
  const [version, status, ...alerts] = data?.aproducao

  const color = status === 'true online' ? theme.COLORS.green : theme.COLORS.secondary
  const filterStatus = status === 'true online' ? 'online' : 'unavailable'
  const label = version ? `${version} - ${filterStatus}` : 'insight'

  return (
    <Box>
      <Text
        color={params.colDef.cellRenderParams.deleteTrue.serverName === data?.name ? theme.COLORS.secondary : color}
        style={{
          textDecoration:
            params.colDef.cellRenderParams.deleteTrue.serverName === data?.name ? 'line-through' : 'normal',
          textDecorationColor: theme.COLORS.secondary,
        }}
      >
        {label}
      </Text>
      {alerts.length > 0 && (
        <Tooltip title={alerts.join(' - ')} style={{ fontFamily: 'Montserrat' }}>
          <IconButton>
            <PrivacyTipIcon
              sx={{
                color: filterStatus === 'online' ? theme.COLORS.green : theme.COLORS.secondary,
              }}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export const statusRendererBeta = (params: any) => {
  const theme = useTheme()
  const { data } = params
  const [version, status, ...alerts] = data?.abeta || []
  const color = status === 'true online' ? theme.COLORS.green : theme.COLORS.secondary
  const filterStatus = status === 'true online' ? 'online' : 'unavailable'
  const label = version ? `${version} - ${filterStatus}` : 'insight'
  return (
    <Box>
      <Text
        color={params.colDef.cellRenderParams.deleteTrue.serverName === data?.name ? theme.COLORS.secondary : color}
        style={{
          textDecoration:
            params.colDef.cellRenderParams.deleteTrue.serverName === data?.name ? 'line-through' : 'normal',
          textDecorationColor: theme.COLORS.secondary,
        }}
      >
        {label}
      </Text>
      {alerts.length > 0 && (
        <Tooltip title={alerts.join(' - ')} style={{ fontFamily: 'Montserrat' }}>
          <IconButton>
            <PrivacyTipIcon
              sx={{
                color: filterStatus === 'online' ? theme.COLORS.green : theme.COLORS.secondary,
              }}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export const checkboxRendererApi = (params: any) => {
  const theme = useTheme()
  const { data } = params
  return <Checkbox style={{ color: theme.COLORS.gray }} disabled checked={data?.api} />
}
export const checkboxRendererBase = (params: any) => {
  const theme = useTheme()
  const { data } = params
  return <Checkbox style={{ color: theme.COLORS.gray }} disabled checked={data?.database} />
}

export const renderVariables = (params: any) => {
  const theme = useTheme()
  const { data } = params
  const [numbers, ...alerts] = data?.variables || []
  const label = numbers ? `${numbers}` : '0'
  const color = alerts && alerts.length > 0 ? theme.COLORS.secondary : theme.COLORS.background

  return (
    <Box>
      <Text color={color}>{label}</Text>
      {alerts.length > 0 && (
        <Tooltip title={alerts.join(' - ')} style={{ fontFamily: 'Montserrat' }}>
          <IconButton>
            <PrivacyTipIcon
              sx={{
                color: alerts && alerts.length > 0 ? theme.COLORS.secondary : theme.COLORS.green,
              }}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export const actionsRenderer = (params: any) => {
  const theme = useTheme()
  const { permissions } = usePermissionStore()
  const { data } = params
  return (
    <Box sx={stylesSx().icon}>
      <IconButton
        onClick={() => params.colDef.cellRenderParams.handleOpenModalDelete(data)}
        disabled={!permissions?.service?.delete}
      >
        <DeleteIcon sx={{ color: theme.COLORS.secondary }} />
      </IconButton>
      <IconButton
        onClick={() => params.colDef.cellRenderParams.handleOpenModalUser(data)}
        disabled={!permissions?.service?.edit}
      >
        <EditIcon sx={{ color: theme.COLORS.gray }} />
      </IconButton>
    </Box>
  )
}

type PropsDefs = {
  handleOpenModalDelete: (data: any) => void
  handleOpenModalUser: (data: any) => void
  handleDeleteService: (data: any) => void
  deleteTrue: { deleteTrue: boolean; serverName: string }
}

export const columnDefs = ({
  handleOpenModalDelete,
  handleOpenModalUser,
  handleDeleteService,
  deleteTrue,
}: PropsDefs) => {
  return [
    {
      headerName: 'Name',
      field: 'name',
      minWidth: 330,
      cellRenderer: nameRenderer,
      cellRenderParams: { deleteTrue },
    },
    {
      headerName: 'AProd',
      field: 'aproducao',
      minWidth: 220,
      cellRenderer: statusRendererProd,
      cellRenderParams: { deleteTrue },
    },
    {
      headerName: 'ABeta',
      field: 'abeta',
      minWidth: 220,
      cellRenderer: statusRendererBeta,
      cellRenderParams: { deleteTrue },
    },
    {
      headerName: 'Api',
      field: 'api',
      cellRenderer: checkboxRendererApi,
    },
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
      cellRenderParams: {
        handleOpenModalDelete,
        handleOpenModalUser,
        handleDeleteService,
      },
    },
  ]
}
