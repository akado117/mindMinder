import { color as makeColor, background } from 'csx';
import createMuiTheme from '@material-ui/core/styles/createTheme';
import transitions from '@material-ui/core/styles/transitions';

export const fade = (color: string, fadeTo: number) => makeColor(color).fade(fadeTo).toString();

export const color = {
  lightPink: '#ff6dce',
  primaryPink: '#da117f',
  darkPink: '#b91e74',

  white: '#FFFFFF',
  transparent: 'transparent',
  grey: '#333',
};

export const gradients = {
  blackPink: 'radial-gradient(circle at top left,#000 0%,#d6008f 100%)',
  pinkBlack: 'radial-gradient(circle at top left,#d6008f 0%,#000 100%)',
  orangePinkBase: 'radial-gradient(circle at top left,#47ff98 0%,#0383ce 100%)',
  orangePink: {
    backgroundImage: 'radial-gradient(circle at top left,#47ff98 0%,#0383ce 100%)',
    backgroundColor: '#ffffff60',
    transitions: 'background .5s ease-out'
  },
  orangePinkActive: {
    backgroundImage: 'radial-gradient(circle at top left,#47ff9875 0%,#0383ce75 100%)',
    backgroundColor: color.white,
  },
  orangePinkDisabled: {
    backgroundImage: 'radial-gradient(circle at top left,#47ff9875 0%,#0383ce75 100%)',
    backgroundColor: color.grey,
    color: color.grey
  },
  oranagePinkHover: {
    backgroundImage: 'radial-gradient(circle at top left,#47ff9875 0%,#0383ce75 100%)',
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
      light: color.lightPink,
      main: color.primaryPink,
      dark: color.darkPink,
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
    MuiDrawer: {paper: {backgroundImage: gradients.pinkBlack}}
  }
});

export default theme;
