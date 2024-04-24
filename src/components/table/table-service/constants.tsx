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
  const theme = useTheme()
  const { data } = params
  return (
    <Checkbox
      style={{ color: theme.COLORS.gray }}
      disabled
      checked={data?.api}
    />
  )
}
export const checkboxRendererBase = (params: any) => {
  const theme = useTheme()
  const { data } = params
  return (
    <Checkbox
      style={{ color: theme.COLORS.gray }}
      disabled
      checked={data?.database}
    />
  )
}

export const statusRendererProd = (params: Services | any) => {
  const theme = useTheme()
  const { data } = params
  console.log('🚀 ~ statusRendererProd ~ theme:', theme)
  const [version, status, alerts] = data?.aproducao

  const color =
    status === 'true online' ? theme.COLORS.green : theme.COLORS.secondary
  const label = version ? `${version} - ${status}` : 'insight'

  return (
    <Box>
      <Text color={color}>{label}</Text>
      {alerts && status === 'false indisponivel' && (
        <Tooltip title={alerts} style={{ fontFamily: 'Montserrat' }}>
          <IconButton>
            <PrivacyTipIcon
              sx={{
                color:
                  status === 'true online'
                    ? theme.COLORS.green
                    : theme.COLORS.secondary,
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
  const [version, status, alerts] = data?.abeta || []
  const color =
    status === 'true online' ? theme.COLORS.green : theme.COLORS.secondary
  const label = version ? `${version} - ${status}` : 'insight'
  return (
    <Box>
      <Text color={color}>{label}</Text>
      {alerts && status === 'false indisponivel' && (
        <Tooltip title={alerts} style={{ fontFamily: 'Montserrat' }}>
          <IconButton>
            <PrivacyTipIcon
              sx={{
                color:
                  status === 'true online'
                    ? theme.COLORS.green
                    : theme.COLORS.secondary,
              }}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export const renderVariables = (params: any) => {
  const theme = useTheme()
  const { data } = params
  const [numbers, alerts] = data?.variables || []
  const label = numbers ? `${numbers}` : 'insight'
  const color = alerts ? theme.COLORS.green : theme.COLORS.secondary

  return (
    <Tooltip title={alerts} style={{ fontFamily: 'Montserrat' }}>
      <Text color={color}>{label}</Text>
    </Tooltip>
  )
}

export const actionsRenderer = (params: any) => {
  const theme = useTheme()
  const { data } = params
  console.log('🚀 ~ actionsRenderer ~ params:', data)
  return (
    <Box sx={styles.icon}>
      <IconButton>
        <DeleteIcon
          onClick={() => params.colDef.cellRenderParams.handleOpenModal(data)}
          sx={{ color: theme.COLORS.secondary }}
        />
      </IconButton>
      <IconButton>
        <EditIcon sx={{ color: theme.COLORS.gray }} />
      </IconButton>
    </Box>
  )
}
