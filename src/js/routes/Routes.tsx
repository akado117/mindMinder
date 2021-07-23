import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router';
import AppRoute from '../routes/AppRoute';
import AuthRoute from '../routes/AuthRoute';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';

const BASE_PATH = '/';
const buildPath = (path: string): string => `${BASE_PATH}${path}`;

export const path = {
  home: buildPath(''),
  unitMapper: buildPath('test'),
  login: '/login'
};

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <AuthRoute exact path={path.login} component={Login} />
      <AppRoute exact path={path.home} component={() => <div></div>} />
      <AppRoute exact path={path.unitMapper} component={() => <div></div>} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
