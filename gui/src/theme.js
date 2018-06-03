import { common, green, grey } from '@material-ui/core/colors'

export default {
  palette: {
    primary: {
      light: '#776bfa',
      main: '#3c40c6',
      dark: '#001894',
      contrastText: '#fff'
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    },
    success: {
      light: green.A400,
      main: green.A700,
      dark: green['700'],
      contrastText: common.white
    },
    background: {
      default: common.white,
      paper: grey[50],
      appBar: '#3c40c6'
    }
  }
}
