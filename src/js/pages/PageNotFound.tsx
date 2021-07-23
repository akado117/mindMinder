import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { color } from '../styles/theme';
import WindowHeightContainer from '../layout/WindowHeightContainer';
import PageNotFoundBody from '../components/PageNotFoundBody';
import { path } from '../routes/Routes';

const PageNotFound: FunctionComponent = () => {
  const history = useHistory();
  const handleReturnHome = () => history.push(path.home);

  return (
    <WindowHeightContainer style={{ backgroundColor: color.nightSky }}>
      <PageNotFoundBody handleReturnHome={handleReturnHome} />
    </WindowHeightContainer>
  );
};

export default PageNotFound;
