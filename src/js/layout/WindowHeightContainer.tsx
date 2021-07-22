import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useWindowHeight from './hooks/useWindowHeight';

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
      overflow: 'hidden',
      height: (props: Props) => props.height
    }
  }
}));

const WindowHeightContainer: FunctionComponent<JSX.IntrinsicElements['div']> = (props) => {
  const windowHeight = useWindowHeight();
  const classes = createClasses({ height: windowHeight });

  return <div className={classes.container} {...props} />;
};

export default WindowHeightContainer;
