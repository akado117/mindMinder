import React, { FunctionComponent } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Router } from 'react-router-dom'
import { History, createBrowserHistory } from 'history'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from './styles/theme'
import store from './store/store'
import ErrorBoundary from './layout/ErrorBoundary'
import Routes from './routes/Routes'
import ErrorPage from './pages/ErrorPage'

interface Props {
  history?: History
}

const CommunityApp: FunctionComponent<Props> = props => {
  const history = props.history ?? createBrowserHistory()
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <ErrorBoundary fallback={ErrorPage}>
          <ReduxProvider store={store}>
            <Routes />
          </ReduxProvider>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  )
}

export default CommunityApp
