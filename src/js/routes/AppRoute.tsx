import React, { FunctionComponent, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Route, RouteProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'CommunityApp/hooks/storeHooks';
import { setIsAuthenticated, setIsInitialized, setAdmin } from 'CommunityApp/store/authSlice';
import { path } from 'CommunityApp/routes/Routes';
import LoadingScreen from 'components/LoadingScreen';
import SidebarLayout from 'CommunityApp/layout/SidebarLayout';
import * as API from 'api/manager';

interface OwnProps {
  component: Required<RouteProps>['component'];
}

type Props = OwnProps & RouteProps;

const AppRoute: FunctionComponent<Props> = ({ component: Component, ...routeProps }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isInitialized = useAppSelector((state) => state.auth.isInitialized);

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    // App initialization calls
    Promise.all([API.getAccount()])
      .then(([getAccountResponse]) => {
        // Create an initilization function here.
        dispatch(setIsInitialized(true));
        dispatch(setIsAuthenticated(true));
        getAccountResponse && dispatch(setAdmin(getAccountResponse));
      })
      .catch(() => {
        dispatch(setIsAuthenticated(false));
        history.push(path.login, { originalDestination: location.pathname + location.search });
      });
  }, []);

  return (
    <SidebarLayout>
      <Route
        {...routeProps}
        render={({ ...props }) => {
          if (!isInitialized) {
            return <LoadingScreen />;
          } else {
            return <Component {...props} />;
          }
        }}
      />
    </SidebarLayout>
  );
};

export default AppRoute;
