import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import TerminalIcon from '@mui/icons-material/Terminal'
import { Box, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTheme } from 'styled-components'
import { Package } from '../../../@types/packages'
import { TEXT, stylesSx } from './constants'
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
  onClose?: () => void
  data?: Package
}

const PackageForm: React.FC<PackageProps> = ({ data }) => {
  const theme = useTheme()
  const [packageName, setPackageName] = useState(data?.name || '')
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

  return (
    <Container container theme={theme} sx={stylesSx().container}>
      <Box sx={stylesSx().box}>
        <Grid container sx={{ width: '100%' }}>
          <Box sx={stylesSx().boxInput}>
            <Text colorText={theme.COLORS.text} fontSize={sizefonts}>
              {TEXT.LABEL_PACKAGE_NAME}
            </Text>
          </Box>
          <Box sx={stylesSx().boxInputLabel}>
            <Text fontSize={16} colorText={theme.COLORS.secondary}>
              {TEXT.PRESET_PACKAGE}
            </Text>
          </Box>
          <Box sx={stylesSx().boxInputName}>
            <Input
              sx={{ width: '100%' }}
              label="Package Name"
              variant="outlined"
              value={packageName}
              required
              onChange={e => setPackageName(e.target.value)}
            />
          </Box>
        </Grid>
      </Box>
      <Box sx={stylesSx().boxInputPackage}>
        <Grid container sx={{ width: '100%' }}>
          <Box sx={stylesSx().boxInputPackageCmd}>
            <IconButton
              sx={{ color: theme.COLORS.background }}
              onClick={() => {}}
            >
              <TerminalIcon sx={{ color: theme.COLORS.background }} />
            </IconButton>
            <TextRunPackages
              fontSize={sizefonts}
              colorText={theme.COLORS.background}
            >
              <Text
                colorText={theme.COLORS.background}
                fontSize={sizefonts}
              >{`${TEXT.LABEL_NPM_PACKAGE}`}</Text>
              <TextUrl colorText={theme.COLORS.background} fontSize={sizefonts}>
                {TEXT.LABEL_URL_BITBUCKET}
              </TextUrl>
              <Text colorText={theme.COLORS.background} fontSize={sizefonts}>
                {packageName}
              </Text>
            </TextRunPackages>
            <IconButton
              sx={{ color: theme.COLORS.background }}
              onClick={() => {
                copyLinkToClipboard(cmdPackageName)
              }}
            >
              <ContentCopyIcon sx={{ color: theme.COLORS.background }} />
            </IconButton>
          </Box>
          <Item item theme={theme} sx={stylesSx().button}>
            <ButtonCustom
              theme={theme}
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

export default PackageForm
