import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
import { LogoStacked } from 'components/Logos';

const useStyles = createUseStyles({
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
        <LogoStacked />
      </div>
    </div>
  );
};

export default LoadingScreen;
