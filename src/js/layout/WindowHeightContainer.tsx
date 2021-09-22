import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useWindowHeight from '../hooks/useWindowHeight';

/**
 * This container component sets its width and height to the current
 * window size for the mobile layout. This way the mobile layout behaves
 * more similarly to react-native, where the screen is a fixed canvas
 * with no scroll, in which scrollable components can be placed.
 *
 * In order to correctly set the component height, we use the current
 * value for the inner window height, instead of `100vh`. This value
 * will not include browser chrome.
 */

interface Props {
  height: number;
}

const createClasses = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: (props: Props) => props.height,
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    }
  },
  containerLarge: {
    [theme.breakpoints.up('sm')]: {
      width: '100vw',
    }
  },
}));

interface ContainerProps {
  children: React.ReactNode;
  heightCompensation?: number;
  useWhenDesktop?: boolean;
  allowOverflow?: boolean;
  style?: React.CSSProperties;
}

const WindowHeightContainer = (props: ContainerProps) => {
  /* tslint:disable-next-line */
  const windowHeight = useWindowHeight() - (props.heightCompensation || 0);
  const classes = createClasses({ height: windowHeight });

  const containerClasses = clsx(classes.container, {
    [classes.containerLarge]: props.useWhenDesktop
  })

  return <div className={containerClasses} >{props.children}</div>
};

export default WindowHeightContainer;
