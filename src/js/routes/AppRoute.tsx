import React, { FunctionComponent, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
// import { setIsAuthenticated, setIsInitialized } from '../store/authSlice';
import { goToNoE } from '../hooks/utils';
import { path } from '../routes/routeList';
import LoadingScreen from '../components/LoadingScreen';
import SidebarLayout from '../layout/SidebarLayout';

interface OwnProps {
  component: Required<RouteProps>['component'];
}

type Props = OwnProps & RouteProps;

const AppRoute: FunctionComponent<Props> = ({ component: Component, ...routeProps }) => {
  const { isInitialized, isAuthenticated } = useAppSelector((state) => state.auth);

  const goToLogin = goToNoE('login')

  // App initialization currently takes place in sessions. 
  // Since firebase will attempt to login on load, and we listen to state thre 
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      goToLogin()
    }
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
