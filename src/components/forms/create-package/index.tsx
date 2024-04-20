import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box, FormControl, Grid, IconButton } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { colors } from '../../../design/colors'
import { TEXT } from './constants'
import {
  ButtonCustom,
  Container,
  Input,
  Item,
  Text,
  TextRunPackages,
  TextUrl,
} from './styles'

const AddPostPackageForm: React.FC = () => {
  const [packageName, setPackageName] = useState('')

  const cmdPackageName = `${TEXT.LABEL_NPM_PACKAGE}${TEXT.LABEL_URL_BITBUCKET}${packageName}`

  function containsSpace(name: string): boolean {
    return name.includes(' ')
  }

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    const hasSpace = containsSpace(packageName)
    if (hasSpace) {
      toast.error('Nome do pacote não pode conter espaços!', {
        duration: 5000,
      })
    }
    if (!hasSpace) {
      toast.success('Pacote criado com sucesso!')
      event.preventDefault()
      console.log({})
    }
  }

  const copyLinkToClipboard = (link: string) => {
    navigator.clipboard.writeText(link)
    toast.success('Link copiado para a área de transferência!')
  }

  const styles = {
    form: {
      height: '70vh',
      overflow: 'auto',
      width: '100%',
    },
    container: { mx: 'auto', paddingTop: 2, width: '100%' },
    box: {
      width: '100%',
      borderRadius: 4,
      boxShadow: 'none',
      border: 'none',
    },
    boxInput: {
      width: '20%',
      borderRadius: 2,
      zIndex: 11,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.whiteDark,
    },
    boxInputLabel: {
      marginLeft: -3,
      width: '20%',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.grayMaxLight,
    },
    boxInputName: {
      width: '60%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxInputPackage: {
      width: '100%',
      marginTop: 6,
      borderRadius: 4,
      boxShadow: 'none',
      border: 'none',
    },
    boxInputPackageLabel: {
      width: '20%',
      height: '40px',
      borderRadius: 2,
      zIndex: 11,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.whiteDark,
    },
    boxInputPackageCmd: {
      marginLeft: -3,
      width: '80%',
      height: '40px',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      zIndex: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.lightGray,
    },
  }

  return (
    <FormControl component="form" sx={styles.form}>
      <Container container sx={styles.container}>
        <Box sx={styles.box}>
          <Grid container sx={{ width: '100%' }}>
            <Box sx={styles.boxInput}>
              <Text fontSize={14}>{TEXT.LABEL_PACKAGE_NAME}</Text>
            </Box>
            <Box sx={styles.boxInputLabel}>
              <Text fontSize={16} colorText={colors.red}>
                {TEXT.PRESET_PACKAGE}
              </Text>
            </Box>
            <Box sx={styles.boxInputName}>
              <Input
                value={packageName}
                required
                onChange={(e) => setPackageName(e.target.value)}
              />
            </Box>
          </Grid>
        </Box>
        <Box sx={styles.boxInputPackage}>
          <Grid container sx={{ width: '100%' }}>
            <Box sx={styles.boxInputPackageLabel}>
              <Text fontSize={14}>{TEXT.LABEL_RUN_PACKAGE}</Text>
            </Box>
            <Box sx={styles.boxInputPackageCmd}>
              <TextRunPackages fontSize={16} colorText={colors.primary}>
                <Text fontSize={16}>{`${TEXT.LABEL_NPM_PACKAGE}`}</Text>
                <TextUrl fontSize={16}>{TEXT.LABEL_URL_BITBUCKET}</TextUrl>
                <Text fontSize={16}>{packageName}</Text>
              </TextRunPackages>
              <IconButton
                onClick={() => {
                  copyLinkToClipboard(cmdPackageName)
                }}
              >
                <ContentCopyIcon sx={{ color: colors.primary }} />
              </IconButton>
            </Box>
          </Grid>
        </Box>

        <Item
          item
          xs={12}
          display={'flex'}
          justifyContent={'flex-end'}
          paddingTop={5}
          alignItems={'center'}
        >
          <ButtonCustom
            sx={{ width: '180px' }}
            variant="contained"
            onClick={handleSubmit}
          >
            {TEXT.BUTTON_SAVE}
          </ButtonCustom>
        </Item>
      </Container>
    </FormControl>
  )
}

export default AddPostPackageForm
