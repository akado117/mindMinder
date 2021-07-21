import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router';
import AppRoute from 'CommunityApp/routes/AppRoute';
import AuthRoute from 'CommunityApp/routes/AuthRoute';
import Login from 'CommunityApp/pages/Login';
import PageNotFound from 'CommunityApp/pages/PageNotFound';
import Bookings from 'CommunityApp/pages/Bookings';
import UnitMapper from 'CommunityApp/pages/UnitMapper';

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
