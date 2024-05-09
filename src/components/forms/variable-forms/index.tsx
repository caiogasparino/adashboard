import Delete from '@mui/icons-material/Delete'
import ReplayIcon from '@mui/icons-material/Replay'
import { IconButton } from '@mui/material'
import { forwardRef, Fragment } from 'react'
import { useTheme } from 'styled-components'
import { Variable } from '../../../@types/variables'
import { usePermissionStore } from '../../../store/permission.store'
import { TEXT } from './constants'
import { Input, Item } from './styles'

interface DeletableIconProps {
  clicked: boolean
  onClick: () => void
}

interface VariableProps {
  data: (Variable & { isNew?: boolean })[]
  serverName?: string
  isLoading: boolean
  handleVariableChange: (index: number, key: keyof Variable, value: string) => void
  handleDeleteVariable: (index: number) => void
  clickedIcons: boolean[]
}

export const VariableForm: React.FC<VariableProps> = ({
  data,
  handleVariableChange,
  handleDeleteVariable,
  clickedIcons,
  isLoading,
}): JSX.Element => {
  const theme = useTheme()
  const { permissions } = usePermissionStore()

  const DeletableIcon = forwardRef<HTMLButtonElement, DeletableIconProps>(function DeletableIcon(props, ref) {
    return (
      <IconButton disabled={!permissions?.variables?.delete} ref={ref} onClick={props.onClick}>
        {props.clicked ? (
          <ReplayIcon sx={{ color: theme.COLORS.secondary }} />
        ) : (
          <Delete sx={{ color: theme.COLORS.gray }} />
        )}
      </IconButton>
    )
  })

  return (
    <>
      {!isLoading &&
        data?.map((variable, dataIndex) => (
          <Fragment key={dataIndex}>
            <Item
              container
              justifyContent={'space-between'}
              alignItems={'center'}
              key={dataIndex}
              paddingTop={1}
              paddingBottom={1}
            >
              <Item item xs={3.5}>
                <Input
                  label={TEXT.VARIABLENAME}
                  clicked={clickedIcons[dataIndex] || false}
                  disabled={!variable.isNew}
                  value={variable.name}
                  onChange={e => handleVariableChange(dataIndex, 'name', e.target.value)}
                  fullWidth
                />
              </Item>
              <Item item xs={3.5}>
                <Input
                  label={TEXT.PRODUCTIONVALUE}
                  clicked={clickedIcons[dataIndex] || false}
                  value={variable.aprodvalue ?? '***********'}
                  onChange={e => handleVariableChange(dataIndex, 'aprodvalue', e.target.value)}
                  fullWidth
                />
              </Item>
              <Item item xs={3.5}>
                <Input
                  label={TEXT.BETAVALUE}
                  clicked={clickedIcons[dataIndex] || false}
                  value={variable.abetavalue ?? '***********'}
                  onChange={e => handleVariableChange(dataIndex, 'abetavalue', e.target.value)}
                  fullWidth
                />
              </Item>
              <Item item xs={1}>
                <DeletableIcon clicked={clickedIcons[dataIndex]} onClick={() => handleDeleteVariable(dataIndex)} />
              </Item>
            </Item>
          </Fragment>
        ))}
    </>
  )
}
