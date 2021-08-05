import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  centerContent: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const LoadingScreen: FunctionComponent = () => {
  const { loadingContainer, centerContent } = useStyles();

  return (
    <div className={centerContent}>
      <div className={loadingContainer}>
        Loading spinner
      </div>
    </div>
  );
};

export default LoadingScreen;
