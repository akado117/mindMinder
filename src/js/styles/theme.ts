import { color as makeColor, background } from 'csx';
import createMuiTheme from '@material-ui/core/styles/createTheme';
import transitions from '@material-ui/core/styles/transitions';

export const fade = (color: string, fadeTo: number) => makeColor(color).fade(fadeTo).toString();

export const color = {
  lightPink: '#ff6dce',
  primaryPink: '#da117f',
  darkPink: '#b91e74',
  primaryBlue: '#0383ce',
  lightBlue: '#02a2ff',
  darkBlue: '#046198',
  primaryGreen: '#47ff98',
  primaryPurple: '#6c15af',
  lightPurple: '#8b1fde',
  white: '#FFFFFF',
  transparent: 'transparent',
  grey: '#333',
};

export const gradients = {
  blackPink: 'radial-gradient(circle at top left,#000 0%,#d6008f 100%)',
  pinkBlack: 'radial-gradient(circle at top left,#d6008f 0%,#000 100%)',
  blackBlue: `radial-gradient(circle at top left,#000 0%,${color.primaryBlue} 100%)`,
  blueBlack: `radial-gradient(circle at top left,${color.primaryBlue} 0%,#000 100%)`,
  blueGreenBase: `radial-gradient(circle at top left,${color.primaryBlue} 0%,${color.primaryGreen} 100%)`,
  blueGreen: {
    backgroundImage: `radial-gradient(circle at top left,${color.primaryBlue} 0%,${color.primaryGreen} 100%)`,
    backgroundColor: '#ffffff60',
    transitions: 'background .5s ease-out',
    backgroundSize: '120%'
  },
  blueGreenActive: {
    backgroundImage: `radial-gradient(circle at top left,${color.primaryBlue}75 0%,${color.primaryGreen}75 100%)`,
    backgroundColor: color.white,
  },
  blueGreenDisabled: {
    backgroundImage: `radial-gradient(circle at top left,${color.primaryBlue}75 0%,${color.primaryGreen}75 100%)`,
    backgroundColor: color.grey,
    color: color.grey
  },
  oranagePinkHover: {
    backgroundImage: `radial-gradient(circle at top left,${color.primaryBlue}75 0%,${color.primaryGreen}75 100%)`,
    backgroundColor: color.white,
  }
}

export const color2 = {
  activeButton: '#ADCCEE',
  guestStatus: '#BAC0C3',
  everydayBlue: '#D8EFEF',
  warning: '#E2A21F',
  warningDark: '#5A400C',
  warningBg: '#FBF3E2',
  success: '#00CC67',
  successDark: '#00994D',
  successBg: '#E5FFF2',
  secondary: '#00A7E5',
  secondaryDark: '#007099',
  secondaryBg: '#E5F8FF',
  grey: '#A0A3BD',
  greyDark: '#14142B',
  greyBg: '#EFF0F6',
  greyHover: '#E5E5E5',
  purple: '#6775F9',
  white: '#FFFFFF'
};

type Colors = 'grey' | 'secondary' | 'success' | 'warning';
type ColorKey = keyof typeof color2;
export const colorForTag = (color: Colors) => ({
  borderColor: color2[color],
  backgroundColor: color2[`${color}Bg` as ColorKey],
  color: color2[`${color}Dark` as ColorKey]
});

// Use integrated breakpoints solution for media queries
// https://material-ui.com/customization/breakpoints/
const theme = createMuiTheme({
  palette: {
    primary: {
      light: color.lightBlue,
      main: color.primaryBlue,
      dark: color.darkBlue,
      contrastText: color.white,
    },
    text: {
      primary: color.white
    },
    background: {
      // default app background color
      default: color2.white
    }
  },
  overrides: {
    MuiInput: {
      underline: {
        '&::before': {
          borderColor: color.white
        }
      }
    },
    MuiFormLabel: {
      root: {
        color: color.white
      }
    },
    MuiDrawer: {paper: {backgroundImage: gradients.blueBlack}}
  }
});

export default theme;
