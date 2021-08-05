import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router'
import AppRoute from '../routes/AppRoute'
import AuthRoute from '../routes/AuthRoute'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
import LandingPage from '../pages/Landing'
import Rick from '../pages/Rick'
import Swap from '../pages/Swap'

const BASE_PATH = '/'
const buildPath = (path: string): string => `${BASE_PATH}${path}`

export const path = {
  home: buildPath(''),
  unitMapper: buildPath('test'),
  login: '/login',
  rick: '/rick',
  swap: '/swap',
}

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path={path.home} component={LandingPage} />
      <AuthRoute exact path={path.login} component={Login} />
      <AppRoute exact path={path.home} component={() => <div></div>} />
      <AppRoute exact path={path.unitMapper} component={() => <div></div>} />
      <AppRoute exact path={path.rick} component={Rick} />
      <AppRoute exact path={path.swap} component={Swap} />
      <Route component={PageNotFound} />
    </Switch>
  )
}

export default Routes
