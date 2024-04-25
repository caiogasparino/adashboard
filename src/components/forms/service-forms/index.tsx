import Delete from '@mui/icons-material/Delete'
import { Checkbox, Grid, IconButton } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Oval } from 'react-loader-spinner'
import { useTheme } from 'styled-components'
import { Service } from '../../../@types/services'
import { Variable } from '../../../@types/variables'
import { useCreateService } from '../../../service/services/create-services.service'
import { useGetVars } from '../../../service/variables/get-variables.service'
import { TEXT, TOAST_TEXT } from './constants'
import { ButtonCustom, Container, Input, Item, Text, Title } from './styles'

interface ServiceProps {
  data?: Service
  type?: 'edit' | 'delete'
}

const ServiceForm: React.FC<ServiceProps> = ({ data, type }) => {
  const theme = useTheme()
  const { createService } = useCreateService()
  const { vars, isLoading } = useGetVars(data?.name)
  const [serviceName, setServiceName] = useState(data?.name || '')
  const [hasDatabase, setHasDatabase] = useState(data ? data.database : false)
  const [hasApi, setHasApi] = useState(data ? data.api : false)
  const [variables, setVariables] = useState<Variable[]>(
    vars?.variables || [{ name: '', aprodvalue: '', abetavalue: '' }],
  )

  useEffect(() => {
    if (!isLoading && vars && vars.variables) {
      // Se os dados de variáveis estiverem disponíveis, atualize o estado
      setVariables(vars.variables)
    } else {
      // Caso contrário, inicialize com uma variável vazia
      setVariables([{ name: '', aprodvalue: '', abetavalue: '' }])
    }
  }, [isLoading, vars])

  const handleVariableChange = (
    index: number,
    key: keyof Variable,
    value: string,
  ) => {
    const newVariables = [...variables]
    newVariables[index][key] = value
    setVariables(newVariables)
  }

  const handleAddVariable = () => {
    setVariables([...variables, { name: '', aprodvalue: '', abetavalue: '' }])
  }

  const handleDeleteVariable = (index: number) => {
    const newVariables = [...variables]
    newVariables.splice(index, 1)
    setVariables(newVariables)
  }

  const handleSubmit = async () => {
    if (!serviceName.match(/^[a-z0-9-]+$/)) {
      toast.error(TOAST_TEXT.REGEX, {
        duration: 5000,
      })
      return
    }

    if (!serviceName) {
      toast.error(TOAST_TEXT.EMPTY, {
        duration: 5000,
      })
      return
    }

    const variablesContainEmptyStrings = variables.some(variable =>
      Object.values(variable).some(value => value === ''),
    )

    if (variablesContainEmptyStrings) {
      await createService({
        name: serviceName,
        database: hasDatabase,
        api: hasApi,
        variables: [],
      })
      return
    }

    await createService({
      name: serviceName,
      database: hasDatabase,
      api: hasApi,
      variables,
    })
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
            required
            onChange={e => setServiceName(e.target.value)}
            sx={{ width: '90%' }}
          />
        </Item>
        <Item
          item
          xs={6}
          justifyContent={'space-between'}
          display={'flex'}
          padding={2}
          alignItems={'center'}
        >
          <Text>{TEXT.APIPUBLIC}</Text>
          <Checkbox
            checked={hasApi}
            style={{ color: theme.COLORS.gray }}
            onChange={e => setHasApi(e.target.checked)}
          />
          <Text>{TEXT.DATABASEACCESS}</Text>
          <Checkbox
            checked={hasDatabase}
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

        {!isLoading &&
          variables.map((variable, index) => (
            <>
              <Grid item xs={12}>
                <Title>{TEXT.CREATEVARIABLE}</Title>
              </Grid>
              <Item
                container
                justifyContent={'space-between'}
                alignItems={'center'}
                key={index}
                paddingTop={1}
                paddingBottom={1}
              >
                <Item item xs={3.5}>
                  <Input
                    label={TEXT.VARIABLENAME}
                    value={variable.name}
                    onChange={e =>
                      handleVariableChange(index, 'name', e.target.value)
                    }
                    fullWidth
                  />
                </Item>
                <Item item xs={3.5}>
                  <Input
                    label={type === 'edit' ? '' : TEXT.PRODUCTIONVALUE}
                    value={
                      type === 'edit' ? '**************' : variable.aprodvalue
                    }
                    onChange={e =>
                      handleVariableChange(index, 'aprodvalue', e.target.value)
                    }
                    fullWidth
                  />
                </Item>
                <Item item xs={3.5}>
                  <Input
                    label={type === 'edit' ? '' : TEXT.BETAVALUE}
                    value={
                      type === 'edit' ? '**************' : variable.abetavalue
                    }
                    onChange={e =>
                      handleVariableChange(index, 'abetavalue', e.target.value)
                    }
                    fullWidth
                  />
                </Item>
                <Item item xs={1}>
                  {variables.length > 1 && (
                    <IconButton onClick={() => handleDeleteVariable(index)}>
                      <Delete sx={{ color: theme.COLORS.gray }} />
                    </IconButton>
                  )}
                </Item>
              </Item>
            </>
          ))}
        <Item
          item
          xs={12}
          justifyContent={'flex-end'}
          display={'flex'}
          paddingTop={4}
          marginRight={10}
          alignItems={'center'}
        >
          <ButtonCustom
            sx={{ marginRight: 2, width: '180px' }}
            variant="contained"
            onClick={handleAddVariable}
          >
            {TEXT.ADDVARIABLE}
          </ButtonCustom>
          <ButtonCustom
            sx={{ width: '180px' }}
            variant="contained"
            onClick={handleSubmit}
          >
            {TEXT.SAVE}
          </ButtonCustom>
        </Item>
      </Container>
    </Fragment>
  )
}

export default ServiceForm
