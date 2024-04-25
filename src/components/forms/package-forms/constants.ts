import { useTheme } from 'styled-components'

export const TEXT = {
  LABEL_PACKAGE_NAME: 'Name',
  PRESET_PACKAGE: '@alintra/',
  LABEL_NPM_PACKAGE: 'npm install ',
  LABEL_URL_BITBUCKET: 'https://bitbucket.org/allintra/package#',
  LABEL_BETA_VALUE: 'Beta value',
  BUTTON_ADD_VARIABLE: 'Add variable',
  BUTTON_SAVE: 'Save',
  BUTTON_CLOSE: 'Close',
}

export const stylesSx = () => {
  const theme = useTheme()

  return {
    container: { mx: 'auto', paddingTop: 2, width: '100%' },
    box: {
      width: '100%',
      borderRadius: 4,
      boxShadow: 'none',
      border: 'none',
    },
    boxInput: {
      width: '15%',
      borderRadius: 2,
      zIndex: 11,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.COLORS.background,
    },
    boxInputLabel: {
      marginLeft: -2,
      width: '15%',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.COLORS.lightGray,
      '@media screen and (max-width: 1268px)': {
        display: 'none',
      },
    },
    boxInputName: {
      marginLeft: 2,
      width: '70%',
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

    boxInputPackageCmd: {
      width: '100%',
      height: '40px',
      borderRadius: 2,
      zIndex: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #E0E0E0',
      backgroundColor: theme.COLORS.input,
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
}
