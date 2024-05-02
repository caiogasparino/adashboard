import { Checkbox, Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Oval } from 'react-loader-spinner'
import { useTheme } from 'styled-components'
import { Service } from '../../../@types/services'
import { Variable } from '../../../@types/variables'
import { useCreateService } from '../../../service/services/create-services.service'
import { useCreateVars } from '../../../service/variables/create-variables.service'
import { useDeleteVars } from '../../../service/variables/delete-variables.service'
import { useGetVars } from '../../../service/variables/get-variables.service'
import { useUpdateVars } from '../../../service/variables/update-variables.service'
import { usePermissionStore } from '../../../store/permission.store'
import Loading from '../../loading'
import { VariableForm } from '../variable-forms'
import { TEXT, TOAST_TEXT } from './constants'
import { ButtonCustom, Container, Input, Item, Text, Title } from './styles'

interface ServiceProps {
  data?: Service
  type?: 'edit' | 'delete'
  onClose: () => void
}

const ServiceForm: React.FC<ServiceProps> = ({ data, type, onClose }) => {
  const theme = useTheme()
  const { deleteVars, isPending: isPendingDeleteVars } = useDeleteVars()
  const { createVars, isPending: isPendingCreateVars } = useCreateVars()
  const { updateVars, isPending: isPendingUpdateVars } = useUpdateVars()
  const { createService, isPending } = useCreateService()
  const { permissions } = usePermissionStore()

  const { vars, isLoading } = useGetVars(data?.name)
  const [serviceName, setServiceName] = useState<string>(data?.name || '')
  const [hasDatabase, setHasDatabase] = useState(data ? data.database : false)
  const [hasApi, setHasApi] = useState(data ? data.api : false)
  const [clickedIcons, setClickedIcons] = useState<boolean[]>([])
  const [deletedVariables, setDeletedVariables] = useState<Variable[]>([])
  const [loading, setLoading] = useState(false)
  const [variables, setVariables] = useState<(Variable & { isNew?: boolean })[]>(
    vars?.variables?.map((variable: Variable) => ({
      ...variable,
      isNew: false,
    })) || [],
  )

  const loadingsVars = isLoading
  const loadingButton = isPending || isPendingCreateVars || isPendingUpdateVars || isPendingDeleteVars

  if (loadingButton && !loading) {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }

  useEffect(() => {
    if (!isLoading && vars && vars.variables) {
      setVariables(vars.variables)
    } else {
      setVariables([{ name: '', aprodvalue: '', abetavalue: '', isNew: true }])
    }
  }, [isLoading, vars])

  const handleVariableChange = (index: number, key: keyof Variable, value: string) => {
    const newVariables = [...variables]
    newVariables[index][key] = value
    setVariables(newVariables)
  }

  const handleAddVariable = () => {
    setVariables([...variables, { name: '', aprodvalue: '', abetavalue: '', isNew: true }])
  }

  const handleDeleteVariable = (index: number) => {
    if (variables[index].isNew) {
      const updatedVariables = [...variables]
      updatedVariables.splice(index, 1)
      setVariables(updatedVariables)
      return
    }

    const newClickedIcons = [...clickedIcons]
    newClickedIcons[index] = !clickedIcons[index]
    setClickedIcons(newClickedIcons)

    setDeletedVariables(prevDeletedVariables => {
      const updatedDeletedVariables = [...prevDeletedVariables]
      updatedDeletedVariables.push(variables[index])
      return updatedDeletedVariables
    })
  }

  const handleSubmit = async () => {
    if (!serviceName) {
      toast.error(TOAST_TEXT.EMPTY, {
        duration: 5000,
      })
      return
    }

    if (!serviceName.match(/^[a-z0-9-]+$/)) {
      toast.error(TOAST_TEXT.REGEX, {
        duration: 5000,
      })
      return
    }

    const variablesContainEmptyStrings = variables.some(variable => Object.values(variable).some(value => value === ''))

    const serviceData = {
      name: serviceName,
      database: hasDatabase,
      api: hasApi,
      variables: variablesContainEmptyStrings ? [] : variables,
    }

    try {
      if (variablesContainEmptyStrings) {
        if (type === 'edit') {
          if (variables.some(variable => variable.isNew)) {
            createVars({
              serviceName,
              variables: [
                ...variables
                  .filter(variable => variable.isNew)
                  .map(variable => ({
                    name: variable.name,
                    aprodvalue: variable.aprodvalue,
                    abetavalue: variable.abetavalue,
                  })),
              ],
            })
          } else if (!clickedIcons) {
            updateVars({
              serviceName,
              variables: [
                ...variables
                  .filter(
                    variable =>
                      variable.abetavalue || variable.abetavalue || (variable.aprodvalue && variable.abetavalue),
                  )
                  .map(variable => ({
                    name: variable.name,
                    aprodvalue: variable.aprodvalue,
                    abetavalue: variable.abetavalue,
                  })),
              ],
            })
          }
          if (deletedVariables.length > 0) {
            deleteVars({ serviceName, variables: deletedVariables })
          }
        } else {
          createService(serviceData)
        }
      } else {
        if (type === 'edit') {
          if (variables.length > 0) {
            if (variables.some(variable => variable.isNew)) {
              createVars({
                serviceName,
                variables: [
                  ...variables
                    .filter(variable => variable.isNew)
                    .map(variable => ({
                      name: variable.name,
                      aprodvalue: variable.aprodvalue,
                      abetavalue: variable.abetavalue,
                    })),
                ],
              })
            } else if (!clickedIcons) {
              updateVars({
                serviceName,
                variables: [
                  ...variables
                    .filter(
                      variable =>
                        variable.abetavalue || variable.abetavalue || (variable.aprodvalue && variable.abetavalue),
                    )
                    .map(variable => ({
                      name: variable.name,
                      aprodvalue: variable.aprodvalue,
                      abetavalue: variable.abetavalue,
                    })),
                ],
              })
            }
          }

          if (deletedVariables.length > 0) {
            deleteVars({ serviceName, variables: deletedVariables })
          }
        } else {
          createService({
            ...serviceData,
            variables,
          })
        }
      }
      setTimeout(() => {
        onClose()
      }, 4000)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Fragment>
      <Grid item xs={12} paddingLeft={5}>
        <Title>{type === 'edit' ? TEXT.TITLE_EDIT : TEXT.TITLE}</Title>
      </Grid>

      <Container container>
        <Item item xs={12}>
          <Input
            label={TEXT.SERVICENAME}
            value={serviceName}
            disabled={type === 'edit'}
            required
            onChange={e => setServiceName(e.target.value)}
            sx={{ width: '90%' }}
          />
        </Item>
        <Item item xs={6} justifyContent={'space-between'} display={'flex'} padding={2} alignItems={'center'}>
          <Text>{TEXT.APIPUBLIC}</Text>
          <Checkbox
            checked={hasApi}
            disabled={type === 'edit'}
            style={{ color: theme.COLORS.gray }}
            onChange={e => setHasApi(e.target.checked)}
          />
          <Text>{TEXT.DATABASEACCESS}</Text>
          <Checkbox
            checked={hasDatabase}
            disabled={type === 'edit'}
            style={{ color: theme.COLORS.gray }}
            onChange={e => setHasDatabase(e.target.checked)}
          />
        </Item>

        {isLoading && (
          <Item
            container
            justifyContent={'center'}
            alignItems={'center'}
            paddingTop={1}
            paddingBottom={1}
            sx={{ width: '90%' }}
          >
            <Item item>
              <Oval
                visible={true}
                height="35"
                width="35"
                color={theme.COLORS.gray}
                secondaryColor={theme.COLORS.gray}
                ariaLabel="oval-loading"
                wrapperStyle={{ marginTop: '20px' }}
                wrapperClass=""
              />
            </Item>
          </Item>
        )}

        <Grid item xs={12}>
          <Title>{TEXT.CREATEVARIABLE}</Title>
        </Grid>
        <VariableForm
          data={variables}
          handleVariableChange={handleVariableChange}
          handleDeleteVariable={handleDeleteVariable}
          clickedIcons={clickedIcons}
          isLoading={loadingsVars}
        />
        <Item
          item
          xs={12}
          justifyContent={'flex-end'}
          display={'flex'}
          paddingTop={4}
          marginRight={10}
          alignItems={'center'}
        >
          {loading ? (
            <Loading spinner isLoading={loading} color={theme.COLORS.background} />
          ) : (
            <>
              <ButtonCustom
                disabled={!permissions.variables.create}
                sx={{ marginRight: 2, width: '180px' }}
                variant="contained"
                onClick={handleAddVariable}
              >
                {TEXT.ADDVARIABLE}
              </ButtonCustom>
              <ButtonCustom
                disabled={!permissions.variables.create}
                sx={{ width: '180px' }}
                variant="contained"
                onClick={handleSubmit}
              >
                {TEXT.SAVE}
              </ButtonCustom>
            </>
          )}
        </Item>
      </Container>
    </Fragment>
  )
}

export default ServiceForm
