import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e88e5'
    },
    secondary: {
      main: '#f48fb1'
    }
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(',')
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 180ms ease, box-shadow 180ms ease'
        }
      }
    }
  }
});

export default theme;
