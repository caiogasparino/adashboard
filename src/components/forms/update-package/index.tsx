import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box, FormControl, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Package } from '../../../@types/packages'
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

interface PackageProps {
  onClose: () => void
  data: Package
}

const UpdatePackageForm: React.FC<PackageProps> = ({ onClose, data }) => {
  const [packageName, setPackageName] = useState(data.name || '')
  const [sizefonts, setFontSize] = useState(window.innerWidth <= 700 ? 10 : 14)
  console.log('🚀 ~ UpdatePackageForm ~ data:', data)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({})
  }

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth <= 700 ? 10 : 14)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const styles = {
    form: { height: '30vh', overflow: 'auto', width: '100%' },
    container: { mx: 'auto', paddingTop: 2, width: '100%' },
    box: {
      width: '100%',
      borderRadius: 4,
    },
    boxInput: {
      width: '20%',
      borderRadius: 2,
      zIndex: 11,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.whiteDark,
      '@media screen and (max-width: 1268px)': {
        flexDirection: 'column',
      },
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
      '@media screen and (max-width: 1268px)': {
        display: 'none',
      },
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
        width: '100%',
        marginLeft: 0,
      },
    },
  }

  return (
    <FormControl component="form" onSubmit={handleSubmit} sx={styles.form}>
      <Container container sx={styles.container}>
        <Box sx={styles.box}>
          <Grid container sx={{ width: '100%' }}>
            <Box sx={styles.boxInput}>
              <Text fontSize={12}>{TEXT.LABEL_PACKAGE_NAME}</Text>
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
              <Text fontSize={12}>{TEXT.LABEL_RUN_PACKAGE}</Text>
            </Box>
            <Box sx={styles.boxInputPackageCmd}>
              <TextRunPackages fontSize={sizefonts} colorText={colors.primary}>
                <Text
                  fontSize={sizefonts}
                >{`${TEXT.LABEL_NPM_PACKAGE}  ${'   '}`}</Text>
                <TextUrl fontSize={sizefonts}>
                  {TEXT.LABEL_URL_BITBUCKET}
                </TextUrl>
                <Text fontSize={sizefonts}>{packageName}</Text>
              </TextRunPackages>
              <IconButton onClick={() => {}}>
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
            sx={{ width: '180px', marginRight: '10px' }}
            onClick={onClose}
            variant="contained"
            type="submit"
          >
            {TEXT.BUTTON_CLOSE}
          </ButtonCustom>
          <ButtonCustom
            sx={{ width: '180px' }}
            variant="contained"
            type="submit"
          >
            {TEXT.BUTTON_SAVE}
          </ButtonCustom>
        </Item>
      </Container>
    </FormControl>
  )
}

export default UpdatePackageForm
