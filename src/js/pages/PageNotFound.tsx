import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { color } from 'CommunityApp/styles/theme';
import WindowHeightContainer from 'CommunityApp/layout/WindowHeightContainer';
import PageNotFoundBody from 'CommunityApp/components/PageNotFoundBody';
import { path } from 'CommunityApp/routes/Routes';

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
