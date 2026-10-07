import { createTheme } from '@mui/material/styles';

export const TREKKIN_THEME = Object.freeze({
  colors: {
    primary: '#2E6B4F',
    primaryLight: '#4E8C6E',
    primaryLighter: '#A8CDB9',
    primaryDarker: '#1F4D38',

    secondary: '#D9822B',
    secondaryDark: '#B5651A',

    background: '#F5F7F4',
    surface: '#FFFFFF',

    textPrimary: '#1E2A23',
    textSecondary: '#5B6B62',
    textOnPrimary: '#FFFFFF',

    placeholder: '#9AAEA3',
  },

  topbar: {
    bg: '#FFFFFF',
    color: '#1E2A23',
  },

  layout: {
    mainBg: '#F5F7F4',
    maxWidth: 'lg',
  },

  difficulty: {
    Fácil: '#4CAF50',
    Moderada: '#F2A93B',
    Difícil: '#E5533D',
    Experto: '#7B1FA2',
  },
});

export const MUI_THEME = createTheme({
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  palette: {
    primary: {
      main: TREKKIN_THEME.colors.primary,
      light: TREKKIN_THEME.colors.primaryLight,
      dark: TREKKIN_THEME.colors.primaryDarker,
      contrastText: TREKKIN_THEME.colors.textOnPrimary,
    },
    secondary: {
      main: TREKKIN_THEME.colors.secondary,
      dark: TREKKIN_THEME.colors.secondaryDark,
      contrastText: TREKKIN_THEME.colors.textOnPrimary,
    },
    background: {
      default: TREKKIN_THEME.colors.background,
      paper: TREKKIN_THEME.colors.surface,
    },
    text: {
      primary: TREKKIN_THEME.colors.textPrimary,
      secondary: TREKKIN_THEME.colors.textSecondary,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem',
          fontWeight: 600,
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          borderRadius: '0.25rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: TREKKIN_THEME.colors.primaryLight,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: TREKKIN_THEME.colors.primary,
          },
        },
        input: {
          '&::placeholder': {
            color: TREKKIN_THEME.colors.placeholder,
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: TREKKIN_THEME.colors.primary,
          },
        },
      },
    },
  },
});
