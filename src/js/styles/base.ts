import { color as makeColor } from 'csx';

export const Color = {
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
  buttonActiveBlue: '#0F2EEC'
};

export const Media = {
  phone: { minWidth: 0, maxWidth: 479 },
  tablet: { minWidth: 480, maxWidth: 767 },
  mobile: { minWidth: 0, maxWidth: 767 },
  desktop: { minWidth: 768 }
};

/**
 * Transition speeds based off of material design guidelines
 * https://material.io/design/motion/speed.html
 */
export const Transition = {
  small: { expand: '100ms', collapse: '100ms' },
  medium: { expand: '250ms', collapse: '200ms' },
  large: { expand: '300ms', collapse: '250ms' }
};

export const fadeColor = (color: string, fadeTo: number): string => makeColor(color).fade(fadeTo).toString();