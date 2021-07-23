import { flex } from '../styles/layout';
import { largeButtonText, smallButtonText } from '../styles/typography';
import { color, fade } from '../styles/theme';

const ButtonColor = {
  hoverBlue: '#2B7CF9',
  activeBlue: '#0F2EEC',
  disabled: '#EFEFF0'
};

const buttonBase = {
  ...flex,
  alignItems: 'center',
  border: 'none',
  cursor: 'pointer',
  justifyContent: 'center'
};

const largeButton = {
  ...largeButtonText,
  minWidth: 203,
  height: 56,
  borderRadius: 16,
  paddingLeft: 16,
  paddingRight: 16
};

export const buttonPrimary = {
  ...buttonBase,
  ...largeButton,
  backgroundColor: color.blueSky,
  color: color.white,
  $nest: {
    '&:hover': {
      backgroundColor: ButtonColor.hoverBlue
    },
    '&&:active': {
      backgroundColor: ButtonColor.activeBlue
    },
    '&&&:disabled': {
      backgroundColor: ButtonColor.disabled,
      color: color.moon,
      cursor: 'default'
    }
  }
};

export const buttonSecondary = {
  ...buttonBase,
  ...largeButton,
  backgroundColor: color.white,
  border: `solid 2px ${color.fog}`,
  color: color.blueSky,
  $nest: {
    '&:hover': {
      color: ButtonColor.hoverBlue
    },
    '&&:active': {
      color: ButtonColor.activeBlue,
      border: `solid 2px ${ButtonColor.activeBlue}`
    },
    '&&&:disabled': {
      backgroundColor: ButtonColor.disabled,
      color: fade(color.moon, 0.5),
      cursor: 'default',
      border: 'none'
    }
  }
};

export const buttonText = {
  ...buttonBase,
  ...smallButtonText,
  backgroundColor: 'transparent',
  color: color.blueSky,
  padding: 0,
  $nest: {
    '&:hover': {
      color: ButtonColor.hoverBlue
    },
    '&&:active': {
      color: ButtonColor.activeBlue
    },
    '&&&:disabled': {
      color: color.moon,
      opacity: 0.5,
      cursor: 'default'
    }
  }
};

export const buttonSubtleText = {
  ...buttonBase,
  ...smallButtonText,
  backgroundColor: 'transparent',
  color: color.moon,
  padding: 0,
  $nest: {
    '&:hover': {
      opacity: 0.8
    },
    '&&:active': {
      color: color.eclipse
    },
    '&&&:disabled': {
      color: color.moon,
      opacity: 0.5,
      cursor: 'default'
    }
  }
};

/* The radio button looks like a primary button in its disabled state, and a
 * secondary button in its enabled state. This is to communicate that in a
 * group of buttons, the _disabled_ one is the currently selected option, and
 * the enabled ones are the radio options that could be selected instead. For
 * accessibility it would probably be better to implement this as a radio
 * input, but styling radio inputs is fiddly.
 */
export const buttonRadio = {
  ...buttonSecondary,
  ...smallButtonText,
  color: color.blueSky,
  minWidth: 'auto',
  height: 40,
  $nest: {
    ...buttonSecondary['$nest'],
    '&&&:disabled': {
      backgroundColor: color.blueSky,
      border: 'none',
      color: color.white,
      cursor: 'default'
    }
  }
};
