import Delete from '@mui/icons-material/Delete'
import { Checkbox, FormControl, Grid, IconButton } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useTheme } from 'styled-components'
import { Variable } from '../../../@types/variables'
import { useCreateService } from '../../../service/dashboard/dashboard.services'
import { TEXT } from './constants'
import { ButtonCustom, Container, Input, Item, Text, Title } from './styles'

const AddPostServiceForm: React.FC = () => {
  const theme = useTheme()
  const { createService } = useCreateService()
  const [serviceName, setServiceName] = useState('')
  const [hasDatabase, setHasDatabase] = useState(false)
  const [hasApi, setHasApi] = useState(false)
  const [variables, setVariables] = useState<Variable[]>([
    { name: '', aprodvalue: '', abetavalue: '' },
  ])

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
    if (!/^[a-z0-9]+$/.test(serviceName.toLowerCase())) {
      toast.error('Nome do Serviço deve conter apenas letras e números', {
        duration: 5000,
      })
      return
    }
    if (!serviceName) {
      toast.error('Nome do Serviço não pode estar vazio!', {
        duration: 5000,
      })
      return
    }
    if (!hasDatabase && !hasApi) {
      toast.error('Selecione pelo menos um acesso!', {
        duration: 5000,
      })
      return
    }

    await createService({
      name: serviceName,
      database: hasDatabase,
      api: hasApi,
      variables: [...variables],
    })
  }

  return (
    <FormControl component="form" sx={{ height: '70vh', overflow: 'auto' }}>
      <Container container sx={{ mx: 'auto', paddingTop: 2 }}>
        <Item item xs={12}>
          <Input
            label={TEXT.SERVICENAME}
            value={serviceName}
            required
            onChange={(e) => setServiceName(e.target.value)}
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
            onChange={(e) => setHasApi(e.target.checked)}
          />
          <Text>{TEXT.DATABASEACCESS}</Text>
          <Checkbox
            checked={hasDatabase}
            style={{ color: theme.COLORS.gray }}
            onChange={(e) => setHasDatabase(e.target.checked)}
          />
        </Item>

        <Grid item xs={12}>
          <Title>{TEXT.CREATEVARIABLE}</Title>
        </Grid>

        {variables.map((variable, index) => (
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
                onChange={(e) =>
                  handleVariableChange(index, 'name', e.target.value)
                }
                fullWidth
              />
            </Item>
            <Item item xs={3.5}>
              <Input
                label={TEXT.PRODUCTIONVALUE}
                value={variable.aprodvalue}
                onChange={(e) =>
                  handleVariableChange(index, 'aprodvalue', e.target.value)
                }
                fullWidth
              />
            </Item>
            <Item item xs={3.5}>
              <Input
                label={TEXT.BETAVALUE}
                value={variable.abetavalue}
                onChange={(e) =>
                  handleVariableChange(index, 'abetavalue', e.target.value)
                }
                fullWidth
              />
            </Item>
            <Item item xs={1}>
              {variables.length > 1 && (
                <IconButton onClick={() => handleDeleteVariable(index)}>
                  <Delete />
                </IconButton>
              )}
            </Item>
          </Item>
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
    </FormControl>
  )
}

export default AddPostServiceForm
