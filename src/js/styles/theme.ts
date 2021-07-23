import { color as makeColor } from 'csx';
import createMuiTheme from '@material-ui/core/styles/createTheme';

export const fade = (color: string, fadeTo: number) => makeColor(color).fade(fadeTo).toString();

export const color = {
  grey50: '#D0D1D2',
  blueSky: '#1B4EF1',
  nightSky: '#0C1123',
  cloud: '#F1F4FF',
  eclipse: '#252A3D',
  moon: '#62666E',
  fog: '#DFE6FF',
  mist: '#FCFCFF',
  attention: '#FF5B5E',
  errorText: '#B90000',
  success: '#00B989',
  booked: '#00B989',
  infoBG: '#FFFBF2',
  incomeText: '#C98013',
  income: '#FFC452',
  white: '#FFFFFF',
  black: '#000000',
  disabled: '#E2E7F1',
  buttonHoverBlue: '#2B7CF9',
  buttonActiveBlue: '#0F2EEC',
  greyscaleTitleActive: '#14142B',
  communityBlue: '#316094'
};

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
    background: {
      // default app background color
      default: color2.white
    }
  }
});

export default theme;
