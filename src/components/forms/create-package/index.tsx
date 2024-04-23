import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
  const [sizefonts, setFontSize] = useState(window.innerWidth <= 700 ? 10 : 14)

  const cmdPackageName = `${TEXT.LABEL_NPM_PACKAGE}${TEXT.LABEL_URL_BITBUCKET}${packageName}`

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth <= 700 ? 11 : 14)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
      '@media screen and (max-width: 1268px)': {
        display: 'none',
      },
    },
    boxInputName: {
      width: '60%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '@media screen and (max-width: 1268px)': {
        width: '75%',
      },
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
      '@media screen and (max-width: 1268px)': {
        paddingLeft: 5,
        width: '72%',
      },
    },
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: 5,
      alignItems: 'center',
      '@media screen and (max-width: 1268px)': {
        justifyContent: 'center',
      },
    },
  }

  return (
    <Container container sx={styles.container}>
      <Box sx={styles.box}>
        <Grid container sx={{ width: '100%' }}>
          <Box sx={styles.boxInput}>
            <Text fontSize={sizefonts}>{TEXT.LABEL_PACKAGE_NAME}</Text>
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
            <Text fontSize={sizefonts}>{TEXT.LABEL_RUN_PACKAGE}</Text>
          </Box>
          <Box sx={styles.boxInputPackageCmd}>
            <TextRunPackages fontSize={sizefonts} colorText={colors.primary}>
              <Text fontSize={sizefonts}>{`${TEXT.LABEL_NPM_PACKAGE}`}</Text>
              <TextUrl fontSize={sizefonts}>{TEXT.LABEL_URL_BITBUCKET}</TextUrl>
              <Text fontSize={sizefonts}>{packageName}</Text>
            </TextRunPackages>
            <IconButton
              onClick={() => {
                copyLinkToClipboard(cmdPackageName)
              }}
            >
              <ContentCopyIcon sx={{ color: colors.primary }} />
            </IconButton>
          </Box>
          <Item item sx={styles.button}>
            <ButtonCustom
              sx={{ width: '180px' }}
              variant="contained"
              onClick={handleSubmit}
            >
              {TEXT.BUTTON_SAVE}
            </ButtonCustom>
          </Item>
        </Grid>
      </Box>
    </Container>
  )
}

export default AddPostPackageForm
