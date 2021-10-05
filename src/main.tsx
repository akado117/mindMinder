import 'normalize.css';
import './css/index.css'
import './css/main.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import App from './js/App'
import { enableSentry, sentryDSN, releaseLevel } from './config'
import * as Sentry from '@sentry/browser';

const history = createBrowserHistory();

if (import.meta.env.PROD) {
  if (enableSentry) {
    Sentry.init({
      dsn: sentryDSN as string,
      environment: releaseLevel as string
    });
  }

  ReactGA.initialize(import.meta.env.GOOGLE_ANALYTICS_TRACKING_CODE as string);
  // Initialize google analytics page view tracking
  history.listen((location) => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('react_main'),
)
