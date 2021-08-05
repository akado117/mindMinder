import { rem } from 'csx';
import { Color } from './base';

export const flex = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'stretch'
};

export const center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

/**
 * Create styles for a container that puts a vertical margin of `spacing`
 * between each child. We use the double className `&&` trick to increase
 * specificity of the child selector rule. This should ensure that we override
 * the child element's margin styles, which is the desired effect if you're
 * using a Stack.
 */
export const columnStack = (spacing: number | string) => ({
  flexDirection: 'column' as 'column',
  '& > *': {
    marginTop: 0,
    marginBottom: spacing
  },
  '& > *:last-child': {
    marginBottom: 0
  }
});

/**
 * Create styles for a container that puts a horizontal margin of `spacing`
 * between each child. See [[columnStack]].
 */
export const rowStack = (spacing: number | string) => ({
  display: 'flex',
  flexDirection: 'row' as 'row',
  '& > *': {
    marginLeft: 0,
    marginRight: spacing
  },
  '& > *:last-child': {
    marginRight: 0
  }
});

export const spaceBetween = {
  display: 'flex',
  flexDirection: 'row' as 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export const sectionDivider = {
  borderBottomStyle: 'solid',
  borderWidth: 'thin',
  borderColor: Color.fog
};

export const appContainer = {
  shared: {
    ...flex,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flexGrow: 1
  },
  mobile: {
    overflowY: 'auto',
    overflowX: 'hidden'
  }
};

export const horizontalRule = {
  display: 'flex',
  '&::before, &::after': {
    content: '" "',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    borderBottomColor: Color.fog,
    borderBottomStyle: 'solid',
    borderBottomWidth: 2,
    margin: 'auto'
  },
  '&::before': {
    marginRight: 8
  },
  '&::after': {
    marginLeft: 8
  }
};

export const appContent = {
  desktop: {
    width: rem(45)
  },
  mobile: {
    width: '100%'
  }
};
