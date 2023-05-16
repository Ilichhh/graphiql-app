import { createTheme } from '@mui/material/styles';
import theme from './theme';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.accent,
    },
    secondary: {
      main: theme.colors.bgBlue,
      dark: '#122633',
    },
    background: {
      default: theme.colors.bgBlack,
      paper: theme.colors.bgBlue,
    },
    error: {
      main: theme.colors.error,
    },
    warning: {
      main: theme.colors.warning,
    },
    info: {
      main: theme.colors.info,
    },
    success: {
      main: theme.colors.success,
    },
    text: {
      primary: theme.colors.textGrey,
      secondary: theme.colors.textInactive,
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.colors.textInactive,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: theme.colors.textGrey,
          '&:before, &:after': {
            borderColor: theme.colors.textInactive,
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: theme.colors.textGrey,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: theme.colors.bgDarkBlue,
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.accent,
    },
    secondary: {
      main: theme.colors.bgBlue,
      dark: '#122633',
    },
    background: {
      default: theme.colors.bgLight,
    },
    error: {
      main: theme.colors.error,
    },
    warning: {
      main: theme.colors.warning,
    },
    info: {
      main: theme.colors.info,
    },
    success: {
      main: theme.colors.success,
    },
    text: {
      primary: theme.colors.bgDarkBlue,
    },
  },
});

export { darkTheme, lightTheme };
