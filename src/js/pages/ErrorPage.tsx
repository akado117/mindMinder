import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { color } from '../styles/theme';
import WindowHeightContainer from '../layout/WindowHeightContainer';
import PageNotFoundBody from '../components/PageNotFoundBody';
// import PageNotFoundBody from 'components/PageNotFound';
import { path } from '../routes/routeList';

const PageNotFound: FunctionComponent = () => {
  const history = useHistory();
  const handleReturnHome = () => history.push(path.home);

  return (
    <WindowHeightContainer style={{ backgroundColor: color.grey }}>
      <PageNotFoundBody handleReturnHome={handleReturnHome}>
        <span>Sorry, something strange occurred</span>
        <span>Please click below to go home,</span>
        <span>or hit refresh to try again</span>
      </PageNotFoundBody>
    </WindowHeightContainer>
  );
};

export default PageNotFound;
