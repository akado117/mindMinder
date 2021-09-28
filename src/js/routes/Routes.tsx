import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router'
import { path } from './routeList'
import AppRoute from '../routes/AppRoute'
import AuthRoute from '../routes/AuthRoute'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
import LandingPage from '../pages/Landing'
import Rick from '../pages/Rick'
import Swap from '../pages/Swap'
import SidebarLayout from '../layout/SidebarLayout'
import Distortions from '../pages/Distortions'


const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path={path.home} component={LandingPage} />
      <Route exact path={path.test} component={Distortions} />
      <AuthRoute exact path={path.login} component={Login} />
      <AuthRoute exact path={path.signup} component={() => <Login type="signup"/>} />
      <AppRoute exact path={path.home} component={() => <div></div>} />
      <AppRoute exact path={path.rick} component={Rick} />
      <AppRoute exact path={path.swap} component={() => <SidebarLayout noPadding includeWindowHeightContainer allowOverflow><Swap/></SidebarLayout>} />
      <AppRoute exact path={path.profile} component={Rick}/>
      <Route component={PageNotFound} />
    </Switch>
  )
}

export default Routes
