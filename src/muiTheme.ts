import { createTheme } from '@mui/material/styles';
import theme from './theme';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.accent,
    },
    secondary: {
      main: theme.colors.bgDarkBlue,
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
  },
});

export default darkTheme;
