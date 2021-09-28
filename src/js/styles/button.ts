import { flex } from '../styles/layout';
import { largeButtonText, smallButtonText } from '../styles/typography';
import { color, fade, gradients } from '../styles/theme';

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
  justifyContent: 'center',
  // transition: 'background 1s ease-out'
};

const largeButton = {
  ...largeButtonText,
  minWidth: 203,
  height: 56,
  borderRadius: 28,
  paddingLeft: 16,
  paddingRight: 16
};

export const buttonPrimary = {
  ...buttonBase,
  ...largeButton,
  ...gradients.blueGreen,
  // backgroundPosition: "center center",
  // backgroundSize: "200% 200%",
  color: color.white,
  '&:hover': {
    // backgroundPosition: "top",
    ...gradients.blueGreenActive,
    // backgroundSize: "200% 200%",
    backgroundColor: color.white,
    // boxShadow: 'inset 0 0 0 1000px rgba(255,255,255,.6)',
  },
  '&:active': {
    ...gradients.blueGreenActive,
  },
  '&:disabled': {
    ...gradients.blueGreenDisabled,
  }
};

export const buttonSecondary = {
  ...buttonBase,
  ...largeButton,
  backgroundColor: color.transparent,
  color: color.white,
  $nest: {
    '&:hover': {
      ...gradients.oranagePinkHover
    },
    '&:active': {
      ...gradients.blueGreenActive
    },
    '&:disabled': {
     ...gradients.blueGreenDisabled,
    }
  }
};

export const buttonText = {
  ...buttonBase,
  ...smallButtonText,
  backgroundColor: 'transparent',
  color: color.white,
  padding: 0,
  $nest: {
    '&:hover': {
      color: ButtonColor.hoverBlue
    },
    '&:active': {
      color: ButtonColor.activeBlue
    },
    '&:disabled': {
      color: color.grey,
      opacity: 0.5,
      cursor: 'default'
    }
  }
};

export const buttonSubtleText = {
  ...buttonBase,
  ...smallButtonText,
  backgroundColor: 'transparent',
  color: color.grey,
  padding: 0,
  $nest: {
    '&:hover': {
      opacity: 0.8
    },
    '&:active': {
      color: color.grey
    },
    '&:disabled': {
      color: color.grey,
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
  color: color.grey,
  minWidth: 'auto',
  height: 40,
  $nest: {
    ...buttonSecondary['$nest'],
    '&&&:disabled': {
      backgroundColor: color.grey,
      border: 'none',
      color: color.white,
      cursor: 'default'
    }
  }
};
