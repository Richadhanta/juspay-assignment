// Dashboard theme configuration with dark mode support
import { createTheme } from '@mui/material/styles';

const createAppTheme = (mode: 'light' | 'dark') => {
  const isLight = mode === 'light';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isLight ? '#1c1c1c' : '#ffffff',
        light: isLight ? '#4a4a4a' : '#e0e0e0',
        dark: isLight ? '#000000' : '#cccccc',
        contrastText: isLight ? '#ffffff' : '#1c1c1c'
      },
      secondary: {
        main: isLight ? '#e3f5ff' : '#1a2332',
        light: isLight ? '#f0f9ff' : '#2a3441',
        dark: isLight ? '#b3e5fc' : '#0f1419',
        contrastText: isLight ? '#1c1c1c' : '#ffffff'
      },
      background: {
        default: isLight ? '#ffffff' : '#1c1c1c',
        paper: isLight ? '#f7f9fb' : 'rgba(255, 255, 255, 0.05)'
      },
      text: {
        primary: isLight ? '#1c1c1c' : '#ffffff',
        secondary: isLight ? 'rgba(28, 28, 28, 0.40)' : 'rgba(255, 255, 255, 0.60)',
        disabled: isLight ? 'rgba(28, 28, 28, 0.20)' : 'rgba(255, 255, 255, 0.30)'
      },
      grey: {
        50: isLight ? '#f7f9fb' : 'rgba(255, 255, 255, 0.05)',
        100: isLight ? '#e5ecf6' : 'rgba(255, 255, 255, 0.10)',
        200: isLight ? 'rgba(28, 28, 28, 0.05)' : 'rgba(255, 255, 255, 0.10)',
        300: isLight ? 'rgba(28, 28, 28, 0.10)' : 'rgba(255, 255, 255, 0.20)',
        400: isLight ? 'rgba(28, 28, 28, 0.20)' : 'rgba(255, 255, 255, 0.40)',
        500: isLight ? 'rgba(28, 28, 28, 0.40)' : 'rgba(255, 255, 255, 0.40)',
        600: isLight ? '#1c1c1c' : '#cccccc',
        700: isLight ? '#000000' : '#ffffff',
        800: isLight ? '#000000' : 'rgba(255, 255, 255, 0.08)'
      },
      success: {
        main: isLight ? '#a1e3cb' : '#2d5a4a',
        contrastText: isLight ? '#4aa785' : '#a1e3cb'
      },
      info: {
        main: isLight ? '#95a4fc' : '#4a5299',
        contrastText: isLight ? '#8a8cd9' : '#95a4fc'
      },
      warning: {
        main: isLight ? '#ffe999' : '#665c33',
        contrastText: isLight ? '#ffc555' : '#ffe999'
      },
      error: {
        main: isLight ? '#b1e3ff' : '#4a5c66',
        contrastText: isLight ? '#59a8d4' : '#b1e3ff'
      },
      divider: isLight ? 'rgba(28, 28, 28, 0.10)' : 'rgba(255, 255, 255, 0.10)'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      fontWeightLight: 400,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 600,
      h6: {
        fontSize: '14px',
        fontWeight: 600,
        color: isLight ? '#1c1c1c' : '#ffffff'
      },
      body1: {
        fontSize: '14px',
        fontWeight: 400,
        color: isLight ? '#1c1c1c' : '#ffffff'
      },
      body2: {
        fontSize: '12px',
        fontWeight: 400,
        color: isLight ? 'rgba(28, 28, 28, 0.40)' : 'rgba(255, 255, 255, 0.60)'
      },
      caption: {
        fontSize: '12px',
        fontWeight: 400,
        color: isLight ? 'rgba(28, 28, 28, 0.40)' : 'rgba(255, 255, 255, 0.60)'
      }
    },
    shape: {
      borderRadius: 8
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: 'none',
            border: 'none',
            backgroundColor: isLight ? '#f7f9fb' : '#1a1a1a'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: 'none',
            backgroundColor: isLight ? '#f7f9fb' : '#1a1a1a'
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: isLight ? 'rgba(28, 28, 28, 0.04)' : 'rgba(255, 255, 255, 0.04)',
              '& .action-menu': {
                opacity: 1
              }
            }
          }
        }
      }
    }
  });
};

// Create default light theme instance
const theme = createAppTheme('light');

export default theme;
export { createAppTheme };