import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box, FormControl, Grid, IconButton } from '@mui/material'
import React, { useState } from 'react'
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
}

const UpdatePackageForm: React.FC<PackageProps> = ({ onClose }) => {
  const [packageName, setPackageName] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({})
  }

  return (
    <FormControl
      component="form"
      onSubmit={handleSubmit}
      sx={{ height: '30vh', overflow: 'auto', width: '100%' }}
    >
      <Container container sx={{ mx: 'auto', paddingTop: 2, width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            borderRadius: 4,
          }}
        >
          <Grid container sx={{ width: '100%' }}>
            <Box
              sx={{
                width: '20%',
                borderRadius: 2,
                zIndex: 11,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.whiteDark,
              }}
            >
              <Text fontSize={12}>{TEXT.LABEL_PACKAGE_NAME}</Text>
            </Box>
            <Box
              sx={{
                marginLeft: -3,
                width: '20%',
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.grayMaxLight,
              }}
            >
              <Text fontSize={16} colorText={colors.red}>
                {TEXT.PRESET_PACKAGE}
              </Text>
            </Box>
            <Box
              sx={{
                width: '60%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Input
                value={packageName}
                required
                onChange={(e) => setPackageName(e.target.value)}
              />
            </Box>
          </Grid>
        </Box>
        <Box
          sx={{
            width: '100%',
            marginTop: 6,
            borderRadius: 4,
            boxShadow: 'none',
            border: 'none',
          }}
        >
          <Grid container sx={{ width: '100%' }}>
            <Box
              sx={{
                width: '20%',
                height: '40px',
                borderRadius: 2,
                zIndex: 11,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.whiteDark,
              }}
            >
              <Text fontSize={12}>{TEXT.LABEL_RUN_PACKAGE}</Text>
            </Box>
            <Box
              sx={{
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
              }}
            >
              <TextRunPackages fontSize={16} colorText={colors.primary}>
                <Text
                  fontSize={16}
                >{`${TEXT.LABEL_NPM_PACKAGE}  ${'   '}`}</Text>
                <TextUrl fontSize={16}>{TEXT.LABEL_URL_BITBUCKET}</TextUrl>
                <Text fontSize={16}>{packageName}</Text>
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
