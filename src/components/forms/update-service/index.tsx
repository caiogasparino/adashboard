import Delete from '@mui/icons-material/Delete'
import { Checkbox, Grid, IconButton } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useTheme } from 'styled-components'
import { TEXT } from './constants'
import { ButtonCustom, Container, Input, Item, Text, Title } from './styles'

interface Variable {
  name: string
  aprodvalue: string
  abetavalue: string
}

const UpdateServiceForm: React.FC = () => {
  const theme = useTheme()
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

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    // Handle form submission here
    console.log({ serviceName, hasDatabase, hasApi, variables })
  }

  return (
    <Fragment>
      <Grid item xs={12} paddingLeft={5}>
        <Title>{TEXT.TITLE}</Title>
      </Grid>

      <Container theme={theme} container>
        <Item theme={theme} item xs={12}>
          <Input
            theme={theme}
            label={TEXT.SERVICENAME}
            value={serviceName}
            required
            onChange={e => setServiceName(e.target.value)}
            sx={{ width: '90%' }}
          />
        </Item>
        <Item
          theme={theme}
          item
          xs={6}
          justifyContent={'space-between'}
          display={'flex'}
          padding={2}
          alignItems={'center'}
        >
          <Text color={theme.COLORS.gray}>{TEXT.DATABASEACCESS}</Text>
          <Checkbox
            checked={hasDatabase}
            style={{ color: theme.COLORS.gray }}
            onChange={e => setHasDatabase(e.target.checked)}
          />
          <Text color={theme.COLORS.gray}>{TEXT.APIPUBLIC}</Text>
          <Checkbox
            checked={hasApi}
            style={{ color: theme.COLORS.gray }}
            onChange={e => setHasApi(e.target.checked)}
          />
        </Item>

        <Grid item xs={12}>
          <Title>{TEXT.CREATEVARIABLE}</Title>
        </Grid>

        {variables.map((variable, index) => (
          <Item
            theme={theme}
            container
            justifyContent={'space-between'}
            alignItems={'center'}
            key={index}
            paddingTop={1}
            paddingBottom={1}
          >
            <Item theme={theme} item xs={3.5}>
              <Input
                theme={theme}
                label={TEXT.VARIABLENAME}
                value={variable.name}
                onChange={e =>
                  handleVariableChange(index, 'name', e.target.value)
                }
                fullWidth
              />
            </Item>
            <Item theme={theme} item xs={3.5}>
              <Input
                theme={theme}
                label={TEXT.PRODUCTIONVALUE}
                value={variable.aprodvalue}
                onChange={e =>
                  handleVariableChange(index, 'aprodvalue', e.target.value)
                }
                fullWidth
              />
            </Item>
            <Item theme={theme} item xs={3.5}>
              <Input
                theme={theme}
                label={TEXT.BETAVALUE}
                value={variable.abetavalue}
                onChange={e =>
                  handleVariableChange(index, 'abetavalue', e.target.value)
                }
                fullWidth
              />
            </Item>
            <Item theme={theme} item xs={1}>
              {variables.length > 1 && (
                <IconButton onClick={() => handleDeleteVariable(index)}>
                  <Delete sx={{ color: theme.COLORS.gray }} />
                </IconButton>
              )}
            </Item>
          </Item>
        ))}
        <Item
          theme={theme}
          item
          xs={12}
          justifyContent={'flex-end'}
          display={'flex'}
          paddingTop={4}
          marginRight={10}
          alignItems={'center'}
        >
          <ButtonCustom
            theme={theme}
            sx={{ marginRight: 2, width: '180px' }}
            variant="contained"
            onClick={handleAddVariable}
          >
            {TEXT.ADDVARIABLE}
          </ButtonCustom>
          <ButtonCustom
            theme={theme}
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

export default UpdateServiceForm
