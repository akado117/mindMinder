import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router';
import AppRoute from './routes/AppRoute';
import AuthRoute from './routes/AuthRoute';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Bookings from './pages/Bookings';
import UnitMapper from './pages/UnitMapper';

const BASE_PATH = '/community';
const buildPath = (path: string): string => `${BASE_PATH}${path}`;

export const path = {
  home: buildPath(''),
  unitMapper: buildPath('/unit_mapper'),
  login: '/admin/login'
};

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <AuthRoute exact path={path.login} component={Login} />
      <AppRoute exact path={path.home} component={Bookings} />
      <AppRoute exact path={path.unitMapper} component={UnitMapper} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
